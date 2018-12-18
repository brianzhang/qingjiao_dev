package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.PJNRProcessDao;
import com.lc.ibps.pgs.PGData.persistence.dao.PJNRProcessQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJNRProcessPo;


/**
 * t_p_byyqpjnrygc 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 14:28:47
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PJNRProcess extends AbstractDomain<String, PJNRProcessPo>{
	 
	private PJNRProcessDao pJNRProcessDao = null;
	private PJNRProcessQueryDao pJNRProcessQueryDao = null;

	

	protected void init(){
		pJNRProcessDao = AppUtil.getBean(PJNRProcessDao.class);
		pJNRProcessQueryDao = AppUtil.getBean(PJNRProcessQueryDao.class);
		this.setDao(pJNRProcessDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pJNRProcessQueryDao.get(getId())));
	}
	
	
}
