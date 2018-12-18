
package com.lc.ibps.demo.codegen.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.domain.PurchaseDetail;
import com.lc.ibps.demo.codegen.repository.PurchaseDetailRepository;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_purchasedetaillist 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
public class PurchaseDetailTest extends CodegenBaseTest{
	 
	@Resource
	private PurchaseDetailRepository purchaseDetailRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		PurchaseDetail purchaseDetail = purchaseDetailRepository.newInstance();
		
		PurchaseDetailPo purchaseDetailPo=new PurchaseDetailPo();
		purchaseDetailPo.setId(idGenerator.getId());
		
		purchaseDetail.setData(purchaseDetailPo);
		
		List<String> ids = new ArrayList<String>();
		
		purchaseDetail.create();	
		ids.add(purchaseDetail.getId());
						
		PurchaseDetail purchaseDetail2 = purchaseDetailRepository.newInstance();
		purchaseDetailPo.setId(idGenerator.getId());
		purchaseDetail2.setData(purchaseDetailPo);
		
		purchaseDetail2.create();
		ids.add(purchaseDetail2.getId());
		
		List<PurchaseDetailPo> purchaseDetailPoList = purchaseDetailRepository.findByIds(ids);
		Assert.assertTrue(purchaseDetailPoList.size()>=2);
		
		purchaseDetailPoList = purchaseDetailRepository.findAll();
		Assert.assertTrue(purchaseDetailPoList.size()>=2);

	}
}
