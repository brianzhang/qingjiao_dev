package com.lc.ibps.demo.keshes.service.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;

import com.lc.ibps.demo.keshes.domain.Zengjia;
import com.lc.ibps.demo.keshes.repository.ZengjiaRepository;
import com.lc.ibps.demo.keshes.service.ZengjiaService;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;

import net.sf.json.JSONObject;

/**
 * keshe 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 21:44:08
 *</pre>
 */
@Service("zengjiaService")
public class ZengjiaServiceImpl implements ZengjiaService{
	  
	@Resource
	private ZengjiaRepository zengjiaRepository;

	@Override
	public void save(ActionCmd cmd) {
		Zengjia zengjia = getDomain(cmd);
		if(BeanUtils.isEmpty(zengjia)){
			return;
		}
		zengjia.save();
	}

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Zengjia getDomain(ActionCmd cmd){
		String busData= cmd.getBusData();
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		ZengjiaPo po = getFromJson(busData);
		po.setId(cmd.getBusinessKey());
		Zengjia zengjia = zengjiaRepository.newInstance(po);
		
		return zengjia;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ZengjiaPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		ZengjiaPo zengjiaPo = getZengjiaPo(jsonObj);

		return zengjiaPo;
	}
	
	/** 
	 * 获取keshe数据
	 *
	 * @param jsonObj
	 */
	private ZengjiaPo getZengjiaPo(JSONObject jsonObj){
		ZengjiaPo zengjiaPo = (ZengjiaPo) JsonUtil.getDTO(jsonObj.toString(), ZengjiaPo.class);
		return zengjiaPo;
	}
	
	
}