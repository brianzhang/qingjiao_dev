package com.lc.ibps.patrols.data.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.data.persistence.dao.ClassxxInfoDao;
import com.lc.ibps.patrols.data.persistence.dao.ClassxxInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;


/**
 * 班级信息 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ClassxxInfo extends AbstractDomain<String, ClassxxInfoPo>{
	 
	private ClassxxInfoDao classxxInfoDao = null;
	private ClassxxInfoQueryDao classxxInfoQueryDao = null;

	

	protected void init(){
		classxxInfoDao = AppUtil.getBean(ClassxxInfoDao.class);
		classxxInfoQueryDao = AppUtil.getBean(ClassxxInfoQueryDao.class);
		this.setDao(classxxInfoDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(classxxInfoQueryDao.get(getId())));
	}
	
	
}
