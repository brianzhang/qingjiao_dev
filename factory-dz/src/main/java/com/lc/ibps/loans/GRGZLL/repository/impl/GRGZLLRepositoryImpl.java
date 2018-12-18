package com.lc.ibps.loans.GRGZLL.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.GRGZLL.domain.GRGZLL;
import com.lc.ibps.loans.GRGZLL.repository.GRGZLLRepository;
import com.lc.ibps.loans.GRGZLL.persistence.dao.GRGZLLQueryDao;
import com.lc.ibps.loans.GRGZLL.persistence.entity.GRGZLLPo;

/**
 * t_grll 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:01
 *</pre>
 */
@Repository
public class GRGZLLRepositoryImpl extends AbstractRepository<String, GRGZLLPo,GRGZLL> implements GRGZLLRepository{
	  
	@Resource
	private  GRGZLLQueryDao gRGZLLQueryDao;

	public GRGZLL newInstance() {
		GRGZLLPo po = new GRGZLLPo();
		GRGZLL gRGZLL = AppUtil.getBean(GRGZLL.class);
		gRGZLL.setData(po);
		return gRGZLL;
	}

	public GRGZLL newInstance(GRGZLLPo po) {
		GRGZLL gRGZLL = AppUtil.getBean(GRGZLL.class);
		gRGZLL.setData(po);
		return gRGZLL;
	} 
	
	@Override
	protected IQueryDao<String, GRGZLLPo> getQueryDao() {
		return gRGZLLQueryDao;
	}
	

	
}
