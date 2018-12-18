package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.PJObject;
import com.lc.ibps.pgs.PGData.repository.PJObjectRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.PJObjectQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJObjectPo;

/**
 * t_p_pjdx 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
@Repository
public class PJObjectRepositoryImpl extends AbstractRepository<String, PJObjectPo,PJObject> implements PJObjectRepository{
	  
	@Resource
	private  PJObjectQueryDao pJObjectQueryDao;

	public PJObject newInstance() {
		PJObjectPo po = new PJObjectPo();
		PJObject pJObject = AppUtil.getBean(PJObject.class);
		pJObject.setData(po);
		return pJObject;
	}

	public PJObject newInstance(PJObjectPo po) {
		PJObject pJObject = AppUtil.getBean(PJObject.class);
		pJObject.setData(po);
		return pJObject;
	} 
	
	@Override
	protected IQueryDao<String, PJObjectPo> getQueryDao() {
		return pJObjectQueryDao;
	}
	

	
}
