
package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;

import com.lc.ibps.demo.codegen.repository.PurchaseAttachRepository;
import com.lc.ibps.demo.codegen.service.PurchaseAttachQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

/**
 * 采购需求附件 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@Service("purchaseAttachQueryService")
public class PurchaseAttachQueryServiceImpl implements PurchaseAttachQueryService{
	  
	@Resource
	private PurchaseAttachRepository purchaseAttachRepository;

	@Override
	public String get(String id) {
		PurchaseAttachPo po = purchaseAttachRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<PurchaseAttachPo> pos = purchaseAttachRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<PurchaseAttachPo> pos = purchaseAttachRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}
