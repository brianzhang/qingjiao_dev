package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.Cgxq;
import com.lc.ibps.demo.codegen.repository.CgxqRepository;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
public class CgxqTest extends CodegenBaseTest{
	 
	@Resource
	private CgxqRepository cgxqRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		Cgxq cgxq = cgxqRepository.newInstance();
		
		CgxqPo cgxqPo=new CgxqPo();
		cgxqPo.setId(idGenerator.getId());
		
		cgxq.setData(cgxqPo);
		
		List<String> ids = new ArrayList<String>();
		
		cgxq.create();	
		ids.add(cgxq.getId());
						
		Cgxq cgxq2 = cgxqRepository.newInstance();
		cgxqPo.setId(idGenerator.getId());
		cgxq2.setData(cgxqPo);
		
		cgxq2.create();
		ids.add(cgxq2.getId());
		
		List<CgxqPo> cgxqPoList = cgxqRepository.findByIds(ids);
		Assert.assertTrue(cgxqPoList.size()>=2);
		
		cgxqPoList = cgxqRepository.findAll();
		Assert.assertTrue(cgxqPoList.size()>=2);

	}
}