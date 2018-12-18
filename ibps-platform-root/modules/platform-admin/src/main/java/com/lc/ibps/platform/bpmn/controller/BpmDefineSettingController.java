package com.lc.ibps.platform.bpmn.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.constant.NodeType;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.def.BpmDefLayout;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.node.Button;
import com.lc.ibps.bpmn.api.service.DiagramService;
import com.lc.ibps.bpmn.domain.BpmDefine;
import com.lc.ibps.bpmn.helper.BpmButtonConfig;
import com.lc.ibps.bpmn.helper.BpmDefineDataBuilder;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;
import com.lc.ibps.components.jms.handler.IJmsHandler;
import com.lc.ibps.components.jms.model.JmsVo;
import com.lc.ibps.components.jms.util.MessageUtil;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.repository.FormDefRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 流程定义配置。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年3月21日-下午7:52:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmDefine/")
public class BpmDefineSettingController extends GenericController {
	@Resource
	private BpmDefineRepository bpmDefineRepository;
	@Resource
	private DiagramService diagramService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private FormDefRepository formDefRepository;

	/**
	 * 
	 * 流程定义配置（设置流程图、全局、节点）
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("setting")
	public ModelAndView setting(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		String defKey = RequestUtil.getString(request, "defKey");
		BpmDefinePo po = null;
		if (StringUtil.isNotEmpty(defId)) {
			po = bpmDefineRepository.getByDefId(defId);
		} else if (StringUtil.isNotEmpty(defKey)) {
			po = bpmDefineRepository.getByDefKey(defKey);
			defId = po.getDefId();
		}

		IBpmProcDefine<IBpmProcExtendDefine> procDef = bpmDefineReader.getBpmProcDefine(defId);
		String data = BpmDefineDataBuilder.build(procDef);
		// 流程图layout
		BpmDefLayout bpmDefLayout = diagramService.getLayoutByDefId(defId);

		JSONArray messageTypes = buildMessageTypeList();
		String subProcess = NodeType.SUBPROCESS.getKey();
		return this.getAutoView().addObject("defId", defId).addObject("bpmDefinition", po)
				.addObject("bpmDefLayout", bpmDefLayout).addObject("messageTypes", messageTypes.toString())
				.addObject("data", data).addObject("subProcess", subProcess);
	}
	
	@RequestMapping("buildFormVars")
	@ResponseBody
	public String buildFormVars(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		IBpmProcDefine<IBpmProcExtendDefine> procDef = bpmDefineReader.getBpmProcDefine(defId);
		String formVars = BpmDefineDataBuilder.buildFormVars(procDef);
		
		return formVars;
	}

	/**
	 * 
	 * 消息类型
	 *
	 * @return
	 */
	private JSONArray buildMessageTypeList() {
		List<IJmsHandler<JmsVo>> messageTypeList = MessageUtil.getHanlerList();
		JSONArray jsonArray = new JSONArray();
		for (IJmsHandler<JmsVo> jmsHandler : messageTypeList) {
			JSONObject json = new JSONObject();
			json.accumulate("type", jmsHandler.getType()).accumulate("title", jmsHandler.getTitle());
			jsonArray.add(json);
		}
		return jsonArray;
	}

	/**
	 * 
	 * 保存流程定义设置
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("saveSetting")
	public void saveSetting(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String defId = RequestUtil.getString(request, "defId");
		String data = RequestUtil.getString(request, "data");
		try {
			BpmDefine bpmDefine = bpmDefineRepository.newInstance();
			bpmDefine.saveSetting(defId,data);
			message = new ResultMessage(ResultMessage.SUCCESS, "保存流程定义成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对流程定义操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	


	/**
	 * 获取与BO关联的所有表单
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getFormJsonByBo")
	public @ResponseBody PageJson getFormJsonByBo(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String boCode = RequestUtil.getString(request, "boCode");
		List<String> codes = new ArrayList<String>();
		codes.add(boCode);
		List<FormDefPo> list = formDefRepository.getByBoCodes(codes);
		return new PageJson(list, list.size(), list.size());
	}

	/**
	 * 节点下的按钮编辑
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("editButton")
	public ModelAndView editButton(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String nodeType = RequestUtil.getString(request, "nodeType");
		List<Button> types = BpmButtonConfig.getButtons(NodeType.get(nodeType));
		return this.getAutoView().addObject("types", types);
	}

	/**
	 * 节点下的按钮初始化
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("initButton")
	@ResponseBody
	public List<Button> initButton(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String nodeType = RequestUtil.getString(request, "nodeType");

		return BpmButtonConfig.getButtons(NodeType.get(nodeType), true);
	}

	/**
	 * 办结抄送
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("endNotify")
	public ModelAndView endNotify(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<IJmsHandler<JmsVo>> handlerList = MessageUtil.getHanlerList();
		return this.getAutoView().addObject("handlerList", handlerList);
	}
	
	/**
	 * 办结抄送
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("copyToNotify")
	public ModelAndView copyToNotify(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<IJmsHandler<JmsVo>> handlerList = MessageUtil.getHanlerList();
		return this.getAutoView().addObject("handlerList", handlerList);
	}

}
