package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.EvaluateDao;
import com.lc.ibps.pgs.PGData.persistence.dao.EvaluateQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.EvaluatePo;


/**
 * t_p_khhlxpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-21 16:01:36
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Evaluate extends AbstractDomain<String, EvaluatePo>{
	 
	private EvaluateDao evaluateDao = null;
	private EvaluateQueryDao evaluateQueryDao = null;

	

	protected void init(){
		evaluateDao = AppUtil.getBean(EvaluateDao.class);
		evaluateQueryDao = AppUtil.getBean(EvaluateQueryDao.class);
		this.setDao(evaluateDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(evaluateQueryDao.get(getId())));
	}
	
	
}
