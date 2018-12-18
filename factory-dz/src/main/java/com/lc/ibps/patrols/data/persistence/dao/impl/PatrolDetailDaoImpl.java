package com.lc.ibps.patrols.data.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.PatrolDetailDao;
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo;

/**
 * t_patrol_detail Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:24
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PatrolDetailDaoImpl extends MyBatisDaoImpl<String, PatrolDetailPo> implements PatrolDetailDao{

    @Override
    public String getNamespace() {
        return PatrolDetailPo.class.getName();
    }
}
