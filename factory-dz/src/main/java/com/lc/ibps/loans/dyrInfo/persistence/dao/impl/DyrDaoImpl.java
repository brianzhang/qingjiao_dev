package com.lc.ibps.loans.dyrInfo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.dyrInfo.persistence.dao.DyrDao;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 * t_dyr Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DyrDaoImpl extends MyBatisDaoImpl<String, DyrPo> implements DyrDao{

    @Override
    public String getNamespace() {
        return DyrPo.class.getName();
    }
}
