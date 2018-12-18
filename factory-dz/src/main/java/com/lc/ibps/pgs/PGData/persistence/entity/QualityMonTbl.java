package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_mxdcddzljktx 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 14:08:24
 *</pre>
 */
 @SuppressWarnings("serial")
public class QualityMonTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  monitory; 		/*监控点*/
	protected String  quality; 		/*质量标准*/
	protected String  evaluation_method; 		/*评价方法*/
	protected String  evalution_period; 		/*评价周期*/
	protected String  exector; 		/*评价执行主体*/
	protected String  measures; 		/*反馈改进措施 */
	protected String  responsible; 		/*运行监督责任人*/

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
	public void setMonitory(String monitory) 
	{
		this.monitory = monitory;
	}
	/**
	 * 返回 监控点
	 * @return
	 */
	public String getMonitory() 
	{
		return this.monitory;
	}
	public void setQuality(String quality) 
	{
		this.quality = quality;
	}
	/**
	 * 返回 质量标准
	 * @return
	 */
	public String getQuality() 
	{
		return this.quality;
	}
	public void setEvaluation_method(String evaluation_method) 
	{
		this.evaluation_method = evaluation_method;
	}
	/**
	 * 返回 评价方法
	 * @return
	 */
	public String getEvaluation_method() 
	{
		return this.evaluation_method;
	}
	public void setEvalution_period(String evalution_period) 
	{
		this.evalution_period = evalution_period;
	}
	/**
	 * 返回 评价周期
	 * @return
	 */
	public String getEvalution_period() 
	{
		return this.evalution_period;
	}
	public void setExector(String exector) 
	{
		this.exector = exector;
	}
	/**
	 * 返回 评价执行主体
	 * @return
	 */
	public String getExector() 
	{
		return this.exector;
	}
	public void setMeasures(String measures) 
	{
		this.measures = measures;
	}
	/**
	 * 返回 反馈改进措施 
	 * @return
	 */
	public String getMeasures() 
	{
		return this.measures;
	}
	public void setResponsible(String responsible) 
	{
		this.responsible = responsible;
	}
	/**
	 * 返回 运行监督责任人
	 * @return
	 */
	public String getResponsible() 
	{
		return this.responsible;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("monitory", this.monitory) 
		.append("quality", this.quality) 
		.append("evaluation_method", this.evaluation_method) 
		.append("evalution_period", this.evalution_period) 
		.append("exector", this.exector) 
		.append("measures", this.measures) 
		.append("responsible", this.responsible) 
		.toString();
	}
}
