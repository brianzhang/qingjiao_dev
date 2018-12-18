package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicDao;
import com.lc.ibps.demo.codegen.persistence.dao.EmployeeDicQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_employee_dic dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
public class EmployeeDicDaoTest extends CodegenBaseTest{

	@Resource
	private EmployeeDicDao employeeDicDao;
	
	@Resource
	private EmployeeDicQueryDao employeeDicQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		EmployeeDicPo employeeDicPo=new EmployeeDicPo();
		employeeDicPo.setId(idGenerator.getId());
		
		//创建一实体
		employeeDicDao.create(employeeDicPo);
        Assert.assertNotNull(employeeDicPo.getId());
        logger.debug("employeeDicPo1:"+ employeeDicPo.getId());
		//获取一实体
		EmployeeDicPo employeeDicPo2=employeeDicQueryDao.get(employeeDicPo.getId());
		Assert.assertNotNull(employeeDicPo2);
		logger.debug("employeeDicPo2:" + employeeDicPo2.toString());
		//更新一实体
		employeeDicDao.update(employeeDicPo2);
		
		EmployeeDicPo employeeDicPo3=employeeDicQueryDao.get(employeeDicPo.getId());
		Assert.assertNotNull(employeeDicPo3);
		logger.debug("employeeDicPo3:"+employeeDicPo3.toString());
		//删除一实体
		//employeeDicDao.remove(employeeDicPo.getId());
	}
	
}