
package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;

/**
 * 采购需求 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:47
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PurchaseDemandDaoImpl extends MyBatisDaoImpl<String, PurchaseDemandPo> implements PurchaseDemandDao{

    @Override
    public String getNamespace() {
        return PurchaseDemandPo.class.getName();
    }
}
