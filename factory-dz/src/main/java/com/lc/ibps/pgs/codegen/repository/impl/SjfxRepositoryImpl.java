package com.lc.ibps.pgs.codegen.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.codegen.domain.Sjfx;
import com.lc.ibps.pgs.codegen.repository.SjfxRepository;
import com.lc.ibps.pgs.codegen.persistence.dao.SjfxQueryDao;
import com.lc.ibps.pgs.codegen.persistence.entity.SjfxPo;

/**
 * 学院试卷分析报告 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:53
 *</pre>
 */
@Repository
public class SjfxRepositoryImpl extends AbstractRepository<String, SjfxPo,Sjfx> implements SjfxRepository{
	  
	@Resource
	private  SjfxQueryDao sjfxQueryDao;

	public Sjfx newInstance() {
		SjfxPo po = new SjfxPo();
		Sjfx sjfx = AppUtil.getBean(Sjfx.class);
		sjfx.setData(po);
		return sjfx;
	}

	public Sjfx newInstance(SjfxPo po) {
		Sjfx sjfx = AppUtil.getBean(Sjfx.class);
		sjfx.setData(po);
		return sjfx;
	} 
	
	@Override
	protected IQueryDao<String, SjfxPo> getQueryDao() {
		return sjfxQueryDao;
	}
	

	
}
