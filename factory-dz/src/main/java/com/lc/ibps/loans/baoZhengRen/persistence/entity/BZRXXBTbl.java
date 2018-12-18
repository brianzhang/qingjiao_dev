package com.lc.ibps.loans.baoZhengRen.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_bzrxxb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:17
 *</pre>
 */
 @SuppressWarnings("serial")
public class BZRXXBTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  bzlx; 		/*保证类型*/
	protected String  bzrmc; 		/*保证人名称*/
	protected String  bzrzjlx; 		/*保证人证件类型*/
	protected String  zjhm; 		/*证件号码*/
	protected String  lxdh; 		/*联系电话*/
	protected String  sfbxgsbx; 		/*是否保险公司保险*/
	protected String  bzfs; 		/*保证方式*/
	protected Double  bzje; 		/*保证金额*/
	protected Double  bzbl; 		/*保证比例*/
	protected String  yjkrgx; 		/*与借款人关系*/
	protected String  bzrpomc; 		/*保证人配偶名称*/
	protected String  bzrpozjlx; 		/*保证人配偶证件类型*/
	protected String  bzrpozjhm; 		/*保证人配偶证件号码*/
	protected String  sjjzdz; 		/*实际居住地址*/
	protected String  bz; 		/*备注*/
	protected String  lxrxm; 		/*联系人姓名*/
	protected String  lxryjkrgx; 		/*联系人与借款人关系*/
	protected String  lxrlxdh; 		/*联系人联系电话*/
	protected String  jdid; 		/*借贷Id*/

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
	public void setBzlx(String bzlx) 
	{
		this.bzlx = bzlx;
	}
	/**
	 * 返回 保证类型
	 * @return
	 */
	public String getBzlx() 
	{
		return this.bzlx;
	}
	public void setBzrmc(String bzrmc) 
	{
		this.bzrmc = bzrmc;
	}
	/**
	 * 返回 保证人名称
	 * @return
	 */
	public String getBzrmc() 
	{
		return this.bzrmc;
	}
	public void setBzrzjlx(String bzrzjlx) 
	{
		this.bzrzjlx = bzrzjlx;
	}
	/**
	 * 返回 保证人证件类型
	 * @return
	 */
	public String getBzrzjlx() 
	{
		return this.bzrzjlx;
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
	public void setLxdh(String lxdh) 
	{
		this.lxdh = lxdh;
	}
	/**
	 * 返回 联系电话
	 * @return
	 */
	public String getLxdh() 
	{
		return this.lxdh;
	}
	public void setSfbxgsbx(String sfbxgsbx) 
	{
		this.sfbxgsbx = sfbxgsbx;
	}
	/**
	 * 返回 是否保险公司保险
	 * @return
	 */
	public String getSfbxgsbx() 
	{
		return this.sfbxgsbx;
	}
	public void setBzfs(String bzfs) 
	{
		this.bzfs = bzfs;
	}
	/**
	 * 返回 保证方式
	 * @return
	 */
	public String getBzfs() 
	{
		return this.bzfs;
	}
	public void setBzje(Double bzje) 
	{
		this.bzje = bzje;
	}
	/**
	 * 返回 保证金额
	 * @return
	 */
	public Double getBzje() 
	{
		return this.bzje;
	}
	public void setBzbl(Double bzbl) 
	{
		this.bzbl = bzbl;
	}
	/**
	 * 返回 保证比例
	 * @return
	 */
	public Double getBzbl() 
	{
		return this.bzbl;
	}
	public void setYjkrgx(String yjkrgx) 
	{
		this.yjkrgx = yjkrgx;
	}
	/**
	 * 返回 与借款人关系
	 * @return
	 */
	public String getYjkrgx() 
	{
		return this.yjkrgx;
	}
	public void setBzrpomc(String bzrpomc) 
	{
		this.bzrpomc = bzrpomc;
	}
	/**
	 * 返回 保证人配偶名称
	 * @return
	 */
	public String getBzrpomc() 
	{
		return this.bzrpomc;
	}
	public void setBzrpozjlx(String bzrpozjlx) 
	{
		this.bzrpozjlx = bzrpozjlx;
	}
	/**
	 * 返回 保证人配偶证件类型
	 * @return
	 */
	public String getBzrpozjlx() 
	{
		return this.bzrpozjlx;
	}
	public void setBzrpozjhm(String bzrpozjhm) 
	{
		this.bzrpozjhm = bzrpozjhm;
	}
	/**
	 * 返回 保证人配偶证件号码
	 * @return
	 */
	public String getBzrpozjhm() 
	{
		return this.bzrpozjhm;
	}
	public void setSjjzdz(String sjjzdz) 
	{
		this.sjjzdz = sjjzdz;
	}
	/**
	 * 返回 实际居住地址
	 * @return
	 */
	public String getSjjzdz() 
	{
		return this.sjjzdz;
	}
	public void setBz(String bz) 
	{
		this.bz = bz;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBz() 
	{
		return this.bz;
	}
	public void setLxrxm(String lxrxm) 
	{
		this.lxrxm = lxrxm;
	}
	/**
	 * 返回 联系人姓名
	 * @return
	 */
	public String getLxrxm() 
	{
		return this.lxrxm;
	}
	public void setLxryjkrgx(String lxryjkrgx) 
	{
		this.lxryjkrgx = lxryjkrgx;
	}
	/**
	 * 返回 联系人与借款人关系
	 * @return
	 */
	public String getLxryjkrgx() 
	{
		return this.lxryjkrgx;
	}
	public void setLxrlxdh(String lxrlxdh) 
	{
		this.lxrlxdh = lxrlxdh;
	}
	/**
	 * 返回 联系人联系电话
	 * @return
	 */
	public String getLxrlxdh() 
	{
		return this.lxrlxdh;
	}
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷Id
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
		.append("bzlx", this.bzlx) 
		.append("bzrmc", this.bzrmc) 
		.append("bzrzjlx", this.bzrzjlx) 
		.append("zjhm", this.zjhm) 
		.append("lxdh", this.lxdh) 
		.append("sfbxgsbx", this.sfbxgsbx) 
		.append("bzfs", this.bzfs) 
		.append("bzje", this.bzje) 
		.append("bzbl", this.bzbl) 
		.append("yjkrgx", this.yjkrgx) 
		.append("bzrpomc", this.bzrpomc) 
		.append("bzrpozjlx", this.bzrpozjlx) 
		.append("bzrpozjhm", this.bzrpozjhm) 
		.append("sjjzdz", this.sjjzdz) 
		.append("bz", this.bz) 
		.append("lxrxm", this.lxrxm) 
		.append("lxryjkrgx", this.lxryjkrgx) 
		.append("lxrlxdh", this.lxrlxdh) 
		.append("jdid", this.jdid) 
		.toString();
	}
}
