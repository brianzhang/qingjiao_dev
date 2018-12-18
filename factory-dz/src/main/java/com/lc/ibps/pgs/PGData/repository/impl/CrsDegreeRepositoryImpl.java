package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.CrsDegree;
import com.lc.ibps.pgs.PGData.repository.CrsDegreeRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsDegreeQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsDegreePo;

/**
 * t_p_zykcdcdhlxpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:20:41
 *</pre>
 */
@Repository
public class CrsDegreeRepositoryImpl extends AbstractRepository<String, CrsDegreePo,CrsDegree> implements CrsDegreeRepository{
	  
	@Resource
	private  CrsDegreeQueryDao crsDegreeQueryDao;

	public CrsDegree newInstance() {
		CrsDegreePo po = new CrsDegreePo();
		CrsDegree crsDegree = AppUtil.getBean(CrsDegree.class);
		crsDegree.setData(po);
		return crsDegree;
	}

	public CrsDegree newInstance(CrsDegreePo po) {
		CrsDegree crsDegree = AppUtil.getBean(CrsDegree.class);
		crsDegree.setData(po);
		return crsDegree;
	} 
	
	@Override
	protected IQueryDao<String, CrsDegreePo> getQueryDao() {
		return crsDegreeQueryDao;
	}
	

	
}
