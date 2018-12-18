
package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDemandQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:47
 *</pre>
 */
public class PurchaseDemandDaoTest extends CodegenBaseTest{

	@Resource
	private PurchaseDemandDao purchaseDemandDao;
	
	@Resource
	private PurchaseDemandQueryDao purchaseDemandQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		PurchaseDemandPo purchaseDemandPo=new PurchaseDemandPo();
		purchaseDemandPo.setId(idGenerator.getId());
		
		//创建一实体
		purchaseDemandDao.create(purchaseDemandPo);
        Assert.assertNotNull(purchaseDemandPo.getId());
        logger.debug("purchaseDemandPo1:"+ purchaseDemandPo.getId());
		//获取一实体
		PurchaseDemandPo purchaseDemandPo2=purchaseDemandQueryDao.get(purchaseDemandPo.getId());
		Assert.assertNotNull(purchaseDemandPo2);
		logger.debug("purchaseDemandPo2:" + purchaseDemandPo2.toString());
		//更新一实体
		purchaseDemandDao.update(purchaseDemandPo2);
		
		PurchaseDemandPo purchaseDemandPo3=purchaseDemandQueryDao.get(purchaseDemandPo.getId());
		Assert.assertNotNull(purchaseDemandPo3);
		logger.debug("purchaseDemandPo3:"+purchaseDemandPo3.toString());
		//删除一实体
		//purchaseDemandDao.remove(purchaseDemandPo.getId());
	}
	
}
