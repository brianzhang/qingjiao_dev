package com.lc.ibps.demo.codegen.service;


/**
 * 采购需求 服务接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:04
 *</pre>
 */
public interface CgxqService {
	
	
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
	
	/**
	 * 保存业务数据
	 *
	 * @param jsonData 
	 */
	public void saveCascade(String jsonData);
	
	/**
	 * 根据主键数组删除业务数据
	 *
	 * @param ids 
	 */
	public void deleteByIdsCascade(String[] ids);
	
}