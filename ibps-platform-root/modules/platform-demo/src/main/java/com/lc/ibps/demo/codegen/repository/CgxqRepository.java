package com.lc.ibps.demo.codegen.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.demo.codegen.domain.Cgxq;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;

/**
 * 采购需求 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
public interface CgxqRepository extends IRepository<String, CgxqPo,Cgxq>{

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	public CgxqPo loadCascade(String id);
}