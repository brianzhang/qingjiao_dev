package com.lc.ibps.demo.codegen.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.EmployeeDic;
import com.lc.ibps.demo.codegen.repository.EmployeeDicRepository;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;

/**
 * t_employee_dic 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
@Repository
public class EmployeeDicRepositoryImpl extends AbstractRepository<String, EmployeeDicPo,EmployeeDic> implements EmployeeDicRepository{
	  
	@Resource
	private  EmployeeDicQueryDao employeeDicQueryDao;

	public EmployeeDic newInstance() {
		EmployeeDicPo po = new EmployeeDicPo();
		EmployeeDic employeeDic = AppUtil.getBean(EmployeeDic.class);
		employeeDic.setData(po);
		return employeeDic;
	}

	public EmployeeDic newInstance(EmployeeDicPo po) {
		EmployeeDic employeeDic = AppUtil.getBean(EmployeeDic.class);
		employeeDic.setData(po);
		return employeeDic;
	} 
	
	@Override
	protected IQueryDao<String, EmployeeDicPo> getQueryDao() {
		return employeeDicQueryDao;
	}

	@Override
	public List<EmployeeDicPo> getDicItemByUserId(String userId) {
		return employeeDicQueryDao.findByKey("getDicItemByUserId", this.b().a("userId", userId).p());
	}
	
	@Override
	public List<EmployeeDicPo> getByUserId(String userId) {
		return employeeDicQueryDao.findByKey("getByUserId", this.b().a("userId", userId).p());
	}
	
}