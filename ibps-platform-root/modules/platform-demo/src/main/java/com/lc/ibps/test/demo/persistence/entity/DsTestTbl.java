

package com.lc.ibps.test.demo.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * TEST 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:34
 *</pre>
 */
 @SuppressWarnings("serial")
public class DsTestTbl extends AbstractPo<String>{
	protected String  id; 		/*ID_*/
	protected String  account; 		/*ACCOUNT_*/
	protected String  name; 		/*NAME_*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 ID_
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setAccount(String account) 
	{
		this.account = account;
	}
	/**
	 * 返回 ACCOUNT_
	 * @return
	 */
	public String getAccount() 
	{
		return this.account;
	}
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 NAME_
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("account", this.account) 
		.append("name", this.name) 
		.toString();
	}
}