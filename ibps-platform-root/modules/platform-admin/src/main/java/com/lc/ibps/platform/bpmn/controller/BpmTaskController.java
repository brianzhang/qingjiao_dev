package com.lc.ibps.platform.bpmn.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.form.constants.RightsScope;
import com.lc.ibps.api.form.service.IFormRightsService;
import com.lc.ibps.api.form.vo.FormPermissionVo;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.ActionType;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.constant.NodeType;
import com.lc.ibps.bpmn.api.constant.PrivilegeMode;
import com.lc.ibps.bpmn.api.constant.ProcInstStatus;
import com.lc.ibps.bpmn.api.constant.TaskActionType;
import com.lc.ibps.bpmn.api.context.ContextThreadUtil;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.identity.BpmIdentityExtractService;
import com.lc.ibps.bpmn.api.model.def.BpmDefLayout;
import com.lc.ibps.bpmn.api.model.define.BpmDefineAttributes;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmVariableDefine;
import com.lc.ibps.bpmn.api.model.define.NodeAttributes;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.form.IFormModel;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.image.BpmProcessStatusColor;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.Button;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.model.node.SignNodeDefine;
import com.lc.ibps.bpmn.api.model.task.IBpmTaskApproval;
import com.lc.ibps.bpmn.api.model.vo.QualifiedExecutor;
import com.lc.ibps.bpmn.api.nat.task.NatTaskService;
import com.lc.ibps.bpmn.api.service.BpmApprovalService;
import com.lc.ibps.bpmn.api.service.BpmBoService;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmFormService;
import com.lc.ibps.bpmn.api.service.BpmIdentityService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.api.service.BpmTaskActionService;
import com.lc.ibps.bpmn.api.service.BpmTaskManagerService;
import com.lc.ibps.bpmn.api.service.BpmTaskService;
import com.lc.ibps.bpmn.api.service.DataObjectHandler;
import com.lc.ibps.bpmn.api.service.DiagramService;
import com.lc.ibps.bpmn.api.service.SignService;
import com.lc.ibps.bpmn.builder.BpmTaskBuilder;
import com.lc.ibps.bpmn.cmd.IbpsTaskFinishCmd;
import com.lc.ibps.bpmn.core.model.var.BpmVariableDefine;
import com.lc.ibps.bpmn.domain.BpmTask;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.persistence.entity.BpmCommonStatmentPo;
import com.lc.ibps.bpmn.persistence.entity.BpmExecPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskChangePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.plugin.task.tasknotify.helper.NotifyHelper;
import com.lc.ibps.bpmn.repository.BpmApproveRepository;
import com.lc.ibps.bpmn.repository.BpmExecRepository;
import com.lc.ibps.bpmn.repository.BpmTaskChangeRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.service.BpmCommonStatmentService;
import com.lc.ibps.bpmn.utils.BpmButtonUtil;
import com.lc.ibps.bpmn.utils.BpmExecUtil;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.bpmn.utils.FlowStatusColorUtil;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyUserPo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 流程任务控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-06 09:26:18
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTask/")
public class BpmTaskController extends GenericController{
	@Resource
	private BpmTaskService bpmTaskService;
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	@Resource
	private BpmTaskChangeRepository bpmTaskChangeRepository;
	@Resource
	private BpmProcInstService bpmInstService;
	@Resource
	private BpmFormService bpmFormService;
	@Resource
	private BpmBoService bpmBoService;
	@Resource
	private DataObjectHandler dataObjectHandler;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private IPartyUserService userService;
	@Resource
	private IPartyEntityService entityService;
	@Resource
	private BpmApproveRepository bpmApproveRepository;
	@Resource
	private IFormRightsService formRightsService;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private BpmTaskActionService bpmTaskActionService;
	@Resource
	private NatTaskService natTaskService;
	@Resource
	private SignService signService;
	@Resource
	private BpmTaskManagerService bpmTaskManagerService;
	@Resource
	private DiagramService diagramService;
	@Resource
	private BpmApprovalService bpmApprovalService;
	@Resource
	private BpmExecRepository bpmExecRepository;
	@Resource
	private NotifyHelper notifyHelper;
	@Resource
	private BpmIdentityExtractService bpmIdentityExtractService;
	@Resource
	private BpmIdentityService bpmIdentityService;
	@Resource
	private BpmCommonStatmentService bpmCommonStatmentService;
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;

