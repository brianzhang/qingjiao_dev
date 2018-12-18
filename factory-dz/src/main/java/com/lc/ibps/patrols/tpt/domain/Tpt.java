package com.lc.ibps.patrols.tpt.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.tpt.persistence.dao.TptDao;
import com.lc.ibps.patrols.tpt.persistence.dao.TptQueryDao;
import com.lc.ibps.patrols.tpt.persistence.entity.TptPo;


/**
 * t_tpt 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 11:39:03
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Tpt extends AbstractDomain<String, TptPo>{
	 
	private TptDao tptDao = null;
	private TptQueryDao tptQueryDao = null;

	

	protected void init(){
		tptDao = AppUtil.getBean(TptDao.class);
		tptQueryDao = AppUtil.getBean(TptQueryDao.class);
		this.setDao(tptDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(tptQueryDao.get(getId())));
	}
	
	
}
