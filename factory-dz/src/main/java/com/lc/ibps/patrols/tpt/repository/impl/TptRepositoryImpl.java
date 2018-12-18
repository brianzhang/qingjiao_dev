package com.lc.ibps.patrols.tpt.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.tpt.domain.Tpt;
import com.lc.ibps.patrols.tpt.repository.TptRepository;
import com.lc.ibps.patrols.tpt.persistence.dao.TptQueryDao;
import com.lc.ibps.patrols.tpt.persistence.entity.TptPo;

/**
 * t_tpt 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 11:39:03
 *</pre>
 */
@Repository
public class TptRepositoryImpl extends AbstractRepository<String, TptPo,Tpt> implements TptRepository{
	  
	@Resource
	private  TptQueryDao tptQueryDao;

	public Tpt newInstance() {
		TptPo po = new TptPo();
		Tpt tpt = AppUtil.getBean(Tpt.class);
		tpt.setData(po);
		return tpt;
	}

	public Tpt newInstance(TptPo po) {
		Tpt tpt = AppUtil.getBean(Tpt.class);
		tpt.setData(po);
		return tpt;
	} 
	
	@Override
	protected IQueryDao<String, TptPo> getQueryDao() {
		return tptQueryDao;
	}
	

	
}
