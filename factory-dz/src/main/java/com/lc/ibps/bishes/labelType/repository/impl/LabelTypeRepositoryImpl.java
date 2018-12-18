package com.lc.ibps.bishes.labelType.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.labelType.domain.LabelType;
import com.lc.ibps.bishes.labelType.repository.LabelTypeRepository;
import com.lc.ibps.bishes.labelType.persistence.dao.LabelTypeQueryDao;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;

/**
 * t_label_type 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
@Repository
public class LabelTypeRepositoryImpl extends AbstractRepository<String, LabelTypePo,LabelType> implements LabelTypeRepository{
	  
	@Resource
	private  LabelTypeQueryDao labelTypeQueryDao;

	public LabelType newInstance() {
		LabelTypePo po = new LabelTypePo();
		LabelType labelType = AppUtil.getBean(LabelType.class);
		labelType.setData(po);
		return labelType;
	}

	public LabelType newInstance(LabelTypePo po) {
		LabelType labelType = AppUtil.getBean(LabelType.class);
		labelType.setData(po);
		return labelType;
	} 
	
	@Override
	protected IQueryDao<String, LabelTypePo> getQueryDao() {
		return labelTypeQueryDao;
	}

	@Override
	public List<LabelTypePo> findBySql(String whereSql) {
		return labelTypeQueryDao.findBySql(whereSql);
	}
	

	
}
