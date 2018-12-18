package com.lc.ibps.patrols.data.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 班级信息 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
 @SuppressWarnings("serial")
public class ClassxxInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  school; 		/*学校*/
	protected String  classxx; 		/*班级*/
	protected String  classMaster; 		/*班主任*/
	protected String  place; 		/*地点*/

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
	public void setClassxx(String classxx) 
	{
		this.classxx = classxx;
	}
	/**
	 * 返回 班级
	 * @return
	 */
	public String getClassxx() 
	{
		return this.classxx;
	}
	public void setClassMaster(String classMaster) 
	{
		this.classMaster = classMaster;
	}
	/**
	 * 返回 班主任
	 * @return
	 */
	public String getClassMaster() 
	{
		return this.classMaster;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("school", this.school) 
		.append("classxx", this.classxx) 
		.append("classMaster", this.classMaster) 
		.append("place", this.place) 
		.toString();
	}
	
	
	
}
