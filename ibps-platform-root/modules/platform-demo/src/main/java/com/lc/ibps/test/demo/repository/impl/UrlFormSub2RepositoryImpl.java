package com.lc.ibps.test.demo.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.test.demo.domain.UrlFormSub2;
import com.lc.ibps.test.demo.repository.UrlFormSub2Repository;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2QueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@Repository
public class UrlFormSub2RepositoryImpl extends AbstractRepository<String, UrlFormSub2Po,UrlFormSub2> implements UrlFormSub2Repository{
	  
	@Resource
	private  UrlFormSub2QueryDao urlFormSub2QueryDao;

	public UrlFormSub2 newInstance() {
		UrlFormSub2Po po = new UrlFormSub2Po();
		UrlFormSub2 urlFormSub2 = AppUtil.getBean(UrlFormSub2.class);
		urlFormSub2.setData(po);
		return urlFormSub2;
	}

	public UrlFormSub2 newInstance(UrlFormSub2Po po) {
		UrlFormSub2 urlFormSub2 = AppUtil.getBean(UrlFormSub2.class);
		urlFormSub2.setData(po);
		return urlFormSub2;
	} 
	
	@Override
	protected IQueryDao<String, UrlFormSub2Po> getQueryDao() {
		return urlFormSub2QueryDao;
	}
	
	@Override
	public List<UrlFormSub2Po> findByMainId(String mainId) {
		return urlFormSub2QueryDao.findByMainId(mainId);
	}

	
}
