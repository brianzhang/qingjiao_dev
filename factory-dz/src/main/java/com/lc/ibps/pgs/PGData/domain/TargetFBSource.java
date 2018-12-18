package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetFBSourceDao;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetFBSourceQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetFBSourcePo;


/**
 * t_p_fkyjsjly 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:06:24
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TargetFBSource extends AbstractDomain<String, TargetFBSourcePo>{
	 
	private TargetFBSourceDao targetFBSourceDao = null;
	private TargetFBSourceQueryDao targetFBSourceQueryDao = null;

	

	protected void init(){
		targetFBSourceDao = AppUtil.getBean(TargetFBSourceDao.class);
		targetFBSourceQueryDao = AppUtil.getBean(TargetFBSourceQueryDao.class);
		this.setDao(targetFBSourceDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(targetFBSourceQueryDao.get(getId())));
	}
	
	
}
