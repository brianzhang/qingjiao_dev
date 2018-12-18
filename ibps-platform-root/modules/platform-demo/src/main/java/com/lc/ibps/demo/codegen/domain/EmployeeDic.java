package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicDao;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;

import com.lc.ibps.demo.codegen.repository.EmployeeDicRepository;
import javax.annotation.Resource;

/**
 * t_employee_dic 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class EmployeeDic extends AbstractDomain<String, EmployeeDicPo>{
	 
	private EmployeeDicDao employeeDicDao = null;
	private EmployeeDicQueryDao employeeDicQueryDao = null;


	protected void init(){
		employeeDicDao = AppUtil.getBean(EmployeeDicDao.class);
		employeeDicQueryDao = AppUtil.getBean(EmployeeDicQueryDao.class);
		this.setDao(employeeDicDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(employeeDicQueryDao.get(getId())));
	}
	
	
}