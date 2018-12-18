package com.lc.ibps.platform.form.controller;

import java.io.File;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.form.constants.FormMode;
import com.lc.ibps.api.form.service.IFormbuilderStrategy;
import com.lc.ibps.api.form.vo.TableTreeVo;
import com.lc.ibps.api.form.vo.TableVo;
import com.lc.ibps.base.bo.exception.BoBaseException;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.ITableMeta;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.DictionaryPo;
import com.lc.ibps.common.cat.repository.DictionaryRepository;
import com.lc.ibps.components.codegen.model.TableModel;
import com.lc.ibps.components.codegen.service.ITableModelService;
import com.lc.ibps.form.data.helper.DataTemplateBuilder;
import com.lc.ibps.form.data.persistence.entity.DataTemplatePo;
import com.lc.ibps.form.data.repository.DataTemplateRepository;
import com.lc.ibps.form.form.domain.FormDef;
import com.lc.ibps.form.form.persistence.entity.CustomDialogPo;
import com.lc.ibps.form.form.persistence.entity.FormBoPo;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.repository.CustomDialogRepository;
import com.lc.ibps.form.form.repository.FormDefRepository;
import com.lc.ibps.form.form.strategy.form.FormbuilderStrategyFactory;
import com.lc.ibps.platform.codegen.builder.TableDataBuilder;
import com.lc.ibps.platform.form.helper.FormDefBuilder;
import com.lc.ibps.platform.form.helper.FormTemplateBuilder;
import com.lc.ibps.platform.form.vo.TableTemplateVo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 表单定义 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-10-14 14:23:54
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/formDef/")
public class FormDefController extends GenericController {
	@Resource
	private FormDefRepository formDefRepository;
	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private ITableMeta tableMeta;
	@Resource
	private ITableModelService tableModelService;
	@Resource
	private DictionaryRepository dictionaryRepository;
	@Resource
	private CustomDialogRepository customDialogRepository;
	@Resource
	private DataTemplateRepository dataTemplateRepository;

