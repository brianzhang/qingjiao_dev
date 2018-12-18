package com.lc.ibps.test.demo.domain;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.test.demo.domain.UrlForm;
import com.lc.ibps.test.demo.repository.UrlFormRepository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.DemoBaseTest;

/**
 * url表单例子 领域对象实体单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public class UrlFormTest extends DemoBaseTest{
	 
	@Resource
	private UrlFormRepository urlFormRepository;
	
	@Test
	@Rollback(true)
	public void create(){				
		UrlForm urlForm = urlFormRepository.newInstance();
		
		UrlFormPo urlFormPo=new UrlFormPo();
		urlFormPo.setId(idGenerator.getId());
		
		urlForm.setData(urlFormPo);
		
		List<String> ids = new ArrayList<String>();
		
		urlForm.create();	
		ids.add(urlForm.getId());
						
		UrlForm urlForm2 = urlFormRepository.newInstance();
		urlFormPo.setId(idGenerator.getId());
		urlForm2.setData(urlFormPo);
		
		urlForm2.create();
		ids.add(urlForm2.getId());
		
		List<UrlFormPo> urlFormPoList = urlFormRepository.findByIds(ids);
		Assert.assertTrue(urlFormPoList.size()>=2);
		
		urlFormPoList = urlFormRepository.findAll();
		Assert.assertTrue(urlFormPoList.size()>=2);

	}
}
