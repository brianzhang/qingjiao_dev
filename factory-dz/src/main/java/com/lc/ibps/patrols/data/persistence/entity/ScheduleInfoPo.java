package com.lc.ibps.patrols.data.persistence.entity;

/**
 * 课表信息 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
 @SuppressWarnings("serial")
public class ScheduleInfoPo extends ScheduleInfoTbl{
	 
		public ScheduleInfoPo(String fileId, String school, String name, String state) {
			this.fileId = fileId;
			this.school = school;
			this.name = name;
			this.state = state;
		}
		
		public ScheduleInfoPo(){
			
		}
	 
}
