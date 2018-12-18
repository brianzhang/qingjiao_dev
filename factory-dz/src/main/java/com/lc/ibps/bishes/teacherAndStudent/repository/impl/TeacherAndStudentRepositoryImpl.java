package com.lc.ibps.bishes.teacherAndStudent.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.teacherAndStudent.domain.TeacherAndStudent;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
import com.lc.ibps.bishes.teacherAndStudent.persistence.dao.TeacherAndStudentQueryDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;

/**
 * t_tddsxs 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
@Repository
public class TeacherAndStudentRepositoryImpl extends AbstractRepository<String, TeacherAndStudentPo,TeacherAndStudent> implements TeacherAndStudentRepository{
	  
	@Resource
	private  TeacherAndStudentQueryDao teacherAndStudentQueryDao;

	@Override
	public TeacherAndStudent newInstance() {
		TeacherAndStudentPo po = new TeacherAndStudentPo();
		TeacherAndStudent teacherAndStudent = AppUtil.getBean(TeacherAndStudent.class);
		teacherAndStudent.setData(po);
		return teacherAndStudent;
	}

	@Override
	public TeacherAndStudent newInstance(TeacherAndStudentPo po) {
		TeacherAndStudent teacherAndStudent = AppUtil.getBean(TeacherAndStudent.class);
		teacherAndStudent.setData(po);
		return teacherAndStudent;
	} 
	
	@Override
	protected IQueryDao<String, TeacherAndStudentPo> getQueryDao() {
		return teacherAndStudentQueryDao;
	}

	@Override
	public TeacherAndStudentPo getByJsid(String jsid) {
		List<TeacherAndStudentPo> polist  =teacherAndStudentQueryDao.getByJsid(jsid);
		if(polist==null){
			return null;
		}else{
			TeacherAndStudentPo po =polist.get(0);
			return po;
		}
	}
	@Override
	public TeacherAndStudentPo getByGroupid(String groupid) {
		List<TeacherAndStudentPo> polist  =teacherAndStudentQueryDao.getByGroupid(groupid);
		if(polist.size()==0){
			return null;
		}else{
			TeacherAndStudentPo po =polist.get(0);
			return po;
		}
	}
	

	
}
