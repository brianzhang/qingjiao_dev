package com.lc.ibps.test;

import javax.annotation.Resource;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.framework.test.BaseTestCase;
import com.lc.ibps.api.base.id.IdGenerator;

/**
 * 测试基类。</br>
 * 模块其下的测试类均继承该子类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@ContextConfiguration({"classpath:conf/demo-test.xml"})
@RunWith(JUnit4ClassRunner.class)
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@Transactional
public class DemoBaseTest extends AbstractTransactionalJUnit4SpringContextTests{
	
	@Resource
    protected IdGenerator idGenerator;
}
