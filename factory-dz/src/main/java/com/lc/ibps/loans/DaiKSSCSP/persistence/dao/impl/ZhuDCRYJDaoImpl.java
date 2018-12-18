package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ZhuDCRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_zdcryj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ZhuDCRYJDaoImpl extends MyBatisDaoImpl<String, ZhuDCRYJPo> implements ZhuDCRYJDao{

    @Override
    public String getNamespace() {
        return ZhuDCRYJPo.class.getName();
    }
}
