<#if isBaseModule = 'true'>
package com.${cAlias}.${cPlatform}.${sys}.service.impl;
<#else>
package com.${cAlias}.${cPlatform}.${sys}.${module}.service.impl;
</#if>

<#if (isGenSub = 'true' && hasSub?exists && hasSub==true) || (sub?exists && sub)>
import java.util.List;
</#if>

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.${scAlias}.${scPlatform}.base.core.util.BeanUtils;
import com.${scAlias}.${scPlatform}.base.core.util.string.StringUtil;
import com.${scAlias}.${scPlatform}.base.core.util.JacksonUtil;
<#if vars.flowKey?exists && vars.flowKey != "">
import com.${scAlias}.${scPlatform}.base.bo.constants.DataSaveMode;
import com.${scAlias}.${scPlatform}.base.web.context.ContextUtil;
import com.${scAlias}.${scPlatform}.bpmn.api.cmd.ActionCmd;
import com.${scAlias}.${scPlatform}.bpmn.api.constant.BpmConstants;
import com.${scAlias}.${scPlatform}.bpmn.api.define.IBpmDefineReader;
import com.${scAlias}.${scPlatform}.bpmn.api.model.define.IBpmDefine;
import com.${scAlias}.${scPlatform}.bpmn.api.model.define.IBpmProcDefine;
import com.${scAlias}.${scPlatform}.bpmn.api.model.form.FormCategory;
import com.${scAlias}.${scPlatform}.bpmn.api.model.identity.BpmIdentity;
import com.${scAlias}.${scPlatform}.bpmn.api.model.node.ProcBoDefine;
import com.${scAlias}.${scPlatform}.bpmn.api.service.BpmDefineService;
import com.${scAlias}.${scPlatform}.bpmn.api.service.BpmProcInstService;
import com.${scAlias}.${scPlatform}.bpmn.cmd.IbpsProcInstCmd;
import com.${scAlias}.${scPlatform}.bpmn.model.define.BpmProcExtendDefine;
import com.${scAlias}.${scPlatform}.bpmn.utils.BpmIdentityUtil;
</#if>

<#if isBaseModule = 'true'>
import com.${cAlias}.${cPlatform}.${sys}.domain.${class};
import com.${cAlias}.${cPlatform}.${sys}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.service.${class}Service;
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
<#else>
import com.${cAlias}.${cPlatform}.${sys}.${module}.domain.${class};
import com.${cAlias}.${cPlatform}.${sys}.${module}.repository.${class}Repository;
import com.${cAlias}.${cPlatform}.${sys}.${module}.service.${class}Service;
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${class}Po;
<#if isGenSub = 'true' && hasSub?exists && hasSub==true><#list model.subTableList as subTable>
import com.${cAlias}.${cPlatform}.${sys}.${module}.persistence.entity.${subTable.variables.class}Po;
</#list></#if>
</#if>

import java.util.Map;

/**
 * ${model.tabComment} 服务的实现类
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
@Service("${classVar}Service")
@Transactional
public class ${class}ServiceImpl implements ${class}Service{
	  
	@Resource
	private ${class}Repository ${classVar}Repository;
	<#if vars.flowKey?exists && vars.flowKey != "">
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;
	</#if>

	<#if vars.flowKey?exists && vars.flowKey != "">
	@Override
	public void save(ActionCmd cmd) {
		${class} ${classVar} = getDomain(cmd.getBusData(), cmd.getBusinessKey());
		if(BeanUtils.isEmpty(${classVar})){
			return;
		}
		<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
		${classVar}.saveCascade();
		<#else>
		${classVar}.save();
		</#if>
	}
	
	/**
	 * 启动流程
	 *
	 * @param defKey
	 * @param ids 
	 */
	public void startFlow(String defKey, String destination, String[] ids) {
		if(BeanUtils.isEmpty(ids)){
			return;
		}
		
		${class}Po po = null;
		IbpsProcInstCmd cmd = null;
		for(String id : ids){
			<#if hasSub?exists && hasSub==true>
			po = ${classVar}Repository.loadCascade(id);
			<#else>
			po = ${classVar}Repository.get(id);
			</#if>
			if(BeanUtils.isEmpty(po)){
				continue;
			}
			
			cmd = getStartCmd(defKey, destination, id, JacksonUtil.toJsonString(po));
			bpmProcInstService.startProcInst(cmd);
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getStartCmd(String defKey, String destination, String busId,String busData) {
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(defKey, false);
		if(BeanUtils.isEmpty(bpmDefine)){
			throw new RuntimeException("流程不存在，流程key【"+defKey+"】");
		}
		
		/* 节点执行人
		 * [
		 * 	{nodeId:"UserTask_16w6bmp"
		 * 	 ,executors:[{id:"1",type:"employee",name:"管理员"}]
		 * 	}
		 * ]
		 */
		String nodeUsers = "[]";

		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(busId);
		cmd.setDestination(destination);
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(bpmDefine.getDefId());
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String dataSaveMode = DataSaveMode.TABLE;
			FormCategory formCategory = bpmProcExtendDefine.getGlobalForm().getType();
			if(FormCategory.INNER.equals(formCategory)  ){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable()?DataSaveMode.TABLE:DataSaveMode.INSTANCE;
			}else if(FormCategory.URL_LOAD.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PAIR;
			}else if(FormCategory.FRAME.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PK;
			}
			
			cmd.setDataMode(dataSaveMode);
		
			cmd.setBusData(busData);
		}

		// 设置指定执行人
		if (BeanUtils.isNotEmpty(specUserMap)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}

		// 设置当前执行人信息
		cmd.setOptIp(ContextUtil.getCurrentUserIp());
		cmd.setCurUser(ContextUtil.getCurrentUserId());
		cmd.setCurUserName(ContextUtil.getCurrentUser().getFullname());
		
		return cmd;
	}
	</#if>

	@Override
	public void save(String jsonData) {
		${class} ${classVar} = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(${classVar})){
			return;
		}
		${classVar}.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		${class} ${classVar} = ${classVar}Repository.newInstance();
		${classVar}.deleteByIds(ids);
	}

	<#if isGenSub = 'true' && hasSub?exists && hasSub==true>
	@Override
	public void saveCascade(String jsonData) {
		${class} ${classVar} = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(${classVar})){
			return;
		}
		${classVar}.saveCascade();
	}
	
	@Override
	public void deleteByIdsCascade(String[] ids){
		${class} ${classVar} = ${classVar}Repository.newInstance();
		${classVar}.deleteByIdsCascade(ids);
	}
	</#if>

	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private ${class} getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		${class}Po po = ${class}Po.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		${class} ${classVar} = ${classVar}Repository.newInstance(po);
		
		return ${classVar};
	}
	
}
