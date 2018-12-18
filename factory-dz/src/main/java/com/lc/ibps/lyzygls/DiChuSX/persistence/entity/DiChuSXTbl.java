package com.lc.ibps.lyzygls.DiChuSX.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 该表用于单位概况的地处山系数据 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:20:04
 *</pre>
 */
 @SuppressWarnings("serial")
public class DiChuSXTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  bianHao; 		/*编号*/
	protected String  deChuShanXi; 		/*地处山系*/

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
	public void setBianHao(String bianHao) 
	{
		this.bianHao = bianHao;
	}
	/**
	 * 返回 编号
	 * @return
	 */
	public String getBianHao() 
	{
		return this.bianHao;
	}
	public void setDeChuShanXi(String deChuShanXi) 
	{
		this.deChuShanXi = deChuShanXi;
	}
	/**
	 * 返回 地处山系
	 * @return
	 */
	public String getDeChuShanXi() 
	{
		return this.deChuShanXi;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("bianHao", this.bianHao) 
		.append("deChuShanXi", this.deChuShanXi) 
		.toString();
	}
}