	/**
	 * 不知谁的方法  从老平台迁移过来
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listCount")
	public ModelAndView listCount(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String type = RequestUtil.getString(request, "type");
		String proname= RequestUtil.getString(request, "proname");
		System.out.println("1"+type);
		System.out.println("2"+proname);
		return getAutoView().addObject("type", type).addObject("proname", proname);
	}


	/**
	 * 不知谁的方法  从老平台迁移过来
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listCou")
	public @ResponseBody PageJson listCou(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String proname = com.utils.StringUtil.getStr(request,"proname");
		//String proname= RequestUtil.getString(request, "proname");
		String preUrl = RequestUtil.getPrePage(request);
		//String type = RequestUtil.getString(request, "type");
		String type = com.utils.StringUtil.getStr(request,"type");
		System.out.println(type);
		System.out.println("pp"+proname);
		String whereSql="";
		String taskid="";
		String bizkey="";
		// 查询列表
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		QueryFilter queryFilter=getQuerFilter(request);
		List<BpmTaskPo> list = (List<BpmTaskPo>) bpmTaskRepository.query(queryFilter, curUser.getUserId(), isSuper);
		if(list.size()!=0)
		{
			whereSql="id_ in (select biz_key_ from ibps_bpm_inst where id_ in(select proc_inst_id_ from ibps_bpm_tasks where PROC_DEF_NAME_='"+proname+"' and NAME_='"+type+"'))";
			queryFilter.addParamsFilter("whereSql", whereSql);
			PageList<UrlZhiYuanPo> urlZhiYuanList=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
			return new PageJson(urlZhiYuanList);
		}
		return new PageJson();
	}

    @RequestMapping("listCou2")
    public @ResponseBody PageJson listCou2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
        String proname = com.utils.StringUtil.getStr(request,"proname");
        String preUrl = RequestUtil.getPrePage(request);
        String type = com.utils.StringUtil.getStr(request,"type");
        System.out.println(type);
        System.out.println("pp"+proname);
        String whereSql="";
        String taskid="";
        String bizkey="";
        // 查询列表
        User curUser = ContextUtil.getCurrentUser();
        boolean isSuper = userService.isSuperUser(curUser.getAccount());
        DefaultPage limit = new DefaultPage(900000);
        DefaultQueryFilter queryFilter=(DefaultQueryFilter)getQuerFilter(request);
        queryFilter.setPage(limit);
        List<BpmTaskPo> list = (List<BpmTaskPo>) bpmTaskRepository.query(queryFilter, curUser.getUserId(), isSuper);
        //得到候选人
        BpmTaskBuilder.build(list);
        //筛选、统计
        Map<String, Integer> ownerMap = new HashMap<>();
        for (BpmTaskPo e : list){
            if (e.getName().equals(type) && e.getProcDefName().equals(proname)){

            }
        }
        return new PageJson();
    }

	/**
	 * 不知谁的方法  从老平台迁移过来
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("cou")
	public ModelAndView  cou(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		request.setCharacterEncoding("utf-8");
//		reponse.setCharacterEncoding("utf-8");
		int mark=0;
		//String proname = RequestUtil.getString(request, "proName");
		String proname = com.utils.StringUtil.getFromRequest(request,"proName");
		System.out.println("proname"+proname);
		int tb=0,fzrsh=0,glysh=0,qr=0,zysh=0;
		String preUrl= RequestUtil.getPrePage(request);
		String whereSql="";
		String pro="";
		Map.Entry<String,Integer> entry;
		String key;
		int val;
//		whereSql="1==1";
		HashMap res=new HashMap();
		QueryFilter queryFilter = getQuerFilter(request);
		// 查询列表
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		List<BpmTaskPo> list = (List<BpmTaskPo>) bpmTaskRepository.findAll();
//		query(paramQueryFilter, curUser.getUserId(), isSuper);
		//List<BpmTaskPo> list = (List<BpmTaskPo>) bpmTaskRepository.query(queryFilter, curUser.getUserId(), isSuper);
		for (BpmTaskPo bpmTaskPo : list) {
			pro=bpmTaskPo.getName();
			System.out.println(pro);

			if(bpmTaskPo.getProcDefName().equals(proname))
			{
				Iterator iter = res.entrySet().iterator();
				while(iter.hasNext()){
					entry=(Map.Entry <String,Integer>)iter.next();
					key =entry.getKey();
					val =entry.getValue();
					if(pro.equals(key))
					{
						val=val+1;
						mark=1;
						res.put(key, val);
						break;

					}
				}
				if(mark==0)
					res.put(pro, 1);
				mark=0;
			}
		}
		return getAutoView().addObject("res", res).addObject("returnUrl", preUrl).addObject("proname", proname);
	}
	/**
	 * 【流程任务】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		// 查询列表
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		PageList<BpmTaskPo> list = (PageList<BpmTaskPo>) bpmTaskRepository.query(queryFilter, curUser.getUserId(), isSuper);
		BpmTaskBuilder.build(list);
		
		return new PageJson(list);
	}
	
	/**
	 * 编辑【流程任务】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmTaskPo bpmTask=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTask=bpmTaskRepository.get(id);
		}
		return getAutoView().addObject("bpmTask", bpmTask).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程任务】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmTaskPo bpmTask=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTask=bpmTaskRepository.get(id);
		}
		return getAutoView().addObject("bpmTask", bpmTask).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程任务】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTask
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,BpmTaskPo bpmTaskPo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			BpmTask bpmTask =bpmTaskRepository.newInstance(bpmTaskPo);
			bpmTask.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程任务成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "对流程任务操作失败",e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【流程任务】记录
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
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			BpmTask bpmTask =bpmTaskRepository.newInstance();
			bpmTask .deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程任务成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "删除流程任务失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 管理员处理任务页面。
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("doNext")
	public ModelAndView doNext(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "id");
		String lockUser = bpmTaskRepository.isLock(taskId);
		String suspendState = "0";
		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if(BeanUtils.isNotEmpty(task)){
			suspendState = String.valueOf(task.getSuspendState());
		}
		
		return new ModelAndView("/platform/bpmn/bpmTaskToStart.jsp")
				.addObject("lockUser", lockUser)
				.addObject("suspendState", suspendState)
				.addObject("taskId", taskId);
	}
	
	/**
	 * 用户跳转到任务处理页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("toStart")
	public ModelAndView toStart(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "id");
		String lockUser = bpmTaskRepository.isLock(taskId);
		String suspendState = "0";
		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if(BeanUtils.isNotEmpty(task)){
			suspendState = String.valueOf(task.getSuspendState());
		}
		
		return getAutoView()
				.addObject("lockUser", lockUser)
				.addObject("suspendState", suspendState)
				.addObject("taskId", taskId);
	}
	
	/**
	 * 获取任务的详情
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getFormData")
	@ResponseBody
	public Object getFormData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = request.getParameter("taskId");
		User curUser = ContextUtil.getCurrentUser();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);
		IDataObject dataObject = null;
		IFormModel formModel  =null;
		String permissions = "";
		List<Button> buttons = null;
		try {
			BpmTaskPo task = bpmTaskRepository.get(taskId);
			if (BeanUtils.isEmpty(task)) {
				map.put("result", false);
				map.put("msg", "任务不存在，可能已经被处理了.");
				return map;
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
				 
				permissions = formRightsService.getPermission(new FormPermissionVo(RightsScope.NODE,ContextUtil.getCurrentUserId(),
						formModel.getKey(), rightsMap));
			}
	
			// 按钮
			IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(defId, nodeId);
			String data = entityService.findByUserAccountJson(curUser.getAccount());
			List<PartyEntity> groups = new ArrayList<PartyEntity>();
			if(JacksonUtil.isJsonArray(data)){
				List<PartyEntityPo> pes = JacksonUtil.getDTOList(data, PartyEntityPo.class);
				groups.addAll(pes);
			}
			List<String> gids = PartyUtil.partyToGroupId(groups);
			
			buttons = getButton(curUser, dataObject, task, taskNodeDef, gids);
			
			// 审批意见
			List<BpmApprovePo> opinionList = bpmApproveRepository.getFormOpinionByInstId(task.getProcInstId());
			// 按钮
			map.put("buttons", buttons);
			// 表单
			map.put("formModel", formModel);
			// bo数据
			map.put("boData", BeanUtils.isNotEmpty(dataObject)?dataObject.getData():null);
			//版本号
			map.put("version",  BeanUtils.isNotEmpty(dataObject) ? dataObject.getVersion() : 0);
			//表单权限
			map.put("permissions", permissions);
			
			// 是否隐藏意见框
			// 子流程节点设置应该另外考虑
			boolean isHideOpinion = false;
			boolean isHidePath = false;
			boolean isCommonJumpType = false;
			boolean isEnd = false;
			if(taskNodeDef != null){
				NodeAttributes nodeAttributes = taskNodeDef.getLocalProperties();
				isHideOpinion = BeanUtils.isNotEmpty(nodeAttributes)?nodeAttributes.isHideOpinion():isHideOpinion;
				isHidePath = BeanUtils.isNotEmpty(nodeAttributes)?nodeAttributes.isHidePath():isHidePath;
				isCommonJumpType = BeanUtils.isNotEmpty(nodeAttributes)?nodeAttributes.getJumpType().equals("common"):isCommonJumpType;
				
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
				if(BeanUtils.isEmpty(pathOutgoingNodes)){
					isEnd = true;
				}
			}
			Map<String, Object> attributes = Maps.newHashMap();
			attributes.put("opinionList", opinionList);
			attributes.put("isHideOpinion", isHideOpinion);
			attributes.put("isHidePath", isHidePath);
			attributes.put("isCommonJumpType", isCommonJumpType);
			attributes.put("isEnd", isEnd);
			map.put("attributes", attributes);
		} catch (Exception e) {
			logger.error("任务数据获取失败，"+e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "任务数据获取失败，"+e.getMessage());
		}
		
		return map;
	}

	private List<Button> getButton(User curUser, IDataObject dataObject, BpmTaskPo task,
			IBpmNodeDefine taskNodeDef, List<String> gids) {
		List<Button> buttons;
		if(BeanUtils.isEmpty(task)){
			buttons = BpmButtonUtil.getButtons(taskNodeDef, task, dataObject, curUser.getUserId(), gids);
			return buttons;
		}
		Map<String, Object> params = new HashMap<String, Object>();
		// 流程配置是否允许转办
		IBpmDefineReader reader = AppUtil.getBean(IBpmDefineReader.class);
		IBpmProcDefine<IBpmProcExtendDefine> procDefine = reader.getBpmProcDefine(task.getProcDefId());
		BpmDefineAttributes attributes = procDefine.getBpmProcExtendDefine().getExtendAttributes();
		boolean allow = attributes.isAllowTransTo();
		if(allow){
			// 是否存在运行中的任务变更记录
			List<BpmTaskChangePo> chgList = bpmTaskChangeRepository.findByTask(task.getId(), BpmTaskChangePo.CHANGE_STATUS_RUNNING);
			if(BeanUtils.isEmpty(chgList)){
				params.put("isHiddenDelegate", false);
			}else{
				params.put("isHiddenDelegate", true);
			}
		}else{
			params.put("isHiddenDelegate", true);
		}
		params.put("userId", curUser.getUserId());
		params.put("isSuper", curUser.isSuper());
		params.put("suspendState", task.getSuspendState());
		if(StringUtil.isNotEmpty(task.getLockUser())){
			params.put("lockUser", task.getLockUser());
		}
		buttons = BpmButtonUtil.filterButtons(
				BpmButtonUtil.getButtons(taskNodeDef, task, dataObject, curUser.getUserId(), gids), params);
		return buttons;
	}
	
	/**
	 * 处理任务(批量)
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("completeBatch")
	public void completeBatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
		IbpsTaskFinishCmd cmd = getCmdFromRequestForBatch(request);
		String taskIds = RequestUtil.getString(request, "taskIds");
		logger.info("completeBatch:" + taskIds);
		try {
			
			bpmTaskActionService.finishTasks(cmd);
			writeResultMessage(response.getWriter(), "任务办理成功", ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error("complete task:" + e.getMessage(), e);
			writeResultMessage(response.getWriter(), e.getMessage() , ResultMessage.FAIL);
		}
	}
	
	/**
	 * 处理任务
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("complete")
	public void complete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 获取cmd对象。
			IbpsTaskFinishCmd cmd = getCmdFromRequest(request);
			logger.info("complete:" + JSONObject.fromObject(cmd));
			
			boolean result = bpmTaskActionService.finishTask(cmd);
			if (result) {
				bpmCommonStatmentService.updataTimes(cmd.getApprovalOpinion(),cmd.getCurUser(),cmd.getActionName());
				ActionCmd finsActionCmd = ContextThreadUtil.getActionCmd(cmd.getInstId());
				Object rejectAfterExecutionId = finsActionCmd.getTransitVars("rejectAfterExecutionId");
				if (rejectAfterExecutionId != null && StringUtil.isNotEmpty(rejectAfterExecutionId.toString())) {
					// 调整Activiti的执行表数据
					BpmExecUtil.multipleInstancesRejectAdjust(rejectAfterExecutionId.toString());
				}
				writeResultMessage(response.getWriter(), "任务办理成功", ResultMessage.SUCCESS);
			} else {
				writeResultMessage(response.getWriter(), "任务办理失败", ResultMessage.FAIL);
			}
		} catch (Exception e) {
			logger.error("complete task:" + e.getMessage(), e);
			String rootCauseMsg = ExceptionUtils.getRootCauseMessage(e);
			writeResultMessage(response.getWriter(), "任务办理失败", rootCauseMsg, ResultMessage.FAIL);
		}
	}
	
	
	/**
	 * 从上下文请求获取包装后的cmd对象。
	 * 
	 * @param request
	 * @return DefaultTaskFinishCmd
	 */
	private IbpsTaskFinishCmd getCmdFromRequestForBatch(HttpServletRequest request) {
		String taskIds = RequestUtil.getString(request, "taskIds");
		String actionName = RequestUtil.getString(request, "actionName");
		String opinion = RequestUtil.getString(request, "opinion");
		String busData = RequestUtil.getString(request, "data");
		String nodeUsers = RequestUtil.getString(request, "nodeUsers");
		
		String directHandlerSign = RequestUtil.getString(request, "directHandlerSign");
		String backHandMode = RequestUtil.getString(request, BpmConstants.BACK_HAND_MODE);
		
		String jumpType = "common";
		String destination = "";
		if(StringUtil.isNotEmpty(nodeUsers)){
			JSONArray nodeUserArr = JSONArray.fromObject(nodeUsers);
			if(JsonUtil.isNotEmpty(nodeUserArr)){
				jumpType = JsonUtil.getString(nodeUserArr.getJSONObject(0), "jumpType");
				destination = JsonUtil.getString(nodeUserArr.getJSONObject(0), "nodeId");
			}
		}
		
		IbpsTaskFinishCmd cmd = new IbpsTaskFinishCmd();
		
		User curUser = ContextUtil.getCurrentUser();
		cmd.setOptIp(RequestUtil.getIpAddr(request));
		cmd.setCurUser(curUser.getUserId());
		cmd.setCurUserName(curUser.getFullname());
		
		cmd.setTaskIds(taskIds);
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
			destination = RequestUtil.getString(request, "destination");
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
		
		return cmd;
	}
	
