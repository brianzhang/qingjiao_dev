package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsDegreeDao;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsDegreeQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsDegreePo;


/**
 * t_p_zykcdcdhlxpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:20:41
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class CrsDegree extends AbstractDomain<String, CrsDegreePo>{
	 
	private CrsDegreeDao crsDegreeDao = null;
	private CrsDegreeQueryDao crsDegreeQueryDao = null;

	

	protected void init(){
		crsDegreeDao = AppUtil.getBean(CrsDegreeDao.class);
		crsDegreeQueryDao = AppUtil.getBean(CrsDegreeQueryDao.class);
		this.setDao(crsDegreeDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(crsDegreeQueryDao.get(getId())));
	}
	
	
}
