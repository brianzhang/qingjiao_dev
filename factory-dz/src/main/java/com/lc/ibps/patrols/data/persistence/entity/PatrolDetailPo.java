package com.lc.ibps.patrols.data.persistence.entity;

/**
 * t_patrol_detail 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:23
 *</pre>
 */
 @SuppressWarnings("serial")
public class PatrolDetailPo extends PatrolDetailTbl{
	 public PatrolDetailPo() {}
	 public PatrolDetailPo(String pgId , String className) {
		 setPgId(pgId);
		 setClassName(className);
	 }
}
