package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.TargetDataSource;
import com.lc.ibps.pgs.PGData.repository.TargetDataSourceRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetDataSourceQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetDataSourcePo;

/**
 * t_p_pymbhlxpjsjly 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
@Repository
public class TargetDataSourceRepositoryImpl extends AbstractRepository<String, TargetDataSourcePo,TargetDataSource> implements TargetDataSourceRepository{
	  
	@Resource
	private  TargetDataSourceQueryDao targetDataSourceQueryDao;

	public TargetDataSource newInstance() {
		TargetDataSourcePo po = new TargetDataSourcePo();
		TargetDataSource targetDataSource = AppUtil.getBean(TargetDataSource.class);
		targetDataSource.setData(po);
		return targetDataSource;
	}

	public TargetDataSource newInstance(TargetDataSourcePo po) {
		TargetDataSource targetDataSource = AppUtil.getBean(TargetDataSource.class);
		targetDataSource.setData(po);
		return targetDataSource;
	} 
	
	@Override
	protected IQueryDao<String, TargetDataSourcePo> getQueryDao() {
		return targetDataSourceQueryDao;
	}
	

	
}
