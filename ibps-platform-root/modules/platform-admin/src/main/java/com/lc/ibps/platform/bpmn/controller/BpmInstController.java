package com.lc.ibps.platform.bpmn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.ActivitiException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.collect.Maps;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.form.constants.RightsScope;
import com.lc.ibps.api.form.service.IFormRightsService;
import com.lc.ibps.api.form.vo.FormPermissionVo;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.constant.ProcInstStatus;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.exception.NoTaskUserException;
import com.lc.ibps.bpmn.api.model.def.BpmDefLayout;
import com.lc.ibps.bpmn.api.model.define.BpmDefineAttributes;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmVariableDefine;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.form.IFormModel;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.image.BpmProcessStatusColor;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.Button;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.IExtForm;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.model.task.IBpmTaskApproval;
import com.lc.ibps.bpmn.api.service.BpmApprovalService;
import com.lc.ibps.bpmn.api.service.BpmBoService;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmFormService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.api.service.BpmTaskService;
import com.lc.ibps.bpmn.api.service.DiagramService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.core.model.var.BpmVariableDefine;
import com.lc.ibps.bpmn.domain.BpmInst;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmInstHisPo;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.repository.BpmInstHisRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.utils.BpmButtonUtil;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.bpmn.utils.FlowStatusColorUtil;

