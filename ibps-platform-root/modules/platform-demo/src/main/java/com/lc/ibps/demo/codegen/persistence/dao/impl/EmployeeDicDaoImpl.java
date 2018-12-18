package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicDao;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;

/**
 * t_employee_dic Dao接口的实现类
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
public class EmployeeDicDaoImpl extends MyBatisDaoImpl<String, EmployeeDicPo> implements EmployeeDicDao{

    @Override
    public String getNamespace() {
        return EmployeeDicPo.class.getName();
    }
}