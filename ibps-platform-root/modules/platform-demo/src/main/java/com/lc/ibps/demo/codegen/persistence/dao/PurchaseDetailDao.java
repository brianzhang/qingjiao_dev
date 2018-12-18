
package com.lc.ibps.demo.codegen.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * t_purchasedetaillist Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
public interface PurchaseDetailDao extends IDao<String, PurchaseDetailPo> {
	/**
	 * 根据主表id删除 t_purchasedetaillist 记录
	 * @param mainId 
	 * void
	 */
	public void deleteByMainId(String mainId);
}
