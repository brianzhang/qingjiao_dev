package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1Dao;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * t_cgxq dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
public class Cgxq1DaoTest extends CodegenBaseTest{

	@Resource
	private Cgxq1Dao cgxq1Dao;
	
	@Resource
	private Cgxq1QueryDao cgxq1QueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		Cgxq1Po cgxq1Po=new Cgxq1Po();
		cgxq1Po.setId(idGenerator.getId());
		
		//创建一实体
		cgxq1Dao.create(cgxq1Po);
        Assert.assertNotNull(cgxq1Po.getId());
        logger.debug("cgxq1Po1:"+ cgxq1Po.getId());
		//获取一实体
		Cgxq1Po cgxq1Po2=cgxq1QueryDao.get(cgxq1Po.getId());
		Assert.assertNotNull(cgxq1Po2);
		logger.debug("cgxq1Po2:" + cgxq1Po2.toString());
		//更新一实体
		cgxq1Dao.update(cgxq1Po2);
		
		Cgxq1Po cgxq1Po3=cgxq1QueryDao.get(cgxq1Po.getId());
		Assert.assertNotNull(cgxq1Po3);
		logger.debug("cgxq1Po3:"+cgxq1Po3.toString());
		//删除一实体
		//cgxq1Dao.remove(cgxq1Po.getId());
	}
	
}