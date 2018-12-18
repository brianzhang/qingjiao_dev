package com.lc.ibps.demo.keshes.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.keshes.persistence.dao.ZengjiaQueryDao;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;

/**
 *keshe 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 21:44:08
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ZengjiaQueryDaoImpl extends MyBatisQueryDaoImpl<String, ZengjiaPo> implements ZengjiaQueryDao{

    @Override
    public String getNamespace() {
        return ZengjiaPo.class.getName();
    }
}