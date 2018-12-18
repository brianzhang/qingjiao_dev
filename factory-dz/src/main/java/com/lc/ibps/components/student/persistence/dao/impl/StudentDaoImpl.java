package com.lc.ibps.components.student.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.components.student.persistence.dao.StudentDao;
import com.lc.ibps.components.student.persistence.entity.StudentPo;

/**
 * t_student Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 10:48:34
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class StudentDaoImpl extends MyBatisDaoImpl<String, StudentPo> implements StudentDao{

    @Override
    public String getNamespace() {
        return StudentPo.class.getName();
    }
}
