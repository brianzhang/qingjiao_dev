package com.lc.ibps.loans.mulu.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_mlsl 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class MuLuTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  cllb; 		/*材料类别*/
	protected String  clmc; 		/*材料名称*/
	protected String  qy; 		/*企业*/
	protected String  esf; 		/*二手房*/
	protected String  grscjy; 		/*个人生产经营*/
	protected String  syyf; 		/*商业用房*/

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
	public void setCllb(String cllb) 
	{
		this.cllb = cllb;
	}
	/**
	 * 返回 材料类别
	 * @return
	 */
	public String getCllb() 
	{
		return this.cllb;
	}
	public void setClmc(String clmc) 
	{
		this.clmc = clmc;
	}
	/**
	 * 返回 材料名称
	 * @return
	 */
	public String getClmc() 
	{
		return this.clmc;
	}
	public void setQy(String qy) 
	{
		this.qy = qy;
	}
	/**
	 * 返回 企业
	 * @return
	 */
	public String getQy() 
	{
		return this.qy;
	}
	public void setEsf(String esf) 
	{
		this.esf = esf;
	}
	/**
	 * 返回 二手房
	 * @return
	 */
	public String getEsf() 
	{
		return this.esf;
	}
	public void setGrscjy(String grscjy) 
	{
		this.grscjy = grscjy;
	}
	/**
	 * 返回 个人生产经营
	 * @return
	 */
	public String getGrscjy() 
	{
		return this.grscjy;
	}
	public void setSyyf(String syyf) 
	{
		this.syyf = syyf;
	}
	/**
	 * 返回 商业用房
	 * @return
	 */
	public String getSyyf() 
	{
		return this.syyf;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("cllb", this.cllb) 
		.append("clmc", this.clmc) 
		.append("qy", this.qy) 
		.append("esf", this.esf) 
		.append("grscjy", this.grscjy) 
		.append("syyf", this.syyf) 
		.toString();
	}
}