	/**
	 * 从上下文请求获取包装后的cmd对象。
	 * 
	 * @param request
	 * @return DefaultTaskFinishCmd
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsTaskFinishCmd getCmdFromRequest(HttpServletRequest request) {
		String taskId = RequestUtil.getString(request, "taskId");
		String actionName = RequestUtil.getString(request, "actionName");
		String opinion = RequestUtil.getString(request, "opinion");
		String busData = RequestUtil.getString(request, "data");
		String nodeUsers = RequestUtil.getString(request, "nodeUsers");
		
		int version = RequestUtil.getInt(request, "version",0);

		String directHandlerSign = RequestUtil.getString(request, "directHandlerSign");
		String backHandMode = RequestUtil.getString(request, BpmConstants.BACK_HAND_MODE);
		
		String jumpType = "common";
		String destination = "";
		if(StringUtil.isNotEmpty(nodeUsers)){
			JSONArray nodeUserArr = JSONArray.fromObject(nodeUsers);
			if(JsonUtil.isNotEmpty(nodeUserArr)){
				jumpType = JsonUtil.getString(nodeUserArr.getJSONObject(0), "jumpType");
				destination = JsonUtil.getString(nodeUserArr.getJSONObject(0), "nodeId");
			}
		}
		
		IbpsTaskFinishCmd cmd = new IbpsTaskFinishCmd();
		
		User curUser = ContextUtil.getCurrentUser();
		cmd.setOptIp(RequestUtil.getIpAddr(request));
		cmd.setCurUser(curUser.getUserId());
		cmd.setCurUserName(curUser.getFullname());
		cmd.setVersion(version);
		
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
			destination = RequestUtil.getString(request, "destination");
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
		BpmTaskPo po = bpmTaskRepository.getTaskId(taskId);
		IBpmProcInst bpmInst = bpmInstService.getProcInstByBpmnInst(po.getBpmnInstId());
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(po.getProcDefId());
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String  dataSaveMode  =DataSaveMode.TABLE;
			FormCategory formCategory =	bpmProcExtendDefine.getGlobalForm().getType();
			if(FormCategory.INNER.equals(formCategory)){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable() ? DataSaveMode.TABLE : DataSaveMode.INSTANCE;
				//设置表单cmd
				bpmFormService.setFormOptions(cmd,po.getProcDefId(),po.getNodeId(), bpmInst);
			}else if(FormCategory.URL_LOAD.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PAIR;
			}else if(FormCategory.FRAME.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PK;
			}
			
			cmd.setDataMode(dataSaveMode);
			cmd.setBusData(busData);
		}
		
		// 添加变量的设置
		Map<String, Object> vars = this.getTaskVars(po.getProcDefId(),po.getNodeId(),request);
		cmd.setVariables(vars);

		cmd.setBusinessKey(bpmInst.getBizKey());
		
		return cmd;
	}
	
	/**
	 * 获取任务上下文流程变量。
	 * @param procDefId 
	 * @param nodeId 
	 * @param request
	 * @return Map&lt;String,Object>
	 */
	private Map<String, Object> getTaskVars(String procDefId, String nodeId, HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		List<IBpmVariableDefine> list = bpmDefineService.getVariableDefs(procDefId,  nodeId);
		if(BeanUtils.isEmpty(list)){
			return params;
		}
		for (IBpmVariableDefine varDef : list) {
			//TODO 流程变量覆盖前置脚本设置变量
//			String reqValue = RequestUtil.getString(request, varDef.getKey(), String.valueOf(varDef.getDefaultVal()));
//			Object convertVal = BpmVariableDefine.getValue(varDef.getDataType(), reqValue);
//			params.put(varDef.getKey(), convertVal);
			
			String reqValue = RequestUtil.getString(request, varDef.getKey());
			if (StringUtil.isNotEmpty(reqValue)) {
				Object convertVal = BpmVariableDefine.getValue(varDef.getDataType(), reqValue);
				params.put(varDef.getKey(), convertVal);
			}
		}
		
		return params;
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
	 * 任务办理(同意)(批量)
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toAgreeDialog")
	public ModelAndView toAgreeDialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		String actionName = RequestUtil.getString(request, "actionName");
		ModelAndView autoView = getAutoView();
		autoView.addObject("taskId", taskId).addObject("actionName", actionName);
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService.findDefault(actionName,ContextUtil.getCurrentUserId());
		autoView.addObject("defaultCommonStatment", defaultCommonStatment);
		return autoView;
	}
	
