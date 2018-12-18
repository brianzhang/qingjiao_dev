
package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.PurchaseDemand;
import com.lc.ibps.demo.codegen.repository.PurchaseDemandRepository;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
public class PurchaseDemandTest extends CodegenBaseTest{
	 
	@Resource
	private PurchaseDemandRepository purchaseDemandRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		PurchaseDemand purchaseDemand = purchaseDemandRepository.newInstance();
		
		PurchaseDemandPo purchaseDemandPo=new PurchaseDemandPo();
		purchaseDemandPo.setId(idGenerator.getId());
		
		purchaseDemand.setData(purchaseDemandPo);
		
		List<String> ids = new ArrayList<String>();
		
		purchaseDemand.create();	
		ids.add(purchaseDemand.getId());
						
		PurchaseDemand purchaseDemand2 = purchaseDemandRepository.newInstance();
		purchaseDemandPo.setId(idGenerator.getId());
		purchaseDemand2.setData(purchaseDemandPo);
		
		purchaseDemand2.create();
		ids.add(purchaseDemand2.getId());
		
		List<PurchaseDemandPo> purchaseDemandPoList = purchaseDemandRepository.findByIds(ids);
		Assert.assertTrue(purchaseDemandPoList.size()>=2);
		
		purchaseDemandPoList = purchaseDemandRepository.findAll();
		Assert.assertTrue(purchaseDemandPoList.size()>=2);

	}
}
