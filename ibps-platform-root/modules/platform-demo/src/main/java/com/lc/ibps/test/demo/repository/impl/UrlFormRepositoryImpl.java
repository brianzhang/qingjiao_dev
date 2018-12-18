package com.lc.ibps.test.demo.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.test.demo.domain.UrlForm;
import com.lc.ibps.test.demo.repository.UrlFormRepository;
import com.lc.ibps.test.demo.persistence.dao.UrlFormQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2QueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * url表单例子 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@Repository
public class UrlFormRepositoryImpl extends AbstractRepository<String, UrlFormPo,UrlForm> implements UrlFormRepository{
	  
	@Resource
	private  UrlFormQueryDao urlFormQueryDao;
	@Resource
	private  UrlFormSub2QueryDao urlFormSub2QueryDao;

	public UrlForm newInstance() {
		UrlFormPo po = new UrlFormPo();
		UrlForm urlForm = AppUtil.getBean(UrlForm.class);
		urlForm.setData(po);
		return urlForm;
	}

	public UrlForm newInstance(UrlFormPo po) {
		UrlForm urlForm = AppUtil.getBean(UrlForm.class);
		urlForm.setData(po);
		return urlForm;
	} 
	
	@Override
	protected IQueryDao<String, UrlFormPo> getQueryDao() {
		return urlFormQueryDao;
	}
	

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	@Override
	public UrlFormPo loadCascade(String id){
		UrlFormPo urlFormPo = null;
		if(StringUtil.isNotEmpty(id)){
			urlFormPo = urlFormQueryDao.get(id);
			List<UrlFormSub2Po> urlFormSub2PoList = urlFormSub2QueryDao.findByMainId(id);
			urlFormPo.setUrlFormSub2PoList(urlFormSub2PoList);
		}
		return urlFormPo;
	}
	
}
