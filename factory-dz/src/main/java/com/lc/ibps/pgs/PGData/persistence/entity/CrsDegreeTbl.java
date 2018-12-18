package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_zykcdcdhlxpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:20:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsDegreeTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  course_id; 		/*课程ID*/
	protected String  rationality; 		/*是否合理*/
	protected String  course_principal; 		/*课程负责人*/
	protected String  standardability; 		/*规范性*/
	protected String  integrality; 		/*完整性*/
	protected String  paper_analysis; 		/*试卷分析*/
	protected String  course_analysis; 		/*课程分析*/
	protected String  complete_cover; 		/*完全覆盖*/
	protected String  education_manager; 		/*教学管理员*/
	protected String  judgement_result; 		/*判定结果*/
	protected String  change_advice; 		/*整改意见*/
	protected String  major_principal; 		/*专业负责人*/

	public void setId(String id) 
	{
		this.id = id;
	}
	protected String  json; 		/*调查问卷json字段*/
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
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
	public void setRationality(String rationality) 
	{
		this.rationality = rationality;
	}
	/**
	 * 返回 是否合理
	 * @return
	 */
	public String getRationality() 
	{
		return this.rationality;
	}
	public void setCourse_principal(String course_principal) 
	{
		this.course_principal = course_principal;
	}
	/**
	 * 返回 课程负责人
	 * @return
	 */
	public String getCourse_principal() 
	{
		return this.course_principal;
	}
	public void setStandardability(String standardability) 
	{
		this.standardability = standardability;
	}
	/**
	 * 返回 规范性
	 * @return
	 */
	public String getStandardability() 
	{
		return this.standardability;
	}
	public void setIntegrality(String integrality) 
	{
		this.integrality = integrality;
	}
	/**
	 * 返回 完整性
	 * @return
	 */
	public String getIntegrality() 
	{
		return this.integrality;
	}
	public void setPaper_analysis(String paper_analysis) 
	{
		this.paper_analysis = paper_analysis;
	}
	/**
	 * 返回 试卷分析
	 * @return
	 */
	public String getPaper_analysis() 
	{
		return this.paper_analysis;
	}
	public void setCourse_analysis(String course_analysis) 
	{
		this.course_analysis = course_analysis;
	}
	/**
	 * 返回 课程分析
	 * @return
	 */
	public String getCourse_analysis() 
	{
		return this.course_analysis;
	}
	public void setComplete_cover(String complete_cover) 
	{
		this.complete_cover = complete_cover;
	}
	/**
	 * 返回 完全覆盖
	 * @return
	 */
	public String getComplete_cover() 
	{
		return this.complete_cover;
	}
	public void setEducation_manager(String education_manager) 
	{
		this.education_manager = education_manager;
	}
	/**
	 * 返回 教学管理员
	 * @return
	 */
	public String getEducation_manager() 
	{
		return this.education_manager;
	}
	public void setJudgement_result(String judgement_result) 
	{
		this.judgement_result = judgement_result;
	}
	/**
	 * 返回 判定结果
	 * @return
	 */
	public String getJudgement_result() 
	{
		return this.judgement_result;
	}
	public void setChange_advice(String change_advice) 
	{
		this.change_advice = change_advice;
	}
	/**
	 * 返回 整改意见
	 * @return
	 */
	public String getChange_advice() 
	{
		return this.change_advice;
	}
	public void setMajor_principal(String major_principal) 
	{
		this.major_principal = major_principal;
	}
	/**
	 * 返回 专业负责人
	 * @return
	 */
	public String getMajor_principal() 
	{
		return this.major_principal;
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
		.append("rationality", this.rationality) 
		.append("course_principal", this.course_principal) 
		.append("standardability", this.standardability) 
		.append("integrality", this.integrality) 
		.append("paper_analysis", this.paper_analysis) 
		.append("course_analysis", this.course_analysis) 
		.append("complete_cover", this.complete_cover) 
		.append("education_manager", this.education_manager) 
		.append("judgement_result", this.judgement_result) 
		.append("change_advice", this.change_advice) 
		.append("major_principal", this.major_principal) 
		.toString();
	}
}
