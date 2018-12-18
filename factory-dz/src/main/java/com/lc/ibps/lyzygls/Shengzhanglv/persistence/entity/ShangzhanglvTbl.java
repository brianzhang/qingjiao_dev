package com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 该表用于生长率的设置 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:14:02
 *</pre>
 */
 @SuppressWarnings("serial")
public class ShangzhanglvTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  bianHao; 		/*编号*/
	protected String  linFenLeiXing; 		/*林分类型*/
	protected String  lingZu; 		/*龄组*/
	protected Double  shengZhangLu; 		/*生长率*/

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
	public void setLinFenLeiXing(String linFenLeiXing) 
	{
		this.linFenLeiXing = linFenLeiXing;
	}
	/**
	 * 返回 林分类型
	 * @return
	 */
	public String getLinFenLeiXing() 
	{
		return this.linFenLeiXing;
	}
	public void setLingZu(String lingZu) 
	{
		this.lingZu = lingZu;
	}
	/**
	 * 返回 龄组
	 * @return
	 */
	public String getLingZu() 
	{
		return this.lingZu;
	}
	public void setShengZhangLu(Double shengZhangLu) 
	{
		this.shengZhangLu = shengZhangLu;
	}
	/**
	 * 返回 生长率
	 * @return
	 */
	public Double getShengZhangLu() 
	{
		return this.shengZhangLu;
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
		.append("linFenLeiXing", this.linFenLeiXing) 
		.append("lingZu", this.lingZu) 
		.append("shengZhangLu", this.shengZhangLu) 
		.toString();
	}
}
