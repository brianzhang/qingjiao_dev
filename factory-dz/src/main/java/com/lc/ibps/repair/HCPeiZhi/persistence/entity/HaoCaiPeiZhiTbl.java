package com.lc.ibps.repair.HCPeiZhi.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_hcpz 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:38:58
 *</pre>
 */
 @SuppressWarnings("serial")
public class HaoCaiPeiZhiTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  zhongLeiBianHao; 		/*种类编号*/
	protected String  haoCaiMingCheng; 		/*耗材名称*/
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
		.append("zhongLeiBianHao", this.zhongLeiBianHao) 
		.append("haoCaiMingCheng", this.haoCaiMingCheng) 
		.append("createTime", this.createTime) 
		.toString();
	}
}
