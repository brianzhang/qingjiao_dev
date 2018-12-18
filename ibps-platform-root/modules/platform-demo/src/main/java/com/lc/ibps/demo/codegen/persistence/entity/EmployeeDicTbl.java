package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.Date;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_employee_dic 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
 @SuppressWarnings("serial")
public class EmployeeDicTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  userId; 		/*用户id*/
	protected String  dicId; 		/* 数据字典id*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	public void setUserId(String userId) 
	{
		this.userId = userId;
	}
	/**
	 * 返回 用户id
	 * @return
	 */
	public String getUserId() 
	{
		return this.userId;
	}
	public void setDicId(String dicId) 
	{
		this.dicId = dicId;
	}
	/**
	 * 返回  数据字典id
	 * @return
	 */
	public String getDicId() 
	{
		return this.dicId;
	}
	
}