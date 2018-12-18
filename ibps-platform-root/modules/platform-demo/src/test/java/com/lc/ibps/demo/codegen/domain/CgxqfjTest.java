package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.Cgxqfj;
import com.lc.ibps.demo.codegen.repository.CgxqfjRepository;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求附件 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
public class CgxqfjTest extends CodegenBaseTest{
	 
	@Resource
	private CgxqfjRepository cgxqfjRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		Cgxqfj cgxqfj = cgxqfjRepository.newInstance();
		
		CgxqfjPo cgxqfjPo=new CgxqfjPo();
		cgxqfjPo.setId(idGenerator.getId());
		
		cgxqfj.setData(cgxqfjPo);
		
		List<String> ids = new ArrayList<String>();
		
		cgxqfj.create();	
		ids.add(cgxqfj.getId());
						
		Cgxqfj cgxqfj2 = cgxqfjRepository.newInstance();
		cgxqfjPo.setId(idGenerator.getId());
		cgxqfj2.setData(cgxqfjPo);
		
		cgxqfj2.create();
		ids.add(cgxqfj2.getId());
		
		List<CgxqfjPo> cgxqfjPoList = cgxqfjRepository.findByIds(ids);
		Assert.assertTrue(cgxqfjPoList.size()>=2);
		
		cgxqfjPoList = cgxqfjRepository.findAll();
		Assert.assertTrue(cgxqfjPoList.size()>=2);

	}
}