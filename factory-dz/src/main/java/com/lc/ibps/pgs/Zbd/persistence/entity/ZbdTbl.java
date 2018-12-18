package com.lc.ibps.pgs.Zbd.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zbd 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZbdTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  demand_id; 		/*要求ID*/
	protected String  zhi_biao_dian_id_; 		/*指标点序号*/
	protected String  content; 		/*内容*/
	protected String  history; 		/*history*/

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
	public void setDemand_id(String demand_id) 
	{
		this.demand_id = demand_id;
	}
	/**
	 * 返回 要求ID
	 * @return
	 */
	public String getDemand_id() 
	{
		return this.demand_id;
	}
	public void setZhi_biao_dian_id_(String zhi_biao_dian_id_) 
	{
		this.zhi_biao_dian_id_ = zhi_biao_dian_id_;
	}
	/**
	 * 返回 指标点序号
	 * @return
	 */
	public String getZhi_biao_dian_id_() 
	{
		return this.zhi_biao_dian_id_;
	}
	public void setContent(String content) 
	{
		this.content = content;
	}
	/**
	 * 返回 内容
	 * @return
	 */
	public String getContent() 
	{
		return this.content;
	}
	public void setHistory(String history) 
	{
		this.history = history;
	}
	/**
	 * 返回 history
	 * @return
	 */
	public String getHistory() 
	{
		return this.history;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("demand_id", this.demand_id) 
		.append("zhi_biao_dian_id_", this.zhi_biao_dian_id_) 
		.append("content", this.content) 
		.append("history", this.history) 
		.toString();
	}
}
