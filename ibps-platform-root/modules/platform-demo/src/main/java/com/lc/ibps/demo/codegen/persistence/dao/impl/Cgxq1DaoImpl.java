package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1Dao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;

/**
 * t_cgxq Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class Cgxq1DaoImpl extends MyBatisDaoImpl<String, Cgxq1Po> implements Cgxq1Dao{

    @Override
    public String getNamespace() {
        return Cgxq1Po.class.getName();
    }
}