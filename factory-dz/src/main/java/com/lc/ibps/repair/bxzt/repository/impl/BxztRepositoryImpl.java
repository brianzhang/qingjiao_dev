package com.lc.ibps.repair.bxzt.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.repair.bxzt.domain.Bxzt;
import com.lc.ibps.repair.bxzt.repository.BxztRepository;
import com.lc.ibps.repair.bxzt.persistence.dao.BxztQueryDao;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;

/**
 * t_bxzt 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
@Repository
public class BxztRepositoryImpl extends AbstractRepository<String, BxztPo,Bxzt> implements BxztRepository{
	  
	@Resource
	private  BxztQueryDao bxztQueryDao;

	public Bxzt newInstance() {
		BxztPo po = new BxztPo();
		Bxzt bxzt = AppUtil.getBean(Bxzt.class);
		bxzt.setData(po);
		return bxzt;
	}

	public Bxzt newInstance(BxztPo po) {
		Bxzt bxzt = AppUtil.getBean(Bxzt.class);
		bxzt.setData(po);
		return bxzt;
	} 
	
	@Override
	protected IQueryDao<String, BxztPo> getQueryDao() {
		return bxztQueryDao;
	}

	@Override
	public List<BxztPo> getByBxdId(String bxdId) {
		// TODO Auto-generated method stub
		return bxztQueryDao.getByBxdId(bxdId);
	}
	

	
}
