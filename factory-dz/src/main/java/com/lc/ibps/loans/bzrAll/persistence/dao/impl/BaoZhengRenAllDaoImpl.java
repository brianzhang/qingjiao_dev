package com.lc.ibps.loans.bzrAll.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.bzrAll.persistence.dao.BaoZhengRenAllDao;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;

/**
 * t_bzr_all Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BaoZhengRenAllDaoImpl extends MyBatisDaoImpl<String, BaoZhengRenAllPo> implements BaoZhengRenAllDao{

    @Override
    public String getNamespace() {
        return BaoZhengRenAllPo.class.getName();
    }
}
