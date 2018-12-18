package com.lc.ibps.repair.bxhcb.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.bxhcb.persistence.dao.BxhcbDao;
import com.lc.ibps.repair.bxhcb.persistence.dao.BxhcbQueryDao;
import com.lc.ibps.repair.bxhcb.persistence.entity.BxhcbPo;


/**
 * t_bxhcb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Bxhcb extends AbstractDomain<String, BxhcbPo>{
	 
	private BxhcbDao bxhcbDao = null;
	private BxhcbQueryDao bxhcbQueryDao = null;

	

	protected void init(){
		bxhcbDao = AppUtil.getBean(BxhcbDao.class);
		bxhcbQueryDao = AppUtil.getBean(BxhcbQueryDao.class);
		this.setDao(bxhcbDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(bxhcbQueryDao.get(getId())));
	}
	
	
}
