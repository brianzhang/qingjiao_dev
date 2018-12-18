<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.provider;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.provider;
</#if>

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.service.${class}Service;
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}Service;
</#if>
import com.${scAlias}.${scPlatform}.api.base.entity.WebAPIResult;
import com.${scAlias}.${scPlatform}.base.core.constants.StringPool;

<#if vars.flowKey?exists && vars.flowKey != "">
import com.${scAlias}.${scPlatform}.bpmn.api.cmd.BaseActionCmd;
</#if>

/**
 * ${comment} 服务类
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
@RestController
@RequestMapping("/${classVar}/")
public class ${class}Provider {
	@Resource
	private ${class}Service ${classVar}Service;
	
	<#if vars.flowKey?exists && vars.flowKey != "">
	@RequestMapping("start")
	public String start(@RequestParam String busData, @RequestParam String businessKey){
		WebAPIResult result = new WebAPIResult();
		try{
			BaseActionCmd cmd = new BaseActionCmd();
			cmd.setBusData(busData);
			cmd.setBusinessKey(businessKey);
			${classVar}Service.save(cmd);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
	@RequestMapping("startFlow")
	public String startFlow(@RequestParam String defKey, @RequestParam String destination, @RequestParam String ids){
		WebAPIResult result = new WebAPIResult();
		try{
			${classVar}Service.startFlow(defKey, destination, ids.split(StringPool.COMMA));
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	</#if>
	
	@RequestMapping("save")
	public String save(@RequestParam String jsonData){
		WebAPIResult result = new WebAPIResult();
		try{
			${classVar}Service.save(jsonData);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
	@RequestMapping("deleteByIds")
	public String deleteByIds(@RequestParam String ids){
		WebAPIResult result = new WebAPIResult();
		try{
			${classVar}Service.deleteByIds(ids.split(StringPool.COMMA));
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@RequestMapping("saveCascade")
	public String saveCascade(@RequestParam String jsonData){
		WebAPIResult result = new WebAPIResult();
		try{
			${classVar}Service.saveCascade(jsonData);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
	@RequestMapping("deleteByIdsCascade")
	public String deleteByIdsCascade(@RequestParam String ids){
		WebAPIResult result = new WebAPIResult();
		try{
			${classVar}Service.deleteByIdsCascade(ids.split(StringPool.COMMA));
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	</#if>
	
}
