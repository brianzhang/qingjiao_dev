package com.lc.ibps.components.model.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.components.model.persistence.dao.PropModelDao;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;

/**
 * 属性模板 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-13 13:54:37
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PropModelDaoImpl extends MyBatisDaoImpl<String, PropModelPo> implements PropModelDao{

    @Override
    public String getNamespace() {
        return PropModelPo.class.getName();
    }
}
