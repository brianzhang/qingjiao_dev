package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_zyjxhjdpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:28:30
 *</pre>
 */
 @SuppressWarnings("serial")
public class MainTeachLinkTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  link_name; 		/*环节名称*/
	protected String  quality_dem_node; 		/*质量要求节点*/
	protected String  test_principal; 		/*考核责任人*/
	protected String  basic_data; 		/*基于的基本数据*/
	protected String  record_text; 		/*记录文档*/

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
	public void setLink_name(String link_name) 
	{
		this.link_name = link_name;
	}
	/**
	 * 返回 环节名称
	 * @return
	 */
	public String getLink_name() 
	{
		return this.link_name;
	}
	public void setQuality_dem_node(String quality_dem_node) 
	{
		this.quality_dem_node = quality_dem_node;
	}
	/**
	 * 返回 质量要求节点
	 * @return
	 */
	public String getQuality_dem_node() 
	{
		return this.quality_dem_node;
	}
	public void setTest_principal(String test_principal) 
	{
		this.test_principal = test_principal;
	}
	/**
	 * 返回 考核责任人
	 * @return
	 */
	public String getTest_principal() 
	{
		return this.test_principal;
	}
	public void setBasic_data(String basic_data) 
	{
		this.basic_data = basic_data;
	}
	/**
	 * 返回 基于的基本数据
	 * @return
	 */
	public String getBasic_data() 
	{
		return this.basic_data;
	}
	public void setRecord_text(String record_text) 
	{
		this.record_text = record_text;
	}
	/**
	 * 返回 记录文档
	 * @return
	 */
	public String getRecord_text() 
	{
		return this.record_text;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("link_name", this.link_name) 
		.append("quality_dem_node", this.quality_dem_node) 
		.append("test_principal", this.test_principal) 
		.append("basic_data", this.basic_data) 
		.append("record_text", this.record_text) 
		.toString();
	}
}
