package com.lc.ibps.loans.DaiKSSCSP.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_spryj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
 @SuppressWarnings("serial")
public class ShenPRYJTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  jksqr; 		/*借款申请人*/
	protected Double  sxje; 		/*授信金额*/
	protected String  sxqx; 		/*授信期限*/
	protected String  dbfs; 		/*担保方式*/
	protected String  dklb; 		/*贷款类别*/
	protected Double  dkje; 		/*贷款金额*/
	protected String  dkqx; 		/*贷款期限*/
	protected Double  yll; 		/*月利率*/
	protected String  ghfs; 		/*归还方式*/
	protected String  jdid; 		/*借贷id */
	protected String  sprid; 		/*审批人Id*/
	protected String  sprqm; 		/*审批人签名*/
	protected Date  sprqzsj; 		/*审批人签字时间*/

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
	public void setJksqr(String jksqr) 
	{
		this.jksqr = jksqr;
	}
	/**
	 * 返回 借款申请人
	 * @return
	 */
	public String getJksqr() 
	{
		return this.jksqr;
	}
	public void setSxje(Double sxje) 
	{
		this.sxje = sxje;
	}
	/**
	 * 返回 授信金额
	 * @return
	 */
	public Double getSxje() 
	{
		return this.sxje;
	}
	public void setSxqx(String sxqx) 
	{
		this.sxqx = sxqx;
	}
	/**
	 * 返回 授信期限
	 * @return
	 */
	public String getSxqx() 
	{
		return this.sxqx;
	}
	public void setDbfs(String dbfs) 
	{
		this.dbfs = dbfs;
	}
	/**
	 * 返回 担保方式
	 * @return
	 */
	public String getDbfs() 
	{
		return this.dbfs;
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
	public void setDkje(Double dkje) 
	{
		this.dkje = dkje;
	}
	/**
	 * 返回 贷款金额
	 * @return
	 */
	public Double getDkje() 
	{
		return this.dkje;
	}
	public void setDkqx(String dkqx) 
	{
		this.dkqx = dkqx;
	}
	/**
	 * 返回 贷款期限
	 * @return
	 */
	public String getDkqx() 
	{
		return this.dkqx;
	}
	public void setYll(Double yll) 
	{
		this.yll = yll;
	}
	/**
	 * 返回 月利率
	 * @return
	 */
	public Double getYll() 
	{
		return this.yll;
	}
	public void setGhfs(String ghfs) 
	{
		this.ghfs = ghfs;
	}
	/**
	 * 返回 归还方式
	 * @return
	 */
	public String getGhfs() 
	{
		return this.ghfs;
	}
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷id 
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	public void setSprid(String sprid) 
	{
		this.sprid = sprid;
	}
	/**
	 * 返回 审批人Id
	 * @return
	 */
	public String getSprid() 
	{
		return this.sprid;
	}
	public void setSprqm(String sprqm) 
	{
		this.sprqm = sprqm;
	}
	/**
	 * 返回 审批人签名
	 * @return
	 */
	public String getSprqm() 
	{
		return this.sprqm;
	}
	public void setSprqzsj(Date sprqzsj) 
	{
		this.sprqzsj = sprqzsj;
	}
	/**
	 * 返回 审批人签字时间
	 * @return
	 */
	public Date getSprqzsj() 
	{
		return this.sprqzsj;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("jksqr", this.jksqr) 
		.append("sxje", this.sxje) 
		.append("sxqx", this.sxqx) 
		.append("dbfs", this.dbfs) 
		.append("dklb", this.dklb) 
		.append("dkje", this.dkje) 
		.append("dkqx", this.dkqx) 
		.append("yll", this.yll) 
		.append("ghfs", this.ghfs) 
		.append("jdid", this.jdid) 
		.append("sprid", this.sprid) 
		.append("sprqm", this.sprqm) 
		.append("sprqzsj", this.sprqzsj) 
		.toString();
	}
}
