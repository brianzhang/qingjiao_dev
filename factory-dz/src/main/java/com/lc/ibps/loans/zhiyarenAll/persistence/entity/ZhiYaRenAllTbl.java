package com.lc.ibps.loans.zhiyarenAll.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zyr_all 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:34
 *</pre>
 */
 @SuppressWarnings("serial")
public class ZhiYaRenAllTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  dblb; 		/*担保类别*/
	protected String  mc; 		/*名称*/
	protected String  zjlx; 		/*证件类型*/
	protected String  zjhm; 		/*证件号码*/
	protected String  jdid; 		/*借贷id*/

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
	public void setDblb(String dblb) 
	{
		this.dblb = dblb;
	}
	/**
	 * 返回 担保类别
	 * @return
	 */
	public String getDblb() 
	{
		return this.dblb;
	}
	public void setMc(String mc) 
	{
		this.mc = mc;
	}
	/**
	 * 返回 名称
	 * @return
	 */
	public String getMc() 
	{
		return this.mc;
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
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷id
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("dblb", this.dblb) 
		.append("mc", this.mc) 
		.append("zjlx", this.zjlx) 
		.append("zjhm", this.zjhm) 
		.append("jdid", this.jdid) 
		.toString();
	}
}
