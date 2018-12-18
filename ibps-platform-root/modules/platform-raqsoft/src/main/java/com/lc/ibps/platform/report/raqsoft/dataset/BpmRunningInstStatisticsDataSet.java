package com.lc.ibps.platform.report.raqsoft.dataset;

import java.util.List;
import java.util.Map;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.model.statistics.RunningStatVO;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.runqian.report4.dataset.CustomDataSetFactory;
import com.runqian.report4.dataset.DataSet;
import com.runqian.report4.dataset.Row;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.DataSetConfig;

/**
 * 待办事宜数据集
 *
 * <pre> 
 * 构建组：ibps-platform-raqsoft
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2018年3月13日-下午8:18:13
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class BpmRunningInstStatisticsDataSet extends CustomDataSetFactory{
	
	/*
	 * AppUtil只有在集成的才能使用，所以这个数据集在独立部署的时候并不工作
	 */
	private BpmInstRepository bpmInstRepository=AppUtil.getBean(BpmInstRepository.class);
	private IPartyUserService userService = AppUtil.getBean(IPartyUserService.class);
	
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
		
		int colCount=2; //这是指为列信息分配的空间，一般与实际列数相等为宜 
		
		Map<String, String> map = ctx.getParamMap(false);
		if (map != null) {
			if(StringUtil.isNotEmpty(map.get("procDefName"))){
				queryFilter.addParamsFilter("proc_def_name_", map.get("procDefName"));
			}
			if(StringUtil.isNotEmpty(map.get("creator"))){
				queryFilter.addParamsFilter("creator", map.get("creator"));
			}
		}

		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		queryFilter.setPage(null);
		List<RunningStatVO> list = bpmInstRepository.queryRunningStat(queryFilter, curUser.getUserId(), isSuper);
		
		DataSet ds = new DataSet(list.size(), colCount, datasetName);
		ds.addCol("PROCNAME");
		ds.addCol("AMOUNT");
		for (RunningStatVO vo : list) {
			Row row = ds.addRow();
			row.setData(1, vo.getProcName());
			row.setData(2, vo.getAmount());
		}
		return ds;
	}

}
