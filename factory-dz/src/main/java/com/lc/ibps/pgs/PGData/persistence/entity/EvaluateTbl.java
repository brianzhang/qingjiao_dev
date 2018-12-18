package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_khhlxpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-21 16:01:36
 *</pre>
 */
 @SuppressWarnings("serial")
public class EvaluateTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  crs_id; 		/*课程ID*/
	protected String  teacher; 		/*教师*/
	protected String  forms; 		/*形式*/
	protected String  proportion1; 		/*比例1*/
	protected String  proportion2; 		/*比例2*/
	protected String  proportion3; 		/*比例3*/
	protected String  decide; 		/*合理性判定*/
	protected String  other; 		/*其他*/
	protected String  result; 		/*判定结果*/
	protected String  ws; 		/*弱项*/
	protected String  principle; 		/*负责人*/

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
	public void setCrs_id(String crs_id) 
	{
		this.crs_id = crs_id;
	}
	/**
	 * 返回 课程ID
	 * @return
	 */
	public String getCrs_id() 
	{
		return this.crs_id;
	}
	public void setTeacher(String teacher) 
	{
		this.teacher = teacher;
	}
	/**
	 * 返回 教师
	 * @return
	 */
	public String getTeacher() 
	{
		return this.teacher;
	}
	public void setForms(String forms) 
	{
		this.forms = forms;
	}
	/**
	 * 返回 形式
	 * @return
	 */
	public String getForms() 
	{
		return this.forms;
	}
	public void setProportion1(String proportion1) 
	{
		this.proportion1 = proportion1;
	}
	/**
	 * 返回 比例1
	 * @return
	 */
	public String getProportion1() 
	{
		return this.proportion1;
	}
	public void setProportion2(String proportion2) 
	{
		this.proportion2 = proportion2;
	}
	/**
	 * 返回 比例2
	 * @return
	 */
	public String getProportion2() 
	{
		return this.proportion2;
	}
	public void setProportion3(String proportion3) 
	{
		this.proportion3 = proportion3;
	}
	/**
	 * 返回 比例3
	 * @return
	 */
	public String getProportion3() 
	{
		return this.proportion3;
	}
	public void setDecide(String decide) 
	{
		this.decide = decide;
	}
	/**
	 * 返回 合理性判定
	 * @return
	 */
	public String getDecide() 
	{
		return this.decide;
	}
	public void setOther(String other) 
	{
		this.other = other;
	}
	/**
	 * 返回 其他
	 * @return
	 */
	public String getOther() 
	{
		return this.other;
	}
	public void setResult(String result) 
	{
		this.result = result;
	}
	/**
	 * 返回 判定结果
	 * @return
	 */
	public String getResult() 
	{
		return this.result;
	}
	public void setWs(String ws) 
	{
		this.ws = ws;
	}
	/**
	 * 返回 弱项
	 * @return
	 */
	public String getWs() 
	{
		return this.ws;
	}
	public void setPrinciple(String principle) 
	{
		this.principle = principle;
	}
	/**
	 * 返回 负责人
	 * @return
	 */
	public String getPrinciple() 
	{
		return this.principle;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("crs_id", this.crs_id) 
		.append("teacher", this.teacher) 
		.append("forms", this.forms) 
		.append("proportion1", this.proportion1) 
		.append("proportion2", this.proportion2) 
		.append("proportion3", this.proportion3) 
		.append("decide", this.decide) 
		.append("other", this.other) 
		.append("result", this.result) 
		.append("ws", this.ws) 
		.append("principle", this.principle) 
		.toString();
	}
}
