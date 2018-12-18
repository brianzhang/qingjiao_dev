package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.DegreeRelationship;
import com.lc.ibps.pgs.PGData.repository.DegreeRelationshipRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.DegreeRelationshipQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DegreeRelationshipPo;

/**
 * t_p_dcddygx 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:38:00
 *</pre>
 */
@Repository
public class DegreeRelationshipRepositoryImpl extends AbstractRepository<String, DegreeRelationshipPo,DegreeRelationship> implements DegreeRelationshipRepository{
	  
	@Resource
	private  DegreeRelationshipQueryDao degreeRelationshipQueryDao;

	public DegreeRelationship newInstance() {
		DegreeRelationshipPo po = new DegreeRelationshipPo();
		DegreeRelationship degreeRelationship = AppUtil.getBean(DegreeRelationship.class);
		degreeRelationship.setData(po);
		return degreeRelationship;
	}

	public DegreeRelationship newInstance(DegreeRelationshipPo po) {
		DegreeRelationship degreeRelationship = AppUtil.getBean(DegreeRelationship.class);
		degreeRelationship.setData(po);
		return degreeRelationship;
	} 
	
	@Override
	protected IQueryDao<String, DegreeRelationshipPo> getQueryDao() {
		return degreeRelationshipQueryDao;
	}
	

	
}
