package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.Date;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:24
 *</pre>
 */
 @SuppressWarnings("serial")
public class Cgqd1Tbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  parentId; 		/*外键*/
	protected String  ip; 		/*IP地址*/
	protected String  updateBy; 		/*更新人*/
	protected Date  updateTime; 		/*更新时间*/
	protected String  purGoodsItem; 		/*采购项品目*/
	protected String  purGoodsName; 		/*采购项名称*/
	protected Double  purNumber; 		/*采购数量*/
	protected Double  purMarketPrice; 		/*市场参考价*/
	protected Date  purRequireDate; 		/*需求时间*/
	protected String  purExplain; 		/*说明*/
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
	public void setPurGoodsItem(String purGoodsItem) 
	{
		this.purGoodsItem = purGoodsItem;
	}
	/**
	 * 返回 采购项品目
	 * @return
	 */
	public String getPurGoodsItem() 
	{
		return this.purGoodsItem;
	}
	public void setPurGoodsName(String purGoodsName) 
	{
		this.purGoodsName = purGoodsName;
	}
	/**
	 * 返回 采购项名称
	 * @return
	 */
	public String getPurGoodsName() 
	{
		return this.purGoodsName;
	}
	public void setPurNumber(Double purNumber) 
	{
		this.purNumber = purNumber;
	}
	/**
	 * 返回 采购数量
	 * @return
	 */
	public Double getPurNumber() 
	{
		return this.purNumber;
	}
	public void setPurMarketPrice(Double purMarketPrice) 
	{
		this.purMarketPrice = purMarketPrice;
	}
	/**
	 * 返回 市场参考价
	 * @return
	 */
	public Double getPurMarketPrice() 
	{
		return this.purMarketPrice;
	}
	public void setPurRequireDate(Date purRequireDate) 
	{
		this.purRequireDate = purRequireDate;
	}
	/**
	 * 返回 需求时间
	 * @return
	 */
	public Date getPurRequireDate() 
	{
		return this.purRequireDate;
	}
	public void setPurExplain(String purExplain) 
	{
		this.purExplain = purExplain;
	}
	/**
	 * 返回 说明
	 * @return
	 */
	public String getPurExplain() 
	{
		return this.purExplain;
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