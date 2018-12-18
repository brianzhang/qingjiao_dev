package com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_xdlc 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
 @SuppressWarnings("serial")
public class XinDaiLiuChengTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  customer; 		/*客户名称*/
	protected String  zjlx; 		/*证件类型*/
	protected String  sfid; 		/*证件号码*/
	protected String  dklb; 		/*贷款类别*/
	protected String  wj; 		/*选择的审核人*/
	protected Long  dkje; 		/*贷款金额*/

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
	public void setCustomer(String customer) 
	{
		this.customer = customer;
	}
	/**
	 * 返回 客户名称
	 * @return
	 */
	public String getCustomer() 
	{
		return this.customer;
	}
	public void setZjlx(String zjlx) 
	{
		this.zjlx = zjlx;
	}
	/**
	 * 返回 证件类型
	 * @return
	 */
	public String getZjlx() 
	{
		return this.zjlx;
	}
	public void setSfid(String sfid) 
	{
		this.sfid = sfid;
	}
	/**
	 * 返回 证件号码
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
	public void setWj(String wj) 
	{
		this.wj = wj;
	}
	/**
	 * 返回 文件
	 * @return
	 */
	public String getWj() 
	{
		return this.wj;
	}
	public void setDkje(Long dkje) 
	{
		this.dkje = dkje;
	}
	/**
	 * 返回 贷款金额
	 * @return
	 */
	public Long getDkje() 
	{
		return this.dkje;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("customer", this.customer) 
		.append("zjlx", this.zjlx) 
		.append("sfid", this.sfid) 
		.append("dklb", this.dklb) 
		.append("wj", this.wj) 
		.append("dkje", this.dkje) 
		.toString();
	}
}
