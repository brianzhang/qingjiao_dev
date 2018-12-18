package com.lc.ibps.pgs.Zbd.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Zbd.persistence.dao.ZbdDao;
import com.lc.ibps.pgs.Zbd.persistence.dao.ZbdQueryDao;
import com.lc.ibps.pgs.Zbd.persistence.entity.ZbdPo;


/**
 * t_zbd 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Zbd extends AbstractDomain<String, ZbdPo>{
	 
	private ZbdDao zbdDao = null;
	private ZbdQueryDao zbdQueryDao = null;

	

	protected void init(){
		zbdDao = AppUtil.getBean(ZbdDao.class);
		zbdQueryDao = AppUtil.getBean(ZbdQueryDao.class);
		this.setDao(zbdDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(zbdQueryDao.get(getId())));
	}
	
	
}
