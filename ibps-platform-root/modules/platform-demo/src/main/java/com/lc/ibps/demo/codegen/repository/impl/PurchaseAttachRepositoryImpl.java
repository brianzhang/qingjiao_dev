
package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.PurchaseAttach;
import com.lc.ibps.demo.codegen.repository.PurchaseAttachRepository;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

/**
 * 采购需求附件 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@Repository
public class PurchaseAttachRepositoryImpl extends AbstractRepository<String, PurchaseAttachPo,PurchaseAttach> implements PurchaseAttachRepository{
	  
	@Resource
	private  PurchaseAttachQueryDao purchaseAttachQueryDao;

	public PurchaseAttach newInstance() {
		PurchaseAttachPo po = new PurchaseAttachPo();
		PurchaseAttach purchaseAttach = AppUtil.getBean(PurchaseAttach.class);
		purchaseAttach.setData(po);
		return purchaseAttach;
	}

	public PurchaseAttach newInstance(PurchaseAttachPo po) {
		PurchaseAttach purchaseAttach = AppUtil.getBean(PurchaseAttach.class);
		purchaseAttach.setData(po);
		return purchaseAttach;
	} 
	
	@Override
	protected IQueryDao<String, PurchaseAttachPo> getQueryDao() {
		return purchaseAttachQueryDao;
	}
	
	@Override
	public List<PurchaseAttachPo> findByMainId(String mainId) {
		return purchaseAttachQueryDao.findByMainId(mainId);
	}

	
}
