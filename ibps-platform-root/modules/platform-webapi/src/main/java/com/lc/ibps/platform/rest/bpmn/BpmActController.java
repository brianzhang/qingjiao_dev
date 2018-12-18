package com.lc.ibps.platform.rest.bpmn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.form.constants.RightsScope;
import com.lc.ibps.api.form.service.IFormRightsService;
import com.lc.ibps.api.form.vo.FormPermissionVo;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.ActionType;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.constant.NodeType;
import com.lc.ibps.bpmn.api.constant.PrivilegeMode;
import com.lc.ibps.bpmn.api.context.ContextThreadUtil;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmVariableDefine;
import com.lc.ibps.bpmn.api.model.define.NodeAttributes;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.form.IFormModel;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.Button;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.model.node.SignNodeDefine;
import com.lc.ibps.bpmn.api.model.task.IBpmTask;
import com.lc.ibps.bpmn.api.model.task.IBpmTaskApproval;
import com.lc.ibps.bpmn.api.nat.task.NatTaskService;
import com.lc.ibps.bpmn.api.service.BpmApprovalService;
import com.lc.ibps.bpmn.api.service.BpmBoService;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmFormService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.api.service.BpmTaskActionService;
import com.lc.ibps.bpmn.api.service.BpmTaskManagerService;
import com.lc.ibps.bpmn.api.service.BpmTaskService;
import com.lc.ibps.bpmn.api.service.SignService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.cmd.IbpsTaskFinishCmd;
import com.lc.ibps.bpmn.core.model.var.BpmVariableDefine;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.utils.BpmButtonUtil;
import com.lc.ibps.bpmn.utils.BpmExecUtil;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.org.party.repository.DefaultPartyUserRepository;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 流程接口。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年11月30日-下午4:03:46
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/bpmService")
@Api(value = "/bpmService",description="流程服务")
@Controller
public class BpmActController {
	
	private BpmTaskManagerService bpmTaskManagerService;
	
	private BpmApprovalService bpmApproveService;
	
	private IPartyEntityService entityService;
	
	private IFormRightsService formRightsService;
	
	private BpmFormService bpmFormService;
	
	private BpmBoService bpmBoService;
	
	private BpmTaskService bpmTaskService;
	
	private BpmProcInstService bpmInstService;
	
	private BpmTaskActionService bpmTaskActionService;
	
	private BpmDefineService bpmDefineService;
	
	private IBpmDefineReader bpmDefineReader;
	
	private DefaultPartyUserRepository userService;
	
	private BpmProcInstService bpmProcInstService;
	
	private NatTaskService natTaskService;
	
	private SignService signService;
	
	public BpmActController(){
		bpmTaskManagerService = AppUtil.getBean(BpmTaskManagerService.class);
		
		bpmApproveService = AppUtil.getBean(BpmApprovalService.class);
		
		entityService = AppUtil.getBean(IPartyEntityService.class);
		
		formRightsService = AppUtil.getBean(IFormRightsService.class);
		
		bpmFormService = AppUtil.getBean(BpmFormService.class);
		
		bpmBoService = AppUtil.getBean(BpmBoService.class);
		
		bpmTaskService = AppUtil.getBean(BpmTaskService.class);
		
		bpmInstService = AppUtil.getBean(BpmProcInstService.class);
		
		bpmTaskActionService = AppUtil.getBean(BpmTaskActionService.class);
		
		bpmDefineService = AppUtil.getBean(BpmDefineService.class);
		
		bpmDefineReader = AppUtil.getBean(IBpmDefineReader.class);
		
		userService = AppUtil.getBean(DefaultPartyUserRepository.class);
		
		bpmProcInstService = AppUtil.getBean(BpmProcInstService.class);
		
		natTaskService = AppUtil.getBean(NatTaskService.class);
		
		signService = AppUtil.getBean(SignService.class);
	}
	
