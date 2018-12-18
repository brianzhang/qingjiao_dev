package com.lc.ibps.test.demo.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.domain.UrlFormSub2;
import com.lc.ibps.test.demo.repository.UrlFormSub2Repository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.DemoBaseTest;

/**
 * 子表例子 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public class UrlFormSub2Test extends DemoBaseTest{
	 
	@Resource
	private UrlFormSub2Repository urlFormSub2Repository;
	
	@Test
	@Rollback(true)
	public void create(){				
		UrlFormSub2 urlFormSub2 = urlFormSub2Repository.newInstance();
		
		UrlFormSub2Po urlFormSub2Po=new UrlFormSub2Po();
		urlFormSub2Po.setId(idGenerator.getId());
		
		urlFormSub2.setData(urlFormSub2Po);
		
		List<String> ids = new ArrayList<String>();
		
		urlFormSub2.create();	
		ids.add(urlFormSub2.getId());
						
		UrlFormSub2 urlFormSub22 = urlFormSub2Repository.newInstance();
		urlFormSub2Po.setId(idGenerator.getId());
		urlFormSub22.setData(urlFormSub2Po);
		
		urlFormSub22.create();
		ids.add(urlFormSub22.getId());
		
		List<UrlFormSub2Po> urlFormSub2PoList = urlFormSub2Repository.findByIds(ids);
		Assert.assertTrue(urlFormSub2PoList.size()>=2);
		
		urlFormSub2PoList = urlFormSub2Repository.findAll();
		Assert.assertTrue(urlFormSub2PoList.size()>=2);

	}
}