/**
 * 流程实例 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-06 09:26:18
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/instance/bpmInst/")
public class BpmInstController extends GenericController {
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private BpmFormService bpmFormService;
	@Resource
	private BpmBoService bpmBoService;
	@Resource
	private IFormRightsService formRightsService;
	@Resource
	private BpmProcInstService bpmProcInstService;
	@Resource
	private BpmTaskService bpmTaskService;
	@Resource
	private BpmApprovalService bpmApprovalService;
	@Resource
	private DiagramService diagramService;
	@Resource
	private BpmInstHisRepository bpmInstHisRepository;
	@Resource
	private IPartyUserService userService;

	/**
	 * 【流程实例】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("status_", ProcInstStatus.STATUS_RUNNING.getKey(), QueryOP.EQUAL);
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		PageList<BpmInstPo> bpmInstList = (PageList<BpmInstPo>) bpmInstRepository.query(queryFilter, curUser.getUserId(), isSuper);
		return new PageJson(bpmInstList);
	}

	/**
	 * 编辑【流程实例】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		BpmInstPo bpmInst = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmInst = bpmInstRepository.get(id);
		}
		return getAutoView().addObject("bpmInst", bpmInst).addObject("returnUrl", preUrl);
	}

	/**
	 * 【流程实例】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		BpmInstPo bpmInst = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmInst = bpmInstRepository.get(id);
			//是结束的实例
			if(BeanUtils.isEmpty(bpmInst)){
				bpmInst = bpmInstRepository.getHistoryById(id);
			}
		}
		return getAutoView().addObject("bpmInst", bpmInst).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【流程实例】信息
	 *
	 * @param request
	 * @param response
	 * @param bpmInst
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, BpmInstPo bpmInstPo) throws Exception {
		ResultMessage message = null;
		try {
			// 构造领域对象和保存数据
			BpmInst bpmInst = bpmInstRepository.newInstance(bpmInstPo);
			bpmInst.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存流程实例成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对流程实例操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 保存草稿
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveDraft")
	@ResponseBody
	public void saveDraft(HttpServletRequest request, HttpServletResponse response) throws Exception {
		IbpsProcInstCmd cmd = this.getStartCmd(request);
		try {
			bpmProcInstService.saveDraft(cmd);
			writeResultMessage(response.getWriter(), "草稿保存成功", ResultMessage.SUCCESS);
		} catch (ActivitiException ex) {
			Throwable cause = ex.getCause();
			if (cause != null) {
				Throwable cause2 = cause.getCause();
				if (cause2 != null && cause2 instanceof NoTaskUserException) {
					writeResultMessage(response.getWriter(), "草稿保存失败", cause2.getMessage(), ResultMessage.FAIL);
				} else {
					writeResultMessage(response.getWriter(), "草稿保存失败", ex.getMessage(), ResultMessage.FAIL);
				}
			} else {
				writeResultMessage(response.getWriter(), "草稿保存失败", ex.getMessage(), ResultMessage.FAIL);
			}
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "草稿保存失败", e.getMessage(), ResultMessage.FAIL);
			logger.error("草稿保存失败" + e.getMessage(), e);
		}
	}

	/**
	 * 批量删除【流程实例】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			QueryFilter queryFilter = getQuerFilter(request);
			User curUser = ContextUtil.getCurrentUser();
			boolean isSuper = userService.isSuperUser(curUser.getAccount());
			String canotDelete = bpmInstRepository.cannotDelete(queryFilter, curUser.getUserId(), ids);
			// 超级管理员及有删除权限人员可删除流程定义
			if(isSuper || StringUtil.isEmpty(canotDelete)){
				// 构造领域对象和保存数据
				BpmInst bpmInst = bpmInstRepository.newInstance();
				bpmInst.removeByIds(ids);
				message = new ResultMessage(ResultMessage.SUCCESS, "删除流程实例成功");
			}else{
				message=new ResultMessage(ResultMessage.FAIL, "删除流程实例失败，对流程实例["+canotDelete+"]没有删除权限");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除流程实例失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 流程实例明细页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("detail")
	public ModelAndView detail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		String isReturn = RequestUtil.getString(request, "isReturn", null);
		//是否是结束的实例
		boolean isEnd = RequestUtil.getBoolean(request, "isEnd");
		return getAutoView().addObject("id", id)
							.addObject("returnUrl", preUrl)
							.addObject("isReturn", isReturn)
							.addObject("isEnd", isEnd);
	}

	/**
	 * 流程启动页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toStart")
	public ModelAndView toStart(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		String defKey = RequestUtil.getString(request, "defKey");
		// 草稿启动流程，传递流程实例Id
		String proInstId = RequestUtil.getString(request, "proInstId");
		if(StringUtil.isEmpty(defId) && StringUtil.isNotEmpty(defKey)){
			IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(defKey);
			if(BeanUtils.isNotEmpty(bpmDefine))
				defId = bpmDefine.getDefId();
		}

		IBpmProcDefine<IBpmProcExtendDefine> procDef = bpmDefineReader.getBpmProcDefine(defId);

		BpmDefineAttributes attributes = procDef.getBpmProcExtendDefine().getExtendAttributes();
		boolean firstNodeUserAssign = true;
		if(BeanUtils.isNotEmpty(attributes))
			firstNodeUserAssign = attributes.isFirstNodeUserAssign();
		// 获取开始节点后的第一个节点
		List<IBpmNodeDefine> nodeDefs = bpmDefineReader.findStartNode(defId);

		return getAutoView().addObject("defId", defId).addObject("proInstId", proInstId)
				.addObject("firstNodeUserAssign", firstNodeUserAssign).addObject("nodeId", BeanUtils.isNotEmpty(nodeDefs)?nodeDefs.get(0).getNodeId():"");
	}
	
	/**
	 * 启动流程实例
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 *             void
	 */
	@RequestMapping("start")
	@ResponseBody
	public void start(HttpServletRequest request, HttpServletResponse response) throws Exception {
		IbpsProcInstCmd cmd = this.getStartCmd(request);
		try {
			bpmProcInstService.startProcInst(cmd);
			writeResultMessage(response.getWriter(), "流程启动成功", ResultMessage.SUCCESS);
		} catch (ActivitiException ex) {
			Throwable cause = ex.getCause();
			if (cause != null) {
				Throwable cause2 = cause.getCause();
				if (cause2 != null && cause2 instanceof NoTaskUserException) {
					writeResultMessage(response.getWriter(), "流程启动失败", cause2.getMessage(), ResultMessage.FAIL);
				} else {
					writeResultMessage(response.getWriter(), "流程启动失败", ex.getMessage(), ResultMessage.FAIL);
				}
			} else {
				writeResultMessage(response.getWriter(), "流程启动失败", ex.getMessage(), ResultMessage.FAIL);
			}
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "流程启动失败", e.getMessage(), ResultMessage.FAIL);
			logger.error("流程启动失败" + e.getMessage(), e);
		}
	}
	
	/**
	 * 获取发起的cmd格式数据
	 * 
	 * @param defId
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getStartCmd(HttpServletRequest request) {
		String defId = RequestUtil.getString(request, "defId");
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefId(defId);
		String instId = RequestUtil.getString(request, "proInstId");
		
		int version = RequestUtil.getInt(request, "version",0);
		
		// 判断流程状态，权限
		String defKey = bpmDefine.getDefKey();
		// 目标节点
		String destination = RequestUtil.getString(request, "destination", "");
		/* 节点执行人
		 * [
		 * 	{nodeId:"UserTask_16w6bmp"
		 * 	 ,executors:[{id:"1",type:"org,user,pos",name:"管理员"}]
		 * 	}
		 * ]
		 */
		String nodeUsers = RequestUtil.getString(request, "nodeUsers");

		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(UniqueIdUtil.getId());
		cmd.setDestination(destination);
		if (StringUtil.isNotEmpty(instId))
			cmd.setInstId(instId);
		// 流程表单数据
		String busData = RequestUtil.getString(request, "data");
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(defId);
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String  dataSaveMode  =DataSaveMode.TABLE;
			IExtForm  form = 	bpmProcExtendDefine.getGlobalForm();
			FormCategory formCategory  =	form.getType();
			if(FormCategory.INNER.equals(formCategory)  ){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable()?DataSaveMode.TABLE:DataSaveMode.INSTANCE;
				//设置表单cmd
				bpmFormService.setFormOptions(cmd,defId);
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

		// 设置流程启动变量
		cmd.setVariables(this.getProcStartVars(defId,request));

		// 设置当前执行人信息
		User curUser = ContextUtil.getCurrentUser();
		cmd.setOptIp(RequestUtil.getIpAddr(request));
		cmd.setCurUser(curUser.getUserId());
		cmd.setCurUserName(curUser.getFullname());
		cmd.setVersion(version);
		
		return cmd;
	}
	
	/**
	 * 获取流程启动变量
	 * @param defId 
	 *
	 * @param request
	 * @return 
	 */
	private Map<String, Object> getProcStartVars(String defId, HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		List<IBpmVariableDefine> list = bpmDefineService.getVariableDefs(defId);
		if (BeanUtils.isEmpty(list)) return params;
		
		for (IBpmVariableDefine varDef : list) {
//			String reqValue = RequestUtil.getString(request, varDef.getKey());
//			if (StringUtil.isNotEmpty(reqValue)) {
				params.put(varDef.getKey(), BpmVariableDefine.getValue(varDef.getDataType(), varDef.getDefaultVal().toString()));
//			}
		}
		
		return params;
	}

	/**
	 * 发起流程时获取表单和bo
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getFormData")
	@ResponseBody
	public Object getFormData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = request.getParameter("defId");
		String proInstId = request.getParameter("proInstId");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);
		logger.info("defId:" + defId + "====proInstId:" + proInstId);
		IDataObject dataObject = null;
		IFormModel formModel  =null;
		String permissions = "";
		boolean isStart = StringUtil.isNotEmpty(proInstId)?false:true;
		try {
			IBpmNodeDefine startNode = bpmDefineReader.getStartEvent(defId);
			// 获取节点按钮
			List<Button> buttons = BpmButtonUtil.getButtons(startNode);
			// 获取表单
			formModel = bpmFormService.getByDefId(defId);
			// 表单权限
			if (BeanUtils.isNotEmpty(formModel) && FormCategory.INNER.equals(formModel.getType())) {// 在线表单
				//获取表单第一个节点
				List<IBpmNodeDefine> firstNode = bpmDefineReader.findStartNode(defId);
				IBpmNodeDefine firstNode0  =BeanUtils.isNotEmpty(firstNode)? firstNode.get(0):null;
				
				//表单数据
				dataObject = getDataObject(proInstId,defId);
				Map<String, String> rightsMap = new HashMap<String, String>();
				rightsMap.put(FormPermissionVo.FLOW_KEY,BeanUtils.isNotEmpty(firstNode0)?firstNode0.getBpmProcDefine().getProcDefineKey():null);
				rightsMap.put(FormPermissionVo.NODE_ID,	BeanUtils.isNotEmpty(firstNode0)?firstNode0.getNodeId():null);
				 
				permissions = formRightsService.getPermission(new FormPermissionVo(RightsScope.NODE,ContextUtil.getCurrentUserId(),
						formModel.getKey(), rightsMap));
			}

			map.put("isStart", isStart);
			// 按钮
			map.put("buttons", buttons);
			// 表单
			map.put("formModel", formModel);
			// bo数据
			map.put("boData", BeanUtils.isNotEmpty(dataObject) ? dataObject.getData() : null);
			//表单
			map.put("permissions", permissions);
			
			Map<String, Object> attributes = Maps.newHashMap();
			//TODO --
			map.put("attributes", attributes);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", ExceptionUtil.getStackTraceAsString(e));
		}

		return map;
	}
	
	private IDataObject getDataObject(String proInstId, String defId) {
		IDataObject dataObject = null;
		if (StringUtil.isNotEmpty(proInstId)) {
			dataObject = bpmBoService.getDataByInst( bpmInstRepository.get(proInstId));
		} else {
			// 处理bo数据
			dataObject = bpmBoService.getDataByDefId(defId);
		}
		return dataObject;
	}

	/**
	 * 流程实例
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("instFormInfo")
	@ResponseBody
	public Map<String, Object> instFormInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String instId = RequestUtil.getString(request, "instId");
		Map<String, Object> map = new HashMap<String, Object>();
		logger.info("id:"+instId+"====");
		try {
			String userId = ContextUtil.getCurrentUserId();
			map = bpmFormService.instFormInfoByInstId(instId,userId);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			map.put("result", false);
			map.put("msg", e.getMessage()+"");
		}
		
		return map;
	}
	
	/**
	 * 流程审批历史
	 */
	@RequestMapping("flowHistory")
	public ModelAndView flowHistory(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String instId = RequestUtil.getString(request, "instId");
		String taskId = RequestUtil.getString(request, "taskId");
		String defKey = RequestUtil.getString(request, "defKey");
		String bizKey = RequestUtil.getString(request, "bizKey");
		if (StringUtil.isEmpty(instId) && StringUtil.isNotEmpty(taskId)) {
			instId = bpmTaskService.getByTaskId(taskId).getProcInstId();
		}
		if(StringUtil.isNotEmpty(defKey) && StringUtil.isNotEmpty(bizKey)){
			IBpmProcInst  po = bpmInstRepository.getByDefKeyBizKey(defKey,bizKey);
			if(BeanUtils.isNotEmpty(po))
				instId =po.getId();
		}
		List<IBpmTaskApproval> bpmTaskOpinions = bpmApprovalService.setAuditorInfo(
				bpmApprovalService.findApprovalHisIgnoreFirstSkip(instId, ContextUtil.getCurrentUserId()));
		return getAutoView().addObject("bpmTaskOpinions", bpmTaskOpinions);
	}
	
	/**
	 * 流程审批历史-会签任务
	 */
	@RequestMapping("flowHistorySign")
	public ModelAndView flowHistorySign(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String batch = RequestUtil.getString(request, "batch");
		List<IBpmTaskApproval> bpmTaskOpinions = null;
		if (StringUtil.isNotEmpty(batch)) {
			bpmTaskOpinions = bpmApprovalService.setAuditorInfo(bpmApprovalService.findSignApprovalHis(batch));
		}
		return getAutoView().addObject("bpmTaskOpinions", bpmTaskOpinions);
	}
	
	/**
	 * 流程审批历史-外部子流程
	 */
	@RequestMapping("flowHistoryCallSub")
	public ModelAndView flowHistoryCallSub(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String procInstanceId = RequestUtil.getString(request, "instId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		List<List<IBpmTaskApproval>> bpmTaskOpinions = bpmApprovalService.findCallSubApprovalHis(procInstanceId, nodeId);
		return getAutoView().addObject("bpmTaskOpinions", bpmTaskOpinions);
	}
	
	
	
	/**
	 * 流程图
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowImage")
	public ModelAndView flowImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String defKey = RequestUtil.getString(request, "defKey");
		String bizKey = RequestUtil.getString(request, "bizKey");
		if(StringUtil.isNotEmpty(defKey) && StringUtil.isNotEmpty(bizKey)){
			IBpmProcInst  po = bpmInstRepository.getByDefKeyBizKey(defKey,bizKey);
			if(BeanUtils.isNotEmpty(po))
				id =po.getId();
		}
		return getFlowImage(id);
	}
	
	private ModelAndView  getFlowImage(String id) throws Exception {
		BpmInstPo bpmInstPo = null;
		BpmInstHisPo bpmInstHisPo = null;
		BpmDefLayout bpmDefLayout = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmInstPo = bpmInstRepository.get(id);
			if(BeanUtils.isEmpty(bpmInstPo))
				bpmInstHisPo = bpmInstHisRepository.get(id);
			String defId = BeanUtils.isNotEmpty(bpmInstPo)?bpmInstPo.getProcDefId():bpmInstHisPo.getProcDefId();
			// 流程图layout
			bpmDefLayout = diagramService.getLayoutByDefId(defId);
		}
		List<BpmProcessStatusColor> list  = FlowStatusColorUtil.getProcessStatusColorList();

		return getAutoView().addObject("bpmProcInst", BeanUtils.isNotEmpty(bpmInstPo)?bpmInstPo:bpmInstHisPo)
							.addObject("instId", id)
							.addObject("bpmDefLayout", bpmDefLayout)
							.addObject("statusColorList",list);
	}
	
	/**
	 * 
	 * 流程表单
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowForm")
	public ModelAndView flowForm(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String instanceId = RequestUtil.getString(request, "id");
		return getAutoView().addObject("instanceId", instanceId);
	}
}
