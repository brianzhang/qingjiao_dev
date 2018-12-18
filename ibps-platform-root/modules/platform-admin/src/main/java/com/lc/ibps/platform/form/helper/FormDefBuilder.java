package com.lc.ibps.platform.form.helper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.lc.ibps.api.form.constants.FormMode;
import com.lc.ibps.base.bo.persistence.entity.BoAttributePo;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.id.UniqueIdUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.form.form.persistence.entity.FormBoPo;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.persistence.entity.FormFieldPo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 表单构建。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年3月4日-上午9:47:09
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class FormDefBuilder {

	/**
	 * 构建表单定义
	 *
	 * @param data
	 * @return
	 */
	public static FormDefPo buildFormDef(String data) {
		FormDefPo po = new FormDefPo();
		JSONObject json = JSONObject.fromObject(data);
		po.setName(JsonUtil.getString(json, "name"));
		po.setDesc(JsonUtil.getString(json, "desc"));
		po.setKey(JsonUtil.getString(json, "key"));
		po.setTypeId(JsonUtil.getString(json, "typeId"));
		po.setStatus(FormDefPo.STATUS_DEPLOY);
		po.setMode(JsonUtil.getString(json, "mode", FormMode.BO.key()));
		// 扩展属性
		po.setExtendAttr(JsonUtil.getString(json, "attrs"));

		String formId = JsonUtil.getString(json, "id");
		if (StringUtil.isEmpty(formId)) {
			formId = UniqueIdUtil.getId();
			po.setCreateBy(ContextUtil.getCurrentUserId());
			po.setCreateTime(new Date());
		}
		po.setId(formId);
		// 构建form 与bo 的关系
		po.setFormBo(buildFormBo(json, formId));
		// 构建form 与字段 的关系
		po.setFormFieldList(buildFormField(json, formId));

		return po;
	}

	/**
	 * 构建form 与bo 的关系
	 *
	 * @param json
	 * @param formId
	 * @return
	 */
	private static FormBoPo buildFormBo(JSONObject json, String formId) {
		FormBoPo bo = new FormBoPo();
		bo.setFormId(formId);
		bo.setBoCode(JsonUtil.getString(json, "code"));
		bo.setBoId(JsonUtil.getString(json, "busId"));
		return bo;
	}

	/**
	 * 
	 * 构建form 与字段 的关系
	 *
	 * @param json
	 * @param formId
	 * @return
	 */
	private static List<FormFieldPo> buildFormField(JSONObject json, String formId) {
		List<FormFieldPo> formFieldList = new ArrayList<FormFieldPo>();
		JSONArray fields = (JSONArray) json.get("fields");
		for (int i = 0; i < fields.size(); i++) {
			JSONObject obj = (JSONObject) fields.get(i);
			FormFieldPo field = getFormFieldPo(obj, formId);

			if ("table".equalsIgnoreCase(field.getFieldType())) {
				JSONObject fieldOptionsJSON = JSONObject.fromObject(field.getFieldOptions());
				handleSubTable(formFieldList, fieldOptionsJSON.getJSONArray("columns"), formId, field.getId());
				// 去除子表的字段
				fieldOptionsJSON.remove("columns");
				field.setFieldOptions(fieldOptionsJSON.toString());
			}
			field.setSn(i + 1);
			formFieldList.add(field);
		}
		return formFieldList;
	}

	/**
	 * 获取字段数据
	 *
	 * @param obj
	 * @param formId
	 * @return
	 */
	private static FormFieldPo getFormFieldPo(JSONObject obj, String formId) {
		FormFieldPo field = new FormFieldPo();
		String id = UniqueIdUtil.getId();
		field.setId(id);
		field.setFormId(formId);
		field.setName(JsonUtil.getString(obj, "name"));
		field.setLabel(JsonUtil.getString(obj, "label"));
		field.setDesc(JsonUtil.getString(obj, "desc"));
		field.setFieldType(JsonUtil.getString(obj, "field_type"));
		field.setFieldOptions(JsonUtil.getString(obj, "field_options"));
		return field;
	}

	/**
	 * 处理子表数据
	 *
	 * @param formFieldList
	 * @param fields
	 * @param formId
	 * @param parentId
	 */
	private static void handleSubTable(List<FormFieldPo> formFieldList, JSONArray fields, String formId,
			String parentId) {
		if (BeanUtils.isEmpty(fields))
			return;
		for (int i = 0; i < fields.size(); i++) {
			JSONObject obj = (JSONObject) fields.get(i);
			FormFieldPo field = getFormFieldPo(obj, formId);
			field.setParentId(parentId);
			field.setSn(i + 1);
			formFieldList.add(field);
		}
	}
	
	
	

	public static String buildBoInitData(BoDefPo boDefPo) {
		JSONArray fields = new JSONArray();
		 List<BoAttributePo> 	attrList =boDefPo.getAttrList();
		 
		 //===主表字段
		 for (BoAttributePo boAttribute : attrList) {
			 JSONObject field  = new JSONObject();
			 field
			 	.accumulate("name",boAttribute.getCode() )
			 	.accumulate("showName", boAttribute.getName())
			 	.accumulate("label",boAttribute.getName() )
			 	.accumulate("field_type", "datePicker");
			 
			 //选项
			JSONObject fieldOptions = new JSONObject();
			fieldOptions.accumulate("required",false);
			field.accumulate("field_options", fieldOptions);
			
			 fields.add(field);
		}
		 
		 //子表
		 
		 
		JSONObject jsonObject = new  JSONObject();
		jsonObject.accumulate("fields", fields);
		
		return jsonObject.toString();
	}

}
