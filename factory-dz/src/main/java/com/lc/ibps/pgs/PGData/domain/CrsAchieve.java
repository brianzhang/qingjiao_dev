package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsAchieveDao;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsAchieveQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsAchievePo;


/**
 * t_p_kcdcdhlxpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CrsAchieve extends AbstractDomain<String, CrsAchievePo>{
	 
	private CrsAchieveDao crsAchieveDao = null;
	private CrsAchieveQueryDao crsAchieveQueryDao = null;

	

	protected void init(){
		crsAchieveDao = AppUtil.getBean(CrsAchieveDao.class);
		crsAchieveQueryDao = AppUtil.getBean(CrsAchieveQueryDao.class);
		this.setDao(crsAchieveDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(crsAchieveQueryDao.get(getId())));
	}
	
	
}
