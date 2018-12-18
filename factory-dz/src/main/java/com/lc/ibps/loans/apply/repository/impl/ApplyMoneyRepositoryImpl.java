package com.lc.ibps.loans.apply.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.apply.domain.ApplyMoney;
import com.lc.ibps.loans.apply.repository.ApplyMoneyRepository;
import com.lc.ibps.loans.apply.persistence.dao.ApplyMoneyQueryDao;
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;

/**
 * t_jiedai 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:37:03
 *</pre>
 */
@Repository
public class ApplyMoneyRepositoryImpl extends AbstractRepository<String, ApplyMoneyPo,ApplyMoney> implements ApplyMoneyRepository{
	  
	@Resource
	private  ApplyMoneyQueryDao applyMoneyQueryDao;

	public ApplyMoney newInstance() {
		ApplyMoneyPo po = new ApplyMoneyPo();
		ApplyMoney applyMoney = AppUtil.getBean(ApplyMoney.class);
		applyMoney.setData(po);
		return applyMoney;
	}

	public ApplyMoney newInstance(ApplyMoneyPo po) {
		ApplyMoney applyMoney = AppUtil.getBean(ApplyMoney.class);
		applyMoney.setData(po);
		return applyMoney;
	} 
	
	@Override
	protected IQueryDao<String, ApplyMoneyPo> getQueryDao() {
		return applyMoneyQueryDao;
	}
	

	
}
