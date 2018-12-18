package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_dcddygx 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:38:00
 *</pre>
 */
 @SuppressWarnings("serial")
public class DegreeRelationshipTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  over_eval_figure; 		/*达成度评价值>=0.7,评价结果达成*/
	protected String  low_eval_figure; 		/*达成度评价值<0.7,评价结果未达成*/

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
	public void setOver_eval_figure(String over_eval_figure) 
	{
		this.over_eval_figure = over_eval_figure;
	}
	/**
	 * 返回 达成度评价值>=0.7,评价结果达成
	 * @return
	 */
	public String getOver_eval_figure() 
	{
		return this.over_eval_figure;
	}
	public void setLow_eval_figure(String low_eval_figure) 
	{
		this.low_eval_figure = low_eval_figure;
	}
	/**
	 * 返回 达成度评价值<0.7,评价结果未达成
	 * @return
	 */
	public String getLow_eval_figure() 
	{
		return this.low_eval_figure;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("over_eval_figure", this.over_eval_figure) 
		.append("low_eval_figure", this.low_eval_figure) 
		.toString();
	}
}