	/**
	 * 任务办理(同意、反对、弃权)
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toAgree")
	public ModelAndView toAgree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		String actionName = RequestUtil.getString(request, "actionName");
		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if(BeanUtils.isEmpty(task))
			throw new RuntimeException("该任务已经被不存在！");
		validatePression(taskId, actionName);


		String defId = task.getProcDefId();
		String nodeId = task.getNodeId();

		ModelAndView autoView = getAutoView();
		autoView.addObject("taskId", taskId).addObject("actionName", actionName);

		IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(defId, nodeId);
		// 非弃权动作并且是会签任务
		if (!"abandon".equals(actionName) && taskNodeDef.getType().equals(NodeType.SIGNTASK)) {
			IBpmProcInst bpmProcessInstance = bpmInstService.getProcInst(task.getProcInstId());
			notAbandon(task, bpmProcessInstance, autoView, taskNodeDef);
		}
		
		NodeAttributes nodeAttributes = taskNodeDef.getLocalProperties();
		String jumpType = nodeAttributes!=null ? nodeAttributes.getJumpType() : "common";
		boolean hidePath = nodeAttributes!=null ? nodeAttributes.isHidePath() : false;
		boolean hideOpinion = nodeAttributes!=null ? nodeAttributes.isHideOpinion() : false;
		
		if (TaskActionType.AGREE.getKey().equals(actionName)) {
			handlePath(task, defId, autoView, taskNodeDef, jumpType);
		}
		
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService.findDefault(TaskActionType.AGREE.getKey(),ContextUtil.getCurrentUserId());
		autoView.addObject("defaultCommonStatment", defaultCommonStatment);
		
		return autoView.addObject("jumpType", jumpType)
				.addObject("hidePath", hidePath)
				.addObject("hideOpinion", hideOpinion);
	}

	/**
	 * 处理同意时路径数据
	 *
	 * @param task
	 * @param defId
	 * @param autoView
	 * @param taskNodeDef
	 * @param jumpType 
	 */
	private void handlePath(BpmTaskPo task, String defId, ModelAndView autoView, IBpmNodeDefine taskNodeDef,
			String jumpType) {
		List<IBpmNodeDefine> outcomeNodes = taskNodeDef.getOutgoingNodeList();
		List<IBpmNodeDefine> handlerSelectOutcomeNodes = handlerSelectOutgoingNodes(outcomeNodes);
		
		if (jumpType.contains("select")) {
			autoView.addObject("outgoingNodes", handlerSelectOutcomeNodes);
			
			// 计算人员配置结果
			calcUsers(task, autoView, handlerSelectOutcomeNodes, "outgoingNodesUsersMap");
		}
		
		if (jumpType.contains("free")) {
			List<IBpmNodeDefine> allNodeDef = bpmDefineReader.findNode(defId);
			// 移除开始节点
			List<IBpmNodeDefine> removeList = new ArrayList<IBpmNodeDefine>();
			for (IBpmNodeDefine bpmNodeDef : allNodeDef) {
				if (NodeType.START.equals(bpmNodeDef.getType())) {
					removeList.add(bpmNodeDef);
				}
			}
			allNodeDef.removeAll(removeList);
			autoView.addObject("allNodeDef", allNodeDef);
			
			// 计算人员配置结果
			calcUsers(task, autoView, allNodeDef, "allNodeDefUsersMap");
		}
		
		List<IBpmNodeDefine> pathOutgoingNodes = Lists.newArrayList(handlerSelectOutcomeNodes);
		List<IBpmNodeDefine> removeList = new ArrayList<IBpmNodeDefine>();
		for (IBpmNodeDefine bpmNodeDef : pathOutgoingNodes) {
			if (NodeType.END.equals(bpmNodeDef.getType())) {
				removeList.add(bpmNodeDef);
			}
		}
		pathOutgoingNodes.removeAll(removeList);
		autoView.addObject("pathOutgoingNodes", pathOutgoingNodes);
		
		// 计算人员配置结果
		calcUsers(task, autoView, pathOutgoingNodes, "pathOutgoingNodesUsersMap");
	}

