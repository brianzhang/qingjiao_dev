package com.lc.ibps.bishes.labelType.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.labelType.persistence.dao.LabelTypeDao;
import com.lc.ibps.bishes.labelType.persistence.dao.LabelTypeQueryDao;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;


/**
 * t_label_type 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class LabelType extends AbstractDomain<String, LabelTypePo>{
	 
	private LabelTypeDao labelTypeDao = null;
	private LabelTypeQueryDao labelTypeQueryDao = null;

	

	protected void init(){
		labelTypeDao = AppUtil.getBean(LabelTypeDao.class);
		labelTypeQueryDao = AppUtil.getBean(LabelTypeQueryDao.class);
		this.setDao(labelTypeDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(labelTypeQueryDao.get(getId())));
	}
	
	
}
