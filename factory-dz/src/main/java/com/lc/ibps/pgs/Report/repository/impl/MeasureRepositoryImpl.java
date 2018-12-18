package com.lc.ibps.pgs.Report.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Report.domain.Measure;
import com.lc.ibps.pgs.Report.repository.MeasureRepository;
import com.lc.ibps.pgs.Report.persistence.dao.MeasureQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.MeasurePo;

/**
 * t_p_khhlxjxpjbyyqpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:07:41
 *</pre>
 */
@Repository
public class MeasureRepositoryImpl extends AbstractRepository<String, MeasurePo,Measure> implements MeasureRepository{
	  
	@Resource
	private  MeasureQueryDao measureQueryDao;

	public Measure newInstance() {
		MeasurePo po = new MeasurePo();
		Measure measure = AppUtil.getBean(Measure.class);
		measure.setData(po);
		return measure;
	}

	public Measure newInstance(MeasurePo po) {
		Measure measure = AppUtil.getBean(Measure.class);
		measure.setData(po);
		return measure;
	} 
	
	@Override
	protected IQueryDao<String, MeasurePo> getQueryDao() {
		return measureQueryDao;
	}
	

	
}
