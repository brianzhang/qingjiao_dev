package com.lc.ibps.bishes.kaitiGroup.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_ktxz 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
 @SuppressWarnings("serial")
public class KaitiGroupTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  tdid; 		/*团队ID*/
	protected Date  daBianShiJian; 		/*答辩时间*/
	protected String  daBianDeDian; 		/*答辩地点*/
	protected String  daBianXiaoZu; 		/*答辩小组*/
	protected String  dbfzr; 		/*答辩小组负责人*/
	protected String  dbgroupId; 		/*答辩小组id*/
	protected String  dbfzrId; 		/*答辩小组负责人id*/
	protected String  ktsj; 		/*开题时间*/

	public String getKtsj() {
		return ktsj;
	}
	public void setKtsj(String ktsj) {
		this.ktsj = ktsj;
	}
	public String getDbgroupId() {
		return dbgroupId;
	}
	public void setDbgroupId(String dbgroupId) {
		this.dbgroupId = dbgroupId;
	}
	public String getDbfzrId() {
		return dbfzrId;
	}
	public void setDbfzrId(String dbfzrId) {
		this.dbfzrId = dbfzrId;
	}
	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	@Override
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	@Override
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	@Override
	public void setUpdateBy(String updateBy) 
	{
		this.updateBy = updateBy;
	}
	/**
	 * 返回 更新人
	 * @return
	 */
	@Override
	public String getUpdateBy() 
	{
		return this.updateBy;
	}
	@Override
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	@Override
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	public void setTdid(String tdid) 
	{
		this.tdid = tdid;
	}
	/**
	 * 返回 团队ID
	 * @return
	 */
	public String getTdid() 
	{
		return this.tdid;
	}
	public void setDaBianShiJian(Date daBianShiJian) 
	{
		this.daBianShiJian = daBianShiJian;
	}
	/**
	 * 返回 答辩时间
	 * @return
	 */
	public Date getDaBianShiJian() 
	{
		return this.daBianShiJian;
	}
	public void setDaBianDeDian(String daBianDeDian) 
	{
		this.daBianDeDian = daBianDeDian;
	}
	/**
	 * 返回 答辩地点
	 * @return
	 */
	public String getDaBianDeDian() 
	{
		return this.daBianDeDian;
	}
	public void setDaBianXiaoZu(String daBianXiaoZu) 
	{
		this.daBianXiaoZu = daBianXiaoZu;
	}
	/**
	 * 返回 答辩小组
	 * @return
	 */
	public String getDaBianXiaoZu() 
	{
		return this.daBianXiaoZu;
	}
	public void setDbfzr(String dbfzr) 
	{
		this.dbfzr = dbfzr;
	}
	/**
	 * 返回 答辩小组负责人
	 * @return
	 */
	public String getDbfzr() 
	{
		return this.dbfzr;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("updateBy", this.updateBy) 
		.append("updateTime", this.updateTime) 
		.append("tdid", this.tdid) 
		.append("daBianShiJian", this.daBianShiJian) 
		.append("daBianDeDian", this.daBianDeDian) 
		.append("daBianXiaoZu", this.daBianXiaoZu) 
		.append("dbfzr", this.dbfzr) 
		.toString();
	}
}
