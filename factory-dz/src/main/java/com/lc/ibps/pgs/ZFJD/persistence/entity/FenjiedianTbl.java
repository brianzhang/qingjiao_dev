package com.lc.ibps.pgs.ZFJD.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_fenjiedian 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 *</pre>
 */
 @SuppressWarnings("serial")
public class FenjiedianTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  pymb_id; 		/*培养目标ID*/
	protected String  pro_name; 		/*专业名称*/
	protected String  pro_id; 		/*专业ID*/
	protected String  content; 		/*分解内容*/
	protected String  title; 		/*分解点标题*/
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
	public void setPymb_id(String pymb_id) 
	{
		this.pymb_id = pymb_id;
	}
	/**
	 * 返回 培养目标ID
	 * @return
	 */
	public String getPymb_id() 
	{
		return this.pymb_id;
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
	public void setContent(String content) 
	{
		this.content = content;
	}
	/**
	 * 返回 分解内容
	 * @return
	 */
	public String getContent() 
	{
		return this.content;
	}
	public void setTitle(String title) 
	{
		this.title = title;
	}
	/**
	 * 返回 分解点标题
	 * @return
	 */
	public String getTitle() 
	{
		return this.title;
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
		.append("pymb_id", this.pymb_id) 
		.append("pro_name", this.pro_name) 
		.append("pro_id", this.pro_id) 
		.append("content", this.content) 
		.append("title", this.title) 
		.append("history", this.history) 
		.toString();
	}
}
