package com.lc.ibps.demo.keshes.service;

import com.lc.ibps.bpmn.api.cmd.ActionCmd;

/**
 * keshe 服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 21:44:08
 *</pre>
 */
public interface ZengjiaService {
	
	/**
	 * 保存业务数据
	 *
	 * @param cmd 
	 */
	void save(ActionCmd cmd);
}