	/**
	 * 计算人员配置结果
	 *
	 * @param task
	 * @param autoView
	 * @param handlerSelectOutcomeNodes 
	 */
	private void calcUsers(BpmTaskPo task, ModelAndView autoView, List<IBpmNodeDefine> nodeList, String key) {
		List<BpmIdentity> userList;
		List<Map<String, String>> userMapList;
		Map<String, List<Map<String, String>>> userListMap;
		if(BeanUtils.isNotEmpty(nodeList)){
			userListMap = new HashMap<String, List<Map<String,String>>>();
			for(IBpmNodeDefine nodeDef : nodeList){
				userList = bpmIdentityService.getByNode(task.getProcInstId(), nodeDef.getNodeId(), true);
				userMapList = bpmIdentityExtractService.extractUser(userList);
				userListMap.put(nodeDef.getNodeId(), userMapList);
			}
			autoView.addObject(key, JSONObject.fromObject(userListMap));
		}
	}

	/**
	 * 非弃权动作并且是会签任务
	 *
	 * @param task
	 * @param bpmProcessInstance
	 * @param autoView
	 * @param taskNodeDef 
	 */
	private void notAbandon(BpmTaskPo task, IBpmProcInst bpmProcessInstance, ModelAndView autoView,
			IBpmNodeDefine taskNodeDef) {
		IDataObject dataObjects = bpmBoService.getDataByInst(bpmProcessInstance);
		Map<String, Object> variables = natTaskService.getVariables(task.getTaskId());
		User curUser = ContextUtil.getCurrentUser();
		
		List<PartyEntity> groups = new ArrayList<PartyEntity>();
		String data = entityService.findByUserAccountJson(curUser.getAccount());
		if(JacksonUtil.isJsonArray(data)){
			List<PartyEntityPo> pes = JacksonUtil.getDTOList(data, PartyEntityPo.class);
			groups.addAll(pes);
		}
		
		List<String> gids = PartyUtil.partyToGroupId(groups);
		List<PrivilegeMode> privilege = signService.getPrivilege(curUser.getUserId(), gids,
				(SignNodeDefine) taskNodeDef, variables, dataObjects);
		// 拥有直接处理会签任务的特权
		if (privilege.contains(PrivilegeMode.ALL) || privilege.contains(PrivilegeMode.DIRECT)) {
			autoView.addObject("directHandlerSign", true);
		}
	}
	
