package com.lc.ibps.test.demo.service.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;

import com.lc.ibps.test.demo.domain.UrlFormSub;
import com.lc.ibps.test.demo.repository.UrlFormSubRepository;
import com.lc.ibps.test.demo.service.UrlFormSubService;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;

import net.sf.json.JSONObject;

/**
 * 子表例子 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
@Service
public class UrlFormSubServiceImpl implements UrlFormSubService{
	  
	@Resource
	UrlFormSubRepository urlFormSubRepository;

	@Override
	public void save(ActionCmd cmd) {
		UrlFormSub urlFormSub = getDomain(cmd);
		if(BeanUtils.isEmpty(urlFormSub)){
			return;
		}
		urlFormSub.save();
	}

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private UrlFormSub getDomain(ActionCmd cmd){
		String busData= cmd.getBusData();
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		UrlFormSubPo po = getFromJson(busData);
		po.setId(cmd.getBusinessKey());
		UrlFormSub urlFormSub = urlFormSubRepository.newInstance(po);
		
		return urlFormSub;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private UrlFormSubPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		UrlFormSubPo urlFormSubPo = getUrlFormSubPo(jsonObj);

		return urlFormSubPo;
	}
	
	/** 
	 * 获取子表例子数据
	 *
	 * @param jsonObj
	 */
	private UrlFormSubPo getUrlFormSubPo(JSONObject jsonObj){
		UrlFormSubPo urlFormSubPo = (UrlFormSubPo) JsonUtil.getDTO(jsonObj.toString(), UrlFormSubPo.class);
		return urlFormSubPo;
	}
	
	
}
