
package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

/**
 * 采购需求附件 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PurchaseAttachDaoImpl extends MyBatisDaoImpl<String, PurchaseAttachPo> implements PurchaseAttachDao{

    @Override
    public String getNamespace() {
        return PurchaseAttachPo.class.getName();
    }
	public void deleteByMainId(String mainId) {
		deleteByKey("deleteByMainId", b().a("mainId", mainId).p());		
	}
}
