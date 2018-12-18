package com.lc.ibps.lyzygls.JingYQ.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_jyq 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:16:30
 *</pre>
 */
 @SuppressWarnings("serial")
public class JingYQTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  bianHao; 		/*编号*/
	protected String  jingYingQu; 		/*经营区*/

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
	public void setJingYingQu(String jingYingQu) 
	{
		this.jingYingQu = jingYingQu;
	}
	/**
	 * 返回 经营区
	 * @return
	 */
	public String getJingYingQu() 
	{
		return this.jingYingQu;
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
		.append("jingYingQu", this.jingYingQu) 
		.toString();
	}
}
