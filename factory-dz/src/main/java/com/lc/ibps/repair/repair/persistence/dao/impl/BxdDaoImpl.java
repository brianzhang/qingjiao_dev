package com.lc.ibps.repair.repair.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.repair.repair.persistence.dao.BxdDao;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;

/**
 * t_bxd Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:04
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BxdDaoImpl extends MyBatisDaoImpl<String, BxdPo> implements BxdDao{

    @Override
    public String getNamespace() {
        return BxdPo.class.getName();
    }
}
