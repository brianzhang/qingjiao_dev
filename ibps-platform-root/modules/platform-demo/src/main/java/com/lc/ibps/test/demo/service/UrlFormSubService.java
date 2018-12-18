package com.lc.ibps.test.demo.service;

import com.lc.ibps.bpmn.api.cmd.ActionCmd;

/**
 * 子表例子 服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
public interface UrlFormSubService {
	
	/**
	 * 保存业务数据
	 *
	 * @param cmd 
	 */
	void save(ActionCmd cmd);
}
