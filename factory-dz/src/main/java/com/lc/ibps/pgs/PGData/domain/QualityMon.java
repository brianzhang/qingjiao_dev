package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.QualityMonDao;
import com.lc.ibps.pgs.PGData.persistence.dao.QualityMonQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QualityMonPo;


/**
 * t_p_mxdcddzljktx 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 14:08:24
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class QualityMon extends AbstractDomain<String, QualityMonPo>{
	 
	private QualityMonDao qualityMonDao = null;
	private QualityMonQueryDao qualityMonQueryDao = null;

	

	protected void init(){
		qualityMonDao = AppUtil.getBean(QualityMonDao.class);
		qualityMonQueryDao = AppUtil.getBean(QualityMonQueryDao.class);
		this.setDao(qualityMonDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(qualityMonQueryDao.get(getId())));
	}
	
	
}
