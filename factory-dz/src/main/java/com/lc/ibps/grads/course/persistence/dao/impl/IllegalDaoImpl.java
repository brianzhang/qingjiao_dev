package com.lc.ibps.grads.course.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.IllegalDao;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;

/**
 * 违规操作表 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class IllegalDaoImpl extends MyBatisDaoImpl<String, IllegalPo> implements IllegalDao{

    @Override
    public String getNamespace() {
        return IllegalPo.class.getName();
    }
}
