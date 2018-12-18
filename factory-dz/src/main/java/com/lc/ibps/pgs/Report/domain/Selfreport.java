package com.lc.ibps.pgs.Report.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Report.persistence.dao.SelfreportDao;
import com.lc.ibps.pgs.Report.persistence.dao.SelfreportQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.SelfreportPo;


/**
 * t_zpbgdemo 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-14 10:27:15
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Selfreport extends AbstractDomain<String, SelfreportPo>{
	 
	private SelfreportDao selfreportDao = null;
	private SelfreportQueryDao selfreportQueryDao = null;

	

	protected void init(){
		selfreportDao = AppUtil.getBean(SelfreportDao.class);
		selfreportQueryDao = AppUtil.getBean(SelfreportQueryDao.class);
		this.setDao(selfreportDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(selfreportQueryDao.get(getId())));
	}
	
	
}
