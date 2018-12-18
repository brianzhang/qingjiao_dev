
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.PurchaseDemand;
import com.lc.ibps.demo.codegen.repository.PurchaseDemandRepository;
import com.lc.ibps.demo.codegen.service.PurchaseDemandService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * 采购需求 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@Transactional
public class PurchaseDemandServiceImpl implements PurchaseDemandService{
	  
	@Resource
	private PurchaseDemandRepository purchaseDemandRepository;


	@Override
	public void save(String jsonData) {
		PurchaseDemand purchaseDemand = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(purchaseDemand)){
			return;
		}
		purchaseDemand.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		PurchaseDemand purchaseDemand = purchaseDemandRepository.newInstance();
		purchaseDemand.deleteByIds(ids);
	}

	@Override
	public void saveCascade(String jsonData) {
		PurchaseDemand purchaseDemand = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(purchaseDemand)){
			return;
		}
		purchaseDemand.saveCascade();
	}
	
	@Override
	public void deleteByIdsCascade(String[] ids){
		PurchaseDemand purchaseDemand = purchaseDemandRepository.newInstance();
		purchaseDemand.deleteByIdsCascade(ids);
	}

	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private PurchaseDemand getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		PurchaseDemandPo po = getFromJson(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		PurchaseDemand purchaseDemand = purchaseDemandRepository.newInstance(po);
		
		return purchaseDemand;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseDemandPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		List<PurchaseAttachPo> purchaseAttachPoList = getPurchaseAttachPoList(jsonObj);
		List<PurchaseDetailPo> purchaseDetailPoList = getPurchaseDetailPoList(jsonObj);
		PurchaseDemandPo purchaseDemandPo = getPurchaseDemandPo(jsonObj);
		purchaseDemandPo.setPurchaseAttachPoList(purchaseAttachPoList);
		purchaseDemandPo.setPurchaseDetailPoList(purchaseDetailPoList);

		return purchaseDemandPo;
	}
	
	/** 
	 * 获取采购需求数据
	 *
	 * @param jsonObj
	 */
	private PurchaseDemandPo getPurchaseDemandPo(JSONObject jsonObj){
		PurchaseDemandPo purchaseDemandPo = (PurchaseDemandPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseDemandPo.class);
		return purchaseDemandPo;
	}
	
	/** 
	 * 获取采购需求附件数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<PurchaseAttachPo> getPurchaseAttachPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("purchaseAttachPoList")){
			return null;
		}
		
		List<PurchaseAttachPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("purchaseAttachPoList").toString(), 
													PurchaseAttachPo.class);
		jsonObj.discard("purchaseAttachPoList");
		return rs;
	}
	/** 
	 * 获取t_purchasedetaillist数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<PurchaseDetailPo> getPurchaseDetailPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("purchaseDetailPoList")){
			return null;
		}
		
		List<PurchaseDetailPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("purchaseDetailPoList").toString(), 
													PurchaseDetailPo.class);
		jsonObj.discard("purchaseDetailPoList");
		return rs;
	}
	
}
