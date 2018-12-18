
package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * t_purchasedetaillist Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PurchaseDetailDaoImpl extends MyBatisDaoImpl<String, PurchaseDetailPo> implements PurchaseDetailDao{

    @Override
    public String getNamespace() {
        return PurchaseDetailPo.class.getName();
    }
	public void deleteByMainId(String mainId) {
		deleteByKey("deleteByMainId", b().a("mainId", mainId).p());		
	}
}
