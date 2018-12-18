package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_xxaqzyktjxfkb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
 @SuppressWarnings("serial")
public class TeachingfeedbackTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  course_id; 		/*课程ID*/
	protected String  course_name; 		/*课程名称*/
	protected String  teacher; 		/*授课教师*/
	protected Date  time; 		/*听课时间*/
	protected String  judge_result1_1; 		/*判定结果1.1*/
	protected String  judge_result1_2; 		/*判定结果1.2*/
	protected String  judge_result2_1; 		/*判定结果2.1*/
	protected String  judge_result2_2; 		/*判定结果2.2*/
	protected String  judge_result3_1; 		/*判定结果3.1*/
	protected String  judge_result3_1_1; 		/*如上项选是3.1.1*/
	protected String  judge_result3_2; 		/*判定结果3.2*/
	protected String  judge_result3_2_1; 		/*如上项选是3.2.1*/
	protected String  judge_result4_1; 		/*判定结果4.1*/
	protected String  judge_result4_2; 		/*判定结果4.2*/
	protected String  judge_result5; 		/*判定结果 5*/
	protected String  judge_result6; 		/*判定结果6*/
	protected String  evalution_name; 		/*评价人*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
	 * @return
	 */
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	public void setCourse_id(String course_id) 
	{
		this.course_id = course_id;
	}
	/**
	 * 返回 课程ID
	 * @return
	 */
	public String getCourse_id() 
	{
		return this.course_id;
	}
	public void setCourse_name(String course_name) 
	{
		this.course_name = course_name;
	}
	/**
	 * 返回 课程名称
	 * @return
	 */
	public String getCourse_name() 
	{
		return this.course_name;
	}
	public void setTeacher(String teacher) 
	{
		this.teacher = teacher;
	}
	/**
	 * 返回 授课教师
	 * @return
	 */
	public String getTeacher() 
	{
		return this.teacher;
	}
	public void setTime(Date time) 
	{
		this.time = time;
	}
	/**
	 * 返回 听课时间
	 * @return
	 */
	public Date getTime() 
	{
		return this.time;
	}
	public void setJudge_result1_1(String judge_result1_1) 
	{
		this.judge_result1_1 = judge_result1_1;
	}
	/**
	 * 返回 判定结果1.1
	 * @return
	 */
	public String getJudge_result1_1() 
	{
		return this.judge_result1_1;
	}
	public void setJudge_result1_2(String judge_result1_2) 
	{
		this.judge_result1_2 = judge_result1_2;
	}
	/**
	 * 返回 判定结果1.2
	 * @return
	 */
	public String getJudge_result1_2() 
	{
		return this.judge_result1_2;
	}
	public void setJudge_result2_1(String judge_result2_1) 
	{
		this.judge_result2_1 = judge_result2_1;
	}
	/**
	 * 返回 判定结果2.1
	 * @return
	 */
	public String getJudge_result2_1() 
	{
		return this.judge_result2_1;
	}
	public void setJudge_result2_2(String judge_result2_2) 
	{
		this.judge_result2_2 = judge_result2_2;
	}
	/**
	 * 返回 判定结果2.2
	 * @return
	 */
	public String getJudge_result2_2() 
	{
		return this.judge_result2_2;
	}
	public void setJudge_result3_1(String judge_result3_1) 
	{
		this.judge_result3_1 = judge_result3_1;
	}
	/**
	 * 返回 判定结果3.1
	 * @return
	 */
	public String getJudge_result3_1() 
	{
		return this.judge_result3_1;
	}
	public void setJudge_result3_1_1(String judge_result3_1_1) 
	{
		this.judge_result3_1_1 = judge_result3_1_1;
	}
	/**
	 * 返回 如上项选是3.1.1
	 * @return
	 */
	public String getJudge_result3_1_1() 
	{
		return this.judge_result3_1_1;
	}
	public void setJudge_result3_2(String judge_result3_2) 
	{
		this.judge_result3_2 = judge_result3_2;
	}
	/**
	 * 返回 判定结果3.2
	 * @return
	 */
	public String getJudge_result3_2() 
	{
		return this.judge_result3_2;
	}
	public void setJudge_result3_2_1(String judge_result3_2_1) 
	{
		this.judge_result3_2_1 = judge_result3_2_1;
	}
	/**
	 * 返回 如上项选是3.2.1
	 * @return
	 */
	public String getJudge_result3_2_1() 
	{
		return this.judge_result3_2_1;
	}
	public void setJudge_result4_1(String judge_result4_1) 
	{
		this.judge_result4_1 = judge_result4_1;
	}
	/**
	 * 返回 判定结果4.1
	 * @return
	 */
	public String getJudge_result4_1() 
	{
		return this.judge_result4_1;
	}
	public void setJudge_result4_2(String judge_result4_2) 
	{
		this.judge_result4_2 = judge_result4_2;
	}
	/**
	 * 返回 判定结果4.2
	 * @return
	 */
	public String getJudge_result4_2() 
	{
		return this.judge_result4_2;
	}
	public void setJudge_result5(String judge_result5) 
	{
		this.judge_result5 = judge_result5;
	}
	/**
	 * 返回 判定结果 5
	 * @return
	 */
	public String getJudge_result5() 
	{
		return this.judge_result5;
	}
	public void setJudge_result6(String judge_result6) 
	{
		this.judge_result6 = judge_result6;
	}
	/**
	 * 返回 判定结果6
	 * @return
	 */
	public String getJudge_result6() 
	{
		return this.judge_result6;
	}
	public void setEvalution_name(String evalution_name) 
	{
		this.evalution_name = evalution_name;
	}
	/**
	 * 返回 评价人
	 * @return
	 */
	public String getEvalution_name() 
	{
		return this.evalution_name;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("course_id", this.course_id) 
		.append("course_name", this.course_name) 
		.append("teacher", this.teacher) 
		.append("time", this.time) 
		.append("judge_result1_1", this.judge_result1_1) 
		.append("judge_result1_2", this.judge_result1_2) 
		.append("judge_result2_1", this.judge_result2_1) 
		.append("judge_result2_2", this.judge_result2_2) 
		.append("judge_result3_1", this.judge_result3_1) 
		.append("judge_result3_1_1", this.judge_result3_1_1) 
		.append("judge_result3_2", this.judge_result3_2) 
		.append("judge_result3_2_1", this.judge_result3_2_1) 
		.append("judge_result4_1", this.judge_result4_1) 
		.append("judge_result4_2", this.judge_result4_2) 
		.append("judge_result5", this.judge_result5) 
		.append("judge_result6", this.judge_result6) 
		.append("evalution_name", this.evalution_name) 
		.toString();
	}
}
