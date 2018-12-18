package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.CgqdDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_purchasedetaillist dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
public class CgqdDaoTest extends CodegenBaseTest{

	@Resource
	private CgqdDao cgqdDao;
	
	@Resource
	private CgqdQueryDao cgqdQueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		CgqdPo cgqdPo=new CgqdPo();
		cgqdPo.setId(idGenerator.getId());
		
		//创建一实体
		cgqdDao.create(cgqdPo);
        Assert.assertNotNull(cgqdPo.getId());
        logger.debug("cgqdPo1:"+ cgqdPo.getId());
		//获取一实体
		CgqdPo cgqdPo2=cgqdQueryDao.get(cgqdPo.getId());
		Assert.assertNotNull(cgqdPo2);
		logger.debug("cgqdPo2:" + cgqdPo2.toString());
		//更新一实体
		cgqdDao.update(cgqdPo2);
		
		CgqdPo cgqdPo3=cgqdQueryDao.get(cgqdPo.getId());
		Assert.assertNotNull(cgqdPo3);
		logger.debug("cgqdPo3:"+cgqdPo3.toString());
		//删除一实体
		//cgqdDao.remove(cgqdPo.getId());
	}
	
}