package com.lc.ibps.pgs.Crsoutline.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Crsoutline.persistence.dao.CrsoutlineDao;
import com.lc.ibps.pgs.Crsoutline.persistence.dao.CrsoutlineQueryDao;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;


/**
 * t_t_crs_outline 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Crsoutline extends AbstractDomain<String, CrsoutlinePo>{

	private CrsoutlineDao crsoutlineDao = null;
	private CrsoutlineQueryDao crsoutlineQueryDao = null;

	

	protected void init(){
		crsoutlineDao = AppUtil.getBean(CrsoutlineDao.class);
		crsoutlineQueryDao = AppUtil.getBean(CrsoutlineQueryDao.class);
		this.setDao(crsoutlineDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(crsoutlineQueryDao.get(getId())));
	}
	
	
}
