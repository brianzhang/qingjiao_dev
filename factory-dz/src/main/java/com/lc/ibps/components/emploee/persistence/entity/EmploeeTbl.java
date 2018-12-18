package com.lc.ibps.components.emploee.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_ry 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 14:06:36
 *</pre>
 */
 @SuppressWarnings("serial")
public class EmploeeTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  ip; 		/*IP地址*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  nAME; 		/*姓名*/
	protected Long  age; 		/*年龄*/
	protected String  profession; 		/*职业*/

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
	public void setIp(String ip) 
	{
		this.ip = ip;
	}
	/**
	 * 返回 IP地址
	 * @return
	 */
	public String getIp() 
	{
		return this.ip;
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
	public void setNAME(String nAME) 
	{
		this.nAME = nAME;
	}
	/**
	 * 返回 姓名
	 * @return
	 */
	public String getNAME() 
	{
		return this.nAME;
	}
	public void setAge(Long age) 
	{
		this.age = age;
	}
	/**
	 * 返回 年龄
	 * @return
	 */
	public Long getAge() 
	{
		return this.age;
	}
	public void setProfession(String profession) 
	{
		this.profession = profession;
	}
	/**
	 * 返回 职业
	 * @return
	 */
	public String getProfession() 
	{
		return this.profession;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("ip", this.ip) 
		.append("createBy", this.createBy) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.append("nAME", this.nAME) 
		.append("age", this.age) 
		.append("profession", this.profession) 
		.toString();
	}
}
