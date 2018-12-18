package com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zytr 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 12:55:07
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZhuYaoTuRangTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  tuRangMingCheng; 		/*土壤名称*/

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
	public void setTuRangMingCheng(String tuRangMingCheng) 
	{
		this.tuRangMingCheng = tuRangMingCheng;
	}
	/**
	 * 返回 土壤名称
	 * @return
	 */
	public String getTuRangMingCheng() 
	{
		return this.tuRangMingCheng;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("tuRangMingCheng", this.tuRangMingCheng) 
		.toString();
	}
}
