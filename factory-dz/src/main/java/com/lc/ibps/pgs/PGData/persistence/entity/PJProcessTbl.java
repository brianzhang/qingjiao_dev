package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_pjgc 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:42:08
 *</pre>
 */
 @SuppressWarnings("serial")
public class PJProcessTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  course_id; 		/*课程id*/
	protected String  name; 		/*名称*/
	protected String  evaluation_term; 		/*评价学期*/
	protected String  evaluation_object; 		/*评价对象*/
	protected String  aim_figure; 		/*目标值*/
	protected String  evaluation_figure; 		/*评价值*/
	protected String  evaluation; 		/*评价*/
	protected String  evaluation_time; 		/*评价日期*/
	protected String  calculation_pro; 		/*计算过程*/

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
	public void setCourse_id(String course_id) 
	{
		this.course_id = course_id;
	}
	/**
	 * 返回 课程id
	 * @return
	 */
	public String getCourse_id() 
	{
		return this.course_id;
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
	public void setEvaluation_term(String evaluation_term) 
	{
		this.evaluation_term = evaluation_term;
	}
	/**
	 * 返回 评价学期
	 * @return
	 */
	public String getEvaluation_term() 
	{
		return this.evaluation_term;
	}
	public void setEvaluation_object(String evaluation_object) 
	{
		this.evaluation_object = evaluation_object;
	}
	/**
	 * 返回 评价对象
	 * @return
	 */
	public String getEvaluation_object() 
	{
		return this.evaluation_object;
	}
	public void setAim_figure(String aim_figure) 
	{
		this.aim_figure = aim_figure;
	}
	/**
	 * 返回 目标值
	 * @return
	 */
	public String getAim_figure() 
	{
		return this.aim_figure;
	}
	public void setEvaluation_figure(String evaluation_figure) 
	{
		this.evaluation_figure = evaluation_figure;
	}
	/**
	 * 返回 评价值
	 * @return
	 */
	public String getEvaluation_figure() 
	{
		return this.evaluation_figure;
	}
	public void setEvaluation(String evaluation) 
	{
		this.evaluation = evaluation;
	}
	/**
	 * 返回 评价
	 * @return
	 */
	public String getEvaluation() 
	{
		return this.evaluation;
	}
	public void setEvaluation_time(String evaluation_time) 
	{
		this.evaluation_time = evaluation_time;
	}
	/**
	 * 返回 评价日期
	 * @return
	 */
	public String getEvaluation_time() 
	{
		return this.evaluation_time;
	}
	public void setCalculation_pro(String calculation_pro) 
	{
		this.calculation_pro = calculation_pro;
	}
	/**
	 * 返回 计算过程
	 * @return
	 */
	public String getCalculation_pro() 
	{
		return this.calculation_pro;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("course_id", this.course_id) 
		.append("name", this.name) 
		.append("evaluation_term", this.evaluation_term) 
		.append("evaluation_object", this.evaluation_object) 
		.append("aim_figure", this.aim_figure) 
		.append("evaluation_figure", this.evaluation_figure) 
		.append("evaluation", this.evaluation) 
		.append("evaluation_time", this.evaluation_time) 
		.append("calculation_pro", this.calculation_pro) 
		.toString();
	}
}
