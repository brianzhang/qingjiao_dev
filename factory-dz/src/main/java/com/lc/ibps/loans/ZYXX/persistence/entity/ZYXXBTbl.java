package com.lc.ibps.loans.ZYXX.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zyxxb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:55:18
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZYXXBTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  zynsr; 		/*职业*/
	protected Double  nsr; 		/*年收入*/
	protected String  sfbxyg; 		/*是否本行员工*/
	protected String  schzsj; 		/*首次合作时间*/
	protected String  schzje; 		/*首次合作金额*/
	protected String  gzdwmc; 		/*工作单位名称*/
	protected String  dwdz; 		/*单位地址*/
	protected String  dwyb; 		/*单位邮编*/
	protected String  dwssxy; 		/*单位所属行业*/
	protected String  dwxz; 		/*单位性质*/
	protected String  zw; 		/*职务*/
	protected String  zc; 		/*职称*/
	protected String  ysr; 		/*月收入*/
	protected String  gwxz; 		/*岗位性质*/
	protected String  dwdh; 		/*单位电话*/
	protected String  bdwgzqsny; 		/*本单位工作起始年月*/
	protected String  gzzh; 		/*工资账号*/
	protected String  gzzhkhx; 		/*工资账号开户行*/

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
	public void setZynsr(String zynsr) 
	{
		this.zynsr = zynsr;
	}
	/**
	 * 返回 职业
	 * @return
	 */
	public String getZynsr() 
	{
		return this.zynsr;
	}
	public void setNsr(Double nsr) 
	{
		this.nsr = nsr;
	}
	/**
	 * 返回 年收入
	 * @return
	 */
	public Double getNsr() 
	{
		return this.nsr;
	}
	public void setSfbxyg(String sfbxyg) 
	{
		this.sfbxyg = sfbxyg;
	}
	/**
	 * 返回 是否本行员工
	 * @return
	 */
	public String getSfbxyg() 
	{
		return this.sfbxyg;
	}
	public void setSchzsj(String schzsj) 
	{
		this.schzsj = schzsj;
	}
	/**
	 * 返回 首次合作时间
	 * @return
	 */
	public String getSchzsj() 
	{
		return this.schzsj;
	}
	public void setSchzje(String schzje) 
	{
		this.schzje = schzje;
	}
	/**
	 * 返回 首次合作金额
	 * @return
	 */
	public String getSchzje() 
	{
		return this.schzje;
	}
	public void setGzdwmc(String gzdwmc) 
	{
		this.gzdwmc = gzdwmc;
	}
	/**
	 * 返回 工作单位名称
	 * @return
	 */
	public String getGzdwmc() 
	{
		return this.gzdwmc;
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
	public void setDwssxy(String dwssxy) 
	{
		this.dwssxy = dwssxy;
	}
	/**
	 * 返回 单位所属行业
	 * @return
	 */
	public String getDwssxy() 
	{
		return this.dwssxy;
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
	public void setZw(String zw) 
	{
		this.zw = zw;
	}
	/**
	 * 返回 职务
	 * @return
	 */
	public String getZw() 
	{
		return this.zw;
	}
	public void setZc(String zc) 
	{
		this.zc = zc;
	}
	/**
	 * 返回 职称
	 * @return
	 */
	public String getZc() 
	{
		return this.zc;
	}
	public void setYsr(String ysr) 
	{
		this.ysr = ysr;
	}
	/**
	 * 返回 月收入
	 * @return
	 */
	public String getYsr() 
	{
		return this.ysr;
	}
	public void setGwxz(String gwxz) 
	{
		this.gwxz = gwxz;
	}
	/**
	 * 返回 岗位性质
	 * @return
	 */
	public String getGwxz() 
	{
		return this.gwxz;
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
	public void setBdwgzqsny(String bdwgzqsny) 
	{
		this.bdwgzqsny = bdwgzqsny;
	}
	/**
	 * 返回 本单位工作起始年月
	 * @return
	 */
	public String getBdwgzqsny() 
	{
		return this.bdwgzqsny;
	}
	public void setGzzh(String gzzh) 
	{
		this.gzzh = gzzh;
	}
	/**
	 * 返回 工资账号
	 * @return
	 */
	public String getGzzh() 
	{
		return this.gzzh;
	}
	public void setGzzhkhx(String gzzhkhx) 
	{
		this.gzzhkhx = gzzhkhx;
	}
	/**
	 * 返回 工资账号开户行
	 * @return
	 */
	public String getGzzhkhx() 
	{
		return this.gzzhkhx;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("zynsr", this.zynsr) 
		.append("nsr", this.nsr) 
		.append("sfbxyg", this.sfbxyg) 
		.append("schzsj", this.schzsj) 
		.append("schzje", this.schzje) 
		.append("gzdwmc", this.gzdwmc) 
		.append("dwdz", this.dwdz) 
		.append("dwyb", this.dwyb) 
		.append("dwssxy", this.dwssxy) 
		.append("dwxz", this.dwxz) 
		.append("zw", this.zw) 
		.append("zc", this.zc) 
		.append("ysr", this.ysr) 
		.append("gwxz", this.gwxz) 
		.append("dwdh", this.dwdh) 
		.append("bdwgzqsny", this.bdwgzqsny) 
		.append("gzzh", this.gzzh) 
		.append("gzzhkhx", this.gzzhkhx) 
		.toString();
	}
}
