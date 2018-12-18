package com.lc.ibps.loans.daikuanInfo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_sxsq 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:05
 *</pre>
 */
 @SuppressWarnings("serial")
public class DaiKuanShenQingInfoTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  sqsxed; 		/*申请授信额度*/
	protected String  sqsxqx; 		/*申请授信期限*/
	protected Double  sxze; 		/*授信总额*/
	protected String  khmc; 		/*客户名称*/
	protected String  cpmc; 		/*产品名称*/
	protected Double  sqje; 		/*申请金额*/
	protected String  dkxs; 		/*贷款形式*/
	protected String  qxlb; 		/*期限类别*/
	protected String  dkqx;        /*贷款期限*/
	protected String  dbfs; 		/*担保方式*/
	protected String  htxz; 		/*合同性质*/
	protected Double  xdll; 		/*行（社）定利率*/
	protected Double  zxll; 		/*执行利率*/
	protected Double  jzll; 		/*基准利率*/
	protected String  sfyh; 		/*是否优惠*/
	protected String  lldzfs; 		/*利率调整方式*/
	protected Double  fdbl; 		/*浮动比例*/
	protected String  jxfs; 		/*结息方式*/
	protected String  hkly; 		/*还款来源*/
	protected String  sfyhkjh; 		/*是否有还款计划*/
	protected String  sfzfcnhk; 		/*是否政府承诺还款*/
	protected String  sfhzxmdk; 		/*是否合作项目贷款*/
	protected String  sfsndk; 		/*是否涉农贷款*/
	protected String  sndklb; 		/*涉农贷款类别*/
	protected String  sndkyt; 		/*涉农贷款用途*/
	protected String  dktx; 		/*贷款投向*/
	protected String  dkyt; 		/*贷款用途*/
	protected String  dkytmx; 		/*贷款用途明细*/
	protected String  sfjsdxt; 		/*是否接受短息通*/
	protected String  lxrmc; 		/*联系人名称*/
	protected String  lxrsjh; 		/*联系人手机号*/
	protected String  zffs; 		/*支付方式*/
	protected String  sfzdkk; 		/*是否自动扣款*/
	protected String  zdkkzh; 		/*自动扣款账号*/
	protected String  hkfs; 		/*还款方式*/
	protected String  jdid; 		/*借贷Id*/

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
	public void setSqsxed(String sqsxed) 
	{
		this.sqsxed = sqsxed;
	}
	/**
	 * 返回 申请授信额度
	 * @return
	 */
	public String getSqsxed() 
	{
		return this.sqsxed;
	}
	public void setSqsxqx(String sqsxqx) 
	{
		this.sqsxqx = sqsxqx;
	}
	/**
	 * 返回 申请授信期限
	 * @return
	 */
	public String getSqsxqx() 
	{
		return this.sqsxqx;
	}
	public void setSxze(Double sxze) 
	{
		this.sxze = sxze;
	}
	/**
	 * 返回 授信总额
	 * @return
	 */
	public Double getSxze() 
	{
		return this.sxze;
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
	public void setCpmc(String cpmc) 
	{
		this.cpmc = cpmc;
	}
	/**
	 * 返回 产品名称
	 * @return
	 */
	public String getCpmc() 
	{
		return this.cpmc;
	}
	public void setSqje(Double sqje) 
	{
		this.sqje = sqje;
	}
	/**
	 * 返回 申请金额
	 * @return
	 */
	public Double getSqje() 
	{
		return this.sqje;
	}
	public void setDkxs(String dkxs) 
	{
		this.dkxs = dkxs;
	}
	/**
	 * 返回 贷款形式
	 * @return
	 */
	public String getDkxs() 
	{
		return this.dkxs;
	}
	public void setQxlb(String qxlb) 
	{
		this.qxlb = qxlb;
	}
	/**
	 * 返回 期限类别
	 * @return
	 */
	public String getQxlb() 
	{
		return this.qxlb;
	}
	public void setDbfs(String dbfs) 
	{
		this.dbfs = dbfs;
	}
	
	public String getDkqx() 
	{
		return this.dkqx;
	}
	public void setDkqx(String dkqx) 
	{
		this.dkqx = dkqx;
	}
	
	/**
	 * 返回 担保方式
	 * @return
	 */
	public String getDbfs() 
	{
		return this.dbfs;
	}
	public void setHtxz(String htxz) 
	{
		this.htxz = htxz;
	}
	/**
	 * 返回 合同性质
	 * @return
	 */
	public String getHtxz() 
	{
		return this.htxz;
	}
	public void setXdll(Double xdll) 
	{
		this.xdll = xdll;
	}
	/**
	 * 返回 行（社）定利率
	 * @return
	 */
	public Double getXdll() 
	{
		return this.xdll;
	}
	public void setZxll(Double zxll) 
	{
		this.zxll = zxll;
	}
	/**
	 * 返回 执行利率
	 * @return
	 */
	public Double getZxll() 
	{
		return this.zxll;
	}
	public void setJzll(Double jzll) 
	{
		this.jzll = jzll;
	}
	/**
	 * 返回 基准利率
	 * @return
	 */
	public Double getJzll() 
	{
		return this.jzll;
	}
	public void setSfyh(String sfyh) 
	{
		this.sfyh = sfyh;
	}
	/**
	 * 返回 是否优惠
	 * @return
	 */
	public String getSfyh() 
	{
		return this.sfyh;
	}
	public void setLldzfs(String lldzfs) 
	{
		this.lldzfs = lldzfs;
	}
	/**
	 * 返回 利率调整方式
	 * @return
	 */
	public String getLldzfs() 
	{
		return this.lldzfs;
	}
	public void setFdbl(Double fdbl) 
	{
		this.fdbl = fdbl;
	}
	/**
	 * 返回 浮动比例
	 * @return
	 */
	public Double getFdbl() 
	{
		return this.fdbl;
	}
	public void setJxfs(String jxfs) 
	{
		this.jxfs = jxfs;
	}
	/**
	 * 返回 结息方式
	 * @return
	 */
	public String getJxfs() 
	{
		return this.jxfs;
	}
	public void setHkly(String hkly) 
	{
		this.hkly = hkly;
	}
	/**
	 * 返回 还款来源
	 * @return
	 */
	public String getHkly() 
	{
		return this.hkly;
	}
	public void setSfyhkjh(String sfyhkjh) 
	{
		this.sfyhkjh = sfyhkjh;
	}
	/**
	 * 返回 是否有还款计划
	 * @return
	 */
	public String getSfyhkjh() 
	{
		return this.sfyhkjh;
	}
	public void setSfzfcnhk(String sfzfcnhk) 
	{
		this.sfzfcnhk = sfzfcnhk;
	}
	/**
	 * 返回 是否政府承诺还款
	 * @return
	 */
	public String getSfzfcnhk() 
	{
		return this.sfzfcnhk;
	}
	public void setSfhzxmdk(String sfhzxmdk) 
	{
		this.sfhzxmdk = sfhzxmdk;
	}
	/**
	 * 返回 是否合作项目贷款
	 * @return
	 */
	public String getSfhzxmdk() 
	{
		return this.sfhzxmdk;
	}
	public void setSfsndk(String sfsndk) 
	{
		this.sfsndk = sfsndk;
	}
	/**
	 * 返回 是否涉农贷款
	 * @return
	 */
	public String getSfsndk() 
	{
		return this.sfsndk;
	}
	public void setSndklb(String sndklb) 
	{
		this.sndklb = sndklb;
	}
	/**
	 * 返回 涉农贷款类别
	 * @return
	 */
	public String getSndklb() 
	{
		return this.sndklb;
	}
	public void setSndkyt(String sndkyt) 
	{
		this.sndkyt = sndkyt;
	}
	/**
	 * 返回 涉农贷款用途
	 * @return
	 */
	public String getSndkyt() 
	{
		return this.sndkyt;
	}
	public void setDktx(String dktx) 
	{
		this.dktx = dktx;
	}
	/**
	 * 返回 贷款投向
	 * @return
	 */
	public String getDktx() 
	{
		return this.dktx;
	}
	public void setDkyt(String dkyt) 
	{
		this.dkyt = dkyt;
	}
	/**
	 * 返回 贷款用途
	 * @return
	 */
	public String getDkyt() 
	{
		return this.dkyt;
	}
	public void setDkytmx(String dkytmx) 
	{
		this.dkytmx = dkytmx;
	}
	/**
	 * 返回 贷款用途明细
	 * @return
	 */
	public String getDkytmx() 
	{
		return this.dkytmx;
	}
	public void setSfjsdxt(String sfjsdxt) 
	{
		this.sfjsdxt = sfjsdxt;
	}
	/**
	 * 返回 是否接受短息通
	 * @return
	 */
	public String getSfjsdxt() 
	{
		return this.sfjsdxt;
	}
	public void setLxrmc(String lxrmc) 
	{
		this.lxrmc = lxrmc;
	}
	/**
	 * 返回 联系人名称
	 * @return
	 */
	public String getLxrmc() 
	{
		return this.lxrmc;
	}
	public void setLxrsjh(String lxrsjh) 
	{
		this.lxrsjh = lxrsjh;
	}
	/**
	 * 返回 联系人手机号
	 * @return
	 */
	public String getLxrsjh() 
	{
		return this.lxrsjh;
	}
	public void setZffs(String zffs) 
	{
		this.zffs = zffs;
	}
	/**
	 * 返回 支付方式
	 * @return
	 */
	public String getZffs() 
	{
		return this.zffs;
	}
	public void setSfzdkk(String sfzdkk) 
	{
		this.sfzdkk = sfzdkk;
	}
	/**
	 * 返回 是否自动扣款
	 * @return
	 */
	public String getSfzdkk() 
	{
		return this.sfzdkk;
	}
	public void setZdkkzh(String zdkkzh) 
	{
		this.zdkkzh = zdkkzh;
	}
	/**
	 * 返回 自动扣款账号
	 * @return
	 */
	public String getZdkkzh() 
	{
		return this.zdkkzh;
	}
	public void setHkfs(String hkfs) 
	{
		this.hkfs = hkfs;
	}
	/**
	 * 返回 还款方式
	 * @return
	 */
	public String getHkfs() 
	{
		return this.hkfs;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("sqsxed", this.sqsxed) 
		.append("sqsxqx", this.sqsxqx) 
		.append("sxze", this.sxze) 
		.append("khmc", this.khmc) 
		.append("cpmc", this.cpmc) 
		.append("sqje", this.sqje) 
		.append("dkxs", this.dkxs) 
		.append("qxlb", this.qxlb) 
		.append("dkqx", this.dkqx) 
		.append("dbfs", this.dbfs) 
		.append("htxz", this.htxz) 
		.append("xdll", this.xdll) 
		.append("zxll", this.zxll) 
		.append("jzll", this.jzll) 
		.append("sfyh", this.sfyh) 
		.append("lldzfs", this.lldzfs) 
		.append("fdbl", this.fdbl) 
		.append("jxfs", this.jxfs) 
		.append("hkly", this.hkly) 
		.append("sfyhkjh", this.sfyhkjh) 
		.append("sfzfcnhk", this.sfzfcnhk) 
		.append("sfhzxmdk", this.sfhzxmdk) 
		.append("sfsndk", this.sfsndk) 
		.append("sndklb", this.sndklb) 
		.append("sndkyt", this.sndkyt) 
		.append("dktx", this.dktx) 
		.append("dkyt", this.dkyt) 
		.append("dkytmx", this.dkytmx) 
		.append("sfjsdxt", this.sfjsdxt) 
		.append("lxrmc", this.lxrmc) 
		.append("lxrsjh", this.lxrsjh) 
		.append("zffs", this.zffs) 
		.append("sfzdkk", this.sfzdkk) 
		.append("zdkkzh", this.zdkkzh) 
		.append("hkfs", this.hkfs) 
		.append("jdid", this.jdid) 
		.toString();
	}
}
