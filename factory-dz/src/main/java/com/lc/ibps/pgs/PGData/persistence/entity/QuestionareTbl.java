package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_dcwj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:44
 *</pre>
 */
 @SuppressWarnings("serial")
public class QuestionareTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  ques_id; 		/*问卷id*/
	protected String  ques_kind; 		/*问卷种类*/

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
	public void setQues_id(String ques_id) 
	{
		this.ques_id = ques_id;
	}
	/**
	 * 返回 问卷id
	 * @return
	 */
	public String getQues_id() 
	{
		return this.ques_id;
	}
	public void setQues_kind(String ques_kind) 
	{
		this.ques_kind = ques_kind;
	}
	/**
	 * 返回 问卷种类
	 * @return
	 */
	public String getQues_kind() 
	{
		return this.ques_kind;
	}
	/**
	 * @see Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("ques_id", this.ques_id) 
		.append("ques_kind", this.ques_kind) 
		.toString();
	}
}
