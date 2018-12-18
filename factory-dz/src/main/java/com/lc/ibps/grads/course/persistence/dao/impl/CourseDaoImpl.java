package com.lc.ibps.grads.course.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.CourseDao;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;

/**
 * t_course Dao接口的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CourseDaoImpl extends MyBatisDaoImpl<String, CoursePo> implements CourseDao{

    @Override
    public String getNamespace() {
        return CoursePo.class.getName();
    }
}
