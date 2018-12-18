package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.BasicRequirementsDao;
import com.lc.ibps.pgs.PGData.persistence.dao.BasicRequirementsQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.BasicRequirementsPo;


/**
 * t_p_jbyqb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:18:42
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class BasicRequirements extends AbstractDomain<String, BasicRequirementsPo>{
	 
	private BasicRequirementsDao basicRequirementsDao = null;
	private BasicRequirementsQueryDao basicRequirementsQueryDao = null;

	

	protected void init(){
		basicRequirementsDao = AppUtil.getBean(BasicRequirementsDao.class);
		basicRequirementsQueryDao = AppUtil.getBean(BasicRequirementsQueryDao.class);
		this.setDao(basicRequirementsDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(basicRequirementsQueryDao.get(getId())));
	}
	
	
}
