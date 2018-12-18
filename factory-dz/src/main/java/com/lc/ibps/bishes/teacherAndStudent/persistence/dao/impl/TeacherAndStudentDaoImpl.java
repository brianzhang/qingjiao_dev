package com.lc.ibps.bishes.teacherAndStudent.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.teacherAndStudent.persistence.dao.TeacherAndStudentDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;

/**
 * t_tddsxs Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class TeacherAndStudentDaoImpl extends MyBatisDaoImpl<String, TeacherAndStudentPo> implements TeacherAndStudentDao{

    @Override
    public String getNamespace() {
        return TeacherAndStudentPo.class.getName();
    }
}
