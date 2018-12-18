package com.lc.ibps.test.demo.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.model.task.IBpmTask;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.api.service.BpmTaskActionService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.cmd.IbpsTaskFinishCmd;
import com.lc.ibps.bpmn.model.DefaultBpmIdentity;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSubDao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSubQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;

import net.sf.json.JSONObject;

/**
 * 子表例子 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class UrlFormSub extends AbstractDomain<String, UrlFormSubPo>{
	 
	private UrlFormSubDao urlFormSubDao = null;
	private UrlFormSubQueryDao urlFormSubQueryDao = null;
	private BpmProcInstService bpmProcInstService = null;
	private BpmTaskActionService bpmTaskActionService = null;
	private BpmDefineService bpmDefineService = null;
	private IBpmDefineReader bpmDefineReader = null;
	private BpmTaskRepository bpmTaskRepository = null;
	private BpmProcInstService bpmInstService = null;

	protected void init(){
		urlFormSubDao = AppUtil.getBean(UrlFormSubDao.class);
		urlFormSubQueryDao = AppUtil.getBean(UrlFormSubQueryDao.class);
		bpmProcInstService = AppUtil.getBean(BpmProcInstService.class);
		bpmTaskActionService = AppUtil.getBean(BpmTaskActionService.class);
		bpmDefineService = AppUtil.getBean(BpmDefineService.class);
		bpmDefineReader = AppUtil.getBean(IBpmDefineReader.class);
		bpmTaskRepository = AppUtil.getBean(BpmTaskRepository.class);
		bpmInstService = AppUtil.getBean(BpmProcInstService.class);
		this.setDao(urlFormSubDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(urlFormSubQueryDao.get(getId())));
	}

	/**
	 * 流程操作
	 * 
	 */
	public ResultMessage saveFlow() {
		super.save();
		
		ResultMessage message = null;
		if(isNewFlag()){// 启动流程
			IbpsProcInstCmd cmd = getProcCmd();
			bpmProcInstService.startProcInst(cmd);
			
			message=new ResultMessage(ResultMessage.SUCCESS, "流程启动成功！");
		}else{// 下一步
			IbpsTaskFinishCmd cmd = getTaskCmd();
			boolean result = bpmTaskActionService.finishTask(cmd);
			
			if(result){
				message=new ResultMessage(ResultMessage.SUCCESS, "任务处理成功！");
			} else{
				message=new ResultMessage(ResultMessage.FAIL, "任务处理失败！");
			}
		}
		
		return message;
	}

	/**
	 * TODO方法名称描述
	 *
	 * @return 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getProcCmd() {
		String defId = getData().getDefId();
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefId(getData().getDefId());
		
		// 判断流程状态，权限
		String defKey = bpmDefine.getDefKey();
		// 目标节点
		String destination = "";
		/* 节点执行人
		 * [
		 * 	{nodeId:"UserTask_16w6bmp"
		 * 	 ,executors:[{id:"1",type:"org,user,pos",name:"管理员"}]
		 * 	}
		 * ]
		 */
		String nodeUsers = "";
		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(getId());
		cmd.setDestination(destination);
		// 流程表单数据
		String busData = JsonUtil.getJSONString(getData());
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(defId);
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String  dataSaveMode  =DataSaveMode.TABLE;
			FormCategory formCategory  =	bpmProcExtendDefine.getGlobalForm().getType();
			if(FormCategory.INNER.equals(formCategory)  ){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable()?DataSaveMode.TABLE:DataSaveMode.INSTANCE;
			}else if(FormCategory.URL_LOAD.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PK;
			}else if(FormCategory.FRAME.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PAIR;
			}
			
			cmd.setDataMode(dataSaveMode);
		
			cmd.setBusData(busData);
		}

		// 设置指定执行人
		if (BeanUtils.isNotEmpty(specUserMap)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}

		//TODO 设置流程启动变量
//		cmd.setVariables(this.getProcStartVars(defId, request));

		// 设置当前执行人信息
		cmd.setCurUser(ContextUtil.getCurrentUser().getUserId());
		
		return cmd;
	}
	
