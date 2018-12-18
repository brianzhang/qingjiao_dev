package com.lc.ibps.pgs.Pymb.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Pymb.domain.Pymb;
import com.lc.ibps.pgs.Pymb.repository.PymbRepository;
import com.lc.ibps.pgs.Pymb.persistence.dao.PymbQueryDao;
import com.lc.ibps.pgs.Pymb.persistence.entity.PymbPo;

/**
 * t_pymb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:25
 *</pre>
 */
@Repository
public class PymbRepositoryImpl extends AbstractRepository<String, PymbPo,Pymb> implements PymbRepository{
	  
	@Resource
	private  PymbQueryDao pymbQueryDao;

	public Pymb newInstance() {
		PymbPo po = new PymbPo();
		Pymb pymb = AppUtil.getBean(Pymb.class);
		pymb.setData(po);
		return pymb;
	}

	public Pymb newInstance(PymbPo po) {
		Pymb pymb = AppUtil.getBean(Pymb.class);
		pymb.setData(po);
		return pymb;
	} 
	
	@Override
	protected IQueryDao<String, PymbPo> getQueryDao() {
		return pymbQueryDao;
	}
	

	
}
