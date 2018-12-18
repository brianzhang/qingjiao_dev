package com.lc.ibps.test.demo.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.test.demo.domain.UrlForm;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.demo.repository.UrlFormRepository;
import com.lc.ibps.test.demo.service.UrlFormService;

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
@Service("urlFormService")
public class UrlFormServiceImpl implements UrlFormService{
	  
	@Resource
	private UrlFormRepository urlFormRepository;

	@Override
	public void save(ActionCmd cmd) {
		UrlForm urlForm = getDomain(cmd);
		if(BeanUtils.isEmpty(urlForm)){
			return;
		}
		urlForm.saveCascade();
	}

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private UrlForm getDomain(ActionCmd cmd){
		String busData= cmd.getBusData();
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		UrlFormPo po = getFromJson(busData);
		po.setId(cmd.getBusinessKey());
		UrlForm urlForm = urlFormRepository.newInstance(po);
		
		return urlForm;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private UrlFormPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		List<UrlFormSub2Po> subPoList = getUrlFormSub2PoList(jsonObj);
		UrlFormPo urlFormPo = getUrlFormPo(jsonObj);
		urlFormPo.setUrlFormSub2PoList(subPoList);

		return urlFormPo;
	}
	
	/**
	 * TODO 方法名称描述
	 *
	 * @param jsonObj
	 * @return 
	 */
	@SuppressWarnings("unchecked")
	private List<UrlFormSub2Po> getUrlFormSub2PoList(JSONObject jsonObj) {
		if(!jsonObj.containsKey("urlFormSub2PoList")){
			return null;
		}
		
		List<UrlFormSub2Po> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("urlFormSub2PoList").toString(), 
													UrlFormSub2Po.class);
		jsonObj.discard("urlFormSub2PoList");
		return rs;
	}

	/** 
	 * 获取子表例子数据
	 *
	 * @param jsonObj
	 */
	private UrlFormPo getUrlFormPo(JSONObject jsonObj){
		UrlFormPo urlFormPo = (UrlFormPo) JsonUtil.getDTO(jsonObj.toString(), UrlFormPo.class);
		return urlFormPo;
	}
	
}
