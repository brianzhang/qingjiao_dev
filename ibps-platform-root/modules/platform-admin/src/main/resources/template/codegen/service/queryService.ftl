<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.service;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.service;
</#if>

import com.${scAlias}.${scPlatform}.api.base.query.QueryFilter;

/**
 * ${model.tabComment} 查询服务接口
 *
 *<pre> 
 <#if vars.company?exists>
 * 开发公司：${vars.company}
 </#if>
 <#if vars.developer?exists>
 * 开发人员：${vars.developer}
 </#if>
 <#if vars.email?exists>
 * 邮箱地址：${vars.email}
 </#if>
 * 创建时间：${date?string("yyyy-MM-dd HH:mm:ss")}
 *</pre>
 */
public interface ${class}QueryService {
	
	/**
	 * 根据主键查询业务数据
	 *
	 * @param id 
	 */
	public String get(String id);
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	/**
	 * 根据主键级联查询业务数据
	 *
	 * @param id 
	 */
	public String loadCascade(String id);
	</#if>
	
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