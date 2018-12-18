package com.lc.ibps.bishes.teacherAndStudent.service.impl;

import javax.annotation.Resource;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bishes.teacherAndStudent.domain.TeacherAndStudent;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
import com.lc.ibps.bishes.teacherAndStudent.service.TeacherAndStudentService;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;


import net.sf.json.JSONObject;

public class TeacherAndStudentServiceImpl implements TeacherAndStudentService {
	@Resource
	private TeacherAndStudentRepository teacherAndStudentRepository;

	@Override
	public void save(ActionCmd cmd) {
		TeacherAndStudent teacherAndStudent = getDomain(cmd);
		if (BeanUtils.isEmpty(teacherAndStudent)) {
			return;
		}
	
		teacherAndStudent.save();// 单表调用save方法
	}
	private TeacherAndStudent getDomain(ActionCmd cmd) {
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		TeacherAndStudentPo po = getFromJson(busData);
		String id = cmd.getBusinessKey();
		po = teacherAndStudentRepository.get(id);
		TeacherAndStudent teacherAndStudent = teacherAndStudentRepository.newInstance(po); 
		return teacherAndStudent;
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TeacherAndStudentPo getFromJson(String json) {
		JSONObject jsonObj = JSONObject.fromObject(json);
		TeacherAndStudentPo teacherAndStudentPo = getTeacherAndStudentPo(jsonObj);
		return teacherAndStudentPo;
	}

	/**
	 * 获取t_codegen_demo数据
	 *
	 * @param jsonObj
	 */
	private TeacherAndStudentPo getTeacherAndStudentPo(JSONObject jsonObj) {
		TeacherAndStudentPo teacherAndStudentPo = (TeacherAndStudentPo) JsonUtil.getDTO(jsonObj.toString(), TeacherAndStudentPo.class);
		return teacherAndStudentPo;
	}
	@Override
	public void nodeExecutors(String ids) {
		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, ids);
		
	}

}
