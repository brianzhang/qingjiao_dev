package com.lc.ibps.components.model.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.components.model.persistence.dao.BusinessModelDao;
import com.lc.ibps.components.model.persistence.dao.BusinessModelQueryDao;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;


/**
 * 业务模板 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-09-13 13:54:21
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class BusinessModel extends AbstractDomain<String, BusinessModelPo>{
	private BusinessModelDao businessModelDao = null;
	private BusinessModelQueryDao businessModelQueryDao = null;


	@Override
	protected void init(){
		businessModelDao = AppUtil.getBean(BusinessModelDao.class);
		businessModelQueryDao = AppUtil.getBean(BusinessModelQueryDao.class);
		this.setDao(businessModelDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(businessModelQueryDao.get(getId())));
	}
	
	
}