	/**
	 * 【表单定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<FormDefPo> formDefList = (PageList<FormDefPo>) formDefRepository.query(queryFilter);
		return new PageJson(formDefList);
	}

	/**
	 * 判断表单key是否存在
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("isFormKeyExists")
	public void isFormKeyExists(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String formKey = RequestUtil.getString(request, "key");
		String id = RequestUtil.getString(request, "id");
		try {
			boolean isExists = formDefRepository.isFormKeyExists(formKey, id);
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "表单Key已经存在");
			else
				message = new ResultMessage(ResultMessage.SUCCESS, "");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "判断表单Key是否存在失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 【表单定义】设计页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("design")
	public ModelAndView design(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		String code = RequestUtil.getString(request, "code", "");
		String buildMode = RequestUtil.getString(request, "buildMode");
		String template = RequestUtil.getString(request, "template", "");
		String data = "";
		try {
			if (StringUtil.isNotEmpty(id)) {
				FormDefPo po = formDefRepository.get(id);
				mode = po.getMode();
				IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
				data = formbuilderStrategy.getData(code, id);
			} else {
				if (BeanUtils.isNotEmpty(buildMode)) {
					if ("template".equalsIgnoreCase(buildMode) && StringUtil.isNotEmpty(template)) {
						data = FormTemplateBuilder.getData(template);
					} else if ("table".equalsIgnoreCase(buildMode) && StringUtil.isNotEmpty(template)) {
						IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
						Map<String, String> templateMap = getTemplateMap(URLDecoder.decode(template, StringPool.UTF_8));
						data = formbuilderStrategy.getDefaultData(code, templateMap);
					}
				}
				if (StringUtil.isEmpty(data)) {
					IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
					data = formbuilderStrategy.getData(code, id);
				}

			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		return getAutoView().addObject("id", id).addObject("data", data);
	}

	@SuppressWarnings("unchecked")
	private Map<String, String> getTemplateMap(String template) {
		Map<String, String> templateMap = new HashMap<String, String>();
		JSONObject jsonObject = JSONObject.fromObject(template);
		for (Iterator<String> iter = jsonObject.keys(); iter.hasNext();) {
			// 获得key
			String key = iter.next();
			templateMap.put(key, jsonObject.getString(key));
		}

		return templateMap;
	}

	/**
	 * 【表单定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	@ResponseBody
	public String get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);

		return formbuilderStrategy.getData(null, id);
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
		String formKey = RequestUtil.getString(request, "formKey");
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		String data = "";
		if (StringUtil.isNotEmpty(formKey)) {
			FormDefPo po = formDefRepository.getMainByFormKey(formKey);
			id = po.getId();
		}

		if (BeanUtils.isNotEmpty(id)) {
			FormDefPo po = formDefRepository.get(id);
			mode = po.getMode();
			data = formDefRepository.getFormData(id);
		}
		return getAutoView().addObject("id", id).addObject("data", data).addObject("mode", mode);
	}

	/**
	 * 保存【表单定义】信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		try {

			FormDefPo formDefPo = FormDefBuilder.buildFormDef(data);
			boolean isExists = formDefRepository.isFormKeyExists(formDefPo.getKey(), formDefPo.getId());
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "表单Key【" + formDefPo.getKey() + "】已经存在");
			else {
				// 构造领域对象和保存数据
				FormDef formDef = formDefRepository.newInstance(formDefPo);
				formDef.save();

				message = new ResultMessage(ResultMessage.SUCCESS, "保存表单定义成功");
				message.addVariable("id", formDef.getId());
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对表单定义操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【表单定义】记录
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
			FormDef formDef = formDefRepository.newInstance();
			formDef.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除表单定义成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除表单定义失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 
	 * 设置自定义对话框
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("customDialog")
	public ModelAndView customDialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String alias = RequestUtil.getString(request, "alias");
		CustomDialogPo customDialog = customDialogRepository.getByAlias(alias);
		String data = JSONObject.fromObject(customDialog).toString();
		return getAutoView().addObject("data", data);
	}

	/**
	 * 
	 * 设置自定义对话框
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("customDialog2")
	public ModelAndView customDialog2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String key = RequestUtil.getString(request, "key");
		DataTemplatePo po = dataTemplateRepository.getByKey(key);
		String data = DataTemplateBuilder.buildTemplateData(po);
		return getAutoView().addObject("data", data);
	}

	
	/**
	 * 获取脚本的值
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("getScriptValue")
	public void getScriptValue(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String script = RequestUtil.getString(request, "script");

		Map<String, Object> vars = null;
		ResultMessage message = null;
		Object value = null;
		try {
			GroovyScriptEngine groovyScriptEngine = (GroovyScriptEngine) AppUtil.getBean(GroovyScriptEngine.class);
			value = groovyScriptEngine.executeObject(script, vars);
			message = new ResultMessage(ResultMessage.SUCCESS, value.toString());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("tableList")
	@ResponseBody
	public List<Map<String, String>> tableList(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String tableName = RequestUtil.getString(request, "tableName", "");
		Map<String, String> tableMap = tableMeta.getTablesByName(tableName);
		List<Map<String, String>> rs = TableDataBuilder.buildTable(tableMap);
		return rs;
	}

	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("buildTree")
	@ResponseBody
	public List<TableTreeVo> buildTree(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		String code = RequestUtil.getString(request, "code", "");
		String busId = RequestUtil.getString(request, "busId", "");
		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
		return formbuilderStrategy.buildTableTree(code,busId);
	}

	/**
	 * 生成模版
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("genTemplate")
	public ModelAndView genTemplate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		String html = "";
		try {
			FormBoPo formBoPo = formDefRepository.getFormBoByFormId(id);
			TableModel tableModel = tableModelService.getByTableName(formBoPo.getBoCode());
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("tableModel", tableModel);
			params.put("containHeader", true);
			IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
			String data = formbuilderStrategy.getData(null, id);
			html = formbuilderStrategy.buildFormTemplate(data, params);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		return getAutoView().addObject("html", html);
	}

	/**
	 * 选择表模版
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("selectTableTemplate")
	public ModelAndView selectTableTemplate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String mode = RequestUtil.getString(request, "mode", FormMode.BO.key());
		String code = RequestUtil.getString(request, "code", "");

		IFormbuilderStrategy formbuilderStrategy = FormbuilderStrategyFactory.get(mode);
		TableVo tableVo = formbuilderStrategy.getTableVo(code);

		List<TableVo> subTables = tableVo.getSubTableList();
		List<TableTemplateVo> mainTableTemplates = buildTemplate("layerTemplate");

		List<TableTemplateVo> subTableTemplates = buildTemplate("subTemplate");

		return getAutoView().addObject("mainTable", tableVo).addObject("subTables", subTables)
				.addObject("mainTableTemplates", mainTableTemplates).addObject("subTableTemplates", subTableTemplates);

	}

	/**
	 * 构建模版
	 *
	 * @param typeKey
	 * @return
	 */
	private List<TableTemplateVo> buildTemplate(String typeKey) {
		List<TableTemplateVo> tableTemplates = new ArrayList<TableTemplateVo>();
		List<DictionaryPo> list = dictionaryRepository.findByTypeKey(typeKey);
		if (BeanUtils.isEmpty(list))
			return tableTemplates;
		for (DictionaryPo dictionaryPo : list) {
			tableTemplates.add(new TableTemplateVo(dictionaryPo.getName(), dictionaryPo.getKey()));
		}
		return tableTemplates;
	}