	@Path("/myTasks")
	@ApiOperation(value = "我的待办事项", notes = "我的待办事项")
	@GET
	public WebAPIResult myTasks(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit,
			@QueryParam("subject") @ApiParam(value = "标题", required = false) String subject) {
		User user = userService.getByAccount(account);
		// 查询条件
		Map<String, String> pm = new HashMap<String, String>();
		// 标题
		if (StringUtil.isNotEmpty(subject)) {
			pm.put("subject", subject);
		}
		// 流程定义名称
		// String proDefName = this.getVal(interParam, "proDefName");
		// if (StringUtil.isNotEmpty(proDefName)) {
		// pm.put("proDefName", proDefName);
		// }
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		// 结果集
		List<IBpmTask> list = bpmTaskService.queryByUser(user.getUserId(), pm, pg);
		WebAPIResult result = new WebAPIResult();
		result.addVariable("size", list.size());
		result.setData(list);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取待办列表");
		return result;
	}

	/**
	 * 获取任务的详情
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@Path("/getFormData")
	@ApiOperation(value = "任务详情页", notes = "任务详情页")
	@GET
	public WebAPIResult getFormData(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("taskId") @ApiParam(value = "任务ID", required = false) String taskId)
			throws Exception {
		User curUser = userService.getByAccount(account);
		WebAPIResult result = new WebAPIResult();
		IDataObject dataObject = null;
		IFormModel formModel = null;
		String permissions = "";
		List<Button> buttons = null;
		try {
			IBpmTask task = bpmTaskService.getByTaskId(taskId);
			if (BeanUtils.isEmpty(task)) {
				result.setResult(WebAPIResult.FAIL);
				result.setMessage("任务不存在，可能已经被处理了.");
				return result;
			}
			String procInstId = task.getProcInstId();
			String defId = task.getProcDefId();
			String nodeId = task.getNodeId();

			IBpmProcInst bpmProcessInstance = bpmInstService.getProcInst(procInstId);

			// 表单
			formModel = bpmFormService.getByDefId(defId, nodeId, bpmProcessInstance);

			// BO数据
			dataObject = bpmBoService.getDataByInst(bpmProcessInstance);

			// BO数据字段权限过滤
			if (BeanUtils.isNotEmpty(formModel) && FormCategory.INNER.equals(formModel.getType())) {
				
				Map<String, String> rightsMap = new HashMap<String, String>();
				rightsMap.put(FormPermissionVo.FLOW_KEY,bpmProcessInstance.getProcDefKey());
				rightsMap.put(FormPermissionVo.NODE_ID,	nodeId);
				 
				permissions = formRightsService.getPermission(new FormPermissionVo(RightsScope.NODE,curUser.getUserId(),
						formModel.getKey(), rightsMap));
			}

			// 按钮
			IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(defId, nodeId);
			List<PartyEntity> groups = entityService.findByUserAccount(curUser.getAccount());
			List<String> gids = PartyUtil.partyToGroupId(groups);
			buttons = BpmButtonUtil.getButtons(taskNodeDef, (BpmTaskPo) task, dataObject, curUser.getUserId(), gids);

			// 审批意见
			List<IBpmTaskApproval> opinionList = bpmApproveService.setAuditorInfo(bpmApproveService.getFormOpinionByInstId(task.getProcInstId()));

			// 按钮
			result.addVariable("buttons", buttons);
			// 表单
			result.addVariable("formModel", formModel);
			// bo数据
			result.addVariable("boData", BeanUtils.isNotEmpty(dataObject) ? dataObject.getData() : null);
			// 表单权限
			result.addVariable("permissions", permissions);

			// 是否隐藏意见框
			// 子流程节点设置应该另外考虑
			boolean isHideOpinion = false;
			boolean isHidePath = false;
			boolean isCommonJumpType = false;
			boolean isEnd = false;
			if (taskNodeDef != null) {
				NodeAttributes nodeAttributes = taskNodeDef.getLocalProperties();
				isHideOpinion = BeanUtils.isNotEmpty(nodeAttributes) ? nodeAttributes.isHideOpinion() : isHideOpinion;
				isHidePath = BeanUtils.isNotEmpty(nodeAttributes) ? nodeAttributes.isHidePath() : isHidePath;
				isCommonJumpType = BeanUtils.isNotEmpty(nodeAttributes) ? nodeAttributes.getJumpType().equals("common")
						: isCommonJumpType;

				List<IBpmNodeDefine> outcomeNodes = taskNodeDef.getOutgoingNodeList();
				List<IBpmNodeDefine> handlerSelectOutcomeNodes = handlerSelectOutgoingNodes(outcomeNodes);
				List<IBpmNodeDefine> pathOutgoingNodes = Lists.newArrayList(handlerSelectOutcomeNodes);
				List<IBpmNodeDefine> removeList = new ArrayList<IBpmNodeDefine>();
				for (IBpmNodeDefine bpmNodeDef : pathOutgoingNodes) {
					if (NodeType.END.equals(bpmNodeDef.getType())) {
						removeList.add(bpmNodeDef);
					}
				}
				pathOutgoingNodes.removeAll(removeList);
				if (BeanUtils.isEmpty(pathOutgoingNodes)) {
					isEnd = true;
				}
			}
			Map<String, Object> attributes = Maps.newHashMap();
			attributes.put("opinionList", opinionList);
			attributes.put("isHideOpinion", isHideOpinion);
			attributes.put("isHidePath", isHidePath);
			attributes.put("isCommonJumpType", isCommonJumpType);
			attributes.put("isEnd", isEnd);
			result.addVariable("attributes", attributes);
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("成功获取任务！");
		} catch (Exception e) {
			result.setResult(WebAPIResult.ERROR);
			result.setMessage(e.getMessage());
		}

		return result;
	}

	@Path("/myHandled")
	@ApiOperation(value = "我的已办事项", notes = "我的已办事项")
	@GET
	public WebAPIResult myHandled(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("status") @ApiParam(value="任务状态", required = false) String status,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit) {
		User user = userService.getByAccount(account);
		// 查询条件
		Map<String, String> pm = new HashMap<String, String>();
		pm.put("userId", user.getUserId());
		if (!StringUtils.isEmpty(status)) {
			pm.put("status", status);
		}
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		// 结果集
		List<IBpmProcInst> list = bpmInstService.queryHandled(pm, pg);
		WebAPIResult result = new WebAPIResult();
		result.addVariable("size", list.size());
		result.setData(list);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取已办列表");
		return result;
	}

	@Path("/myCompleted")
	@ApiOperation(value = "我的办结事项", notes = "我的办结事项")
	@GET
	public WebAPIResult myCompleted(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("status") @ApiParam(value="任务状态", required = false) String status,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit) {
		User user = userService.getByAccount(account);
		// 查询条件
		Map<String, String> pm = new HashMap<String, String>();
		pm.put("userId", user.getUserId());
		if (!StringUtils.isEmpty(status)) {
			pm.put("status", status);
		}
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		// 结果集
		List<IBpmProcInst> list = bpmInstService.queryCompleted(pm, pg);
		WebAPIResult result = new WebAPIResult();
		result.addVariable("size", list.size());
		result.setData(list);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取办结列表");
		return result;
	}

	@Path("/myRequest")
	@ApiOperation(value = "我的请求", notes = "我的请求")
	@GET
	public WebAPIResult myRequest(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("status") @ApiParam(value="任务状态", required = false) String status,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit) {
		User user = userService.getByAccount(account);
		// 查询条件
		Map<String, String> pm = new HashMap<String, String>();
		pm.put("userId", user.getUserId());
		if (!StringUtils.isEmpty(status)) {
			pm.put("status", status);
		}
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		// 结果集
		List<IBpmProcInst> list = bpmInstService.queryRequest(pm, pg);
		WebAPIResult result = new WebAPIResult();
		result.addVariable("size", list.size());
		result.setData(list);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取我的请求列表");
		return result;
	}

	@Path("/myDrafts")
	@ApiOperation(value = "我的草稿", notes = "我的草稿")
	@GET
	public WebAPIResult myDrafts(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit) {

		User user = userService.getByAccount(account);
		// 查询条件
		Map<String, String> pm = new HashMap<String, String>();
		pm.put("userId", user.getUserId());
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		// 结果集
		List<IBpmProcInst> list = bpmInstService.queryDrafts(pm, pg);
		WebAPIResult result = new WebAPIResult();
		result.addVariable("size", list.size());
		result.setData(list);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取我的草稿列表");
		return result;
	}

	@SuppressWarnings("finally")
	@Path("/start")
	@ApiOperation(value = "启动流程", notes = "启动流程")
	@POST
	public WebAPIResult start(
			@FormParam("bpmnDefId") @ApiParam(value = "流程ID", required = true) String bpmnDefId,
			@FormParam("destination") @ApiParam(value = "目标节点", required = false) String destination,
			@FormParam("nodeUsers") @ApiParam(value = "发起人", required = false) String fstNodeUsers,
			@FormParam("secNodeUsers") @ApiParam(value = "指定跳过第一个节点后第二节点执行人", required = false) String secNodeUsers,
			@FormParam("data") @ApiParam(value = "流程表单数据", required = false) String data,
			@FormParam("proInstId") @ApiParam(value = "流程实例id", required = false) String proInstId,
			@FormParam("procVars") @ApiParam(value = "动态流程变量", required = false) String procVars) {
		String instId = "";
		WebAPIResult result = new WebAPIResult();
		try {
			IbpsProcInstCmd cmd = getStartCmd(bpmnDefId, destination, fstNodeUsers, secNodeUsers, data, proInstId,procVars);
			IBpmProcInst bpm = bpmProcInstService.startProcInst(cmd);
			instId = bpm.getId();
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("流程启动成功!");
		} catch (Exception e) {
			result.setResult(WebAPIResult.ERROR);
			result.setMessage("流程启动失败!");
			e.printStackTrace();
		} finally {
			result.setData(instId);
			return result;
		}
	}

	@Path("/complete")
	@ApiOperation(value = "处理任务", notes = "处理任务")
	@POST
	public WebAPIResult complete(
			@FormParam("taskId") @ApiParam(value = "任务ID", required = true) String taskId,
			@FormParam("actionName") @ApiParam(value = "工作名称", required = true) String actionName,
			@FormParam("opinion") @ApiParam(value = "审批意见", required = false) String opinion,
			@FormParam("data") @ApiParam(value = "流程表单数据", required = false) String data,
			@FormParam("nodeUsers") @ApiParam(value = "节点执行人", required = false) String nodeUsers,
			@FormParam("directHandlerSign") @ApiParam(value = "是否会签", required = false) String directHandlerSign,
			@FormParam("backHandMode") @ApiParam(value = "驳回模式", required = false) String backHandMode,
			@FormParam("destination") @ApiParam(value = "驳回节点", required = false) String destination,
			@FormParam("curUser") @ApiParam(value = "审批人ID", required = true) String curUser,
			@FormParam("curUserName") @ApiParam(value = "审批人名称", required = true) String curUserName,
			@FormParam("procVars") @ApiParam(value = "流程动态变量", required = false) String procVars) {

		IbpsTaskFinishCmd cmd = getCmdFromRequest(taskId, actionName, opinion, data, nodeUsers, directHandlerSign,
				backHandMode, destination, curUser, curUserName, procVars);
		boolean result = bpmTaskActionService.finishTask(cmd);
		if (result) {
			ActionCmd finsActionCmd = ContextThreadUtil.getActionCmd(cmd.getInstId());
			Object rejectAfterExecutionId = finsActionCmd.getTransitVars("rejectAfterExecutionId");
			if (rejectAfterExecutionId != null && StringUtil.isNotEmpty(rejectAfterExecutionId.toString())) {
				// 调整Activiti的执行表数据
				BpmExecUtil.multipleInstancesRejectAdjust(rejectAfterExecutionId.toString());
			}
		}
		WebAPIResult returnResult = new WebAPIResult();
		if (result) {
			returnResult.setResult(WebAPIResult.SUCCESS);
			returnResult.setMessage("操作执行成功！");
		} else {
			returnResult.setResult(WebAPIResult.FAIL);
			returnResult.setMessage("操作执行失败，请稍后再试");
		}
		return returnResult;
	}

	@Path("/stopProcess")
	@ApiOperation(value = "终止流程", notes = "终止流程")
	@POST
	public WebAPIResult doEndProcess(
			@FormParam("account") @ApiParam(value = "account", required = true) String account,
			@FormParam("taskId") @ApiParam(value = "taskId", required = true) String taskId,
			@FormParam("messageType") @ApiParam(value = "messageType", required = false) String messageType,
			@FormParam("endReason") @ApiParam(value = "endReason", required = false) String endReason)
			throws Exception {
		WebAPIResult result = new WebAPIResult();
		try {
			bpmTaskManagerService.endProcessByTaskId(taskId, messageType, endReason,
					userService.getByAccount(account).getUserId());
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("终止流程成功");
		} catch (Exception e) {
			result.setResult(WebAPIResult.ERROR);
			result.setMessage("终止流程失败");
		}
		return result;
	}
	
	@Path("/getInstForm")
	@ApiOperation(value = "获取流程表单", notes = "获取流程表单")
	@GET
	public WebAPIResult getInstForm(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("bpmInstId") @ApiParam(value = "流程实例ID", required = true) String bpmInstId) {
		WebAPIResult result = new WebAPIResult();
		User user = userService.getByAccount(account);
		if (BeanUtils.isEmpty(user)) {
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("参数错误！");
		}
		Map<String, Object> from = bpmFormService.instFormInfoByInstId(bpmInstId, user.getUserId());
		from.put("permission", from.get("permission").toString());
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取数据！");
		result.setData(from);
		return result;
	}
	
	@Path("/opinions")
	@ApiOperation(value = "获取审批历史", notes = "获取审批历史")
	@GET
	public WebAPIResult opinions(
			@QueryParam("bpmInstId") @ApiParam(value = "流程实例ID", required = true) String bpmInstId,
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account) {
		WebAPIResult result = new WebAPIResult();
		User user = userService.getByAccount(account);
		List<IBpmTaskApproval> opinionList = bpmApproveService.findApprovalHisIgnoreFirstSkip(bpmInstId,user.getUserId());
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取数据!");
		result.setData(opinionList);
		return result;
	}

	@Path("/actionMessage")
	@ApiOperation(value = "获取操作相关信息", notes = "获取操作相关信息")
	@POST
	public WebAPIResult actionMessage(
			@FormParam("taskId") @ApiParam(value = "taskId", required = true) String taskId,
			@FormParam("actionName") @ApiParam(value = "动作", required = true) String actionName,
			@FormParam("account") @ApiParam(value = "用户账号", required = true) String account){
		WebAPIResult result = new WebAPIResult();
		BpmTaskPo task =  (BpmTaskPo)bpmTaskService.getByTaskId(taskId);
		IBpmProcInst bpmProcessInstance = bpmInstService.getProcInst(task.getProcInstId());
		String defId = task.getProcDefId();
		String nodeId = task.getNodeId();
		IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(defId, nodeId);
		// 非弃权动作并且是会签任务
		if (!"abandon".equals(actionName) && taskNodeDef.getType().equals(NodeType.SIGNTASK)) {
			notAbandon(task, bpmProcessInstance, result, taskNodeDef, account);
		}
//		result.setData("true");
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取数据!");
		return result;
	}	
	
	/**
	 * 非弃权动作并且是会签任务
	 *
	 * @param task
	 * @param bpmProcessInstance
	 * @param autoView
	 * @param taskNodeDef 
	 */
	private void notAbandon(BpmTaskPo task, IBpmProcInst bpmProcessInstance, WebAPIResult result,
			IBpmNodeDefine taskNodeDef, String account) {
		IDataObject dataObjects = bpmBoService.getDataByInst(bpmProcessInstance);
		Map<String, Object> variables = natTaskService.getVariables(task.getTaskId());
		User curUser = userService.getByAccount(account);
		List<PartyEntity> groups = entityService.findByUserAccount(curUser.getAccount());
		List<String> gids = PartyUtil.partyToGroupId(groups);
		List<PrivilegeMode> privilege = signService.getPrivilege(curUser.getUserId(), gids,
				(SignNodeDefine) taskNodeDef, variables, dataObjects);
		// 拥有直接处理会签任务的特权
		if (privilege.contains(PrivilegeMode.ALL) || privilege.contains(PrivilegeMode.DIRECT)) {
			result.addVariable("directHandlerSign", true);
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsTaskFinishCmd getCmdFromRequest(String taskId, String actionName, String opinion, String busData,
			String nodeUsers, String directHandlerSign, String backHandMode, String destination, String curUser, String curUserName, String procVars) {
		String jumpType = "common";
		if (StringUtil.isNotEmpty(nodeUsers)) {
			JSONArray nodeUserArr = JSONArray.fromObject(nodeUsers);
			if (JsonUtil.isNotEmpty(nodeUserArr)) {
				jumpType = JsonUtil.getString(nodeUserArr.getJSONObject(0), "jumpType");
				destination = JsonUtil.getString(nodeUserArr.getJSONObject(0), "nodeId");
			}
		}
		
		IbpsTaskFinishCmd cmd = new IbpsTaskFinishCmd();
		cmd.setCurUser(curUser);
		cmd.setCurUserName(curUserName);
		cmd.addTransitVars(BpmConstants.CUR_USER, curUser);
		cmd.setTaskId(taskId);// 任务ID
		cmd.setActionName(actionName);// 处理动作
		// 指定路径、自由跳转
		if ("select".equals(jumpType) || "free".equals(jumpType)) {
			if (StringUtil.isNotEmpty(destination)) {
				cmd.setDestination(destination);
			}
		}

		// 指定执行人
		if (BeanUtils.isNotEmpty(nodeUsers)) {
			Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}

		// 设置流程驳回时跳转模式
		cmd.addTransitVars(BpmConstants.BACK_HAND_MODE, backHandMode);
		if (ActionType.REJECT.getKey().equals(actionName)) {
			// 驳回到指定节点
			if (StringUtil.isNotEmpty(destination)) {
				cmd.setDestination(destination);
			}
		}

		// 会签任务的直接处理
		if ("true".equals(directHandlerSign)) {
			cmd.addTransitVars(BpmConstants.SIGN_DIRECT, "1");
		}

		// 设置表单意见
		cmd.setApprovalOpinion(opinion);
		handOpinion(busData, cmd);
		IBpmTask task = bpmTaskService.getTaskId(taskId);
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader
					.getBpmProcDefine(task.getProcDefId());
			BpmProcExtendDefine bpmProcExtendDefine = bpmProcessDef.getBpmProcExtendDefine();
			String dataSaveMode = DataSaveMode.TABLE;
			FormCategory formCategory = bpmProcExtendDefine.getGlobalForm().getType();
			if (FormCategory.INNER.equals(formCategory)) {
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable() ? DataSaveMode.TABLE : DataSaveMode.INSTANCE;
			} else if (FormCategory.URL_LOAD.equals(formCategory)) {
				dataSaveMode = ActionCmd.DATA_MODE_PAIR;
			} else if (FormCategory.FRAME.equals(formCategory)) {
				dataSaveMode = ActionCmd.DATA_MODE_PK;
			}

			cmd.setDataMode(dataSaveMode);

			cmd.setBusData(busData);
		}

		// 添加变量的设置
		Map<String, Object> vars = this.getTaskVars(taskId);
		// 动态变量设置
		JSONObject procVarsJS = JSONObject.fromObject(StringUtil.isNotEmpty(procVars)?procVars:"{}");
		Iterator<String> keys = procVarsJS.keys();
		while(keys.hasNext()){
			String key = keys.next().toString();
			String value = procVarsJS.get(key).toString();
			vars.put(key, value);
		}
		cmd.setVariables(vars);

		IBpmProcInst bpmInst = bpmInstService.getProcInstByBpmnInst(task.getBpmnInstId());
		cmd.setBusinessKey(bpmInst.getBizKey());
		return cmd;
	}

	@SuppressWarnings("unchecked")
	private void handOpinion(String data, IbpsTaskFinishCmd cmd) {
		if (StringUtil.isEmpty(data))
			return;
		String opinion = "";
		JSONObject dataJson = JSONObject.fromObject(data);
		if (!dataJson.containsKey(BpmApprovePo.OPINION_FLAG))
			return;
		JSONObject opinionJson = dataJson.getJSONObject(BpmApprovePo.OPINION_FLAG);
		Iterator<String> keys = opinionJson.keys();
		String opinionName = "";
		while (keys.hasNext()) {
			opinionName = keys.next();
			if (StringUtil.isNotEmpty(opinionJson.getString(opinionName))) {
				cmd.setOpinionIdentity(opinionName);
				opinion = opinionJson.getString(opinionName);
				cmd.setApprovalOpinion(opinion);
				break;
			}
		}
		dataJson.remove(BpmApprovePo.OPINION_FLAG);
		data = dataJson.toString();
		cmd.setBusData(data);
	}

	/**
	 * 获取任务上下文流程变量。
	 * 
	 * @param request
	 * @return Map&lt;String,Object>
	 */
	private Map<String, Object> getTaskVars(String taskId) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtil.isEmpty(taskId))
			return params;
		IBpmTask bpmTask = bpmTaskService.getByTaskId(taskId);

