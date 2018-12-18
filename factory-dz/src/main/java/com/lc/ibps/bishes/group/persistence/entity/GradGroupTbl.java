package com.lc.ibps.bishes.group.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_grad_group 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:34
 *</pre>
 */
 @SuppressWarnings("serial")
public class GradGroupTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected Date  date; 		/*日期*/
	protected String  time; 		/*时间*/
	protected String  place; 		/*地点*/
	protected String  name; 		/*名称*/
	protected String  type; 		/*类型*/
	protected String  leader; 		/*组长*/
	protected String  leaderId; 		/*组长ID*/
	protected String  term; 		/*学期*/
	protected String  orgId; 		/*院系ID*/
	
	protected String secId;  /*秘书ID*/
	protected String sec;  /*秘书*/
	
	
	
	

	public String getSecId() {
		return secId;
	}
	public void setSecId(String secId) {
		this.secId = secId;
	}
	public String getSec() {
		return sec;
	}
	public void setSec(String sec) {
		this.sec = sec;
	}
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
	public void setDate(Date date) 
	{
		this.date = date;
	}
	/**
	 * 返回 日期
	 * @return
	 */
	public Date getDate() 
	{
		return this.date;
	}
	public void setTime(String time) 
	{
		this.time = time;
	}
	/**
	 * 返回 时间
	 * @return
	 */
	public String getTime() 
	{
		return this.time;
	}
	public void setPlace(String place) 
	{
		this.place = place;
	}
	/**
	 * 返回 地点
	 * @return
	 */
	public String getPlace() 
	{
		return this.place;
	}
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 名称
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setType(String type) 
	{
		this.type = type;
	}
	/**
	 * 返回 类型
	 * @return
	 */
	public String getType() 
	{
		return this.type;
	}
	public void setLeader(String leader) 
	{
		this.leader = leader;
	}
	/**
	 * 返回 组长
	 * @return
	 */
	public String getLeader() 
	{
		return this.leader;
	}
	public void setLeaderId(String leaderId) 
	{
		this.leaderId = leaderId;
	}
	/**
	 * 返回 组长ID
	 * @return
	 */
	public String getLeaderId() 
	{
		return this.leaderId;
	}
	public void setTerm(String term) 
	{
		this.term = term;
	}
	/**
	 * 返回 学期
	 * @return
	 */
	public String getTerm() 
	{
		return this.term;
	}
	public void setOrgId(String orgId) 
	{
		this.orgId = orgId;
	}
	/**
	 * 返回 院系ID
	 * @return
	 */
	public String getOrgId() 
	{
		return this.orgId;
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
		.append("date_", this.date) 
		.append("time_", this.time) 
		.append("place_", this.place) 
		.append("name_", this.name) 
		.append("type_", this.type) 
		.append("leader_", this.leader) 
		.append("leader_id_", this.leaderId) 
		.append("term_", this.term) 
		.append("org_id_", this.orgId) 
		.toString();
	}
}
