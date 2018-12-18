package com.lc.ibps.patrols.data.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_tch_inf 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
 @SuppressWarnings("serial")
public class TchInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  school; 		/*学校*/
	protected String  tchName; 		/*教师姓名*/
	protected String  tchNum; 		/*教师工号*/
	protected String  subject; 		/*科目*/

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
	public void setTchName(String tchName) 
	{
		this.tchName = tchName;
	}
	/**
	 * 返回 教师姓名
	 * @return
	 */
	public String getTchName() 
	{
		return this.tchName;
	}
	public void setTchNum(String tchNum) 
	{
		this.tchNum = tchNum;
	}
	/**
	 * 返回 教师工号
	 * @return
	 */
	public String getTchNum() 
	{
		return this.tchNum;
	}
	public void setSubject(String subject) 
	{
		this.subject = subject;
	}
	/**
	 * 返回 科目
	 * @return
	 */
	public String getSubject() 
	{
		return this.subject;
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
		.append("tchName", this.tchName) 
		.append("tchNum", this.tchNum) 
		.append("subject", this.subject) 
		.toString();
	}
	
	
}
