package com.lc.ibps.loans.danBaoCompany.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_dbgs 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 18:38:26
 *</pre>
 */
 @SuppressWarnings("serial")
public class DanBaoCompanyInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  dbgskhmc; 		/*担保公司客户名称*/
	protected String  dbxz; 		/*担保性质*/
	protected String  fzr; 		/*负责人*/
	protected String  lxdh; 		/*联系电话*/
	protected String  dbjyzgxkz; 		/*担保经营资格许可证*/
	protected String  bzjzh; 		/*保证金账号*/
	protected String  bzjfzh; 		/*保证金分账号*/
	protected Long  bzjje; 		/*保证金金额*/
	protected String  yxfdbs; 		/*允许放大倍数*/
	protected String  kbjg; 		/*开办机构*/
	protected Date  sxrq; 		/*生效日期*/
	protected Date  dqrq; 		/*到期日期*/
	protected String  jdid; 		/*借贷ID*/
	protected String  dbgskhh; 		/*担保公司客户号*/

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
	public void setDbgskhmc(String dbgskhmc) 
	{
		this.dbgskhmc = dbgskhmc;
	}
	/**
	 * 返回 担保公司客户名称
	 * @return
	 */
	public String getDbgskhmc() 
	{
		return this.dbgskhmc;
	}
	public void setDbxz(String dbxz) 
	{
		this.dbxz = dbxz;
	}
	/**
	 * 返回 担保性质
	 * @return
	 */
	public String getDbxz() 
	{
		return this.dbxz;
	}
	public void setFzr(String fzr) 
	{
		this.fzr = fzr;
	}
	/**
	 * 返回 负责人
	 * @return
	 */
	public String getFzr() 
	{
		return this.fzr;
	}
	public void setLxdh(String lxdh) 
	{
		this.lxdh = lxdh;
	}
	/**
	 * 返回 联系电话
	 * @return
	 */
	public String getLxdh() 
	{
		return this.lxdh;
	}
	public void setDbjyzgxkz(String dbjyzgxkz) 
	{
		this.dbjyzgxkz = dbjyzgxkz;
	}
	/**
	 * 返回 担保经营资格许可证
	 * @return
	 */
	public String getDbjyzgxkz() 
	{
		return this.dbjyzgxkz;
	}
	public void setBzjzh(String bzjzh) 
	{
		this.bzjzh = bzjzh;
	}
	/**
	 * 返回 保证金账号
	 * @return
	 */
	public String getBzjzh() 
	{
		return this.bzjzh;
	}
	public void setBzjfzh(String bzjfzh) 
	{
		this.bzjfzh = bzjfzh;
	}
	/**
	 * 返回 保证金分账号
	 * @return
	 */
	public String getBzjfzh() 
	{
		return this.bzjfzh;
	}
	public void setBzjje(Long bzjje) 
	{
		this.bzjje = bzjje;
	}
	/**
	 * 返回 保证金金额
	 * @return
	 */
	public Long getBzjje() 
	{
		return this.bzjje;
	}
	public void setYxfdbs(String yxfdbs) 
	{
		this.yxfdbs = yxfdbs;
	}
	/**
	 * 返回 允许放大倍数
	 * @return
	 */
	public String getYxfdbs() 
	{
		return this.yxfdbs;
	}
	public void setKbjg(String kbjg) 
	{
		this.kbjg = kbjg;
	}
	/**
	 * 返回 开办机构
	 * @return
	 */
	public String getKbjg() 
	{
		return this.kbjg;
	}
	public void setSxrq(Date sxrq) 
	{
		this.sxrq = sxrq;
	}
	/**
	 * 返回 生效日期
	 * @return
	 */
	public Date getSxrq() 
	{
		return this.sxrq;
	}
	public void setDqrq(Date dqrq) 
	{
		this.dqrq = dqrq;
	}
	/**
	 * 返回 到期日期
	 * @return
	 */
	public Date getDqrq() 
	{
		return this.dqrq;
	}
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷ID
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	public void setDbgskhh(String dbgskhh) 
	{
		this.dbgskhh = dbgskhh;
	}
	/**
	 * 返回 担保公司客户号
	 * @return
	 */
	public String getDbgskhh() 
	{
		return this.dbgskhh;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("dbgskhmc", this.dbgskhmc) 
		.append("dbxz", this.dbxz) 
		.append("fzr", this.fzr) 
		.append("lxdh", this.lxdh) 
		.append("dbjyzgxkz", this.dbjyzgxkz) 
		.append("bzjzh", this.bzjzh) 
		.append("bzjfzh", this.bzjfzh) 
		.append("bzjje", this.bzjje) 
		.append("yxfdbs", this.yxfdbs) 
		.append("kbjg", this.kbjg) 
		.append("sxrq", this.sxrq) 
		.append("dqrq", this.dqrq) 
		.append("jdid", this.jdid) 
		.append("dbgskhh", this.dbgskhh) 
		.toString();
	}
}
