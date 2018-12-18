package com.lc.ibps.platform.form.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.form.form.domain.FormTemplate;
import com.lc.ibps.form.form.persistence.entity.FormTemplatePo;
import com.lc.ibps.form.form.repository.FormTemplateRepository;
import com.lc.ibps.platform.form.helper.FormTemplateBuilder;

import net.sf.json.JSONObject;

/**
 * 表单模版 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-06 15:13:26
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/formTemplate/")
public class FormTemplateController extends GenericController {
	@Resource
	private FormTemplateRepository formTemplateRepository;

	/**
	 * 【表单模版】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<FormTemplatePo> formTemplateList = (PageList<FormTemplatePo>) formTemplateRepository
				.query(queryFilter);
		return new PageJson(formTemplateList);
	}

	/**
	 * 编辑【表单模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		FormTemplatePo formTemplate = null;
		String data = null;
		if (StringUtil.isNotEmpty(id)) {
			formTemplate = formTemplateRepository.get(id);
			JSONObject jsonObject = JSONObject.fromObject(formTemplate.getContent());
			jsonObject.element("id", id);
			data = jsonObject.toString();
		}

		return getAutoView().addObject("id", id).addObject("data", data);
	}

	/**
	 * 【表单模版】明细页面
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
		FormTemplatePo formTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			formTemplate = formTemplateRepository.get(id);
		}
		return getAutoView().addObject("formTemplate", formTemplate).addObject("returnUrl", preUrl);
	}

	/**
	 * 预览界面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String data = "";
		FormTemplatePo formTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			formTemplate = formTemplateRepository.get(id);
			id = formTemplate.getId();
			data = formTemplate.getContent();
		}

		return getAutoView().addObject("id", id).addObject("data", data);
	}

	/**
	 * 保存【表单模版】信息
	 *
	 * @param request
	 * @param response
	 * @param formTemplate
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		try {
			FormTemplatePo formTemplatePo = FormTemplateBuilder.buildFormTemplate(data);
			// 构造领域对象和保存数据
			FormTemplate formTemplate = formTemplateRepository.newInstance(formTemplatePo);
			formTemplate.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存表单模版成功");
			message.addVariable("id", formTemplate.getId());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对表单模版操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【表单模版】记录
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
			// 构造领域对象和保存数据
			FormTemplate formTemplate = formTemplateRepository.newInstance();
			formTemplate.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除表单模版成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除表单模版失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
