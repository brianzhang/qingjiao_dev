package com.lc.ibps.loans.demo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_demo_file_ 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 *</pre>
 */
 @SuppressWarnings("serial")
public class DemoFileTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  name; 		/*文件名*/
	protected String  loanid; 		/*所属贷款*/
	protected String  file; 		/*文件串*/

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
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 文件名
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setLoanid(String loanid) 
	{
		this.loanid = loanid;
	}
	/**
	 * 返回 所属贷款
	 * @return
	 */
	public String getLoanid() 
	{
		return this.loanid;
	}
	public void setFile(String file) 
	{
		this.file = file;
	}
	/**
	 * 返回 文件串
	 * @return
	 */
	public String getFile() 
	{
		return this.file;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("name", this.name) 
		.append("loanid", this.loanid) 
		.append("file", this.file) 
		.toString();
	}
}
