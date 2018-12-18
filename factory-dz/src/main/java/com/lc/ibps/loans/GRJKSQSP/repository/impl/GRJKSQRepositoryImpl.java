package com.lc.ibps.loans.GRJKSQSP.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.GRJKSQSP.domain.GRJKSQ;
import com.lc.ibps.loans.GRJKSQSP.repository.GRJKSQRepository;
import com.lc.ibps.loans.GRJKSQSP.persistence.dao.GRJKSQQueryDao;
import com.lc.ibps.loans.GRJKSQSP.persistence.entity.GRJKSQPo;

/**
 * t_grjksqspb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:47:43
 *</pre>
 */
@Repository
public class GRJKSQRepositoryImpl extends AbstractRepository<String, GRJKSQPo,GRJKSQ> implements GRJKSQRepository{
	  
	@Resource
	private  GRJKSQQueryDao gRJKSQQueryDao;

	public GRJKSQ newInstance() {
		GRJKSQPo po = new GRJKSQPo();
		GRJKSQ gRJKSQ = AppUtil.getBean(GRJKSQ.class);
		gRJKSQ.setData(po);
		return gRJKSQ;
	}

	public GRJKSQ newInstance(GRJKSQPo po) {
		GRJKSQ gRJKSQ = AppUtil.getBean(GRJKSQ.class);
		gRJKSQ.setData(po);
		return gRJKSQ;
	} 
	
	@Override
	protected IQueryDao<String, GRJKSQPo> getQueryDao() {
		return gRJKSQQueryDao;
	}
	

	
}
