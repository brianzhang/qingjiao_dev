package com.lc.ibps.platform.data.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.page.Page;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.form.sql.model.TreeDisplayField;
import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.poi.entity.vo.PoiViewConstants;
import com.lc.ibps.components.poi.excel.entity.ExportParams;
import com.lc.ibps.components.poi.excel.entity.params.ExcelExportEntity;
import com.lc.ibps.form.data.constants.DataTemplateType;
import com.lc.ibps.form.data.domain.DataTemplate;
import com.lc.ibps.form.data.helper.DataTemplateBuilder;
import com.lc.ibps.form.data.helper.DatasetBuilder;
import com.lc.ibps.form.data.persistence.entity.DataTemplateFieldPo;
import com.lc.ibps.form.data.persistence.entity.DataTemplatePo;
import com.lc.ibps.form.data.persistence.entity.DatasetPo;
import com.lc.ibps.form.data.persistence.vo.DataTemplateVo;
import com.lc.ibps.form.data.persistence.vo.DatasetTreeVo;
import com.lc.ibps.form.data.persistence.vo.ResponseDataTemplateVo;
import com.lc.ibps.form.data.repository.DataTemplateRepository;
import com.lc.ibps.form.data.repository.DatasetRepository;
import com.lc.ibps.form.form.helper.FormDefDataBuilder;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 数据模版 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：zhuangxh@bpmhome.cn
 * 创建时间：2017-09-30 17:32:58
 * </pre>
 */
@Controller
@RequestMapping("/platform/data/dataTemplate/")
public class DataTemplateController extends GenericController {
	@Resource
	private DataTemplateRepository dataTemplateRepository;
	@Resource
	private DatasetRepository datasetRepository;

