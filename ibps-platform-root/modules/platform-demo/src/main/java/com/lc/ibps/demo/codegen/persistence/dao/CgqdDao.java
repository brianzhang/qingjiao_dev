package com.lc.ibps.demo.codegen.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

/**
 * t_purchasedetaillist Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
public interface CgqdDao extends IDao<String, CgqdPo> {
	/**
	 * 根据主表id删除 t_purchasedetaillist 记录
	 * @param mainId 
	 * void
	 */
	public void deleteByMainId(String mainId);
}