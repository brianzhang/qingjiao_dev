package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.CourseParamModalDao;
import com.lc.ibps.grads.course.persistence.dao.CourseParamModalQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CourseParamModalPo;

/**
 * t_course_param_modal 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CourseParamModal extends AbstractDomain<String, CourseParamModalPo>{
	 
	private CourseParamModalDao courseParamModalDao = null;
	private CourseParamModalQueryDao courseParamModalQueryDao = null;


	@Override
	protected void init(){
		courseParamModalDao = AppUtil.getBean(CourseParamModalDao.class);
		courseParamModalQueryDao = AppUtil.getBean(CourseParamModalQueryDao.class);
		this.setDao(courseParamModalDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(courseParamModalQueryDao.get(getId())));
	}
	
}
