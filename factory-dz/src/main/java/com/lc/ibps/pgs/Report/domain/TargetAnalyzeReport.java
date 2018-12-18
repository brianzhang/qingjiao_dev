package com.lc.ibps.pgs.Report.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Report.persistence.dao.TargetAnalyzeReportDao;
import com.lc.ibps.pgs.Report.persistence.dao.TargetAnalyzeReportQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.TargetAnalyzeReportPo;


/**
 * t_p_fxbg 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:52:06
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TargetAnalyzeReport extends AbstractDomain<String, TargetAnalyzeReportPo>{
	 
	private TargetAnalyzeReportDao targetAnalyzeReportDao = null;
	private TargetAnalyzeReportQueryDao targetAnalyzeReportQueryDao = null;

	

	protected void init(){
		targetAnalyzeReportDao = AppUtil.getBean(TargetAnalyzeReportDao.class);
		targetAnalyzeReportQueryDao = AppUtil.getBean(TargetAnalyzeReportQueryDao.class);
		this.setDao(targetAnalyzeReportDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(targetAnalyzeReportQueryDao.get(getId())));
	}
	
	
}
