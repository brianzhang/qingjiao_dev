package com.lc.ibps.test.demo.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2Dao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2QueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.DemoBaseTest;

/**
 * 子表例子 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public class UrlFormSub2DaoTest extends DemoBaseTest{

	@Resource
	private UrlFormSub2Dao urlFormSub2Dao;
	
	@Resource
	private UrlFormSub2QueryDao urlFormSub2QueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		UrlFormSub2Po urlFormSub2Po=new UrlFormSub2Po();
		urlFormSub2Po.setId(idGenerator.getId());
		
		//创建一实体
		urlFormSub2Dao.create(urlFormSub2Po);
        Assert.assertNotNull(urlFormSub2Po.getId());
        logger.debug("urlFormSub2Po1:"+ urlFormSub2Po.getId());
		//获取一实体
		UrlFormSub2Po urlFormSub2Po2=urlFormSub2QueryDao.get(urlFormSub2Po.getId());
		Assert.assertNotNull(urlFormSub2Po2);
		logger.debug("urlFormSub2Po2:" + urlFormSub2Po2.toString());
		//更新一实体
		urlFormSub2Dao.update(urlFormSub2Po2);
		
		UrlFormSub2Po urlFormSub2Po3=urlFormSub2QueryDao.get(urlFormSub2Po.getId());
		Assert.assertNotNull(urlFormSub2Po3);
		logger.debug("urlFormSub2Po3:"+urlFormSub2Po3.toString());
		//删除一实体
		//urlFormSub2Dao.remove(urlFormSub2Po.getId());
	}
	
}
