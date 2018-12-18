package com.lc.ibps.pgs.Byyq.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Byyq.persistence.dao.ByyqDao;
import com.lc.ibps.pgs.Byyq.persistence.dao.ByyqQueryDao;
import com.lc.ibps.pgs.Byyq.persistence.entity.ByyqPo;


/**
 * t_byyq 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:47
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Byyq extends AbstractDomain<String, ByyqPo>{
	 
	private ByyqDao byyqDao = null;
	private ByyqQueryDao byyqQueryDao = null;

	

	protected void init(){
		byyqDao = AppUtil.getBean(ByyqDao.class);
		byyqQueryDao = AppUtil.getBean(ByyqQueryDao.class);
		this.setDao(byyqDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(byyqQueryDao.get(getId())));
	}
	
	
}
