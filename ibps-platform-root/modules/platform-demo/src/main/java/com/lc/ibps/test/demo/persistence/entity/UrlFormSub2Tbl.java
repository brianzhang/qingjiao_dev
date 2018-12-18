package com.lc.ibps.test.demo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 子表例子 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlFormSub2Tbl extends AbstractPo<String>{
	protected String  id; 		/*ID*/
	protected String  key; 		/*KEY*/
	protected String  name; 		/*NAME*/
	protected Long  age; 		/*AGE*/
	protected String  parentId; 		/*PARENTID*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 ID
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setKey(String key) 
	{
		this.key = key;
	}
	/**
	 * 返回 KEY
	 * @return
	 */
	public String getKey() 
	{
		return this.key;
	}
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 NAME
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
	 * 返回 AGE
	 * @return
	 */
	public Long getAge() 
	{
		return this.age;
	}
	public void setParentId(String parentId) 
	{
		this.parentId = parentId;
	}
	/**
	 * 返回 PARENTID
	 * @return
	 */
	public String getParentId() 
	{
		return this.parentId;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("key", this.key) 
		.append("name", this.name) 
		.append("age", this.age) 
		.append("parentId", this.parentId) 
		.toString();
	}
}
