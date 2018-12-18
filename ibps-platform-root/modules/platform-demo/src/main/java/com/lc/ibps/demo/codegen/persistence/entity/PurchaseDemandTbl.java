
package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.Date;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 采购需求 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:47
 *</pre>
 */
 @SuppressWarnings("serial")
public class PurchaseDemandTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  ip; 		/*IP地址*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  projectName; 		/*项目名称*/
	protected String  purchasePlanCode; 		/*采购计划编号*/
	protected Date  registerDate; 		/*登记日期*/
	protected String  declareDepart; 		/*申报部门*/
	protected String  purchaseOperateOrg; 		/*采购执行部门*/
	protected Double  purchaseAmount; 		/*采购金额*/
	protected String  purBudgetIndex; 		/*采购预算指标*/
	protected String  projectType; 		/*项目类型*/
	protected String  bidderQualiRequire; 		/*投标人资格要求*/
	protected String  remark; 		/*备注*/
	protected String  acceptStatus; 		/*受理状态*/
	protected String  auditStatus; 		/*审核状态*/
	protected Date  budgetYear; 		/*项目所属预算年度*/

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
	public void setCreateBy(String createBy) 
	{
		this.createBy = createBy;
	}
	/**
	 * 返回 创建人
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
	 * 返回 创建时间
	 * @return
	 */
	public Date getCreateTime() 
	{
		return this.createTime;
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
	public void setProjectName(String projectName) 
	{
		this.projectName = projectName;
	}
	/**
	 * 返回 项目名称
	 * @return
	 */
	public String getProjectName() 
	{
		return this.projectName;
	}
	public void setPurchasePlanCode(String purchasePlanCode) 
	{
		this.purchasePlanCode = purchasePlanCode;
	}
	/**
	 * 返回 采购计划编号
	 * @return
	 */
	public String getPurchasePlanCode() 
	{
		return this.purchasePlanCode;
	}
	public void setRegisterDate(Date registerDate) 
	{
		this.registerDate = registerDate;
	}
	/**
	 * 返回 登记日期
	 * @return
	 */
	public Date getRegisterDate() 
	{
		return this.registerDate;
	}
	public void setDeclareDepart(String declareDepart) 
	{
		this.declareDepart = declareDepart;
	}
	/**
	 * 返回 申报部门
	 * @return
	 */
	public String getDeclareDepart() 
	{
		return this.declareDepart;
	}
	public void setPurchaseOperateOrg(String purchaseOperateOrg) 
	{
		this.purchaseOperateOrg = purchaseOperateOrg;
	}
	/**
	 * 返回 采购执行部门
	 * @return
	 */
	public String getPurchaseOperateOrg() 
	{
		return this.purchaseOperateOrg;
	}
	public void setPurchaseAmount(Double purchaseAmount) 
	{
		this.purchaseAmount = purchaseAmount;
	}
	/**
	 * 返回 采购金额
	 * @return
	 */
	public Double getPurchaseAmount() 
	{
		return this.purchaseAmount;
	}
	public void setPurBudgetIndex(String purBudgetIndex) 
	{
		this.purBudgetIndex = purBudgetIndex;
	}
	/**
	 * 返回 采购预算指标
	 * @return
	 */
	public String getPurBudgetIndex() 
	{
		return this.purBudgetIndex;
	}
	public void setProjectType(String projectType) 
	{
		this.projectType = projectType;
	}
	/**
	 * 返回 项目类型
	 * @return
	 */
	public String getProjectType() 
	{
		return this.projectType;
	}
	public void setBidderQualiRequire(String bidderQualiRequire) 
	{
		this.bidderQualiRequire = bidderQualiRequire;
	}
	/**
	 * 返回 投标人资格要求
	 * @return
	 */
	public String getBidderQualiRequire() 
	{
		return this.bidderQualiRequire;
	}
	public void setRemark(String remark) 
	{
		this.remark = remark;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getRemark() 
	{
		return this.remark;
	}
	public void setAcceptStatus(String acceptStatus) 
	{
		this.acceptStatus = acceptStatus;
	}
	/**
	 * 返回 受理状态
	 * @return
	 */
	public String getAcceptStatus() 
	{
		return this.acceptStatus;
	}
	public void setAuditStatus(String auditStatus) 
	{
		this.auditStatus = auditStatus;
	}
	/**
	 * 返回 审核状态
	 * @return
	 */
	public String getAuditStatus() 
	{
		return this.auditStatus;
	}
	public void setBudgetYear(Date budgetYear) 
	{
		this.budgetYear = budgetYear;
	}
	/**
	 * 返回 项目所属预算年度
	 * @return
	 */
	public Date getBudgetYear() 
	{
		return this.budgetYear;
	}
	
}
