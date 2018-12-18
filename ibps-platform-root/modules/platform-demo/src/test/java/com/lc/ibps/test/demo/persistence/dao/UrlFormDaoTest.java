package com.lc.ibps.test.demo.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.persistence.dao.UrlFormDao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.DemoBaseTest;

/**
 * url表单例子 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public class UrlFormDaoTest extends DemoBaseTest{

	@Resource
	private UrlFormDao urlFormDao;
	
	@Resource
	private UrlFormQueryDao urlFormQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		UrlFormPo urlFormPo=new UrlFormPo();
		urlFormPo.setId(idGenerator.getId());
		
		//创建一实体
		urlFormDao.create(urlFormPo);
        Assert.assertNotNull(urlFormPo.getId());
        logger.debug("urlFormPo1:"+ urlFormPo.getId());
		//获取一实体
		UrlFormPo urlFormPo2=urlFormQueryDao.get(urlFormPo.getId());
		Assert.assertNotNull(urlFormPo2);
		logger.debug("urlFormPo2:" + urlFormPo2.toString());
		//更新一实体
		urlFormDao.update(urlFormPo2);
		
		UrlFormPo urlFormPo3=urlFormQueryDao.get(urlFormPo.getId());
		Assert.assertNotNull(urlFormPo3);
		logger.debug("urlFormPo3:"+urlFormPo3.toString());
		//删除一实体
		//urlFormDao.remove(urlFormPo.getId());
	}
	
}
