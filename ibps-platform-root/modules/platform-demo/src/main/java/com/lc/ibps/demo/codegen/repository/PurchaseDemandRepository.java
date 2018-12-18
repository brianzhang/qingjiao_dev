
package com.lc.ibps.demo.codegen.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.demo.codegen.domain.PurchaseDemand;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;

/**
 * 采购需求 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
public interface PurchaseDemandRepository extends IRepository<String, PurchaseDemandPo,PurchaseDemand>{

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	public PurchaseDemandPo loadCascade(String id);
}
