package com.lc.ibps.pgs.Report.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_khhlxjxpjbyyqpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:07:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class MeasureTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  content1; 		/*评价内容1*/
	protected String  content2; 		/*评价内容2*/
	protected String  organizer; 		/*组织者*/
	protected String  evalutionResult; 		/*评价结果*/
	protected String  evalutionWay; 		/*评价方式*/
	protected String  executor; 		/*实施者*/

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
	public void setContent1(String content1) 
	{
		this.content1 = content1;
	}
	/**
	 * 返回 评价内容1
	 * @return
	 */
	public String getContent1() 
	{
		return this.content1;
	}
	public void setContent2(String content2) 
	{
		this.content2 = content2;
	}
	/**
	 * 返回 评价内容2
	 * @return
	 */
	public String getContent2() 
	{
		return this.content2;
	}
	public void setOrganizer(String organizer) 
	{
		this.organizer = organizer;
	}
	/**
	 * 返回 组织者
	 * @return
	 */
	public String getOrganizer() 
	{
		return this.organizer;
	}
	public void setEvalutionResult(String evalutionResult) 
	{
		this.evalutionResult = evalutionResult;
	}
	/**
	 * 返回 评价结果
	 * @return
	 */
	public String getEvalutionResult() 
	{
		return this.evalutionResult;
	}
	public void setEvalutionWay(String evalutionWay) 
	{
		this.evalutionWay = evalutionWay;
	}
	/**
	 * 返回 评价方式
	 * @return
	 */
	public String getEvalutionWay() 
	{
		return this.evalutionWay;
	}
	public void setExecutor(String executor) 
	{
		this.executor = executor;
	}
	/**
	 * 返回 实施者
	 * @return
	 */
	public String getExecutor() 
	{
		return this.executor;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("content1", this.content1) 
		.append("content2", this.content2) 
		.append("organizer", this.organizer) 
		.append("evalutionResult", this.evalutionResult) 
		.append("evalutionWay", this.evalutionWay) 
		.append("executor", this.executor) 
		.toString();
	}
}
