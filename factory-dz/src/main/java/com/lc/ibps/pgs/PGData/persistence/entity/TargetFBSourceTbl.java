package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_fkyjsjly 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:06:24
 *</pre>
 */
 @SuppressWarnings("serial")
public class TargetFBSourceTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  time; 		/*时间*/
	protected String  name; 		/*姓名*/
	protected String  job; 		/*单位*/
	protected String  position; 		/*职称*/
	protected String  content; 		/*内容*/
	protected String  advice; 		/*意见*/
	protected String  form; 		/*形式*/
	protected String  remark; 		/*备注*/

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
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 姓名
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setJob(String job) 
	{
		this.job = job;
	}
	/**
	 * 返回 单位
	 * @return
	 */
	public String getJob() 
	{
		return this.job;
	}
	public void setPosition(String position) 
	{
		this.position = position;
	}
	/**
	 * 返回 职称
	 * @return
	 */
	public String getPosition() 
	{
		return this.position;
	}
	public void setContent(String content) 
	{
		this.content = content;
	}
	/**
	 * 返回 内容
	 * @return
	 */
	public String getContent() 
	{
		return this.content;
	}
	public void setAdvice(String advice) 
	{
		this.advice = advice;
	}
	/**
	 * 返回 意见
	 * @return
	 */
	public String getAdvice() 
	{
		return this.advice;
	}
	public void setForm(String form) 
	{
		this.form = form;
	}
	/**
	 * 返回 形式
	 * @return
	 */
	public String getForm() 
	{
		return this.form;
	}
	public void setRemark(String remark) 
	{
		this.remark = remark;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getRemark() 
	{
		return this.remark;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("time", this.time) 
		.append("name", this.name) 
		.append("job", this.job) 
		.append("position", this.position) 
		.append("content", this.content) 
		.append("advice", this.advice) 
		.append("form", this.form) 
		.append("remark", this.remark) 
		.toString();
	}
}
