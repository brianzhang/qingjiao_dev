package com.lc.ibps.loans.POXX.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_poxxb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:49:27
 *</pre>
 */
 @SuppressWarnings("serial")
public class POXXTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  ksrq; 		/*开始日期*/
	protected String  khmc; 		/*客户名称*/
	protected String  jtcyxm; 		/*家庭成员姓名*/
	protected String  xb; 		/*性别*/
	protected String  zjlx; 		/*证件类型*/
	protected String  zjhm; 		/*证件号码*/
	protected String  gzdw; 		/*工作单位*/
	protected String  grjkzk; 		/*个人健康状况*/
	protected String  bz; 		/*备注*/
	protected String  khh; 		/*客户号*/
	protected String  ykhgx; 		/*与客户关系*/
	protected String  szdw; 		/*所在单位*/
	protected String  szbm; 		/*所在部门*/
	protected Date  jsrq; 		/*结束日期*/
	protected String  drzw; 		/*担任职务*/
	protected String  csxyms; 		/*从事行业描述*/
	protected String  dwxz; 		/*单位性质*/
	protected String  dwdh; 		/*单位电话*/
	protected String  dwyb; 		/*单位邮编*/
	protected String  dwdz; 		/*单位地址*/
	protected String  ysr; 		/*月收入*/
	protected String  bz1; 		/*备注（其他）*/
	protected String  sfyhjz; 		/*是否有户籍证*/
	protected String  lxdh; 		/*联系电话*/

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
	public void setKsrq(Date ksrq) 
	{
		this.ksrq = ksrq;
	}
	/**
	 * 返回 开始日期
	 * @return
	 */
	public Date getKsrq() 
	{
		return this.ksrq;
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
	public void setJtcyxm(String jtcyxm) 
	{
		this.jtcyxm = jtcyxm;
	}
	/**
	 * 返回 家庭成员姓名
	 * @return
	 */
	public String getJtcyxm() 
	{
		return this.jtcyxm;
	}
	public void setXb(String xb) 
	{
		this.xb = xb;
	}
	/**
	 * 返回 性别
	 * @return
	 */
	public String getXb() 
	{
		return this.xb;
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
	public void setZjhm(String zjhm) 
	{
		this.zjhm = zjhm;
	}
	/**
	 * 返回 证件号码
	 * @return
	 */
	public String getZjhm() 
	{
		return this.zjhm;
	}
	public void setGzdw(String gzdw) 
	{
		this.gzdw = gzdw;
	}
	/**
	 * 返回 工作单位
	 * @return
	 */
	public String getGzdw() 
	{
		return this.gzdw;
	}
	public void setGrjkzk(String grjkzk) 
	{
		this.grjkzk = grjkzk;
	}
	/**
	 * 返回 个人健康状况
	 * @return
	 */
	public String getGrjkzk() 
	{
		return this.grjkzk;
	}
	public void setBz(String bz) 
	{
		this.bz = bz;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBz() 
	{
		return this.bz;
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
	public void setYkhgx(String ykhgx) 
	{
		this.ykhgx = ykhgx;
	}
	/**
	 * 返回 与客户关系
	 * @return
	 */
	public String getYkhgx() 
	{
		return this.ykhgx;
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
	public void setJsrq(Date jsrq) 
	{
		this.jsrq = jsrq;
	}
	/**
	 * 返回 结束日期
	 * @return
	 */
	public Date getJsrq() 
	{
		return this.jsrq;
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
	public void setBz1(String bz1) 
	{
		this.bz1 = bz1;
	}
	/**
	 * 返回 备注（其他）
	 * @return
	 */
	public String getBz1() 
	{
		return this.bz1;
	}
	public void setSfyhjz(String sfyhjz) 
	{
		this.sfyhjz = sfyhjz;
	}
	/**
	 * 返回 是否有户籍证
	 * @return
	 */
	public String getSfyhjz() 
	{
		return this.sfyhjz;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("ksrq", this.ksrq) 
		.append("khmc", this.khmc) 
		.append("jtcyxm", this.jtcyxm) 
		.append("xb", this.xb) 
		.append("zjlx", this.zjlx) 
		.append("zjhm", this.zjhm) 
		.append("gzdw", this.gzdw) 
		.append("grjkzk", this.grjkzk) 
		.append("bz", this.bz) 
		.append("khh", this.khh) 
		.append("ykhgx", this.ykhgx) 
		.append("szdw", this.szdw) 
		.append("szbm", this.szbm) 
		.append("jsrq", this.jsrq) 
		.append("drzw", this.drzw) 
		.append("csxyms", this.csxyms) 
		.append("dwxz", this.dwxz) 
		.append("dwdh", this.dwdh) 
		.append("dwyb", this.dwyb) 
		.append("dwdz", this.dwdz) 
		.append("ysr", this.ysr) 
		.append("bz（qt）", this.bz1) 
		.append("sfyhjz", this.sfyhjz) 
		.append("lxdh", this.lxdh) 
		.toString();
	}
}
