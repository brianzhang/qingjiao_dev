package com.lc.ibps.components.model.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 属性模板 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-13 13:54:37
 *</pre>
 */
 @SuppressWarnings("serial")
public class PropModelTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  name; 		/*名称*/
	protected String  param; 		/*参数*/
	protected String  auth; 
	
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	@Override
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	@Override
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	@Override
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	@Override
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	@Override
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 名称
	 * @return
	 */
	@Override
	public String getName() 
	{
		return this.name;
	}
	public void setParam(String param) 
	{
		this.param = param;
	}
	/**
	 * 返回 参数
	 * @return
	 */
	public String getParam() 
	{
		return this.param;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("updateTime", this.updateTime) 
		.append("name", this.name) 
		.append("param", this.param) 
		.toString();
	}
}
