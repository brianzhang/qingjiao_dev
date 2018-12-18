package com.lc.ibps.loans.GTGSHXX.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_gtgshxxb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:47
 *</pre>
 */
 @SuppressWarnings("serial")
public class GTGSHXXTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  yyzzhm; 		/*营业执照号码*/
	protected String  yyzznjsj; 		/*营业执照年检时间*/
	protected String  clsj; 		/*成立时间*/
	protected String  jyfw; 		/*经营范围*/
	protected String  jyfs; 		/*经营方式*/
	protected String  mdzh; 		/*门店字号*/
	protected String  mddz; 		/*门店地址*/
	protected String  jygm; 		/*经营规模*/
	protected String  jbzhkhx; 		/*基本账号开户行*/
	protected String  jbzh; 		/*基本账号*/
	protected String  jymj; 		/*经营面积*/
	protected String  glzhlx; 		/*关联账户类型*/
	protected Long  cyrs; 		/*从业人数*/
	protected String  zcxs; 		/*组成形式*/
	protected String  yyyf; 		/*营业用房*/
	protected String  ghjg; 		/*管户机构*/
	protected String  bz; 		/*备注*/
	protected String  hhrmc; 		/*合伙人名称*/
	protected String  zjlx; 		/*证件类型*/
	protected String  zjyxqx; 		/*证件有效期限*/
	protected String  zjhm; 		/*证件号码*/
	protected String  hjdz; 		/*户籍地址*/
	protected String  khxb; 		/*客户性别*/
	protected String  mz; 		/*民族*/
	protected String  lxdh; 		/*联系电话*/
	protected String  hhfs; 		/*合伙方式*/

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
	public void setYyzzhm(String yyzzhm) 
	{
		this.yyzzhm = yyzzhm;
	}
	/**
	 * 返回 营业执照号码
	 * @return
	 */
	public String getYyzzhm() 
	{
		return this.yyzzhm;
	}
	public void setYyzznjsj(String yyzznjsj) 
	{
		this.yyzznjsj = yyzznjsj;
	}
	/**
	 * 返回 营业执照年检时间
	 * @return
	 */
	public String getYyzznjsj() 
	{
		return this.yyzznjsj;
	}
	public void setClsj(String clsj) 
	{
		this.clsj = clsj;
	}
	/**
	 * 返回 成立时间
	 * @return
	 */
	public String getClsj() 
	{
		return this.clsj;
	}
	public void setJyfw(String jyfw) 
	{
		this.jyfw = jyfw;
	}
	/**
	 * 返回 经营范围
	 * @return
	 */
	public String getJyfw() 
	{
		return this.jyfw;
	}
	public void setJyfs(String jyfs) 
	{
		this.jyfs = jyfs;
	}
	/**
	 * 返回 经营方式
	 * @return
	 */
	public String getJyfs() 
	{
		return this.jyfs;
	}
	public void setMdzh(String mdzh) 
	{
		this.mdzh = mdzh;
	}
	/**
	 * 返回 门店字号
	 * @return
	 */
	public String getMdzh() 
	{
		return this.mdzh;
	}
	public void setMddz(String mddz) 
	{
		this.mddz = mddz;
	}
	/**
	 * 返回 门店地址
	 * @return
	 */
	public String getMddz() 
	{
		return this.mddz;
	}
	public void setJygm(String jygm) 
	{
		this.jygm = jygm;
	}
	/**
	 * 返回 经营规模
	 * @return
	 */
	public String getJygm() 
	{
		return this.jygm;
	}
	public void setJbzhkhx(String jbzhkhx) 
	{
		this.jbzhkhx = jbzhkhx;
	}
	/**
	 * 返回 基本账号开户行
	 * @return
	 */
	public String getJbzhkhx() 
	{
		return this.jbzhkhx;
	}
	public void setJbzh(String jbzh) 
	{
		this.jbzh = jbzh;
	}
	/**
	 * 返回 基本账号
	 * @return
	 */
	public String getJbzh() 
	{
		return this.jbzh;
	}
	public void setJymj(String jymj) 
	{
		this.jymj = jymj;
	}
	/**
	 * 返回 经营面积
	 * @return
	 */
	public String getJymj() 
	{
		return this.jymj;
	}
	public void setGlzhlx(String glzhlx) 
	{
		this.glzhlx = glzhlx;
	}
	/**
	 * 返回 关联账户类型
	 * @return
	 */
	public String getGlzhlx() 
	{
		return this.glzhlx;
	}
	public void setCyrs(Long cyrs) 
	{
		this.cyrs = cyrs;
	}
	/**
	 * 返回 从业人数
	 * @return
	 */
	public Long getCyrs() 
	{
		return this.cyrs;
	}
	public void setZcxs(String zcxs) 
	{
		this.zcxs = zcxs;
	}
	/**
	 * 返回 组成形式
	 * @return
	 */
	public String getZcxs() 
	{
		return this.zcxs;
	}
	public void setYyyf(String yyyf) 
	{
		this.yyyf = yyyf;
	}
	/**
	 * 返回 营业用房
	 * @return
	 */
	public String getYyyf() 
	{
		return this.yyyf;
	}
	public void setGhjg(String ghjg) 
	{
		this.ghjg = ghjg;
	}
	/**
	 * 返回 管户机构
	 * @return
	 */
	public String getGhjg() 
	{
		return this.ghjg;
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
	public void setHhrmc(String hhrmc) 
	{
		this.hhrmc = hhrmc;
	}
	/**
	 * 返回 合伙人名称
	 * @return
	 */
	public String getHhrmc() 
	{
		return this.hhrmc;
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
	public void setMz(String mz) 
	{
		this.mz = mz;
	}
	/**
	 * 返回 民族
	 * @return
	 */
	public String getMz() 
	{
		return this.mz;
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
	public void setHhfs(String hhfs) 
	{
		this.hhfs = hhfs;
	}
	/**
	 * 返回 合伙方式
	 * @return
	 */
	public String getHhfs() 
	{
		return this.hhfs;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("yyzzhm", this.yyzzhm) 
		.append("yyzznjsj", this.yyzznjsj) 
		.append("clsj", this.clsj) 
		.append("jyfw", this.jyfw) 
		.append("jyfs", this.jyfs) 
		.append("mdzh", this.mdzh) 
		.append("mddz", this.mddz) 
		.append("jygm", this.jygm) 
		.append("jbzhkhx", this.jbzhkhx) 
		.append("jbzh", this.jbzh) 
		.append("jymj", this.jymj) 
		.append("glzhlx", this.glzhlx) 
		.append("cyrs", this.cyrs) 
		.append("zcxs", this.zcxs) 
		.append("yyyf", this.yyyf) 
		.append("ghjg", this.ghjg) 
		.append("bz", this.bz) 
		.append("hhrmc", this.hhrmc) 
		.append("zjlx", this.zjlx) 
		.append("zjyxqx", this.zjyxqx) 
		.append("zjhm", this.zjhm) 
		.append("hjdz", this.hjdz) 
		.append("khxb", this.khxb) 
		.append("mz", this.mz) 
		.append("lxdh", this.lxdh) 
		.append("hhfs", this.hhfs) 
		.toString();
	}
}
