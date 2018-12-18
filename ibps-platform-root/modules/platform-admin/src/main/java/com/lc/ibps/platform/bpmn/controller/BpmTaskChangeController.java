
package com.lc.ibps.platform.bpmn.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.BpmDefineAttributes;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.builder.BpmTaskChangeBuilder;
import com.lc.ibps.bpmn.domain.BpmTaskChange;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskChangeAssignPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskChangePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmTaskChangeRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;

import net.sf.json.JSONObject;

/**
 * 流程任务变更 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-11 19:45:10
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTaskChange/")
public class BpmTaskChangeController extends GenericController{
	@Resource
	private BpmTaskChangeRepository bpmTaskChangeRepository;
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	
	/**
	 * 【流程任务变更】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		if(!ContextUtil.getCurrentUser().isSuper()){
			queryFilter.addFilter("OWNER_ID_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		}
		PageList<BpmTaskChangePo> bpmTaskChangeList=(PageList<BpmTaskChangePo>)bpmTaskChangeRepository.query(queryFilter);
		BpmTaskChangeBuilder.build(bpmTaskChangeList);
		return new PageJson(bpmTaskChangeList);
	}
	
	/**
	 * 编辑【流程任务变更】信息页面
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
		BpmTaskChangePo bpmTaskChange=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChange=bpmTaskChangeRepository.loadCascade(id);
			BpmTaskChangeBuilder.build(bpmTaskChange);
		}
		return getAutoView().addObject("bpmTaskChange", bpmTaskChange).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【流程任务变更】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String taskId=RequestUtil.getString(request, "taskId");
		BpmTaskChangePo bpmTaskChange=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChange=bpmTaskChangeRepository.loadCascade(id);
			BpmTaskChangeBuilder.build(bpmTaskChange);
		}else if(StringUtil.isNotEmpty(taskId)){
			BpmTaskPo bpmTask = bpmTaskRepository.get(taskId);
			bpmTaskChange = BpmTaskChangeBuilder.build(bpmTask, BpmTaskChangePo.CHANGE_SHIFT, BpmTaskChangePo.COMMENT_SHIFT_DEF);
		}
		return getAutoView().addObject("bpmTaskChange", bpmTaskChange).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程任务变更】明细页面
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
		BpmTaskChangePo bpmTaskChange=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChange=bpmTaskChangeRepository.loadCascade(id);
			BpmTaskChangeBuilder.build(bpmTaskChange);
		}
		return getAutoView().addObject("bpmTaskChange", bpmTaskChange).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程任务变更】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTaskChange
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmTaskChangePo bpmTaskChangePo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmTaskChange bpmTaskChange =bpmTaskChangeRepository.newInstance(bpmTaskChangePo);
			bpmTaskChange.shift(ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程任务变更成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程任务变更操作失败,"+e.getMessage());
			logger.error("对流程任务变更操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmTaskChangePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<BpmTaskChangeAssignPo> bpmTaskChangeAssignPoList = getBpmTaskChangeAssignPoList(jsonObj);
		BpmTaskChangePo bpmTaskChangePo = getBpmTaskChangePo(jsonObj);
		bpmTaskChangePo.setBpmTaskChangeAssignPoList(bpmTaskChangeAssignPoList);

		return bpmTaskChangePo;
	}
	
	/** 
	 * 获取流程任务变更数据
	 *
	 * @param jsonObj
	 */
	private BpmTaskChangePo getBpmTaskChangePo(JSONObject jsonObj){
		if(StringUtil.isBlank(jsonObj.getString("completeTime"))){
			jsonObj.put("completeTime", null);
		}
		BpmTaskChangePo bpmTaskChangePo = (BpmTaskChangePo) JsonUtil.getDTO(jsonObj.toString(), BpmTaskChangePo.class);
		return bpmTaskChangePo;
	}
	
	/** 
	 * 获取任务变更候选人数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<BpmTaskChangeAssignPo> getBpmTaskChangeAssignPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("bpmTaskChangeAssignPoList")){
			return null;
		}
		
		List<BpmTaskChangeAssignPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("bpmTaskChangeAssignPoList").toString(), 
													BpmTaskChangeAssignPo.class);
		jsonObj.discard("bpmTaskChangeAssignPoList");
		return rs;
	}
	
	/**
	 *  批量删除【流程任务变更】记录
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
			BpmTaskChange bpmTaskChange =bpmTaskChangeRepository.newInstance();
			bpmTaskChange.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程任务变更成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程任务变更失败，" + e.getMessage());
			logger.error("删除流程任务变更失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 设置【流程任务变更】状态
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setStatus")
	public void setStatus(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String id = RequestUtil.getString(request, "id", "");
			String status = RequestUtil.getString(request, "status", BpmTaskChangePo.CHANGE_STATUS_CANCEL);
			if(StringUtil.isNotEmpty(id)){
				BpmTaskChangePo bpmTaskChangePo = bpmTaskChangeRepository.get(id);
				bpmTaskChangePo.setStatus(status);
				BpmTaskChange bpmTaskChange =bpmTaskChangeRepository.newInstance(bpmTaskChangePo);
				bpmTaskChange.unshift(ContextUtil.getCurrentUserId());
			}
			//构造领域对象和保存数据
			message=new ResultMessage(ResultMessage.SUCCESS, "取消流程转办代理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "取消流程转办代理操作失败,"+e.getMessage());
			logger.error("取消流程转办代理操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 是否允许【流程任务变更】
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("allowShfit")
	public void allowShfit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message = null;
		
		try {
			String taskId = RequestUtil.getString(request, "taskId", "");
			BpmTaskPo taskPo = bpmTaskRepository.get(taskId);
			if(BeanUtils.isNotEmpty(taskPo)){
				// 流程配置是否允许转办
				IBpmDefineReader reader = AppUtil.getBean(IBpmDefineReader.class);
				IBpmProcDefine<IBpmProcExtendDefine> procDefine = reader.getBpmProcDefine(taskPo.getProcDefId());
				BpmDefineAttributes attributes = procDefine.getBpmProcExtendDefine().getExtendAttributes();
				boolean allow = attributes.isAllowTransTo();
				
				if(allow){
					// 是否存在运行中的任务变更记录
					List<BpmTaskChangePo> chgList = bpmTaskChangeRepository.findByTask(taskId, BpmTaskChangePo.CHANGE_STATUS_RUNNING);
					if(BeanUtils.isEmpty(chgList)){
						message = new ResultMessage(ResultMessage.SUCCESS, "允许转办");
						message.addVariable("hiddenDelegate", false);
					}
				}else{
					message = new ResultMessage(ResultMessage.SUCCESS, "不允许转办");
					message.addVariable("hiddenDelegate", true);
				}
			}
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.SUCCESS, "不允许转办");
			message.addVariable("hiddenDelegate", true);
		}
		
		writeResultMessage(response.getWriter(), message);
	}
}
