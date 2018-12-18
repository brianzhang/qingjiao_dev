package com.lc.ibps.loans.GRGZLL.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_grll 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:01
 *</pre>
 */
 @SuppressWarnings("serial")
public class GRGZLLTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  khh; 		/*客户号*/
	protected String  khmc; 		/*客户名称*/
	protected String  ksrq; 		/*开始日期*/
	protected String  szdw; 		/*所在单位*/
	protected String  szbm; 		/*所在部门*/
	protected String  jsrq; 		/*结束日期*/
	protected String  dwxz; 		/*单位性质*/
	protected String  csxyms; 		/*从事行业描述*/
	protected String  drzw; 		/*担任职务*/
	protected String  dwyb; 		/*单位邮编*/
	protected String  dwdh; 		/*单位电话*/
	protected String  dwdz; 		/*单位地址*/
	protected Double  ysr; 		/*月收入*/
	protected String  bzz; 		/*备注*/

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
	public void setKhh(String khh) 
	{
		this.khh = khh;
	}
	/**
	 * 返回 客户号
	 * @return
	 */
	public String getKhh() 
	{
		return this.khh;
	}
	public void setKhmc(String khmc) 
	{
		this.khmc = khmc;
	}
	/**
	 * 返回 客户名称
	 * @return
	 */
	public String getKhmc() 
	{
		return this.khmc;
	}
	public void setKsrq(String ksrq) 
	{
		this.ksrq = ksrq;
	}
	/**
	 * 返回 开始日期
	 * @return
	 */
	public String getKsrq() 
	{
		return this.ksrq;
	}
	public void setSzdw(String szdw) 
	{
		this.szdw = szdw;
	}
	/**
	 * 返回 所在单位
	 * @return
	 */
	public String getSzdw() 
	{
		return this.szdw;
	}
	public void setSzbm(String szbm) 
	{
		this.szbm = szbm;
	}
	/**
	 * 返回 所在部门
	 * @return
	 */
	public String getSzbm() 
	{
		return this.szbm;
	}
	public void setJsrq(String jsrq) 
	{
		this.jsrq = jsrq;
	}
	/**
	 * 返回 结束日期
	 * @return
	 */
	public String getJsrq() 
	{
		return this.jsrq;
	}
	public void setDwxz(String dwxz) 
	{
		this.dwxz = dwxz;
	}
	/**
	 * 返回 单位性质
	 * @return
	 */
	public String getDwxz() 
	{
		return this.dwxz;
	}
	public void setCsxyms(String csxyms) 
	{
		this.csxyms = csxyms;
	}
	/**
	 * 返回 从事行业描述
	 * @return
	 */
	public String getCsxyms() 
	{
		return this.csxyms;
	}
	public void setDrzw(String drzw) 
	{
		this.drzw = drzw;
	}
	/**
	 * 返回 担任职务
	 * @return
	 */
	public String getDrzw() 
	{
		return this.drzw;
	}
	public void setDwyb(String dwyb) 
	{
		this.dwyb = dwyb;
	}
	/**
	 * 返回 单位邮编
	 * @return
	 */
	public String getDwyb() 
	{
		return this.dwyb;
	}
	public void setDwdh(String dwdh) 
	{
		this.dwdh = dwdh;
	}
	/**
	 * 返回 单位电话
	 * @return
	 */
	public String getDwdh() 
	{
		return this.dwdh;
	}
	public void setDwdz(String dwdz) 
	{
		this.dwdz = dwdz;
	}
	/**
	 * 返回 单位地址
	 * @return
	 */
	public String getDwdz() 
	{
		return this.dwdz;
	}
	public void setYsr(Double ysr) 
	{
		this.ysr = ysr;
	}
	/**
	 * 返回 月收入
	 * @return
	 */
	public Double getYsr() 
	{
		return this.ysr;
	}
	public void setBzz(String bzz) 
	{
		this.bzz = bzz;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBzz() 
	{
		return this.bzz;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("khh", this.khh) 
		.append("khmc", this.khmc) 
		.append("ksrq", this.ksrq) 
		.append("szdw", this.szdw) 
		.append("szbm", this.szbm) 
		.append("jsrq", this.jsrq) 
		.append("dwxz", this.dwxz) 
		.append("csxyms", this.csxyms) 
		.append("drzw", this.drzw) 
		.append("dwyb", this.dwyb) 
		.append("dwdh", this.dwdh) 
		.append("dwdz", this.dwdz) 
		.append("ysr", this.ysr) 
		.append("bzz", this.bzz) 
		.toString();
	}
}
