package com.lc.ibps.grads.course.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.grads.course.domain.Course;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;

/**
 * t_course 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
public interface CourseRepository extends IRepository<String, CoursePo,Course>{
	CoursePo getByCol(Map args);
	List<CoursePo> findByCol(Map args);
	Map makeParam(Map args);
	String getFileIdByFileName(List<AttachmentPo> aps, String name);
}
