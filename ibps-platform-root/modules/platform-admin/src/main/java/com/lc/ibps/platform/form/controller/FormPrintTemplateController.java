package com.lc.ibps.platform.form.controller;

import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.bo.service.IBoInstanceService;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.service.DiagramService;
import com.lc.ibps.form.form.domain.FormPrintRange;
import com.lc.ibps.form.form.domain.FormPrintTemplate;
import com.lc.ibps.form.form.helper.FormDefDataBuilder;
import com.lc.ibps.form.form.helper.FormPrintTemplateBuilder;
import com.lc.ibps.form.form.pdf.util.PdfExporter;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.persistence.entity.FormPrintRangePo;
import com.lc.ibps.form.form.persistence.entity.FormPrintTemplatePo;
import com.lc.ibps.form.form.repository.FormDefRepository;
import com.lc.ibps.form.form.repository.FormPrintRangeRepository;
import com.lc.ibps.form.form.repository.FormPrintTemplateRepository;

import net.sf.json.JSONObject;

/**
 * 表单打印模版 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：zhuangxh@bpmhome.cn
 * 创建时间：2017-06-28 18:50:28
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/formPrintTemplate/")
public class FormPrintTemplateController extends GenericController {
	@Resource
	private FormPrintTemplateRepository formPrintTemplateRepository;
	@Resource
	private FormPrintRangeRepository formPrintRangeRepository;
	@Resource
	private FormDefRepository formDefRepository;
	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private IBoInstanceService boInstanceService;

	@Resource
	private DiagramService diagramService;

	/**
	 * 【表单打印模版】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<FormPrintTemplatePo> formPrintTemplateList = (PageList<FormPrintTemplatePo>) formPrintTemplateRepository
				.query(queryFilter);
		return new PageJson(formPrintTemplateList);
	}

	/**
	 * 编辑【表单打印模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String formKey = "";
		if (StringUtil.isNotEmpty(id)) {
			FormPrintTemplatePo formPrintTemplate = formPrintTemplateRepository.get(id);
			formKey = formPrintTemplate.getFormKey();
		}
		return getAutoView().addObject("id", id).addObject("formKey", formKey);
	}

	/**
	 * 【表单打印模版】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public @ResponseBody Map<String, Object> get(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String id = RequestUtil.getString(request, "id");
		FormPrintTemplatePo formPrintTemplate = null;
		Map<String, Object> rtnMap = new HashMap<String, Object>();
		rtnMap.put("result", true);
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			if (StringUtil.isNotEmpty(id)) {
				formPrintTemplate = formPrintTemplateRepository.get(id);
				map.put("name", formPrintTemplate.getName());
				map.put("content",
						BeanUtils.isNotEmpty(formPrintTemplate.getContent())
								? JSONObject.fromObject(formPrintTemplate.getContent()).toString()
								: FormPrintTemplateBuilder.getDefaultTemplateContent().toString());
			} else {
				map.put("name", "未命名模版");
				map.put("content", FormPrintTemplateBuilder.getDefaultTemplateContent().toString());
			}

			rtnMap.put("template", map);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			rtnMap.put("result", false);
			rtnMap.put("message", e.getMessage());
		}
		return rtnMap;
	}

	/**
	 * 保存【表单打印模版】信息
	 *
	 * @param request
	 * @param response
	 * @param formPrintTemplate
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String id = RequestUtil.getString(request, "id");
		String formKey = RequestUtil.getString(request, "formKey");
		String data = RequestUtil.getString(request, "data");
		try {
			FormPrintTemplatePo po = formPrintTemplateRepository.get(id);
			if (BeanUtils.isEmpty(po)) {
				po = new FormPrintTemplatePo();
				po.setFormKey(formKey);
			}
			JSONObject jsonObject = JSONObject.fromObject(data);
			po.setContent(JsonUtil.getString(jsonObject, "content"));
			po.setName(JsonUtil.getString(jsonObject, "name", "未命名模版"));

			// 构造领域对象和保存数据
			FormPrintTemplate formPrintTemplate = formPrintTemplateRepository.newInstance(po);
			formPrintTemplate.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存表单打印模版成功");
			if (BeanUtils.isEmpty(id))
				message.addVariable("id", formPrintTemplate.getId());
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对表单打印模版操作失败，" + e.getMessage());
			logger.error("对表单打印模版操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【表单打印模版】记录
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
			FormPrintTemplate formPrintTemplate = formPrintTemplateRepository.newInstance();
			formPrintTemplate.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除表单打印模版成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除表单打印模版失败，" + e.getMessage());
			logger.error("删除表单打印模版失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 预览【表单打印模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");

		return getAutoView().addObject("id", id);
	}

	/**
	 * 预览【表单打印模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("print")
	public ModelAndView print(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String pk = RequestUtil.getString(request, "pk");
		return getAutoView().addObject("id", id).addObject("pk", pk);
	}

	/**
	 * pdf 打印输入
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("pdf")
	public void pdf(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String pk = RequestUtil.getString(request, "pk");
		String formData = RequestUtil.getString(request, "formData");
		if(StringUtil.isNotEmpty(formData)){
			formData = URLDecoder.decode(formData,"UTF-8");
		}
	//	String bpmDefId =  RequestUtil.getString(request, "bpmDefId");
		FormPrintTemplatePo formPrintTemplatePo = formPrintTemplateRepository.get(id);
		if (BeanUtils.isEmpty(formPrintTemplatePo)){
			logger.warn("打印模版为空");
			return;
		}
		
		String formKey = formPrintTemplatePo.getFormKey();
		Map<String, Object> data = new HashMap<String, Object>();
		if (BeanUtils.isNotEmpty(formKey)) {
			data = getData(formKey, pk, formData);
		}
		
	//	this.handFlowData(data,formPrintTemplatePo.getContent(),bpmDefId);
		//流程图、流程历史和流程意见
		
		OutputStream os = response.getOutputStream();
		response.setContentType("application/pdf");
		PdfExporter pdfExporter = null;
		try {
			os = response.getOutputStream();
			pdfExporter = formPrintTemplateRepository.preview(formPrintTemplatePo, data, os);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (pdfExporter != null)
				pdfExporter.closeDocument();
			if (os != null) {
				os.flush();
				os.close();
				os = null;
				response.flushBuffer();
			}
		}
	}
/*
	private void handFlowData(Map<String, Object> data, String content, String bpmDefId) {
		//判断是有审批历史
		 List<FieldTypeFlow> list =	isFlowInfo(content);
		if(list.contains(FieldTypeFlow.APPROVAL_HISTORY)){
			InputStream is = diagramService.genImage(bpmDefId, null, null);
			data.put("#"+FieldTypeFlow.APPROVAL_HISTORY.key(), FileUtil.readByte(is));
		}
	}

	@SuppressWarnings("unchecked")
	private List<FieldTypeFlow> isFlowInfo(String content) {
		List<FieldTypeFlow> rtn  = new ArrayList<FieldTypeFlow>();
		if (StringUtil.isEmpty(content))
			return rtn;
		JSONObject	jsonObject = JSONObject.fromObject(content);
		JSONObject cells =	JsonUtil.getJSONobject(jsonObject, "cells");
		if(JsonUtil.isEmpty(cells))
			return rtn;
		Iterator<String> iterator = cells.keys();

		while (iterator.hasNext()) {
			String key = (String) iterator.next();
			JSONObject value = (JSONObject) cells.get(key);
			boolean hasField = JsonUtil.getBoolean(value, "hasField");
			if(!hasField){
				continue;
			}
			JSONArray contentAry  =JsonUtil.getJSONArray(value, "content");
			Object contentObject = contentAry.get(0);
			if (contentObject instanceof JSONObject) {
				JSONObject contentJson = (JSONObject) contentObject;
				JSONArray fields = JsonUtil.getJSONArray(contentJson, "fields");
				String field = fields.get(0).toString();
					FieldTypeFlow fieldTypeFlow = FieldTypeFlow.fromKey(field);
					if(BeanUtils.isNotEmpty(fieldTypeFlow)){
						rtn.add(fieldTypeFlow);
					}
			}
		}
		return rtn;
	}*/

	/**
	 * 获取表单数据
	 *
	 * @param formKey
	 * @param pk
	 * @param formData2 
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> getData(String formKey, String pk, String formData) throws Exception {
		FormDefPo formDefPo = formDefRepository.getMainByFormKey(formKey, true);

		if (BeanUtils.isEmpty(formDefPo) && BeanUtils.isEmpty(formDefPo.getFormBo()))
			return new HashMap<String, Object>();
		BoDefPo boDefPo = boDefRepository.get(formDefPo.getFormBo().getBoId());
		IDataObject dataObject = null;
		String code = boDefPo.getCode();
		String saveType = DataSaveMode.TABLE;
		Integer version = boDefPo.getVersion();
		if (BeanUtils.isNotEmpty(pk)) {
			dataObject = boInstanceService.getDataObject(saveType, pk, code, version);
			// 将前台的BO数据与原有BO数据 融合（前台的BO数据可能只有一部分数据）
			if (BeanUtils.isNotEmpty(formData)) {
				if (BeanUtils.isEmpty(dataObject)) {
					dataObject = boInstanceService.createDataObject(code, version, formData);
				} else {
					boInstanceService.mergerDataObject(dataObject, formData);
				}
			}
			formData = BeanUtils.isNotEmpty(dataObject) ? dataObject.getData() : null;
		}

		return FormDefDataBuilder.getFormData(formData, formDefPo);
	}

	/**
	 * 【表单打印模版】范围
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("range")
	public ModelAndView range(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		List<FormPrintRangePo> list = formPrintRangeRepository.findByTemplateId(id);
		StringBuffer sb = new StringBuffer();
		String appendToken = ",";
		String range = "";
		if (BeanUtils.isNotEmpty(list)) {
			for (FormPrintRangePo formPrintRangePo : list) {
				sb.append(formPrintRangePo.getRange()).append(appendToken);
			}
			range = sb.substring(0, sb.length() - appendToken.length());
		}

		return getAutoView().addObject("range", range).addObject("templateId", id);
	}

	/**
	 * 保存【表单模版使用范围】信息
	 *
	 * @param request
	 * @param response
	 * @param formTemplate
	 * @throws Exception
	 */
	@RequestMapping("saveRange")
	public void saveRange(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String templateId = RequestUtil.getString(request, "templateId");
		String range = RequestUtil.getString(request, "range");
		try {
			// 构造领域对象和保存数据
			FormPrintRange formPrintRange = formPrintRangeRepository.newInstance();
			formPrintRange.save(templateId, range);
			message = new ResultMessage(ResultMessage.SUCCESS, "保存模版使用范围成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对表单模版使用范围操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

}
