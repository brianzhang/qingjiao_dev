package com.lc.ibps.patrols.data.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 授课信息 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
 @SuppressWarnings("serial")
public class TeachInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  scheduleId; 		/*课表id*/
	protected String  tchId; 		/*教师id*/
	protected String  classxxId; 		/*班级id*/
	protected String  day; 		/*时间*/
	protected String  section; 		/*节次*/

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
	public void setScheduleId(String scheduleId) 
	{
		this.scheduleId = scheduleId;
	}
	/**
	 * 返回 课表id
	 * @return
	 */
	public String getScheduleId() 
	{
		return this.scheduleId;
	}
	public void setTchId(String tchId) 
	{
		this.tchId = tchId;
	}
	/**
	 * 返回 教师id
	 * @return
	 */
	public String getTchId() 
	{
		return this.tchId;
	}
	public void setClassxxId(String classxxId) 
	{
		this.classxxId = classxxId;
	}
	/**
	 * 返回 班级id
	 * @return
	 */
	public String getClassxxId() 
	{
		return this.classxxId;
	}
	public void setDay(String day) 
	{
		this.day = day;
	}
	/**
	 * 返回 时间
	 * @return
	 */
	public String getDay() 
	{
		return this.day;
	}
	public void setSection(String section) 
	{
		this.section = section;
	}
	/**
	 * 返回 节次
	 * @return
	 */
	public String getSection() 
	{
		return this.section;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("scheduleId", this.scheduleId) 
		.append("tchId", this.tchId) 
		.append("classxxId", this.classxxId) 
		.append("day", this.day) 
		.append("section", this.section) 
		.toString();
	}
		
}
