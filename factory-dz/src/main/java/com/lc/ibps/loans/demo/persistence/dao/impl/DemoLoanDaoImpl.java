package com.lc.ibps.loans.demo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.demo.persistence.dao.DemoLoanDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;

/**
 * t_demo_loan_ Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DemoLoanDaoImpl extends MyBatisDaoImpl<String, DemoLoanPo> implements DemoLoanDao{

    @Override
    public String getNamespace() {
        return DemoLoanPo.class.getName();
    }
}
