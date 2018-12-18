package com.lc.ibps.pgs.Zbd.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Zbd.persistence.dao.ZbdDao;
import com.lc.ibps.pgs.Zbd.persistence.entity.ZbdPo;

/**
 * t_zbd Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ZbdDaoImpl extends MyBatisDaoImpl<String, ZbdPo> implements ZbdDao{

    @Override
    public String getNamespace() {
        return ZbdPo.class.getName();
    }
}
