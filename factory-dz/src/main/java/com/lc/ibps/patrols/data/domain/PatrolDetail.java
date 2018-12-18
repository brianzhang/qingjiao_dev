package com.lc.ibps.patrols.data.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.data.persistence.dao.PatrolDetailDao;
import com.lc.ibps.patrols.data.persistence.dao.PatrolDetailQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo;


/**
 * t_patrol_detail 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:24
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PatrolDetail extends AbstractDomain<String, PatrolDetailPo>{
	 
	private PatrolDetailDao patrolDetailDao = null;
	private PatrolDetailQueryDao patrolDetailQueryDao = null;

	

	protected void init(){
		patrolDetailDao = AppUtil.getBean(PatrolDetailDao.class);
		patrolDetailQueryDao = AppUtil.getBean(PatrolDetailQueryDao.class);
		this.setDao(patrolDetailDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(patrolDetailQueryDao.get(getId())));
	}
	
	
}
