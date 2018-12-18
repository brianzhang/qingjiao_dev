package com.lc.ibps.loans.GRJKSQSP.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_grjksqspb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:47:42
 *</pre>
 */
 @SuppressWarnings("serial")
public class GRJKSQTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  khlx; 		/*客户类型*/
	protected String  khywm; 		/*客户英文名*/
	protected String  sfyhjzm; 		/*是否有户籍证明*/
	protected String  mz; 		/*名族*/
	protected String  khmc; 		/*客户名称*/
	protected String  khcym; 		/*客户曾用名*/
	protected String  zjyxqx; 		/*证件有效期限*/
	protected String  khxb; 		/*客户性别*/
	protected String  zjlb; 		/*证件类别*/
	protected String  zjhm; 		/*证件号码*/
	protected String  hyzk; 		/*婚姻状况*/
	protected String  zgxl; 		/*最高学历*/
	protected String  zgxw; 		/*最高学位*/
	protected String  grjkzk; 		/*个人健康状况*/
	protected String  zzmm; 		/*政治面貌*/
	protected String  csrq; 		/*出生日期*/
	protected String  xzqh; 		/*行政区划（客户所属地区）*/
	protected String  hkxz; 		/*户口性质*/
	protected String  hjdz; 		/*户籍地址*/
	protected String  sfhz; 		/*是否户主*/
	protected String  txdz; 		/*通信地址*/
	protected String  sfbxgd; 		/*是否本行股东*/
	protected String  txdzyzbm; 		/*通信地址邮政编码*/
	protected Long  sjhm; 		/*手机号码*/
	protected String  qtlxfs; 		/*其他联系方式*/
	protected String  dzyx; 		/*电子邮箱*/
	protected String  zytz; 		/*专业特长*/
	protected String  jzdz; 		/*居住地址*/
	protected String  jzzk; 		/*居住状况*/
	protected String  jzzt; 		/*居住状态*/
	protected Long  jzdyzbm; 		/*居住地邮政编码*/
	protected String  zyjyxm; 		/*主要经营项目*/
	protected String  zyjjly; 		/*主要经济来源*/
	protected String  qtjjly; 		/*其他经济来源*/
	protected Long  grzhnsr; 		/*个人综合年收入*/
	protected Long  jtrjnsr; 		/*家庭人均年收入*/
	protected Long  jtnjzc; 		/*家庭年均支出*/
	protected Long  zygyrk; 		/*主要供养人口*/
	protected String  ywsgx; 		/*与我社关系*/
	protected String  sfgtgsh; 		/*是否个体工商户*/

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
	public void setKhlx(String khlx) 
	{
		this.khlx = khlx;
	}
	/**
	 * 返回 客户类型
	 * @return
	 */
	public String getKhlx() 
	{
		return this.khlx;
	}
	public void setKhywm(String khywm) 
	{
		this.khywm = khywm;
	}
	/**
	 * 返回 客户英文名
	 * @return
	 */
	public String getKhywm() 
	{
		return this.khywm;
	}
	public void setSfyhjzm(String sfyhjzm) 
	{
		this.sfyhjzm = sfyhjzm;
	}
	/**
	 * 返回 是否有户籍证明
	 * @return
	 */
	public String getSfyhjzm() 
	{
		return this.sfyhjzm;
	}
	public void setMz(String mz) 
	{
		this.mz = mz;
	}
	/**
	 * 返回 名族
	 * @return
	 */
	public String getMz() 
	{
		return this.mz;
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
	public void setKhcym(String khcym) 
	{
		this.khcym = khcym;
	}
	/**
	 * 返回 客户曾用名
	 * @return
	 */
	public String getKhcym() 
	{
		return this.khcym;
	}
	public void setZjyxqx(String zjyxqx) 
	{
		this.zjyxqx = zjyxqx;
	}
	/**
	 * 返回 证件有效期限
	 * @return
	 */
	public String getZjyxqx() 
	{
		return this.zjyxqx;
	}
	public void setKhxb(String khxb) 
	{
		this.khxb = khxb;
	}
	/**
	 * 返回 客户性别
	 * @return
	 */
	public String getKhxb() 
	{
		return this.khxb;
	}
	public void setZjlb(String zjlb) 
	{
		this.zjlb = zjlb;
	}
	/**
	 * 返回 证件类别
	 * @return
	 */
	public String getZjlb() 
	{
		return this.zjlb;
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
	public void setHyzk(String hyzk) 
	{
		this.hyzk = hyzk;
	}
	/**
	 * 返回 婚姻状况
	 * @return
	 */
	public String getHyzk() 
	{
		return this.hyzk;
	}
	public void setZgxl(String zgxl) 
	{
		this.zgxl = zgxl;
	}
	/**
	 * 返回 最高学历
	 * @return
	 */
	public String getZgxl() 
	{
		return this.zgxl;
	}
	public void setZgxw(String zgxw) 
	{
		this.zgxw = zgxw;
	}
	/**
	 * 返回 最高学位
	 * @return
	 */
	public String getZgxw() 
	{
		return this.zgxw;
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
	public void setZzmm(String zzmm) 
	{
		this.zzmm = zzmm;
	}
	/**
	 * 返回 政治面貌
	 * @return
	 */
	public String getZzmm() 
	{
		return this.zzmm;
	}
	public void setCsrq(String csrq) 
	{
		this.csrq = csrq;
	}
	/**
	 * 返回 出生日期
	 * @return
	 */
	public String getCsrq() 
	{
		return this.csrq;
	}
	public void setXzqh(String xzqh) 
	{
		this.xzqh = xzqh;
	}
	/**
	 * 返回 行政区划（客户所属地区）
	 * @return
	 */
	public String getXzqh() 
	{
		return this.xzqh;
	}
	public void setHkxz(String hkxz) 
	{
		this.hkxz = hkxz;
	}
	/**
	 * 返回 户口性质
	 * @return
	 */
	public String getHkxz() 
	{
		return this.hkxz;
	}
	public void setHjdz(String hjdz) 
	{
		this.hjdz = hjdz;
	}
	/**
	 * 返回 户籍地址
	 * @return
	 */
	public String getHjdz() 
	{
		return this.hjdz;
	}
	public void setSfhz(String sfhz) 
	{
		this.sfhz = sfhz;
	}
	/**
	 * 返回 是否户主
	 * @return
	 */
	public String getSfhz() 
	{
		return this.sfhz;
	}
	public void setTxdz(String txdz) 
	{
		this.txdz = txdz;
	}
	/**
	 * 返回 通信地址
	 * @return
	 */
	public String getTxdz() 
	{
		return this.txdz;
	}
	public void setSfbxgd(String sfbxgd) 
	{
		this.sfbxgd = sfbxgd;
	}
	/**
	 * 返回 是否本行股东
	 * @return
	 */
	public String getSfbxgd() 
	{
		return this.sfbxgd;
	}
	public void setTxdzyzbm(String txdzyzbm) 
	{
		this.txdzyzbm = txdzyzbm;
	}
	/**
	 * 返回 通信地址邮政编码
	 * @return
	 */
	public String getTxdzyzbm() 
	{
		return this.txdzyzbm;
	}
	public void setSjhm(Long sjhm) 
	{
		this.sjhm = sjhm;
	}
	/**
	 * 返回 手机号码
	 * @return
	 */
	public Long getSjhm() 
	{
		return this.sjhm;
	}
	public void setQtlxfs(String qtlxfs) 
	{
		this.qtlxfs = qtlxfs;
	}
	/**
	 * 返回 其他联系方式
	 * @return
	 */
	public String getQtlxfs() 
	{
		return this.qtlxfs;
	}
	public void setDzyx(String dzyx) 
	{
		this.dzyx = dzyx;
	}
	/**
	 * 返回 电子邮箱
	 * @return
	 */
	public String getDzyx() 
	{
		return this.dzyx;
	}
	public void setZytz(String zytz) 
	{
		this.zytz = zytz;
	}
	/**
	 * 返回 专业特长
	 * @return
	 */
	public String getZytz() 
	{
		return this.zytz;
	}
	public void setJzdz(String jzdz) 
	{
		this.jzdz = jzdz;
	}
	/**
	 * 返回 居住地址
	 * @return
	 */
	public String getJzdz() 
	{
		return this.jzdz;
	}
	public void setJzzk(String jzzk) 
	{
		this.jzzk = jzzk;
	}
	/**
	 * 返回 居住状况
	 * @return
	 */
	public String getJzzk() 
	{
		return this.jzzk;
	}
	public void setJzzt(String jzzt) 
	{
		this.jzzt = jzzt;
	}
	/**
	 * 返回 居住状态
	 * @return
	 */
	public String getJzzt() 
	{
		return this.jzzt;
	}
	public void setJzdyzbm(Long jzdyzbm) 
	{
		this.jzdyzbm = jzdyzbm;
	}
	/**
	 * 返回 居住地邮政编码
	 * @return
	 */
	public Long getJzdyzbm() 
	{
		return this.jzdyzbm;
	}
	public void setZyjyxm(String zyjyxm) 
	{
		this.zyjyxm = zyjyxm;
	}
	/**
	 * 返回 主要经营项目
	 * @return
	 */
	public String getZyjyxm() 
	{
		return this.zyjyxm;
	}
	public void setZyjjly(String zyjjly) 
	{
		this.zyjjly = zyjjly;
	}
	/**
	 * 返回 主要经济来源
	 * @return
	 */
	public String getZyjjly() 
	{
		return this.zyjjly;
	}
	public void setQtjjly(String qtjjly) 
	{
		this.qtjjly = qtjjly;
	}
	/**
	 * 返回 其他经济来源
	 * @return
	 */
	public String getQtjjly() 
	{
		return this.qtjjly;
	}
	public void setGrzhnsr(Long grzhnsr) 
	{
		this.grzhnsr = grzhnsr;
	}
	/**
	 * 返回 个人综合年收入
	 * @return
	 */
	public Long getGrzhnsr() 
	{
		return this.grzhnsr;
	}
	public void setJtrjnsr(Long jtrjnsr) 
	{
		this.jtrjnsr = jtrjnsr;
	}
	/**
	 * 返回 家庭人均年收入
	 * @return
	 */
	public Long getJtrjnsr() 
	{
		return this.jtrjnsr;
	}
	public void setJtnjzc(Long jtnjzc) 
	{
		this.jtnjzc = jtnjzc;
	}
	/**
	 * 返回 家庭年均支出
	 * @return
	 */
	public Long getJtnjzc() 
	{
		return this.jtnjzc;
	}
	public void setZygyrk(Long zygyrk) 
	{
		this.zygyrk = zygyrk;
	}
	/**
	 * 返回 主要供养人口
	 * @return
	 */
	public Long getZygyrk() 
	{
		return this.zygyrk;
	}
	public void setYwsgx(String ywsgx) 
	{
		this.ywsgx = ywsgx;
	}
	/**
	 * 返回 与我社关系
	 * @return
	 */
	public String getYwsgx() 
	{
		return this.ywsgx;
	}
	public void setSfgtgsh(String sfgtgsh) 
	{
		this.sfgtgsh = sfgtgsh;
	}
	/**
	 * 返回 是否个体工商户
	 * @return
	 */
	public String getSfgtgsh() 
	{
		return this.sfgtgsh;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("khlx", this.khlx) 
		.append("khywm", this.khywm) 
		.append("sfyhjzm", this.sfyhjzm) 
		.append("mz", this.mz) 
		.append("khmc", this.khmc) 
		.append("khcym", this.khcym) 
		.append("zjyxqx", this.zjyxqx) 
		.append("khxb", this.khxb) 
		.append("zjlb", this.zjlb) 
		.append("zjhm", this.zjhm) 
		.append("hyzk", this.hyzk) 
		.append("zgxl", this.zgxl) 
		.append("zgxw", this.zgxw) 
		.append("grjkzk", this.grjkzk) 
		.append("zzmm", this.zzmm) 
		.append("csrq", this.csrq) 
		.append("xzqh", this.xzqh) 
		.append("hkxz", this.hkxz) 
		.append("hjdz", this.hjdz) 
		.append("sfhz", this.sfhz) 
		.append("txdz", this.txdz) 
		.append("sfbxgd", this.sfbxgd) 
		.append("txdzyzbm", this.txdzyzbm) 
		.append("sjhm", this.sjhm) 
		.append("qtlxfs", this.qtlxfs) 
		.append("dzyx", this.dzyx) 
		.append("zytz", this.zytz) 
		.append("jzdz", this.jzdz) 
		.append("jzzk", this.jzzk) 
		.append("jzzt", this.jzzt) 
		.append("jzdyzbm", this.jzdyzbm) 
		.append("zyjyxm", this.zyjyxm) 
		.append("zyjjly", this.zyjjly) 
		.append("qtjjly", this.qtjjly) 
		.append("grzhnsr", this.grzhnsr) 
		.append("jtrjnsr", this.jtrjnsr) 
		.append("jtnjzc", this.jtnjzc) 
		.append("zygyrk", this.zygyrk) 
		.append("ywsgx", this.ywsgx) 
		.append("sfgtgsh", this.sfgtgsh) 
		.toString();
	}
}
