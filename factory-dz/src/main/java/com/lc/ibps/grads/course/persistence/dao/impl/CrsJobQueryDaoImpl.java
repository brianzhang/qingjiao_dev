
package com.lc.ibps.grads.course.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.CrsJobQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;

/**
 *t_crs_job 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class CrsJobQueryDaoImpl extends MyBatisQueryDaoImpl<String, CrsJobPo> implements CrsJobQueryDao{

    @Override
    public String getNamespace() {
        return CrsJobPo.class.getName();
    }
}
