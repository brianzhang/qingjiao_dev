package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.AllCourse;
import com.lc.ibps.pgs.PGData.repository.AllCourseRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.AllCourseQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.AllCoursePo;

/**
 * t_qbkc 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:56:41
 *</pre>
 */
@Repository
public class AllCourseRepositoryImpl extends AbstractRepository<String, AllCoursePo,AllCourse> implements AllCourseRepository{
	  
	@Resource
	private  AllCourseQueryDao allCourseQueryDao;

	public AllCourse newInstance() {
		AllCoursePo po = new AllCoursePo();
		AllCourse allCourse = AppUtil.getBean(AllCourse.class);
		allCourse.setData(po);
		return allCourse;
	}

	public AllCourse newInstance(AllCoursePo po) {
		AllCourse allCourse = AppUtil.getBean(AllCourse.class);
		allCourse.setData(po);
		return allCourse;
	} 
	
	@Override
	protected IQueryDao<String, AllCoursePo> getQueryDao() {
		return allCourseQueryDao;
	}
	

	
}
