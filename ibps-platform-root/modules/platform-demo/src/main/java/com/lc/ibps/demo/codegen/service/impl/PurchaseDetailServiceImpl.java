
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.PurchaseDetail;
import com.lc.ibps.demo.codegen.repository.PurchaseDetailRepository;
import com.lc.ibps.demo.codegen.service.PurchaseDetailService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * t_purchasedetaillist 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:50
 *</pre>
 */
@Transactional
public class PurchaseDetailServiceImpl implements PurchaseDetailService{
	  
	@Resource
	private PurchaseDetailRepository purchaseDetailRepository;


	@Override
	public void save(String jsonData) {
		PurchaseDetail purchaseDetail = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(purchaseDetail)){
			return;
		}
		purchaseDetail.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		PurchaseDetail purchaseDetail = purchaseDetailRepository.newInstance();
		purchaseDetail.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private PurchaseDetail getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		PurchaseDetailPo po = getFromJson(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		PurchaseDetail purchaseDetail = purchaseDetailRepository.newInstance(po);
		
		return purchaseDetail;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseDetailPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		PurchaseDetailPo purchaseDetailPo = getPurchaseDetailPo(jsonObj);

		return purchaseDetailPo;
	}
	
	/** 
	 * 获取t_purchasedetaillist数据
	 *
	 * @param jsonObj
	 */
	private PurchaseDetailPo getPurchaseDetailPo(JSONObject jsonObj){
		PurchaseDetailPo purchaseDetailPo = (PurchaseDetailPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseDetailPo.class);
		return purchaseDetailPo;
	}
	
	
}
