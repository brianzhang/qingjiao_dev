package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.CrsJobDao;
import com.lc.ibps.grads.course.persistence.dao.CrsJobQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;

/**
 * t_crs_job 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CrsJob extends AbstractDomain<String, CrsJobPo>{
	 
	private CrsJobDao crsJobDao = null;
	private CrsJobQueryDao crsJobQueryDao = null;


	@Override
	protected void init(){
		crsJobDao = AppUtil.getBean(CrsJobDao.class);
		crsJobQueryDao = AppUtil.getBean(CrsJobQueryDao.class);
		this.setDao(crsJobDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(crsJobQueryDao.get(getId())));
	}
	
}
