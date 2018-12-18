package com.lc.ibps.demo.codegen.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.demo.codegen.domain.EmployeeDic;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;

/**
 * t_employee_dic 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
public interface EmployeeDicRepository extends IRepository<String, EmployeeDicPo,EmployeeDic>{
	
	/**
	 * 得到一个人所有的
	 * @param userId
	 * @return
	 */
	public List<EmployeeDicPo> getDicItemByUserId(String userId);
	
	public List<EmployeeDicPo> getByUserId(String userId);
	
}