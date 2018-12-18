package com.lc.ibps.repair.bxhcb.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.repair.bxhcb.domain.Bxhcb;
import com.lc.ibps.repair.bxhcb.repository.BxhcbRepository;
import com.lc.ibps.repair.bxhcb.persistence.dao.BxhcbQueryDao;
import com.lc.ibps.repair.bxhcb.persistence.entity.BxhcbPo;

/**
 * t_bxhcb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
@Repository
public class BxhcbRepositoryImpl extends AbstractRepository<String, BxhcbPo,Bxhcb> implements BxhcbRepository{
	  
	@Resource
	private  BxhcbQueryDao bxhcbQueryDao;

	public Bxhcb newInstance() {
		BxhcbPo po = new BxhcbPo();
		Bxhcb bxhcb = AppUtil.getBean(Bxhcb.class);
		bxhcb.setData(po);
		return bxhcb;
	}

	public Bxhcb newInstance(BxhcbPo po) {
		Bxhcb bxhcb = AppUtil.getBean(Bxhcb.class);
		bxhcb.setData(po);
		return bxhcb;
	} 
	
	@Override
	protected IQueryDao<String, BxhcbPo> getQueryDao() {
		return bxhcbQueryDao;
	}
	

	
}
