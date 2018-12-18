package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.Cgxq1;
import com.lc.ibps.demo.codegen.repository.Cgxq1Repository;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_cgxq 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
public class Cgxq1Test extends CodegenBaseTest{
	 
	@Resource
	private Cgxq1Repository cgxq1Repository;
	
	@Test
	@Rollback(true)
	public void create(){				
		Cgxq1 cgxq1 = cgxq1Repository.newInstance();
		
		Cgxq1Po cgxq1Po=new Cgxq1Po();
		cgxq1Po.setId(idGenerator.getId());
		
		cgxq1.setData(cgxq1Po);
		
		List<String> ids = new ArrayList<String>();
		
		cgxq1.create();	
		ids.add(cgxq1.getId());
						
		Cgxq1 cgxq12 = cgxq1Repository.newInstance();
		cgxq1Po.setId(idGenerator.getId());
		cgxq12.setData(cgxq1Po);
		
		cgxq12.create();
		ids.add(cgxq12.getId());
		
		List<Cgxq1Po> cgxq1PoList = cgxq1Repository.findByIds(ids);
		Assert.assertTrue(cgxq1PoList.size()>=2);
		
		cgxq1PoList = cgxq1Repository.findAll();
		Assert.assertTrue(cgxq1PoList.size()>=2);

	}
}