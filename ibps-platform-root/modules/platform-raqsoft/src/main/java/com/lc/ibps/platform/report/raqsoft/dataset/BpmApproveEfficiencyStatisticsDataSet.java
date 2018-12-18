package com.lc.ibps.platform.report.raqsoft.dataset;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.report.raqsoft.service.IDBService;
import com.lc.ibps.report.raqsoft.strategy.DBStrategyFactory;
import com.runqian.base4.util.DBTypes;
import com.runqian.base4.util.Logger;
import com.runqian.report4.dataset.CustomDataSetFactory;
import com.runqian.report4.dataset.DataSet;
import com.runqian.report4.dataset.Row;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.DataSetConfig;

/**
 * 节点操作效率人员耗时统计表自定义数据集
 *
 * <pre> 
 * 构建组：ibps-platform-raqsoft
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2018年2月27日-下午4:01:56
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class BpmApproveEfficiencyStatisticsDataSet extends CustomDataSetFactory {

	private static String select = "SELECT ah.AUDITOR_, e.NAME_, SUM(ah.DUR_MS_)/COUNT(1) avgTime FROM ibps_bpm_approval_his ah LEFT JOIN ibps_party_employee e ON ah.AUDITOR_=e.ID_ WHERE e.NAME_ IS NOT NULL ";
	private static String groupby = " GROUP BY ah.AUDITOR_,e.NAME_ ORDER BY avgTime DESC";
	
	@Override
	public DataSet createDataSet(Context ctx, DataSetConfig dsc, boolean retrieve) {
		String datasourceName = dsc.getDataSourceName(); //获取数据集定义里设置的数据源名称
		
		String daType = DBTypes.getDBTypeName(ctx.getDataSourceConfig(dsc.getDataSourceName()).getDBType());
		
		IDBService dbService = DBStrategyFactory.get(daType);
		
		String datasetName = dsc.getName();//获取数据集定义名称
		
		if( datasetName==null || "".equals(datasetName) ) //如果数据集里没有指定数据源，则取系统默认
			datasetName = "ds1"; //取系统默认数据源
		if( datasourceName==null || "".equals(datasourceName) ) //如果数据集里没有指定数据源，则取系统默认
			datasourceName = ctx.getDefDataSourceName(); //取系统默认数据源
		
		int colCount=3; //这是指为列信息分配的空间，一般与实际列数相等为宜 

		Connection con = null;
		Statement stat = null;
		ResultSet rs = null;
		DataSet ds = null;
		StringBuilder sb = new StringBuilder(select);

		try {
			@SuppressWarnings("unchecked")
			Map<String, String> map = ctx.getParamMap(false); // 获得当前报表的所有参数对照表
			if (map != null) {
				if(isNotEmpty(map.get("createTime"))){
					sb.append(" AND").append(dbService.bigThan("ah.CREATE_TIME_", map.get("createTime")));
				}
				if(isNotEmpty(map.get("endTime"))){
					sb.append(" AND").append(dbService.smallThan("ah.COMPLETE_TIME_", map.get("endTime")));
				}
			}
			sb.append(groupby);
			
			con = ctx.getConnectionFactory(datasourceName).getConnection(); // 获取数据库连接
			
			Logger.info("ds1=" + sb.toString());
				
			stat = con.prepareStatement(sb.toString());
			rs = stat.executeQuery(sb.toString());
			ds = new DataSet(colCount, datasetName);
			ds.addCol("AUDITOR");
			ds.addCol("NAME");
			ds.addCol("AVGTIME");
			while (rs.next()) {
				Row row = ds.addRow();
				row.setData(1, rs.getString(1));
				row.setData(2, rs.getString(2));
				row.setData(3, DateUtil.getTime(rs.getLong(3)));
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}finally {
			try { if(rs!=null) rs.close(); } catch (SQLException e) {}
			try { if(stat!=null) stat.close(); } catch (SQLException e) {}
			try { if(con!=null) con.close(); } catch (SQLException e) {}
		}

		return ds;
	}
	
	public static Boolean isNotEmpty(String str){
		return !(str==null||str.length()==0);
	}
	
	public static void main(String[] args) {
		System.out.println(DateUtil.getTime(323232432432L));
	}
	
}
