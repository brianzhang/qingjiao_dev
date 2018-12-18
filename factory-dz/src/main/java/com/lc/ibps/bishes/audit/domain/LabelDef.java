package com.lc.ibps.bishes.audit.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.audit.persistence.dao.LabelDefDao;
import com.lc.ibps.bishes.audit.persistence.dao.LabelDefQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;


/**
 * t_label_def 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class LabelDef extends AbstractDomain<String, LabelDefPo>{
	 
	private LabelDefDao labelDefDao = null;
	private LabelDefQueryDao labelDefQueryDao = null;

	

	protected void init(){
		labelDefDao = AppUtil.getBean(LabelDefDao.class);
		labelDefQueryDao = AppUtil.getBean(LabelDefQueryDao.class);
		this.setDao(labelDefDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(labelDefQueryDao.get(getId())));
	}
	
	
}
