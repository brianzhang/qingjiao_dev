package com.lc.ibps.platform.bpmn.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.bo.persistence.entity.BoAttributePo;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.identity.IUserPluginQueryHelper;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmVariableDefine;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.node.AutoTaskDefine;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.plugin.define.IBpmPluginDefine;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.plugin.core.context.AbstractBpmPluginContext;
import com.lc.ibps.components.httpclient.http.HttpClient;
import com.lc.ibps.components.httpclient.http.Response;
import com.lc.ibps.components.httpclient.model.PostParameter;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyUserPo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 
 * <pre>
 *  
 * 描述：流程节点配置管理
 * 构建组：ibps-platform-admin
 * 作者：caixy
 * 邮箱：3286168767@qq.com
 * 日期：2015-12-30 11:11:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */

@Controller
@RequestMapping("/platform/bpmn/bpmNodeDef/")
public class BpmNodeDefController extends GenericController {

	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private IUserPluginQueryHelper userPluginQueryHelper;
	@Resource
	private IPartyUserService defaultPartyUserService;
	@Resource
	private BoDefRepository boDefRepository;

	/**
	 * 节点人员条件
	 */
	@RequestMapping("conditionEdit")
	public ModelAndView conditionEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<?> nodeUserPluginList = (List<?>) AppUtil.getBean("nodeUserPluginList");
		String extract = AppUtil.getProperty("bpm.def.node.user.extract");
		return getAutoView().addObject("nodeUserPluginList", nodeUserPluginList)
							.addObject("extract", extract);
	}
	
	/**
	 * 节点集合
	 */
	@RequestMapping("nodeDef/sameNodeDialog")
	public ModelAndView sameNodeDialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		List<IBpmNodeDefine> nodeDefList = bpmDefineReader.findNodeWithoutSD(defId);
		
		return getAutoView()
				.addObject("defId", defId)
				.addObject("nodeId", nodeId)
				.addObject("nodeDefList", nodeDefList);
	}
	
	/**
	 * 预览人员条件
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("previewCondition")
	@ResponseBody
	public  PageJson previewCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String conditionArray= RequestUtil.getString(request, "conditionArray", "[]");
		String variables = RequestUtil.getString(request, "variables", "{}");
		JSONObject obj = JSONObject.fromObject(variables);
		Map<String,Object> map = (Map<String, Object>) JSONObject.toBean(obj, Map.class);  
		
		List<Map<String,String>> users = userPluginQueryHelper.queryUsersByConditions(conditionArray,map);
		List<User> us = new ArrayList<User>();
		if(BeanUtils.isNotEmpty(users)){
			for(Map<String, String> userMap :users){
				User user = 
						DefaultPartyUserPo.fromJsonString2(
								defaultPartyUserService.getByIdJson(userMap.get(BpmIdentity.IDENT_ID)));
				us.add(user);
			}
		}
		return new PageJson(us); 
	}

	/**
	 * 自动节点，获取插件数据
	 */
	@RequestMapping("autoTaskPluginGet")
	public ModelAndView autoTaskPluginGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		String pluginType = RequestUtil.getString(request, "pluginType");
		List<IBpmVariableDefine> bpmVariableList = getAllBpmVariableDef(defId, nodeId);
		ModelAndView mv = new ModelAndView(
				"/platform/bpmn/bpmNodeDefAutoTask" + StringUtil.convertFirst(pluginType, true) + "Edit.jsp");

		AutoTaskDefine autoTaskDef = (AutoTaskDefine) bpmDefineReader.getNode(defId, nodeId);

		AbstractBpmPluginContext bpmPluginContext = (AbstractBpmPluginContext) autoTaskDef
				.getAutoTaskBpmPluginContext();

		// 已经选择并保存该插件。
		if (bpmPluginContext != null && (bpmPluginContext.getType().equals(pluginType)
				|| bpmPluginContext.getType().toLowerCase().indexOf("service") != -1)) {
			IBpmPluginDefine bpmPluginDef = bpmPluginContext.getBpmPluginDefine();
			mv.addObject("bpmPluginDef", bpmPluginDef);
			String json = bpmPluginContext.getJson();
			mv.addObject("bpmPluginDefJson", json);
		}

		return mv.addObject("defId", defId).addObject("nodeId", nodeId).addObject("bpmPluginContext", bpmPluginContext)
				.addObject("pluginType", pluginType).addObject("bpmVariableList", bpmVariableList);
	}

	/**
	 * 该节点能用的所有变量
	 */
	private List<IBpmVariableDefine> getAllBpmVariableDef(String defId, String nodeId) {
		List<IBpmVariableDefine> bpmVariableList = new ArrayList<IBpmVariableDefine>();
		// 全局变量
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDefExt = bpmDefineReader.getBpmProcDefine(defId);
		BpmProcExtendDefine defExt = (BpmProcExtendDefine) bpmProcessDefExt.getBpmProcExtendDefine();
		if (defExt.getVarList() != null) {
			bpmVariableList.addAll(defExt.getVarList());
		}
		return bpmVariableList;
	}

	@RequestMapping("getRestApi")
	@ResponseBody
	public Map<String, Object> getRestApi(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		Map<String, Object> rs = new HashMap<String, Object>();

		String target = RequestUtil.getString(request, "target");
		String baseUrl = AppUtil.getProperty("webapi.baseURL")+AppUtil.getProperty("webapi.apiDocs");

		boolean success = true;
		String path;
		try {
			path = target.substring(target.indexOf(baseUrl) + baseUrl.length(), target.length());
		} catch (Exception e) {
			success = false;
			rs.put("msg", "此地址无效");
			return rs;
		}

		String baseApiUrl = baseUrl;
		HttpClient client = new HttpClient();
		Response res = client.get(baseApiUrl, new PostParameter[] {}, false, null);
		JSONObject json = res.asJSONObject();
		JSONObject getPath = json.getJSONObject("paths").getJSONObject(path);

		Map<String, Object> map = new HashMap<String, Object>();
		if (getPath != null) {
			JSONObject cont = null;
			if (getPath.has("get")) {
				cont = getPath.getJSONObject("get");
			} else {
				cont = getPath.getJSONObject("post");
			}
			map.put("url", target);
			map.put("methodName", cont.getString("operationId"));
			JSONArray arrs = cont.getJSONArray("parameters");
			List<Map<String, String>> params = new ArrayList<Map<String, String>>();
			for (int idx = 0; idx < arrs.size(); idx++) {
				Map<String, String> p = new HashMap<String, String>();
				JSONObject jo = arrs.getJSONObject(idx);
				p.put("name", jo.getString("name"));
				p.put("in", jo.getString("in"));
				p.put("required", jo.getString("required"));
				p.put("type", jo.getString("type"));
				p.put("valtype", "0");
				params.add(p);
			}
			map.put("paramsSize", params.size() * 2);
			map.put("input", params);
		} else {
			success = false;
			rs.put("msg", "此地址无效");
		}
		rs.put("success", success);
		rs.put("serviceSet", map);
		return rs;
	}
	
	/**
	 * 获取流程节点的流程变量的选择框
	 * bo变量，流程变量
	 */
	@RequestMapping("flowVarJson")
	@ResponseBody
	public  JSONArray flowVarJson(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String defId= RequestUtil.getString(request, "defId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		boolean includeBpmConstants = RequestUtil.getBoolean(request, "includeBpmConstants",false);
		List<IBpmVariableDefine> variables = getAllBpmVariableDef(defId, nodeId);
		BoDefPo boList = getBpmDefBo(defId);
		return getFlowVarJson(boList,variables,includeBpmConstants); 
	}
	
	/***
	 * 获取流程定义的所有的BO 数据
	 * @param defId
	 * @return
	 */
	private BoDefPo getBpmDefBo(String defId){
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDefExt = bpmDefineReader.getBpmProcDefine(defId);
//		if(bpmProcessDefExt == null) return Collections.emptyList();
		BpmProcExtendDefine defaultBpmProcessDefExt = (BpmProcExtendDefine) bpmProcessDefExt.getBpmProcExtendDefine();
//		if(defaultBpmProcessDefExt == null) return Collections.emptyList();
		ProcBoDefine procBoDefine = defaultBpmProcessDefExt.getBoDefine();
		
//		List<BoDefPo> boList = new ArrayList<BoDefPo>();
//		for(ProcBoDefine boDef : procBoDefList){
		BoDefPo boDef = null;
		if(BeanUtils.isNotEmpty(procBoDefine)){
			boDef = boDefRepository.getByCode(procBoDefine.getKey());
		}
//			if(BeanUtils.isNotEmpty(bODef)) {
//				boList.add(bODef);
//			}
//		}
		return boDef;
	}
	
	/** 拼装 流程bo(不包含子表)、 流程变量、流程常量的json 数据
	 * {}
	 * **/ 
	private JSONArray getFlowVarJson(BoDefPo boDef, List<IBpmVariableDefine> variables, boolean includeBpmConstants) {
		JSONArray varList = new JSONArray();
		
		//BO变量
		String boRootId = UniqueIdUtil.getId();
		JSONObject boDefRoot = JSONObject.fromObject("{\"name\":\"业务对象\",\"id\":\""+boRootId+"\",\"fromType\":\"root\",\"description\":\"业务对象\"}");
//		for(BoDefPo boDef : boList){
		if(BeanUtils.isNotEmpty(boDef)){
			JSONObject obj = new JSONObject();
			obj.accumulate("id",boDef.getId()); 
			obj.accumulate("parentId",boRootId);
			obj.accumulate("name",boDef.getName());
			obj.accumulate("description", boDef.getDesc());
			obj.accumulate("fromType", "bo");
			varList.add(obj);
			for(BoAttributePo attr : boDef.getAttrList()){
				if(BoAttributePo.BoAttributeType.BASE.equals(attr.getType())){
					JSONObject attrObj = new JSONObject();
					attrObj.accumulate("id", attr.getId());
					attrObj.accumulate("parentId",boDef.getId());
					attrObj.accumulate("name", attr.getName());
					attrObj.accumulate("description",attr.getDesc());
					attrObj.accumulate("fromType", "boAttr"); 
					attrObj.accumulate("code",boDef.getCode());
					attrObj.accumulate("dataType", attr.getDataType());
					varList.add(attrObj);
				}
			}
			
		}
		 //流程变量 
		String varRootId = UniqueIdUtil.getId();
		JSONObject varRoot = JSONObject.fromObject("{\"name\":\"流程变量\",\"id\":\""+varRootId+"\",\"fromType\":\"root\",\"description\":\"流程变量\"}");
		for(IBpmVariableDefine variable : variables) {
			String name = variable.getName(); // 前端流程变量都是 取name， 而名字为description
			variable.setName(variable.getKey());
			variable.setDescription(name);
			JSONObject obj = JSONObject.fromObject(variable);
			obj.accumulate("id",Math.random()*10000+"");
			obj.accumulate("parentId",varRootId);
			obj.accumulate("fromType", "var");
			varList.add(obj);
		}
		varList.add(boDefRoot);  varList.add(varRoot);
		//如果表单变量需要包含流程常量
		if(includeBpmConstants){
			String BpmConstantId = UniqueIdUtil.getId();
			JSONObject bpmConstantRoot = JSONObject.fromObject("{\"name\":\"流程常量\",\"id\":\""+BpmConstantId+"\",\"fromType\":\"root\",\"description\":\"流程变量\"}");
			 
			JSONObject bmpnInstId = JSONObject.fromObject("{\"name\":\""+BpmConstants.PROCESS_INST_ID +"\",\"id\":\"1212\"," +
					"\"parentId\":\""+BpmConstantId+"\",\"fromType\":\"bpmConstants\",\"description\":\"流程实例ID\",\"dataType\":\"string\"}");
			JSONObject bussinessKey = JSONObject.fromObject("{\"name\":\""+BpmConstants.BPM_FLOW_KEY +"\",\"id\":\"asdfad\"," +
					"\"parentId\":\""+BpmConstantId+"\",\"fromType\":\"bpmConstants\",\"description\":\"流程定义Key\",\"dataType\":\"string\"}");
			JSONObject startUser = JSONObject.fromObject("{\"name\":\""+BpmConstants.START_USER +"\",\"id\":\"asdfasdfass\"," +
					"\"parentId\":\""+BpmConstantId+"\",\"fromType\":\"bpmConstants\",\"description\":\"发起人\",\"dataType\":\"string\"}");
			
			varList.add(bmpnInstId);varList.add(bussinessKey);varList.add(startUser);
			varList.add(bpmConstantRoot);
		}
		return varList;
	}

}
