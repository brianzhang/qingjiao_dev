package com.lc.ibps.platform.form.helper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.lc.ibps.api.common.rights.constants.RightsType;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.common.rights.helper.RightsUtil;
import com.lc.ibps.form.form.persistence.entity.FormDataTemplatePo;
import com.lc.ibps.form.form.persistence.entity.FormDataTemplateTplPo;
import com.lc.ibps.form.form.persistence.entity.FormPrintTemplatePo;
import com.lc.ibps.form.form.repository.FormPrintTemplateRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class FormDataTemplateBuilder {

	public static FormDataTemplatePo build(String data) {
		FormDataTemplatePo po = new FormDataTemplatePo();
		JSONObject json = JSONObject.fromObject(data);
		String id = JsonUtil.getString(json, "id");
		if (StringUtil.isEmpty(id)) 
			id = UniqueIdUtil.getId();

		po.setId(id);
		po.setFormKey(JsonUtil.getString(json, "formKey"));
		po.setName(JsonUtil.getString(json, "name"));
		po.setTypeId(JsonUtil.getString(json, "typeId"));
		po.setDataSource(JsonUtil.getString(json, "dataSource"));

		po.setExtendAttr(JsonUtil.getString(json, "attrs"));

		po.setQueryCondition(JsonUtil.getString(json, "query_condition", null));

		// 数据模版的模版
		po.setFormDataTemplateTplList(buildFormDataTemplateTplList(json, id));
		return po;
	}

	/**
	 * 
	 * 数据模版的模版
	 *
	 * @param json
	 * @param id
	 * @return
	 */
	private static List<FormDataTemplateTplPo> buildFormDataTemplateTplList(JSONObject json, String id) {
		List<FormDataTemplateTplPo> tplList = new ArrayList<FormDataTemplateTplPo>();
		JSONArray templates = (JSONArray) json.get("templates");
		for (int i = 0; i < templates.size(); i++) {
			JSONObject obj = (JSONObject) templates.get(i);
			FormDataTemplateTplPo po = new FormDataTemplateTplPo();
			po.setTemplateId(id);
			po.setLabel(JsonUtil.getString(obj, "label"));
			po.setInitQuery(JsonUtil.getString(obj, "init_query"));
			po.setDefaultFilter(JsonUtil.getString(obj, "default_filter"));
			po.setNeedPage(JsonUtil.getString(obj, "need_page"));
			po.setTemplateType(JsonUtil.getString(obj, "template_type"));
			po.setDisplayColumns(JsonUtil.getString(obj, "display_columns"));
			po.setFilterConditions(JsonUtil.getString(obj, "filter_conditions"));
			po.setSortColumns(JsonUtil.getString(obj, "sort_columns"));
			po.setExportColumns(JsonUtil.getString(obj, "export_columns"));
			po.setFunctionButtons(JsonUtil.getString(obj, "function_buttons"));
			po.setEditButtons(JsonUtil.getString(obj, "edit_buttons"));
			po.setOptions(JsonUtil.getString(obj, "options"));
			tplList.add(po);
		}
		return tplList;
	}

	
	/**
	 * 
	 * 构建数据
	 *
	 * @param po
	 * @param isRightsFilter 是否过滤权限
	 * @return
	 */
	public static String buildData(FormDataTemplatePo po, boolean isRightsFilter) {
		Map<RightsType, List<String>> permissionsMap = null;
		if (isRightsFilter)
			permissionsMap = RightsUtil.getPermissionsMap(ContextUtil.getCurrentUserId());

		JSONObject jsonObject = new JSONObject();
		if (BeanUtils.isEmpty(po))
			return jsonObject.toString();
		jsonObject.accumulate("id", po.getId()).accumulate("formKey", po.getFormKey())
				.accumulate("formName", po.getFormName()).accumulate("typeId", po.getTypeId())
				.accumulate("dataSource", po.getDataSource())
				.accumulate("references", po.getReferences()).accumulate("name", po.getName());
		// 获取分类ID
		if (StringUtil.isNotEmpty(po.getTypeId())) {
			TypeRepository typeRepository = AppUtil.getBean(TypeRepository.class);
			TypePo type = typeRepository.get(po.getTypeId());
			if (BeanUtils.isNotEmpty(type))
				jsonObject.element("typeName", type.getName());
		}
		jsonObject.accumulate("attrs", getExtendAttr(po.getExtendAttr()));
		
		jsonObject.accumulate("query_condition", getFilterValue(po.getQueryCondition(), permissionsMap));

		if (BeanUtils.isNotEmpty(po.getFormDataTemplateTplList())) {
			JSONArray jsonArray = new JSONArray();
			for (FormDataTemplateTplPo tplPo : po.getFormDataTemplateTplList()) {
				JSONObject json = new JSONObject();
				json.accumulate("label", tplPo.getLabel());
				json.accumulate("init_query", tplPo.getInitQuery());
				json.accumulate("default_filter", tplPo.getDefaultFilter());
				json.accumulate("need_page", tplPo.getNeedPage());
				json.accumulate("template_type", tplPo.getTemplateType());
				json.accumulate("display_columns", getDisplayFilterValue(tplPo.getDisplayColumns(), permissionsMap));
				json.accumulate("filter_conditions", getFilterValue(tplPo.getFilterConditions(), permissionsMap));
				json.accumulate("sort_columns", getFilterValue(tplPo.getSortColumns(), permissionsMap));
				json.accumulate("export_columns", getExportValue(tplPo.getExportColumns(), permissionsMap));
				json.accumulate("function_buttons", getFilterValue(tplPo.getFunctionButtons(), permissionsMap));
				json.accumulate("edit_buttons", getFilterValue(tplPo.getEditButtons(), permissionsMap));
				json.accumulate("options", tplPo.getOptions());
				jsonArray.add(json);
			}
			jsonObject.accumulate("templates", jsonArray.toString());
		}
		return jsonObject.toString();
	}

	private static String getExtendAttr(String attrs) {
		if(JsonUtil.isEmpty(attrs))
		return "";
		JSONObject attrsJson =JSONObject.fromObject(attrs);
		String flowKey = JsonUtil.getString(attrsJson, "flow_key");
			
		if(BeanUtils.isNotEmpty(flowKey)){
			BpmDefineService bpmDefineService = AppUtil.getBean(BpmDefineService.class);
			if(BeanUtils.isNotEmpty(bpmDefineService)){
				 IBpmDefine  bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(flowKey);
					attrsJson.element("flow_name",bpmDefine.getName());
			}
		}
		String printId = JsonUtil.getString(attrsJson, "print_id");
		if(BeanUtils.isNotEmpty(printId)){
			FormPrintTemplateRepository formPrintTemplateRepository = AppUtil.getBean(FormPrintTemplateRepository.class);
			FormPrintTemplatePo formPrintTemplatePo = formPrintTemplateRepository.get(printId);
	
			if (BeanUtils.isNotEmpty(formPrintTemplatePo))
				attrsJson.element("print_name", formPrintTemplatePo.getName());
		}
		return attrsJson.toString();
	}
	
	private static Object getDisplayFilterValue(String columns, Map<RightsType, List<String>> permissionsMap) {
		if(JsonUtil.isEmpty(columns) || BeanUtils.isEmpty(permissionsMap))
			return columns;
		boolean isJsonObject = JsonUtil.isJsonObject(columns);
		if (isJsonObject)
			return columns;
		return getFilterValue(columns, permissionsMap);
	}
	
	private static String getFilterValue(String filterValue, Map<RightsType, List<String>> permissionsMap) {
		JSONArray filterValues = new JSONArray();
		if (BeanUtils.isEmpty(filterValue) || BeanUtils.isEmpty(permissionsMap))
			return filterValue;
		
		JSONArray jsonArray = JSONArray.fromObject(filterValue);
		for (Object obj : jsonArray) {
			JSONArray rights = JsonUtil.getJSONArray((JSONObject) obj, "rights");
			if (JsonUtil.isEmpty(rights)) {
				filterValues.add(obj);
				continue;
			}
			if (RightsUtil.hasRight(rights, permissionsMap)) {
				filterValues.add(obj);
			}
		}
		return filterValues.toString();
	}
	
	private static String getExportValue(String exportValue, Map<RightsType, List<String>> permissionsMap) {
		if (!JsonUtil.isJsonObject(exportValue) || BeanUtils.isEmpty(permissionsMap))
			return exportValue;
		
		JSONObject exportValues = JSONObject.fromObject(exportValue);
		JSONArray fieldArray = exportValues.getJSONArray("fields");
		parsePermission(permissionsMap, fieldArray);
		
		return exportValues.toString();
	}

	@SuppressWarnings("unchecked")
	private static void parsePermission(Map<RightsType, List<String>> permissionsMap, JSONArray fieldArray) {
		JSONObject tempJsonObject = null;
		for(Iterator<JSONObject> it = fieldArray.iterator();it.hasNext();){
			tempJsonObject = it.next();
			JSONArray rights = JsonUtil.getJSONArray(tempJsonObject, "rights");
			String tableFieldType = "table";
			String fieldType = tempJsonObject.getString("field_type");
			if (JsonUtil.isEmpty(rights)) {
				// 子表
				parseSubTablePermission(permissionsMap, tempJsonObject, tableFieldType, fieldType);
				continue;
			}
			if (RightsUtil.hasRight(rights, permissionsMap)) {
				// 子表
				parseSubTablePermission(permissionsMap, tempJsonObject, tableFieldType, fieldType);
				continue;
			}
			it.remove();
		}
	}

	private static void parseSubTablePermission(Map<RightsType, List<String>> permissionsMap, JSONObject tempJsonObject,
			String tableFieldType, String fieldType) {
		if(tableFieldType.equalsIgnoreCase(fieldType)){
			// field_options.columns
			JSONObject options = tempJsonObject.getJSONObject("field_options");
			if(JsonUtil.isJsonArray(options.getJSONArray("columns"))){
				JSONArray scolumns = options.getJSONArray("columns");
				parsePermission(permissionsMap, scolumns);
			}
		}
	}

}
