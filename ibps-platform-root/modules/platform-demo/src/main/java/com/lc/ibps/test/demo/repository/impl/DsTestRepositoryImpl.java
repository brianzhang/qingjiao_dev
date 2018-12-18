

package com.lc.ibps.test.demo.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.test.demo.domain.DsTest;
import com.lc.ibps.test.demo.persistence.dao.DsTestQueryDao;
import com.lc.ibps.test.demo.persistence.entity.DsTestPo;
import com.lc.ibps.test.demo.repository.DsTestRepository;

/**
 * TEST 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:35
 *</pre>
 */
@Repository
public class DsTestRepositoryImpl extends AbstractRepository<String, DsTestPo, DsTest> implements DsTestRepository{
	  
	@Resource
	private  DsTestQueryDao testQueryDao;

	public DsTest newInstance() {
		DsTestPo po = new DsTestPo();
		DsTest test = AppUtil.getBean(DsTest.class);
		test.setData(po);
		return test;
	}

	public DsTest newInstance(DsTestPo po) {
		DsTest test = AppUtil.getBean(DsTest.class);
		test.setData(po);
		return test;
	} 
	
	@Override
	protected IQueryDao<String, DsTestPo> getQueryDao() {
		return testQueryDao;
	}
	

	
}
