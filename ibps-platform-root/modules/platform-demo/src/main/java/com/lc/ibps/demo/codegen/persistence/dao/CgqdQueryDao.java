package com.lc.ibps.demo.codegen.persistence.dao;

import java.util.List;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

/**
 * t_purchasedetaillist 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
public interface CgqdQueryDao extends IQueryDao<String, CgqdPo> {
	/**
	 * 根据主表ID查询 t_purchasedetaillist 列表
	 * @param mainId
	 * @return 
	 * List<CgqdPo>
	 */
	public List<CgqdPo> findByMainId(String mainId);
}