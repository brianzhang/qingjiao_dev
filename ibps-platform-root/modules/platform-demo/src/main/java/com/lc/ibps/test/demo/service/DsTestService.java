
package com.lc.ibps.test.demo.service;

import com.lc.ibps.bpmn.api.cmd.ActionCmd;

/**
 * TEST 服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:35
 *</pre>
 */
public interface DsTestService {
	
	/**
	 * 保存业务数据
	 *
	 * @param cmd 
	 */
	void save(ActionCmd cmd);
	
	void dbTest();
	
	void tempTest();
}