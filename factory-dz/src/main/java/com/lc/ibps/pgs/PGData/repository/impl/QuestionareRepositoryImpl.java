package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.Questionare;
import com.lc.ibps.pgs.PGData.repository.QuestionareRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.QuestionareQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QuestionarePo;

/**
 * t_dcwj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:45
 *</pre>
 */
@Repository
public class QuestionareRepositoryImpl extends AbstractRepository<String, QuestionarePo,Questionare> implements QuestionareRepository{
	  
	@Resource
	private  QuestionareQueryDao questionareQueryDao;

	public Questionare newInstance() {
		QuestionarePo po = new QuestionarePo();
		Questionare questionare = AppUtil.getBean(Questionare.class);
		questionare.setData(po);
		return questionare;
	}

	public Questionare newInstance(QuestionarePo po) {
		Questionare questionare = AppUtil.getBean(Questionare.class);
		questionare.setData(po);
		return questionare;
	} 
	
	@Override
	protected IQueryDao<String, QuestionarePo> getQueryDao() {
		return questionareQueryDao;
	}
	

	
}
