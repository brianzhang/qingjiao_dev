package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenCRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenCRYJPo;

/**
 * t_scryj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ShenCRYJDaoImpl extends MyBatisDaoImpl<String, ShenCRYJPo> implements ShenCRYJDao{

    @Override
    public String getNamespace() {
        return ShenCRYJPo.class.getName();
    }
}
