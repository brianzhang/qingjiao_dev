

package com.lc.ibps.platform.bpmn.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.domain.BpmTaskReminder;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskReminderPo;
import com.lc.ibps.bpmn.repository.BpmTaskReminderRepository;
import com.lc.ibps.components.jms.handler.IJmsHandler;
import com.lc.ibps.components.jms.model.JmsVo;
import com.lc.ibps.components.jms.util.MessageUtil;

import net.sf.json.JSONObject;


/**
 * 任务催办设置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-22 11:46:22
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTaskReminder/")
public class BpmTaskReminderController extends GenericController{
	@Resource
	private BpmTaskReminderRepository bpmTaskReminderRepository;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	
	/**
	 * 【任务催办设置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String procDefId = RequestUtil.getString(request, "procDefId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		List<BpmTaskReminderPo> list = bpmTaskReminderRepository.findByDefIdAndNodeId(procDefId, nodeId);
		
		return new PageJson(list);
	}
	
	/**
	 * 编辑【任务催办设置】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String procDefId = RequestUtil.getString(request, "procDefId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		List<IBpmNodeDefine> bpmNodeDefs = bpmDefineReader.findNode(procDefId); // 获取流程定义全部节点信息
		bpmNodeDefs = bpmTaskReminderRepository.wrapNodeForCurFirst(bpmNodeDefs, nodeId); // 返回经过包装的节点集
		List<IJmsHandler<JmsVo>> handlerList= MessageUtil.getHanlerList(); // 消息定义类型，有多少种消息
		
		// List<BpmFormField> flowVars = null; // 表单变量参数
		return getAutoView().addObject("bpmNodeDefs", bpmNodeDefs)
				.addObject("procDefId", procDefId)
				.addObject("nodeId", nodeId)
				.addObject("handlerList", handlerList);
	}
	
	/** 
	 * 保存【任务催办设置】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTaskReminder
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmTaskReminderPo bpmTaskReminderPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmTaskReminder bpmTaskReminder =bpmTaskReminderRepository.newInstance(bpmTaskReminderPo);
			bpmTaskReminder.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存任务催办设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对任务催办设置操作失败，"+e.getMessage());
			logger.error("对任务催办设置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmTaskReminderPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmTaskReminderPo bpmTaskReminderPo = getBpmTaskReminderPo(jsonObj);

		return bpmTaskReminderPo;
	}
	
	/** 
	 * 获取任务催办设置数据
	 *
	 * @param jsonObj
	 */
	private BpmTaskReminderPo getBpmTaskReminderPo(JSONObject jsonObj){
		BpmTaskReminderPo bpmTaskReminderPo = (BpmTaskReminderPo) JsonUtil.getDTO(jsonObj.toString(), BpmTaskReminderPo.class);
		return bpmTaskReminderPo;
	}
	
	
	/**
	 *  批量删除【任务催办设置】记录
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
			BpmTaskReminder bpmTaskReminder =bpmTaskReminderRepository.newInstance();
			bpmTaskReminder.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除任务催办设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除任务催办设置失败，" + e.getMessage());
			logger.error("删除任务催办设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
