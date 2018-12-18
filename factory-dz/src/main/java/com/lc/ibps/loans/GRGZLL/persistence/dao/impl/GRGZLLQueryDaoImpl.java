
package com.lc.ibps.loans.GRGZLL.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.GRGZLL.persistence.dao.GRGZLLQueryDao;
import com.lc.ibps.loans.GRGZLL.persistence.entity.GRGZLLPo;

/**
 *t_grll 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:01
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class GRGZLLQueryDaoImpl extends MyBatisQueryDaoImpl<String, GRGZLLPo> implements GRGZLLQueryDao{

    @Override
    public String getNamespace() {
        return GRGZLLPo.class.getName();
    }
}
