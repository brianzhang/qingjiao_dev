package com.lc.ibps.demo.keshes.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.keshes.persistence.dao.ZengjiaDao;
import com.lc.ibps.demo.keshes.persistence.dao.ZengjiaQueryDao;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;


/**
 * keshe 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 21:44:08
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Zengjia extends AbstractDomain<String, ZengjiaPo>{
	 
	private ZengjiaDao zengjiaDao = null;
	private ZengjiaQueryDao zengjiaQueryDao = null;

	

	protected void init(){
		zengjiaDao = AppUtil.getBean(ZengjiaDao.class);
		zengjiaQueryDao = AppUtil.getBean(ZengjiaQueryDao.class);
		this.setDao(zengjiaDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(zengjiaQueryDao.get(getId())));
	}
	
	
}