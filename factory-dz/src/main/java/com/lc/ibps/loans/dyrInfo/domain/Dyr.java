package com.lc.ibps.loans.dyrInfo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.dyrInfo.persistence.dao.DyrDao;
import com.lc.ibps.loans.dyrInfo.persistence.dao.DyrQueryDao;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 * t_dyr 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Dyr extends AbstractDomain<String, DyrPo>{
	 
	private DyrDao dyrDao = null;
	private DyrQueryDao dyrQueryDao = null;


	protected void init(){
		dyrDao = AppUtil.getBean(DyrDao.class);
		dyrQueryDao = AppUtil.getBean(DyrQueryDao.class);
		this.setDao(dyrDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(dyrQueryDao.get(getId())));
	}
	
}
