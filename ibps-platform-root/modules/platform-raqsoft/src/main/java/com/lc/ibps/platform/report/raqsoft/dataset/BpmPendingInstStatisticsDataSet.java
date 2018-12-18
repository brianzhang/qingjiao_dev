package com.lc.ibps.platform.report.raqsoft.dataset;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;

import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.model.statistics.PandingStatVO;
import com.lc.ibps.bpmn.repository.BpmTaskAssignRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.runqian.report4.dataset.CustomDataSetFactory;
import com.runqian.report4.dataset.DataSet;
import com.runqian.report4.dataset.Row;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.DataSetConfig;

public class BpmPendingInstStatisticsDataSet extends CustomDataSetFactory{
	
	private IPartyEntityService entityService = AppUtil.getBean(IPartyEntityService.class);
	private BpmTaskRepository bpmTaskRepository = AppUtil.getBean(BpmTaskRepository.class);
	private BpmTaskAssignRepository bpmTaskAssignRepository = AppUtil.getBean(BpmTaskAssignRepository.class);
	
	@SuppressWarnings("unchecked")
	@Override
	public DataSet createDataSet(Context ctx, DataSetConfig dsc, boolean retrieve) {
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		
		String datasourceName = dsc.getDataSourceName(); //获取数据集定义里设置的数据源名称
		
		String datasetName = dsc.getName();//获取数据集定义名称
		
		if( datasetName==null || "".equals(datasetName) ) //如果数据集里没有指定数据源，则取系统默认
			datasetName = "ds1"; //取系统默认数据源
		if( datasourceName==null || "".equals(datasourceName) ) //如果数据集里没有指定数据源，则取系统默认
			datasourceName = ctx.getDefDataSourceName(); //取系统默认数据源
		
		Map<String, String> map = ctx.getParamMap(false);
		if (map != null) {
			if(StringUtil.isNotEmpty(map.get("procDefName"))){
				queryFilter.addParamsFilter("procDefName", map.get("procDefName"));
			}
			if(StringUtil.isNotEmpty(map.get("creatorId"))){
				queryFilter.addParamsFilter("creatorId", map.get("creatorId"));
			}
			if(StringUtil.isNotEmpty(map.get("executorId"))){
				queryFilter.addParamsFilter("executorId", map.get("executorId"));
			}
			if(StringUtil.isNotEmpty(map.get("createTime1"))){
				queryFilter.addParamsFilter("begin_create_time_", map.get("createTime1"));
			}
			if(StringUtil.isNotEmpty(map.get("createTime2"))){
				queryFilter.addParamsFilter("end_create_time_", map.get("createTime2"));
			}
		}
		
		int colCount=5; //这是指为列信息分配的空间，一般与实际列数相等为宜 
		
		User curUser = ContextUtil.getCurrentUser();
		List<PandingStatVO> result = new ArrayList<PandingStatVO>();
		queryFilter.setPage(null);
		if(StringUtils.isEmpty(queryFilter.getParams().get("executorId"))){
			List<String> userIds = bpmTaskAssignRepository.queryALLExecutor(queryFilter);
			for (String id : userIds) {
				List<PartyEntity> pes = entityService.findByUserId(id);
				Map<String, String> groups = PartyUtil.convertGroupList(pes);
				queryFilter.addParamsFilter("executorId", id);
				List<PandingStatVO> list = bpmTaskRepository.queryPendingStat(id, groups, queryFilter);
				if (list.size()>0&&BeanUtils.isNotEmpty(list.get(0))) {
					result.add(list.get(0));
				}
			}
		}else{
			List<PartyEntity> pes = entityService.findByUserId(curUser.getUserId());
			Map<String, String> groups = PartyUtil.convertGroupList(pes);
			result = bpmTaskRepository.queryPendingStat(curUser.getUserId(), groups, queryFilter);
		}
		
		DataSet ds = new DataSet(result.size(), colCount, datasetName);
		ds.addCol("NAME");
		ds.addCol("NORMAL");
		ds.addCol("SHIFT");
		ds.addCol("ASSIGNEE");
		ds.addCol("SUSPEND");
		for (PandingStatVO vo : result) {
			Row row = ds.addRow();
			row.setData(1, vo.getName());
			row.setData(2, vo.getNormal());
			row.setData(3, vo.getShift());
			row.setData(4, vo.getAssignee());
			row.setData(5, vo.getSuspend());
		}
		return ds;
	}

}
