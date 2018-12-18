package com.lc.ibps.loans.DaiKSSCSP.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.JingBRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.JingBRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;

/**
 * t_jbdcryj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class JingBRYJ extends AbstractDomain<String, JingBRYJPo>{
	 
	private JingBRYJDao jingBRYJDao = null;
	private JingBRYJQueryDao jingBRYJQueryDao = null;


	protected void init(){
		jingBRYJDao = AppUtil.getBean(JingBRYJDao.class);
		jingBRYJQueryDao = AppUtil.getBean(JingBRYJQueryDao.class);
		this.setDao(jingBRYJDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(jingBRYJQueryDao.get(getId())));
	}
	
}
