package com.lc.ibps.pgs.XiuDing.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_pymbxd 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:22:09
 *</pre>
 */
 @SuppressWarnings("serial")
public class AimXiuDingTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  fangAnID; 		/*方案ID*/
	protected String  mingCheng; 		/*方案名称*/
	protected String  siXiang; 		/*修订知道思想*/
	protected String  xiuDingRiQi; 		/*修订日期*/
	protected String  zhiHangRen; 		/*修订执行人*/
	protected String  liuCheng; 		/*修订流程*/
	protected String  xiuDing; 		/*最近一次修订*/

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
	public void setMingCheng(String mingCheng) 
	{
		this.mingCheng = mingCheng;
	}
	/**
	 * 返回 方案名称
	 * @return
	 */
	public String getMingCheng() 
	{
		return this.mingCheng;
	}
	public void setSiXiang(String siXiang) 
	{
		this.siXiang = siXiang;
	}
	/**
	 * 返回 修订知道思想
	 * @return
	 */
	public String getSiXiang() 
	{
		return this.siXiang;
	}
	public void setXiuDingRiQi(String xiuDingRiQi) 
	{
		this.xiuDingRiQi = xiuDingRiQi;
	}
	/**
	 * 返回 修订日期
	 * @return
	 */
	public String getXiuDingRiQi() 
	{
		return this.xiuDingRiQi;
	}
	public void setZhiHangRen(String zhiHangRen) 
	{
		this.zhiHangRen = zhiHangRen;
	}
	/**
	 * 返回 修订执行人
	 * @return
	 */
	public String getZhiHangRen() 
	{
		return this.zhiHangRen;
	}
	public void setLiuCheng(String liuCheng) 
	{
		this.liuCheng = liuCheng;
	}
	/**
	 * 返回 修订流程
	 * @return
	 */
	public String getLiuCheng() 
	{
		return this.liuCheng;
	}
	public void setXiuDing(String xiuDing) 
	{
		this.xiuDing = xiuDing;
	}
	/**
	 * 返回 最近一次修订
	 * @return
	 */
	public String getXiuDing() 
	{
		return this.xiuDing;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("fangAnID", this.fangAnID) 
		.append("mingCheng", this.mingCheng) 
		.append("siXiang", this.siXiang) 
		.append("xiuDingRiQi", this.xiuDingRiQi) 
		.append("zhiHangRen", this.zhiHangRen) 
		.append("liuCheng", this.liuCheng) 
		.append("xiuDing", this.xiuDing) 
		.toString();
	}
}
