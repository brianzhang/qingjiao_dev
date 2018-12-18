package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.TargetFBSource;
import com.lc.ibps.pgs.PGData.repository.TargetFBSourceRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetFBSourceQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetFBSourcePo;

/**
 * t_p_fkyjsjly 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:06:24
 *</pre>
 */
@Repository
public class TargetFBSourceRepositoryImpl extends AbstractRepository<String, TargetFBSourcePo,TargetFBSource> implements TargetFBSourceRepository{
	  
	@Resource
	private  TargetFBSourceQueryDao targetFBSourceQueryDao;

	public TargetFBSource newInstance() {
		TargetFBSourcePo po = new TargetFBSourcePo();
		TargetFBSource targetFBSource = AppUtil.getBean(TargetFBSource.class);
		targetFBSource.setData(po);
		return targetFBSource;
	}

	public TargetFBSource newInstance(TargetFBSourcePo po) {
		TargetFBSource targetFBSource = AppUtil.getBean(TargetFBSource.class);
		targetFBSource.setData(po);
		return targetFBSource;
	} 
	
	@Override
	protected IQueryDao<String, TargetFBSourcePo> getQueryDao() {
		return targetFBSourceQueryDao;
	}
	

	
}
