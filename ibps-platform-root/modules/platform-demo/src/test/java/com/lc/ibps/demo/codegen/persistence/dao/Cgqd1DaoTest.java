package com.lc.ibps.demo.codegen.persistence.dao;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1Dao;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;
import com.lc.ibps.demo.CodegenBaseTest;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 dao单元测试类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
public class Cgqd1DaoTest extends CodegenBaseTest{

	@Resource
	private Cgqd1Dao cgqd1Dao;
	
	@Resource
	private Cgqd1QueryDao cgqd1QueryDao;
		
	@Test
	@Rollback(true)
	public void testCrud(){
		Cgqd1Po cgqd1Po=new Cgqd1Po();
		cgqd1Po.setId(idGenerator.getId());
		
		//创建一实体
		cgqd1Dao.create(cgqd1Po);
        Assert.assertNotNull(cgqd1Po.getId());
        logger.debug("cgqd1Po1:"+ cgqd1Po.getId());
		//获取一实体
		Cgqd1Po cgqd1Po2=cgqd1QueryDao.get(cgqd1Po.getId());
		Assert.assertNotNull(cgqd1Po2);
		logger.debug("cgqd1Po2:" + cgqd1Po2.toString());
		//更新一实体
		cgqd1Dao.update(cgqd1Po2);
		
		Cgqd1Po cgqd1Po3=cgqd1QueryDao.get(cgqd1Po.getId());
		Assert.assertNotNull(cgqd1Po3);
		logger.debug("cgqd1Po3:"+cgqd1Po3.toString());
		//删除一实体
		//cgqd1Dao.remove(cgqd1Po.getId());
	}
	
}