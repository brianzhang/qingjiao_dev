package com.lc.ibps.grads.course.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.CourseParamModal;
import com.lc.ibps.grads.course.persistence.entity.CourseParamModalPo;

/**
 * t_course_param_modal 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
public interface CourseParamModalRepository extends IRepository<String, CourseParamModalPo,CourseParamModal>{

	List parseJson(String jsonStr);
	

}
