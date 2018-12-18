package com.lc.ibps.test.demo.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.test.demo.domain.UrlFormSub;
import com.lc.ibps.test.demo.repository.UrlFormSubRepository;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSubQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;

/**
 * 子表例子 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
@Repository
public class UrlFormSubRepositoryImpl extends AbstractRepository<String, UrlFormSubPo,UrlFormSub> implements UrlFormSubRepository{
	  
	@Resource
	private  UrlFormSubQueryDao urlFormSubQueryDao;

	public UrlFormSub newInstance() {
		UrlFormSubPo po = new UrlFormSubPo();
		UrlFormSub urlFormSub = AppUtil.getBean(UrlFormSub.class);
		urlFormSub.setData(po);
		return urlFormSub;
	}

	public UrlFormSub newInstance(UrlFormSubPo po) {
		UrlFormSub urlFormSub = AppUtil.getBean(UrlFormSub.class);
		urlFormSub.setData(po);
		return urlFormSub;
	} 
	
	@Override
	protected IQueryDao<String, UrlFormSubPo> getQueryDao() {
		return urlFormSubQueryDao;
	}
	

	
}
