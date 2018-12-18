package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.CrsAchieve;
import com.lc.ibps.pgs.PGData.repository.CrsAchieveRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsAchieveQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsAchievePo;

/**
 * t_p_kcdcdhlxpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
@Repository
public class CrsAchieveRepositoryImpl extends AbstractRepository<String, CrsAchievePo,CrsAchieve> implements CrsAchieveRepository{
	  
	@Resource
	private  CrsAchieveQueryDao crsAchieveQueryDao;

	public CrsAchieve newInstance() {
		CrsAchievePo po = new CrsAchievePo();
		CrsAchieve crsAchieve = AppUtil.getBean(CrsAchieve.class);
		crsAchieve.setData(po);
		return crsAchieve;
	}

	public CrsAchieve newInstance(CrsAchievePo po) {
		CrsAchieve crsAchieve = AppUtil.getBean(CrsAchieve.class);
		crsAchieve.setData(po);
		return crsAchieve;
	} 
	
	@Override
	protected IQueryDao<String, CrsAchievePo> getQueryDao() {
		return crsAchieveQueryDao;
	}
	

	
}