	/**
	 * 【数据模版】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<DataTemplatePo> dataTemplateList = (PageList<DataTemplatePo>) dataTemplateRepository
				.query(queryFilter);
		return new PageJson(dataTemplateList);
	}

	/**
	 * 编辑【数据模版】信息页面
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
		DataTemplatePo dataTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			dataTemplate = dataTemplateRepository.get(id);
		}
		return getAutoView().addObject("dataTemplate", dataTemplate).addObject("returnUrl", preUrl);
	}

	/**
	 * 设置字段
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("settingField")
	public ModelAndView settingField(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String datasetKey = RequestUtil.getString(request, "datasetKey", "");
		String datasetJson = "";
		if (StringUtil.isNotEmpty(datasetKey))
			datasetJson = DatasetBuilder.getDatasetJson(datasetKey).toString();

		return getAutoView().addObject("data", datasetJson);
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
		String key = RequestUtil.getString(request, "key");

		JSONObject data = new JSONObject();
		String datasetJson = "";
		if (StringUtil.isNotEmpty(id)) {
			DataTemplatePo po = dataTemplateRepository.getById(id);
			data = DataTemplateBuilder.buildData(po, false, true);
			datasetJson = JsonUtil.getString(data, "dataset", "");
		} else if (StringUtil.isNotEmpty(key)) {
			DataTemplatePo po = dataTemplateRepository.getByKey(key);
			id = po.getId();
			data = DataTemplateBuilder.buildData(po, false, false);
			datasetJson = JsonUtil.getString(data, "dataset", "");
		}

		return getAutoView().addObject("id", id).addObject("data", data).addObject("datasetJson", datasetJson);
	}

	/**
	 * 
	 * 获取所有对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSelectorDataByKey")
	@ResponseBody
	public Map<String, Object> getSelectorDataByKey(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		QueryFilter queryFilter = this.getQuerFilter(request, null);
		String key = RequestUtil.getString(request, "key");
		String type = RequestUtil.getString(request, "type", DataTemplateType.VALUE_SOURCE.key());
		queryFilter.addFilter("type_", type, QueryOP.EQUAL);
		queryFilter.addFilter("key_", key, QueryOP.EQUAL);

		List<DataTemplatePo> data = dataTemplateRepository.query(queryFilter);
		try {
			map.put("result", true);
			map.put("data", BeanUtils.isNotEmpty(data) ? this.getCascadeData(data.get(0)) : "");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", e.getMessage());
		}

		return map;
	}

	/**
	 * 
	 * 获取所有对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSelectorData")
	@ResponseBody
	public Map<String, Object> getSelectorData(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		QueryFilter queryFilter = this.getQuerFilter(request, null);
		String queryName = RequestUtil.getString(request, "queryName");
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		String type = RequestUtil.getString(request, "type", DataTemplateType.DIALOG.key());
		queryFilter.addFilter("type_", type, QueryOP.EQUAL);

		if (StringUtil.isNotEmpty(queryName))
			queryFilter.addFilter("name_", "%" + queryName + "%", QueryOP.LIKE);
		List<DataTemplatePo> data = dataTemplateRepository.query(queryFilter);
		try {
			map.put("result", true);
			map.put("data", !cascade ? data : getCascadeDataList(data));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", true);
			map.put("msg", e.getMessage());
		}

		return map;
	}

	private List<DataTemplateVo> getCascadeDataList(List<DataTemplatePo> list) {
		List<DataTemplateVo> voList = new ArrayList<DataTemplateVo>();
		for (DataTemplatePo dataTemplatePo : list) {
			DataTemplateVo dt = this.getCascadeData(dataTemplatePo);
			if(dt!=null){
				voList.add(dt);
			}
		}

		return voList;
	}

	private DataTemplateVo getCascadeData(DataTemplatePo dataTemplatePo) {
		DataTemplatePo po = dataTemplateRepository.getById(dataTemplatePo.getId());
		JSONObject data = DataTemplateBuilder.buildTemplateDataJson(po);
		if(data.isEmpty()){
			return null;
		}
		DataTemplateVo vo = new DataTemplateVo();
		vo.setId(po.getId());
		vo.setName(po.getName());
		vo.setKey(po.getKey());
		vo.setQueryColumns(JsonUtil.getString(data, "query_columns"));
		vo.setFilterConditions(JsonUtil.getString(data, "filter_conditions"));
		vo.setResultColumns(JsonUtil.getString(data, "result_columns"));

		return vo;
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping("getTemplateData")
	@ResponseBody
	public Map<String, Object> getTemplateData(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String keys = RequestUtil.getString(request, "keys");
		JSONObject jsonObject = JSONObject.fromObject(keys);
		Map<String, Object> data = new HashMap<>();
		Iterator iterator = jsonObject.keys();
		while (iterator.hasNext()) {
			String key = (String) iterator.next();
			String templateKey = jsonObject.getString(key);
			DataTemplatePo po = dataTemplateRepository.getByKey(templateKey);
			String d = DataTemplateBuilder.buildData(po, true, true).toString();
			data.put(key, d);
		}
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		map.put("data", data);
		return map;

	}

	/**
	 * 
	 * 根据key获取数据模版信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getByKey")
	@ResponseBody
	public Map<String, Object> getByKey(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String key = RequestUtil.getString(request, "key");
		try {
			if (StringUtil.isNotEmpty(key)) {
				DataTemplatePo po = dataTemplateRepository.getByKey(key);
				String data = DataTemplateBuilder.buildData(po, true, true).toString();
				map.put("result", true);
				map.put("data", data);
			} else {
				map.put("result", false);
				map.put("msg", "未获取数据模版key");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "出错了");
			map.put("cause", e.getMessage());
		}

		return map;
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
		if (StringUtil.isNotEmpty(id)) {
			DataTemplatePo po = dataTemplateRepository.getById(id);
			data = DataTemplateBuilder.buildData(po, true, true).toString();
		}
		return getAutoView().addObject("data", data).addObject("id", id);
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
		mv.setViewName("/platform/data/dataTemplatePreview.jsp");
		return mv;
	}

	/**
	 * 【数据模版】明细页面
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
		DataTemplatePo dataTemplate = null;
		if (StringUtil.isNotEmpty(id)) {
			dataTemplate = dataTemplateRepository.get(id);
		}
		return getAutoView().addObject("dataTemplate", dataTemplate).addObject("returnUrl", preUrl);
	}
	/**
	 * 判断模版key是否存在
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("isKeyExists")
	public void isFormKeyExists(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String formKey = RequestUtil.getString(request, "key");
		String id = RequestUtil.getString(request, "id");
		try {
			boolean isExists = dataTemplateRepository.isKeyExists(formKey, id);
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "数据模版Key已经存在");
			else
				message = new ResultMessage(ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "判断数据模版Key是否存在失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 保存【数据模版】信息
	 *
	 * @param request
	 * @param response
	 * @param dataTemplate
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String data = RequestUtil.getString(request, "data");
		try {
			DataTemplatePo dataTemplatePo = DataTemplateBuilder.build(data);
			boolean isExists = dataTemplateRepository.isKeyExists(dataTemplatePo.getKey(), dataTemplatePo.getId());
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "数据模版Key【" + dataTemplatePo.getKey() + "】已经存在");
			else {
				// 构造领域对象和保存数据
				DataTemplate dataTemplate = dataTemplateRepository.newInstance(dataTemplatePo);
				dataTemplate.save();
				message = new ResultMessage(ResultMessage.SUCCESS, "保存数据模版成功");
				message.addVariable("id", dataTemplate.getId());
			}
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对数据模版操作失败，" + e.getMessage());
			logger.error("对数据模版操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【数据模版】记录
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
			DataTemplate dataTemplate = dataTemplateRepository.newInstance();
			dataTemplate.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除数据模版成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除数据模版失败，" + e.getMessage());
			logger.error("删除数据模版失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取联动的数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getLinkageData")
	@ResponseBody
	public Map<String, Object> getLinkageData(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String key = RequestUtil.getString(request, "key");
		Page page = this.getQueryFilterPage(request);
		QueryFilter queryFilter = this.getQuerFilter(request, page);

		try {
			if (StringUtil.isNotEmpty(key)) {
				DataTemplatePo po = dataTemplateRepository.getByKey(key);
				JSONObject responseData = DataTemplateBuilder.buildResponseData(po);
				List<?> list = dataTemplateRepository
						.queryForList(new ResponseDataTemplateVo(responseData, queryFilter));
				map.put("result", true);
				map.put("data", BeanUtils.isEmpty(list) ? "" : list.get(0));
			} else {
				map.put("result", false);
				map.put("msg", "未获取数据模版key");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "出错了");
			map.put("cause", e.getMessage());
		}

		return map;
	}

	/**
	 * 获取关联的数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getLinkData")
	@ResponseBody
	public Map<String, Object> getLinkData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String key = RequestUtil.getString(request, "key");
		Page page = this.getQueryFilterPage(request);
		String queryKey = RequestUtil.getString(request, "queryKey");
		String queryValue = RequestUtil.getString(request, "queryValue");
		String dynamicParams = RequestUtil.getString(request, "dynamicParams");
		
		QueryFilter queryFilter = this.getQuerFilter(request, page);
		if (StringUtil.isNotEmpty(queryValue))
			queryFilter.addFilter(queryKey, "%" + queryValue + "%", QueryOP.LIKE);

		try {
			if (StringUtil.isNotEmpty(key)) {
				DataTemplatePo po = dataTemplateRepository.getByKey(key);
				if (BeanUtils.isEmpty(po)) {
					map.put("result", false);
					map.put("msg", "获取数据模版为空");
				} else {
					JSONObject responseData = DataTemplateBuilder.buildResponseData(po);
					responseData.element("dynamic_params", dynamicParams);
					PageList<?> list = (PageList<?>) dataTemplateRepository
							.queryForList(new ResponseDataTemplateVo(responseData, queryFilter));
					map.put("result", true);
					map.put("data", BeanUtils.isEmpty(list) ? "" : list);
					map.put("totalCount", list.getPageResult().getTotalCount());
				}
			} else {
				map.put("result", false);
				map.put("msg", "未获取数据模版key");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "出错了");
			map.put("cause", e.getMessage());
		}

		return map;
	}

	/**
	 * 获取关联的数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getLinkDataByKey")
	@ResponseBody
	public Map<String, Object> getLinkDataByKey(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String key = RequestUtil.getString(request, "key");
		/*
		 * String dataKey = RequestUtil.getString(request, "dataKey"); String
		 * dataKeyValue = RequestUtil.getString(request, "dataKeyValue");
		 */
		// 考虑下性能
		QueryFilter queryFilter = this.getQuerFilter(request, null);
		/* queryFilter.addFilter(dataKey, dataKeyValue, QueryOP); */

