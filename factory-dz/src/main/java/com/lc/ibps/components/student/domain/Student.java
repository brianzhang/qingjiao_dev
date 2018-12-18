package com.lc.ibps.components.student.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.components.student.persistence.dao.StudentDao;
import com.lc.ibps.components.student.persistence.dao.StudentQueryDao;
import com.lc.ibps.components.student.persistence.entity.StudentPo;


/**
 * t_student 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 10:48:34
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Student extends AbstractDomain<String, StudentPo>{
	 
	private StudentDao studentDao = null;
	private StudentQueryDao studentQueryDao = null;

	

	protected void init(){
		studentDao = AppUtil.getBean(StudentDao.class);
		studentQueryDao = AppUtil.getBean(StudentQueryDao.class);
		this.setDao(studentDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(studentQueryDao.get(getId())));
	}
	
	
}
