package com.lc.ibps.loans.danBaoCompany.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.danBaoCompany.persistence.dao.DanBaoCompanyInfoDao;
import com.lc.ibps.loans.danBaoCompany.persistence.dao.DanBaoCompanyInfoQueryDao;
import com.lc.ibps.loans.danBaoCompany.persistence.entity.DanBaoCompanyInfoPo;

/**
 * t_dbgs 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 18:38:26
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DanBaoCompanyInfo extends AbstractDomain<String, DanBaoCompanyInfoPo>{
	 
	private DanBaoCompanyInfoDao danBaoCompanyInfoDao = null;
	private DanBaoCompanyInfoQueryDao danBaoCompanyInfoQueryDao = null;


	protected void init(){
		danBaoCompanyInfoDao = AppUtil.getBean(DanBaoCompanyInfoDao.class);
		danBaoCompanyInfoQueryDao = AppUtil.getBean(DanBaoCompanyInfoQueryDao.class);
		this.setDao(danBaoCompanyInfoDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(danBaoCompanyInfoQueryDao.get(getId())));
	}
	
}
