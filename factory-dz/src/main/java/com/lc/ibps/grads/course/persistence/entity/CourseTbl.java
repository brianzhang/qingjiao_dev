package com.lc.ibps.grads.course.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_course 表对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:35:12
 *</pre>
 */
 @SuppressWarnings("serial")
public class CourseTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  num; 		/*课程编号*/
	protected String  name; 		/*课程名称*/
	protected String  period; 		/*学时*/
	protected Double  credit; 		/*学分*/
	protected String  category; 		/*性质*/
	protected String  testing; 		/*考试性质*/
	protected String  college; 		/*开课院系*/
	protected String  orgId;		/*院系id,以区分院系*/
//	protected String  id; 		/*主键*/
//	protected String  num; 		/*课程编号*/
//	protected String  name; 		/*课程名称*/
//	protected Long  period; 		/*学时*/
//	protected Double  credit; 		/*学分*/
//	protected String  category; 		/*性质*/
//	protected String  testing; 		/*考试性质*/
//	protected String  college; 		/*开课院系*/
//	protected String  orgId;		/*院系id,以区分院系*/
//	protected String  crs_en_name; 		/*英文名称*/
//	protected String  crs_properties; 		/*课程性质*/
//	protected String  crs_major; 		/*开课专业*/
//	protected String  crs_term; 		/*开课学期*/
//	protected String  crs_aim; 		/*课程目标*/
//	protected String  tch_claim; 		/*教学基本要求*/
//	protected String  tch_con_hours; 		/*教学内容与学时分配*/
//	protected String  tch_method; 		/*教学方法及手段*/
//	protected String  exp_con; 		/*实验或上机内容*/
//	protected String  pre_crs; 		/*前续课程*/
//	protected String  fliow_crs; 		/*后续课程*/
//	protected String  crs_refer; 		/*参考教材及学习资源*/
//	protected String  assess_way; 		/*考核方式*/
//	protected String  tch_base_demand; 		/*教学基本要求项*/
//	protected String  exam_type; 		/*考核形式*/
//	protected String  power_ratio; 		/*占总成绩的比例*/
//	protected String  tch_base_demand_1; 		/*教学基本要求项_1*/
//	protected String  tch_base_demand_2; 		/*教学基本要求项_2*/
//	protected String  exam_type_1; 		/*考核方式_1*/
//	protected String  exam_type_2; 		/*考核方式_2*/
//	protected String  power_ratio_1; 		/*占总成绩的比例_1*/
//	protected String  power_ratio_2; 		/*占总成绩的比例_2*/

	//工程认证平台字段



	/**
	 * 返回课程所在院系id
	 * @return
	 */
	public String getOrgId() {
		return orgId;
	}
	/**
	 * 设置课程所在院系id
	 * @param orgId
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	
	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	public void setNum(String num) 
	{
		this.num = num;
	}
	/**
	 * 返回 课程编号
	 * @return
	 */
	public String getNum() 
	{
		return this.num;
	}
	@Override
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 课程名称
	 * @return
	 */
	@Override
	public String getName() 
	{
		return this.name;
	}
	public void setPeriod(String period)
	{
		this.period = period;
	}
	/**
	 * 返回 学时
	 * @return
	 */
	public String getPeriod()
	{
		return this.period;
	}
	public void setCredit(Double credit) 
	{
		this.credit = credit;
	}
	/**
	 * 返回 学分
	 * @return
	 */
	public Double getCredit() 
	{
		return this.credit;
	}
	public void setCategory(String category) 
	{
		this.category = category;
	}
	/**
	 * 返回 性质
	 * @return
	 */
	public String getCategory() 
	{
		return this.category;
	}
	public void setTesting(String testing) 
	{
		this.testing = testing;
	}
	/**
	 * 返回 考试性质
	 * @return
	 */
	public String getTesting() 
	{
		return this.testing;
	}
	public void setCollege(String college) 
	{
		this.college = college;
	}
	/**
	 * 返回 开课院系
	 * @return
	 */
	public String getCollege() 
	{
		return this.college;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("num", this.num) 
		.append("name", this.name) 
		.append("period", this.period) 
		.append("credit", this.credit) 
		.append("category", this.category) 
		.append("testing", this.testing) 
		.append("college", this.college) 
		.toString();
	}
}
