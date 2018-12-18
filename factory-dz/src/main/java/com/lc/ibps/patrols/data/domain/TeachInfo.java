package com.lc.ibps.patrols.data.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.data.persistence.dao.TeachInfoDao;
import com.lc.ibps.patrols.data.persistence.dao.TeachInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;


/**
 * 授课信息 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TeachInfo extends AbstractDomain<String, TeachInfoPo>{
	 
	private TeachInfoDao teachInfoDao = null;
	private TeachInfoQueryDao teachInfoQueryDao = null;

	

	protected void init(){
		teachInfoDao = AppUtil.getBean(TeachInfoDao.class);
		teachInfoQueryDao = AppUtil.getBean(TeachInfoQueryDao.class);
		this.setDao(teachInfoDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(teachInfoQueryDao.get(getId())));
	}
	
	
}
