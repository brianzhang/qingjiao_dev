package com.lc.ibps.loans.DaiKSSCSP.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_scryj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
 @SuppressWarnings("serial")
public class ShenCRYJTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  sqzlsfyx; 		/*申请资料是否有效*/
	protected String  jksqrchnl; 		/*借款申请人偿还能力*/
	protected String  jksqrsrhs; 		/*借款申请人收入核实*/
	protected String  dbrsfhs; 		/*担保人身份核实*/
	protected String  dbrdbnl; 		/*担保人担保能力*/
	protected String  jksqr; 		/*借款申请人*/
	protected Double  sxje; 		/*授信金额*/
	protected String  sxqx; 		/*授信期限*/
	protected String  dbfs; 		/*担保方式*/
	protected String  dklb; 		/*贷款类别*/
	protected Double  dkje; 		/*贷款金额*/
	protected String  dkqx; 		/*贷款期限*/
	protected Double  yll; 		/*月利率*/
	protected String  ghfs; 		/*归还方式*/
	protected String  jdid; 		/*借贷Id*/
	protected String  scrid; 		/*审查人Id*/
	protected String  scrqz; 		/*审查人签字*/
	protected Date  scrqzsj; 		/*审查人签字时间*/

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
	public void setSqzlsfyx(String sqzlsfyx) 
	{
		this.sqzlsfyx = sqzlsfyx;
	}
	/**
	 * 返回 申请资料是否有效
	 * @return
	 */
	public String getSqzlsfyx() 
	{
		return this.sqzlsfyx;
	}
	public void setJksqrchnl(String jksqrchnl) 
	{
		this.jksqrchnl = jksqrchnl;
	}
	/**
	 * 返回 借款申请人偿还能力
	 * @return
	 */
	public String getJksqrchnl() 
	{
		return this.jksqrchnl;
	}
	public void setJksqrsrhs(String jksqrsrhs) 
	{
		this.jksqrsrhs = jksqrsrhs;
	}
	/**
	 * 返回 借款申请人收入核实
	 * @return
	 */
	public String getJksqrsrhs() 
	{
		return this.jksqrsrhs;
	}
	public void setDbrsfhs(String dbrsfhs) 
	{
		this.dbrsfhs = dbrsfhs;
	}
	/**
	 * 返回 担保人身份核实
	 * @return
	 */
	public String getDbrsfhs() 
	{
		return this.dbrsfhs;
	}
	public void setDbrdbnl(String dbrdbnl) 
	{
		this.dbrdbnl = dbrdbnl;
	}
	/**
	 * 返回 担保人担保能力
	 * @return
	 */
	public String getDbrdbnl() 
	{
		return this.dbrdbnl;
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
	 * 返回 借贷Id
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	public void setScrid(String scrid) 
	{
		this.scrid = scrid;
	}
	/**
	 * 返回 审查人Id
	 * @return
	 */
	public String getScrid() 
	{
		return this.scrid;
	}
	public void setScrqz(String scrqz) 
	{
		this.scrqz = scrqz;
	}
	/**
	 * 返回 审查人签字
	 * @return
	 */
	public String getScrqz() 
	{
		return this.scrqz;
	}
	public void setScrqzsj(Date scrqzsj) 
	{
		this.scrqzsj = scrqzsj;
	}
	/**
	 * 返回 审查人签字时间
	 * @return
	 */
	public Date getScrqzsj() 
	{
		return this.scrqzsj;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("sqzlsfyx", this.sqzlsfyx) 
		.append("jksqrchnl", this.jksqrchnl) 
		.append("jksqrsrhs", this.jksqrsrhs) 
		.append("dbrsfhs", this.dbrsfhs) 
		.append("dbrdbnl", this.dbrdbnl) 
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
		.append("scrid", this.scrid) 
		.append("scrqz", this.scrqz) 
		.append("scrqzsj", this.scrqzsj) 
		.toString();
	}
}
