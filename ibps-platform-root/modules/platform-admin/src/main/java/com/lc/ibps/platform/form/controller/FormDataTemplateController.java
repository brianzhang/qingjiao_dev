package com.lc.ibps.platform.form.controller;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.page.Page;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.bo.constants.BoType;
import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.bo.service.IBoAttrColumnService;
import com.lc.ibps.api.bo.service.IBoInstanceService;
import com.lc.ibps.api.form.constants.FormMode;
import com.lc.ibps.api.form.constants.RightsScope;
import com.lc.ibps.api.form.service.IFormRightsService;
import com.lc.ibps.api.form.service.IFormbuilderStrategy;
import com.lc.ibps.api.form.vo.FormPermissionVo;
import com.lc.ibps.base.bo.constants.BoTableConstants;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.bo.exception.BoBaseException;
import com.lc.ibps.base.bo.exception.DataObjectException;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.datasource.config.IDataSource;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmFormService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.components.codegen.service.ITableModelService;
import com.lc.ibps.components.poi.entity.vo.PoiViewConstants;
import com.lc.ibps.components.poi.excel.ExcelImportUtil;
import com.lc.ibps.components.poi.excel.entity.ExportParams;
import com.lc.ibps.components.poi.excel.entity.ImportParams;
import com.lc.ibps.components.poi.excel.entity.params.ExcelExportEntity;
import com.lc.ibps.form.form.constants.DataTemplatelConstants;
import com.lc.ibps.form.form.domain.FormDataTemplate;
import com.lc.ibps.form.form.helper.FormDefDataBuilder;
import com.lc.ibps.form.form.persistence.entity.FormBoPo;
import com.lc.ibps.form.form.persistence.entity.FormDataTemplatePo;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.repository.FormDataTemplateRepository;
import com.lc.ibps.form.form.repository.FormDefRepository;
import com.lc.ibps.form.form.strategy.form.FormbuilderStrategyFactory;
import com.lc.ibps.platform.form.helper.FormDataTemplateBuilder;
import com.lc.ibps.platform.form.vo.PkVo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 业务数据模版 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-07 15:42:57
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/formDataTemplate/")
public class FormDataTemplateController extends GenericController {
	@Resource
	private FormDataTemplateRepository formDataTemplateRepository;
	@Resource
	private FormDefRepository formDefRepository;
	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private IFormRightsService formRightsService;
	@Resource
	private IBoInstanceService boInstanceService;
	@Resource
	private ITableModelService tableModelService;
	@Resource
	private IBoAttrColumnService boAttrColumnService;
	@Resource
	private IDataSource idataSource;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;
	@Resource
	private BpmFormService bpmFormService;

	/**
	 * 【业务数据模版】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<FormDataTemplatePo> formDataTemplateList = (PageList<FormDataTemplatePo>) formDataTemplateRepository
				.query(queryFilter);
		return new PageJson(formDataTemplateList);
	}

	/**
	 * 编辑【业务数据模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		FormDataTemplatePo formDataTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			formDataTemplate = formDataTemplateRepository.get(id);
		}
		return getAutoView().addObject("formDataTemplate", formDataTemplate).addObject("returnUrl", preUrl);
	}

	/**
	 * 编辑【业务数据模版】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("design")
	public ModelAndView design(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String formKey = RequestUtil.getString(request, "formKey", "");

		String data = "";
		if (StringUtil.isNotEmpty(id)) {
			FormDataTemplatePo po = formDataTemplateRepository.getById(id);
			data = FormDataTemplateBuilder.buildData(po, false);
			formKey = po.getFormKey();
		}
		PkVo pk = new PkVo();
		String formData = getFormData(formKey, pk);

		return getAutoView().addObject("id", id).addObject("data", data).addObject("formData", formData).addObject("pk",
				pk.getPk());
	}

	/**
	 * 获取表单数据
	 *
	 * @param formKey
	 * @param pkVo
	 * @return
	 */
	private String getFormData(String formKey, PkVo pkVo) {
		FormDefPo formDefPo = formDefRepository.getMainByFormKey(formKey);
		if (BeanUtils.isEmpty(formDefPo))
			return null;
		// FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
		FormBoPo formBo = formDefRepository.getFormBoByFormId(formDefPo.getId());
		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(formDefPo.getMode());
		if (BeanUtils.isNotEmpty(pkVo))
			pkVo.setPk(formbuilderStrategy.getPk(formBo.getBoCode(), formBo.getBoId()));
		return formbuilderStrategy.getData(formBo.getBoCode(), formDefPo.getId());
	}

