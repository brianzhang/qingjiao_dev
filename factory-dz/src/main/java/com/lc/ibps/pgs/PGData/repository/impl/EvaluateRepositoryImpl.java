package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.Evaluate;
import com.lc.ibps.pgs.PGData.repository.EvaluateRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.EvaluateQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.EvaluatePo;

/**
 * t_p_khhlxpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-21 16:01:36
 *</pre>
 */
@Repository
public class EvaluateRepositoryImpl extends AbstractRepository<String, EvaluatePo,Evaluate> implements EvaluateRepository{
	  
	@Resource
	private  EvaluateQueryDao evaluateQueryDao;

	public Evaluate newInstance() {
		EvaluatePo po = new EvaluatePo();
		Evaluate evaluate = AppUtil.getBean(Evaluate.class);
		evaluate.setData(po);
		return evaluate;
	}

	public Evaluate newInstance(EvaluatePo po) {
		Evaluate evaluate = AppUtil.getBean(Evaluate.class);
		evaluate.setData(po);
		return evaluate;
	} 
	
	@Override
	protected IQueryDao<String, EvaluatePo> getQueryDao() {
		return evaluateQueryDao;
	}
	

	
}
