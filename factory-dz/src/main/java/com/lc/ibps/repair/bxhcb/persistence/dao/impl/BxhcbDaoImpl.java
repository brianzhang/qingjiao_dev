package com.lc.ibps.repair.bxhcb.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.repair.bxhcb.persistence.dao.BxhcbDao;
import com.lc.ibps.repair.bxhcb.persistence.entity.BxhcbPo;

/**
 * t_bxhcb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BxhcbDaoImpl extends MyBatisDaoImpl<String, BxhcbPo> implements BxhcbDao{

    @Override
    public String getNamespace() {
        return BxhcbPo.class.getName();
    }
}
