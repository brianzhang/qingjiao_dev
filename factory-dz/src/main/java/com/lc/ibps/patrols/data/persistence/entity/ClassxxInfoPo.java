package com.lc.ibps.patrols.data.persistence.entity;

/**
 * 班级信息 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
 @SuppressWarnings("serial")
public class ClassxxInfoPo extends ClassxxInfoTbl{
		public ClassxxInfoPo(String school, String classxx, String classMaster, String place) {
			this.school = school;
			this.classxx = classxx;
			this.classMaster = classMaster;
			this.place = place;
		}
		
		public ClassxxInfoPo(){}
		
		public boolean equlas(ClassxxInfoPo e) {
			if( (this.school).equals(e.getSchool()) && (this.classxx).equals(e.getClassxx()) && ( this.classMaster).equals(e.getClassMaster()) && ( this.place).equals(e.getPlace()))
				return true;
			return false;
		}
	 
}
