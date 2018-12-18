package com.lc.ibps.loans.zhiyaRInfo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zyr 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-08-08 20:38:45
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZhiYaPersonTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  zywsyrmc; 		/*质押物所有人名称*/
	protected String  sfyhjzm; 		/*是否有户籍证明*/
	protected String  zyrzjlx; 		/*质押人证件类型*/
	protected String  zyrzjhm; 		/*质押人证件号码*/
	protected String  zywsfgy; 		/*质押物是否共有*/
	protected String  zwgyqr; 		/*质物共有权人*/
	protected String  gyfs; 		/*共有方式*/
	protected String  zywzl; 		/*质押物种类*/
	protected String  pjdzh; 		/*债券、单、折、票据等证号*/
	protected Double  zqje; 		/*债单、票据、债券金额*/
	protected String  sfblhyzf; 		/*是否办理核押止付*/
	protected String  bxcdzh; 		/*本行存单（折）账号*/
	protected Date  zqkssj; 		/*债单/票据/债券开始时间*/
	protected Date  zqjzsj; 		/*债单/票据/债券 截止时间*/
	protected String  zfdw; 		/*止付单位*/
	protected String  bz; 		/*币种*/
	protected String  zywsl; 		/*质押物数量*/
	protected String  zywsfypg; 		/*质押物是否已评估*/
	protected String  pgjg; 		/*评估机构*/
	protected String  pgff; 		/*评估方法*/
	protected Date  pgrq; 		/*评估日期*/
	protected String  pgjlyxqx; 		/*评估结论有效期限*/
	protected Double  gzywdkje; 		/*该质押物贷款金额*/
	protected Double  pgjz; 		/*评估价值*/
	protected Double  zyl; 		/*质押率*/
	protected String  sfjxzydj; 		/*是否进行质押登记*/
	protected String  zywsfbzx; 		/*质押物是否保证险*/
	protected String  bxjg; 		/*保险机构*/
	protected Double  bxje; 		/*保险金额*/
	protected String  dysyrmc; 		/*第一受益人名称*/
	protected String  zywsfblgz; 		/*质押物是否办理公证*/
	protected String  gzjg; 		/*公证机关*/
	protected String  jdid; 		/*借贷Id*/
	protected String  zyrpozjlx; 		/*质押人配偶证件类型*/
	protected String  zyrpomc; 		/*质押人配偶名称*/
	protected String  zjhm; 		/*证件号码*/

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
	public void setZywsyrmc(String zywsyrmc) 
	{
		this.zywsyrmc = zywsyrmc;
	}
	/**
	 * 返回 质押物所有人名称
	 * @return
	 */
	public String getZywsyrmc() 
	{
		return this.zywsyrmc;
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
	public void setZyrzjlx(String zyrzjlx) 
	{
		this.zyrzjlx = zyrzjlx;
	}
	/**
	 * 返回 质押人证件类型
	 * @return
	 */
	public String getZyrzjlx() 
	{
		return this.zyrzjlx;
	}
	public void setZyrzjhm(String zyrzjhm) 
	{
		this.zyrzjhm = zyrzjhm;
	}
	/**
	 * 返回 质押人证件号码
	 * @return
	 */
	public String getZyrzjhm() 
	{
		return this.zyrzjhm;
	}
	public void setZywsfgy(String zywsfgy) 
	{
		this.zywsfgy = zywsfgy;
	}
	/**
	 * 返回 质押物是否共有
	 * @return
	 */
	public String getZywsfgy() 
	{
		return this.zywsfgy;
	}
	public void setZwgyqr(String zwgyqr) 
	{
		this.zwgyqr = zwgyqr;
	}
	/**
	 * 返回 质物共有权人
	 * @return
	 */
	public String getZwgyqr() 
	{
		return this.zwgyqr;
	}
	public void setGyfs(String gyfs) 
	{
		this.gyfs = gyfs;
	}
	/**
	 * 返回 共有方式
	 * @return
	 */
	public String getGyfs() 
	{
		return this.gyfs;
	}
	public void setZywzl(String zywzl) 
	{
		this.zywzl = zywzl;
	}
	/**
	 * 返回 质押物种类
	 * @return
	 */
	public String getZywzl() 
	{
		return this.zywzl;
	}
	public void setPjdzh(String pjdzh) 
	{
		this.pjdzh = pjdzh;
	}
	/**
	 * 返回 债券、单、折、票据等证号
	 * @return
	 */
	public String getPjdzh() 
	{
		return this.pjdzh;
	}
	public void setZqje(Double zqje) 
	{
		this.zqje = zqje;
	}
	/**
	 * 返回 债单、票据、债券金额
	 * @return
	 */
	public Double getZqje() 
	{
		return this.zqje;
	}
	public void setSfblhyzf(String sfblhyzf) 
	{
		this.sfblhyzf = sfblhyzf;
	}
	/**
	 * 返回 是否办理核押止付
	 * @return
	 */
	public String getSfblhyzf() 
	{
		return this.sfblhyzf;
	}
	public void setBxcdzh(String bxcdzh) 
	{
		this.bxcdzh = bxcdzh;
	}
	/**
	 * 返回 本行存单（折）账号
	 * @return
	 */
	public String getBxcdzh() 
	{
		return this.bxcdzh;
	}
	public void setZqkssj(Date zqkssj) 
	{
		this.zqkssj = zqkssj;
	}
	/**
	 * 返回 债单/票据/债券开始时间
	 * @return
	 */
	public Date getZqkssj() 
	{
		return this.zqkssj;
	}
	public void setZqjzsj(Date zqjzsj) 
	{
		this.zqjzsj = zqjzsj;
	}
	/**
	 * 返回 债单/票据/债券 截止时间
	 * @return
	 */
	public Date getZqjzsj() 
	{
		return this.zqjzsj;
	}
	public void setZfdw(String zfdw) 
	{
		this.zfdw = zfdw;
	}
	/**
	 * 返回 止付单位
	 * @return
	 */
	public String getZfdw() 
	{
		return this.zfdw;
	}
	public void setBz(String bz) 
	{
		this.bz = bz;
	}
	/**
	 * 返回 币种
	 * @return
	 */
	public String getBz() 
	{
		return this.bz;
	}
	public void setZywsl(String zywsl) 
	{
		this.zywsl = zywsl;
	}
	/**
	 * 返回 质押物数量
	 * @return
	 */
	public String getZywsl() 
	{
		return this.zywsl;
	}
	public void setZywsfypg(String zywsfypg) 
	{
		this.zywsfypg = zywsfypg;
	}
	/**
	 * 返回 质押物是否已评估
	 * @return
	 */
	public String getZywsfypg() 
	{
		return this.zywsfypg;
	}
	public void setPgjg(String pgjg) 
	{
		this.pgjg = pgjg;
	}
	/**
	 * 返回 评估机构
	 * @return
	 */
	public String getPgjg() 
	{
		return this.pgjg;
	}
	public void setPgff(String pgff) 
	{
		this.pgff = pgff;
	}
	/**
	 * 返回 评估方法
	 * @return
	 */
	public String getPgff() 
	{
		return this.pgff;
	}
	public void setPgrq(Date pgrq) 
	{
		this.pgrq = pgrq;
	}
	/**
	 * 返回 评估日期
	 * @return
	 */
	public Date getPgrq() 
	{
		return this.pgrq;
	}
	public void setPgjlyxqx(String pgjlyxqx) 
	{
		this.pgjlyxqx = pgjlyxqx;
	}
	/**
	 * 返回 评估结论有效期限
	 * @return
	 */
	public String getPgjlyxqx() 
	{
		return this.pgjlyxqx;
	}
	public void setGzywdkje(Double gzywdkje) 
	{
		this.gzywdkje = gzywdkje;
	}
	/**
	 * 返回 该质押物贷款金额
	 * @return
	 */
	public Double getGzywdkje() 
	{
		return this.gzywdkje;
	}
	public void setPgjz(Double pgjz) 
	{
		this.pgjz = pgjz;
	}
	/**
	 * 返回 评估价值
	 * @return
	 */
	public Double getPgjz() 
	{
		return this.pgjz;
	}
	public void setZyl(Double zyl) 
	{
		this.zyl = zyl;
	}
	/**
	 * 返回 质押率
	 * @return
	 */
	public Double getZyl() 
	{
		return this.zyl;
	}
	public void setSfjxzydj(String sfjxzydj) 
	{
		this.sfjxzydj = sfjxzydj;
	}
	/**
	 * 返回 是否进行质押登记
	 * @return
	 */
	public String getSfjxzydj() 
	{
		return this.sfjxzydj;
	}
	public void setZywsfbzx(String zywsfbzx) 
	{
		this.zywsfbzx = zywsfbzx;
	}
	/**
	 * 返回 质押物是否保证险
	 * @return
	 */
	public String getZywsfbzx() 
	{
		return this.zywsfbzx;
	}
	public void setBxjg(String bxjg) 
	{
		this.bxjg = bxjg;
	}
	/**
	 * 返回 保险机构
	 * @return
	 */
	public String getBxjg() 
	{
		return this.bxjg;
	}
	public void setBxje(Double bxje) 
	{
		this.bxje = bxje;
	}
	/**
	 * 返回 保险金额
	 * @return
	 */
	public Double getBxje() 
	{
		return this.bxje;
	}
	public void setDysyrmc(String dysyrmc) 
	{
		this.dysyrmc = dysyrmc;
	}
	/**
	 * 返回 第一受益人名称
	 * @return
	 */
	public String getDysyrmc() 
	{
		return this.dysyrmc;
	}
	public void setZywsfblgz(String zywsfblgz) 
	{
		this.zywsfblgz = zywsfblgz;
	}
	/**
	 * 返回 质押物是否办理公证
	 * @return
	 */
	public String getZywsfblgz() 
	{
		return this.zywsfblgz;
	}
	public void setGzjg(String gzjg) 
	{
		this.gzjg = gzjg;
	}
	/**
	 * 返回 公证机关
	 * @return
	 */
	public String getGzjg() 
	{
		return this.gzjg;
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
	public void setZyrpozjlx(String zyrpozjlx) 
	{
		this.zyrpozjlx = zyrpozjlx;
	}
	/**
	 * 返回 质押人配偶证件类型
	 * @return
	 */
	public String getZyrpozjlx() 
	{
		return this.zyrpozjlx;
	}
	public void setZyrpomc(String zyrpomc) 
	{
		this.zyrpomc = zyrpomc;
	}
	/**
	 * 返回 质押人配偶名称
	 * @return
	 */
	public String getZyrpomc() 
	{
		return this.zyrpomc;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("zywsyrmc", this.zywsyrmc) 
		.append("sfyhjzm", this.sfyhjzm) 
		.append("zyrzjlx", this.zyrzjlx) 
		.append("zyrzjhm", this.zyrzjhm) 
		.append("zywsfgy", this.zywsfgy) 
		.append("zwgyqr", this.zwgyqr) 
		.append("gyfs", this.gyfs) 
		.append("zywzl", this.zywzl) 
		.append("pjdzh", this.pjdzh) 
		.append("zqje", this.zqje) 
		.append("sfblhyzf", this.sfblhyzf) 
		.append("bxcdzh", this.bxcdzh) 
		.append("zqkssj", this.zqkssj) 
		.append("zqjzsj", this.zqjzsj) 
		.append("zfdw", this.zfdw) 
		.append("bz", this.bz) 
		.append("zywsl", this.zywsl) 
		.append("zywsfypg", this.zywsfypg) 
		.append("pgjg", this.pgjg) 
		.append("pgff", this.pgff) 
		.append("pgrq", this.pgrq) 
		.append("pgjlyxqx", this.pgjlyxqx) 
		.append("gzywdkje", this.gzywdkje) 
		.append("pgjz", this.pgjz) 
		.append("zyl", this.zyl) 
		.append("sfjxzydj", this.sfjxzydj) 
		.append("zywsfbzx", this.zywsfbzx) 
		.append("bxjg", this.bxjg) 
		.append("bxje", this.bxje) 
		.append("dysyrmc", this.dysyrmc) 
		.append("zywsfblgz", this.zywsfblgz) 
		.append("gzjg", this.gzjg) 
		.append("jdid", this.jdid) 
		.append("zyrpozjlx", this.zyrpozjlx) 
		.append("zyrpomc", this.zyrpomc) 
		.append("zjhm", this.zjhm) 
		.toString();
	}
}
