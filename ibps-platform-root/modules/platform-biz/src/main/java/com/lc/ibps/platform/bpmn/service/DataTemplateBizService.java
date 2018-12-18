package com.lc.ibps.platform.bpmn.service;

import java.util.List;

import com.lc.ibps.form.data.persistence.vo.ResponseDataTemplateVo;

public interface DataTemplateBizService {

	public List<?> getDataByProcInst(ResponseDataTemplateVo vo);
	
}
