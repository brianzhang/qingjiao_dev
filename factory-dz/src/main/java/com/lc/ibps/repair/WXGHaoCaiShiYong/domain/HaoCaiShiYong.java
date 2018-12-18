package com.lc.ibps.repair.WXGHaoCaiShiYong.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.dao.HaoCaiShiYongDao;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.dao.HaoCaiShiYongQueryDao;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.entity.HaoCaiShiYongPo;


/**
 * t_wxghcsyb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:39:21
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class HaoCaiShiYong extends AbstractDomain<String, HaoCaiShiYongPo>{
	 
	private HaoCaiShiYongDao haoCaiShiYongDao = null;
	private HaoCaiShiYongQueryDao haoCaiShiYongQueryDao = null;

	

	protected void init(){
		haoCaiShiYongDao = AppUtil.getBean(HaoCaiShiYongDao.class);
		haoCaiShiYongQueryDao = AppUtil.getBean(HaoCaiShiYongQueryDao.class);
		this.setDao(haoCaiShiYongDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(haoCaiShiYongQueryDao.get(getId())));
	}
	
	
}
