package com.lc.ibps.pgs.ZFJD.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.ZFJD.persistence.dao.FenjiedianDao;
import com.lc.ibps.pgs.ZFJD.persistence.dao.FenjiedianQueryDao;
import com.lc.ibps.pgs.ZFJD.persistence.entity.FenjiedianPo;


/**
 * t_fenjiedian 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Fenjiedian extends AbstractDomain<String, FenjiedianPo>{
	 
	private FenjiedianDao fenjiedianDao = null;
	private FenjiedianQueryDao fenjiedianQueryDao = null;

	

	protected void init(){
		fenjiedianDao = AppUtil.getBean(FenjiedianDao.class);
		fenjiedianQueryDao = AppUtil.getBean(FenjiedianQueryDao.class);
		this.setDao(fenjiedianDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(fenjiedianQueryDao.get(getId())));
	}
	
	
}
