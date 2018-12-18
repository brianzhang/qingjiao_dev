package com.lc.ibps.loans.DaiKSSCSP.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenCRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenCRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenCRYJPo;

/**
 * t_scryj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ShenCRYJ extends AbstractDomain<String, ShenCRYJPo>{
	 
	private ShenCRYJDao shenCRYJDao = null;
	private ShenCRYJQueryDao shenCRYJQueryDao = null;


	protected void init(){
		shenCRYJDao = AppUtil.getBean(ShenCRYJDao.class);
		shenCRYJQueryDao = AppUtil.getBean(ShenCRYJQueryDao.class);
		this.setDao(shenCRYJDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(shenCRYJQueryDao.get(getId())));
	}
	
}
