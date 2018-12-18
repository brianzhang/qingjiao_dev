package com.lc.ibps.loans.baoZhengRen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.baoZhengRen.persistence.dao.BZRXXBDao;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 * t_bzrxxb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:17
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BZRXXBDaoImpl extends MyBatisDaoImpl<String, BZRXXBPo> implements BZRXXBDao{

    @Override
    public String getNamespace() {
        return BZRXXBPo.class.getName();
    }
}
