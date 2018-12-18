package com.lc.ibps.demo.codegen.service;

import java.util.List;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.common.cat.persistence.entity.TypePo;

/**
 * t_employee_dic 查询服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
public interface EmployeeDicQueryService {
	
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
	
	public String dicTree(String userId , List<TypePo> types);
	
	public String getByUserId(String userId);
}