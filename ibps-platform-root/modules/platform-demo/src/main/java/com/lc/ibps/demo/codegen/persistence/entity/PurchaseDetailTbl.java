
package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.Date;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_purchasedetaillist 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
 @SuppressWarnings("serial")
public class PurchaseDetailTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  parentId; 		/*外键*/
	protected String  ip; 		/*IP地址*/
	protected String  createBy; 		/*创建人*/
	protected Date  createTime; 		/*创建时间*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  purchaseItem; 		/*采购项品目*/
	protected String  purItemName; 		/*采购项名称*/
	protected Double  purchaseNumber; 		/*采购数量*/
	protected Double  marketRefePrice; 		/*市场参考价*/
	protected Date  demandDate; 		/*需求时间*/
	protected String  description; 		/*说明*/
	protected Date  operateDate; 		/*操作时间*/
	protected String  operator; 		/*操作人*/
	protected Double  subtotal; 		/*小计*/

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
	public void setParentId(String parentId) 
	{
		this.parentId = parentId;
	}
	/**
	 * 返回 外键
	 * @return
	 */
	public String getParentId() 
	{
		return this.parentId;
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
	public void setPurchaseItem(String purchaseItem) 
	{
		this.purchaseItem = purchaseItem;
	}
	/**
	 * 返回 采购项品目
	 * @return
	 */
	public String getPurchaseItem() 
	{
		return this.purchaseItem;
	}
	public void setPurItemName(String purItemName) 
	{
		this.purItemName = purItemName;
	}
	/**
	 * 返回 采购项名称
	 * @return
	 */
	public String getPurItemName() 
	{
		return this.purItemName;
	}
	public void setPurchaseNumber(Double purchaseNumber) 
	{
		this.purchaseNumber = purchaseNumber;
	}
	/**
	 * 返回 采购数量
	 * @return
	 */
	public Double getPurchaseNumber() 
	{
		return this.purchaseNumber;
	}
	public void setMarketRefePrice(Double marketRefePrice) 
	{
		this.marketRefePrice = marketRefePrice;
	}
	/**
	 * 返回 市场参考价
	 * @return
	 */
	public Double getMarketRefePrice() 
	{
		return this.marketRefePrice;
	}
	public void setDemandDate(Date demandDate) 
	{
		this.demandDate = demandDate;
	}
	/**
	 * 返回 需求时间
	 * @return
	 */
	public Date getDemandDate() 
	{
		return this.demandDate;
	}
	public void setDescription(String description) 
	{
		this.description = description;
	}
	/**
	 * 返回 说明
	 * @return
	 */
	public String getDescription() 
	{
		return this.description;
	}
	public void setOperateDate(Date operateDate) 
	{
		this.operateDate = operateDate;
	}
	/**
	 * 返回 操作时间
	 * @return
	 */
	public Date getOperateDate() 
	{
		return this.operateDate;
	}
	public void setOperator(String operator) 
	{
		this.operator = operator;
	}
	/**
	 * 返回 操作人
	 * @return
	 */
	public String getOperator() 
	{
		return this.operator;
	}
	public void setSubtotal(Double subtotal) 
	{
		this.subtotal = subtotal;
	}
	/**
	 * 返回 小计
	 * @return
	 */
	public Double getSubtotal() 
	{
		return this.subtotal;
	}
	
}
