package com.lc.ibps.patrols.tpt.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_tpt 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 11:39:02
 *</pre>
 */
 @SuppressWarnings("serial")
public class TptTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  tptName; 		/*tptName*/
	protected String  tptLb; 		/*tptLb*/
	protected String  json; 		/*json*/

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
	public void setTptName(String tptName) 
	{
		this.tptName = tptName;
	}
	/**
	 * 返回 tptName
	 * @return
	 */
	public String getTptName() 
	{
		return this.tptName;
	}
	public void setTptLb(String tptLb) 
	{
		this.tptLb = tptLb;
	}
	/**
	 * 返回 tptLb
	 * @return
	 */
	public String getTptLb() 
	{
		return this.tptLb;
	}
	public void setJson(String json) 
	{
		this.json = json;
	}
	/**
	 * 返回 json
	 * @return
	 */
	public String getJson() 
	{
		return this.json;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("tptName", this.tptName) 
		.append("tptLb", this.tptLb) 
		.append("json", this.json) 
		.toString();
	}
}
