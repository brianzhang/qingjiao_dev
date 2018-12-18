package com.lc.ibps.bishes.teacherAndStudent.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;

/**
 * t_tddsxs 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
public interface TeacherAndStudentQueryDao extends IQueryDao<String, TeacherAndStudentPo> {

	List<TeacherAndStudentPo> getByJsid(String jsid);

	List<TeacherAndStudentPo> getByGroupid(String groupid);
}
