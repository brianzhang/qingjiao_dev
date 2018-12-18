package com.lc.ibps.loans.bzrAll.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.bzrAll.domain.BaoZhengRenAll;
import com.lc.ibps.loans.bzrAll.repository.BaoZhengRenAllRepository;
import com.lc.ibps.loans.bzrAll.persistence.dao.BaoZhengRenAllQueryDao;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;

/**
 * t_bzr_all 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
@Repository
public class BaoZhengRenAllRepositoryImpl extends AbstractRepository<String, BaoZhengRenAllPo,BaoZhengRenAll> implements BaoZhengRenAllRepository{
	  
	@Resource
	private  BaoZhengRenAllQueryDao baoZhengRenAllQueryDao;

	public BaoZhengRenAll newInstance() {
		BaoZhengRenAllPo po = new BaoZhengRenAllPo();
		BaoZhengRenAll baoZhengRenAll = AppUtil.getBean(BaoZhengRenAll.class);
		baoZhengRenAll.setData(po);
		return baoZhengRenAll;
	}

	public BaoZhengRenAll newInstance(BaoZhengRenAllPo po) {
		BaoZhengRenAll baoZhengRenAll = AppUtil.getBean(BaoZhengRenAll.class);
		baoZhengRenAll.setData(po);
		return baoZhengRenAll;
	} 
	
	@Override
	protected IQueryDao<String, BaoZhengRenAllPo> getQueryDao() {
		return baoZhengRenAllQueryDao;
	}
	

	
}
