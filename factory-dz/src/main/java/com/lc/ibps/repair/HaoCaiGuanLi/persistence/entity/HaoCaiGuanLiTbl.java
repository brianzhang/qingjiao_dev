package com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_hcglb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:41:59
 *</pre>
 */
 @SuppressWarnings("serial")
public class HaoCaiGuanLiTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  haoCaiTuPian; 		/*耗材图片*/
	protected String  haoCaiBianHao; 		/*耗材编号*/
	protected String  haoCaiMingCheng; 		/*耗材名称*/
	protected String  danJia; 		/*单价*/
	protected String  chanWei; 		/*单位*/
	protected String  zhongLeiBianHao; 		/*种类编号*/
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
	public void setHaoCaiTuPian(String haoCaiTuPian) 
	{
		this.haoCaiTuPian = haoCaiTuPian;
	}
	/**
	 * 返回 耗材图片
	 * @return
	 */
	public String getHaoCaiTuPian() 
	{
		return this.haoCaiTuPian;
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
	public void setDanJia(String danJia) 
	{
		this.danJia = danJia;
	}
	/**
	 * 返回 单价
	 * @return
	 */
	public String getDanJia() 
	{
		return this.danJia;
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
		.append("haoCaiTuPian", this.haoCaiTuPian) 
		.append("haoCaiBianHao", this.haoCaiBianHao) 
		.append("haoCaiMingCheng", this.haoCaiMingCheng) 
		.append("danJia", this.danJia) 
		.append("chanWei", this.chanWei) 
		.append("zhongLeiBianHao", this.zhongLeiBianHao) 
		.append("createTime", this.createTime) 
		.toString();
	}
}
