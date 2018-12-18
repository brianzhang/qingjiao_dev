package com.lc.ibps.loans.DaiKSSCSP.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ZhuDCRYJDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ZhuDCRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_zdcryj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ZhuDCRYJ extends AbstractDomain<String, ZhuDCRYJPo>{
	 
	private ZhuDCRYJDao zhuDCRYJDao = null;
	private ZhuDCRYJQueryDao zhuDCRYJQueryDao = null;


	protected void init(){
		zhuDCRYJDao = AppUtil.getBean(ZhuDCRYJDao.class);
		zhuDCRYJQueryDao = AppUtil.getBean(ZhuDCRYJQueryDao.class);
		this.setDao(zhuDCRYJDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(zhuDCRYJQueryDao.get(getId())));
	}
	
}
