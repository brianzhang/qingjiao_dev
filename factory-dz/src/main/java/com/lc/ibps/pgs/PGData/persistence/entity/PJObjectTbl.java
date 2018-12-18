package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_pjdx 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
 @SuppressWarnings("serial")
public class PJObjectTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  school_number; 		/*学号*/
	protected String  std_name; 		/*姓名*/
	protected String  classnum; 		/*班级*/
	protected String  final_paper1; 		/*期末试卷*/
	protected String  final_paper2; 		/*期末试卷*/
	protected String  final_paper3; 		/*期末试卷*/
	protected String  final_paper4; 		/*期末试卷*/
	protected String  experiment; 		/*实验*/
	protected String  subject_present; 		/*专题报告*/

	public void setId(String id) 
	{
		this.id = id;
	}
	public String getStd_name() {
		return std_name;
	}
	public void setStd_name(String std_name) {
		this.std_name = std_name;
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
	public void setSchool_number(String school_number) 
	{
		this.school_number = school_number;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getSchool_number() 
	{
		return this.school_number;
	}
	
	public void setClassnum(String classnum) 
	{
		this.classnum = classnum;
	}
	/**
	 * 返回 班级
	 * @return
	 */
	public String getClassnum() 
	{
		return this.classnum;
	}
	
	public String getFinal_paper1() {
		return final_paper1;
	}
	public void setFinal_paper1(String final_paper1) {
		this.final_paper1 = final_paper1;
	}
	public String getFinal_paper2() {
		return final_paper2;
	}
	public void setFinal_paper2(String final_paper2) {
		this.final_paper2 = final_paper2;
	}
	public String getFinal_paper3() {
		return final_paper3;
	}
	public void setFinal_paper3(String final_paper3) {
		this.final_paper3 = final_paper3;
	}
	public String getFinal_paper4() {
		return final_paper4;
	}
	public void setFinal_paper4(String final_paper4) {
		this.final_paper4 = final_paper4;
	}
	public void setExperiment(String experiment) 
	{
		this.experiment = experiment;
	}
	/**
	 * 返回 实验
	 * @return
	 */
	public String getExperiment() 
	{
		return this.experiment;
	}
	public void setSubject_present(String subject_present) 
	{
		this.subject_present = subject_present;
	}
	/**
	 * 返回 专题报告
	 * @return
	 */
	public String getSubject_present() 
	{
		return this.subject_present;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("school_number", this.school_number) 
		.append("name", this.name) 
		.append("classnum", this.classnum) 
		.append("final_paper1", this.final_paper1)
		.append("final_paper2", this.final_paper2) 
		.append("final_paper3", this.final_paper3) 
		.append("final_paper4", this.final_paper4) 
		.append("experiment", this.experiment) 
		.append("subject_present", this.subject_present) 
		.toString();
	}
}