	/**
	 * 处理选择路径跳转的分支出口
	 *
	 * @param outgoingNodes
	 * @return 
	 */
	private List<IBpmNodeDefine> handlerSelectOutgoingNodes(List<IBpmNodeDefine> outgoingNodes) {
		if(BeanUtils.isEmpty(outgoingNodes)){
			return Collections.emptyList();
		}
		
		List<IBpmNodeDefine> returnList = new ArrayList<IBpmNodeDefine>();
		for(IBpmNodeDefine bpmNodeDef : outgoingNodes){
			NodeType nodeType = bpmNodeDef.getType();
			// 网关节点
			if (NodeType.EXCLUSIVEGATEWAY.equals(nodeType) || NodeType.INCLUSIVEGATEWAY.equals(nodeType)
					|| NodeType.PARALLELGATEWAY.equals(nodeType)) {
				returnList.addAll(handlerSelectOutgoingNodes(bpmNodeDef.getOutgoingNodeList()));
			}else{
				returnList.add(bpmNodeDef);
			}
		}
		
		return returnList;
	}
	
	/**
	 * 判断当前用户是否拥有进行action操作的权限
	 * 
	 * @param action
	 * @param taskId
	 * @return
	 * @throws Exception
	 */
	private void validatePression(String taskId, String action) throws Exception {
		if (StringUtil.isEmpty(taskId) || StringUtil.isEmpty(action))
			return;

		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if (task == null)
			return;

		// 先查询自己是否有这个任务；
		boolean mark = false;

		User defaultUser = ContextUtil.getCurrentUser();
		if (defaultUser.isSuper()) {
			mark = true;
		} else {
			// 获取任务 的人
			List<Map<String,String>> users = bpmTaskService.getUserByTask(taskId);
			String userId = defaultUser.getUserId();
			for (Map<String,String> user : users) {
				if(BpmIdentity.TYPE_PARTY.equals(user.get(BpmIdentity.IDENT_TYPE))){
					String type = user.get(BpmIdentity.IDENT_PARTY_TYPE);
					List<User> userList = cast2User(DefaultPartyUserPo.fromJsonArrayString2(
							userService.findByPartyJson(user.get("id"), type)
							));
					if(containsUser(userList, defaultUser)){
						mark = true;
						break;
					}
				}else{
					if (user.containsKey("id") && userId.equals(user.get("id").toString())) {
						mark = true;
						break;
					}
				}
			}
			
			// 获取代理人
			users = bpmTaskChangeRepository.findUserByTask(taskId, BpmTaskChangePo.CHANGE_STATUS_RUNNING);
			for (Map<String,String> user : users) {
				if (user.containsKey("id") && userId.equals(user.get("id").toString())) {
					mark = true;
					break;
				}
			}
		}

		if (mark) {
			String defId = task.getProcDefId();
			String nodeId = task.getNodeId();

			IBpmNodeDefine taskNodeDef = bpmDefineReader.getNode(defId, nodeId);
			List<PartyEntity> groups = new ArrayList<PartyEntity>();
			String data = entityService.findByUserAccountJson(defaultUser.getAccount());
			if(JacksonUtil.isJsonArray(data)){
				List<PartyEntityPo> pes = JacksonUtil.getDTOList(data, PartyEntityPo.class);
				groups.addAll(pes);
			}
			List<String> gids = PartyUtil.partyToGroupId(groups);
			List<Button> buttons = BpmButtonUtil.getButtons(taskNodeDef, task, defaultUser.getUserId(), gids);
			for (Button button : buttons) {
				if (action.equals(button.getAlias()))
					return;
			}
		}

		throw new Exception("您没有执行该操作的权限.");
	}
	
	private boolean containsUser(List<User> userList, User defaultUser){
		if(BeanUtils.isEmpty(userList)){
			return false;
		}
		
		for(User u : userList){
			if(u.getUserId().equals(defaultUser.getUserId())){
				return true;
			}
		}
		
		return false;
	}
	
