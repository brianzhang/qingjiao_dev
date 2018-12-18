
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;

import com.lc.ibps.demo.codegen.repository.PurchaseDetailRepository;
import com.lc.ibps.demo.codegen.service.PurchaseDetailQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * t_purchasedetaillist 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:50
 *</pre>
 */
@Service("purchaseDetailQueryService")
public class PurchaseDetailQueryServiceImpl implements PurchaseDetailQueryService{
	  
	@Resource
	private PurchaseDetailRepository purchaseDetailRepository;

	@Override
	public String get(String id) {
		PurchaseDetailPo po = purchaseDetailRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<PurchaseDetailPo> pos = purchaseDetailRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<PurchaseDetailPo> pos = purchaseDetailRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}
