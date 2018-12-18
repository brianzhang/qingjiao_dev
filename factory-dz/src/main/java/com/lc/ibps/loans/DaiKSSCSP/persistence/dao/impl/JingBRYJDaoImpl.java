package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.JingBRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;

/**
 * t_jbdcryj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class JingBRYJDaoImpl extends MyBatisDaoImpl<String, JingBRYJPo> implements JingBRYJDao{

    @Override
    public String getNamespace() {
        return JingBRYJPo.class.getName();
    }
}
