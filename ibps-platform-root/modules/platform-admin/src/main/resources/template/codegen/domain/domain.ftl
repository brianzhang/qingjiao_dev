<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.domain;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.domain;
</#if>

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.${scAlias}.${scPlatform}.base.core.util.BeanUtils;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
</#if>
import com.${scAlias}.${scPlatform}.base.core.util.AppUtil;
import com.${scAlias}.${scPlatform}.base.framework.domain.AbstractDomain;
<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.persistence.dao.${class}Dao;
import com.${cAlias}.${cPlatform}.${sys}.persistence.dao.${class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
<#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.persistence.dao.${subTable.variables.class}Dao;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${subTable.variables.class}Po;
</#list>
</#if>
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.dao.${class}Dao;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.dao.${class}QueryDao;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
<#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.dao.${subTable.variables.class}Dao;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${subTable.variables.class}Po;
</#list>
</#if>
</#if>

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.repository.${class}Repository;
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.repository.${class}Repository;
</#if>
import javax.annotation.Resource;

/**
 * ${model.tabComment} 领域对象实体
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
@SuppressWarnings("serial")
@Service
@Transactional
@Scope("prototype")
public class ${class} extends AbstractDomain<String, ${class}Po>{
	 
	private ${class}Dao ${classVar}Dao = null;
	private ${class}QueryDao ${classVar}QueryDao = null;

	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	<#list model.subTableList as subTable>
	private ${subTable.variables.class}Dao ${subTable.variables.classVar}Dao = null;
	</#list>
	</#if>

	protected void init(){
		${classVar}Dao = AppUtil.getBean(${class}Dao.class);
		${classVar}QueryDao = AppUtil.getBean(${class}QueryDao.class);
		<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
		${subTable.variables.classVar}Dao = AppUtil.getBean(${subTable.variables.class}Dao.class);
		</#list></#if>
		this.setDao(${classVar}Dao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(${classVar}QueryDao.get(getId())));
	}
	
	<#if isGenSub = 'true' && hasSub?exists && hasSub==true> 
	/**
	 * 主从表一并保存 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void saveCascade(){
		save();
		if(getData().isDelBeforeSave()){
			<#list model.subTableList as subTable>
			<#assign fromKey=getFromKeyName(subTable,model)>
			<#if fromKey?exists && fromKey != null && fromKey != ''>
			${subTable.variables.classVar}Dao.deleteByMainId(getData().get${fromKey?cap_first}());
			<#else>
			${subTable.variables.classVar}Dao.deleteByMainId(getId());
			</#if>
			</#list>
		}
		
		<#list model.subTableList as subTable>
		if(BeanUtils.isNotEmpty(getData().get${subTable.variables.class}PoList())){
			for(${subTable.variables.class}Po ${subTable.variables.classVar}Po:getData().get${subTable.variables.class}PoList()){
				//设置外键
				<#assign foreignKey=getFkName(subTable)>
				<#assign fromKey=getFromKeyName(subTable,model)>
				<#if fromKey?exists && fromKey != null && fromKey != ''>
				${subTable.variables.classVar}Po.set${foreignKey?cap_first}(getData().get${fromKey?cap_first}());
				<#else>
				${subTable.variables.classVar}Po.set${foreignKey?cap_first}(getId());
				</#if>
				${subTable.variables.classVar}Dao.create(${subTable.variables.classVar}Po);
			}
		}
		</#list>
	}	
	
	/**
	 * 主从表一并删除 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void deleteByIdsCascade(String[] ids){
		for(String id : ids){
			${class}Po po = ${classVar}QueryDao.get(id);
			<#list model.subTableList as subTable>
			<#assign fromKey=getFromKeyName(subTable,model)>
			<#if fromKey?exists && fromKey != null && fromKey != ''>
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.get${fromKey?cap_first}())){
				${subTable.variables.classVar}Dao.deleteByMainId(po.get${fromKey?cap_first}());
			}	
			<#else>
			${subTable.variables.classVar}Dao.deleteByMainId(id);
			</#if>
			</#list>
		}
		deleteByIds(ids);
	}
	</#if>		 
	
}
