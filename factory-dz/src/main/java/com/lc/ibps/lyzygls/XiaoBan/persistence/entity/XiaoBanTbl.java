package com.lc.ibps.lyzygls.XiaoBan.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_xb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 16:05:58
 *</pre>
 */
 @SuppressWarnings("serial")
public class XiaoBanTbl extends AbstractPo<String>{
	protected String  id; 		/*id_*/
	protected String  idd; 		/*idd*/
	protected String  lbh; 		/*林班号*/
	protected String  xbh; 		/*小班号*/
	protected String  ejlz; 		/*二级林种*/
	protected String  ejlz1; 		/*二级林种1*/
	protected String  ejlz2; 		/*二级林种2*/
	protected String  dl; 		/*地类*/
	protected String  dl1; 		/*地类1*/
	protected String  dq; 		/*地权*/
	protected String  lq; 		/*林权*/
	protected String  qy; 		/*起源*/
	protected Double  mj; 		/*面积*/
	protected String  zs; 		/*株数*/
	protected String  xj; 		/*蓄积*/
	protected String  lz; 		/*龄组*/
	protected String  lflx; 		/*林分类型*/
	protected String  szzc; 		/*树种组成*/
	protected Double  ybd; 		/*郁闭度*/
	protected String  jycs; 		/*经营措施*/
	protected String  lj; 		/*龄级*/
	protected String  ll; 		/*林龄*/
	protected String  xiongjing; 		/*胸径*/
	protected Double  sg; 		/*树高*/
	protected String  dqsyq; 		/*地权使用权*/
	protected String  lqsyq; 		/*林权使用权*/
	protected String  gclb; 		/*工程类别*/
	protected String  tr; 		/*土壤*/
	protected String  zrd; 		/*自然度*/
	protected String  bz; 		/*备注*/
	protected String  qljg; 		/*群落结构*/
	protected String  ldlx; 		/*立地类型*/
	protected Double  ysspjg; 		/*优势木平均高*/
	protected String  dm; 		/*地貌*/
	protected String  kdmxjl; 		/*枯倒木蓄积量*/
	protected String  zyxm; 		/*主要下木*/
	protected String  xmgd; 		/*下木盖度*/
	protected String  zydbw; 		/*主要地被物*/
	protected String  dbwgd; 		/*地被物盖度*/
	protected String  px; 		/*坡向*/
	protected String  pw; 		/*坡位*/
	protected String  pd; 		/*坡度*/
	protected String  a1chd; 		/*A1层厚度*/
	protected String  hb; 		/*海拔*/
	protected String  smd; 		/*疏密度*/
	protected String  fycfnd; 		/*抚育采伐年度*/
	protected String  zlgxnd; 		/*造林更新年度*/
	protected String  gqzs; 		/*公顷株数*/
	protected String  gqxj; 		/*公顷蓄积*/
	protected String  gqczmd; 		/*公顷初植密度*/
	protected String  rglbcl; 		/*人工林保存率*/
	protected String  pjmdzcj; 		/*平均木单株材积*/
	protected String  ssmzs; 		/*散生木株数*/
	protected String  ssmxj; 		/*散生木蓄积*/
	protected String  ssmpjxj; 		/*散生木平均胸径*/
	protected String  drjy; 		/*导入校验*/
	protected String  drjyts1; 		/*导入校验提示1*/
	protected String  drjyts2; 		/*导入校验提示2*/
	protected String  drjyts3; 		/*导入校验提示3*/
	protected String  szzcpx; 		/*树种组成排序*/
	protected Double  gpshzb; 		/*GPS横坐标*/
	protected Double  gpszzb; 		/*GPS纵坐标*/
	protected String  trabchd; 		/*土壤Ab层厚度*/
	protected Double  szl; 		/*生长率*/
	protected String  ksl; 		/*枯损量*/
	protected String  szliang; 		/*生长量*/
	protected String  fzcxhl; 		/*非正常消耗量*/
	protected String  dwbh; 		/*单位编号*/
	protected String  ssmszl; 		/*散生木生长率*/
	protected String  ghfmbz; 		/*管护费亩标准*/
	protected String  lxsrfcmbz; 		/*林下收入分成亩标准*/
	protected String  xznd; 		/*性质年度*/
	protected String  ghzlmj; 		/*管护造林面积*/
	protected String  ghfymj; 		/*管护抚育面积*/
	protected String  kjd; 		/*可及度*/
	protected String  dwj; 		/*地位级*/
	protected String  sq; 		/*事权*/
	protected String  gcxz; 		/*工程性质*/
	protected String  bhdj; 		/*保护等级*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 id_
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setIdd(String idd) 
	{
		this.idd = idd;
	}
	/**
	 * 返回 idd
	 * @return
	 */
	public String getIdd() 
	{
		return this.idd;
	}
	public void setLbh(String lbh) 
	{
		this.lbh = lbh;
	}
	/**
	 * 返回 林班号
	 * @return
	 */
	public String getLbh() 
	{
		return this.lbh;
	}
	public void setXbh(String xbh) 
	{
		this.xbh = xbh;
	}
	/**
	 * 返回 小班号
	 * @return
	 */
	public String getXbh() 
	{
		return this.xbh;
	}
	public void setEjlz(String ejlz) 
	{
		this.ejlz = ejlz;
	}
	/**
	 * 返回 二级林种
	 * @return
	 */
	public String getEjlz() 
	{
		return this.ejlz;
	}
	public void setEjlz1(String ejlz1) 
	{
		this.ejlz1 = ejlz1;
	}
	/**
	 * 返回 二级林种1
	 * @return
	 */
	public String getEjlz1() 
	{
		return this.ejlz1;
	}
	public void setEjlz2(String ejlz2) 
	{
		this.ejlz2 = ejlz2;
	}
	/**
	 * 返回 二级林种2
	 * @return
	 */
	public String getEjlz2() 
	{
		return this.ejlz2;
	}
	public void setDl(String dl) 
	{
		this.dl = dl;
	}
	/**
	 * 返回 地类
	 * @return
	 */
	public String getDl() 
	{
		return this.dl;
	}
	public void setDl1(String dl1) 
	{
		this.dl1 = dl1;
	}
	/**
	 * 返回 地类1
	 * @return
	 */
	public String getDl1() 
	{
		return this.dl1;
	}
	public void setDq(String dq) 
	{
		this.dq = dq;
	}
	/**
	 * 返回 地权
	 * @return
	 */
	public String getDq() 
	{
		return this.dq;
	}
	public void setLq(String lq) 
	{
		this.lq = lq;
	}
	/**
	 * 返回 林权
	 * @return
	 */
	public String getLq() 
	{
		return this.lq;
	}
	public void setQy(String qy) 
	{
		this.qy = qy;
	}
	/**
	 * 返回 起源
	 * @return
	 */
	public String getQy() 
	{
		return this.qy;
	}
	public void setMj(Double mj) 
	{
		this.mj = mj;
	}
	/**
	 * 返回 面积
	 * @return
	 */
	public Double getMj() 
	{
		return this.mj;
	}
	public void setZs(String zs) 
	{
		this.zs = zs;
	}
	/**
	 * 返回 株数
	 * @return
	 */
	public String getZs() 
	{
		return this.zs;
	}
	public void setXj(String xj) 
	{
		this.xj = xj;
	}
	/**
	 * 返回 蓄积
	 * @return
	 */
	public String getXj() 
	{
		return this.xj;
	}
	public void setLz(String lz) 
	{
		this.lz = lz;
	}
	/**
	 * 返回 龄组
	 * @return
	 */
	public String getLz() 
	{
		return this.lz;
	}
	public void setLflx(String lflx) 
	{
		this.lflx = lflx;
	}
	/**
	 * 返回 林分类型
	 * @return
	 */
	public String getLflx() 
	{
		return this.lflx;
	}
	public void setSzzc(String szzc) 
	{
		this.szzc = szzc;
	}
	/**
	 * 返回 树种组成
	 * @return
	 */
	public String getSzzc() 
	{
		return this.szzc;
	}
	public void setYbd(Double ybd) 
	{
		this.ybd = ybd;
	}
	/**
	 * 返回 郁闭度
	 * @return
	 */
	public Double getYbd() 
	{
		return this.ybd;
	}
	public void setJycs(String jycs) 
	{
		this.jycs = jycs;
	}
	/**
	 * 返回 经营措施
	 * @return
	 */
	public String getJycs() 
	{
		return this.jycs;
	}
	public void setLj(String lj) 
	{
		this.lj = lj;
	}
	/**
	 * 返回 龄级
	 * @return
	 */
	public String getLj() 
	{
		return this.lj;
	}
	public void setLl(String ll) 
	{
		this.ll = ll;
	}
	/**
	 * 返回 林龄
	 * @return
	 */
	public String getLl() 
	{
		return this.ll;
	}
	public void setXiongjing(String xiongjing) 
	{
		this.xiongjing = xiongjing;
	}
	/**
	 * 返回 胸径
	 * @return
	 */
	public String getXiongjing() 
	{
		return this.xiongjing;
	}
	public void setSg(Double sg) 
	{
		this.sg = sg;
	}
	/**
	 * 返回 树高
	 * @return
	 */
	public Double getSg() 
	{
		return this.sg;
	}
	public void setDqsyq(String dqsyq) 
	{
		this.dqsyq = dqsyq;
	}
	/**
	 * 返回 地权使用权
	 * @return
	 */
	public String getDqsyq() 
	{
		return this.dqsyq;
	}
	public void setLqsyq(String lqsyq) 
	{
		this.lqsyq = lqsyq;
	}
	/**
	 * 返回 林权使用权
	 * @return
	 */
	public String getLqsyq() 
	{
		return this.lqsyq;
	}
	public void setGclb(String gclb) 
	{
		this.gclb = gclb;
	}
	/**
	 * 返回 工程类别
	 * @return
	 */
	public String getGclb() 
	{
		return this.gclb;
	}
	public void setTr(String tr) 
	{
		this.tr = tr;
	}
	/**
	 * 返回 土壤
	 * @return
	 */
	public String getTr() 
	{
		return this.tr;
	}
	public void setZrd(String zrd) 
	{
		this.zrd = zrd;
	}
	/**
	 * 返回 自然度
	 * @return
	 */
	public String getZrd() 
	{
		return this.zrd;
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
	public void setQljg(String qljg) 
	{
		this.qljg = qljg;
	}
	/**
	 * 返回 群落结构
	 * @return
	 */
	public String getQljg() 
	{
		return this.qljg;
	}
	public void setLdlx(String ldlx) 
	{
		this.ldlx = ldlx;
	}
	/**
	 * 返回 立地类型
	 * @return
	 */
	public String getLdlx() 
	{
		return this.ldlx;
	}
	public void setYsspjg(Double ysspjg) 
	{
		this.ysspjg = ysspjg;
	}
	/**
	 * 返回 优势木平均高
	 * @return
	 */
	public Double getYsspjg() 
	{
		return this.ysspjg;
	}
	public void setDm(String dm) 
	{
		this.dm = dm;
	}
	/**
	 * 返回 地貌
	 * @return
	 */
	public String getDm() 
	{
		return this.dm;
	}
	public void setKdmxjl(String kdmxjl) 
	{
		this.kdmxjl = kdmxjl;
	}
	/**
	 * 返回 枯倒木蓄积量
	 * @return
	 */
	public String getKdmxjl() 
	{
		return this.kdmxjl;
	}
	public void setZyxm(String zyxm) 
	{
		this.zyxm = zyxm;
	}
	/**
	 * 返回 主要下木
	 * @return
	 */
	public String getZyxm() 
	{
		return this.zyxm;
	}
	public void setXmgd(String xmgd) 
	{
		this.xmgd = xmgd;
	}
	/**
	 * 返回 下木盖度
	 * @return
	 */
	public String getXmgd() 
	{
		return this.xmgd;
	}
	public void setZydbw(String zydbw) 
	{
		this.zydbw = zydbw;
	}
	/**
	 * 返回 主要地被物
	 * @return
	 */
	public String getZydbw() 
	{
		return this.zydbw;
	}
	public void setDbwgd(String dbwgd) 
	{
		this.dbwgd = dbwgd;
	}
	/**
	 * 返回 地被物盖度
	 * @return
	 */
	public String getDbwgd() 
	{
		return this.dbwgd;
	}
	public void setPx(String px) 
	{
		this.px = px;
	}
	/**
	 * 返回 坡向
	 * @return
	 */
	public String getPx() 
	{
		return this.px;
	}
	public void setPw(String pw) 
	{
		this.pw = pw;
	}
	/**
	 * 返回 坡位
	 * @return
	 */
	public String getPw() 
	{
		return this.pw;
	}
	public void setPd(String pd) 
	{
		this.pd = pd;
	}
	/**
	 * 返回 坡度
	 * @return
	 */
	public String getPd() 
	{
		return this.pd;
	}
	public void setA1chd(String a1chd) 
	{
		this.a1chd = a1chd;
	}
	/**
	 * 返回 A1层厚度
	 * @return
	 */
	public String getA1chd() 
	{
		return this.a1chd;
	}
	public void setHb(String hb) 
	{
		this.hb = hb;
	}
	/**
	 * 返回 海拔
	 * @return
	 */
	public String getHb() 
	{
		return this.hb;
	}
	public void setSmd(String smd) 
	{
		this.smd = smd;
	}
	/**
	 * 返回 疏密度
	 * @return
	 */
	public String getSmd() 
	{
		return this.smd;
	}
	public void setFycfnd(String fycfnd) 
	{
		this.fycfnd = fycfnd;
	}
	/**
	 * 返回 抚育采伐年度
	 * @return
	 */
	public String getFycfnd() 
	{
		return this.fycfnd;
	}
	public void setZlgxnd(String zlgxnd) 
	{
		this.zlgxnd = zlgxnd;
	}
	/**
	 * 返回 造林更新年度
	 * @return
	 */
	public String getZlgxnd() 
	{
		return this.zlgxnd;
	}
	public void setGqzs(String gqzs) 
	{
		this.gqzs = gqzs;
	}
	/**
	 * 返回 公顷株数
	 * @return
	 */
	public String getGqzs() 
	{
		return this.gqzs;
	}
	public void setGqxj(String gqxj) 
	{
		this.gqxj = gqxj;
	}
	/**
	 * 返回 公顷蓄积
	 * @return
	 */
	public String getGqxj() 
	{
		return this.gqxj;
	}
	public void setGqczmd(String gqczmd) 
	{
		this.gqczmd = gqczmd;
	}
	/**
	 * 返回 公顷初植密度
	 * @return
	 */
	public String getGqczmd() 
	{
		return this.gqczmd;
	}
	public void setRglbcl(String rglbcl) 
	{
		this.rglbcl = rglbcl;
	}
	/**
	 * 返回 人工林保存率
	 * @return
	 */
	public String getRglbcl() 
	{
		return this.rglbcl;
	}
	public void setPjmdzcj(String pjmdzcj) 
	{
		this.pjmdzcj = pjmdzcj;
	}
	/**
	 * 返回 平均木单株材积
	 * @return
	 */
	public String getPjmdzcj() 
	{
		return this.pjmdzcj;
	}
	public void setSsmzs(String ssmzs) 
	{
		this.ssmzs = ssmzs;
	}
	/**
	 * 返回 散生木株数
	 * @return
	 */
	public String getSsmzs() 
	{
		return this.ssmzs;
	}
	public void setSsmxj(String ssmxj) 
	{
		this.ssmxj = ssmxj;
	}
	/**
	 * 返回 散生木蓄积
	 * @return
	 */
	public String getSsmxj() 
	{
		return this.ssmxj;
	}
	public void setSsmpjxj(String ssmpjxj) 
	{
		this.ssmpjxj = ssmpjxj;
	}
	/**
	 * 返回 散生木平均胸径
	 * @return
	 */
	public String getSsmpjxj() 
	{
		return this.ssmpjxj;
	}
	public void setDrjy(String drjy) 
	{
		this.drjy = drjy;
	}
	/**
	 * 返回 导入校验
	 * @return
	 */
	public String getDrjy() 
	{
		return this.drjy;
	}
	public void setDrjyts1(String drjyts1) 
	{
		this.drjyts1 = drjyts1;
	}
	/**
	 * 返回 导入校验提示1
	 * @return
	 */
	public String getDrjyts1() 
	{
		return this.drjyts1;
	}
	public void setDrjyts2(String drjyts2) 
	{
		this.drjyts2 = drjyts2;
	}
	/**
	 * 返回 导入校验提示2
	 * @return
	 */
	public String getDrjyts2() 
	{
		return this.drjyts2;
	}
	public void setDrjyts3(String drjyts3) 
	{
		this.drjyts3 = drjyts3;
	}
	/**
	 * 返回 导入校验提示3
	 * @return
	 */
	public String getDrjyts3() 
	{
		return this.drjyts3;
	}
	public void setSzzcpx(String szzcpx) 
	{
		this.szzcpx = szzcpx;
	}
	/**
	 * 返回 树种组成排序
	 * @return
	 */
	public String getSzzcpx() 
	{
		return this.szzcpx;
	}
	public void setGpshzb(Double gpshzb) 
	{
		this.gpshzb = gpshzb;
	}
	/**
	 * 返回 GPS横坐标
	 * @return
	 */
	public Double getGpshzb() 
	{
		return this.gpshzb;
	}
	public void setGpszzb(Double gpszzb) 
	{
		this.gpszzb = gpszzb;
	}
	/**
	 * 返回 GPS纵坐标
	 * @return
	 */
	public Double getGpszzb() 
	{
		return this.gpszzb;
	}
	public void setTrabchd(String trabchd) 
	{
		this.trabchd = trabchd;
	}
	/**
	 * 返回 土壤Ab层厚度
	 * @return
	 */
	public String getTrabchd() 
	{
		return this.trabchd;
	}
	public void setSzl(Double szl) 
	{
		this.szl = szl;
	}
	/**
	 * 返回 生长率
	 * @return
	 */
	public Double getSzl() 
	{
		return this.szl;
	}
	public void setKsl(String ksl) 
	{
		this.ksl = ksl;
	}
	/**
	 * 返回 枯损量
	 * @return
	 */
	public String getKsl() 
	{
		return this.ksl;
	}
	public void setSzliang(String szliang) 
	{
		this.szliang = szliang;
	}
	/**
	 * 返回 生长量
	 * @return
	 */
	public String getSzliang() 
	{
		return this.szliang;
	}
	public void setFzcxhl(String fzcxhl) 
	{
		this.fzcxhl = fzcxhl;
	}
	/**
	 * 返回 非正常消耗量
	 * @return
	 */
	public String getFzcxhl() 
	{
		return this.fzcxhl;
	}
	public void setDwbh(String dwbh) 
	{
		this.dwbh = dwbh;
	}
	/**
	 * 返回 单位编号
	 * @return
	 */
	public String getDwbh() 
	{
		return this.dwbh;
	}
	public void setSsmszl(String ssmszl) 
	{
		this.ssmszl = ssmszl;
	}
	/**
	 * 返回 散生木生长率
	 * @return
	 */
	public String getSsmszl() 
	{
		return this.ssmszl;
	}
	public void setGhfmbz(String ghfmbz) 
	{
		this.ghfmbz = ghfmbz;
	}
	/**
	 * 返回 管护费亩标准
	 * @return
	 */
	public String getGhfmbz() 
	{
		return this.ghfmbz;
	}
	public void setLxsrfcmbz(String lxsrfcmbz) 
	{
		this.lxsrfcmbz = lxsrfcmbz;
	}
	/**
	 * 返回 林下收入分成亩标准
	 * @return
	 */
	public String getLxsrfcmbz() 
	{
		return this.lxsrfcmbz;
	}
	public void setXznd(String xznd) 
	{
		this.xznd = xznd;
	}
	/**
	 * 返回 性质年度
	 * @return
	 */
	public String getXznd() 
	{
		return this.xznd;
	}
	public void setGhzlmj(String ghzlmj) 
	{
		this.ghzlmj = ghzlmj;
	}
	/**
	 * 返回 管护造林面积
	 * @return
	 */
	public String getGhzlmj() 
	{
		return this.ghzlmj;
	}
	public void setGhfymj(String ghfymj) 
	{
		this.ghfymj = ghfymj;
	}
	/**
	 * 返回 管护抚育面积
	 * @return
	 */
	public String getGhfymj() 
	{
		return this.ghfymj;
	}
	public void setKjd(String kjd) 
	{
		this.kjd = kjd;
	}
	/**
	 * 返回 可及度
	 * @return
	 */
	public String getKjd() 
	{
		return this.kjd;
	}
	public void setDwj(String dwj) 
	{
		this.dwj = dwj;
	}
	/**
	 * 返回 地位级
	 * @return
	 */
	public String getDwj() 
	{
		return this.dwj;
	}
	public void setSq(String sq) 
	{
		this.sq = sq;
	}
	/**
	 * 返回 事权
	 * @return
	 */
	public String getSq() 
	{
		return this.sq;
	}
	public void setGcxz(String gcxz) 
	{
		this.gcxz = gcxz;
	}
	/**
	 * 返回 工程性质
	 * @return
	 */
	public String getGcxz() 
	{
		return this.gcxz;
	}
	public void setBhdj(String bhdj) 
	{
		this.bhdj = bhdj;
	}
	/**
	 * 返回 保护等级
	 * @return
	 */
	public String getBhdj() 
	{
		return this.bhdj;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("idd", this.idd) 
		.append("lbh", this.lbh) 
		.append("xbh", this.xbh) 
		.append("ejlz", this.ejlz) 
		.append("ejlz1", this.ejlz1) 
		.append("ejlz2", this.ejlz2) 
		.append("dl", this.dl) 
		.append("dl1", this.dl1) 
		.append("dq", this.dq) 
		.append("lq", this.lq) 
		.append("qy", this.qy) 
		.append("mj", this.mj) 
		.append("zs", this.zs) 
		.append("xj", this.xj) 
		.append("lz", this.lz) 
		.append("lflx", this.lflx) 
		.append("szzc", this.szzc) 
		.append("ybd", this.ybd) 
		.append("jycs", this.jycs) 
		.append("lj", this.lj) 
		.append("ll", this.ll) 
		.append("xiongjing", this.xiongjing) 
		.append("sg", this.sg) 
		.append("dqsyq", this.dqsyq) 
		.append("lqsyq", this.lqsyq) 
		.append("gclb", this.gclb) 
		.append("tr", this.tr) 
		.append("zrd", this.zrd) 
		.append("bz", this.bz) 
		.append("qljg", this.qljg) 
		.append("ldlx", this.ldlx) 
		.append("ysspjg", this.ysspjg) 
		.append("dm", this.dm) 
		.append("kdmxjl", this.kdmxjl) 
		.append("zyxm", this.zyxm) 
		.append("xmgd", this.xmgd) 
		.append("zydbw", this.zydbw) 
		.append("dbwgd", this.dbwgd) 
		.append("px", this.px) 
		.append("pw", this.pw) 
		.append("pd", this.pd) 
		.append("a1chd", this.a1chd) 
		.append("hb", this.hb) 
		.append("smd", this.smd) 
		.append("fycfnd", this.fycfnd) 
		.append("zlgxnd", this.zlgxnd) 
		.append("gqzs", this.gqzs) 
		.append("gqxj", this.gqxj) 
		.append("gqczmd", this.gqczmd) 
		.append("rglbcl", this.rglbcl) 
		.append("pjmdzcj", this.pjmdzcj) 
		.append("ssmzs", this.ssmzs) 
		.append("ssmxj", this.ssmxj) 
		.append("ssmpjxj", this.ssmpjxj) 
		.append("drjy", this.drjy) 
		.append("drjyts1", this.drjyts1) 
		.append("drjyts2", this.drjyts2) 
		.append("drjyts3", this.drjyts3) 
		.append("szzcpx", this.szzcpx) 
		.append("gpshzb", this.gpshzb) 
		.append("gpszzb", this.gpszzb) 
		.append("trabchd", this.trabchd) 
		.append("szl", this.szl) 
		.append("ksl", this.ksl) 
		.append("szliang", this.szliang) 
		.append("fzcxhl", this.fzcxhl) 
		.append("dwbh", this.dwbh) 
		.append("ssmszl", this.ssmszl) 
		.append("ghfmbz", this.ghfmbz) 
		.append("lxsrfcmbz", this.lxsrfcmbz) 
		.append("xznd", this.xznd) 
		.append("ghzlmj", this.ghzlmj) 
		.append("ghfymj", this.ghfymj) 
		.append("kjd", this.kjd) 
		.append("dwj", this.dwj) 
		.append("sq", this.sq) 
		.append("gcxz", this.gcxz) 
		.append("bhdj", this.bhdj) 
		.toString();
	}
}
