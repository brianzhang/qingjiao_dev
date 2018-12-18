package com.lc.ibps.bishes.groupuser.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_group_user 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class GroupUserTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  groupId; 		/*小组id*/
	protected String  userId; 		/*人员id*/
	protected String  type;

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
	public void setCreateBy(String createBy) 
	{
		this.createBy = createBy;
	}
	/**
	 * 返回 创建人
	 * @return
	 */
	public String getCreateBy() 
	{
		return this.createBy;
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
	public void setUpdateBy(String updateBy) 
	{
		this.updateBy = updateBy;
	}
	/**
	 * 返回 更新人
	 * @return
	 */
	public String getUpdateBy() 
	{
		return this.updateBy;
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
	public void setGroupId(String groupId) 
	{
		this.groupId = groupId;
	}
	/**
	 * 返回 小组id
	 * @return
	 */
	public String getGroupId() 
	{
		return this.groupId;
	}
	public void setUserId(String userId) 
	{
		this.userId = userId;
	}
	/**
	 * 返回 人员id
	 * @return
	 */
	public String getUserId() 
	{
		return this.userId;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	
	
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.append("group_id_", this.groupId) 
		.append("user_id_", this.userId)
		.append("type", this.type)
		.toString();
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
