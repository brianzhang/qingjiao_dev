package com.lc.ibps.demo.codegen.service;


/**
 * 采购需求表示：1，采购清单：2；1对多关系 服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
public interface Cgqd1Service {
	
	
	/**
	 * 保存业务数据
	 *
	 * @param jsonData 
	 */
	public void save(String jsonData);
	
	/**
	 * 根据主键数组删除业务数据
	 *
	 * @param ids 
	 */
	public void deleteByIds(String[] ids);
	
	
}