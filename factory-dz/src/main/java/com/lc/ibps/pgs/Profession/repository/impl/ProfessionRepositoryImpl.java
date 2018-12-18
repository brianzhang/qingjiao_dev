package com.lc.ibps.pgs.Profession.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Profession.domain.Profession;
import com.lc.ibps.pgs.Profession.repository.ProfessionRepository;
import com.lc.ibps.pgs.Profession.persistence.dao.ProfessionQueryDao;
import com.lc.ibps.pgs.Profession.persistence.entity.ProfessionPo;

/**
 * t_zyb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 *</pre>
 */
@Repository
public class ProfessionRepositoryImpl extends AbstractRepository<String, ProfessionPo,Profession> implements ProfessionRepository{
	  
	@Resource
	private  ProfessionQueryDao professionQueryDao;

	public Profession newInstance() {
		ProfessionPo po = new ProfessionPo();
		Profession profession = AppUtil.getBean(Profession.class);
		profession.setData(po);
		return profession;
	}

	public Profession newInstance(ProfessionPo po) {
		Profession profession = AppUtil.getBean(Profession.class);
		profession.setData(po);
		return profession;
	} 
	
	@Override
	protected IQueryDao<String, ProfessionPo> getQueryDao() {
		return professionQueryDao;
	}
	

	
}
