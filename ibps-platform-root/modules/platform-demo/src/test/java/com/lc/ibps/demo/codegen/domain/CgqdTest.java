package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.Cgqd;
import com.lc.ibps.demo.codegen.repository.CgqdRepository;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_purchasedetaillist 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
public class CgqdTest extends CodegenBaseTest{
	 
	@Resource
	private CgqdRepository cgqdRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		Cgqd cgqd = cgqdRepository.newInstance();
		
		CgqdPo cgqdPo=new CgqdPo();
		cgqdPo.setId(idGenerator.getId());
		
		cgqd.setData(cgqdPo);
		
		List<String> ids = new ArrayList<String>();
		
		cgqd.create();	
		ids.add(cgqd.getId());
						
		Cgqd cgqd2 = cgqdRepository.newInstance();
		cgqdPo.setId(idGenerator.getId());
		cgqd2.setData(cgqdPo);
		
		cgqd2.create();
		ids.add(cgqd2.getId());
		
		List<CgqdPo> cgqdPoList = cgqdRepository.findByIds(ids);
		Assert.assertTrue(cgqdPoList.size()>=2);
		
		cgqdPoList = cgqdRepository.findAll();
		Assert.assertTrue(cgqdPoList.size()>=2);

	}
}