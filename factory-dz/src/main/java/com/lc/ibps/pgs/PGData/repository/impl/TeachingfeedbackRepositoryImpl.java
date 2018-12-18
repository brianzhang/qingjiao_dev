package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.Teachingfeedback;
import com.lc.ibps.pgs.PGData.repository.TeachingfeedbackRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.TeachingfeedbackQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TeachingfeedbackPo;

/**
 * t_p_xxaqzyktjxfkb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
@Repository
public class TeachingfeedbackRepositoryImpl extends AbstractRepository<String, TeachingfeedbackPo,Teachingfeedback> implements TeachingfeedbackRepository{
	  
	@Resource
	private  TeachingfeedbackQueryDao teachingfeedbackQueryDao;

	public Teachingfeedback newInstance() {
		TeachingfeedbackPo po = new TeachingfeedbackPo();
		Teachingfeedback teachingfeedback = AppUtil.getBean(Teachingfeedback.class);
		teachingfeedback.setData(po);
		return teachingfeedback;
	}

	public Teachingfeedback newInstance(TeachingfeedbackPo po) {
		Teachingfeedback teachingfeedback = AppUtil.getBean(Teachingfeedback.class);
		teachingfeedback.setData(po);
		return teachingfeedback;
	} 
	
	@Override
	protected IQueryDao<String, TeachingfeedbackPo> getQueryDao() {
		return teachingfeedbackQueryDao;
	}
	

	
}
