package com.lc.ibps.pgs.Location.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_pydwb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
 @SuppressWarnings("serial")
public class DingWeiTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  banXueDingWei; 		/*办学定位*/
	protected String  zhuanYeDingWei; 		/*专业定位*/
	protected String  xueKeZhiCheng; 		/*学科支撑*/
	protected String  sheHuiXuQiu; 		/*社会需求*/
	protected String  fangAnID; 		/*方案ID*/
	protected String  fangMingCheng; 		/*方案名称*/

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
	public void setBanXueDingWei(String banXueDingWei) 
	{
		this.banXueDingWei = banXueDingWei;
	}
	/**
	 * 返回 办学定位
	 * @return
	 */
	public String getBanXueDingWei() 
	{
		return this.banXueDingWei;
	}
	public void setZhuanYeDingWei(String zhuanYeDingWei) 
	{
		this.zhuanYeDingWei = zhuanYeDingWei;
	}
	/**
	 * 返回 专业定位
	 * @return
	 */
	public String getZhuanYeDingWei() 
	{
		return this.zhuanYeDingWei;
	}
	public void setXueKeZhiCheng(String xueKeZhiCheng) 
	{
		this.xueKeZhiCheng = xueKeZhiCheng;
	}
	/**
	 * 返回 学科支撑
	 * @return
	 */
	public String getXueKeZhiCheng() 
	{
		return this.xueKeZhiCheng;
	}
	public void setSheHuiXuQiu(String sheHuiXuQiu) 
	{
		this.sheHuiXuQiu = sheHuiXuQiu;
	}
	/**
	 * 返回 社会需求
	 * @return
	 */
	public String getSheHuiXuQiu() 
	{
		return this.sheHuiXuQiu;
	}
	public void setFangAnID(String fangAnID) 
	{
		this.fangAnID = fangAnID;
	}
	/**
	 * 返回 方案ID
	 * @return
	 */
	public String getFangAnID() 
	{
		return this.fangAnID;
	}
	public void setFangMingCheng(String fangMingCheng) 
	{
		this.fangMingCheng = fangMingCheng;
	}
	/**
	 * 返回 方案名称
	 * @return
	 */
	public String getFangMingCheng() 
	{
		return this.fangMingCheng;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("banXueDingWei", this.banXueDingWei) 
		.append("zhuanYeDingWei", this.zhuanYeDingWei) 
		.append("xueKeZhiCheng", this.xueKeZhiCheng) 
		.append("sheHuiXuQiu", this.sheHuiXuQiu) 
		.append("fangAnID", this.fangAnID) 
		.append("fangMingCheng", this.fangMingCheng) 
		.toString();
	}
}
