
package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;

import com.lc.ibps.demo.codegen.repository.PurchaseAttachRepository;
import javax.annotation.Resource;

/**
 * 采购需求附件 领域对象实体
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
public class PurchaseAttach extends AbstractDomain<String, PurchaseAttachPo>{
	 
	private PurchaseAttachDao purchaseAttachDao = null;
	private PurchaseAttachQueryDao purchaseAttachQueryDao = null;


	protected void init(){
		purchaseAttachDao = AppUtil.getBean(PurchaseAttachDao.class);
		purchaseAttachQueryDao = AppUtil.getBean(PurchaseAttachQueryDao.class);
		this.setDao(purchaseAttachDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(purchaseAttachQueryDao.get(getId())));
	}
	
	
}
