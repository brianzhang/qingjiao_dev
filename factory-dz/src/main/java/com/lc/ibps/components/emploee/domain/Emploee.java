package com.lc.ibps.components.emploee.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.components.emploee.persistence.dao.EmploeeDao;
import com.lc.ibps.components.emploee.persistence.dao.EmploeeQueryDao;
import com.lc.ibps.components.emploee.persistence.entity.EmploeePo;


/**
 * t_ry 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 14:06:36
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Emploee extends AbstractDomain<String, EmploeePo>{
	 
	private EmploeeDao emploeeDao = null;
	private EmploeeQueryDao emploeeQueryDao = null;

	

	protected void init(){
		emploeeDao = AppUtil.getBean(EmploeeDao.class);
		emploeeQueryDao = AppUtil.getBean(EmploeeQueryDao.class);
		this.setDao(emploeeDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(emploeeQueryDao.get(getId())));
	}
	
	
}
