package com.lc.ibps.loans.GTGSHXX.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.GTGSHXX.domain.GTGSHXX;
import com.lc.ibps.loans.GTGSHXX.repository.GTGSHXXRepository;
import com.lc.ibps.loans.GTGSHXX.persistence.dao.GTGSHXXQueryDao;
import com.lc.ibps.loans.GTGSHXX.persistence.entity.GTGSHXXPo;

/**
 * t_gtgshxxb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:47
 *</pre>
 */
@Repository
public class GTGSHXXRepositoryImpl extends AbstractRepository<String, GTGSHXXPo,GTGSHXX> implements GTGSHXXRepository{
	  
	@Resource
	private  GTGSHXXQueryDao gTGSHXXQueryDao;

	public GTGSHXX newInstance() {
		GTGSHXXPo po = new GTGSHXXPo();
		GTGSHXX gTGSHXX = AppUtil.getBean(GTGSHXX.class);
		gTGSHXX.setData(po);
		return gTGSHXX;
	}

	public GTGSHXX newInstance(GTGSHXXPo po) {
		GTGSHXX gTGSHXX = AppUtil.getBean(GTGSHXX.class);
		gTGSHXX.setData(po);
		return gTGSHXX;
	} 
	
	@Override
	protected IQueryDao<String, GTGSHXXPo> getQueryDao() {
		return gTGSHXXQueryDao;
	}
	

	
}
