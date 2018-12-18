package com.lc.ibps.pgs.Report.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Report.domain.TargetAnalyzeReport;
import com.lc.ibps.pgs.Report.repository.TargetAnalyzeReportRepository;
import com.lc.ibps.pgs.Report.persistence.dao.TargetAnalyzeReportQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.TargetAnalyzeReportPo;

/**
 * t_p_fxbg 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:52:06
 *</pre>
 */
@Repository
public class TargetAnalyzeReportRepositoryImpl extends AbstractRepository<String, TargetAnalyzeReportPo,TargetAnalyzeReport> implements TargetAnalyzeReportRepository{
	  
	@Resource
	private  TargetAnalyzeReportQueryDao targetAnalyzeReportQueryDao;

	public TargetAnalyzeReport newInstance() {
		TargetAnalyzeReportPo po = new TargetAnalyzeReportPo();
		TargetAnalyzeReport targetAnalyzeReport = AppUtil.getBean(TargetAnalyzeReport.class);
		targetAnalyzeReport.setData(po);
		return targetAnalyzeReport;
	}

	public TargetAnalyzeReport newInstance(TargetAnalyzeReportPo po) {
		TargetAnalyzeReport targetAnalyzeReport = AppUtil.getBean(TargetAnalyzeReport.class);
		targetAnalyzeReport.setData(po);
		return targetAnalyzeReport;
	} 
	
	@Override
	protected IQueryDao<String, TargetAnalyzeReportPo> getQueryDao() {
		return targetAnalyzeReportQueryDao;
	}
	

	
}
