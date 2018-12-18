package com.lc.ibps.loans.daikuanInfo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.daikuanInfo.persistence.dao.DaiKuanShenQingInfoDao;
import com.lc.ibps.loans.daikuanInfo.persistence.dao.DaiKuanShenQingInfoQueryDao;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 * t_sxsq 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DaiKuanShenQingInfo extends AbstractDomain<String, DaiKuanShenQingInfoPo>{
	 
	private DaiKuanShenQingInfoDao daiKuanShenQingInfoDao = null;
	private DaiKuanShenQingInfoQueryDao daiKuanShenQingInfoQueryDao = null;


	protected void init(){
		daiKuanShenQingInfoDao = AppUtil.getBean(DaiKuanShenQingInfoDao.class);
		daiKuanShenQingInfoQueryDao = AppUtil.getBean(DaiKuanShenQingInfoQueryDao.class);
		this.setDao(daiKuanShenQingInfoDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(daiKuanShenQingInfoQueryDao.get(getId())));
	}
	
}
