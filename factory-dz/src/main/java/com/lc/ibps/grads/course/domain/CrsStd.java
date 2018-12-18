package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.CrsStdDao;
import com.lc.ibps.grads.course.persistence.dao.CrsStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;

/**
 * t_crs_std 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CrsStd extends AbstractDomain<String, CrsStdPo>{
	 
	private CrsStdDao crsStdDao = null;
	private CrsStdQueryDao crsStdQueryDao = null;


	@Override
	protected void init(){
		crsStdDao = AppUtil.getBean(CrsStdDao.class);
		crsStdQueryDao = AppUtil.getBean(CrsStdQueryDao.class);
		this.setDao(crsStdDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(crsStdQueryDao.get(getId())));
	}
	
}
