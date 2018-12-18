package com.lc.ibps.repair.bxhcb.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_bxhcb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
 @SuppressWarnings("serial")
public class BxhcbTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  bxdId; 		/*报修单ID*/
	protected String  haoCaiMingCheng; 		/*耗材名称*/
	protected Long  haoCaiShuLiang; 		/*耗材数量*/

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
	public void setBxdId(String bxdId) 
	{
		this.bxdId = bxdId;
	}
	/**
	 * 返回 报修单ID
	 * @return
	 */
	public String getBxdId() 
	{
		return this.bxdId;
	}
	public void setHaoCaiMingCheng(String haoCaiMingCheng) 
	{
		this.haoCaiMingCheng = haoCaiMingCheng;
	}
	/**
	 * 返回 耗材名称
	 * @return
	 */
	public String getHaoCaiMingCheng() 
	{
		return this.haoCaiMingCheng;
	}
	public void setHaoCaiShuLiang(Long haoCaiShuLiang) 
	{
		this.haoCaiShuLiang = haoCaiShuLiang;
	}
	/**
	 * 返回 耗材数量
	 * @return
	 */
	public Long getHaoCaiShuLiang() 
	{
		return this.haoCaiShuLiang;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("bxdId", this.bxdId) 
		.append("haoCaiMingCheng", this.haoCaiMingCheng) 
		.append("haoCaiShuLiang", this.haoCaiShuLiang) 
		.toString();
	}
}
