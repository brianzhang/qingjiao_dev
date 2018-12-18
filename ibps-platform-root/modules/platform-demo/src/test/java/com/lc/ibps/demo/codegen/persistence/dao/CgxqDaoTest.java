package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.CgxqDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
public class CgxqDaoTest extends CodegenBaseTest{

	@Resource
	private CgxqDao cgxqDao;
	
	@Resource
	private CgxqQueryDao cgxqQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		CgxqPo cgxqPo=new CgxqPo();
		cgxqPo.setId(idGenerator.getId());
		
		//创建一实体
		cgxqDao.create(cgxqPo);
        Assert.assertNotNull(cgxqPo.getId());
        logger.debug("cgxqPo1:"+ cgxqPo.getId());
		//获取一实体
		CgxqPo cgxqPo2=cgxqQueryDao.get(cgxqPo.getId());
		Assert.assertNotNull(cgxqPo2);
		logger.debug("cgxqPo2:" + cgxqPo2.toString());
		//更新一实体
		cgxqDao.update(cgxqPo2);
		
		CgxqPo cgxqPo3=cgxqQueryDao.get(cgxqPo.getId());
		Assert.assertNotNull(cgxqPo3);
		logger.debug("cgxqPo3:"+cgxqPo3.toString());
		//删除一实体
		//cgxqDao.remove(cgxqPo.getId());
	}
	
}