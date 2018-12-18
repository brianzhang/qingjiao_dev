package com.lc.ibps.demo.codegen.persistence.dao;

import java.util.List;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
public interface Cgqd1QueryDao extends IQueryDao<String, Cgqd1Po> {
	/**
	 * 根据主表ID查询 采购需求表示：1，采购清单：2；1对多关系 列表
	 * @param mainId
	 * @return 
	 * List<Cgqd1Po>
	 */
	public List<Cgqd1Po> findByMainId(String mainId);
}