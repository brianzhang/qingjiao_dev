package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.CommitteeDao;
import com.lc.ibps.pgs.PGData.persistence.dao.CommitteeQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CommitteePo;


/**
 * t_p_jxyzxwyhmd 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:53:30
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Committee extends AbstractDomain<String, CommitteePo>{
	 
	private CommitteeDao committeeDao = null;
	private CommitteeQueryDao committeeQueryDao = null;

	

	protected void init(){
		committeeDao = AppUtil.getBean(CommitteeDao.class);
		committeeQueryDao = AppUtil.getBean(CommitteeQueryDao.class);
		this.setDao(committeeDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(committeeQueryDao.get(getId())));
	}
	
	
}
