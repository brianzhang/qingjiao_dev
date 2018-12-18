package com.lc.ibps.pgs.PingJia.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_pymbpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:18:49
 *</pre>
 */
 @SuppressWarnings("serial")
public class PingJiaTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  zhouQi; 		/*评价周期*/
	protected String  pingJieRen; 		/*主要评价人*/
	protected String  juanFen; 		/*评价人身份*/
	protected String  pingJieJiZhi; 		/*评价机制*/
	protected String  fangAnID; 		/*方案ID*/
	protected String  mingCheng; 		/*方案名称*/
	protected String  pingJia; 		/*最近一次评价*/

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
	public void setZhouQi(String zhouQi) 
	{
		this.zhouQi = zhouQi;
	}
	/**
	 * 返回 评价周期
	 * @return
	 */
	public String getZhouQi() 
	{
		return this.zhouQi;
	}
	public void setPingJieRen(String pingJieRen) 
	{
		this.pingJieRen = pingJieRen;
	}
	/**
	 * 返回 主要评价人
	 * @return
	 */
	public String getPingJieRen() 
	{
		return this.pingJieRen;
	}
	public void setJuanFen(String juanFen) 
	{
		this.juanFen = juanFen;
	}
	/**
	 * 返回 评价人身份
	 * @return
	 */
	public String getJuanFen() 
	{
		return this.juanFen;
	}
	public void setPingJieJiZhi(String pingJieJiZhi) 
	{
		this.pingJieJiZhi = pingJieJiZhi;
	}
	/**
	 * 返回 评价机制
	 * @return
	 */
	public String getPingJieJiZhi() 
	{
		return this.pingJieJiZhi;
	}
	public void setFangAnID(String fangAnID) 
	{
		this.fangAnID = fangAnID;
	}
	/**
	 * 返回 方案ID
	 * @return
	 */
	public String getFangAnID() 
	{
		return this.fangAnID;
	}
	public void setMingCheng(String mingCheng) 
	{
		this.mingCheng = mingCheng;
	}
	/**
	 * 返回 方案名称
	 * @return
	 */
	public String getMingCheng() 
	{
		return this.mingCheng;
	}
	public void setPingJia(String pingJia) 
	{
		this.pingJia = pingJia;
	}
	/**
	 * 返回 最近一次评价
	 * @return
	 */
	public String getPingJia() 
	{
		return this.pingJia;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("zhouQi", this.zhouQi) 
		.append("pingJieRen", this.pingJieRen) 
		.append("juanFen", this.juanFen) 
		.append("pingJieJiZhi", this.pingJieJiZhi) 
		.append("fangAnID", this.fangAnID) 
		.append("mingCheng", this.mingCheng) 
		.append("pingJia", this.pingJia) 
		.toString();
	}
}
