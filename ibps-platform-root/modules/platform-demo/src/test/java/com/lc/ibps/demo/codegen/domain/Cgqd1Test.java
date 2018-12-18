package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.Cgqd1;
import com.lc.ibps.demo.codegen.repository.Cgqd1Repository;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
public class Cgqd1Test extends CodegenBaseTest{
	 
	@Resource
	private Cgqd1Repository cgqd1Repository;
	
	@Test
	@Rollback(true)
	public void create(){				
		Cgqd1 cgqd1 = cgqd1Repository.newInstance();
		
		Cgqd1Po cgqd1Po=new Cgqd1Po();
		cgqd1Po.setId(idGenerator.getId());
		
		cgqd1.setData(cgqd1Po);
		
		List<String> ids = new ArrayList<String>();
		
		cgqd1.create();	
		ids.add(cgqd1.getId());
						
		Cgqd1 cgqd12 = cgqd1Repository.newInstance();
		cgqd1Po.setId(idGenerator.getId());
		cgqd12.setData(cgqd1Po);
		
		cgqd12.create();
		ids.add(cgqd12.getId());
		
		List<Cgqd1Po> cgqd1PoList = cgqd1Repository.findByIds(ids);
		Assert.assertTrue(cgqd1PoList.size()>=2);
		
		cgqd1PoList = cgqd1Repository.findAll();
		Assert.assertTrue(cgqd1PoList.size()>=2);

	}
}