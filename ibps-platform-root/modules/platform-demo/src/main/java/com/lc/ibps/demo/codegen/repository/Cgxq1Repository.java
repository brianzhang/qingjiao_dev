package com.lc.ibps.demo.codegen.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.demo.codegen.domain.Cgxq1;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;

/**
 * t_cgxq 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
public interface Cgxq1Repository extends IRepository<String, Cgxq1Po,Cgxq1>{

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	public Cgxq1Po loadCascade(String id);
}