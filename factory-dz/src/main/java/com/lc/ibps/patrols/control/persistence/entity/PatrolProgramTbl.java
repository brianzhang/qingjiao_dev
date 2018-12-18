package com.lc.ibps.patrols.control.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 巡课方案 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:19
 *</pre>
 */
 @SuppressWarnings("serial")
public class PatrolProgramTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  remarks; 		/*名称*/
	protected String  patroller; 		/*执行人*/
	protected String  startTime; 		/*巡课时间*/
	protected Date  createTime; 		/*巡课时间*/

	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPatroller() {
		return patroller;
	}
	public void setPatroller(String patroller) {
		this.patroller = patroller;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
}
