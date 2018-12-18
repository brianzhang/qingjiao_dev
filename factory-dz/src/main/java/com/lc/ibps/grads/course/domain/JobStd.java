package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.JobStdDao;
import com.lc.ibps.grads.course.persistence.dao.JobStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

/**
 * t_job_std 领域对象实体
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class JobStd extends AbstractDomain<String, JobStdPo>{
	 
	private JobStdDao jobStdDao = null;
	private JobStdQueryDao jobStdQueryDao = null;


	@Override
	protected void init(){
		jobStdDao = AppUtil.getBean(JobStdDao.class);
		jobStdQueryDao = AppUtil.getBean(JobStdQueryDao.class);
		this.setDao(jobStdDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(jobStdQueryDao.get(getId())));
	}
	
	
}
