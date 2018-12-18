package com.lc.ibps.pgs.DataSs.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_sjly 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 17:12:48
 *</pre>
 */
 @SuppressWarnings("serial")
public class DataSsTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  pingJieID; 		/*评价ID*/
	protected String  shuJuLeiXing; 		/*数据类型*/
	protected String  shuoJuLaiYuan; 		/*数据来源*/
	protected String  pingJieNeiRong; 		/*评价内容*/
	protected String  pingJiaXingShi; 		/*评价形式*/

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
	public void setPingJieID(String pingJieID) 
	{
		this.pingJieID = pingJieID;
	}
	/**
	 * 返回 评价ID
	 * @return
	 */
	public String getPingJieID() 
	{
		return this.pingJieID;
	}
	public void setShuJuLeiXing(String shuJuLeiXing) 
	{
		this.shuJuLeiXing = shuJuLeiXing;
	}
	/**
	 * 返回 数据类型
	 * @return
	 */
	public String getShuJuLeiXing() 
	{
		return this.shuJuLeiXing;
	}
	public void setShuoJuLaiYuan(String shuoJuLaiYuan) 
	{
		this.shuoJuLaiYuan = shuoJuLaiYuan;
	}
	/**
	 * 返回 数据来源
	 * @return
	 */
	public String getShuoJuLaiYuan() 
	{
		return this.shuoJuLaiYuan;
	}
	public void setPingJieNeiRong(String pingJieNeiRong) 
	{
		this.pingJieNeiRong = pingJieNeiRong;
	}
	/**
	 * 返回 评价内容
	 * @return
	 */
	public String getPingJieNeiRong() 
	{
		return this.pingJieNeiRong;
	}
	public void setPingJiaXingShi(String pingJiaXingShi) 
	{
		this.pingJiaXingShi = pingJiaXingShi;
	}
	/**
	 * 返回 评价形式
	 * @return
	 */
	public String getPingJiaXingShi() 
	{
		return this.pingJiaXingShi;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("pingJieID", this.pingJieID) 
		.append("shuJuLeiXing", this.shuJuLeiXing) 
		.append("shuoJuLaiYuan", this.shuoJuLaiYuan) 
		.append("pingJieNeiRong", this.pingJieNeiRong) 
		.append("pingJiaXingShi", this.pingJiaXingShi) 
		.toString();
	}
}
