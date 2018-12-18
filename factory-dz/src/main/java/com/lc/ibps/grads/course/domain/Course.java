package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.CourseDao;
import com.lc.ibps.grads.course.persistence.dao.CourseQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;

/**
 * t_course 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Course extends AbstractDomain<String, CoursePo>{
	 
	private CourseDao courseDao = null;
	private CourseQueryDao courseQueryDao = null;


	@Override
	protected void init(){
		courseDao = AppUtil.getBean(CourseDao.class);
		courseQueryDao = AppUtil.getBean(CourseQueryDao.class);
		this.setDao(courseDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(courseQueryDao.get(getId())));
	}
	
}
