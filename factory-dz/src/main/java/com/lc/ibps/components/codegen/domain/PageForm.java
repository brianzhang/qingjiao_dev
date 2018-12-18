package com.lc.ibps.components.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.components.codegen.persistence.dao.PageFormDao;
import com.lc.ibps.components.codegen.persistence.dao.PageFormQueryDao;
import com.lc.ibps.components.codegen.persistence.entity.PageFormPo;


/**
 * 页面表单管理 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PageForm extends AbstractDomain<String, PageFormPo>{
	 
	private PageFormDao pageFormDao = null;
	private PageFormQueryDao pageFormQueryDao = null;

	

	@Override
	protected void init(){
		pageFormDao = AppUtil.getBean(PageFormDao.class);
		pageFormQueryDao = AppUtil.getBean(PageFormQueryDao.class);
		this.setDao(pageFormDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pageFormQueryDao.get(getId())));
	}
	
	
}
