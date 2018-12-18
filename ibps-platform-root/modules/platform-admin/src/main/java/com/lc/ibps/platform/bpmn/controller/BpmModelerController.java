package com.lc.ibps.platform.bpmn.controller;

import java.io.File;
import java.io.UnsupportedEncodingException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.ActivitiException;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;

import net.sf.json.JSONObject;

/**
 * 流程定义设计器 控制器类。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年11月30日-下午4:03:28
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmModeler/")
public class BpmModelerController extends GenericController {

	@Resource
	private BpmDefineService bpmDefineService;

	@Resource
	private BpmDefineRepository bpmDefineRepository;

	/**
	 * 新建一个模型，返回新建模型的id
	 * 
	 * @return
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId", "0");
		String defKey = RequestUtil.getString(request, "defKey", "0");
		String modelerJson = RequestUtil.getString(request, "modelerJson", "");
		String fileDir = RequestUtil.getString(request, "fileDir", "");
		return getAutoView().addObject("defId", defId).addObject("defKey", defKey).addObject("modelerJson", modelerJson).addObject("impBpmn",
				fileDir);
	}

	/**
	 * 新建一个模型，返回新建模型的id
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("editor")
	public ModelAndView editorModeler(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId", "0");
		BpmDefinePo bpmDef = bpmDefineRepository.getByDefId(defId);
		return getAutoView().addObject("defId", defId).addObject("status", bpmDef != null ? bpmDef.getStatus() : "").addObject("defKey", bpmDef != null ? bpmDef.getDefKey() : "");
	}

	/**
	 * 读取bpmn模型内容
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("getModeler")
	@ResponseBody
	public String getModeler(HttpServletRequest request, HttpServletResponse response) {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode modelNode = null;
		String defId = RequestUtil.getString(request, "defId");
		String impBpmn = RequestUtil.getString(request, "impBpmn");
		String defXml = "";
		BpmDefinePo bpmDef = bpmDefineRepository.getByDefId(defId, true);
		if (bpmDef != null) {
			// 读取模型
			// try {
			// modelNode = objectMapper.createObjectNode();
			// modelNode.put("modelId", defId);
			// modelNode.put("name", bpmDef.getName());
			// modelNode.put("defKey", bpmDef.getDefKey());
			// ObjectNode editorJsonNode = objectMapper.createObjectNode();
			// editorJsonNode.put("id", "canvas");
			// editorJsonNode.put("resourceId", "canvas");
			// String defXml =
			// BpmModelerConverter.convertSlashDqm(bpmDef.getDefXml());
			// ObjectNode stencilSetNode =
			// BpmModelerConverter.convertToJson(defXml);
			// editorJsonNode.putAll(stencilSetNode);
			// modelNode.put("model", editorJsonNode);
			// }catch (Exception e) {
			// throw new ActivitiException("Error creating model JSON", e);
			// }
			defXml = bpmDef.getDefXml().replace("xns=\"", "xmlns=\"").replaceAll("&#10;", "").replaceAll("&#13;", "");
		} else if (StringUtil.isNotEmpty(impBpmn)) {
			// 导入设计模型
			try {
				modelNode = objectMapper.createObjectNode();
				modelNode.put("modelId", "0");
				ObjectNode editorJsonNode = objectMapper.createObjectNode();
				editorJsonNode.put("id", "canvas");
				editorJsonNode.put("resourceId", "canvas");
				String fileDirectory = File.separator + "attachFiles" + File.separator;
				String realFilePath = request.getSession().getServletContext().getRealPath(fileDirectory);
				realFilePath = realFilePath + File.separator + impBpmn;
				// String xmlStr = FileUtil.readFile(realFilePath);
				/*
				 * defXml = BpmModelerConverter.convertSlashDqm(xmlStr);
				 * ObjectNode stencilSetNode =
				 * BpmModelerConverter.convertToJson(defXml);
				 * FileUtil.deleteDir(new File(realFilePath));
				 * editorJsonNode.putAll(stencilSetNode); modelNode.put("model",
				 * editorJsonNode);
				 */
			} catch (Exception e) {
				logger.error("模型获取失败，"+e.getMessage(), e);
				throw new ActivitiException("Error creating model JSON", e);
			}
		}
		return defXml;
	}

	/**
	 * 保存或发布流程
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveModeler")
	@ResponseBody
	public String saveModeler(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject rs = new JSONObject();
		Boolean isDeploy = RequestUtil.getBoolean(request, "isDeploy", false); // 发布标志
		Boolean newDeploy = RequestUtil.getBoolean(request, "newDeploy", false); // 发布标志
		BpmDefinePo bpmDefinition = this.getFromRequest(request);
		try {
			rs.put("result", ResultMessage.SUCCESS);
			if (isDeploy) {
				String status = bpmDefinition.getStatus();
				if (!newDeploy && StringUtil.isNotEmpty(status) && !status.equals(BpmDefinePo.STATUS.DRAFT)) {
					bpmDefineService.updateBpmDefinition(bpmDefinition);
					rs.put("message", "保存现有版本成功");
				} else {
					boolean sucDeploy = bpmDefineService.deploy(bpmDefinition);
					if (sucDeploy) {
						if (newDeploy) {
							rs.put("message", "发布新版本成功");
						} else {
							rs.put("message", "发布成功");
						}
						rs.put("defId", bpmDefinition.getDefId());
					} else {
						rs.put("result", ResultMessage.ERROR);
						rs.put("message", "流程定义key已存在");
					}
				}
			} else {
				bpmDefineService.saveDraft(bpmDefinition);
				rs.put("defId", bpmDefinition.getDefId());
				rs.put("message", "保存草稿成功");
			}
		} catch (Exception e) {
			rs.put("result", ResultMessage.ERROR);
			rs.put("message", "保存失败");
			rs.put("cause", e);
			logger.error("保存失败，"+e.getMessage(), e);
		}
		return rs.toString();
	}

	/**
	 * 流程建模时数据构建流程定义对象
	 * 
	 * @param request
	 * @return
	 */
	private BpmDefinePo getFromRequest(HttpServletRequest request) throws Exception {
		// 分类ID
		String typeId = RequestUtil.getString(request, "typeId", "0"); // 流程分类
		// 流程定义ID
		String defId = RequestUtil.getString(request, "defId"); // 定义id
		// 流程定义XML
		String defXml = RequestUtil.getString(request, "defXml", ""); // 定义xml
		String defKey = "", subject = "";
		if (StringUtil.isNotEmpty(defXml)) {
			Document doc = DocumentHelper.parseText(defXml);
			Element process = doc.getRootElement().element("process");
			defKey = process.attributeValue("id");
			if (BeanUtils.isNotEmpty(process.attribute("name"))) {
				subject = process.attributeValue("name");
			} else {
				subject = defKey;
				process.addAttribute("name", subject);
			}
		}

		BpmDefinePo bpmDefinition = null;
		if (StringUtil.isNotEmpty(defId)) {
			bpmDefinition = bpmDefineRepository.getByDefId(defId);
		}
		if (bpmDefinition == null) {
			bpmDefinition = new BpmDefinePo();
			bpmDefinition.setDefId(UniqueIdUtil.getId());
			if (StringUtil.isNotEmpty(defKey)) {
				bpmDefinition.setDefKey(defKey);
			}
		}
		bpmDefinition.setName(subject);
		bpmDefinition.setDefXml(defXml.replaceAll("&#10;", "").replaceAll("&#13;", ""));
		// 设置属性值
		if (StringUtil.isNotEmpty(typeId)) {
			bpmDefinition.setTypeId(typeId);
		}
		bpmDefinition.setDesigner("web设计器");
		return bpmDefinition;
	}

	/**
	 * 发布流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("deploy")
	public void deploy(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String defId = RequestUtil.getString(request, "defId");
		BpmDefinePo bpmDefinition = bpmDefineRepository.getByDefId(defId);
		try {
			bpmDefineService.deploy(bpmDefinition);
			resultMsg = "成功发布流程定义！";
		} catch (Exception e) {
			logger.error("发布失败，"+e.getMessage(), e);
			writeResultMessage(response.getWriter(), " 发布失败：" + e.getMessage(), ResultMessage.FAIL);
		}
		writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
	}
}