
package com.lc.ibps.loans.GRJKSQSP.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.GRJKSQSP.persistence.dao.GRJKSQQueryDao;
import com.lc.ibps.loans.GRJKSQSP.persistence.entity.GRJKSQPo;

/**
 *t_grjksqspb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:47:42
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class GRJKSQQueryDaoImpl extends MyBatisQueryDaoImpl<String, GRJKSQPo> implements GRJKSQQueryDao{

    @Override
    public String getNamespace() {
        return GRJKSQPo.class.getName();
    }
}
