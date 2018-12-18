package com.lc.ibps.loans.DaiKSSCSP.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenPRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenPRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;

/**
 * t_spryj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ShenPRYJ extends AbstractDomain<String, ShenPRYJPo>{
	 
	private ShenPRYJDao shenPRYJDao = null;
	private ShenPRYJQueryDao shenPRYJQueryDao = null;


	protected void init(){
		shenPRYJDao = AppUtil.getBean(ShenPRYJDao.class);
		shenPRYJQueryDao = AppUtil.getBean(ShenPRYJQueryDao.class);
		this.setDao(shenPRYJDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(shenPRYJQueryDao.get(getId())));
	}
	
}
