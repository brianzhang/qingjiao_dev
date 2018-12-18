package com.lc.ibps.loans.ZYXX.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.ZYXX.domain.ZYXXB;
import com.lc.ibps.loans.ZYXX.repository.ZYXXBRepository;
import com.lc.ibps.loans.ZYXX.persistence.dao.ZYXXBQueryDao;
import com.lc.ibps.loans.ZYXX.persistence.entity.ZYXXBPo;

/**
 * t_zyxxb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:55:18
 *</pre>
 */
@Repository
public class ZYXXBRepositoryImpl extends AbstractRepository<String, ZYXXBPo,ZYXXB> implements ZYXXBRepository{
	  
	@Resource
	private  ZYXXBQueryDao zYXXBQueryDao;

	public ZYXXB newInstance() {
		ZYXXBPo po = new ZYXXBPo();
		ZYXXB zYXXB = AppUtil.getBean(ZYXXB.class);
		zYXXB.setData(po);
		return zYXXB;
	}

	public ZYXXB newInstance(ZYXXBPo po) {
		ZYXXB zYXXB = AppUtil.getBean(ZYXXB.class);
		zYXXB.setData(po);
		return zYXXB;
	} 
	
	@Override
	protected IQueryDao<String, ZYXXBPo> getQueryDao() {
		return zYXXBQueryDao;
	}
	

	
}
