package com.lc.ibps.patrols.data.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_patrol_detail 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:23
 *</pre>
 */
 @SuppressWarnings("serial")
public class PatrolDetailTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  pgId; 		/*巡课方案id*/
	protected String  className; 		/*班级名称*/
	protected String  actTch; 		/*教学内容*/
	protected String  reason; 		/*原因*/
	protected String  status; 		/*状态*/

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
	public void setPgId(String pgId) 
	{
		this.pgId = pgId;
	}
	/**
	 * 返回 巡课方案id
	 * @return
	 */
	public String getPgId() 
	{
		return this.pgId;
	}
	public void setClassName(String className) 
	{
		this.className = className;
	}
	/**
	 * 返回 班级名称
	 * @return
	 */
	public String getClassName() 
	{
		return this.className;
	}
	public void setActTch(String actTch) 
	{
		this.actTch = actTch;
	}
	/**
	 * 返回 教学内容
	 * @return
	 */
	public String getActTch() 
	{
		return this.actTch;
	}
	public void setReason(String reason) 
	{
		this.reason = reason;
	}
	/**
	 * 返回 原因
	 * @return
	 */
	public String getReason() 
	{
		return this.reason;
	}
	public void setStatus(String status) 
	{
		this.status = status;
	}
	/**
	 * 返回 状态
	 * @return
	 */
	public String getStatus() 
	{
		return this.status;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("pgId", this.pgId) 
		.append("className", this.className) 
		.append("actTch", this.actTch) 
		.append("reason", this.reason) 
		.append("status", this.status) 
		.toString();
	}
}
