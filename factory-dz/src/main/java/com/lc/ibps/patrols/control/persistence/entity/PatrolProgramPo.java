package com.lc.ibps.patrols.control.persistence.entity;

/**
 * 巡课方案 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:19
 *</pre>
 */
 @SuppressWarnings("serial")
public class PatrolProgramPo extends PatrolProgramTbl{
	 String patrollerName;
	 public String getPatrollerName() {
		return patrollerName;
	}
	public void setPatrollerName(String patrollerName) {
		this.patrollerName = patrollerName;
	}
	public PatrolProgramPo(){}
	 public PatrolProgramPo( String patroller , String startTime ){
		 setPatroller(patroller);
		 setStartTime(startTime);
	 }
}
