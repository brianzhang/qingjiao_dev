package com.lc.ibps.platform.report.raqsoft.dataset;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.bpmn.api.service.BpmTaskService;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.runqian.base4.util.Logger;
import com.runqian.report4.dataset.CustomDataSetFactory;
import com.runqian.report4.dataset.DataSet;
import com.runqian.report4.dataset.Row;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.DataSetConfig;
/**
 * 流程待办个个人数量统计自定义数据集
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2018年2月5日-下午2:45:04
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class BpmPersonPendingStatisticsDataSet extends CustomDataSetFactory {
	
	private static String employeeSql = "SELECT t1.ID_,t1.NAME_,t2.ORG_ID_,t2.ORG_NAME_ FROM IBPS_PARTY_EMPLOYEE t1 LEFT JOIN ( SELECT ID_ ORG_ID_,NAME_ ORG_NAME_ FROM IBPS_PARTY_ORG ) t2 ON t2.ORG_ID_ = t1.GROUP_ID_ WHERE t1.STATUS_ != 'deleted' AND t1.ID_!='-1'";
	/*
	 * AppUtil只有在集成的才能使用，所以这个数据集在独立部署的时候并不工作
	 * */
	private BpmTaskService bpmTaskService=AppUtil.getBean(BpmTaskService.class);
	private IPartyEntityService entityService=AppUtil.getBean(IPartyEntityService.class);

	@SuppressWarnings({ "unchecked"})
	@Override
	public DataSet createDataSet(Context ctx, DataSetConfig dsc, boolean retrieve) {
		String datasourceName = dsc.getDataSourceName(); //获取数据集定义里设置的数据源名称
		String datasetName = dsc.getName();//获取数据集定义名称
		
		if( datasetName==null || "".equals(datasetName) ) //如果数据集里没有指定数据源，则取系统默认
			datasetName = "ds1"; //取系统默认数据源
		if( datasourceName==null || "".equals(datasourceName) ) //如果数据集里没有指定数据源，则取系统默认
			datasourceName = ctx.getDefDataSourceName(); //取系统默认数据源
		int colCount=6; //这是指为列信息分配的空间，一般与实际列数相等为宜 
		
		Integer limit = 0; //前几条数据
		Integer baseline = 0;//限制值
		Boolean isAsc = null;//是否升序
		Map<String, String> map = ctx.getParamMap(false); // 获得当前报表的所有参数对照表
		StringBuilder sb = new StringBuilder(employeeSql);
		if (map != null) {
			if(StringUtil.isNotEmpty(map.get("orgId"))&&!"$null".equals(map.get("orgId"))){
				sb.append(" AND t2.ORG_ID_='").append(map.get("orgId")).append("'");
			}else if("$null".equals(map.get("orgId"))){
				sb.append(" AND t2.ORG_ID_ IS NULL");
			}
			if(StringUtil.isNotEmpty(map.get("limit"))){
				limit = Integer.valueOf(map.get("limit"));
			}
			if(StringUtil.isNotEmpty(map.get("baseline"))&&StringUtil.isNumeric(map.get("baseline"))){
				baseline = Integer.valueOf(map.get("baseline"));
			}
			isAsc = "asc".equals(map.get("sort"))?true:false;
		}
		
		Connection con = null;
		Statement stat = null;
		ResultSet rs = null;
		DataSet ds = null;
		PendingPo po = null;
		List<PendingPo> poList  = new ArrayList<PendingPo>();
		List<PendingPo> resultList = new ArrayList<PendingPo>();
		try {
			con = ctx.getConnectionFactory( datasourceName ).getConnection(); //获取数据库连接
			//查询用户
			Logger.info("ds1=" + sb.toString());
			stat = con.prepareStatement(sb.toString());
			rs = stat.executeQuery(sb.toString());
			while (rs.next()) {
				po = new PendingPo(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),0,0);
				poList.add(po);
			}
			
			
			for (PendingPo pendingPo : poList) {
				List<PartyEntity> pes = new ArrayList<PartyEntity>();
				String data = entityService.findByUserIdJson(pendingPo.getUserId());
				if(JacksonUtil.isJsonArray(data)){
					List<PartyEntityPo> peps = JacksonUtil.getDTOList(data, PartyEntityPo.class);
					pes.addAll(peps);
				}
				Map<String, String> groups = PartyUtil.convertGroupList(pes);
				pendingPo.setTotal(bpmTaskService.countByUser(pendingPo.getUserId(), groups, null));
			}
			
			sort(poList, isAsc);
			
			filterByBaseLine(baseline, isAsc, poList);
			
			Map<String, String> orgOrderMap = new HashMap<String, String>();
			for (PendingPo pendingPo : poList) {
				po = setOrgNum(orgOrderMap, pendingPo, limit);
				if(BeanUtils.isNotEmpty(po)){
					resultList.add(po);
				}
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}finally {
			try { if(rs!=null) rs.close(); } catch (SQLException e) {}
			try { if(stat!=null) stat.close(); } catch (SQLException e) {}
			try { if(con!=null) con.close(); } catch (SQLException e) {}
		}
		
		ds = new DataSet(resultList.size(), colCount, datasetName);
		ds.addCol("userId");
		ds.addCol("userName");
		ds.addCol("orgId");
		ds.addCol("orgName");
		ds.addCol("total");
		ds.addCol("num");
		for (PendingPo pendingPo : resultList) {
			Row row = ds.addRow();
			row.setData(1, pendingPo.getUserId());
			row.setData(2, pendingPo.getUserName());
			row.setData(3, pendingPo.getOrgId());
			row.setData(4, pendingPo.getOrgName());
			row.setData(5, pendingPo.getTotal());
			row.setData(6, pendingPo.getNum());
		}
		return ds;
	}

	/**
	 * 过滤不符合数量条件的数据
	 *
	 * @param baseline
	 * @param isAsc
	 * @param poList
	 */
	private void filterByBaseLine(Integer baseline, Boolean isAsc, List<PendingPo> poList) {
		if(baseline>0){
			Iterator<PendingPo> it = poList.iterator();
			while(it.hasNext()){
				PendingPo x = it.next();
				if(isAsc&&x.getTotal()>baseline){
					it.remove();
				}else if(!isAsc&&x.getTotal()<baseline){
					it.remove();
				}
			}
		}
	}

	/**
	 * 排序
	 *
	 * @param poList
	 */
	private void sort(List<PendingPo> poList, final Boolean isAsc) {
		Collections.sort(poList, new Comparator<PendingPo>() {
			@Override
			public int compare(PendingPo arg0, PendingPo arg1) {
				if (isAsc) {
					if (arg0.getTotal().compareTo(arg1.getTotal()) == 0) {
						return arg0.getUserId().compareTo(arg1.getUserId());
					} else {
						return arg0.getTotal().compareTo(arg1.getTotal());
					}
				} else {
					if (arg0.getTotal().compareTo(arg1.getTotal()) == 0) {
						return arg1.getUserId().compareTo(arg0.getUserId());
					} else {
						return arg1.getTotal().compareTo(arg0.getTotal());
					}
				}
			}
		});
	}

	/**
	 * 设置部门排名
	 *
	 * @param orgOrderMap
	 * @param pendingPo
	 * @param limit 显示数量
	 * @return
	 */
	private PendingPo setOrgNum(Map<String, String> orgOrderMap, PendingPo pendingPo, Integer limit) {
		Integer num = 0;
		Integer temp = 0;
		if(StringUtil.isBlank(pendingPo.getOrgId())){
			if(orgOrderMap.containsKey("_other")){
				String[] s = orgOrderMap.get("_other").split(",");
				num = pendingPo.getTotal()==Integer.valueOf(s[0])?Integer.valueOf(s[1]):Integer.valueOf(s[2]) ;
				temp = Integer.valueOf(s[2]);
			}else{
				num = 1;
				temp = 1;
			}
			orgOrderMap.put("_other", pendingPo.getTotal()+","+num+","+(temp+1));
		}else{
			if(orgOrderMap.containsKey(pendingPo.getOrgId())){
				String[] s = orgOrderMap.get(pendingPo.getOrgId()).split(",");
				num = pendingPo.getTotal()==Integer.valueOf(s[0])?Integer.valueOf(s[1]):Integer.valueOf(s[2]) ;
				temp = Integer.valueOf(s[2]);
			}else{
				num = 1;
				temp = 1;
			}
			orgOrderMap.put(pendingPo.getOrgId(), pendingPo.getTotal()+","+num+","+(temp+1));
		}
		if(limit==0||limit>=temp){
			pendingPo.setNum(num);
			return pendingPo;
		}else{
			return null;
		}
	}
	

	
	class PendingPo {
		
		private String userId;
		private String userName;
		private String orgId;
		private String orgName;
		private Integer total;
		private Integer num;
		
		public PendingPo(){
			
		}
		
		public PendingPo(String userId, String userName, String orgId, String orgName, Integer total, Integer num) {
			super();
			this.userId = userId;
			this.userName = userName;
			this.orgId = orgId;
			this.orgName = orgName;
			this.total = total;
			this.num = num;
		}

		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getOrgId() {
			return orgId;
		}
		public void setOrgId(String orgId) {
			this.orgId = orgId;
		}
		public String getOrgName() {
			return orgName;
		}
		public void setOrgName(String orgName) {
			this.orgName = orgName;
		}
		public Integer getTotal() {
			return total;
		}
		public void setTotal(Integer total) {
			this.total = total;
		}
		public Integer getNum() {
			return num;
		}
		public void setNum(Integer num) {
			this.num = num;
		}

	}
	
}
