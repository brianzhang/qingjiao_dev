
package com.lc.ibps.demo.codegen.persistence.entity;
import java.util.ArrayList;
import java.util.List;

/**
 * 采购需求 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:47
 *</pre>
 */
 @SuppressWarnings("serial")
public class PurchaseDemandPo extends PurchaseDemandTbl{
	private boolean delBeforeSave = true;
	public boolean isDelBeforeSave() {
		return delBeforeSave;
	}
	public void setDelBeforeSave(boolean delBeforeSave) {
		this.delBeforeSave = delBeforeSave;
	}	
	private List<PurchaseAttachPo> purchaseAttachPoList = new ArrayList<PurchaseAttachPo>();
	public List<PurchaseAttachPo> getPurchaseAttachPoList() {
		return purchaseAttachPoList;
	}
	public void setPurchaseAttachPoList(List<PurchaseAttachPo> purchaseAttachPoList) {
		this.purchaseAttachPoList = purchaseAttachPoList;
	}
	private List<PurchaseDetailPo> purchaseDetailPoList = new ArrayList<PurchaseDetailPo>();
	public List<PurchaseDetailPo> getPurchaseDetailPoList() {
		return purchaseDetailPoList;
	}
	public void setPurchaseDetailPoList(List<PurchaseDetailPo> purchaseDetailPoList) {
		this.purchaseDetailPoList = purchaseDetailPoList;
	}
}
