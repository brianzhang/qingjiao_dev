package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.PJObjectDao;
import com.lc.ibps.pgs.PGData.persistence.dao.PJObjectQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJObjectPo;


/**
 * t_p_pjdx 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PJObject extends AbstractDomain<String, PJObjectPo>{
	 
	private PJObjectDao pJObjectDao = null;
	private PJObjectQueryDao pJObjectQueryDao = null;

	

	protected void init(){
		pJObjectDao = AppUtil.getBean(PJObjectDao.class);
		pJObjectQueryDao = AppUtil.getBean(PJObjectQueryDao.class);
		this.setDao(pJObjectDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pJObjectQueryDao.get(getId())));
	}
	
	
}
