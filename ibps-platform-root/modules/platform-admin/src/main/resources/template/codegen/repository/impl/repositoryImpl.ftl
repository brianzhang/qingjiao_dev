<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.repository.impl;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.repository.impl;
</#if>

<#if (isGenSub = 'true' && hasSub?exists && hasSub==true) || (sub?exists && sub)>
import java.util.List;
</#if>

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
import com.${scAlias}.${scPlatform}.base.core.util.BeanUtils;
</#if>
import com.${scAlias}.${scPlatform}.base.core.util.AppUtil;
import com.${scAlias}.${scPlatform}.base.framework.persistence.dao.IQueryDao;
import com.${scAlias}.${scPlatform}.base.framework.repository.AbstractRepository;
<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.domain.${class};
import com.${cAlias}.${cPlatform}.${sys}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.persistence.dao.${class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.persistence.dao.${subTable.variables.class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.domain.${class};
import com.${cAlias}.${cPlatform}.${sys}.${module}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.dao.${class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.dao.${subTable.variables.class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
</#if>

/**
 * ${model.tabComment} 仓库的实现类
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
@Repository
public class ${class}RepositoryImpl extends AbstractRepository<String, ${class}Po,${class}> implements ${class}Repository{
	  
	@Resource
	private  ${class}QueryDao ${classVar}QueryDao;
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
	@Resource
	private  ${subTable.variables.class}QueryDao ${subTable.variables.classVar}QueryDao;
	</#list>
	</#if>

	public ${class} newInstance() {
		${class}Po po = new ${class}Po();
		${class} ${classVar} = AppUtil.getBean(${class}.class);
		${classVar}.setData(po);
		return ${classVar};
	}

	public ${class} newInstance(${class}Po po) {
		${class} ${classVar} = AppUtil.getBean(${class}.class);
		${classVar}.setData(po);
		return ${classVar};
	} 
	
	@Override
	protected IQueryDao<String, ${class}Po> getQueryDao() {
		return ${classVar}QueryDao;
	}
	
	<#if sub?exists && sub>
	@Override
	public List<${class}Po> findByMainId(String mainId) {
		return ${classVar}QueryDao.findByMainId(mainId);
	}
	</#if>

	<#if isGenSub = 'true' && hasSub?exists && hasSub==true> 
	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	@Override
	public ${class}Po loadCascade(String id){
		${class}Po ${classVar}Po = null;
		if(StringUtil.isNotEmpty(id)){
			${classVar}Po = ${classVar}QueryDao.get(id);
			<#list model.subTableList as subTable>
			<#assign fromKey=getFromKeyName(subTable,model)>
			<#if fromKey?exists && fromKey != null && fromKey != ''>
			if(BeanUtils.isNotEmpty(${classVar}Po) && BeanUtils.isNotEmpty(${classVar}Po.get${fromKey?cap_first}())){
				List<${subTable.variables.class}Po> ${subTable.variables.classVar}PoList = ${subTable.variables.classVar}QueryDao.findByMainId(${classVar}Po.get${fromKey?cap_first}());
				${classVar}Po.set${subTable.variables.class}PoList(${subTable.variables.classVar}PoList);
			}
			<#else>
			if(BeanUtils.isNotEmpty(${classVar}Po)){
				List<${subTable.variables.class}Po> ${subTable.variables.classVar}PoList = ${subTable.variables.classVar}QueryDao.findByMainId(id);
				${classVar}Po.set${subTable.variables.class}PoList(${subTable.variables.classVar}PoList);
			}
			</#if>
			</#list>
		}
		return ${classVar}Po;
	}
	</#if>
	
}
