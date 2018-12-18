package com.lc.ibps.components.model.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 业务模板 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-09-13 13:54:21
 *</pre>
 */
 @SuppressWarnings("serial")
public class BusinessModelTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  name; 		/*模板名称*/
	protected String  propModelId; 		/*属性模板id*/
	protected String  param; 		/*参数*/

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
	 * 返回 模板名称
	 * @return
	 */
	@Override
	public String getName() 
	{
		return this.name;
	}
	public void setPropModelId(String propModelId) 
	{
		this.propModelId = propModelId;
	}
	/**
	 * 返回 属性模板id
	 * @return
	 */
	public String getPropModelId() 
	{
		return this.propModelId;
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
		.append("propModelId", this.propModelId) 
		.append("param", this.param) 
		.toString();
	}
}
