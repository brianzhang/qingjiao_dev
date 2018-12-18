
package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

import com.lc.ibps.demo.codegen.repository.PurchaseDetailRepository;
import javax.annotation.Resource;

/**
 * t_purchasedetaillist 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class PurchaseDetail extends AbstractDomain<String, PurchaseDetailPo>{
	 
	private PurchaseDetailDao purchaseDetailDao = null;
	private PurchaseDetailQueryDao purchaseDetailQueryDao = null;


	protected void init(){
		purchaseDetailDao = AppUtil.getBean(PurchaseDetailDao.class);
		purchaseDetailQueryDao = AppUtil.getBean(PurchaseDetailQueryDao.class);
		this.setDao(purchaseDetailDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(purchaseDetailQueryDao.get(getId())));
	}
	
	
}