		try {
			if (StringUtil.isNotEmpty(key)) {
				DataTemplatePo po = dataTemplateRepository.getByKey(key);
				if (BeanUtils.isEmpty(po)) {
					map.put("result", false);
					map.put("msg", "获取数据模版为空");
				} else {
					JSONObject responseData = DataTemplateBuilder.buildResponseData(po);
					List<?> list = dataTemplateRepository
							.queryForList(new ResponseDataTemplateVo(responseData, queryFilter));
					map.put("result", true);
					map.put("data", BeanUtils.isEmpty(list) ? "" : list);
				}
			} else {
				map.put("result", false);
				map.put("msg", "未获取数据模版key");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "出错了");
			map.put("cause", e.getMessage());
		}

		return map;
	}

	/**
	 * 获取关联的数据,通过id
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getDataById")
	@ResponseBody
	public Map<String, Object> getDataById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String key = RequestUtil.getString(request, "key");
		String id = RequestUtil.getString(request, "id");
		// 考虑下性能
		QueryFilter queryFilter = this.getQuerFilter(request, null);

		try {
			if (StringUtil.isNotEmpty(key)) {
				DataTemplatePo po = dataTemplateRepository.getByKey(key);
				if (BeanUtils.isEmpty(po)) {
					map.put("result", false);
					map.put("msg", "获取数据模版为空");
				} else {
					JSONObject responseData = DataTemplateBuilder.buildResponseData(po);

					queryFilter.addFilter(po.getUnique(), id, QueryOP.EQUAL);
					List<?> list = dataTemplateRepository
							.queryForList(new ResponseDataTemplateVo(responseData, queryFilter));
					map.put("result", true);
					map.put("data", BeanUtils.isEmpty(list) ? "" : list);
					map.put("title", getDataTitle(responseData));
				}
			} else {
				map.put("result", false);
				map.put("msg", "未获取数据模版key");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			map.put("result", false);
			map.put("msg", "出错了");
			map.put("cause", e.getMessage());
		}

		return map;
	}

	/**
	 * 获取数据标题
	 *
	 * @param responseData
	 * @return
	 */
	private String getDataTitle(JSONObject responseData) {
		JSONObject attrs = JsonUtil.getJSONobject(responseData, "attrs");
		Object dataTitle = attrs.get("data_title");
		String type = "first";
		JSONObject dataTitleJson = null;
		if (dataTitle instanceof JSONObject) {
			dataTitleJson = (JSONObject) dataTitle;
			type = JsonUtil.getString(dataTitleJson, "type");
		}

		String key = "";
		if ("custom".equals(type)) {
			if (dataTitleJson != null)
				key = JsonUtil.getString(dataTitleJson, "title");
		} else {
			JSONArray resultColumns = JsonUtil.getJSONArray(responseData, "result_columns");
			JSONObject first = (JSONObject) resultColumns.get(0);
			key = JsonUtil.getString(first, "name");
		}
		// 其他不支持

		return key;
	}

	/**
	 * 列表类型返回的数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("queryDataTableJson")
	public @ResponseBody PageJson queryDataTableJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		JSONObject responseData = RequestUtil.getJSONObject(request, "response_data");
		String conditionKey =  RequestUtil.getString(request, "filter_condition_key");
		if (JsonUtil.isEmpty(responseData))
			return new PageJson();
		Page page = this.getQueryDataPage(request, responseData);
		QueryFilter queryFilter = this.getQuerFilter(request, page);

		List<?> list = dataTemplateRepository.queryForList(new ResponseDataTemplateVo(responseData, queryFilter,conditionKey));
		
		JSONArray fields = responseData.getJSONArray("fields");
		
		return new PageJson(list);
	}

	/**
	 * 树形类型返回的数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("queryTreeDataJson")
	public @ResponseBody Map<String, Object> queryTreeDataJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		JSONObject responseData = RequestUtil.getJSONObject(request, "response_data");
		if (JsonUtil.isEmpty(responseData))
			return null;
		QueryFilter queryFilter = this.getQuerFilter(request, null);
		TreeDisplayField displayField = getTreeDisplayField(responseData);
	
		Map<String, Object> map = new HashMap<String, Object>();
	
		setRootPid(displayField, queryFilter, map);
	
		List<?> list = dataTemplateRepository.geTreeData(new ResponseDataTemplateVo(responseData, queryFilter));
	
		map.put("result", true);
		map.put("data", list);
		return map;
	}

	/**
	 * 
	 * 获取是否分页
	 *
	 * @param request
	 * @param responseData
	 * @return
	 */
	private Page getQueryDataPage(HttpServletRequest request, JSONObject responseData) {
		boolean isNeedPage = JsonUtil.getBool(responseData, "need_page", true);
		if (isNeedPage) {
			return getQueryFilterPage(request);
		}
		return null;
	}

	private Map<String, Object> setRootPid(TreeDisplayField displayField, QueryFilter queryFilter,
			Map<String, Object> map) {
		String rootPId = "";
		String rootLabel = "";
		if (BeanUtils.isEmpty(displayField)){
			map.put("rootPId", rootPId);
			map.put("rootLabel", rootLabel);
			return map;
		}
		rootPId = displayField.getRootPid();
		rootLabel = displayField.getRootLabel();
		//|| BeanUtils.isEmpty(displayField.getRootPid())
		if (BeanUtils.isEmpty(rootPId)){
			map.put("rootPId", rootPId);
			map.put("rootLabel", rootLabel);
			return map;
		}


		boolean isScript = displayField.isScript();
		if (isScript) {// 是脚本，开始解释这段脚本
			GroovyScriptEngine groovyScriptEngine = (GroovyScriptEngine) AppUtil.getBean(GroovyScriptEngine.class);
			rootPId = groovyScriptEngine.executeObject(rootPId, null).toString();
		}
		map.put("rootPId", rootPId);
		map.put("rootLabel", rootLabel);
		return map;
	}

	private TreeDisplayField getTreeDisplayField(JSONObject data) {
		Object o = data.get("display_columns");
		if (JsonUtil.isEmpty(o))
			return null;
		if (o instanceof JSONArray)
			return null;
		JSONObject column = (JSONObject) o;

		TreeDisplayField result = new TreeDisplayField();
		result.setIdKey(JsonUtil.getString(column, "id_key"));
		result.setPidKey(JsonUtil.getString(column, "pid_key"));
		result.setNameKey(JsonUtil.getString(column, "name_key"));
		result.setScript(JsonUtil.getBool(column, "is_script"));
		result.setRootPid(JsonUtil.getString(column, "root_pid"));
		result.setRootLabel(JsonUtil.getString(column, "root_label"));
		return result;
	}
	// =========================功能分割线========================================

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
		JSONObject exportColumns = getExportColumns(RequestUtil.getJSONObject(request, "export_columns"), responseData);

		String label = JsonUtil.getString(responseData, "label", "数据模版");

		String pk = JsonUtil.getString(responseData, "unique", "ID_");

		String datasetKey = JsonUtil.getString(responseData, "datasetKey");
		DatasetPo datasetPo = datasetRepository.getByKey(datasetKey);

		responseData.element("isExport", true);

		List<?> list = dataTemplateRepository.queryForList(new ResponseDataTemplateVo(responseData, queryFilter));
		// 导出字段对象的实体
		List<ExcelExportEntity> entityList = getEntityList(JsonUtil.getString(exportColumns, "fields"));

		boolean isPageData = "page".equals(JsonUtil.getString(exportColumns, "export_type", "db"));

		List<Map<String, Object>> listMap = getListMap(list, action, ids, pk);
		if (isPageData) {// 处理数据
			listMap = this.handData(listMap, DatasetBuilder.getTree(datasetPo),
					JsonUtil.getJSONArray(responseData, "fields"));
		}

		modelMap.put(PoiViewConstants.FILE_NAME, label + "_" + DateUtil.getCurrentTime("yyyyMMddHHmmss"));
		modelMap.put(PoiViewConstants.PARAMS, new ExportParams(label));
		modelMap.put(PoiViewConstants.ENTITY_LIST, entityList);
		modelMap.put(PoiViewConstants.MAP_LIST, listMap);

		return PoiViewConstants.IBPS_MAP_EXCEL_VIEW;
	}

	private List<Map<String, Object>> handData(List<Map<String, Object>> listMap, List<DatasetTreeVo> datasetList,
			JSONArray fields) {
		Map<String, DataTemplateFieldPo> fieldMap = DataTemplateBuilder.getFormFieldByDataset(fields, datasetList);
		for (Map<String, Object> map : listMap) {
			for (String key : map.keySet()) {
				Object value = map.get(key);
				DataTemplateFieldPo po = fieldMap.get(key);
				if (BeanUtils.isNotEmpty(po))
					value = FormDefDataBuilder.getFieldValue(value, po.getFieldType(), po.getFieldOptions());
				map.put(key, value);
			}
		}
		return listMap;
	}

	private JSONObject getExportColumns(JSONObject exportColumns, JSONObject responseData) {
		if (JsonUtil.isEmpty(exportColumns))
			return JsonUtil.getJSONobject(responseData, "export_columns");
		return exportColumns;
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
			String name = JsonUtil.getString(jsonObject, "name");
			if (StringUtil.isNotEmpty(name))
				entityList.add(new ExcelExportEntity(JsonUtil.getString(jsonObject, "label"), name));
			// TODO 子表数据
		}
		return entityList;
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> getListMap(List<?> list, String action, String[] ids, String pk) {
		if (BeanUtils.isEmpty(ids) || StringUtil.isEmpty(pk) || !"exportSelected".equalsIgnoreCase(action))
			return (List<Map<String, Object>>) list;
		Iterator<?> iterator = list.iterator();
		while (iterator.hasNext()) {
			Map<String, Object> map = (Map<String, Object>) iterator.next();
			Object id = map.get(pk);
			if (!ArrayUtils.contains(ids, id))
				iterator.remove();
		}

		return (List<Map<String, Object>>) list;
	}

}
