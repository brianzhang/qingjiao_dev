package com.lc.ibps.components.student.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_student 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 10:48:34
 *</pre>
 */
 @SuppressWarnings("serial")
public class StudentTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  name; 		/*name*/
	protected Long  age; 		/*age*/
	protected String  address; 		/*address*/

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
	public void setCreateBy(String createBy) 
	{
		this.createBy = createBy;
	}
	/**
	 * 返回 创建人
	 * @return
	 */
	public String getCreateBy() 
	{
		return this.createBy;
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
	public void setUpdateBy(String updateBy) 
	{
		this.updateBy = updateBy;
	}
	/**
	 * 返回 更新人
	 * @return
	 */
	public String getUpdateBy() 
	{
		return this.updateBy;
	}
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 name
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setAge(Long age) 
	{
		this.age = age;
	}
	/**
	 * 返回 age
	 * @return
	 */
	public Long getAge() 
	{
		return this.age;
	}
	public void setAddress(String address) 
	{
		this.address = address;
	}
	/**
	 * 返回 address
	 * @return
	 */
	public String getAddress() 
	{
		return this.address;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.append("name", this.name) 
		.append("age", this.age) 
		.append("address", this.address) 
		.toString();
	}
}
