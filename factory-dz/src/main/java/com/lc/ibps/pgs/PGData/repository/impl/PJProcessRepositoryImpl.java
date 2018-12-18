package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.PJProcess;
import com.lc.ibps.pgs.PGData.repository.PJProcessRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.PJProcessQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJProcessPo;

/**
 * t_p_pjgc 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:42:09
 *</pre>
 */
@Repository
public class PJProcessRepositoryImpl extends AbstractRepository<String, PJProcessPo,PJProcess> implements PJProcessRepository{
	  
	@Resource
	private  PJProcessQueryDao pJProcessQueryDao;

	public PJProcess newInstance() {
		PJProcessPo po = new PJProcessPo();
		PJProcess pJProcess = AppUtil.getBean(PJProcess.class);
		pJProcess.setData(po);
		return pJProcess;
	}

	public PJProcess newInstance(PJProcessPo po) {
		PJProcess pJProcess = AppUtil.getBean(PJProcess.class);
		pJProcess.setData(po);
		return pJProcess;
	} 
	
	@Override
	protected IQueryDao<String, PJProcessPo> getQueryDao() {
		return pJProcessQueryDao;
	}
	

	
}
