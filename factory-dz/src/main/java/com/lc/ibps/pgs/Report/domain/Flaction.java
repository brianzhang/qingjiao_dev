package com.lc.ibps.pgs.Report.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Report.persistence.dao.FlactionDao;
import com.lc.ibps.pgs.Report.persistence.dao.FlactionQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.FlactionPo;


/**
 * t_p_ysqk 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 13:55:55
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Flaction extends AbstractDomain<String, FlactionPo>{
	 
	private FlactionDao flactionDao = null;
	private FlactionQueryDao flactionQueryDao = null;

	

	protected void init(){
		flactionDao = AppUtil.getBean(FlactionDao.class);
		flactionQueryDao = AppUtil.getBean(FlactionQueryDao.class);
		this.setDao(flactionDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(flactionQueryDao.get(getId())));
	}
	
	
}
