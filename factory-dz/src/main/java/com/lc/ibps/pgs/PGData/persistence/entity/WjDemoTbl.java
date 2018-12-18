package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_wjdc_test 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
 @SuppressWarnings("serial")
public class WjDemoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  ip; 		/*IP地址*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  userid; 		/*用户id*/
	protected String  wjtype; 		/*问卷类别*/
	protected String  json; 		/*json内容*/
	protected String  username; 		/*用户姓名*/
	protected String  identy; 		/*用户身份*/
	protected String  event; 		/*事件*/

	
	
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public String getIdenty() {
		return identy;
	}
	public void setIdenty(String identy) {
		this.identy = identy;
	}
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
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
	public void setIp(String ip) 
	{
		this.ip = ip;
	}
	/**
	 * 返回 IP地址
	 * @return
	 */
	public String getIp() 
	{
		return this.ip;
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
	public void setUserid(String userid) 
	{
		this.userid = userid;
	}
	/**
	 * 返回 用户id
	 * @return
	 */
	public String getUserid() 
	{
		return this.userid;
	}
	public void setWjtype(String wjtype) 
	{
		this.wjtype = wjtype;
	}
	/**
	 * 返回 问卷类别
	 * @return
	 */
	public String getWjtype() 
	{
		return this.wjtype;
	}
	
	public void setUsername(String username) 
	{
		this.username = username;
	}
	/**
	 * 返回 用户姓名
	 * @return
	 */
	public String getUsername() 
	{
		return this.username;
	}
	/**
	 * @see Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("ip", this.ip) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.append("userid", this.userid) 
		.append("wjtype", this.wjtype) 
		.append("username", this.username) 
		.append("identy", this.identy) 
		.append("event", this.event) 
		.toString();
	}
}
