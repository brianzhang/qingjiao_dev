package com.lc.ibps.patrols.data.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 课表信息 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
 @SuppressWarnings("serial")
public class ScheduleInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  fileId; 		/*文件id*/
	protected String  school; 		/*学校*/
	protected String  name; 		/*名称*/
	protected String  state; 		/*状态*/

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
	public void setFileId(String fileId) 
	{
		this.fileId = fileId;
	}
	/**
	 * 返回 文件id
	 * @return
	 */
	public String getFileId() 
	{
		return this.fileId;
	}
	public void setSchool(String school) 
	{
		this.school = school;
	}
	/**
	 * 返回 学校
	 * @return
	 */
	public String getSchool() 
	{
		return this.school;
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
	public void setState(String state) 
	{
		this.state = state;
	}
	/**
	 * 返回 状态
	 * @return
	 */
	public String getState() 
	{
		return this.state;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("fileId", this.fileId) 
		.append("school", this.school) 
		.append("name", this.name) 
		.append("state", this.state) 
		.toString();
	}
	
}
