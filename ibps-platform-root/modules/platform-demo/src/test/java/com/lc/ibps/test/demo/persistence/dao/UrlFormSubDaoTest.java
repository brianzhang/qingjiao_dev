package com.lc.ibps.test.demo.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.persistence.dao.UrlFormSubDao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSubQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;
import com.lc.ibps.test.DemoBaseTest;

/**
 * 子表例子 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
public class UrlFormSubDaoTest extends DemoBaseTest{

	@Resource
	private UrlFormSubDao urlFormSubDao;
	
	@Resource
	private UrlFormSubQueryDao urlFormSubQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		UrlFormSubPo urlFormSubPo=new UrlFormSubPo();
		urlFormSubPo.setId(idGenerator.getId());
		
		//创建一实体
		urlFormSubDao.create(urlFormSubPo);
        Assert.assertNotNull(urlFormSubPo.getId());
        logger.debug("urlFormSubPo1:"+ urlFormSubPo.getId());
		//获取一实体
		UrlFormSubPo urlFormSubPo2=urlFormSubQueryDao.get(urlFormSubPo.getId());
		Assert.assertNotNull(urlFormSubPo2);
		logger.debug("urlFormSubPo2:" + urlFormSubPo2.toString());
		//更新一实体
		urlFormSubDao.update(urlFormSubPo2);
		
		UrlFormSubPo urlFormSubPo3=urlFormSubQueryDao.get(urlFormSubPo.getId());
		Assert.assertNotNull(urlFormSubPo3);
		logger.debug("urlFormSubPo3:"+urlFormSubPo3.toString());
		//删除一实体
		//urlFormSubDao.remove(urlFormSubPo.getId());
	}
	
}
