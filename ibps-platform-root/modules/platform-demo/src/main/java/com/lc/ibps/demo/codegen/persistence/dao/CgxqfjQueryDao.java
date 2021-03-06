package com.lc.ibps.demo.codegen.persistence.dao;

import java.util.List;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

/**
 * 采购需求附件 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
public interface CgxqfjQueryDao extends IQueryDao<String, CgxqfjPo> {
	/**
	 * 根据主表ID查询 采购需求附件 列表
	 * @param mainId
	 * @return 
	 * List<CgxqfjPo>
	 */
	public List<CgxqfjPo> findByMainId(String mainId);
}