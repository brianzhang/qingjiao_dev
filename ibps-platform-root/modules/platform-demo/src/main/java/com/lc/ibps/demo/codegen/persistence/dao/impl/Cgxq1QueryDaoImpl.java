package com.lc.ibps.demo.codegen.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;

/**
 *t_cgxq 查询Dao的实现类
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
public class Cgxq1QueryDaoImpl extends MyBatisQueryDaoImpl<String, Cgxq1Po> implements Cgxq1QueryDao{

    @Override
    public String getNamespace() {
        return Cgxq1Po.class.getName();
    }
}