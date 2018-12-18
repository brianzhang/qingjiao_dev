
package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

import com.lc.ibps.demo.codegen.repository.PurchaseDemandRepository;
import javax.annotation.Resource;

/**
 * 采购需求 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class PurchaseDemand extends AbstractDomain<String, PurchaseDemandPo>{
	 
	private PurchaseDemandDao purchaseDemandDao = null;
	private PurchaseDemandQueryDao purchaseDemandQueryDao = null;

	private PurchaseAttachDao purchaseAttachDao = null;
	private PurchaseDetailDao purchaseDetailDao = null;

	protected void init(){
		purchaseDemandDao = AppUtil.getBean(PurchaseDemandDao.class);
		purchaseDemandQueryDao = AppUtil.getBean(PurchaseDemandQueryDao.class);
		purchaseAttachDao = AppUtil.getBean(PurchaseAttachDao.class);
		purchaseDetailDao = AppUtil.getBean(PurchaseDetailDao.class);
		this.setDao(purchaseDemandDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(purchaseDemandQueryDao.get(getId())));
	}
	
	/**
	 * 主从表一并保存 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void saveCascade(){
		save();
		if(getData().isDelBeforeSave()){
			purchaseAttachDao.deleteByMainId(getData().getId());
			purchaseDetailDao.deleteByMainId(getData().getId());
		}
		
		if(BeanUtils.isNotEmpty(getData().getPurchaseAttachPoList())){
			for(PurchaseAttachPo purchaseAttachPo:getData().getPurchaseAttachPoList()){
				//设置外键
				purchaseAttachPo.setParentId(getData().getId());
				purchaseAttachDao.create(purchaseAttachPo);
			}
		}
		if(BeanUtils.isNotEmpty(getData().getPurchaseDetailPoList())){
			for(PurchaseDetailPo purchaseDetailPo:getData().getPurchaseDetailPoList()){
				//设置外键
				purchaseDetailPo.setParentId(getData().getId());
				purchaseDetailDao.create(purchaseDetailPo);
			}
		}
	}	
	
	/**
	 * 主从表一并删除 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void deleteByIdsCascade(String[] ids){
		for(String id : ids){
			PurchaseDemandPo po = purchaseDemandQueryDao.get(id);
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.getId())){
				purchaseAttachDao.deleteByMainId(po.getId());
			}
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.getId())){
				purchaseDetailDao.deleteByMainId(po.getId());
			}	
		}
		deleteByIds(ids);
	}
	
}