//	/**
//	 * 获取流程启动变量
//	 * @param defId 
//	 *
//	 * @param request
//	 * @return 
//	 */
//	private Map<String, Object> getProcStartVars(String defId, HttpServletRequest request) {
//		Map<String, Object> params = new HashMap<String, Object>();
//		List<IBpmVariableDefine> list = bpmDefineService.getVariableDefs(defId);
//		if (BeanUtils.isEmpty(list)) return params;
//		
//		for (IBpmVariableDefine varDef : list) {
//			String reqValue = RequestUtil.getString(request, varDef.getKey());
//			if (StringUtil.isNotEmpty(reqValue)) {
//				params.put(varDef.getKey(), BpmVariableDefine.getValue(varDef.getDataType(), reqValue));
//			}
//		}
//		
//		return params;
//	}

	/**
	 * TODO方法名称描述
	 *
	 * @return 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsTaskFinishCmd getTaskCmd() {
		String taskId = getData().getTaskId();
		String actionName = getData().getActionName();
		String opinion = "同意";
		String busData = JsonUtil.getJSONString(getData());
		//String userAssign = RequestUtil.getString(request, "userAssign");
		String userAssign = "";

		//String directHandlerSign = RequestUtil.getString(request, "directHandlerSign");
		//String backHandMode = RequestUtil.getString(request, BpmConstants.BACK_HAND_MODE);
		//String jumpType = RequestUtil.getString(request, "jumpType");
		String directHandlerSign = "";
		String backHandMode = "";
		String jumpType = "";
		
		IbpsTaskFinishCmd cmd = new IbpsTaskFinishCmd();
		// 自由跳转 或者 驳回到指定节点
		if ("free".equals(jumpType) || "reject".equals(actionName)) {
			//String destination = RequestUtil.getString(request, "destination");
			String destination = "";
			if (StringUtil.isNotEmpty(destination)) {
				cmd.setDestination(destination);
			}
		}
		// 会签任务的直接处理
		if ("true".equals(directHandlerSign)) {
			cmd.addTransitVars(BpmConstants.SIGN_DIRECT, "1");
		}
		cmd.setTaskId(taskId);
		cmd.setActionName(actionName);

		// 设置表单意见。
		cmd.setApprovalOpinion(opinion);
		// 处理表单意见，如果表单的意见存在则覆盖之前的意见。
		handOpinion(busData, cmd);
		BpmTaskPo po = bpmTaskRepository.getTaskId(taskId);

		// 添加变量的设置
		//Map<String, Object> vars = this.getTaskVars(po.getProcDefId(),po.getNodeId(),request);
		//cmd.setVariables(vars);
		
		// 设置流程驳回时跳转模式。
		cmd.addTransitVars(BpmConstants.BACK_HAND_MODE, backHandMode);
		
		IBpmProcInst bpmInst = bpmInstService.getProcInstByBpmnInst(po.getBpmnInstId());
		cmd.setBusinessKey(bpmInst.getBizKey());

		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(po.getProcDefId());
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String  dataSaveMode  =DataSaveMode.TABLE;
			FormCategory formCategory = bpmProcExtendDefine.getGlobalForm().getType();
			if(FormCategory.INNER.equals(formCategory)){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable()?DataSaveMode.TABLE:DataSaveMode.INSTANCE;
			}else if(FormCategory.URL_LOAD.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PK;
			}else if(FormCategory.FRAME.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PAIR;
			}
			
			cmd.setDataMode(dataSaveMode);
		
			cmd.setBusData(busData);
		}
		if (BeanUtils.isNotEmpty(userAssign)) {
			Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(userAssign);
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		} else {
			// 设置目标节点映射----------------------------------------------------------------------------------------------------
			Map<String, List<BpmIdentity>> nodeIdentityMap = getNodeBpmIdentities(taskId);
			cmd.setBpmIdentities(nodeIdentityMap);
		}
		// 当前用户
		cmd.setCurUser(ContextUtil.getCurrentUser().getUserId());
		
		return cmd;
	}
	
	/**
	 * 处理表单意见。
	 * 
	 * <pre>
	 * 1.没有提交表单数据，不做处理。
	 * 2.如果表单数据中不包含表单意见项不做处理。
	 * 3.如果表单中包含意见项，只管一个表单意见
	 * 	设置：
	 *  cmd.setOpinionIdentity(opinionName);
	 *  cmd.setApprovalOpinion(opinion);
	 * </pre>
	 * 
	 * @param request
	 * @param cmd
	 *            void
	 */
	@SuppressWarnings("unchecked")
	private void handOpinion(String data, IbpsTaskFinishCmd cmd) {
		if (StringUtil.isEmpty(data)) return;
		
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
	 * 根据任务节点获取节点的执行人。
	 * 
	 * @param request
	 * @return Map<String,List<BpmIdentity>>
	 */
	private Map<String, List<BpmIdentity>> getNodeBpmIdentities(String taskId) {
		Map<String, List<BpmIdentity>> nodeIdentityMap = new HashMap<String, List<BpmIdentity>>();
		if (StringUtil.isEmpty(taskId))
			return nodeIdentityMap;

		IBpmTask bpmTask = bpmTaskRepository.get(taskId);
		IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(bpmTask.getProcDefId(), bpmTask.getNodeId());

		for (IBpmNodeDefine nodeDef : taskNodeDef.getOutgoingNodeList()) {
			String[] userIds = {};
			List<BpmIdentity> bpmIdentities = new ArrayList<BpmIdentity>();
			if (BeanUtils.isEmpty(userIds)) continue;

			for (String uId : userIds) {
				DefaultBpmIdentity identity = (DefaultBpmIdentity)DefaultBpmIdentity.getIdentityByUserId(uId);
				bpmIdentities.add(identity);
			}

			nodeIdentityMap.put(nodeDef.getNodeId(), bpmIdentities);
		}
		return nodeIdentityMap;
	}
	
}
