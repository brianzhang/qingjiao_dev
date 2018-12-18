package com.lc.ibps.bishes.audit.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.audit.domain.LabelDef;
import com.lc.ibps.bishes.audit.repository.LabelDefRepository;
import com.lc.ibps.bishes.audit.persistence.dao.LabelDefQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 * t_label_def 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
@Repository
public class LabelDefRepositoryImpl extends AbstractRepository<String, LabelDefPo,LabelDef> implements LabelDefRepository{
	  
	@Resource
	private  LabelDefQueryDao labelDefQueryDao;

	public LabelDef newInstance() {
		LabelDefPo po = new LabelDefPo();
		LabelDef labelDef = AppUtil.getBean(LabelDef.class);
		labelDef.setData(po);
		return labelDef;
	}

	public LabelDef newInstance(LabelDefPo po) {
		LabelDef labelDef = AppUtil.getBean(LabelDef.class);
		labelDef.setData(po);
		return labelDef;
	} 
	
	@Override
	protected IQueryDao<String, LabelDefPo> getQueryDao() {
		return labelDefQueryDao;
	}
	@Override
	public List<LabelDefPo> getBySql(String whereSql) {
		return labelDefQueryDao.getBySql(whereSql);
	}

	
}
