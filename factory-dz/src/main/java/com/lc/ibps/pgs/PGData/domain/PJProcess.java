package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.PJProcessDao;
import com.lc.ibps.pgs.PGData.persistence.dao.PJProcessQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJProcessPo;


/**
 * t_p_pjgc 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:42:09
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PJProcess extends AbstractDomain<String, PJProcessPo>{
	 
	private PJProcessDao pJProcessDao = null;
	private PJProcessQueryDao pJProcessQueryDao = null;

	

	protected void init(){
		pJProcessDao = AppUtil.getBean(PJProcessDao.class);
		pJProcessQueryDao = AppUtil.getBean(PJProcessQueryDao.class);
		this.setDao(pJProcessDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pJProcessQueryDao.get(getId())));
	}
	
	
}
