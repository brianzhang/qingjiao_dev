
package com.lc.ibps.loans.demo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.demo.persistence.dao.DemoLoanQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;

/**
 *t_demo_loan_ 查询Dao的实现类
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
public class DemoLoanQueryDaoImpl extends MyBatisQueryDaoImpl<String, DemoLoanPo> implements DemoLoanQueryDao{

    @Override
    public String getNamespace() {
        return DemoLoanPo.class.getName();
    }
}
