package com.lc.ibps.bishes.kaitiGroup.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.kaitiGroup.persistence.dao.KaitiGroupDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;

/**
 * t_ktxz Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class KaitiGroupDaoImpl extends MyBatisDaoImpl<String, KaitiGroupPo> implements KaitiGroupDao{

    @Override
    public String getNamespace() {
        return KaitiGroupPo.class.getName();
    }
}
