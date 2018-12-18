package com.lc.ibps.pgs.ZFJD.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.ZFJD.domain.Fenjiedian;
import com.lc.ibps.pgs.ZFJD.repository.FenjiedianRepository;
import com.lc.ibps.pgs.ZFJD.persistence.dao.FenjiedianQueryDao;
import com.lc.ibps.pgs.ZFJD.persistence.entity.FenjiedianPo;

/**
 * t_fenjiedian 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 *</pre>
 */
@Repository
public class FenjiedianRepositoryImpl extends AbstractRepository<String, FenjiedianPo,Fenjiedian> implements FenjiedianRepository{
	  
	@Resource
	private  FenjiedianQueryDao fenjiedianQueryDao;

	public Fenjiedian newInstance() {
		FenjiedianPo po = new FenjiedianPo();
		Fenjiedian fenjiedian = AppUtil.getBean(Fenjiedian.class);
		fenjiedian.setData(po);
		return fenjiedian;
	}

	public Fenjiedian newInstance(FenjiedianPo po) {
		Fenjiedian fenjiedian = AppUtil.getBean(Fenjiedian.class);
		fenjiedian.setData(po);
		return fenjiedian;
	} 
	
	@Override
	protected IQueryDao<String, FenjiedianPo> getQueryDao() {
		return fenjiedianQueryDao;
	}
	

	
}
