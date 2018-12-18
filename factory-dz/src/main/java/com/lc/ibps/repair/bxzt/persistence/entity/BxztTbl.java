package com.lc.ibps.repair.bxzt.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_bxzt 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
 @SuppressWarnings("serial")
public class BxztTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  baoXiuID; 		/*报修id*/
	protected String  bxdState; 		/*报修单状态*/
	protected String  clr; 		/*处理人*/
	protected String  beiZhu; 		/*备注*/
	protected String  pgdx;
	
	

	public String getPgdx() {
		return pgdx;
	}
	public void setPgdx(String pgdx) {
		this.pgdx = pgdx;
	}
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
	public void setBaoXiuID(String baoXiuID) 
	{
		this.baoXiuID = baoXiuID;
	}
	/**
	 * 返回 报修id
	 * @return
	 */
	public String getBaoXiuID() 
	{
		return this.baoXiuID;
	}
	public void setBxdState(String bxdState) 
	{
		this.bxdState = bxdState;
	}
	/**
	 * 返回 报修单状态
	 * @return
	 */
	public String getBxdState() 
	{
		return this.bxdState;
	}
	public void setClr(String clr) 
	{
		this.clr = clr;
	}
	/**
	 * 返回 处理人
	 * @return
	 */
	public String getClr() 
	{
		return this.clr;
	}
	public void setBeiZhu(String beiZhu) 
	{
		this.beiZhu = beiZhu;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBeiZhu() 
	{
		return this.beiZhu;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("baoXiuID", this.baoXiuID) 
		.append("bxdState", this.bxdState) 
		.append("clr", this.clr) 
		.append("beiZhu", this.beiZhu) 
		.append("pgdx", this.pgdx) 
		.toString();
	}
}
