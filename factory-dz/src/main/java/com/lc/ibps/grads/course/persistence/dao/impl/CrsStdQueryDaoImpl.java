
package com.lc.ibps.grads.course.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.CrsStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;

/**
 *t_crs_std 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class CrsStdQueryDaoImpl extends MyBatisQueryDaoImpl<String, CrsStdPo> implements CrsStdQueryDao{

    @Override
    public String getNamespace() {
        return CrsStdPo.class.getName();
    }
}
