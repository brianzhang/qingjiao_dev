package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.CrsTchDao;
import com.lc.ibps.grads.course.persistence.dao.CrsTchQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;

/**
 * t_crs_tch 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:43:15
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CrsTch extends AbstractDomain<String, CrsTchPo>{
	 
	private CrsTchDao crsTchDao = null;
	private CrsTchQueryDao crsTchQueryDao = null;


	@Override
	protected void init(){
		crsTchDao = AppUtil.getBean(CrsTchDao.class);
		crsTchQueryDao = AppUtil.getBean(CrsTchQueryDao.class);
		this.setDao(crsTchDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(crsTchQueryDao.get(getId())));
	}
	
}
