package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenPRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;

/**
 * t_spryj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ShenPRYJDaoImpl extends MyBatisDaoImpl<String, ShenPRYJPo> implements ShenPRYJDao{

    @Override
    public String getNamespace() {
        return ShenPRYJPo.class.getName();
    }
}
