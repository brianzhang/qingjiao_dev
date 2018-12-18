
package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.PurchaseAttach;
import com.lc.ibps.demo.codegen.repository.PurchaseAttachRepository;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求附件 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
public class PurchaseAttachTest extends CodegenBaseTest{
	 
	@Resource
	private PurchaseAttachRepository purchaseAttachRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		PurchaseAttach purchaseAttach = purchaseAttachRepository.newInstance();
		
		PurchaseAttachPo purchaseAttachPo=new PurchaseAttachPo();
		purchaseAttachPo.setId(idGenerator.getId());
		
		purchaseAttach.setData(purchaseAttachPo);
		
		List<String> ids = new ArrayList<String>();
		
		purchaseAttach.create();	
		ids.add(purchaseAttach.getId());
						
		PurchaseAttach purchaseAttach2 = purchaseAttachRepository.newInstance();
		purchaseAttachPo.setId(idGenerator.getId());
		purchaseAttach2.setData(purchaseAttachPo);
		
		purchaseAttach2.create();
		ids.add(purchaseAttach2.getId());
		
		List<PurchaseAttachPo> purchaseAttachPoList = purchaseAttachRepository.findByIds(ids);
		Assert.assertTrue(purchaseAttachPoList.size()>=2);
		
		purchaseAttachPoList = purchaseAttachRepository.findAll();
		Assert.assertTrue(purchaseAttachPoList.size()>=2);

	}
}
