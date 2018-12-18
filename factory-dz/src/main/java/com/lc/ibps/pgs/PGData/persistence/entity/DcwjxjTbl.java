package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_dcwjxj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
 @SuppressWarnings("serial")
public class DcwjxjTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  shiJian; 		/*事件*/
	protected String  renYun; 		/*人员*/
	protected String  wenJuanMing; 		/*问卷名*/
	protected String  finaltdId;    /*团队ID*/
	protected String  xh;
	public String getFinalteacher() {
		return finalteacher;
	}
	public void setFinalteacher(String finalteacher) {
		this.finalteacher = finalteacher;
	}
	protected String  finalteacher;
	public String getXh() {
		return xh;
	}
	public void setXh(String xh) {
		this.xh = xh;
	}
	public String getFinaltdId() {
		return finaltdId;
	}
	public void setFinaltdId(String finaltdId) {
		this.finaltdId = finaltdId;
	}
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
	public void setShiJian(String shiJian) 
	{
		this.shiJian = shiJian;
	}
	/**
	 * 返回 事件
	 * @return
	 */
	public String getShiJian() 
	{
		return this.shiJian;
	}
	public void setRenYun(String renYun) 
	{
		this.renYun = renYun;
	}
	/**
	 * 返回 人员
	 * @return
	 */
	public String getRenYun() 
	{
		return this.renYun;
	}
	public void setWenJuanMing(String wenJuanMing) 
	{
		this.wenJuanMing = wenJuanMing;
	}
	/**
	 * 返回 问卷名
	 * @return
	 */
	public String getWenJuanMing() 
	{
		return this.wenJuanMing;
	}
	/**
	 * @see Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("shiJian", this.shiJian) 
		.append("renYun", this.renYun) 
		.append("wenJuanMing", this.wenJuanMing) 
		.toString();
	}
}
