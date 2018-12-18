package com.lc.ibps.bishes.audit.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelDao;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;


/**
 * 教师标签表 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TchLabel extends AbstractDomain<String, TchLabelPo>{
	 
	private TchLabelDao tchLabelDao = null;
	private TchLabelQueryDao tchLabelQueryDao = null;

	

	protected void init(){
		tchLabelDao = AppUtil.getBean(TchLabelDao.class);
		tchLabelQueryDao = AppUtil.getBean(TchLabelQueryDao.class);
		this.setDao(tchLabelDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(tchLabelQueryDao.get(getId())));
	}
	
	
}
