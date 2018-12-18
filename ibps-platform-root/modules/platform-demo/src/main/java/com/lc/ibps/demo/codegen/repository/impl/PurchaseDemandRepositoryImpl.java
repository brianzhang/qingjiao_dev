
package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.PurchaseDemand;
import com.lc.ibps.demo.codegen.repository.PurchaseDemandRepository;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * 采购需求 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:47
 *</pre>
 */
@Repository
public class PurchaseDemandRepositoryImpl extends AbstractRepository<String, PurchaseDemandPo,PurchaseDemand> implements PurchaseDemandRepository{
	  
	@Resource
	private  PurchaseDemandQueryDao purchaseDemandQueryDao;
	@Resource
	private  PurchaseAttachQueryDao purchaseAttachQueryDao;
	@Resource
	private  PurchaseDetailQueryDao purchaseDetailQueryDao;

	public PurchaseDemand newInstance() {
		PurchaseDemandPo po = new PurchaseDemandPo();
		PurchaseDemand purchaseDemand = AppUtil.getBean(PurchaseDemand.class);
		purchaseDemand.setData(po);
		return purchaseDemand;
	}

	public PurchaseDemand newInstance(PurchaseDemandPo po) {
		PurchaseDemand purchaseDemand = AppUtil.getBean(PurchaseDemand.class);
		purchaseDemand.setData(po);
		return purchaseDemand;
	} 
	
	@Override
	protected IQueryDao<String, PurchaseDemandPo> getQueryDao() {
		return purchaseDemandQueryDao;
	}
	

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	@Override
	public PurchaseDemandPo loadCascade(String id){
		PurchaseDemandPo purchaseDemandPo = null;
		if(StringUtil.isNotEmpty(id)){
			purchaseDemandPo = purchaseDemandQueryDao.get(id);
			if(BeanUtils.isNotEmpty(purchaseDemandPo) && BeanUtils.isNotEmpty(purchaseDemandPo.getId())){
				List<PurchaseAttachPo> purchaseAttachPoList = purchaseAttachQueryDao.findByMainId(purchaseDemandPo.getId());
				purchaseDemandPo.setPurchaseAttachPoList(purchaseAttachPoList);
			}
			if(BeanUtils.isNotEmpty(purchaseDemandPo) && BeanUtils.isNotEmpty(purchaseDemandPo.getId())){
				List<PurchaseDetailPo> purchaseDetailPoList = purchaseDetailQueryDao.findByMainId(purchaseDemandPo.getId());
				purchaseDemandPo.setPurchaseDetailPoList(purchaseDetailPoList);
			}
		}
		return purchaseDemandPo;
	}
	
}
