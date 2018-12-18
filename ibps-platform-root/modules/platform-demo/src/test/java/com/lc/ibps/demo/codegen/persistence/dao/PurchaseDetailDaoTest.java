
package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailDao;
import com.lc.ibps.demo.codegen.persistence.dao.PurchaseDetailQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_purchasedetaillist dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
public class PurchaseDetailDaoTest extends CodegenBaseTest{

	@Resource
	private PurchaseDetailDao purchaseDetailDao;
	
	@Resource
	private PurchaseDetailQueryDao purchaseDetailQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		PurchaseDetailPo purchaseDetailPo=new PurchaseDetailPo();
		purchaseDetailPo.setId(idGenerator.getId());
		
		//创建一实体
		purchaseDetailDao.create(purchaseDetailPo);
        Assert.assertNotNull(purchaseDetailPo.getId());
        logger.debug("purchaseDetailPo1:"+ purchaseDetailPo.getId());
		//获取一实体
		PurchaseDetailPo purchaseDetailPo2=purchaseDetailQueryDao.get(purchaseDetailPo.getId());
		Assert.assertNotNull(purchaseDetailPo2);
		logger.debug("purchaseDetailPo2:" + purchaseDetailPo2.toString());
		//更新一实体
		purchaseDetailDao.update(purchaseDetailPo2);
		
		PurchaseDetailPo purchaseDetailPo3=purchaseDetailQueryDao.get(purchaseDetailPo.getId());
		Assert.assertNotNull(purchaseDetailPo3);
		logger.debug("purchaseDetailPo3:"+purchaseDetailPo3.toString());
		//删除一实体
		//purchaseDetailDao.remove(purchaseDetailPo.getId());
	}
	
}
