package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.EmployeeDic;
import com.lc.ibps.demo.codegen.repository.EmployeeDicRepository;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_employee_dic 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
public class EmployeeDicTest extends CodegenBaseTest{
	 
	@Resource
	private EmployeeDicRepository employeeDicRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		EmployeeDic employeeDic = employeeDicRepository.newInstance();
		
		EmployeeDicPo employeeDicPo=new EmployeeDicPo();
		employeeDicPo.setId(idGenerator.getId());
		
		employeeDic.setData(employeeDicPo);
		
		List<String> ids = new ArrayList<String>();
		
		employeeDic.create();	
		ids.add(employeeDic.getId());
						
		EmployeeDic employeeDic2 = employeeDicRepository.newInstance();
		employeeDicPo.setId(idGenerator.getId());
		employeeDic2.setData(employeeDicPo);
		
		employeeDic2.create();
		ids.add(employeeDic2.getId());
		
		List<EmployeeDicPo> employeeDicPoList = employeeDicRepository.findByIds(ids);
		Assert.assertTrue(employeeDicPoList.size()>=2);
		
		employeeDicPoList = employeeDicRepository.findAll();
		Assert.assertTrue(employeeDicPoList.size()>=2);

	}
}