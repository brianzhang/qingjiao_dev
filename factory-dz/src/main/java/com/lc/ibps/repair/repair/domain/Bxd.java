package com.lc.ibps.repair.repair.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.repair.persistence.dao.BxdDao;
import com.lc.ibps.repair.repair.persistence.dao.BxdQueryDao;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;


/**
 * t_bxd 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:05
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Bxd extends AbstractDomain<String, BxdPo>{
	 
	private BxdDao bxdDao = null;
	private BxdQueryDao bxdQueryDao = null;

	

	protected void init(){
		bxdDao = AppUtil.getBean(BxdDao.class);
		bxdQueryDao = AppUtil.getBean(BxdQueryDao.class);
		this.setDao(bxdDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(bxdQueryDao.get(getId())));
	}
	
	
}
