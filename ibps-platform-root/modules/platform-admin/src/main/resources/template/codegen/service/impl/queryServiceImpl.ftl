<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.service.impl;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.service.impl;
</#if>

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.${scAlias}.${scPlatform}.api.base.query.QueryFilter;
import com.${scAlias}.${scPlatform}.base.core.util.BeanUtils;
import com.${scAlias}.${scPlatform}.base.core.util.JacksonUtil;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
</#if>

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.service.${class}QueryService;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}QueryService;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
</#if>

/**
 * ${model.tabComment} 查询服务的实现类
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
@Service("${classVar}QueryService")
public class ${class}QueryServiceImpl implements ${class}QueryService{
	  
	@Resource
	private ${class}Repository ${classVar}Repository;

	@Override
	public String get(String id) {
		${class}Po po = ${classVar}Repository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toJsonString();
	}
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@Override
	public String loadCascade(String id) {
		${class}Po po = ${classVar}Repository.loadCascade(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toJsonString();
	}
	</#if>

	@Override
	public String query(QueryFilter filter) {
		List<${class}Po> pos = ${classVar}Repository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<${class}Po> pos = ${classVar}Repository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : JacksonUtil.toJsonString(pos);
	}
	
}
