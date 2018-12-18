package com.lc.ibps.loans.danbaoCompany_All.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.danbaoCompany_All.domain.DanBaoCompany_all;
import com.lc.ibps.loans.danbaoCompany_All.repository.DanBaoCompany_allRepository;
import com.lc.ibps.loans.danbaoCompany_All.persistence.dao.DanBaoCompany_allQueryDao;
import com.lc.ibps.loans.danbaoCompany_All.persistence.entity.DanBaoCompany_allPo;

/**
 * t_danbaocompany_all 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
@Repository
public class DanBaoCompany_allRepositoryImpl extends AbstractRepository<String, DanBaoCompany_allPo,DanBaoCompany_all> implements DanBaoCompany_allRepository{
	  
	@Resource
	private  DanBaoCompany_allQueryDao danBaoCompany_allQueryDao;

	public DanBaoCompany_all newInstance() {
		DanBaoCompany_allPo po = new DanBaoCompany_allPo();
		DanBaoCompany_all danBaoCompany_all = AppUtil.getBean(DanBaoCompany_all.class);
		danBaoCompany_all.setData(po);
		return danBaoCompany_all;
	}

	public DanBaoCompany_all newInstance(DanBaoCompany_allPo po) {
		DanBaoCompany_all danBaoCompany_all = AppUtil.getBean(DanBaoCompany_all.class);
		danBaoCompany_all.setData(po);
		return danBaoCompany_all;
	} 
	
	@Override
	protected IQueryDao<String, DanBaoCompany_allPo> getQueryDao() {
		return danBaoCompany_allQueryDao;
	}
	

	
}
