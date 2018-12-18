<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.service;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.service;
</#if>

<#if vars.flowKey?exists && vars.flowKey != "">
import com.${scAlias}.${scPlatform}.bpmn.api.cmd.ActionCmd;
</#if>

/**
 * ${model.tabComment} 服务接口
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
public interface ${class}Service {
	
	<#if vars.flowKey?exists && vars.flowKey != "">
	/**
	 * 流程前置事件-保存业务数据
	 *
	 * @param cmd 
	 */
	public void save(ActionCmd cmd);
	
	/**
	 * 启动流程
	 *
	 * @param defKey
	 * @param ids 
	 */
	public void startFlow(String defKey, String destination, String[] ids);
	</#if>
	
	/**
	 * 保存业务数据
	 *
	 * @param jsonData 
	 */
	public void save(String jsonData);
	
	/**
	 * 根据主键数组删除业务数据
	 *
	 * @param ids 
	 */
	public void deleteByIds(String[] ids);
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	/**
	 * 保存业务数据
	 *
	 * @param jsonData 
	 */
	public void saveCascade(String jsonData);
	
	/**
	 * 根据主键数组删除业务数据
	 *
	 * @param ids 
	 */
	public void deleteByIdsCascade(String[] ids);
	</#if>
	
}