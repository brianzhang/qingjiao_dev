package com.lc.ibps.platform.form.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.form.form.domain.FormRights;
import com.lc.ibps.form.form.persistence.entity.FormRightsPo;
import com.lc.ibps.form.form.repository.FormRightsRepository;

import net.sf.json.JSONObject;

/**
 * 表单权限 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-11-03 15:36:11
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/formRights/")
public class FormRightsController extends GenericController {
	@Resource
	private FormRightsRepository formRightsRepository;

	/**
	 * 初始化表单权限设置
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("resetRights")
	public void initRights(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage resultMessage = null;
		try {
			FormRightsPo po = getRequestPo(request);
			FormRights formRights = formRightsRepository.newInstance(po);
			formRights.resetRights();
			resultMessage = new ResultMessage(ResultMessage.SUCCESS, "重置表单权限设置成功!");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			resultMessage = new ResultMessage(ResultMessage.FAIL, "重置表单权限设置失败:");
		}
		writeResultMessage(response.getWriter(), resultMessage);
	}

	/**
	 * 转换页面参数
	 *
	 * @param request
	 * @return
	 */
	private FormRightsPo getRequestPo(HttpServletRequest request) {
		String formKey = RequestUtil.getString(request, "formKey");
		String flowKey = RequestUtil.getString(request, "flowKey", null);
		String nodeId = RequestUtil.getString(request, "nodeId", null);
		String parentFlowKey = RequestUtil.getString(request, "parentFlowKey", null);
		String rightsType = RequestUtil.getString(request, "rightsScope");
		FormRightsPo po = new FormRightsPo();
		po.setFormKey(formKey);
		po.setFlowKey(flowKey);
		po.setNodeId(nodeId);
		po.setParentFlowKey(parentFlowKey);
		po.setRightsType(rightsType);
		logger.info(po.toString());
		return po;
	}

	/**
	 * 根据页面参数获取表单权限信息。
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("getPermission")
	public Map<String, List<JSONObject>> getPermissionByFormKey(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		FormRightsPo po = getRequestPo(request);
		Map<String, List<JSONObject>> map = formRightsRepository.getPermission(po);
		return map;
	}

	/**
	 * 保存表单权限。
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("savePermission")
	public void savePermission(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String permission = request.getParameter("permission");
		FormRightsPo po = getRequestPo(request);
		ResultMessage resultMessage = null;
		try {
			FormRights formRights = formRightsRepository.newInstance(po);
			formRights.saveRights(permission);

			resultMessage = new ResultMessage(ResultMessage.SUCCESS, "表单权限保存成功!");
		} catch (Exception ex) {
			ex.printStackTrace();
			resultMessage = new ResultMessage(ResultMessage.FAIL, ex.getMessage());
		}
		writeResultMessage(response.getWriter(), resultMessage);
	}
}
