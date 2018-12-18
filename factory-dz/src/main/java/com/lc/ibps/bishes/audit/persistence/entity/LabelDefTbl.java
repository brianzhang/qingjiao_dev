package com.lc.ibps.bishes.audit.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_label_def 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
 @SuppressWarnings("serial")
public class LabelDefTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  labelName; 		/*标签名称*/
	protected String  orgId; 		/*院系*/
	protected String typeId;

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
	public void setLabelName(String labelName) 
	{
		this.labelName = labelName;
	}
	/**
	 * 返回 标签名称
	 * @return
	 */
	public String getLabelName() 
	{
		return this.labelName;
	}
	public void setOrgId(String orgId) 
	{
		this.orgId = orgId;
	}
	/**
	 * 返回 标签所在系
	 * @return
	 */
	public String getOrgId() 
	{
		return this.orgId;
	}
	
	
	
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("labelName", this.labelName) 
		.append("orgId", this.orgId) 
		.toString();
	}
}
