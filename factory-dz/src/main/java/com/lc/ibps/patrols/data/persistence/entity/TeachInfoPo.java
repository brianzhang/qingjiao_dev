package com.lc.ibps.patrols.data.persistence.entity;

/**
 * 授课信息 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
 @SuppressWarnings("serial")
public class TeachInfoPo extends TeachInfoTbl{
	 
		public TeachInfoPo(String scheduleId, String tchId, String classxxId, String day, String section) {
			this.scheduleId = scheduleId;
			this.tchId = tchId;
			this.classxxId = classxxId;
			this.day = day;
			this.section = section;
		}
	 
		public TeachInfoPo() {
		}
	
}
