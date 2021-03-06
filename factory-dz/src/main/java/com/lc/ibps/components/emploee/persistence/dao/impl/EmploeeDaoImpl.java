package com.lc.ibps.components.emploee.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.components.emploee.persistence.dao.EmploeeDao;
import com.lc.ibps.components.emploee.persistence.entity.EmploeePo;

/**
 * t_ry Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 14:06:36
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class EmploeeDaoImpl extends MyBatisDaoImpl<String, EmploeePo> implements EmploeeDao{

    @Override
    public String getNamespace() {
        return EmploeePo.class.getName();
    }
}
