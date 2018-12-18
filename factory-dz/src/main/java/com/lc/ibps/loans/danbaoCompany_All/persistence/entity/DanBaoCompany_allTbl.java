package com.lc.ibps.loans.danbaoCompany_All.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_danbaocompany_all 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
 @SuppressWarnings("serial")
public class DanBaoCompany_allTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  dblb; 		/*担保类别*/
	protected String  gsmc; 		/*公司名称*/
	protected String  gsfddbr; 		/*公司法定代表人*/
	protected String  frzjlx; 		/*法人证件类型*/
	protected String  frsfzh; 		/*法人身份证号*/
	protected String  dklb; 		/*贷款类别*/
	protected String  jdid; 		/*借贷id*/

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
	public void setDblb(String dblb) 
	{
		this.dblb = dblb;
	}
	/**
	 * 返回 担保类别
	 * @return
	 */
	public String getDblb() 
	{
		return this.dblb;
	}
	public void setGsmc(String gsmc) 
	{
		this.gsmc = gsmc;
	}
	/**
	 * 返回 公司名称
	 * @return
	 */
	public String getGsmc() 
	{
		return this.gsmc;
	}
	public void setGsfddbr(String gsfddbr) 
	{
		this.gsfddbr = gsfddbr;
	}
	/**
	 * 返回 公司法定代表人
	 * @return
	 */
	public String getGsfddbr() 
	{
		return this.gsfddbr;
	}
	public void setFrzjlx(String frzjlx) 
	{
		this.frzjlx = frzjlx;
	}
	/**
	 * 返回 法人证件类型
	 * @return
	 */
	public String getFrzjlx() 
	{
		return this.frzjlx;
	}
	public void setFrsfzh(String frsfzh) 
	{
		this.frsfzh = frsfzh;
	}
	/**
	 * 返回 法人身份证号
	 * @return
	 */
	public String getFrsfzh() 
	{
		return this.frsfzh;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("dblb", this.dblb) 
		.append("gsmc", this.gsmc) 
		.append("gsfddbr", this.gsfddbr) 
		.append("frzjlx", this.frzjlx) 
		.append("frsfzh", this.frsfzh) 
		.append("dklb", this.dklb) 
		.append("jdid", this.jdid) 
		.toString();
	}
}
