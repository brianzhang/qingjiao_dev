package com.lc.ibps.loans.GRGZLL.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.GRGZLL.persistence.dao.GRGZLLDao;
import com.lc.ibps.loans.GRGZLL.persistence.entity.GRGZLLPo;

/**
 * t_grll Dao接口的实现类
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
public class GRGZLLDaoImpl extends MyBatisDaoImpl<String, GRGZLLPo> implements GRGZLLDao{

    @Override
    public String getNamespace() {
        return GRGZLLPo.class.getName();
    }
}
