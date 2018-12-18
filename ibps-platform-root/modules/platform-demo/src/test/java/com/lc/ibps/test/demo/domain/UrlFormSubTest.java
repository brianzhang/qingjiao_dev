package com.lc.ibps.test.demo.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.domain.UrlFormSub;
import com.lc.ibps.test.demo.repository.UrlFormSubRepository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;
import com.lc.ibps.test.DemoBaseTest;

/**
 * 子表例子 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
public class UrlFormSubTest extends DemoBaseTest{
	 
	@Resource
	private UrlFormSubRepository urlFormSubRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		UrlFormSub urlFormSub = urlFormSubRepository.newInstance();
		
		UrlFormSubPo urlFormSubPo=new UrlFormSubPo();
		urlFormSubPo.setId(idGenerator.getId());
		
		urlFormSub.setData(urlFormSubPo);
		
		List<String> ids = new ArrayList<String>();
		
		urlFormSub.create();	
		ids.add(urlFormSub.getId());
						
		UrlFormSub urlFormSub2 = urlFormSubRepository.newInstance();
		urlFormSubPo.setId(idGenerator.getId());
		urlFormSub2.setData(urlFormSubPo);
		
		urlFormSub2.create();
		ids.add(urlFormSub2.getId());
		
		List<UrlFormSubPo> urlFormSubPoList = urlFormSubRepository.findByIds(ids);
		Assert.assertTrue(urlFormSubPoList.size()>=2);
		
		urlFormSubPoList = urlFormSubRepository.findAll();
		Assert.assertTrue(urlFormSubPoList.size()>=2);

	}
}
