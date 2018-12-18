package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.MainTeachLinkDao;
import com.lc.ibps.pgs.PGData.persistence.dao.MainTeachLinkQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.MainTeachLinkPo;


/**
 * t_p_zyjxhjdpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:28:30
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class MainTeachLink extends AbstractDomain<String, MainTeachLinkPo>{
	 
	private MainTeachLinkDao mainTeachLinkDao = null;
	private MainTeachLinkQueryDao mainTeachLinkQueryDao = null;

	

	protected void init(){
		mainTeachLinkDao = AppUtil.getBean(MainTeachLinkDao.class);
		mainTeachLinkQueryDao = AppUtil.getBean(MainTeachLinkQueryDao.class);
		this.setDao(mainTeachLinkDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(mainTeachLinkQueryDao.get(getId())));
	}
	
	
}
