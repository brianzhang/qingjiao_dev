package com.lc.ibps.platform.form.helper;

import java.util.Date;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.form.form.persistence.entity.FormTemplatePo;
import com.lc.ibps.form.form.repository.FormTemplateRepository;

import net.sf.json.JSONObject;

public class FormTemplateBuilder {

	public static String getData(String templateId) {
		FormTemplateRepository formTemplateRepository = AppUtil.getBean(FormTemplateRepository.class);
		FormTemplatePo po = formTemplateRepository.get(templateId);
		return po.getContent();
	}

	public static FormTemplatePo buildFormTemplate(String data) {
		FormTemplatePo po = new FormTemplatePo();
		JSONObject json = JSONObject.fromObject(data);
		po.setName(JsonUtil.getString(json, "name"));
		po.setDesc(JsonUtil.getString(json, "desc"));
		po.setAlias(JsonUtil.getString(json, "key"));
		po.setTypeId(JsonUtil.getString(json, "typeId"));

		String id = JsonUtil.getString(json, "id");
		if (StringUtil.isEmpty(id)) {
			po.setCreateBy(ContextUtil.getCurrentUserId());
			po.setCreateTime(new Date());
		} else {
			po.setId(id);
		}

		po.setContent(data);
		return po;
	}
}
