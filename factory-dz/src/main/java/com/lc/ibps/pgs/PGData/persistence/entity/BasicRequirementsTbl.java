package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_jbyqb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:18:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class BasicRequirementsTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  difficulty1; 		/*难度1*/
	protected String  score1; 		/*分值1*/
	protected String  difficulty2; 		/*难度2*/
	protected String  score2; 		/*分值2*/
	protected String  test; 		/*测试*/
	protected String  score3; 		/*分值3*/
	protected String  attendance; 		/*考勤*/
	protected String  prepare; 		/*预习*/
	protected String  operate; 		/*操作*/
	protected String  report; 		/*实验报告*/
	protected String  score4; 		/*分值4*/
	protected String  ppt; 		/*PPT*/
	protected String  document; 		/*文件*/
	protected String  presentation; 		/*答辩*/
	protected String  score5; 		/*分值5*/

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
	public void setDifficulty1(String difficulty1) 
	{
		this.difficulty1 = difficulty1;
	}
	/**
	 * 返回 难度1
	 * @return
	 */
	public String getDifficulty1() 
	{
		return this.difficulty1;
	}
	public void setScore1(String score1) 
	{
		this.score1 = score1;
	}
	/**
	 * 返回 分值1
	 * @return
	 */
	public String getScore1() 
	{
		return this.score1;
	}
	public void setDifficulty2(String difficulty2) 
	{
		this.difficulty2 = difficulty2;
	}
	/**
	 * 返回 难度2
	 * @return
	 */
	public String getDifficulty2() 
	{
		return this.difficulty2;
	}
	public void setScore2(String score2) 
	{
		this.score2 = score2;
	}
	/**
	 * 返回 分值2
	 * @return
	 */
	public String getScore2() 
	{
		return this.score2;
	}
	public void setTest(String test) 
	{
		this.test = test;
	}
	/**
	 * 返回 测试
	 * @return
	 */
	public String getTest() 
	{
		return this.test;
	}
	public void setScore3(String score3) 
	{
		this.score3 = score3;
	}
	/**
	 * 返回 分值3
	 * @return
	 */
	public String getScore3() 
	{
		return this.score3;
	}
	public void setAttendance(String attendance) 
	{
		this.attendance = attendance;
	}
	/**
	 * 返回 考勤
	 * @return
	 */
	public String getAttendance() 
	{
		return this.attendance;
	}
	public void setPrepare(String prepare) 
	{
		this.prepare = prepare;
	}
	/**
	 * 返回 预习
	 * @return
	 */
	public String getPrepare() 
	{
		return this.prepare;
	}
	public void setOperate(String operate) 
	{
		this.operate = operate;
	}
	/**
	 * 返回 操作
	 * @return
	 */
	public String getOperate() 
	{
		return this.operate;
	}
	public void setReport(String report) 
	{
		this.report = report;
	}
	/**
	 * 返回 实验报告
	 * @return
	 */
	public String getReport() 
	{
		return this.report;
	}
	public void setScore4(String score4) 
	{
		this.score4 = score4;
	}
	/**
	 * 返回 分值4
	 * @return
	 */
	public String getScore4() 
	{
		return this.score4;
	}
	public void setPpt(String ppt) 
	{
		this.ppt = ppt;
	}
	/**
	 * 返回 PPT
	 * @return
	 */
	public String getPpt() 
	{
		return this.ppt;
	}
	public void setDocument(String document) 
	{
		this.document = document;
	}
	/**
	 * 返回 文件
	 * @return
	 */
	public String getDocument() 
	{
		return this.document;
	}
	public void setPresentation(String presentation) 
	{
		this.presentation = presentation;
	}
	/**
	 * 返回 答辩
	 * @return
	 */
	public String getPresentation() 
	{
		return this.presentation;
	}
	public void setScore5(String score5) 
	{
		this.score5 = score5;
	}
	/**
	 * 返回 分值5
	 * @return
	 */
	public String getScore5() 
	{
		return this.score5;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("difficulty1", this.difficulty1) 
		.append("score1", this.score1) 
		.append("difficulty2", this.difficulty2) 
		.append("score2", this.score2) 
		.append("test", this.test) 
		.append("score3", this.score3) 
		.append("attendance", this.attendance) 
		.append("prepare", this.prepare) 
		.append("operate", this.operate) 
		.append("report", this.report) 
		.append("score4", this.score4) 
		.append("ppt", this.ppt) 
		.append("document", this.document) 
		.append("presentation", this.presentation) 
		.append("score5", this.score5) 
		.toString();
	}
}
