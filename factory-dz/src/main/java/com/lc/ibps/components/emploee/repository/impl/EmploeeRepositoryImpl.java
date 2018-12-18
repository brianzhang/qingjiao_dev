package com.lc.ibps.components.emploee.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.emploee.domain.Emploee;
import com.lc.ibps.components.emploee.repository.EmploeeRepository;
import com.lc.ibps.components.emploee.persistence.dao.EmploeeQueryDao;
import com.lc.ibps.components.emploee.persistence.entity.EmploeePo;

/**
 * t_ry 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 14:06:36
 *</pre>
 */
@Repository
public class EmploeeRepositoryImpl extends AbstractRepository<String, EmploeePo,Emploee> implements EmploeeRepository{
	  
	@Resource
	private  EmploeeQueryDao emploeeQueryDao;

	public Emploee newInstance() {
		EmploeePo po = new EmploeePo();
		Emploee emploee = AppUtil.getBean(Emploee.class);
		emploee.setData(po);
		return emploee;
	}

	public Emploee newInstance(EmploeePo po) {
		Emploee emploee = AppUtil.getBean(Emploee.class);
		emploee.setData(po);
		return emploee;
	} 
	
	@Override
	protected IQueryDao<String, EmploeePo> getQueryDao() {
		return emploeeQueryDao;
	}
	

	
}
