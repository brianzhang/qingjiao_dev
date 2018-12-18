
package com.lc.ibps.grads.course.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.CrsTchQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;

/**
 *t_crs_tch 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:43:15
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class CrsTchQueryDaoImpl extends MyBatisQueryDaoImpl<String, CrsTchPo> implements CrsTchQueryDao{

    @Override
    public String getNamespace() {
        return CrsTchPo.class.getName();
    }
}
