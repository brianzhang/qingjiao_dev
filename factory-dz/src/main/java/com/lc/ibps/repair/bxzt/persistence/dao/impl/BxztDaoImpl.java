package com.lc.ibps.repair.bxzt.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.repair.bxzt.persistence.dao.BxztDao;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;

/**
 * t_bxzt Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BxztDaoImpl extends MyBatisDaoImpl<String, BxztPo> implements BxztDao{

    @Override
    public String getNamespace() {
        return BxztPo.class.getName();
    }
}
