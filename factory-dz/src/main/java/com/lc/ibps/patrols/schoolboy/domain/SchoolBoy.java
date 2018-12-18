package com.lc.ibps.patrols.schoolboy.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.schoolboy.persistence.dao.SchoolBoyDao;
import com.lc.ibps.patrols.schoolboy.persistence.dao.SchoolBoyQueryDao;
import com.lc.ibps.patrols.schoolboy.persistence.entity.SchoolBoyPo;


/**
 * t_schoolboy 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 12:03:02
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class SchoolBoy extends AbstractDomain<String, SchoolBoyPo>{
	 
	private SchoolBoyDao schoolBoyDao = null;
	private SchoolBoyQueryDao schoolBoyQueryDao = null;

	

	protected void init(){
		schoolBoyDao = AppUtil.getBean(SchoolBoyDao.class);
		schoolBoyQueryDao = AppUtil.getBean(SchoolBoyQueryDao.class);
		this.setDao(schoolBoyDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(schoolBoyQueryDao.get(getId())));
	}
	
	
}