	/**
	 * 驳回
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toReject")
	public ModelAndView toReject(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		validatePression(taskId, ActionType.REJECT.getKey());

		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if (BeanUtils.isEmpty(task))
			throw new RuntimeException("该任务已经完成！");
		
		String procDefId = task.getProcDefId();
		String nodeId = task.getNodeId();

		// 查询历史轨迹
		BpmExecPo currExec = bpmExecRepository.getByTaskId(taskId);
		List<IBpmNodeDefine> hisBpmNodeDefs = BpmExecUtil.getHistoryListBpmNodeDefine(currExec, procDefId, nodeId, "pre");
		// 节点去重
		hisBpmNodeDefs = new ArrayList<IBpmNodeDefine>(new HashSet<IBpmNodeDefine>(hisBpmNodeDefs));
		// 过滤本节点
		for (Iterator<IBpmNodeDefine> iterator = hisBpmNodeDefs.iterator(); iterator.hasNext();) {
			IBpmNodeDefine iBpmNodeDefine = iterator.next();
			if(iBpmNodeDefine.getNodeId().equalsIgnoreCase(nodeId)){
				iterator.remove();
			}
		}
		
		// 允许直来直往的节点
		List<IBpmNodeDefine> bpmExecUserNode = new ArrayList<IBpmNodeDefine>();
		// 允许按流程图执行的节点
		List<IBpmNodeDefine> bpmExecGoMapUserNode = new ArrayList<IBpmNodeDefine>();
		List<String> nodeids = new ArrayList<String>();
		String procInstId = task.getProcInstId();
		for (IBpmNodeDefine node : hisBpmNodeDefs) {
			if (node.getType().equals(NodeType.USERTASK)&&!nodeids.contains(node.getNodeId())) {
				bpmExecUserNode.add(node);
				nodeids.add(node.getNodeId());
				boolean isHavePre = BpmExecUtil.hasAndOrGateway(procInstId, node.getNodeId(), "pre");
				boolean isHaveAfter = BpmExecUtil.hasAndOrGateway(procInstId, node.getNodeId(), "after");
				if (!(isHavePre && isHaveAfter)) {
					bpmExecGoMapUserNode.add(node);
				}
			}
		}
		
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService.findDefault(TaskActionType.REJECT.getKey(),ContextUtil.getCurrentUserId());
		
		return getAutoView().addObject("taskId", taskId).addObject("bpmExecUserNode", bpmExecUserNode)
				.addObject("bpmExecGoMapUserNode", bpmExecGoMapUserNode)
				.addObject("defaultCommonStatment", defaultCommonStatment);
	}
	
	/**
	 * 驳回上一步
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toRejectToPrevious")
	public ModelAndView toRejectToPrevious(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		validatePression(taskId, ActionType.REJECT_TO_PREVIOUS.getKey());
		
		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if (BeanUtils.isEmpty(task))
			throw new RuntimeException("该任务已经完成！");
		
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService
				.findDefault(ActionType.REJECT.getKey(),ContextUtil.getCurrentUserId());
		
		return getAutoView().addObject("taskId", taskId).addObject("defaultCommonStatment", defaultCommonStatment);
	}
	
	/**
	 * 驳回
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toRejectToStart")
	public ModelAndView toRejectToStart(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		validatePression(taskId, ActionType.REJECT_TO_START.getKey());

		BpmTaskPo task = bpmTaskRepository.get(taskId);
		if (BeanUtils.isEmpty(task))
			throw new RuntimeException("该任务已经完成！");
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService
				.findDefault(ActionType.REJECT_TO_START.getKey(),ContextUtil.getCurrentUserId());
		
		return getAutoView().addObject("taskId", taskId).addObject("defaultCommonStatment", defaultCommonStatment);
	}
	
	/**
	 * 跳转添加会签任务
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toAddSignTask")
	public ModelAndView toAddSignTask(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		validatePression(taskId, "addSign");
		// 判断权限
		return getAutoView().addObject("taskId", taskId);
	}
	
	/**
	 * 会签任务-补签
	 *
	 * @param request
	 * @param response
	 * @throws Exception 
	 */
	@RequestMapping("doAddSignTask")
	public void doAddSignTask(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		String userId = RequestUtil.getString(request, "addSignTaskUserId");
		String messageType = RequestUtil.getString(request, "messageType");
		String addReason = RequestUtil.getString(request, "addReason");
		User curUser = ContextUtil.getCurrentUser();
		try{
			ResultMessage addSignTask = signService.addSignTask(curUser.getUserId(), taskId, userId.split(","), messageType.split(","), addReason);
	
			if (addSignTask.getResult() == ResultMessage.SUCCESS) {
				writeResultMessage(response.getWriter(), "补签成功", ResultMessage.SUCCESS);
			} else {
				writeResultMessage(response.getWriter(), "补签失败," + addSignTask.getMessage(), ResultMessage.FAIL);
			}
		}catch(Exception e){
			writeResultMessage(response.getWriter(), "补签失败," + e.getMessage(), ResultMessage.FAIL);
			logger.error("补签失败," + e.getMessage(), e);
		}
	}
	
