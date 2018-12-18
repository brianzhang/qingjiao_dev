package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity;

/**
 * t_zyurl 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlZhiYuanPo extends UrlZhiYuanTbl{

 	private int match; //论文和审核教师的匹配度


	public int getMatch() {
		return match;
	}

	public void setMatch(int match) {
		this.match = match;
	}

	public void setJson(String json) {
		// TODO Auto-generated method stub
		
	}

	
}
