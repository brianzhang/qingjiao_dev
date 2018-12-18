package com.lc.ibps.demo.codegen.service;

import com.lc.ibps.api.base.query.QueryFilter;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 查询服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
public interface Cgqd1QueryService {
	
	/**
	 * 根据主键查询业务数据
	 *
	 * @param id 
	 */
	public String get(String id);
	
	
	/**
	 * 根据过滤器查询业务数据
	 *
	 * @param filter 
	 */
	public String query(QueryFilter filter);
	
	/**
	 * 查询所有业务数据
	 *
	 */
	public String findAll();
	
}