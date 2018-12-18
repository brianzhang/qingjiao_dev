package com.lc.ibps.repair.bxzt.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.bxzt.persistence.dao.BxztDao;
import com.lc.ibps.repair.bxzt.persistence.dao.BxztQueryDao;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;


/**
 * t_bxzt 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Bxzt extends AbstractDomain<String, BxztPo>{
	 
	private BxztDao bxztDao = null;
	private BxztQueryDao bxztQueryDao = null;

	

	protected void init(){
		bxztDao = AppUtil.getBean(BxztDao.class);
		bxztQueryDao = AppUtil.getBean(BxztQueryDao.class);
		this.setDao(bxztDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(bxztQueryDao.get(getId())));
	}
	
	
}
