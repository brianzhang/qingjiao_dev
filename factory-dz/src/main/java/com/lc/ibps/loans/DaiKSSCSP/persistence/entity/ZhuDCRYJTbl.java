package com.lc.ibps.loans.DaiKSSCSP.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zdcryj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZhuDCRYJTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  jkrmc; 		/*借款人名称*/
	protected String  jkrxydj; 		/*借款人信用等级/得分*/
	protected Double  dywxz; 		/*抵押物现值*/
	protected Double  zywxz; 		/*质押物现值*/
	protected Date  xyxtcxsj; 		/*信用系统查询时间*/
	protected String  xdxtglxtcx; 		/*信贷系统管理系统查询*/
	protected String  rmyxgrzxsjkcx; 		/*人民银行个人征信数据库查询*/
	protected String  dqdcfs; 		/*贷前调查方式*/
	protected String  zlqbzs; 		/*资料齐备真实*/
	protected String  sqrzsyhs; 		/*申请人住所已核实*/
	protected String  sqrzsdz; 		/*申请人住所地址*/
	protected String  sqrsryhs; 		/*申请人收入已核实*/
	protected Double  yjsr; 		/*月均收入*/
	protected String  jkrlxfs; 		/*借款人联系方式*/
	protected String  jkrpolxfs; 		/*借款人配偶联系方式*/
	protected String  dbrlxfs; 		/*担保人联系方式*/
	protected String  dbrpolxfs; 		/*担保人配偶联系方式*/
	protected String  gyrlxfs; 		/*共有人联系方式*/
	protected String  hsdbwfs; 		/*核实担保物方式*/
	protected String  dbrsfmq; 		/*担保人是否面签*/
	protected String  dkxgqksm; 		/*贷款相关情况说明*/
	protected String  fxyc; 		/*风险预测*/
	protected String  ncqdfxkzcs; 		/*拟采取的风险控制措施*/
	protected Double  sxje; 		/*授信金额*/
	protected String  sxqx; 		/*授信期限*/
	protected String  dbfs; 		/*担保方式*/
	protected String  dkfs; 		/*贷款方式*/
	protected Double  dkje; 		/*贷款金额*/
	protected String  dkqx; 		/*贷款期限*/
	protected Double  yll; 		/*月利率*/
	protected String  ghfs; 		/*归还方式*/
	protected String  zdcrqm; 		/*主调查人签名*/
	protected Date  zdcrqzsj; 		/*主调查人签字时间*/
	protected String  jdid; 		/*借贷Id*/
	protected String  zdcrid; 		/*主调查人Id*/

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
	public void setJkrmc(String jkrmc) 
	{
		this.jkrmc = jkrmc;
	}
	/**
	 * 返回 借款人名称
	 * @return
	 */
	public String getJkrmc() 
	{
		return this.jkrmc;
	}
	public void setJkrxydj(String jkrxydj) 
	{
		this.jkrxydj = jkrxydj;
	}
	/**
	 * 返回 借款人信用等级/得分
	 * @return
	 */
	public String getJkrxydj() 
	{
		return this.jkrxydj;
	}
	public void setDywxz(Double dywxz) 
	{
		this.dywxz = dywxz;
	}
	/**
	 * 返回 抵押物现值
	 * @return
	 */
	public Double getDywxz() 
	{
		return this.dywxz;
	}
	public void setZywxz(Double zywxz) 
	{
		this.zywxz = zywxz;
	}
	/**
	 * 返回 质押物现值
	 * @return
	 */
	public Double getZywxz() 
	{
		return this.zywxz;
	}
	public void setXyxtcxsj(Date xyxtcxsj) 
	{
		this.xyxtcxsj = xyxtcxsj;
	}
	/**
	 * 返回 信用系统查询时间
	 * @return
	 */
	public Date getXyxtcxsj() 
	{
		return this.xyxtcxsj;
	}
	public void setXdxtglxtcx(String xdxtglxtcx) 
	{
		this.xdxtglxtcx = xdxtglxtcx;
	}
	/**
	 * 返回 信贷系统管理系统查询
	 * @return
	 */
	public String getXdxtglxtcx() 
	{
		return this.xdxtglxtcx;
	}
	public void setRmyxgrzxsjkcx(String rmyxgrzxsjkcx) 
	{
		this.rmyxgrzxsjkcx = rmyxgrzxsjkcx;
	}
	/**
	 * 返回 人民银行个人征信数据库查询
	 * @return
	 */
	public String getRmyxgrzxsjkcx() 
	{
		return this.rmyxgrzxsjkcx;
	}
	public void setDqdcfs(String dqdcfs) 
	{
		this.dqdcfs = dqdcfs;
	}
	/**
	 * 返回 贷前调查方式
	 * @return
	 */
	public String getDqdcfs() 
	{
		return this.dqdcfs;
	}
	public void setZlqbzs(String zlqbzs) 
	{
		this.zlqbzs = zlqbzs;
	}
	/**
	 * 返回 资料齐备真实
	 * @return
	 */
	public String getZlqbzs() 
	{
		return this.zlqbzs;
	}
	public void setSqrzsyhs(String sqrzsyhs) 
	{
		this.sqrzsyhs = sqrzsyhs;
	}
	/**
	 * 返回 申请人住所已核实
	 * @return
	 */
	public String getSqrzsyhs() 
	{
		return this.sqrzsyhs;
	}
	public void setSqrzsdz(String sqrzsdz) 
	{
		this.sqrzsdz = sqrzsdz;
	}
	/**
	 * 返回 申请人住所地址
	 * @return
	 */
	public String getSqrzsdz() 
	{
		return this.sqrzsdz;
	}
	public void setSqrsryhs(String sqrsryhs) 
	{
		this.sqrsryhs = sqrsryhs;
	}
	/**
	 * 返回 申请人收入已核实
	 * @return
	 */
	public String getSqrsryhs() 
	{
		return this.sqrsryhs;
	}
	public void setYjsr(Double yjsr) 
	{
		this.yjsr = yjsr;
	}
	/**
	 * 返回 月均收入
	 * @return
	 */
	public Double getYjsr() 
	{
		return this.yjsr;
	}
	public void setJkrlxfs(String jkrlxfs) 
	{
		this.jkrlxfs = jkrlxfs;
	}
	/**
	 * 返回 借款人联系方式
	 * @return
	 */
	public String getJkrlxfs() 
	{
		return this.jkrlxfs;
	}
	public void setJkrpolxfs(String jkrpolxfs) 
	{
		this.jkrpolxfs = jkrpolxfs;
	}
	/**
	 * 返回 借款人配偶联系方式
	 * @return
	 */
	public String getJkrpolxfs() 
	{
		return this.jkrpolxfs;
	}
	public void setDbrlxfs(String dbrlxfs) 
	{
		this.dbrlxfs = dbrlxfs;
	}
	/**
	 * 返回 担保人联系方式
	 * @return
	 */
	public String getDbrlxfs() 
	{
		return this.dbrlxfs;
	}
	public void setDbrpolxfs(String dbrpolxfs) 
	{
		this.dbrpolxfs = dbrpolxfs;
	}
	/**
	 * 返回 担保人配偶联系方式
	 * @return
	 */
	public String getDbrpolxfs() 
	{
		return this.dbrpolxfs;
	}
	public void setGyrlxfs(String gyrlxfs) 
	{
		this.gyrlxfs = gyrlxfs;
	}
	/**
	 * 返回 共有人联系方式
	 * @return
	 */
	public String getGyrlxfs() 
	{
		return this.gyrlxfs;
	}
	public void setHsdbwfs(String hsdbwfs) 
	{
		this.hsdbwfs = hsdbwfs;
	}
	/**
	 * 返回 核实担保物方式
	 * @return
	 */
	public String getHsdbwfs() 
	{
		return this.hsdbwfs;
	}
	public void setDbrsfmq(String dbrsfmq) 
	{
		this.dbrsfmq = dbrsfmq;
	}
	/**
	 * 返回 担保人是否面签
	 * @return
	 */
	public String getDbrsfmq() 
	{
		return this.dbrsfmq;
	}
	public void setDkxgqksm(String dkxgqksm) 
	{
		this.dkxgqksm = dkxgqksm;
	}
	/**
	 * 返回 贷款相关情况说明
	 * @return
	 */
	public String getDkxgqksm() 
	{
		return this.dkxgqksm;
	}
	public void setFxyc(String fxyc) 
	{
		this.fxyc = fxyc;
	}
	/**
	 * 返回 风险预测
	 * @return
	 */
	public String getFxyc() 
	{
		return this.fxyc;
	}
	public void setNcqdfxkzcs(String ncqdfxkzcs) 
	{
		this.ncqdfxkzcs = ncqdfxkzcs;
	}
	/**
	 * 返回 拟采取的风险控制措施
	 * @return
	 */
	public String getNcqdfxkzcs() 
	{
		return this.ncqdfxkzcs;
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
	public void setDkfs(String dkfs) 
	{
		this.dkfs = dkfs;
	}
	/**
	 * 返回 贷款方式
	 * @return
	 */
	public String getDkfs() 
	{
		return this.dkfs;
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
	public void setZdcrqm(String zdcrqm) 
	{
		this.zdcrqm = zdcrqm;
	}
	/**
	 * 返回 主调查人签名
	 * @return
	 */
	public String getZdcrqm() 
	{
		return this.zdcrqm;
	}
	public void setZdcrqzsj(Date zdcrqzsj) 
	{
		this.zdcrqzsj = zdcrqzsj;
	}
	/**
	 * 返回 主调查人签字时间
	 * @return
	 */
	public Date getZdcrqzsj() 
	{
		return this.zdcrqzsj;
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
	public void setZdcrid(String zdcrid) 
	{
		this.zdcrid = zdcrid;
	}
	/**
	 * 返回 主调查人Id
	 * @return
	 */
	public String getZdcrid() 
	{
		return this.zdcrid;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("jkrmc", this.jkrmc) 
		.append("jkrxydj", this.jkrxydj) 
		.append("dywxz", this.dywxz) 
		.append("zywxz", this.zywxz) 
		.append("xyxtcxsj", this.xyxtcxsj) 
		.append("xdxtglxtcx", this.xdxtglxtcx) 
		.append("rmyxgrzxsjkcx", this.rmyxgrzxsjkcx) 
		.append("dqdcfs", this.dqdcfs) 
		.append("zlqbzs", this.zlqbzs) 
		.append("sqrzsyhs", this.sqrzsyhs) 
		.append("sqrzsdz", this.sqrzsdz) 
		.append("sqrsryhs", this.sqrsryhs) 
		.append("yjsr", this.yjsr) 
		.append("jkrlxfs", this.jkrlxfs) 
		.append("jkrpolxfs", this.jkrpolxfs) 
		.append("dbrlxfs", this.dbrlxfs) 
		.append("dbrpolxfs", this.dbrpolxfs) 
		.append("gyrlxfs", this.gyrlxfs) 
		.append("hsdbwfs", this.hsdbwfs) 
		.append("dbrsfmq", this.dbrsfmq) 
		.append("dkxgqksm", this.dkxgqksm) 
		.append("fxyc", this.fxyc) 
		.append("ncqdfxkzcs", this.ncqdfxkzcs) 
		.append("sxje", this.sxje) 
		.append("sxqx", this.sxqx) 
		.append("dbfs", this.dbfs) 
		.append("dkfs", this.dkfs) 
		.append("dkje", this.dkje) 
		.append("dkqx", this.dkqx) 
		.append("yll", this.yll) 
		.append("ghfs", this.ghfs) 
		.append("zdcrqm", this.zdcrqm) 
		.append("zdcrqzsj", this.zdcrqzsj) 
		.append("jdid", this.jdid) 
		.append("zdcrid", this.zdcrid) 
		.toString();
	}
}
