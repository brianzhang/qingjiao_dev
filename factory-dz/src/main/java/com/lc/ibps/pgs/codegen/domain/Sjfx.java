package com.lc.ibps.pgs.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.codegen.persistence.dao.SjfxDao;
import com.lc.ibps.pgs.codegen.persistence.dao.SjfxQueryDao;
import com.lc.ibps.pgs.codegen.persistence.entity.SjfxPo;


/**
 * 学院试卷分析报告 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:54
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Sjfx extends AbstractDomain<String, SjfxPo>{
	 
	private SjfxDao sjfxDao = null;
	private SjfxQueryDao sjfxQueryDao = null;

	

	protected void init(){
		sjfxDao = AppUtil.getBean(SjfxDao.class);
		sjfxQueryDao = AppUtil.getBean(SjfxQueryDao.class);
		this.setDao(sjfxDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(sjfxQueryDao.get(getId())));
	}
	
	
}
