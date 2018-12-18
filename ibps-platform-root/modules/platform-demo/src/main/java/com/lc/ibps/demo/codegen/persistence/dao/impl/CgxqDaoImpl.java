package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;

/**
 * 采购需求 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CgxqDaoImpl extends MyBatisDaoImpl<String, CgxqPo> implements CgxqDao{

    @Override
    public String getNamespace() {
        return CgxqPo.class.getName();
    }
}