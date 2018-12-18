package com.lc.ibps.demo;

import javax.annotation.Resource;

import org.springframework.test.context.ContextConfiguration;

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
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
@ContextConfiguration({"classpath:conf/demo-test.xml"})
public class CodegenBaseTest extends BaseTestCase{
	
	@Resource
    protected IdGenerator idGenerator;
}