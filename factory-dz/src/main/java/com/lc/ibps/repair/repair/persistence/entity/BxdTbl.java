package com.lc.ibps.repair.repair.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_bxd 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:04
 *</pre>
 */
 @SuppressWarnings("serial")
public class BxdTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  bxqy; 		/*报修区域*/
	protected String  xxdz; 		/*详细地址*/
	protected String  bxxm; 		/*报修项目*/
	protected String  bxxx; 		/*报修详细*/
	protected String  yysj; 		/*预约时间*/
	protected String  bxr; 		/*报修人*/
	protected String  lxfs; 		/*联系方式*/
	protected String  sctp; 		/*上传图片*/
	protected String  gdlx; 		/*工单类型*/
	protected String  gdzt; 		/*工单状态*/
	protected String  slr; 		/*受理人*/
	protected String  zxr; 		/*执行人*/
	protected String  wxg; 		/*维修工*/
	protected String  mbid; 		/*模板ID*/
	
	
	
	protected String bxqy2;
	protected String bxqy3;
	
	protected String bz;
	protected String subid;
	protected String subbh;
	
	
	protected String isZd;
	
	protected String bxxm2;
	
	protected String yysj2;
	
	
	protected String bxxm3;
	
	protected String building;
	
	
	
	

	public String getBuilding() {
		return building;
	}
	public void setBuilding(String building) {
		this.building = building;
	}
	public String getBxxm3() {
		return bxxm3;
	}
	public void setBxxm3(String bxxm3) {
		this.bxxm3 = bxxm3;
	}
	public String getYysj2() {
		return yysj2;
	}
	public void setYysj2(String yysj2) {
		this.yysj2 = yysj2;
	}
	public String getBxxm2() {
		return bxxm2;
	}
	public void setBxxm2(String bxxm2) {
		this.bxxm2 = bxxm2;
	}
	public String getIsZd() {
		return isZd;
	}
	public void setIsZd(String isZd) {
		this.isZd = isZd;
	}
	public String getSubbh() {
		return subbh;
	}
	public void setSubbh(String subbh) {
		this.subbh = subbh;
	}
	public String getSubid() {
		return subid;
	}
	public void setSubid(String subid) {
		this.subid = subid;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
	public String getBxqy2() {
		return bxqy2;
	}
	public void setBxqy2(String bxqy2) {
		this.bxqy2 = bxqy2;
	}
	public String getBxqy3() {
		return bxqy3;
	}
	public void setBxqy3(String bxqy3) {
		this.bxqy3 = bxqy3;
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
	public void setBxqy(String bxqy) 
	{
		this.bxqy = bxqy;
	}
	/**
	 * 返回 报修区域
	 * @return
	 */
	public String getBxqy() 
	{
		return this.bxqy;
	}
	public void setXxdz(String xxdz) 
	{
		this.xxdz = xxdz;
	}
	/**
	 * 返回 详细地址
	 * @return
	 */
	public String getXxdz() 
	{
		return this.xxdz;
	}
	public void setBxxm(String bxxm) 
	{
		this.bxxm = bxxm;
	}
	/**
	 * 返回 报修项目
	 * @return
	 */
	public String getBxxm() 
	{
		return this.bxxm;
	}
	public void setBxxx(String bxxx) 
	{
		this.bxxx = bxxx;
	}
	/**
	 * 返回 报修详细
	 * @return
	 */
	public String getBxxx() 
	{
		return this.bxxx;
	}
	public void setYysj(String yysj) 
	{
		this.yysj = yysj;
	}
	/**
	 * 返回 预约时间
	 * @return
	 */
	public String getYysj() 
	{
		return this.yysj;
	}
	public void setBxr(String bxr) 
	{
		this.bxr = bxr;
	}
	/**
	 * 返回 报修人
	 * @return
	 */
	public String getBxr() 
	{
		return this.bxr;
	}
	public void setLxfs(String lxfs) 
	{
		this.lxfs = lxfs;
	}
	/**
	 * 返回 联系方式
	 * @return
	 */
	public String getLxfs() 
	{
		return this.lxfs;
	}
	public void setSctp(String sctp) 
	{
		this.sctp = sctp;
	}
	/**
	 * 返回 上传图片
	 * @return
	 */
	public String getSctp() 
	{
		return this.sctp;
	}
	public void setGdlx(String gdlx) 
	{
		this.gdlx = gdlx;
	}
	/**
	 * 返回 工单类型
	 * @return
	 */
	public String getGdlx() 
	{
		return this.gdlx;
	}
	public void setGdzt(String gdzt) 
	{
		this.gdzt = gdzt;
	}
	/**
	 * 返回 工单状态
	 * @return
	 */
	public String getGdzt() 
	{
		return this.gdzt;
	}
	public void setSlr(String slr) 
	{
		this.slr = slr;
	}
	/**
	 * 返回 受理人
	 * @return
	 */
	public String getSlr() 
	{
		return this.slr;
	}
	public void setZxr(String zxr) 
	{
		this.zxr = zxr;
	}
	/**
	 * 返回 执行人
	 * @return
	 */
	public String getZxr() 
	{
		return this.zxr;
	}
	public void setWxg(String wxg) 
	{
		this.wxg = wxg;
	}
	/**
	 * 返回 维修工
	 * @return
	 */
	public String getWxg() 
	{
		return this.wxg;
	}
	public void setMbid(String mbid) 
	{
		this.mbid = mbid;
	}
	/**
	 * 返回 模板ID
	 * @return
	 */
	public String getMbid() 
	{
		return this.mbid;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("bxqy", this.bxqy) 
		.append("xxdz", this.xxdz) 
		.append("bxxm", this.bxxm) 
		.append("bxxx", this.bxxx) 
		.append("yysj", this.yysj) 
		.append("bxr", this.bxr) 
		.append("lxfs", this.lxfs) 
		.append("sctp", this.sctp) 
		.append("gdlx", this.gdlx) 
		.append("gdzt", this.gdzt) 
		.append("slr", this.slr) 
		.append("zxr", this.zxr) 
		.append("wxg", this.wxg) 
		.append("mbid", this.mbid)
		.append("bxqy2", this.bxqy2)
		.append("bxqy3", this.bxqy3)
		.append("bz", this.bz)
		.append("subid", this.subid)
		.append("subbh", this.subbh)
		.append("isZd", this.isZd)
		.append("bxxm2", this.bxxm2)
		.append("yysj2", this.yysj2)
		.append("bxxm3", this.bxxm3)
		.append("building", this.building)
		.toString();
	}
}
