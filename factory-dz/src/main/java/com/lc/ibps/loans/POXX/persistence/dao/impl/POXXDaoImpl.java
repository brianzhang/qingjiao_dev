package com.lc.ibps.loans.POXX.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.POXX.persistence.dao.POXXDao;
import com.lc.ibps.loans.POXX.persistence.entity.POXXPo;

/**
 * t_poxxb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:49:27
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class POXXDaoImpl extends MyBatisDaoImpl<String, POXXPo> implements POXXDao{

    @Override
    public String getNamespace() {
        return POXXPo.class.getName();
    }
}
