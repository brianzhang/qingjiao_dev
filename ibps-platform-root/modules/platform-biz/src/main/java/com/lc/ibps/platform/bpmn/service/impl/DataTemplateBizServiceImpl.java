package com.lc.ibps.platform.bpmn.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.bpmn.repository.BpmBusRelRepository;
import com.lc.ibps.form.data.persistence.vo.ResponseDataTemplateVo;
import com.lc.ibps.form.data.repository.DataTemplateRepository;
import com.lc.ibps.platform.bpmn.service.DataTemplateBizService;

import net.sf.json.JSONObject;

@Service
public class DataTemplateBizServiceImpl implements DataTemplateBizService {
	
	@Resource
	private DataTemplateRepository dataTemplateRepository;
	@Resource
	private BpmBusRelRepository bpmBusRelRepository;

	@Override
	public List<?> getDataByProcInst(ResponseDataTemplateVo vo) {
		Map<String, JSONObject> fields = vo.getFields();
		List<?> list = dataTemplateRepository.queryForList(vo);
		int ii = 9;
		for(Object o:list){
			System.out.println(JSONObject.fromObject(o));
		}
		
		return list;
	}

}
