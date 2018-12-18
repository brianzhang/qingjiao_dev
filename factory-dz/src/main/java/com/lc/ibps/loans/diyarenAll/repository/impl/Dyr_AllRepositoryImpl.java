package com.lc.ibps.loans.diyarenAll.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.diyarenAll.domain.Dyr_All;
import com.lc.ibps.loans.diyarenAll.repository.Dyr_AllRepository;
import com.lc.ibps.loans.diyarenAll.persistence.dao.Dyr_AllQueryDao;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;

/**
 * t_dyr_all 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 07:50:38
 *</pre>
 */
@Repository
public class Dyr_AllRepositoryImpl extends AbstractRepository<String, Dyr_AllPo,Dyr_All> implements Dyr_AllRepository{
	  
	@Resource
	private  Dyr_AllQueryDao dyr_AllQueryDao;

	public Dyr_All newInstance() {
		Dyr_AllPo po = new Dyr_AllPo();
		Dyr_All dyr_All = AppUtil.getBean(Dyr_All.class);
		dyr_All.setData(po);
		return dyr_All;
	}

	public Dyr_All newInstance(Dyr_AllPo po) {
		Dyr_All dyr_All = AppUtil.getBean(Dyr_All.class);
		dyr_All.setData(po);
		return dyr_All;
	} 
	
	@Override
	protected IQueryDao<String, Dyr_AllPo> getQueryDao() {
		return dyr_AllQueryDao;
	}
	

	
}
