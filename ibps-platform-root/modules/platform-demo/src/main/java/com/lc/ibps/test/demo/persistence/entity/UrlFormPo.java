package com.lc.ibps.test.demo.persistence.entity;
import java.util.ArrayList;
import java.util.List;

/**
 * url表单例子 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlFormPo extends UrlFormTbl{
	private boolean delBeforeSave = true;
	public boolean isDelBeforeSave() {
		return delBeforeSave;
	}
	public void setDelBeforeSave(boolean delBeforeSave) {
		this.delBeforeSave = delBeforeSave;
	}	
	private List<UrlFormSub2Po> urlFormSub2PoList = new ArrayList<UrlFormSub2Po>();
	public List<UrlFormSub2Po> getUrlFormSub2PoList() {
		return urlFormSub2PoList;
	}
	public void setUrlFormSub2PoList(List<UrlFormSub2Po> urlFormSub2PoList) {
		this.urlFormSub2PoList = urlFormSub2PoList;
	}
}