		List<IBpmVariableDefine> list = bpmDefineService.getVariableDefs(bpmTask.getProcDefId(), bpmTask.getNodeId());
		if (BeanUtils.isEmpty(list))
			return params;
		for (IBpmVariableDefine varDef : list) {
			params.put(varDef.getKey(),
					BpmVariableDefine.getValue(varDef.getDataType(), varDef.getDefaultVal().toString()));
		}
		return params;
	}

	/**
	 * 获取发起的cmd格式数据。
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private IbpsProcInstCmd getStartCmd(String defId, String destination, String fstNodeUserJs, String secNodeUserJs, String data,
			String proInstId, String procVars) {

		IBpmDefine bpmDefinition = bpmDefineService.getBpmDefinitionByDefId(defId);
		String defKey = bpmDefinition.getDefKey();

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(UniqueIdUtil.getId());
		cmd.setDestination(destination);
		cmd.setBusData(data);
		if (StringUtil.isNotEmpty(data)) {
			cmd.setDataMode(DataSaveMode.TABLE);
		}

		// 指定发起人
		Map<String, List<BpmIdentity>> fstNodeUsers = BpmIdentityUtil.getBpmIdentity(fstNodeUserJs);
		if (BeanUtils.isNotEmpty(fstNodeUsers)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, fstNodeUsers);
		}
		// 指定跳过第一节点执行人
		Map<String, List<BpmIdentity>> secNodeUsers = BpmIdentityUtil.getBpmIdentity(secNodeUserJs);
		if (BeanUtils.isNotEmpty(secNodeUsers)) {
			cmd.addTransitVars(BpmConstants.SEC_BPM_NODE_USERS, secNodeUsers);
		}

		Map<String, Object> params = getProcessStartVars(defId);
		// 动态变量设置
		JSONObject procVarsJS = JSONObject.fromObject(StringUtil.isNotEmpty(procVars)?procVars:"{}");
		Iterator<String> keys = procVarsJS.keys();
		while(keys.hasNext()){
			String key = keys.next().toString();
			String value = procVarsJS.get(key).toString();
			params.put(key, value);
		}
		cmd.setVariables(params);

		if (StringUtil.isNotEmpty(proInstId)) {
			cmd.setInstId(proInstId);
		}
		// 当前用户
		JSONObject curUser = JSONObject.fromObject(JSONArray.fromObject(
				JSONObject.fromObject(JSONArray.fromObject(fstNodeUserJs).get(0).toString()).getString("executors")
				).get(0).toString());
		cmd.setCurUser(curUser.getString("id"));
		cmd.setCurUserName(curUser.getString("name"));

		return cmd;
	}

	private Map<String, Object> getProcessStartVars(String defId) {
		Map<String, Object> params = new HashMap<String, Object>();
		List<IBpmVariableDefine> list = bpmDefineService.getVariableDefs(defId);
		if (BeanUtils.isEmpty(list))
			return params;
		for (IBpmVariableDefine varDef : list) {
			params.put(varDef.getKey(),
					BpmVariableDefine.getValue(varDef.getDataType(), varDef.getDefaultVal().toString()));
		}
		return params;
	}

	/**
	 * 处理选择路径跳转的分支出口
	 *
	 * @param outgoingNodes
	 * @return
	 */
	private List<IBpmNodeDefine> handlerSelectOutgoingNodes(List<IBpmNodeDefine> outgoingNodes) {
		int size = outgoingNodes.size();
		List<IBpmNodeDefine> returnList = new ArrayList<IBpmNodeDefine>();
		if (size == 1) {
			IBpmNodeDefine bpmNodeDef = outgoingNodes.get(0);
			NodeType nodeType = bpmNodeDef.getType();
			// 网关节点
			if (NodeType.EXCLUSIVEGATEWAY.equals(nodeType) || NodeType.INCLUSIVEGATEWAY.equals(nodeType)
					|| NodeType.PARALLELGATEWAY.equals(nodeType)) {
				returnList = bpmNodeDef.getOutgoingNodeList();
			}
		}
		if (BeanUtils.isEmpty(returnList)) {
			return outgoingNodes;
		} else {
			return returnList;
		}
	}
	
	@Path("/getNextNodeType")
	@ApiOperation(value = "下一节点类型", notes = "下一节点类型")
	@GET
	public WebAPIResult getNextNodeType(
			@QueryParam("taskId") @ApiParam(value = "流程任务ID", required = false) String taskId,
			@QueryParam("defId") @ApiParam(value = "流程定义ID", required = false) String defId,
			@QueryParam("curNode") @ApiParam(value = "所在节点", required = false) String curNode) {
		
		IBpmTask task = null;
		if(StringUtil.isNotEmpty(taskId)){
			task = bpmTaskService.getByTaskId(taskId);
			if(task!=null){
				defId = task.getProcDefId(); // 流程定义ID
				curNode = task.getNodeId(); // 所在节点
			}
		}
		
		List<IBpmNodeDefine> nodes = bpmDefineReader.getNode(defId, curNode).getOutgoingNodeList();
		String nodeType = null;
		if(BeanUtils.isNotEmpty(nodes)){
			nodeType = nodes.get(0).getType().getKey();
		}
		
		WebAPIResult result = new WebAPIResult();
		result.setData(nodeType);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取节点类型");
		return result;
	}
	
}
