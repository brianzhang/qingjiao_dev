package com.lc.ibps.loans.kehuInfo.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.kehuInfo.domain.Kefuinfo_All;
import com.lc.ibps.loans.kehuInfo.repository.Kefuinfo_AllRepository;
import com.lc.ibps.loans.kehuInfo.persistence.dao.Kefuinfo_AllQueryDao;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;

/**
 * t_kefuinfo_all 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:07
 *</pre>
 */
@Repository
public class Kefuinfo_AllRepositoryImpl extends AbstractRepository<String, Kefuinfo_AllPo,Kefuinfo_All> implements Kefuinfo_AllRepository{
	  
	@Resource
	private  Kefuinfo_AllQueryDao kefuinfo_AllQueryDao;

	public Kefuinfo_All newInstance() {
		Kefuinfo_AllPo po = new Kefuinfo_AllPo();
		Kefuinfo_All kefuinfo_All = AppUtil.getBean(Kefuinfo_All.class);
		kefuinfo_All.setData(po);
		return kefuinfo_All;
	}

	public Kefuinfo_All newInstance(Kefuinfo_AllPo po) {
		Kefuinfo_All kefuinfo_All = AppUtil.getBean(Kefuinfo_All.class);
		kefuinfo_All.setData(po);
		return kefuinfo_All;
	} 
	
	@Override
	protected IQueryDao<String, Kefuinfo_AllPo> getQueryDao() {
		return kefuinfo_AllQueryDao;
	}
	

	
}
