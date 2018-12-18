<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.provider;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.provider;
</#if>

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.service.${class}QueryService;
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}QueryService;
</#if>
import com.${scAlias}.${scPlatform}.api.base.entity.WebAPIResult;
import com.${scAlias}.${scPlatform}.api.base.query.QueryFilter;
import com.${scAlias}.${scPlatform}.base.web.util.QueryUtil;

/**
 * ${comment} 控制类
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
public class ${class}QueryProvider {
	@Resource
	private ${class}QueryService ${classVar}QueryService;
	
	@RequestMapping("get/{id}")
	public String get(@PathVariable String id){
		WebAPIResult result = new WebAPIResult();
		String data = null;
		try{
			data = ${classVar}QueryService.get(id);
			result.setData(data);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		
		return result.toString();
	}
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@RequestMapping("loadCascade/{id}")
	public String loadCascade(@PathVariable String id){
		WebAPIResult result = new WebAPIResult();
		String data = null;
		try{
			data = ${classVar}QueryService.loadCascade(id);
			result.setData(data);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		
		return result.toString();
	}
	</#if>

	@RequestMapping("query")
	public String query(@RequestParam("filter") String filter){
		WebAPIResult result = new WebAPIResult();
		String data = null;
		try{
			QueryFilter queryFilter = QueryUtil.jsonString2QueryFilter(filter);
			data = ${classVar}QueryService.query(queryFilter);
			result.setData(data);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
	@RequestMapping("findAll")
	public String findAll(){
		WebAPIResult result = new WebAPIResult();
		String data = null;
		try{
			data = ${classVar}QueryService.findAll();
			result.setData(data);
		}catch(Exception e){
			result.setResult(WebAPIResult.ERROR);
			result.setCause(e.getMessage());
		}
		return result.toString();
	}
	
}
