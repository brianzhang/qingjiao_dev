package com.lc.ibps.pgs.Report.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_ysqk 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 13:55:55
 *</pre>
 */
 @SuppressWarnings("serial")
public class FlactionTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  courseId; 		/*课程ID*/
	protected String  name; 		/*名称*/
	protected String  objective; 		/*课程目标 */
	protected String  techRequirement; 		/*教学基本要求*/
	protected String  indexPoint; 		/*参考指标点*/
	protected String  teachRequirement; 		/*教学基本要求项*/
	protected String  textForm; 		/*考核形式*/
	protected String  account; 		/*占总成绩比例*/

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
	public void setCourseId(String courseId) 
	{
		this.courseId = courseId;
	}
	/**
	 * 返回 课程ID
	 * @return
	 */
	public String getCourseId() 
	{
		return this.courseId;
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
	public void setObjective(String objective) 
	{
		this.objective = objective;
	}
	/**
	 * 返回 课程目标 
	 * @return
	 */
	public String getObjective() 
	{
		return this.objective;
	}
	public void setTechRequirement(String techRequirement) 
	{
		this.techRequirement = techRequirement;
	}
	/**
	 * 返回 教学基本要求
	 * @return
	 */
	public String getTechRequirement() 
	{
		return this.techRequirement;
	}
	public void setIndexPoint(String indexPoint) 
	{
		this.indexPoint = indexPoint;
	}
	/**
	 * 返回 参考指标点
	 * @return
	 */
	public String getIndexPoint() 
	{
		return this.indexPoint;
	}
	public void setTeachRequirement(String teachRequirement) 
	{
		this.teachRequirement = teachRequirement;
	}
	/**
	 * 返回 教学基本要求项
	 * @return
	 */
	public String getTeachRequirement() 
	{
		return this.teachRequirement;
	}
	public void setTextForm(String textForm) 
	{
		this.textForm = textForm;
	}
	/**
	 * 返回 考核形式
	 * @return
	 */
	public String getTextForm() 
	{
		return this.textForm;
	}
	public void setAccount(String account) 
	{
		this.account = account;
	}
	/**
	 * 返回 占总成绩比例
	 * @return
	 */
	public String getAccount() 
	{
		return this.account;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("courseId", this.courseId) 
		.append("name", this.name) 
		.append("objective", this.objective) 
		.append("techRequirement", this.techRequirement) 
		.append("indexPoint", this.indexPoint) 
		.append("teachRequirement", this.teachRequirement) 
		.append("textForm", this.textForm) 
		.append("account", this.account) 
		.toString();
	}
}