	/**
	 * 跳转到终止流程界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("toEndProcess")
	public ModelAndView toEndProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		String[] ids = StringUtil.split(taskId, StringPool.COMMA);
		for (String id : ids) {
			validatePression(id, "endProcess");
		}
		BpmCommonStatmentPo defaultCommonStatment = bpmCommonStatmentService
				.findDefault(ProcInstStatus.STATUS_MANUAL_END.getKey(),ContextUtil.getCurrentUserId());
		return getAutoView().addObject("taskId", taskId).addObject("defaultCommonStatment", defaultCommonStatment);
	}
	
	/**
	 * 终止流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception 
	 */
	@RequestMapping("doEndProcess")
	public void doEndProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		String messageType = RequestUtil.getString(request, "messageType");
		String endReason = RequestUtil.getString(request, "endReason");
		try {
			bpmTaskManagerService.endProcessByTaskIds(taskId, messageType, endReason, ContextUtil.getCurrentUser().getUserId());
			writeResultMessage(response.getWriter(), "终止流程成功", ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "终止流程失败," + e.getMessage(), ResultMessage.FAIL);
			logger.error("终止流程失败," + e.getMessage(), e);
		}
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
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "taskId");
		BpmTaskPo bpmTask = null;
		BpmDefLayout bpmDefLayout = null;
		IBpmProcInst bpmProcInst = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmTask = bpmTaskRepository.get(id);
			bpmProcInst = bpmInstService.getProcInst(bpmTask.getProcInstId());
			// 流程图layout
			bpmDefLayout = diagramService.getLayoutByDefId(bpmTask,ContextUtil.getCurrentUserId());
		}
		List<BpmProcessStatusColor> list  = FlowStatusColorUtil.getProcessStatusColorList();
		
		return new ModelAndView("/platform/bpmn/instance/bpmInstFlowImage.jsp")
				.addObject("bpmProcInst", bpmProcInst)
				.addObject("instId", bpmProcInst.getId())
				.addObject("bpmDefLayout", bpmDefLayout)
				.addObject("statusColorList",list)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 获取流程实例中指定节点的审批意见
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("nodeApproval")
	@ResponseBody
	public Object nodeApproval(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String instId = RequestUtil.getString(request, "instId");
		String nodeId = RequestUtil.getString(request, "nodeId");

		Map<String, Object> data = bpmApprovalService.setApprovalerName(bpmApprovalService.getNodeApprovalMap(instId, nodeId));
		data.put("instId", instId);
		data.put("nodeId", nodeId);
		
		int bpmNodeUserShowCount = Integer.valueOf(AppUtil.getProperty("bpm.node.user.show.count", "5"));
		data.put("bpmNodeUserShowCount", bpmNodeUserShowCount);
		
		return data;
	}
	
	/**
	 * 获取流程实例中指定节点的审批意见
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("nodeExecutor")
	public ModelAndView nodeExecutor(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String instId = RequestUtil.getString(request, "instId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		String approvalId = RequestUtil.getString(request, "approvalId", "");
		
		ModelAndView mv = new ModelAndView("/platform/bpmn/instance/bpmInstNodeExecutor.jsp");
		
		Map<String, Object> data = bpmApprovalService.getNodeApprovalMap(instId, nodeId);
		if(StringUtil.isNotEmpty(approvalId)){
			List<IBpmTaskApproval> approvalList = (List<IBpmTaskApproval>) data.get("data");
			List<QualifiedExecutor> qeList = null;
			for(IBpmTaskApproval approval : approvalList){
				if(approval.getId().equals(approvalId)){
					qeList = approval.getQualifiedExecutor();
				}
			}
			mv.addObject("data", qeList);
			mv.addObject("hasApproval", true);
		}else{
			mv.addObject("hasApproval", false);
			mv.addObject("data", data.get("data"));
		}
		
		return mv;
	}
	
	/**
	 * 流程任务-指定执行人
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("assignee")
	public void assignee(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] taskIdArr = RequestUtil.getStringAryByStr(request, "taskId");
		String[] userIdArr = RequestUtil.getStringAryByStr(request, "userId");
		if(BeanUtils.isEmpty(taskIdArr)){
			writeResultMessage(response.getWriter(), "指定执行人失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		if(BeanUtils.isEmpty(userIdArr)){
			writeResultMessage(response.getWriter(), "指定执行人失败，人员ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			BpmTask bpmTaskDomain = bpmTaskRepository.newInstance();
			bpmTaskDomain.assignee(taskIdArr, userIdArr);
			
			writeResultMessage(response.getWriter(), "指定执行人成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}



	/**
	 * 流程任务-锁定
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("lock")
	public void lock(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		if(StringUtil.isEmpty(taskId)){
			writeResultMessage(response.getWriter(), "锁定任务失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			String userId = ContextUtil.getCurrentUserId();
			String lockUser = bpmTaskRepository.isLock(taskId);
			if(StringUtil.isNotEmpty(lockUser)){
				User user = DefaultPartyUserPo.fromJsonString2(userService.getByIdJson(lockUser));
				String userName = BeanUtils.isEmpty(user) ? "未知" : user.getFullname();
				writeResultMessage(response.getWriter(), "锁定任务失败，任务已被【"+ userName +"】锁定！", ResultMessage.FAIL);
				return;
			}
			
			BpmTaskPo po = new BpmTaskPo();
			po.setId(taskId);
			po.setLockUser(userId);
			BpmTask bpmTaskDomain = bpmTaskRepository.newInstance(po);
			bpmTaskDomain.lock();
			
			writeResultMessage(response.getWriter(), "锁定任务成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * 流程任务-解锁
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("unlock")
	public void unlock(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		if(StringUtil.isEmpty(taskId)){
			writeResultMessage(response.getWriter(), "解锁任务失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			String userId = ContextUtil.getCurrentUserId();
			
			if(!ContextUtil.isSuper()){
				String lockUser = bpmTaskRepository.isLockByUserId(taskId, userId);
				if(StringUtil.isNotEmpty(lockUser)){
					User user = DefaultPartyUserPo.fromJsonString2(userService.getByIdJson(lockUser));
					String userName = BeanUtils.isEmpty(user) ? "未知" : user.getFullname();
					writeResultMessage(response.getWriter(), "解锁任务失败，任务已被【"+ userName +"】锁定！", ResultMessage.FAIL);
					return;
				}
			}
			
			BpmTaskPo po = new BpmTaskPo();
			po.setId(taskId);
			po.setLockUser(userId);
			BpmTask bpmTaskDomain = bpmTaskRepository.newInstance(po);
			bpmTaskDomain.unlock();
			
			writeResultMessage(response.getWriter(), "解锁锁任务成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * 流程实例-挂起
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("suspendProcess")
	public void suspendProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		if(StringUtil.isEmpty(taskId)){
			writeResultMessage(response.getWriter(), "流程实例挂起失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			BpmTaskPo task = bpmTaskRepository.get(taskId);
			if(BeanUtils.isEmpty(task)){
				writeResultMessage(response.getWriter(), "流程实例挂起失败，任务为空！", ResultMessage.FAIL);
				return;
			}
			bpmInstService.suspendProcInst(task.getBpmnInstId());
			
			writeResultMessage(response.getWriter(), "流程实例挂起成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * 流程实例-恢复
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("recoverProcess")
	public void recoverProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskId = RequestUtil.getString(request, "taskId");
		if(StringUtil.isEmpty(taskId)){
			writeResultMessage(response.getWriter(), "流程实例恢复失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			BpmTaskPo task = bpmTaskRepository.get(taskId);
			if(BeanUtils.isEmpty(task)){
				writeResultMessage(response.getWriter(), "流程实例恢复失败，任务为空！", ResultMessage.FAIL);
				return;
			}
			bpmInstService.recoverProcInst(task.getBpmnInstId());
			
			writeResultMessage(response.getWriter(), "流程实例恢复成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * 流程实例-批量挂起
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("batchSuspendProcess")
	public void batchSuspendProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskIds = RequestUtil.getString(request, "taskIds");
		if(StringUtil.isEmpty(taskIds)){
			writeResultMessage(response.getWriter(), "流程实例挂起失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			bpmInstService.batchSuspendProcInst(taskIds);
			writeResultMessage(response.getWriter(), "流程实例挂起成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * 流程实例-批量恢复
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("batchRecoverProcess")
	public void batchRecoverProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String taskIds = RequestUtil.getString(request, "taskIds");
		if(StringUtil.isEmpty(taskIds)){
			writeResultMessage(response.getWriter(), "流程实例恢复失败，任务ID为空！", ResultMessage.FAIL);
			return;
		}
		
		try{
			bpmInstService.batchRecoverProcInst(taskIds);
			writeResultMessage(response.getWriter(), "流程实例恢复成功", ResultMessage.SUCCESS);
		}catch (Exception e){
			writeResultMessage(response.getWriter(), e.getMessage(), ResultMessage.ERROR);
		}
	}
	
	/**
	 * List<DefaultPartyUserPo>转换为List<User>
	 *
	 * @param users
	 * @return 
	 */
	private List<User> cast2User(List<DefaultPartyUserPo> users) {
		if(BeanUtils.isEmpty(users)) return Collections.emptyList();
		List<User> res = new ArrayList<User>();
		for(DefaultPartyUserPo user : users){
			res.add(user);
		}
		return res;
	}
	
}
