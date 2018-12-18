package com.lc.ibps.lyzygls.DanWeiGK.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_dwgk 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 15:09:26
 *</pre>
 */
 @SuppressWarnings("serial")
public class DanWeiGKTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  mingChen; 		/*单位名称*/
	protected Double  mianJi; 		/*土地总面积*/
	protected String  jingDu; 		/*经度*/
	protected String  weiDuo; 		/*纬度*/
	protected String  shanXi; 		/*地处山系*/
	protected String  shuiXi; 		/*地处水系*/
	protected String  pingYuan; 		/*地处平原*/
	protected Double  haiBa; 		/*平均海拔*/
	protected Double  qiWen; 		/*平均气温*/
	protected Double  nianJiWen; 		/*年积温*/
	protected Double  riZhaoShiShuo; 		/*日照时数*/
	protected String  zhuYaoTuRang; 		/*主要土壤*/
	protected Long  zhiWuChongLei; 		/*植物种类*/
	protected String  tiaoZhaNianDuo; 		/*二类调查年度*/
	protected String  luRuNianDu; 		/*录入年度*/
	protected Double  kuSunShuai; 		/*自然枯损率*/
	protected Double  shengChangLu; 		/*综合生长率*/
	protected String  linFenLeiXing; 		/*林分类型*/
	protected String  lingZu; 		/*龄组*/
	protected String  shengZhangLu; 		/*生长率*/
	protected String  linDe; 		/*林地*/
	protected String  linMu; 		/*林木*/
	protected String  mianJi1; 		/*面积1*/
	protected String  xuJi1; 		/*蓄积1*/
	protected String  mianJi2; 		/*面积2*/
	protected String  xuJi2; 		/*蓄积2*/
	protected String  pingJun; 		/*平均降水量*/
	protected String  wuShuangQi; 		/*无霜期*/

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
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	public void setMingChen(String mingChen) 
	{
		this.mingChen = mingChen;
	}
	/**
	 * 返回 单位名称
	 * @return
	 */
	public String getMingChen() 
	{
		return this.mingChen;
	}
	public void setMianJi(Double mianJi) 
	{
		this.mianJi = mianJi;
	}
	/**
	 * 返回 土地总面积
	 * @return
	 */
	public Double getMianJi() 
	{
		return this.mianJi;
	}
	public void setJingDu(String jingDu) 
	{
		this.jingDu = jingDu;
	}
	/**
	 * 返回 经度
	 * @return
	 */
	public String getJingDu() 
	{
		return this.jingDu;
	}
	public void setWeiDuo(String weiDuo) 
	{
		this.weiDuo = weiDuo;
	}
	/**
	 * 返回 纬度
	 * @return
	 */
	public String getWeiDuo() 
	{
		return this.weiDuo;
	}
	public void setShanXi(String shanXi) 
	{
		this.shanXi = shanXi;
	}
	/**
	 * 返回 地处山系
	 * @return
	 */
	public String getShanXi() 
	{
		return this.shanXi;
	}
	public void setShuiXi(String shuiXi) 
	{
		this.shuiXi = shuiXi;
	}
	/**
	 * 返回 地处水系
	 * @return
	 */
	public String getShuiXi() 
	{
		return this.shuiXi;
	}
	public void setPingYuan(String pingYuan) 
	{
		this.pingYuan = pingYuan;
	}
	/**
	 * 返回 地处平原
	 * @return
	 */
	public String getPingYuan() 
	{
		return this.pingYuan;
	}
	public void setHaiBa(Double haiBa) 
	{
		this.haiBa = haiBa;
	}
	/**
	 * 返回 平均海拔
	 * @return
	 */
	public Double getHaiBa() 
	{
		return this.haiBa;
	}
	public void setQiWen(Double qiWen) 
	{
		this.qiWen = qiWen;
	}
	/**
	 * 返回 平均气温
	 * @return
	 */
	public Double getQiWen() 
	{
		return this.qiWen;
	}
	public void setNianJiWen(Double nianJiWen) 
	{
		this.nianJiWen = nianJiWen;
	}
	/**
	 * 返回 年积温
	 * @return
	 */
	public Double getNianJiWen() 
	{
		return this.nianJiWen;
	}
	public void setRiZhaoShiShuo(Double riZhaoShiShuo) 
	{
		this.riZhaoShiShuo = riZhaoShiShuo;
	}
	/**
	 * 返回 日照时数
	 * @return
	 */
	public Double getRiZhaoShiShuo() 
	{
		return this.riZhaoShiShuo;
	}
	public void setZhuYaoTuRang(String zhuYaoTuRang) 
	{
		this.zhuYaoTuRang = zhuYaoTuRang;
	}
	/**
	 * 返回 主要土壤
	 * @return
	 */
	public String getZhuYaoTuRang() 
	{
		return this.zhuYaoTuRang;
	}
	public void setZhiWuChongLei(Long zhiWuChongLei) 
	{
		this.zhiWuChongLei = zhiWuChongLei;
	}
	/**
	 * 返回 植物种类
	 * @return
	 */
	public Long getZhiWuChongLei() 
	{
		return this.zhiWuChongLei;
	}
	public void setTiaoZhaNianDuo(String tiaoZhaNianDuo) 
	{
		this.tiaoZhaNianDuo = tiaoZhaNianDuo;
	}
	/**
	 * 返回 二类调查年度
	 * @return
	 */
	public String getTiaoZhaNianDuo() 
	{
		return this.tiaoZhaNianDuo;
	}
	public void setLuRuNianDu(String luRuNianDu) 
	{
		this.luRuNianDu = luRuNianDu;
	}
	/**
	 * 返回 录入年度
	 * @return
	 */
	public String getLuRuNianDu() 
	{
		return this.luRuNianDu;
	}
	public void setKuSunShuai(Double kuSunShuai) 
	{
		this.kuSunShuai = kuSunShuai;
	}
	/**
	 * 返回 自然枯损率
	 * @return
	 */
	public Double getKuSunShuai() 
	{
		return this.kuSunShuai;
	}
	public void setShengChangLu(Double shengChangLu) 
	{
		this.shengChangLu = shengChangLu;
	}
	/**
	 * 返回 综合生长率
	 * @return
	 */
	public Double getShengChangLu() 
	{
		return this.shengChangLu;
	}
	public void setLinFenLeiXing(String linFenLeiXing) 
	{
		this.linFenLeiXing = linFenLeiXing;
	}
	/**
	 * 返回 林分类型
	 * @return
	 */
	public String getLinFenLeiXing() 
	{
		return this.linFenLeiXing;
	}
	public void setLingZu(String lingZu) 
	{
		this.lingZu = lingZu;
	}
	/**
	 * 返回 龄组
	 * @return
	 */
	public String getLingZu() 
	{
		return this.lingZu;
	}
	public void setShengZhangLu(String shengZhangLu) 
	{
		this.shengZhangLu = shengZhangLu;
	}
	/**
	 * 返回 生长率
	 * @return
	 */
	public String getShengZhangLu() 
	{
		return this.shengZhangLu;
	}
	public void setLinDe(String linDe) 
	{
		this.linDe = linDe;
	}
	/**
	 * 返回 林地
	 * @return
	 */
	public String getLinDe() 
	{
		return this.linDe;
	}
	public void setLinMu(String linMu) 
	{
		this.linMu = linMu;
	}
	/**
	 * 返回 林木
	 * @return
	 */
	public String getLinMu() 
	{
		return this.linMu;
	}
	public void setMianJi1(String mianJi1) 
	{
		this.mianJi1 = mianJi1;
	}
	/**
	 * 返回 面积1
	 * @return
	 */
	public String getMianJi1() 
	{
		return this.mianJi1;
	}
	public void setXuJi1(String xuJi1) 
	{
		this.xuJi1 = xuJi1;
	}
	/**
	 * 返回 蓄积1
	 * @return
	 */
	public String getXuJi1() 
	{
		return this.xuJi1;
	}
	public void setMianJi2(String mianJi2) 
	{
		this.mianJi2 = mianJi2;
	}
	/**
	 * 返回 面积2
	 * @return
	 */
	public String getMianJi2() 
	{
		return this.mianJi2;
	}
	public void setXuJi2(String xuJi2) 
	{
		this.xuJi2 = xuJi2;
	}
	/**
	 * 返回 蓄积2
	 * @return
	 */
	public String getXuJi2() 
	{
		return this.xuJi2;
	}
	public void setPingJun(String pingJun) 
	{
		this.pingJun = pingJun;
	}
	/**
	 * 返回 平均降水量
	 * @return
	 */
	public String getPingJun() 
	{
		return this.pingJun;
	}
	public void setWuShuangQi(String wuShuangQi) 
	{
		this.wuShuangQi = wuShuangQi;
	}
	/**
	 * 返回 无霜期
	 * @return
	 */
	public String getWuShuangQi() 
	{
		return this.wuShuangQi;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("mingChen", this.mingChen) 
		.append("mianJi", this.mianJi) 
		.append("jingDu", this.jingDu) 
		.append("weiDuo", this.weiDuo) 
		.append("shanXi", this.shanXi) 
		.append("shuiXi", this.shuiXi) 
		.append("pingYuan", this.pingYuan) 
		.append("haiBa", this.haiBa) 
		.append("qiWen", this.qiWen) 
		.append("nianJiWen", this.nianJiWen) 
		.append("riZhaoShiShuo", this.riZhaoShiShuo) 
		.append("zhuYaoTuRang", this.zhuYaoTuRang) 
		.append("zhiWuChongLei", this.zhiWuChongLei) 
		.append("tiaoZhaNianDuo", this.tiaoZhaNianDuo) 
		.append("luRuNianDu", this.luRuNianDu) 
		.append("kuSunShuai", this.kuSunShuai) 
		.append("shengChangLu", this.shengChangLu) 
		.append("linFenLeiXing", this.linFenLeiXing) 
		.append("lingZu", this.lingZu) 
		.append("shengZhangLu", this.shengZhangLu) 
		.append("linDe", this.linDe) 
		.append("linMu", this.linMu) 
		.append("mianJi1", this.mianJi1) 
		.append("xuJi1", this.xuJi1) 
		.append("mianJi2", this.mianJi2) 
		.append("xuJi2", this.xuJi2) 
		.append("pingJun", this.pingJun) 
		.append("wuShuangQi", this.wuShuangQi) 
		.toString();
	}
}
