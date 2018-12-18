package com.lc.ibps.pgs.Report.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Report.domain.Flaction;
import com.lc.ibps.pgs.Report.repository.FlactionRepository;
import com.lc.ibps.pgs.Report.persistence.dao.FlactionQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.FlactionPo;

/**
 * t_p_ysqk 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 13:55:55
 *</pre>
 */
@Repository
public class FlactionRepositoryImpl extends AbstractRepository<String, FlactionPo,Flaction> implements FlactionRepository{
	  
	@Resource
	private  FlactionQueryDao flactionQueryDao;

	public Flaction newInstance() {
		FlactionPo po = new FlactionPo();
		Flaction flaction = AppUtil.getBean(Flaction.class);
		flaction.setData(po);
		return flaction;
	}

	public Flaction newInstance(FlactionPo po) {
		Flaction flaction = AppUtil.getBean(Flaction.class);
		flaction.setData(po);
		return flaction;
	} 
	
	@Override
	protected IQueryDao<String, FlactionPo> getQueryDao() {
		return flactionQueryDao;
	}
	

	
}
