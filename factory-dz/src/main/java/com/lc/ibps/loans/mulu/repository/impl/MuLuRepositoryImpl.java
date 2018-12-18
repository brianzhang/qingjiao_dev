package com.lc.ibps.loans.mulu.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.mulu.domain.MuLu;
import com.lc.ibps.loans.mulu.repository.MuLuRepository;
import com.lc.ibps.loans.mulu.persistence.dao.MuLuQueryDao;
import com.lc.ibps.loans.mulu.persistence.entity.MuLuPo;

/**
 * t_mlsl 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:42
 *</pre>
 */
@Repository
public class MuLuRepositoryImpl extends AbstractRepository<String, MuLuPo,MuLu> implements MuLuRepository{
	  
	@Resource
	private  MuLuQueryDao muLuQueryDao;

	public MuLu newInstance() {
		MuLuPo po = new MuLuPo();
		MuLu muLu = AppUtil.getBean(MuLu.class);
		muLu.setData(po);
		return muLu;
	}

	public MuLu newInstance(MuLuPo po) {
		MuLu muLu = AppUtil.getBean(MuLu.class);
		muLu.setData(po);
		return muLu;
	} 
	
	@Override
	protected IQueryDao<String, MuLuPo> getQueryDao() {
		return muLuQueryDao;
	}
	

	
}
