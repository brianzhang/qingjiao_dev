package com.lc.ibps.grads.course.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.CrsStdDao;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;

/**
 * t_crs_std Dao接口的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CrsStdDaoImpl extends MyBatisDaoImpl<String, CrsStdPo> implements CrsStdDao{

    @Override
    public String getNamespace() {
        return CrsStdPo.class.getName();
    }
}
