package com.lc.ibps.lyzygls.Xiuzheng.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 森林资源变化统计表（去年实有和修正值） 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 13:55:35
 *</pre>
 */
 @SuppressWarnings("serial")
public class XiuzhengTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  linDi; 		/*林地*/
	protected String  linMu; 		/*林木*/
	protected Long  quNianMianJi; 		/*去年面积*/
	protected Long  quNianXuJi; 		/*去年蓄积*/
	protected Long  xiuZhengMianJi; 		/*修正面积*/
	protected Long  xiuZhengXuJi; 		/*修正蓄积*/

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
	public void setLinDi(String linDi) 
	{
		this.linDi = linDi;
	}
	/**
	 * 返回 林地
	 * @return
	 */
	public String getLinDi() 
	{
		return this.linDi;
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
	public void setQuNianMianJi(Long quNianMianJi) 
	{
		this.quNianMianJi = quNianMianJi;
	}
	/**
	 * 返回 去年面积
	 * @return
	 */
	public Long getQuNianMianJi() 
	{
		return this.quNianMianJi;
	}
	public void setQuNianXuJi(Long quNianXuJi) 
	{
		this.quNianXuJi = quNianXuJi;
	}
	/**
	 * 返回 去年蓄积
	 * @return
	 */
	public Long getQuNianXuJi() 
	{
		return this.quNianXuJi;
	}
	public void setXiuZhengMianJi(Long xiuZhengMianJi) 
	{
		this.xiuZhengMianJi = xiuZhengMianJi;
	}
	/**
	 * 返回 修正面积
	 * @return
	 */
	public Long getXiuZhengMianJi() 
	{
		return this.xiuZhengMianJi;
	}
	public void setXiuZhengXuJi(Long xiuZhengXuJi) 
	{
		this.xiuZhengXuJi = xiuZhengXuJi;
	}
	/**
	 * 返回 修正蓄积
	 * @return
	 */
	public Long getXiuZhengXuJi() 
	{
		return this.xiuZhengXuJi;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("linDi", this.linDi) 
		.append("linMu", this.linMu) 
		.append("quNianMianJi", this.quNianMianJi) 
		.append("quNianXuJi", this.quNianXuJi) 
		.append("xiuZhengMianJi", this.xiuZhengMianJi) 
		.append("xiuZhengXuJi", this.xiuZhengXuJi) 
		.toString();
	}
}
