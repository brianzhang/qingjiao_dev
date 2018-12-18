package com.lc.ibps.components.codegen.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 页面表单管理 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
 @SuppressWarnings("serial")
public class PageFormTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  pageKey; 		/*页面Key*/
	protected String  formKey; 		/*表单Key*/
	protected String  comment; 		/*备注*/
	protected String  ip; 		/*IP地址*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/

	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	public void setPageKey(String pageKey) 
	{
		this.pageKey = pageKey;
	}
	/**
	 * 返回 页面Key
	 * @return
	 */
	public String getPageKey() 
	{
		return this.pageKey;
	}
	public void setFormKey(String formKey) 
	{
		this.formKey = formKey;
	}
	/**
	 * 返回 表单Key
	 * @return
	 */
	public String getFormKey() 
	{
		return this.formKey;
	}
	
	@Override
	public void setCreateBy(String createBy) 
	{
		this.createBy = createBy;
	}
	/**
	 * 返回 创建人
	 * @return
	 */
	@Override
	public String getCreateBy() 
	{
		return this.createBy;
	}
	@Override
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	@Override
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	@Override
	public void setUpdateBy(String updateBy) 
	{
		this.updateBy = updateBy;
	}
	/**
	 * 返回 更新人
	 * @return
	 */
	@Override
	public String getUpdateBy() 
	{
		return this.updateBy;
	}
	@Override
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	@Override
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("pageKey", this.pageKey) 
		.append("formKey", this.formKey) 
		.append("ip", this.ip) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.toString();
	}
}
