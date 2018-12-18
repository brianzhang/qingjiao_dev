package com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_wxghcsyb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:39:21
 *</pre>
 */
 @SuppressWarnings("serial")
public class HaoCaiShiYongTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  haoCaiBianHao; 		/*耗材编号*/
	protected String  haoCaiMingCheng; 		/*耗材名称*/
	protected String  zhongLeiBianHao; 		/*种类编号*/
	protected Long  shuoLiang; 		/*数量*/
	protected String  chanWei; 		/*单位*/
	protected Double  haoCaiZongJia; 		/*耗材总价*/
	protected String  gongChong; 		/*维修工工种*/
	protected String  buMen; 		/*维修工部门*/
	protected String  weiXiuGong; 		/*维修工*/
	protected Date  createTime; 		/*创建时间*/

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
	public void setHaoCaiBianHao(String haoCaiBianHao) 
	{
		this.haoCaiBianHao = haoCaiBianHao;
	}
	/**
	 * 返回 耗材编号
	 * @return
	 */
	public String getHaoCaiBianHao() 
	{
		return this.haoCaiBianHao;
	}
	public void setHaoCaiMingCheng(String haoCaiMingCheng) 
	{
		this.haoCaiMingCheng = haoCaiMingCheng;
	}
	/**
	 * 返回 耗材名称
	 * @return
	 */
	public String getHaoCaiMingCheng() 
	{
		return this.haoCaiMingCheng;
	}
	public void setZhongLeiBianHao(String zhongLeiBianHao) 
	{
		this.zhongLeiBianHao = zhongLeiBianHao;
	}
	/**
	 * 返回 种类编号
	 * @return
	 */
	public String getZhongLeiBianHao() 
	{
		return this.zhongLeiBianHao;
	}
	public void setShuoLiang(Long shuoLiang) 
	{
		this.shuoLiang = shuoLiang;
	}
	/**
	 * 返回 数量
	 * @return
	 */
	public Long getShuoLiang() 
	{
		return this.shuoLiang;
	}
	public void setChanWei(String chanWei) 
	{
		this.chanWei = chanWei;
	}
	/**
	 * 返回 单位
	 * @return
	 */
	public String getChanWei() 
	{
		return this.chanWei;
	}
	public void setHaoCaiZongJia(Double haoCaiZongJia) 
	{
		this.haoCaiZongJia = haoCaiZongJia;
	}
	/**
	 * 返回 耗材总价
	 * @return
	 */
	public Double getHaoCaiZongJia() 
	{
		return this.haoCaiZongJia;
	}
	public void setGongChong(String gongChong) 
	{
		this.gongChong = gongChong;
	}
	/**
	 * 返回 维修工工种
	 * @return
	 */
	public String getGongChong() 
	{
		return this.gongChong;
	}
	public void setBuMen(String buMen) 
	{
		this.buMen = buMen;
	}
	/**
	 * 返回 维修工部门
	 * @return
	 */
	public String getBuMen() 
	{
		return this.buMen;
	}
	public void setWeiXiuGong(String weiXiuGong) 
	{
		this.weiXiuGong = weiXiuGong;
	}
	/**
	 * 返回 维修工
	 * @return
	 */
	public String getWeiXiuGong() 
	{
		return this.weiXiuGong;
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
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("haoCaiBianHao", this.haoCaiBianHao) 
		.append("haoCaiMingCheng", this.haoCaiMingCheng) 
		.append("zhongLeiBianHao", this.zhongLeiBianHao) 
		.append("shuoLiang", this.shuoLiang) 
		.append("chanWei", this.chanWei) 
		.append("haoCaiZongJia", this.haoCaiZongJia) 
		.append("gongChong", this.gongChong) 
		.append("buMen", this.buMen) 
		.append("weiXiuGong", this.weiXiuGong) 
		.append("createTime", this.createTime) 
		.toString();
	}
}
