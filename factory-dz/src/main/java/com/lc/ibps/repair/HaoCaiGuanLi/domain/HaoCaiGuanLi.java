package com.lc.ibps.repair.HaoCaiGuanLi.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.dao.HaoCaiGuanLiDao;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.dao.HaoCaiGuanLiQueryDao;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity.HaoCaiGuanLiPo;


/**
 * t_hcglb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:41:59
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class HaoCaiGuanLi extends AbstractDomain<String, HaoCaiGuanLiPo>{
	 
	private HaoCaiGuanLiDao haoCaiGuanLiDao = null;
	private HaoCaiGuanLiQueryDao haoCaiGuanLiQueryDao = null;

	

	protected void init(){
		haoCaiGuanLiDao = AppUtil.getBean(HaoCaiGuanLiDao.class);
		haoCaiGuanLiQueryDao = AppUtil.getBean(HaoCaiGuanLiQueryDao.class);
		this.setDao(haoCaiGuanLiDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(haoCaiGuanLiQueryDao.get(getId())));
	}
	
	
}
