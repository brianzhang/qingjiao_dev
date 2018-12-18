
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.PurchaseAttach;
import com.lc.ibps.demo.codegen.repository.PurchaseAttachRepository;
import com.lc.ibps.demo.codegen.service.PurchaseAttachService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * 采购需求附件 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@Transactional
public class PurchaseAttachServiceImpl implements PurchaseAttachService{
	  
	@Resource
	private PurchaseAttachRepository purchaseAttachRepository;


	@Override
	public void save(String jsonData) {
		PurchaseAttach purchaseAttach = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(purchaseAttach)){
			return;
		}
		purchaseAttach.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		PurchaseAttach purchaseAttach = purchaseAttachRepository.newInstance();
		purchaseAttach.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private PurchaseAttach getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		PurchaseAttachPo po = getFromJson(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		PurchaseAttach purchaseAttach = purchaseAttachRepository.newInstance(po);
		
		return purchaseAttach;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseAttachPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		PurchaseAttachPo purchaseAttachPo = getPurchaseAttachPo(jsonObj);

		return purchaseAttachPo;
	}
	
	/** 
	 * 获取采购需求附件数据
	 *
	 * @param jsonObj
	 */
	private PurchaseAttachPo getPurchaseAttachPo(JSONObject jsonObj){
		PurchaseAttachPo purchaseAttachPo = (PurchaseAttachPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseAttachPo.class);
		return purchaseAttachPo;
	}
	
	
}
