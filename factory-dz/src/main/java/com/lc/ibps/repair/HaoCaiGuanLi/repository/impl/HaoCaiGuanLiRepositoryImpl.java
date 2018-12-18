package com.lc.ibps.repair.HaoCaiGuanLi.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.repair.HaoCaiGuanLi.domain.HaoCaiGuanLi;
import com.lc.ibps.repair.HaoCaiGuanLi.repository.HaoCaiGuanLiRepository;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.dao.HaoCaiGuanLiQueryDao;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity.HaoCaiGuanLiPo;

/**
 * t_hcglb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:41:59
 *</pre>
 */
@Repository
public class HaoCaiGuanLiRepositoryImpl extends AbstractRepository<String, HaoCaiGuanLiPo,HaoCaiGuanLi> implements HaoCaiGuanLiRepository{
	  
	@Resource
	private  HaoCaiGuanLiQueryDao haoCaiGuanLiQueryDao;

	public HaoCaiGuanLi newInstance() {
		HaoCaiGuanLiPo po = new HaoCaiGuanLiPo();
		HaoCaiGuanLi haoCaiGuanLi = AppUtil.getBean(HaoCaiGuanLi.class);
		haoCaiGuanLi.setData(po);
		return haoCaiGuanLi;
	}

	public HaoCaiGuanLi newInstance(HaoCaiGuanLiPo po) {
		HaoCaiGuanLi haoCaiGuanLi = AppUtil.getBean(HaoCaiGuanLi.class);
		haoCaiGuanLi.setData(po);
		return haoCaiGuanLi;
	} 
	
	@Override
	protected IQueryDao<String, HaoCaiGuanLiPo> getQueryDao() {
		return haoCaiGuanLiQueryDao;
	}
	

	
}
