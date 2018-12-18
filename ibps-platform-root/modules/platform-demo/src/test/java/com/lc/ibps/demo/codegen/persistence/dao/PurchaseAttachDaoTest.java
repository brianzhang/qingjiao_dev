
package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseAttachQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求附件 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
public class PurchaseAttachDaoTest extends CodegenBaseTest{

	@Resource
	private PurchaseAttachDao purchaseAttachDao;
	
	@Resource
	private PurchaseAttachQueryDao purchaseAttachQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		PurchaseAttachPo purchaseAttachPo=new PurchaseAttachPo();
		purchaseAttachPo.setId(idGenerator.getId());
		
		//创建一实体
		purchaseAttachDao.create(purchaseAttachPo);
        Assert.assertNotNull(purchaseAttachPo.getId());
        logger.debug("purchaseAttachPo1:"+ purchaseAttachPo.getId());
		//获取一实体
		PurchaseAttachPo purchaseAttachPo2=purchaseAttachQueryDao.get(purchaseAttachPo.getId());
		Assert.assertNotNull(purchaseAttachPo2);
		logger.debug("purchaseAttachPo2:" + purchaseAttachPo2.toString());
		//更新一实体
		purchaseAttachDao.update(purchaseAttachPo2);
		
		PurchaseAttachPo purchaseAttachPo3=purchaseAttachQueryDao.get(purchaseAttachPo.getId());
		Assert.assertNotNull(purchaseAttachPo3);
		logger.debug("purchaseAttachPo3:"+purchaseAttachPo3.toString());
		//删除一实体
		//purchaseAttachDao.remove(purchaseAttachPo.getId());
	}
	
}
