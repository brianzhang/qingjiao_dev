package com.lc.ibps.pgs.PingJia.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PingJia.domain.PingJia;
import com.lc.ibps.pgs.PingJia.repository.PingJiaRepository;
import com.lc.ibps.pgs.PingJia.persistence.dao.PingJiaQueryDao;
import com.lc.ibps.pgs.PingJia.persistence.entity.PingJiaPo;

/**
 * t_pymbpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:18:49
 *</pre>
 */
@Repository
public class PingJiaRepositoryImpl extends AbstractRepository<String, PingJiaPo,PingJia> implements PingJiaRepository{
	  
	@Resource
	private  PingJiaQueryDao pingJiaQueryDao;

	public PingJia newInstance() {
		PingJiaPo po = new PingJiaPo();
		PingJia pingJia = AppUtil.getBean(PingJia.class);
		pingJia.setData(po);
		return pingJia;
	}

	public PingJia newInstance(PingJiaPo po) {
		PingJia pingJia = AppUtil.getBean(PingJia.class);
		pingJia.setData(po);
		return pingJia;
	} 
	
	@Override
	protected IQueryDao<String, PingJiaPo> getQueryDao() {
		return pingJiaQueryDao;
	}
	

	
}
