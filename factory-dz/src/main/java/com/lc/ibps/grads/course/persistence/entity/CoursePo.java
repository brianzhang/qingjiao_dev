package com.lc.ibps.grads.course.persistence.entity;

/**
 * t_course 实体对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
 @SuppressWarnings("serial")
public class CoursePo extends CourseTbl{
	 public CoursePo(){}
	 public CoursePo(String num,String name,String period, String credit , String category , String testMethod , String college) throws Exception{
		 super.num = num;
		 super.name = name ;
		 super.period = period;
		 super.credit = Double.parseDouble(credit);
		 super.category = category;
		 super.testing = testMethod;
		 super.college = college;
	 }
}
