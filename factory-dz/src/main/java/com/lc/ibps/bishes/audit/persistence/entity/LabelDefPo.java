package com.lc.ibps.bishes.audit.persistence.entity;

/**
 * t_label_def 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
 @SuppressWarnings("serial")
public class LabelDefPo extends LabelDefTbl{
	 
	 int tchCount;
	 int paperCount;
	 String type;
	 
	public int getTchCount() {
		return tchCount;
	}
	public void setTchCount(int tchCount) {
		this.tchCount = tchCount;
	}
	public int getPaperCount() {
		return paperCount;
	}
	public void setPaperCount(int paperCount) {
		this.paperCount = paperCount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
}
