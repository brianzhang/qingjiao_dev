package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.QualityMon;
import com.lc.ibps.pgs.PGData.repository.QualityMonRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.QualityMonQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QualityMonPo;

/**
 * t_p_mxdcddzljktx 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 14:08:24
 *</pre>
 */
@Repository
public class QualityMonRepositoryImpl extends AbstractRepository<String, QualityMonPo,QualityMon> implements QualityMonRepository{
	  
	@Resource
	private  QualityMonQueryDao qualityMonQueryDao;

	public QualityMon newInstance() {
		QualityMonPo po = new QualityMonPo();
		QualityMon qualityMon = AppUtil.getBean(QualityMon.class);
		qualityMon.setData(po);
		return qualityMon;
	}

	public QualityMon newInstance(QualityMonPo po) {
		QualityMon qualityMon = AppUtil.getBean(QualityMon.class);
		qualityMon.setData(po);
		return qualityMon;
	} 
	
	@Override
	protected IQueryDao<String, QualityMonPo> getQueryDao() {
		return qualityMonQueryDao;
	}
	

	
}
