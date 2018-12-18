package com.lc.ibps.bishes.group.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.group.persistence.dao.GradGroupDao;
import com.lc.ibps.bishes.group.persistence.dao.GradGroupQueryDao;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;


/**
 * t_grad_group 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class GradGroup extends AbstractDomain<String, GradGroupPo>{
	 
	private GradGroupDao gradGroupDao = null;
	private GradGroupQueryDao gradGroupQueryDao = null;

	

	protected void init(){
		gradGroupDao = AppUtil.getBean(GradGroupDao.class);
		gradGroupQueryDao = AppUtil.getBean(GradGroupQueryDao.class);
		this.setDao(gradGroupDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(gradGroupQueryDao.get(getId())));
	}
	
	
}
