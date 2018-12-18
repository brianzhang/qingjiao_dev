package com.lc.ibps.pgs.DataSs.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.DataSs.domain.DataSs;
import com.lc.ibps.pgs.DataSs.repository.DataSsRepository;
import com.lc.ibps.pgs.DataSs.persistence.dao.DataSsQueryDao;
import com.lc.ibps.pgs.DataSs.persistence.entity.DataSsPo;

/**
 * t_sjly 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 17:12:48
 *</pre>
 */
@Repository
public class DataSsRepositoryImpl extends AbstractRepository<String, DataSsPo,DataSs> implements DataSsRepository{
	  
	@Resource
	private  DataSsQueryDao dataSsQueryDao;

	public DataSs newInstance() {
		DataSsPo po = new DataSsPo();
		DataSs dataSs = AppUtil.getBean(DataSs.class);
		dataSs.setData(po);
		return dataSs;
	}

	public DataSs newInstance(DataSsPo po) {
		DataSs dataSs = AppUtil.getBean(DataSs.class);
		dataSs.setData(po);
		return dataSs;
	} 
	
	@Override
	protected IQueryDao<String, DataSsPo> getQueryDao() {
		return dataSsQueryDao;
	}
	

	
}
