package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.Committee;
import com.lc.ibps.pgs.PGData.repository.CommitteeRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.CommitteeQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CommitteePo;

/**
 * t_p_jxyzxwyhmd 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:53:30
 *</pre>
 */
@Repository
public class CommitteeRepositoryImpl extends AbstractRepository<String, CommitteePo,Committee> implements CommitteeRepository{
	  
	@Resource
	private  CommitteeQueryDao committeeQueryDao;

	public Committee newInstance() {
		CommitteePo po = new CommitteePo();
		Committee committee = AppUtil.getBean(Committee.class);
		committee.setData(po);
		return committee;
	}

	public Committee newInstance(CommitteePo po) {
		Committee committee = AppUtil.getBean(Committee.class);
		committee.setData(po);
		return committee;
	} 
	
	@Override
	protected IQueryDao<String, CommitteePo> getQueryDao() {
		return committeeQueryDao;
	}
	

	
}
