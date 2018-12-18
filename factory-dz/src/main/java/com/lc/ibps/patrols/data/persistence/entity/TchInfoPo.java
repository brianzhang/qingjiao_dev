package com.lc.ibps.patrols.data.persistence.entity;

/**
 * t_tch_inf 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
 @SuppressWarnings("serial")
public class TchInfoPo extends TchInfoTbl{
	 
		public TchInfoPo(String school, String tchName, String tchNum, String subject) {
			this.school = school;
			this.tchName = tchName;
			this.tchNum = tchNum;
			this.subject = subject;
		}
		
		public TchInfoPo(){}
		
		//有了教师工号后需要修改
		public boolean equlas(TchInfoPo e) {
			if( (this.school).equals(e.getSchool()) && (this.tchName).equals(e.getTchName()) && ( this.tchNum).equals(e.getTchNum()) && ( this.subject).equals(e.getSubject()))
				return true;
			return false;
		}
}
