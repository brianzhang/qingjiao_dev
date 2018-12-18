package com.lc.ibps.patrols.data.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.data.persistence.dao.ScheduleInfoDao;
import com.lc.ibps.patrols.data.persistence.dao.ScheduleInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;


/**
 * 课表信息 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ScheduleInfo extends AbstractDomain<String, ScheduleInfoPo>{
	 
	private ScheduleInfoDao scheduleInfoDao = null;
	private ScheduleInfoQueryDao scheduleInfoQueryDao = null;

	

	protected void init(){
		scheduleInfoDao = AppUtil.getBean(ScheduleInfoDao.class);
		scheduleInfoQueryDao = AppUtil.getBean(ScheduleInfoQueryDao.class);
		this.setDao(scheduleInfoDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(scheduleInfoQueryDao.get(getId())));
	}
	
	
}
