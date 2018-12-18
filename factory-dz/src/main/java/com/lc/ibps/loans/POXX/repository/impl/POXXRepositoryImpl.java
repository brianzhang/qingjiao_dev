package com.lc.ibps.loans.POXX.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.POXX.domain.POXX;
import com.lc.ibps.loans.POXX.repository.POXXRepository;
import com.lc.ibps.loans.POXX.persistence.dao.POXXQueryDao;
import com.lc.ibps.loans.POXX.persistence.entity.POXXPo;

/**
 * t_poxxb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:49:27
 *</pre>
 */
@Repository
public class POXXRepositoryImpl extends AbstractRepository<String, POXXPo,POXX> implements POXXRepository{
	  
	@Resource
	private  POXXQueryDao pOXXQueryDao;

	public POXX newInstance() {
		POXXPo po = new POXXPo();
		POXX pOXX = AppUtil.getBean(POXX.class);
		pOXX.setData(po);
		return pOXX;
	}

	public POXX newInstance(POXXPo po) {
		POXX pOXX = AppUtil.getBean(POXX.class);
		pOXX.setData(po);
		return pOXX;
	} 
	
	@Override
	protected IQueryDao<String, POXXPo> getQueryDao() {
		return pOXXQueryDao;
	}
	

	
}
