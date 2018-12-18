package com.lc.ibps.bishes.group.persistence.entity;

/**
 * t_grad_group 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:34
 *</pre>
 */
 @SuppressWarnings("serial")
public class GradGroupPo extends GradGroupTbl{
	 
	 int totalNum;
	 int noAuditNum;
	 
	public int getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
	}
	public int getNoAuditNum() {
		return noAuditNum;
	}
	public void setNoAuditNum(int noAuditNum) {
		this.noAuditNum = noAuditNum;
	}
	 
	 
	 
}
