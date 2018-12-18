package com.lc.ibps.grads.course.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_crs_std 表对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsStdTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  stdNum; 		/*学号*/
	protected String  crsTchId; 		/*教师授课id*/
	protected float  score; 		/*总成绩*/
	protected String  crs_num; 		/*课程编号*/
	
	
	

	
	

	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	public void setStdNum(String stdNum) 
	{
		this.stdNum = stdNum;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getStdNum() 
	{
		return this.stdNum;
	}
	public void setCrsTchId(String crsTchId) 
	{
		this.crsTchId = crsTchId;
	}
	/**
	 * 返回 授课码
	 * @return
	 */
	public String getCrsTchId() 
	{
		return this.crsTchId;
	}
	public void setScore(float score) 
	{
		this.score = score;
		
	}
	/**
	 * 返回 总成绩
	 * @return
	 */
	public float getScore() 
	{
		return this.score;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("stdNum", this.stdNum) 
		.append("crsTchId", this.crsTchId) 
		.append("score", this.score) 
		.toString();
	}
}
