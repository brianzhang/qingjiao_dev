package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.BasicRequirements;
import com.lc.ibps.pgs.PGData.repository.BasicRequirementsRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.BasicRequirementsQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.BasicRequirementsPo;

/**
 * t_p_jbyqb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:18:42
 *</pre>
 */
@Repository
public class BasicRequirementsRepositoryImpl extends AbstractRepository<String, BasicRequirementsPo,BasicRequirements> implements BasicRequirementsRepository{
	  
	@Resource
	private  BasicRequirementsQueryDao basicRequirementsQueryDao;

	public BasicRequirements newInstance() {
		BasicRequirementsPo po = new BasicRequirementsPo();
		BasicRequirements basicRequirements = AppUtil.getBean(BasicRequirements.class);
		basicRequirements.setData(po);
		return basicRequirements;
	}

	public BasicRequirements newInstance(BasicRequirementsPo po) {
		BasicRequirements basicRequirements = AppUtil.getBean(BasicRequirements.class);
		basicRequirements.setData(po);
		return basicRequirements;
	} 
	
	@Override
	protected IQueryDao<String, BasicRequirementsPo> getQueryDao() {
		return basicRequirementsQueryDao;
	}
	

	
}
