package com.lc.ibps.loans.apply.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_jiedai 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:37:03
 *</pre>
 */
 @SuppressWarnings("serial")
public class ApplyMoneyTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  xys; 		/*信用社*/
	protected String  customer; 		/*客户名*/
	protected String  sfid; 		/*身份证号*/
	protected String  dklb; 		/*贷款类别*/

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
	public void setXys(String xys) 
	{
		this.xys = xys;
	}
	/**
	 * 返回 信用社
	 * @return
	 */
	public String getXys() 
	{
		return this.xys;
	}
	public void setCustomer(String customer) 
	{
		this.customer = customer;
	}
	/**
	 * 返回 客户名
	 * @return
	 */
	public String getCustomer() 
	{
		return this.customer;
	}
	public void setSfid(String sfid) 
	{
		this.sfid = sfid;
	}
	/**
	 * 返回 身份证号
	 * @return
	 */
	public String getSfid() 
	{
		return this.sfid;
	}
	public void setDklb(String dklb) 
	{
		this.dklb = dklb;
	}
	/**
	 * 返回 贷款类别
	 * @return
	 */
	public String getDklb() 
	{
		return this.dklb;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("xys", this.xys) 
		.append("customer", this.customer) 
		.append("sfid", this.sfid) 
		.append("dklb", this.dklb) 
		.toString();
	}
}
