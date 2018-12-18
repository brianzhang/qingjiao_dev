package com.lc.ibps.demo.codegen.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;

/**
 *t_employee_dic 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class EmployeeDicQueryDaoImpl extends MyBatisQueryDaoImpl<String, EmployeeDicPo> implements EmployeeDicQueryDao{

    @Override
    public String getNamespace() {
        return EmployeeDicPo.class.getName();
    }
}