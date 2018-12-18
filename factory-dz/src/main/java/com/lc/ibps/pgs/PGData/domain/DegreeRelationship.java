package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.DegreeRelationshipDao;
import com.lc.ibps.pgs.PGData.persistence.dao.DegreeRelationshipQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DegreeRelationshipPo;


/**
 * t_p_dcddygx 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:38:00
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DegreeRelationship extends AbstractDomain<String, DegreeRelationshipPo>{
	 
	private DegreeRelationshipDao degreeRelationshipDao = null;
	private DegreeRelationshipQueryDao degreeRelationshipQueryDao = null;

	

	protected void init(){
		degreeRelationshipDao = AppUtil.getBean(DegreeRelationshipDao.class);
		degreeRelationshipQueryDao = AppUtil.getBean(DegreeRelationshipQueryDao.class);
		this.setDao(degreeRelationshipDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(degreeRelationshipQueryDao.get(getId())));
	}
	
	
}
