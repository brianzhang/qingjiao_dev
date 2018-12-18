
package com.lc.ibps.demo.codegen.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

/**
 * 采购需求附件 Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
public interface PurchaseAttachDao extends IDao<String, PurchaseAttachPo> {
	/**
	 * 根据主表id删除 采购需求附件 记录
	 * @param mainId 
	 * void
	 */
	public void deleteByMainId(String mainId);
}
