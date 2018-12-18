package com.lc.ibps.patrols.control.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.control.persistence.dao.PatrolProgramDao;
import com.lc.ibps.patrols.control.persistence.dao.PatrolProgramQueryDao;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;


/**
 * 巡课方案 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PatrolProgram extends AbstractDomain<String, PatrolProgramPo>{
	 
	private PatrolProgramDao patrolProgramDao = null;
	private PatrolProgramQueryDao patrolProgramQueryDao = null;

	

	protected void init(){
		patrolProgramDao = AppUtil.getBean(PatrolProgramDao.class);
		patrolProgramQueryDao = AppUtil.getBean(PatrolProgramQueryDao.class);
		this.setDao(patrolProgramDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(patrolProgramQueryDao.get(getId())));
	}
	
	
}
