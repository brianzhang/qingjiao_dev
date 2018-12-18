package com.lc.ibps.bishes.audit.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.audit.domain.TchLabel;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelDao;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelQueryDao;
import com.lc.ibps.bishes.audit.persistence.dao.impl.TchLabelDaoImpl;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 * 教师标签表 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
@Repository
public class TchLabelRepositoryImpl extends AbstractRepository<String, TchLabelPo,TchLabel> implements TchLabelRepository{
	  
	@Resource
	private  TchLabelQueryDao tchLabelQueryDao;
	@Resource 
	private TchLabelDao tchLabelDao;

	public TchLabel newInstance() {
		TchLabelPo po = new TchLabelPo();
		TchLabel tchLabel = AppUtil.getBean(TchLabel.class);
		tchLabel.setData(po);
		return tchLabel;
	}

	public TchLabel newInstance(TchLabelPo po) {
		TchLabel tchLabel = AppUtil.getBean(TchLabel.class);
		tchLabel.setData(po);
		return tchLabel;
	} 
	
	@Override
	protected IQueryDao<String, TchLabelPo> getQueryDao() {
		return tchLabelQueryDao;
	}

	@Override
	public void compoundLabel(String oldId, String newId, String orgId) {
		tchLabelDao.compoundLabel(oldId, newId, orgId);
	}

	@Override
	public List<TchLabelPo> getBySql(String whereSql) {
		return tchLabelQueryDao.getBySql(whereSql);
	}

	@Override
	public int getNumByLabel(String labelId) {
		return tchLabelQueryDao.getNumByLabel(labelId);
	}
	

	
}
