package com.lc.ibps.test.demo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2Dao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2QueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class UrlFormSub2 extends AbstractDomain<String, UrlFormSub2Po>{
	 
	private UrlFormSub2Dao urlFormSub2Dao = null;
	private UrlFormSub2QueryDao urlFormSub2QueryDao = null;


	protected void init(){
		urlFormSub2Dao = AppUtil.getBean(UrlFormSub2Dao.class);
		urlFormSub2QueryDao = AppUtil.getBean(UrlFormSub2QueryDao.class);
		this.setDao(urlFormSub2Dao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(urlFormSub2QueryDao.get(getId())));
	}
	
}
