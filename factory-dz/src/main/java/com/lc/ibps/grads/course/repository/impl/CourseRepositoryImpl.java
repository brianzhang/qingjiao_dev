package com.lc.ibps.grads.course.repository.impl;


import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.grads.course.domain.Course;
import com.lc.ibps.grads.course.persistence.dao.CourseQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;
import com.lc.ibps.grads.course.repository.CourseRepository;

/**
 * t_course 仓库的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
@Repository
public class CourseRepositoryImpl extends AbstractRepository<String, CoursePo,Course> implements CourseRepository{
	  
	@Resource
	private  CourseQueryDao courseQueryDao;
	
	@Override
	public Course newInstance() {
		CoursePo po = new CoursePo();
		Course course = AppUtil.getBean(Course.class);
		course.setData(po);
		return course;
	}

	@Override
	public Course newInstance(CoursePo po) {
		Course course = AppUtil.getBean(Course.class);
		course.setData(po);
		return course;
	} 
	
	@Override
	protected IQueryDao<String, CoursePo> getQueryDao() {
		return courseQueryDao;
	}

	@Override
	public String getFileIdByFileName(List<AttachmentPo> aps,String name) {
		String fid = "";
		Iterator<AttachmentPo> it = aps.iterator();
		while (it.hasNext()) {
			AttachmentPo ap = it.next();
			String fn = ap.getFileName();
			if (fn.equals(name))
				fid = ap.getId();
			if (!fid.equals(""))
				break;
		}
		return fid;
	}

	@Override
	public CoursePo getByCol(Map args) {
		return courseQueryDao.getByKey("getByCol", makeParam(args));
	}

	@Override
	public List<CoursePo> findByCol(Map args) {
		return courseQueryDao.findByKey("getByCol", makeParam(args));
	}

	@Override
	public Map makeParam(Map args) {
		Map res = new HashMap<String,Map>();
		res.put("relationMap", args);
		return res;
	}

	
}
