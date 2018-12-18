package com.lc.ibps.pgs.Crsoutline.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Crsoutline.domain.Crsoutline;
import com.lc.ibps.pgs.Crsoutline.repository.CrsoutlineRepository;
import com.lc.ibps.pgs.Crsoutline.persistence.dao.CrsoutlineQueryDao;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;

/**
 * t_t_crs_outline 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 *</pre>
 */
@Repository
public class CrsoutlineRepositoryImpl extends AbstractRepository<String, CrsoutlinePo,Crsoutline> implements CrsoutlineRepository{
	  
	@Resource
	private  CrsoutlineQueryDao crsoutlineQueryDao;

	public Crsoutline newInstance() {
		CrsoutlinePo po = new CrsoutlinePo();
		Crsoutline crsoutline = AppUtil.getBean(Crsoutline.class);
		crsoutline.setData(po);
		return crsoutline;
	}

	public Crsoutline newInstance(CrsoutlinePo po) {
		Crsoutline crsoutline = AppUtil.getBean(Crsoutline.class);
		crsoutline.setData(po);
		return crsoutline;
	} 
	
	@Override
	protected IQueryDao<String, CrsoutlinePo> getQueryDao() {
		return crsoutlineQueryDao;
	}
	

	
}
