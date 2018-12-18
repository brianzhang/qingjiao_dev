package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_pymbhlxpjsjly 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
 @SuppressWarnings("serial")
public class TargetDataSourceTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  type; 		/*类型*/
	protected String  source; 		/*来源*/
	protected String  content; 		/*内容*/
	protected String  form; 		/*形式*/

	protected String  json; 		/*调查问卷json字段*/
	
	
	
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
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
	public void setType(String type) 
	{
		this.type = type;
	}
	/**
	 * 返回 类型
	 * @return
	 */
	public String getType() 
	{
		return this.type;
	}
	public void setSource(String source) 
	{
		this.source = source;
	}
	/**
	 * 返回 来源
	 * @return
	 */
	public String getSource() 
	{
		return this.source;
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
	public void setForm(String form) 
	{
		this.form = form;
	}
	/**
	 * 返回 形式
	 * @return
	 */
	public String getForm() 
	{
		return this.form;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("type", this.type) 
		.append("source", this.source) 
		.append("content", this.content) 
		.append("form", this.form) 
		.toString();
	}
}
