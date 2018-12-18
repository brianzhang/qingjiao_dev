
package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.PurchaseDetail;
import com.lc.ibps.demo.codegen.repository.PurchaseDetailRepository;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * t_purchasedetaillist 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@Repository
public class PurchaseDetailRepositoryImpl extends AbstractRepository<String, PurchaseDetailPo,PurchaseDetail> implements PurchaseDetailRepository{
	  
	@Resource
	private  PurchaseDetailQueryDao purchaseDetailQueryDao;

	public PurchaseDetail newInstance() {
		PurchaseDetailPo po = new PurchaseDetailPo();
		PurchaseDetail purchaseDetail = AppUtil.getBean(PurchaseDetail.class);
		purchaseDetail.setData(po);
		return purchaseDetail;
	}

	public PurchaseDetail newInstance(PurchaseDetailPo po) {
		PurchaseDetail purchaseDetail = AppUtil.getBean(PurchaseDetail.class);
		purchaseDetail.setData(po);
		return purchaseDetail;
	} 
	
	@Override
	protected IQueryDao<String, PurchaseDetailPo> getQueryDao() {
		return purchaseDetailQueryDao;
	}
	
	@Override
	public List<PurchaseDetailPo> findByMainId(String mainId) {
		return purchaseDetailQueryDao.findByMainId(mainId);
	}

	
}
