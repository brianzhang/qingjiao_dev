package com.lc.ibps.components.codegen.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.codegen.domain.PageForm;
import com.lc.ibps.components.codegen.repository.PageFormRepository;
import com.lc.ibps.components.codegen.persistence.dao.PageFormQueryDao;
import com.lc.ibps.components.codegen.persistence.entity.PageFormPo;

/**
 * 页面表单管理 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
@Repository
public class PageFormRepositoryImpl extends AbstractRepository<String, PageFormPo,PageForm> implements PageFormRepository{
	  
	@Resource
	private  PageFormQueryDao pageFormQueryDao;

	@Override
	public PageForm newInstance() {
		PageFormPo po = new PageFormPo();
		PageForm pageForm = AppUtil.getBean(PageForm.class);
		pageForm.setData(po);
		return pageForm;
	}

	@Override
	public PageForm newInstance(PageFormPo po) {
		PageForm pageForm = AppUtil.getBean(PageForm.class);
		pageForm.setData(po);
		return pageForm;
	} 
	
	@Override
	protected IQueryDao<String, PageFormPo> getQueryDao() {
		return pageFormQueryDao;
	}

	@Override
	public PageFormPo getByPageKey(String key) {
		return pageFormQueryDao.getByKey("getByPageKey", key);
	}
	

	
}