	/**
	 * 【业务数据模版】明细页面
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
		FormDataTemplatePo formDataTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			formDataTemplate = formDataTemplateRepository.get(id);
		}
		return getAutoView().addObject("formDataTemplate", formDataTemplate).addObject("returnUrl", preUrl);
	}

	/**
	 * 导出表单
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportTemplate")
	public void exportTemplate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String realFilePath = null;
		String zipFilePath = null;
		try {
			String idsStr = RequestUtil.getString(request, "ids");
			if (BeanUtils.isEmpty(idsStr))
				return;
			String[] ids = idsStr.split(StringPool.COMMA);
			String rootRealPath = request.getSession().getServletContext().getRealPath(AppFileUtil.TEMP_PATH); // 操作的根目录
			String nowDate = DateFormatUtil.format(new Date(), "yyyyMMddHHmmss");
			String fileName = "formDataTemplate_" + nowDate;
			realFilePath = rootRealPath + File.separator + fileName; // 专属于在某个时刻导出操作文件目录，完成后删除

			Map<String, Boolean> map = this.getDefaultExportMap();

			String strXml = formDataTemplateRepository.exportTemplate(ids, map); // 输出xml

			FileUtil.writeFile(realFilePath + File.separator + fileName + ".xml", strXml);
			ZipUtil.zip(realFilePath, true); // 打包
			String zipFileName = fileName + ".zip";
			zipFilePath = rootRealPath + File.separator + zipFileName;
			RequestUtil.downLoadFile(request, response, zipFilePath, zipFileName);// 导出
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			ResultMessage message = new ResultMessage(ResultMessage.FAIL, "导出失败:" + e.getMessage());
			writeResultMessage(response.getWriter(), message);
		} finally {
			if (realFilePath != null) {
				File dir = new File(realFilePath);
				if (dir.exists()) {
					FileUtil.deleteDir(dir); // 删除操作文件目录
				}
			}
			if (zipFilePath != null) {
				File zip = new File(zipFilePath);
				if (zip.exists()) {
					FileUtil.deleteFile(zipFilePath); // 删除解压文件
				}
			}
		}
	}

	public Map<String, Boolean> getDefaultExportMap() {
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		map.put("formDataTemplate", true);
		return map;
	}

	/**
	 * 导入模版
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("importTemplate")
	public void importTemplate(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile fileLoad = request.getFile("file");
		ResultMessage message = null;
		String unZipFilePath = null;
		try {
			String rootRealPath = request.getSession().getServletContext().getRealPath(AppFileUtil.TEMP_PATH); // 操作的根目录
			File dir = new File(rootRealPath);
			if (!dir.exists() || (dir.exists() && dir.isFile())) {
				dir.mkdirs();
			}
			String name = fileLoad.getOriginalFilename();
			String fileDir = StringUtil.substringBeforeLast(name, ".");
			// 导入的文件名
			AppFileUtil.unZipFile(fileLoad, rootRealPath); // 解压文件
			unZipFilePath = rootRealPath + File.separator + fileDir; // 解压后文件的真正路径
			// 导入xml
			FormDataTemplate formDataTemplate = formDataTemplateRepository.newInstance();
			formDataTemplate.importTemplate(unZipFilePath);
			message = new ResultMessage(ResultMessage.SUCCESS, "导入成功!");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			if (e instanceof BoBaseException) {
				message = new ResultMessage(ResultMessage.WARN, "导入失败:" + e.getMessage());
			} else {
				message = new ResultMessage(ResultMessage.FAIL, "导入失败:", e.getMessage());
			}
		} finally {
			try {
				File dir = new File(unZipFilePath);
				if (dir.exists()) {
					FileUtil.deleteDir(dir); // 删除解压后的目录
				}
			} catch (Exception ignore) {
			}
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 保存【业务数据模版】信息
	 *
	 * @param request
	 * @param response
	 * @param formDataTemplate
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		try {
			FormDataTemplatePo formDataTemplatePo = FormDataTemplateBuilder.build(data);
			// 构造领域对象和保存数据
			FormDataTemplate formDataTemplate = formDataTemplateRepository.newInstance(formDataTemplatePo);
			formDataTemplate.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存业务数据模版成功");
			message.addVariable("id", formDataTemplate.getId());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对业务数据模版操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【业务数据模版】记录
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
			FormDataTemplate formDataTemplate = formDataTemplateRepository.newInstance();
			formDataTemplate.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除业务数据模版成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除业务数据模版失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 通过短地址过来的界面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("url")
	public ModelAndView url(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = this.preview(request, response);
		mv.setViewName("/platform/form/formDataTemplatePreview.jsp");
		return mv;
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
		String formData = "";
		PkVo pk = new PkVo();
		if (StringUtil.isNotEmpty(id)) {
			FormDataTemplatePo formDataTemplate = formDataTemplateRepository.getById(id);
			formData = getFormData(formDataTemplate.getFormKey(), pk);
			data = FormDataTemplateBuilder.buildData(formDataTemplate, true);
		}
		return getAutoView().addObject("data", data)
				.addObject("formData", StringUtil.isEmpty(formData) ? "{}" : formData).addObject("id", id)
				.addObject("pk", pk.getPk());
	}

	/**
	 * 上传excel文件
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("upload")
	@ResponseBody
	public List<List<String>> upload(MultipartHttpServletRequest request, HttpServletResponse response)
			throws Exception {
		InputStream is = null;
		List<List<String>> results = new ArrayList<List<String>>();
		try {
			MultipartFile file = request.getFile("file");
			is = file.getInputStream();
			ImportParams params = new ImportParams();
			params.setKeyIndexVerfiy(false);
			results = ExcelImportUtil.importExcel(is, List.class, params);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (is != null) {
				is.close();
			}
		}
		return results;
	}

	/**
	 * 保存上传数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveUpload")
	public void saveUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		String formKey = RequestUtil.getString(request, "formKey");
		try {
			FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);

			JSONArray jsonArray = JSONArray.fromObject(data);

			String saveMode = DataSaveMode.TABLE;

			BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
			int amount = 0;
			for (Object obj : jsonArray) {
				if (JsonUtil.isEmpty(obj))
					continue;
				IDataObject dataObject = boInstanceService.createDataObject(formBo.getBoCode(), boDefPo.getVersion(),
						obj.toString());

				dataObject.setCurUserId(ContextUtil.getCurrentUserId());
				// 保存数据
				boInstanceService.save(saveMode, dataObject);
				amount++;
			}

			message = new ResultMessage(ResultMessage.SUCCESS, "保存数据成功");
			message.addVariable("amount", amount);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "导入数据操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 导出数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("exportData")
	public String exportData(HttpServletRequest request, HttpServletResponse response, ModelMap modelMap)
			throws Exception {
		String action = RequestUtil.getString(request, "action");
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");

		// 页大小
		Integer pageSize = RequestUtil.getInt(request, "page", 0);
		Integer rows = RequestUtil.getInt(request, "rows", 0);

		DefaultPage page = null;
		if (!"exportAll".equalsIgnoreCase(action) && pageSize > 0 && rows > 0)
			page = new DefaultPage(pageSize, rows);

		QueryFilter queryFilter = this.getQuerFilter(request, page);

		JSONObject responseData = RequestUtil.getJSONObject(request, "response_data");
		JSONObject exportColumns = RequestUtil.getJSONObject(request, "export_columns");
		String formKey = responseData.getString("formKey");
		String label = responseData.getString("label");
		FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
		FormDefPo formDef = formDefRepository.getMainByFormKey(formKey);
		BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());

		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(formDef.getMode());
		String pk = formbuilderStrategy.getPk(formBo.getBoCode(), formBo.getBoId());

		responseData.accumulate(DataTemplatelConstants.PK_COLUMN_KEY, pk);

		String upperlower = AppUtil.getProperty("business.table.upperorlower", BoTableConstants.BUSINESS_DEF);
		String formNameKey = formBo.getBoCode();
		if (BoTableConstants.BUSINESS_UPPER.equalsIgnoreCase(upperlower)) {
			formNameKey = formNameKey.toUpperCase();
		} else if (BoTableConstants.BUSINESS_LOWER.equalsIgnoreCase(upperlower)) {
			formNameKey = formNameKey.toLowerCase();
		}

		if (BoType.OBJECT.getValue().equals(boDefPo.getBoType())) {
			formNameKey = (formDef.getMode().equals(FormMode.BO.key())
					? AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true) : "")
					+ formBo.getBoCode();
			if (BoTableConstants.BUSINESS_UPPER.equalsIgnoreCase(upperlower)) {
				formNameKey = formNameKey.toUpperCase();
			} else if (BoTableConstants.BUSINESS_LOWER.equalsIgnoreCase(upperlower)) {
				formNameKey = formNameKey.toLowerCase();
			}
		}
		responseData.accumulate(DataTemplatelConstants.FORM_NAME_KEY, formNameKey);
		// List<ExcelExportEntity> entityList =
		// getEntityList(responseData.getString("display_columns"));

		List<ExcelExportEntity> entityList = getEntityList(JsonUtil.getString(exportColumns, "fields"));

		List<?> list = formDataTemplateRepository.queryExportDataList(queryFilter, responseData, exportColumns);

		List<Map<String, Object>> listMap = getListMap(list, action, ids, pk);

		modelMap.put(PoiViewConstants.FILE_NAME, label);
		modelMap.put(PoiViewConstants.PARAMS, new ExportParams(label));
		modelMap.put(PoiViewConstants.ENTITY_LIST, entityList);
		modelMap.put(PoiViewConstants.MAP_LIST, listMap);

		return PoiViewConstants.IBPS_MAP_EXCEL_VIEW;
	}

	/**
	 * 导出的记录
	 *
	 * @param exportColumns
	 * @return
	 */
	private List<ExcelExportEntity> getEntityList(String exportColumns) {
		List<ExcelExportEntity> entityList = new ArrayList<ExcelExportEntity>();
		if (JsonUtil.isEmpty(exportColumns))
			return entityList;
		JSONArray exportColumnsJson = JSONArray.fromObject(exportColumns);
		for (Object obj : exportColumnsJson) {
			JSONObject jsonObject = (JSONObject) obj;
			String name = jsonObject.getString("field_name");
			if (StringUtil.isNotEmpty(name))
				entityList.add(new ExcelExportEntity(jsonObject.getString("showName"), name));
			// TODO 子表数据
		}
		return entityList;
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> getListMap(List<?> list, String action, String[] ids, String pk) {
		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		if ("exportSelected".equalsIgnoreCase(action)) {
			for (Object object : list) {
				Map<String, Object> map = (Map<String, Object>) object;
				Object id = map.get(pk);
				if (ArrayUtils.contains(ids, id))
					listMap.add(map);
			}
		} else {
			listMap = (List<Map<String, Object>>) list;
		}
		return listMap;
	}

	/**
	 * 获取树形的格式
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeDataJson")
	public @ResponseBody Map<String, Object> getTreeDataJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);
		JSONObject responseData = RequestUtil.getJSONObject(request, "response_data");
		if (JsonUtil.isEmpty(responseData)) {
			map.put("result", false);
			map.put("msg", "参数[response_data]为空");
			return map;
		}
		try {
			QueryFilter queryFilter = this.getQuerFilter(request, null);
			String formKey = responseData.getString("formKey");

			FormDefPo formDef = formDefRepository.getMainByFormKey(formKey, true);
			FormBoPo formBo = formDef.getFormBo();
			String boCode = formBo.getBoCode();
			String mode = formDef.getMode();
			BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
			IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
			String pk = formbuilderStrategy.getPk(boCode, formBo.getBoId());
			String tableName = boCode.toUpperCase();
			boolean isSwitch = false;
			if (BoType.OBJECT.getValue().equalsIgnoreCase(boDefPo.getBoType())) {
				tableName = (mode.equals(FormMode.BO.key())
						? AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true) : "")
						+ boCode.toUpperCase();
			} else {
				idataSource.setDataSource(boDefPo.getDsAlias());// 转换这次进程的数据源
				isSwitch = true;
			}

			responseData.accumulate(DataTemplatelConstants.PK_COLUMN_KEY, pk);

			responseData.accumulate(DataTemplatelConstants.FORM_NAME_KEY, tableName);
			List<?> list = formDataTemplateRepository.queryDataTableList(queryFilter, responseData);
			if (isSwitch)
				DbContextHolder.clearDataSource();
			map.put("data", list);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "加载树形数据失败！");
			map.put("cause", e.getMessage());
		}

		return map;
	}

	/**
	 * 获取数据表格的格式
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getDataTableJson")
	public @ResponseBody PageJson getDataTableJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		JSONObject responseData = RequestUtil.getJSONObject(request, "response_data");
		if (JsonUtil.isEmpty(responseData))
			return new PageJson();
		Page page = this.getQueryDataPage(request, responseData);
		QueryFilter queryFilter = this.getQuerFilter(request, page);
		String formKey = responseData.getString("formKey");

		FormDefPo formDef = formDefRepository.getMainByFormKey(formKey, true);
		FormBoPo formBo = formDef.getFormBo();
		String boCode = formBo.getBoCode();
		String mode = formDef.getMode();
		BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
		String pk = formbuilderStrategy.getPk(boCode, formBo.getBoId());
		String tableName = boCode.toUpperCase();
		boolean isSwitch = false;
		if (BoType.OBJECT.getValue().equalsIgnoreCase(boDefPo.getBoType())) {
			tableName = (mode.equals(FormMode.BO.key())
					? AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true) : "")
					+ boCode.toUpperCase();
		} else {
			idataSource.setDataSource(boDefPo.getDsAlias());// 转换这次进程的数据源
			isSwitch = true;
		}

		responseData.accumulate(DataTemplatelConstants.PK_COLUMN_KEY, pk);

		responseData.accumulate(DataTemplatelConstants.FORM_NAME_KEY, tableName);
		List<?> list = formDataTemplateRepository.queryDataTableList(queryFilter, responseData);
		if (isSwitch)
			DbContextHolder.clearDataSource();

		return new PageJson(list);
	}

	private Page getQueryDataPage(HttpServletRequest request, JSONObject responseData) {
		boolean isNeedPage = JsonUtil.getBool(responseData, "need_page", true);
		if (isNeedPage) {
			return getQueryFilterPage(request);
		}
		return null;
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getFormData")
	public @ResponseBody Object getFormData(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String formKey = RequestUtil.getString(request, "formKey");
		String pk = RequestUtil.getString(request, "pk");
		String templateKey = RequestUtil.getString(request, "templateKey");
		String rightsScope = RequestUtil.getString(request, "rightsScope", RightsScope.FORM.key());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);

		String formData = getFormData(formKey, null);
		String code = getCode(formData);
		// bo原来的数据
		IDataObject dataObject = null;
		FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
		if (BeanUtils.isEmpty(formBo) || BeanUtils.isEmpty(formBo.getBoId())) {
			map.put("result", false);
			map.put("msg", "不支持不绑定[业务对象]的表单");
			return map;
		}
		if (StringUtil.isNotEmpty(pk)) {
			BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
			dataObject = boInstanceService.getDataObject(DataSaveMode.TABLE, pk, code, boDefPo.getVersion());
		}
		Map<String, String> rightsMap = new HashMap<String, String>();
		rightsMap.put(FormPermissionVo.RIGHTS_KEY, BeanUtils.isNotEmpty(templateKey) ? templateKey : null);
		// 表单权限
		String permissions = formRightsService.getPermission(new FormPermissionVo(RightsScope.fromKey(rightsScope),
				ContextUtil.getCurrentUserId(), formKey, rightsMap));
		map.put("boData", BeanUtils.isNotEmpty(dataObject) ? dataObject.getData() : null);
		//当前数据版本号
		map.put("version",  BeanUtils.isNotEmpty(dataObject) ? dataObject.getVersion() : 0);
		map.put("form", formData.toString());
		map.put("permissions", permissions);
		return map;
	}

	private String getCode(String formData) {
		JSONObject jsonObject = JSONObject.fromObject(formData);
		return jsonObject.getString("code");
	}

	/**
	 * 保存表单数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveFormData")
	public void saveFormData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		String pk = RequestUtil.getString(request, "pk");
		String code = RequestUtil.getString(request, "code");
		String formKey = RequestUtil.getString(request, "formKey");
		int version = RequestUtil.getInt(request, "version",0);
		
		String saveType = DataSaveMode.TABLE;
		IDataObject dataObject = null;
		Integer boVersion = 0;
		try {
			FormDefPo formDefPo = formDefRepository.getByFormKey(formKey);
			FormBoPo formBo = formDefPo.getFormBo();
			BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
			boVersion = boDefPo.getVersion();
			if (StringUtil.isNotEmpty(pk)) {
				dataObject = boInstanceService.getDataObject(saveType, pk, code, boVersion);
			}
			// 将前台的BO数据与原有BO数据 融合（前台的BO数据可能只有一部分数据）
			if (BeanUtils.isEmpty(dataObject)) {
				dataObject = boInstanceService.createDataObject(code, boVersion, data);
			} else {
				boInstanceService.mergerDataObject(dataObject, data);
			}

			dataObject.setCurUserId(ContextUtil.getCurrentUserId());
			dataObject.setOptIp(RequestUtil.getIpAddr(request));
			dataObject.setVersion(version);
			// 设置表单字段的数据
			dataObject.setFormOptions(FormDefDataBuilder.buildFormOptionData(formDefPo,data));

			// 保存数据
			boInstanceService.save(saveType, dataObject);

			message = new ResultMessage(ResultMessage.SUCCESS, "保存表单数据成功");
		} catch (DataObjectException e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "保存表单数据验证失败", e.getMessage());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "保存表单数据失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 从编辑页面启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlowFromEdit")
	public void startFlowFromEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String pk = RequestUtil.getString(request, "pk");
		String data = RequestUtil.getString(request, "data");
		String flowKey = RequestUtil.getString(request, "flowKey");
		IbpsProcInstCmd cmd = null;
		try {
			cmd = getStartCmd(flowKey, "", data, StringUtil.isNotEmpty(pk) ? pk : UniqueIdUtil.getId());
			bpmProcInstService.startProcInst(cmd);
			message = new ResultMessage(ResultMessage.SUCCESS, "启动流程成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "启动流程失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 从列表页面启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlowFromList")
	public void startFlowFromList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String[] ids = RequestUtil.getStringAryByStr(request, "id");
		String formKey = RequestUtil.getString(request, "formKey");
		String defKey = RequestUtil.getString(request, "defKey");
		String saveType = DataSaveMode.TABLE;
		IDataObject dataObject = null;
		IbpsProcInstCmd cmd = null;
		try {
			if (BeanUtils.isNotEmpty(ids)) {
				FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
				BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
				String	code = boDefPo.getCode();
				Integer version = boDefPo.getVersion();
				for (String id : ids) {
					dataObject = boInstanceService.getDataObject(saveType, id, code, version);
					cmd = getStartCmd(defKey, "", dataObject.getData(), id);
					bpmProcInstService.startProcInst(cmd);
				}
				message = new ResultMessage(ResultMessage.SUCCESS, "启动流程成功");
			}else{
				message = new ResultMessage(ResultMessage.WARN, "未选数据");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "启动流程失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getStartCmd(String defKey, String destination, String busData, String id) {
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(defKey, false);
		if (BeanUtils.isEmpty(bpmDefine)) {
			throw new RuntimeException("流程不存在，流程key【" + defKey + "】");
		}

		/*
		 * 节点执行人 [ {nodeId:"UserTask_16w6bmp"
		 * ,executors:[{id:"1",type:"employee",name:"管理员"}] } ]
		 */
		String nodeUsers = "[]";

		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(id);
		cmd.setDestination(destination);
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader
					.getBpmProcDefine(bpmDefine.getDefId());
			BpmProcExtendDefine bpmProcExtendDefine = bpmProcessDef.getBpmProcExtendDefine();
			String dataSaveMode = DataSaveMode.TABLE;
			FormCategory formCategory = bpmProcExtendDefine.getGlobalForm().getType();
			if (FormCategory.INNER.equals(formCategory)) {
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable() ? DataSaveMode.TABLE : DataSaveMode.INSTANCE;
				// 设置表单cmd
				bpmFormService.setFormOptions(cmd, bpmDefine.getDefId());

			} else if (FormCategory.URL_LOAD.equals(formCategory)) {
				dataSaveMode = ActionCmd.DATA_MODE_PAIR;
			} else if (FormCategory.FRAME.equals(formCategory)) {
				dataSaveMode = ActionCmd.DATA_MODE_PK;
			}

			cmd.setDataMode(dataSaveMode);

			cmd.setBusData(busData);
		}

		// 设置指定执行人
		if (BeanUtils.isNotEmpty(specUserMap)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}

		// 设置当前执行人信息
		cmd.setOptIp(ContextUtil.getCurrentUserIp());
		cmd.setCurUser(ContextUtil.getCurrentUserId());
		cmd.setCurUserName(ContextUtil.getCurrentUser().getFullname());

		return cmd;
	}

	/**
	 * 批量删除【业务数据模版】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeFormData")
	public void removeFormData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String formKey = RequestUtil.getString(request, "formKey");
			FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
			BoDefPo boDefPo = boDefRepository.get(formBo.getBoId());
			// 构造领域对象和保存数据
			boInstanceService.removeDataObject(DataSaveMode.ALL, formBo.getBoCode(), boDefPo.getVersion(), ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除表单数据成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除表单数据失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

}
