package com.lc.ibps.components.model.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.components.model.persistence.dao.BusinessModelDao;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;

/**
 * 业务模板 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-09-13 13:54:21
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BusinessModelDaoImpl extends MyBatisDaoImpl<String, BusinessModelPo> implements BusinessModelDao{

    @Override
    public String getNamespace() {
        return BusinessModelPo.class.getName();
    }
}
