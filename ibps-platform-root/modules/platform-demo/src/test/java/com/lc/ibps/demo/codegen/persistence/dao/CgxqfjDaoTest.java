package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求附件 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
public class CgxqfjDaoTest extends CodegenBaseTest{

	@Resource
	private CgxqfjDao cgxqfjDao;
	
	@Resource
	private CgxqfjQueryDao cgxqfjQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		CgxqfjPo cgxqfjPo=new CgxqfjPo();
		cgxqfjPo.setId(idGenerator.getId());
		
		//创建一实体
		cgxqfjDao.create(cgxqfjPo);
        Assert.assertNotNull(cgxqfjPo.getId());
        logger.debug("cgxqfjPo1:"+ cgxqfjPo.getId());
		//获取一实体
		CgxqfjPo cgxqfjPo2=cgxqfjQueryDao.get(cgxqfjPo.getId());
		Assert.assertNotNull(cgxqfjPo2);
		logger.debug("cgxqfjPo2:" + cgxqfjPo2.toString());
		//更新一实体
		cgxqfjDao.update(cgxqfjPo2);
		
		CgxqfjPo cgxqfjPo3=cgxqfjQueryDao.get(cgxqfjPo.getId());
		Assert.assertNotNull(cgxqfjPo3);
		logger.debug("cgxqfjPo3:"+cgxqfjPo3.toString());
		//删除一实体
		//cgxqfjDao.remove(cgxqfjPo.getId());
	}
	
}