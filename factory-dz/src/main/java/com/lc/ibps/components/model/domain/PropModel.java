package com.lc.ibps.components.model.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.components.model.persistence.dao.PropModelDao;
import com.lc.ibps.components.model.persistence.dao.PropModelQueryDao;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;


/**
 * 属性模板 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-13 13:54:37
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PropModel extends AbstractDomain<String, PropModelPo>{
	 
	private PropModelDao propModelDao = null;
	private PropModelQueryDao propModelQueryDao = null;

	

	@Override
	protected void init(){
		propModelDao = AppUtil.getBean(PropModelDao.class);
		propModelQueryDao = AppUtil.getBean(PropModelQueryDao.class);
		this.setDao(propModelDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(propModelQueryDao.get(getId())));
	}
	
	
}
