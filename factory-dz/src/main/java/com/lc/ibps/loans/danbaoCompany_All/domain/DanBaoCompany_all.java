package com.lc.ibps.loans.danbaoCompany_All.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.danbaoCompany_All.persistence.dao.DanBaoCompany_allDao;
import com.lc.ibps.loans.danbaoCompany_All.persistence.dao.DanBaoCompany_allQueryDao;
import com.lc.ibps.loans.danbaoCompany_All.persistence.entity.DanBaoCompany_allPo;

/**
 * t_danbaocompany_all 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DanBaoCompany_all extends AbstractDomain<String, DanBaoCompany_allPo>{
	 
	private DanBaoCompany_allDao danBaoCompany_allDao = null;
	private DanBaoCompany_allQueryDao danBaoCompany_allQueryDao = null;


	protected void init(){
		danBaoCompany_allDao = AppUtil.getBean(DanBaoCompany_allDao.class);
		danBaoCompany_allQueryDao = AppUtil.getBean(DanBaoCompany_allQueryDao.class);
		this.setDao(danBaoCompany_allDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(danBaoCompany_allQueryDao.get(getId())));
	}
	
}
