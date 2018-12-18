package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.TeachingfeedbackDao;
import com.lc.ibps.pgs.PGData.persistence.dao.TeachingfeedbackQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TeachingfeedbackPo;


/**
 * t_p_xxaqzyktjxfkb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Teachingfeedback extends AbstractDomain<String, TeachingfeedbackPo>{
	 
	private TeachingfeedbackDao teachingfeedbackDao = null;
	private TeachingfeedbackQueryDao teachingfeedbackQueryDao = null;

	

	protected void init(){
		teachingfeedbackDao = AppUtil.getBean(TeachingfeedbackDao.class);
		teachingfeedbackQueryDao = AppUtil.getBean(TeachingfeedbackQueryDao.class);
		this.setDao(teachingfeedbackDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(teachingfeedbackQueryDao.get(getId())));
	}
	
	
}
