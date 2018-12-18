<#assign pkVar=pkModel.colName >

package com.${cAlias}.${cPlatform}.${app}.${module}.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
import com.${scAlias}.${scPlatform}.base.core.entity.ResultMessage;
import com.${scAlias}.${scPlatform}.base.framework.page.PageList;
import com.${scAlias}.${scPlatform}.base.framework.page.PageResult;
import com.${scAlias}.${scPlatform}.api.base.query.QueryFilter;
import com.${scAlias}.${scPlatform}.base.web.controller.GenericController;
import com.${scAlias}.${scPlatform}.base.web.json.PageJson;
import com.${scAlias}.${scPlatform}.base.web.util.RequestUtil;
<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.service.${class}Service;
import com.${cAlias}.${cPlatform}.${sys}.service.${class}QueryService;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
<#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${subTable.variables.class}Po;
</#list>
</#if>
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}Service;
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}QueryService;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
<#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${subTable.variables.class}Po;
</#list>
</#if>
</#if>
<#if model.variables.struType = 'tree'>
import java.util.ArrayList;
import com.${scAlias}.${scPlatform}.base.core.util.BeanUtils;
</#if>
import com.${scAlias}.${scPlatform}.base.core.util.JacksonUtil;

import java.util.List;

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
@Controller
@RequestMapping("/${app}/${module}/${classVar}/")
public class ${class}Controller extends GenericController{
	@Resource
	private ${class}Service ${classVar}Service;
	@Resource
	private ${class}QueryService ${classVar}QueryService;
	
	<#if model.variables.struType='tree'>
	/**
	 * 获取结构数据
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	public @ResponseBody List<${class}Po> getTreeData(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		try {
			String listData = ${classVar}QueryService.findAll();
			
			List<${class}Po> ${classVar}List = ${class}Po.fromJsonArrayString(listData);
			
			if(BeanUtils.isEmpty(${classVar}List)){
				${classVar}List=new ArrayList<${class}Po>();
			}
			/*构建${comment}根节点*/
			${class}Po ${classVar}=new ${class}Po();
			${classVar}.set${convertUnderLine(model.variables.idKey)?cap_first}("0");
			${classVar}.set${convertUnderLine(model.variables.key)?cap_first}("${comment}");
			${classVar}List.add(${classVar});
			return ${classVar}List;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return null;
		}
	}
	<#else>
	/**
	 * 【${comment}】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		try{
			String listData = ${classVar}QueryService.query(queryFilter);
			PageList<${class}Po> ${classVar}List = null;
			if(JacksonUtil.isJsonObject(listData)){
				List<${class}Po> list = ${class}Po.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
				PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
				${classVar}List = new PageList<${class}Po>(list, pageResult);
			}
			
			return new PageJson(${classVar}List);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new PageJson();
		}
	}
	</#if>
	
	/**
	 * 编辑【${comment}】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		${pkType} ${pkVar}=RequestUtil.get${pkType}(request, "${pkVar}");
		<#if model.variables.struType = 'tree'>
		String ${convertUnderLine(model.variables.pidKey)}=RequestUtil.getString(request,"${convertUnderLine(model.variables.pidKey)}");
		</#if>
		${class}Po ${classVar}=null;
		if(StringUtil.isNotEmpty(${pkVar})){
			String data = null;
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			data = ${classVar}QueryService.loadCascade(${pkVar});
			<#else>
			data = ${classVar}QueryService.get(${pkVar});
			</#if>
			${classVar} = ${class}Po.fromJsonString(data);
		}<#if model.variables.struType = 'tree'>else{
			${classVar}=new ${class}Po();
			${classVar}.set${convertUnderLine(model.variables.pidKey)?cap_first}(${convertUnderLine(model.variables.pidKey)});
		}</#if>

		return getAutoView().addObject("${classVar}", ${classVar}).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【${comment}】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		${pkType} ${pkVar}=RequestUtil.get${pkType}(request, "${pkVar}");
		${class}Po ${classVar}=null;
		if(StringUtil.isNotEmpty(${pkVar})){
			String data = null;
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			data = ${classVar}QueryService.loadCascade(${pkVar});
			<#else>
			data = ${classVar}QueryService.get(${pkVar});
			</#if>
			${classVar} = ${class}Po.fromJsonString(data);
		}
		return getAutoView().addObject("${classVar}", ${classVar}).addObject("returnUrl", preUrl)<#if stuType = 'tree'>.addObject("${pIdKey}",${pIdKey})</#if>;
	}
	
	/**
	 * 【${comment}】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		${pkType} ${pkVar}=RequestUtil.get${pkType}(request, "${pkVar}");
		${class}Po ${classVar}=null;
		if(StringUtil.isNotEmpty(${pkVar})){
			String data = null;
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			data = ${classVar}QueryService.loadCascade(${pkVar});
			<#else>
			data = ${classVar}QueryService.get(${pkVar});
			</#if>
			${classVar} = ${class}Po.fromJsonString(data);
		}
		return getAutoView().addObject("${classVar}", ${classVar}).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【${comment}】信息
	 *
	 * @param request
	 * @param response
	 * @param  ${classVar}
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			${classVar}Service.saveCascade(json);
			<#else>
			${classVar}Service.save(json);
			</#if>
			message=new ResultMessage(ResultMessage.SUCCESS, "保存${comment}成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对${comment}操作失败,"+e.getMessage());
			logger.error("对${comment}操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【${comment}】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			${pkType}[] ids=RequestUtil.get${pkType}AryByStr(request, "${pkVar}");
			<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
			${classVar}Service.deleteByIdsCascade(ids);
			<#else>
			${classVar}Service.deleteByIds(ids);
			</#if>
			message=new ResultMessage(ResultMessage.SUCCESS, "删除${comment}成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除${comment}失败，" + e.getMessage());
			logger.error("删除${comment}失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	<#if vars.flowKey?exists && vars.flowKey != "">
	/**
	 *  启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String defKey = RequestUtil.getString(request, "defKey");
			String destination = RequestUtil.getString(request, "destination");
			${classVar}Service.startFlow(defKey, destination, ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "${comment}流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "${comment}流程启动失败，" + e.getMessage());
			logger.error("${comment}流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	</#if>

}
