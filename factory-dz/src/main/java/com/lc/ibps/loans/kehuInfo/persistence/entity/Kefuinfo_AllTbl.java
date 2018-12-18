package com.lc.ibps.loans.kehuInfo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_kefuinfo_all 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:06
 *</pre>
 */
 @SuppressWarnings("serial")
public class Kefuinfo_AllTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  khmc; 		/*客户名称*/
	protected String  zjlx; 		/*证件类型*/
	protected String  zjhm; 		/*证件号码*/

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
	public void setKhmc(String khmc) 
	{
		this.khmc = khmc;
	}
	/**
	 * 返回 客户名称
	 * @return
	 */
	public String getKhmc() 
	{
		return this.khmc;
	}
	public void setZjlx(String zjlx) 
	{
		this.zjlx = zjlx;
	}
	/**
	 * 返回 证件类型
	 * @return
	 */
	public String getZjlx() 
	{
		return this.zjlx;
	}
	public void setZjhm(String zjhm) 
	{
		this.zjhm = zjhm;
	}
	/**
	 * 返回 证件号码
	 * @return
	 */
	public String getZjhm() 
	{
		return this.zjhm;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("khmc", this.khmc) 
		.append("zjlx", this.zjlx) 
		.append("zjhm", this.zjhm) 
		.toString();
	}
}
