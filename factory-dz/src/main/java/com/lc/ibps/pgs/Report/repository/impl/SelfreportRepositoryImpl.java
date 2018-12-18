package com.lc.ibps.pgs.Report.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Report.domain.Selfreport;
import com.lc.ibps.pgs.Report.repository.SelfreportRepository;
import com.lc.ibps.pgs.Report.persistence.dao.SelfreportQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.SelfreportPo;

/**
 * t_zpbgdemo 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-14 10:27:15
 *</pre>
 */
@Repository
public class SelfreportRepositoryImpl extends AbstractRepository<String, SelfreportPo,Selfreport> implements SelfreportRepository{
	  
	@Resource
	private  SelfreportQueryDao selfreportQueryDao;

	public Selfreport newInstance() {
		SelfreportPo po = new SelfreportPo();
		Selfreport selfreport = AppUtil.getBean(Selfreport.class);
		selfreport.setData(po);
		return selfreport;
	}

	public Selfreport newInstance(SelfreportPo po) {
		Selfreport selfreport = AppUtil.getBean(Selfreport.class);
		selfreport.setData(po);
		return selfreport;
	} 
	
	@Override
	protected IQueryDao<String, SelfreportPo> getQueryDao() {
		return selfreportQueryDao;
	}
	

	
}
