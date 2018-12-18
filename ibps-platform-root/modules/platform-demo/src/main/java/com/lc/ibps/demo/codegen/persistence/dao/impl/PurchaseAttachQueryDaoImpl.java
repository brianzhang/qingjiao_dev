

package com.lc.ibps.demo.codegen.persistence.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

/**
 *采购需求附件 查询Dao的实现类
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
public class PurchaseAttachQueryDaoImpl extends MyBatisQueryDaoImpl<String, PurchaseAttachPo> implements PurchaseAttachQueryDao{

    @Override
    public String getNamespace() {
        return PurchaseAttachPo.class.getName();
    }
	public List<PurchaseAttachPo> findByMainId(String mainId) {
		return findByKey("findByMainId", b().a("mainId", mainId).p());
	}
}
