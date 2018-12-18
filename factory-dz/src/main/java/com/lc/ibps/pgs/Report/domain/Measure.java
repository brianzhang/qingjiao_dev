package com.lc.ibps.pgs.Report.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Report.persistence.dao.MeasureDao;
import com.lc.ibps.pgs.Report.persistence.dao.MeasureQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.MeasurePo;


/**
 * t_p_khhlxjxpjbyyqpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:07:41
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Measure extends AbstractDomain<String, MeasurePo>{
	 
	private MeasureDao measureDao = null;
	private MeasureQueryDao measureQueryDao = null;

	

	protected void init(){
		measureDao = AppUtil.getBean(MeasureDao.class);
		measureQueryDao = AppUtil.getBean(MeasureQueryDao.class);
		this.setDao(measureDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(measureQueryDao.get(getId())));
	}
	
	
}
