package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.Date;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_cgxq 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
 @SuppressWarnings("serial")
public class Cgxq1Tbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  ip; 		/*IP地址*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  purProName; 		/*项目名称*/
	protected String  purPlanCode; 		/*采购计划编号*/
	protected Date  purRegDate; 		/*登记日期*/
	protected String  purApplyDept; 		/*申报部门*/
	protected String  purOperaDept; 		/*采购执行部门*/
	protected Double  purAmount; 		/*采购金额*/
	protected String  purBuIndex; 		/*采购预算指标*/
	protected String  purProType; 		/*项目类型*/
	protected String  purProBudYear; 		/*项目所属预算年度*/
	protected String  purZgRequire; 		/*投标人资格要求*/
	protected String  purRemark; 		/*备注*/
	protected String  createBy; 		/*操作人*/
	protected Date  createTime; 		/*操作时间*/

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
	public void setIp(String ip) 
	{
		this.ip = ip;
	}
	/**
	 * 返回 IP地址
	 * @return
	 */
	public String getIp() 
	{
		return this.ip;
	}
	public void setUpdateBy(String updateBy) 
	{
		this.updateBy = updateBy;
	}
	/**
	 * 返回 更新人
	 * @return
	 */
	public String getUpdateBy() 
	{
		return this.updateBy;
	}
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
	}
	/**
	 * 返回 更新时间
	 * @return
	 */
	public Date getUpdateTime() 
	{
		return this.updateTime;
	}
	public void setPurProName(String purProName) 
	{
		this.purProName = purProName;
	}
	/**
	 * 返回 项目名称
	 * @return
	 */
	public String getPurProName() 
	{
		return this.purProName;
	}
	public void setPurPlanCode(String purPlanCode) 
	{
		this.purPlanCode = purPlanCode;
	}
	/**
	 * 返回 采购计划编号
	 * @return
	 */
	public String getPurPlanCode() 
	{
		return this.purPlanCode;
	}
	public void setPurRegDate(Date purRegDate) 
	{
		this.purRegDate = purRegDate;
	}
	/**
	 * 返回 登记日期
	 * @return
	 */
	public Date getPurRegDate() 
	{
		return this.purRegDate;
	}
	public void setPurApplyDept(String purApplyDept) 
	{
		this.purApplyDept = purApplyDept;
	}
	/**
	 * 返回 申报部门
	 * @return
	 */
	public String getPurApplyDept() 
	{
		return this.purApplyDept;
	}
	public void setPurOperaDept(String purOperaDept) 
	{
		this.purOperaDept = purOperaDept;
	}
	/**
	 * 返回 采购执行部门
	 * @return
	 */
	public String getPurOperaDept() 
	{
		return this.purOperaDept;
	}
	public void setPurAmount(Double purAmount) 
	{
		this.purAmount = purAmount;
	}
	/**
	 * 返回 采购金额
	 * @return
	 */
	public Double getPurAmount() 
	{
		return this.purAmount;
	}
	public void setPurBuIndex(String purBuIndex) 
	{
		this.purBuIndex = purBuIndex;
	}
	/**
	 * 返回 采购预算指标
	 * @return
	 */
	public String getPurBuIndex() 
	{
		return this.purBuIndex;
	}
	public void setPurProType(String purProType) 
	{
		this.purProType = purProType;
	}
	/**
	 * 返回 项目类型
	 * @return
	 */
	public String getPurProType() 
	{
		return this.purProType;
	}
	public void setPurProBudYear(String purProBudYear) 
	{
		this.purProBudYear = purProBudYear;
	}
	/**
	 * 返回 项目所属预算年度
	 * @return
	 */
	public String getPurProBudYear() 
	{
		return this.purProBudYear;
	}
	public void setPurZgRequire(String purZgRequire) 
	{
		this.purZgRequire = purZgRequire;
	}
	/**
	 * 返回 投标人资格要求
	 * @return
	 */
	public String getPurZgRequire() 
	{
		return this.purZgRequire;
	}
	public void setPurRemark(String purRemark) 
	{
		this.purRemark = purRemark;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getPurRemark() 
	{
		return this.purRemark;
	}
	public void setCreateBy(String createBy) 
	{
		this.createBy = createBy;
	}
	/**
	 * 返回 操作人
	 * @return
	 */
	public String getCreateBy() 
	{
		return this.createBy;
	}
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 操作时间
	 * @return
	 */
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	
}