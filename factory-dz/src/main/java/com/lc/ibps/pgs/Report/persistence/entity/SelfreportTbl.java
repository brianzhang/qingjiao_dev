package com.lc.ibps.pgs.Report.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zpbgdemo 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-14 10:27:15
 *</pre>
 */
 @SuppressWarnings("serial")
public class SelfreportTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  title; 		/*标题*/
	protected String  chapter; 		/*章节*/
	protected String  content; 		/*内容*/

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
	public void setTitle(String title) 
	{
		this.title = title;
	}
	/**
	 * 返回 标题
	 * @return
	 */
	public String getTitle() 
	{
		return this.title;
	}
	public void setChapter(String chapter) 
	{
		this.chapter = chapter;
	}
	/**
	 * 返回 章节
	 * @return
	 */
	public String getChapter() 
	{
		return this.chapter;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("title", this.title) 
		.append("chapter", this.chapter) 
		.append("content", this.content) 
		.toString();
	}
}
