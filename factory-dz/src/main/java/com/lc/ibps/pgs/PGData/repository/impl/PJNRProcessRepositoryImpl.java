package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.PJNRProcess;
import com.lc.ibps.pgs.PGData.repository.PJNRProcessRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.PJNRProcessQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJNRProcessPo;

/**
 * t_p_byyqpjnrygc 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 14:28:47
 *</pre>
 */
@Repository
public class PJNRProcessRepositoryImpl extends AbstractRepository<String, PJNRProcessPo,PJNRProcess> implements PJNRProcessRepository{
	  
	@Resource
	private  PJNRProcessQueryDao pJNRProcessQueryDao;

	public PJNRProcess newInstance() {
		PJNRProcessPo po = new PJNRProcessPo();
		PJNRProcess pJNRProcess = AppUtil.getBean(PJNRProcess.class);
		pJNRProcess.setData(po);
		return pJNRProcess;
	}

	public PJNRProcess newInstance(PJNRProcessPo po) {
		PJNRProcess pJNRProcess = AppUtil.getBean(PJNRProcess.class);
		pJNRProcess.setData(po);
		return pJNRProcess;
	} 
	
	@Override
	protected IQueryDao<String, PJNRProcessPo> getQueryDao() {
		return pJNRProcessQueryDao;
	}
	

	
}
