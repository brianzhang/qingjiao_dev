package com.lc.ibps.pgs.Profession.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Profession.persistence.dao.ProfessionDao;
import com.lc.ibps.pgs.Profession.persistence.dao.ProfessionQueryDao;
import com.lc.ibps.pgs.Profession.persistence.entity.ProfessionPo;


/**
 * t_zyb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Profession extends AbstractDomain<String, ProfessionPo>{
	 
	private ProfessionDao professionDao = null;
	private ProfessionQueryDao professionQueryDao = null;

	

	protected void init(){
		professionDao = AppUtil.getBean(ProfessionDao.class);
		professionQueryDao = AppUtil.getBean(ProfessionQueryDao.class);
		this.setDao(professionDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(professionQueryDao.get(getId())));
	}
	
	
}
