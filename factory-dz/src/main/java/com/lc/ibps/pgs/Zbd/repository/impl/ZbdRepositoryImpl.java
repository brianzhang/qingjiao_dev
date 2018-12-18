package com.lc.ibps.pgs.Zbd.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Zbd.domain.Zbd;
import com.lc.ibps.pgs.Zbd.repository.ZbdRepository;
import com.lc.ibps.pgs.Zbd.persistence.dao.ZbdQueryDao;
import com.lc.ibps.pgs.Zbd.persistence.entity.ZbdPo;

/**
 * t_zbd 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 *</pre>
 */
@Repository
public class ZbdRepositoryImpl extends AbstractRepository<String, ZbdPo,Zbd> implements ZbdRepository{
	  
	@Resource
	private  ZbdQueryDao zbdQueryDao;

	public Zbd newInstance() {
		ZbdPo po = new ZbdPo();
		Zbd zbd = AppUtil.getBean(Zbd.class);
		zbd.setData(po);
		return zbd;
	}

	public Zbd newInstance(ZbdPo po) {
		Zbd zbd = AppUtil.getBean(Zbd.class);
		zbd.setData(po);
		return zbd;
	} 
	
	@Override
	protected IQueryDao<String, ZbdPo> getQueryDao() {
		return zbdQueryDao;
	}
	

	
}
