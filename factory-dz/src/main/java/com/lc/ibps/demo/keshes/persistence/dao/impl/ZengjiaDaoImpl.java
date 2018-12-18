package com.lc.ibps.demo.keshes.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.keshes.persistence.dao.ZengjiaDao;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;

/**
 * keshe Dao接口的实现类
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
public class ZengjiaDaoImpl extends MyBatisDaoImpl<String, ZengjiaPo> implements ZengjiaDao{

    @Override
    public String getNamespace() {
        return ZengjiaPo.class.getName();
    }
}