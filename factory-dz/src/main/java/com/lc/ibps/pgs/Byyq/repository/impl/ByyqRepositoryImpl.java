package com.lc.ibps.pgs.Byyq.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Byyq.domain.Byyq;
import com.lc.ibps.pgs.Byyq.repository.ByyqRepository;
import com.lc.ibps.pgs.Byyq.persistence.dao.ByyqQueryDao;
import com.lc.ibps.pgs.Byyq.persistence.entity.ByyqPo;

/**
 * t_byyq 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:46
 *</pre>
 */
@Repository
public class ByyqRepositoryImpl extends AbstractRepository<String, ByyqPo,Byyq> implements ByyqRepository{
	  
	@Resource
	private  ByyqQueryDao byyqQueryDao;

	public Byyq newInstance() {
		ByyqPo po = new ByyqPo();
		Byyq byyq = AppUtil.getBean(Byyq.class);
		byyq.setData(po);
		return byyq;
	}

	public Byyq newInstance(ByyqPo po) {
		Byyq byyq = AppUtil.getBean(Byyq.class);
		byyq.setData(po);
		return byyq;
	} 
	
	@Override
	protected IQueryDao<String, ByyqPo> getQueryDao() {
		return byyqQueryDao;
	}
	

	
}
