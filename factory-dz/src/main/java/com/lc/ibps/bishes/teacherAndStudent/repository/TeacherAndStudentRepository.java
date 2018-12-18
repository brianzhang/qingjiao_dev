package com.lc.ibps.bishes.teacherAndStudent.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.teacherAndStudent.domain.TeacherAndStudent;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;

/**
 * t_tddsxs 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
public interface TeacherAndStudentRepository extends IRepository<String, TeacherAndStudentPo,TeacherAndStudent>{

	TeacherAndStudentPo getByJsid(String jsid);

	TeacherAndStudentPo getByGroupid(String groupid);

}
