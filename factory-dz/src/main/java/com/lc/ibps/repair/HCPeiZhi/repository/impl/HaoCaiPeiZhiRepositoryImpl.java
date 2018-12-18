package com.lc.ibps.repair.HCPeiZhi.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.repair.HCPeiZhi.domain.HaoCaiPeiZhi;
import com.lc.ibps.repair.HCPeiZhi.repository.HaoCaiPeiZhiRepository;
import com.lc.ibps.repair.HCPeiZhi.persistence.dao.HaoCaiPeiZhiQueryDao;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;

/**
 * t_hcpz 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:38:59
 *</pre>
 */
@Repository
public class HaoCaiPeiZhiRepositoryImpl extends AbstractRepository<String, HaoCaiPeiZhiPo,HaoCaiPeiZhi> implements HaoCaiPeiZhiRepository{
	  
	@Resource
	private  HaoCaiPeiZhiQueryDao haoCaiPeiZhiQueryDao;

	public HaoCaiPeiZhi newInstance() {
		HaoCaiPeiZhiPo po = new HaoCaiPeiZhiPo();
		HaoCaiPeiZhi haoCaiPeiZhi = AppUtil.getBean(HaoCaiPeiZhi.class);
		haoCaiPeiZhi.setData(po);
		return haoCaiPeiZhi;
	}

	public HaoCaiPeiZhi newInstance(HaoCaiPeiZhiPo po) {
		HaoCaiPeiZhi haoCaiPeiZhi = AppUtil.getBean(HaoCaiPeiZhi.class);
		haoCaiPeiZhi.setData(po);
		return haoCaiPeiZhi;
	} 
	
	@Override
	protected IQueryDao<String, HaoCaiPeiZhiPo> getQueryDao() {
		return haoCaiPeiZhiQueryDao;
	}
	

	
}
