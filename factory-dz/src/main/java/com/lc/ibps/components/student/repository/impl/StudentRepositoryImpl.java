package com.lc.ibps.components.student.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.student.domain.Student;
import com.lc.ibps.components.student.repository.StudentRepository;
import com.lc.ibps.components.student.persistence.dao.StudentQueryDao;
import com.lc.ibps.components.student.persistence.entity.StudentPo;

/**
 * t_student 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 10:48:34
 *</pre>
 */
@Repository
public class StudentRepositoryImpl extends AbstractRepository<String, StudentPo,Student> implements StudentRepository{
	  
	@Resource
	private  StudentQueryDao studentQueryDao;

	public Student newInstance() {
		StudentPo po = new StudentPo();
		Student student = AppUtil.getBean(Student.class);
		student.setData(po);
		return student;
	}

	public Student newInstance(StudentPo po) {
		Student student = AppUtil.getBean(Student.class);
		student.setData(po);
		return student;
	} 
	
	@Override
	protected IQueryDao<String, StudentPo> getQueryDao() {
		return studentQueryDao;
	}
	

	
}
