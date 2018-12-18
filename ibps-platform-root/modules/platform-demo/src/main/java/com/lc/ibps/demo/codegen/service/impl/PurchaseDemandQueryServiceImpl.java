
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;

import com.lc.ibps.demo.codegen.repository.PurchaseDemandRepository;
import com.lc.ibps.demo.codegen.service.PurchaseDemandQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * 采购需求 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@Service("purchaseDemandQueryService")
public class PurchaseDemandQueryServiceImpl implements PurchaseDemandQueryService{
	  
	@Resource
	private PurchaseDemandRepository purchaseDemandRepository;

	@Override
	public String get(String id) {
		PurchaseDemandPo po = purchaseDemandRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	
	@Override
	public String loadCascade(String id) {
		PurchaseDemandPo po = purchaseDemandRepository.loadCascade(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}

	@Override
	public String query(QueryFilter filter) {
		List<PurchaseDemandPo> pos = purchaseDemandRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<PurchaseDemandPo> pos = purchaseDemandRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}
