package com.lc.ibps.bishes.kaitiGroup.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.kaitiGroup.persistence.dao.KaitiGroupDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.dao.KaitiGroupQueryDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;


/**
 * t_ktxz 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class KaitiGroup extends AbstractDomain<String, KaitiGroupPo>{
	 
	private KaitiGroupDao kaitiGroupDao = null;
	private KaitiGroupQueryDao kaitiGroupQueryDao = null;

	

	@Override
	protected void init(){
		kaitiGroupDao = AppUtil.getBean(KaitiGroupDao.class);
		kaitiGroupQueryDao = AppUtil.getBean(KaitiGroupQueryDao.class);
		this.setDao(kaitiGroupDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(kaitiGroupQueryDao.get(getId())));
	}
	
	
}
