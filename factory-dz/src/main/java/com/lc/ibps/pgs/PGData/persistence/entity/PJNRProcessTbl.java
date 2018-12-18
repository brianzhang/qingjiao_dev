package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_byyqpjnrygc 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 14:28:47
 *</pre>
 */
 @SuppressWarnings("serial")
public class PJNRProcessTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  weight; 		/*支撑权重*/
	protected String  inspection_way; 		/*考核方式*/
	protected String  document; 		/*最近一次评价结果文档*/
	protected String  biYeYaoQiu; 		/*毕业要求*/
	protected String  zhiBiaoDian; 		/*指标点*/
	protected String  jiaoXueHuoDong; 		/*相关教学活动*/

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
	public void setWeight(String weight) 
	{
		this.weight = weight;
	}
	/**
	 * 返回 支撑权重
	 * @return
	 */
	public String getWeight() 
	{
		return this.weight;
	}
	public void setInspection_way(String inspection_way) 
	{
		this.inspection_way = inspection_way;
	}
	/**
	 * 返回 考核方式
	 * @return
	 */
	public String getInspection_way() 
	{
		return this.inspection_way;
	}
	public void setDocument(String document) 
	{
		this.document = document;
	}
	/**
	 * 返回 最近一次评价结果文档
	 * @return
	 */
	public String getDocument() 
	{
		return this.document;
	}
	public void setBiYeYaoQiu(String biYeYaoQiu) 
	{
		this.biYeYaoQiu = biYeYaoQiu;
	}
	/**
	 * 返回 毕业要求
	 * @return
	 */
	public String getBiYeYaoQiu() 
	{
		return this.biYeYaoQiu;
	}
	public void setZhiBiaoDian(String zhiBiaoDian) 
	{
		this.zhiBiaoDian = zhiBiaoDian;
	}
	/**
	 * 返回 指标点
	 * @return
	 */
	public String getZhiBiaoDian() 
	{
		return this.zhiBiaoDian;
	}
	public void setJiaoXueHuoDong(String jiaoXueHuoDong) 
	{
		this.jiaoXueHuoDong = jiaoXueHuoDong;
	}
	/**
	 * 返回 相关教学活动
	 * @return
	 */
	public String getJiaoXueHuoDong() 
	{
		return this.jiaoXueHuoDong;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("weight", this.weight) 
		.append("inspection_way", this.inspection_way) 
		.append("document", this.document) 
		.append("biYeYaoQiu", this.biYeYaoQiu) 
		.append("zhiBiaoDian", this.zhiBiaoDian) 
		.append("jiaoXueHuoDong", this.jiaoXueHuoDong) 
		.toString();
	}
}
