
package com.lc.ibps.components.emploee.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.components.emploee.persistence.dao.EmploeeQueryDao;
import com.lc.ibps.components.emploee.persistence.entity.EmploeePo;

/**
 *t_ry 查询Dao的实现类
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
public class EmploeeQueryDaoImpl extends MyBatisQueryDaoImpl<String, EmploeePo> implements EmploeeQueryDao{

    @Override
    public String getNamespace() {
        return EmploeePo.class.getName();
    }
}
