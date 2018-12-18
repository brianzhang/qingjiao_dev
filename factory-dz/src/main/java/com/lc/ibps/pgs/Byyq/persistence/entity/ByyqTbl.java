package com.lc.ibps.pgs.Byyq.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_byyq 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:46
 *</pre>
 */
 @SuppressWarnings("serial")
public class ByyqTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  pro_id; 		/*专业ID*/
	protected String  pro_name; 		/*专业名称*/
	protected String  demand_title; 		/*需求标题*/
	protected String  content; 		/*要求内容*/
	protected Long  num; 		/*序号*/
	protected String  history; 		/*history*/

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
	public void setPro_id(String pro_id) 
	{
		this.pro_id = pro_id;
	}
	/**
	 * 返回 专业ID
	 * @return
	 */
	public String getPro_id() 
	{
		return this.pro_id;
	}
	public void setPro_name(String pro_name) 
	{
		this.pro_name = pro_name;
	}
	/**
	 * 返回 专业名称
	 * @return
	 */
	public String getPro_name() 
	{
		return this.pro_name;
	}
	public void setDemand_title(String demand_title) 
	{
		this.demand_title = demand_title;
	}
	/**
	 * 返回 需求标题
	 * @return
	 */
	public String getDemand_title() 
	{
		return this.demand_title;
	}
	public void setContent(String content) 
	{
		this.content = content;
	}
	/**
	 * 返回 要求内容
	 * @return
	 */
	public String getContent() 
	{
		return this.content;
	}
	public void setNum(Long num) 
	{
		this.num = num;
	}
	/**
	 * 返回 序号
	 * @return
	 */
	public Long getNum() 
	{
		return this.num;
	}
	public void setHistory(String history) 
	{
		this.history = history;
	}
	/**
	 * 返回 history
	 * @return
	 */
	public String getHistory() 
	{
		return this.history;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("pro_id", this.pro_id) 
		.append("pro_name", this.pro_name) 
		.append("demand_title", this.demand_title) 
		.append("content", this.content) 
		.append("num", this.num) 
		.append("history", this.history) 
		.toString();
	}
}
