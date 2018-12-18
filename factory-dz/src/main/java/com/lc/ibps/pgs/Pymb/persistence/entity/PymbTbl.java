package com.lc.ibps.pgs.Pymb.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_pymb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:24
 *</pre>
 */
 @SuppressWarnings("serial")
public class PymbTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  school_local; 		/*办学定位*/
	protected String  pro_local; 		/*专业定位*/
	protected String  subject_zhi_cheng_; 		/*学科支撑*/
	protected String  social_demand; 		/*本专业社会需求*/
	protected String  pro_name; 		/*专业名称*/
	protected String  pro_id; 		/*专业ID*/
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
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	public void setSchool_local(String school_local) 
	{
		this.school_local = school_local;
	}
	/**
	 * 返回 办学定位
	 * @return
	 */
	public String getSchool_local() 
	{
		return this.school_local;
	}
	public void setPro_local(String pro_local) 
	{
		this.pro_local = pro_local;
	}
	/**
	 * 返回 专业定位
	 * @return
	 */
	public String getPro_local() 
	{
		return this.pro_local;
	}
	public void setSubject_zhi_cheng_(String subject_zhi_cheng_) 
	{
		this.subject_zhi_cheng_ = subject_zhi_cheng_;
	}
	/**
	 * 返回 学科支撑
	 * @return
	 */
	public String getSubject_zhi_cheng_() 
	{
		return this.subject_zhi_cheng_;
	}
	public void setSocial_demand(String social_demand) 
	{
		this.social_demand = social_demand;
	}
	/**
	 * 返回 本专业社会需求
	 * @return
	 */
	public String getSocial_demand() 
	{
		return this.social_demand;
	}
	public void setPro_name(String pro_name) 
	{
		this.pro_name = pro_name;
	}
	/**
	 * 返回 专业名称
	 * @return
	 */
	public String getPro_name() 
	{
		return this.pro_name;
	}
	public void setPro_id(String pro_id) 
	{
		this.pro_id = pro_id;
	}
	/**
	 * 返回 专业ID
	 * @return
	 */
	public String getPro_id() 
	{
		return this.pro_id;
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
		.append("updateTime", this.updateTime) 
		.append("school_local", this.school_local) 
		.append("pro_local", this.pro_local) 
		.append("subject_zhi_cheng_", this.subject_zhi_cheng_) 
		.append("social_demand", this.social_demand) 
		.append("pro_name", this.pro_name) 
		.append("pro_id", this.pro_id) 
		.append("history", this.history) 
		.toString();
	}
}