	/**
	 * 导出表单
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportForm")
	public void exportForm(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String realFilePath = null;
		String zipFilePath = null;
		try {
			String idsStr = RequestUtil.getString(request, "ids");
			if (BeanUtils.isEmpty(idsStr))
				return;
			String[] ids = idsStr.split(StringPool.COMMA);
			String rootRealPath = AppFileUtil.getRealPath("/" + AppFileUtil.TEMP_PATH); // 操作的根目录
			String nowDate = DateFormatUtil.format(new Date(), "yyyyMMddHHmmss");
			String fileName = "formDef_" + nowDate;
			realFilePath = rootRealPath + File.separator + fileName; // 专属于在某个时刻导出操作文件目录，完成后删除

			Map<String, Boolean> map = this.getDefaultExportMap();

			String strXml = formDefRepository.exportForm(ids, map); // 输出xml

			FileUtil.writeFile(realFilePath + File.separator + fileName + ".xml", strXml);
			ZipUtil.zip(realFilePath, true); // 打包
			String zipFileName = fileName + ".zip";
			zipFilePath = rootRealPath + File.separator + zipFileName;
			RequestUtil.downLoadFile(request, response, zipFilePath, zipFileName);// 导出
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			ResultMessage message = new ResultMessage(ResultMessage.FAIL, "导入失败:" + e.getMessage());
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
		map.put("formDef", true);
		map.put("formField", true);
		map.put("formBo", true);
		map.put("formRights", true);
		return map;
	}

	/**
	 * 导入表单
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("importForm")
	public void importForm(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile fileLoad = request.getFile("file");
		ResultMessage message = null;
		String unZipFilePath = null;
		try {
			String rootRealPath = AppFileUtil.getRealPath("/" + AppFileUtil.TEMP_PATH); // 操作的根目录
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
			FormDef formDef = formDefRepository.newInstance();
			formDef.importForm(unZipFilePath);
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
	 * 复制表单
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("copy")
	public ModelAndView copy(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		FormDefPo po = formDefRepository.get(id);
		return getAutoView().addObject("formDef", po);
	}

	/**
	 * 保存复制【表单定义】信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveCopy")
	public void saveCopy(HttpServletRequest request, HttpServletResponse response, FormDefPo po) throws Exception {
		ResultMessage message = null;
		try {
			FormDef formDef = formDefRepository.newInstance();
			formDef.setData(po);
			formDef.saveCopy();
			message = new ResultMessage(ResultMessage.SUCCESS, "复制表单成功");

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对复制表单操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 
	 * 获取表单字段
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getFields")
	public @ResponseBody Map<String, Object> getFields(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String formKey = RequestUtil.getString(request, "formKey");

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);
		try {
			JSONArray fields = formDefRepository.getFields(formKey);
			map.put("fields", fields.toString());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("message", e.getMessage());
		}
		return map;
	}

}
