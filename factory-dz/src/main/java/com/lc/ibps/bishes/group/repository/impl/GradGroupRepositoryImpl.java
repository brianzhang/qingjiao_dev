package com.lc.ibps.bishes.group.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.group.domain.GradGroup;
import com.lc.ibps.bishes.group.repository.GradGroupRepository;
import com.lc.ibps.bishes.group.persistence.dao.GradGroupQueryDao;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;

/**
 * t_grad_group 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
@Repository
public class GradGroupRepositoryImpl extends AbstractRepository<String, GradGroupPo,GradGroup> implements GradGroupRepository{
	  
	@Resource
	private  GradGroupQueryDao gradGroupQueryDao;

	public GradGroup newInstance() {
		GradGroupPo po = new GradGroupPo();
		GradGroup gradGroup = AppUtil.getBean(GradGroup.class);
		gradGroup.setData(po);
		return gradGroup;
	}

	public GradGroup newInstance(GradGroupPo po) {
		GradGroup gradGroup = AppUtil.getBean(GradGroup.class);
		gradGroup.setData(po);
		return gradGroup;
	} 
	
	@Override
	protected IQueryDao<String, GradGroupPo> getQueryDao() {
		return gradGroupQueryDao;
	}

	@Override
	public List<GradGroupPo> getBySql(String whereSql) {
		return gradGroupQueryDao.getBySql(whereSql);
	}
	

	
}
