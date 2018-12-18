package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_qbkc 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:56:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class AllCourseTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  crs_num; 		/*课程编号*/
	protected String  belong_to; 		/*所属院系*/
	protected String  crs_properties; 		/*课程属性*/
	protected String  crs_name; 		/*课程名*/

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
	public void setCrs_num(String crs_num) 
	{
		this.crs_num = crs_num;
	}
	/**
	 * 返回 课程编号
	 * @return
	 */
	public String getCrs_num() 
	{
		return this.crs_num;
	}
	public void setBelong_to(String belong_to) 
	{
		this.belong_to = belong_to;
	}
	/**
	 * 返回 所属院系
	 * @return
	 */
	public String getBelong_to() 
	{
		return this.belong_to;
	}
	public void setCrs_properties(String crs_properties) 
	{
		this.crs_properties = crs_properties;
	}
	/**
	 * 返回 课程属性
	 * @return
	 */
	public String getCrs_properties() 
	{
		return this.crs_properties;
	}
	public void setCrs_name(String crs_name) 
	{
		this.crs_name = crs_name;
	}
	/**
	 * 返回 课程名
	 * @return
	 */
	public String getCrs_name() 
	{
		return this.crs_name;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("crs_num", this.crs_num) 
		.append("belong_to", this.belong_to) 
		.append("crs_properties", this.crs_properties) 
		.append("crs_name", this.crs_name) 
		.toString();
	}
}
