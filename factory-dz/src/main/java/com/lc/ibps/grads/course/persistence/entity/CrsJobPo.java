package com.lc.ibps.grads.course.persistence.entity;

import java.util.Date;

/**
 * t_crs_job 实体对象
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 * </pre>
 */
@SuppressWarnings("serial")
public class CrsJobPo extends CrsJobTbl {
	public static final String[] STATUSLIST = {"未开始","进行中","已结束"};
	public static final int NOTSTART = 0;//状态：未开始、已开始、已结束
	public static final int STARTING = 1;
	public static final int CLOSED = 2;
	public static final int ALLFINISH = 1;
	public static final int MINCOUNT = 400;
	
	public CrsJobPo() {}
	public CrsJobPo(String crsTchId,String title,String startStopTime , float scorePower) {
		setCrsTchId(crsTchId);
		setTitle(title);
		setStartStopTime(startStopTime);
		setScorePower(scorePower);
		setCreateTime(new Date());
	
	}
	
	protected String startTime; /* 开始时间 */
	protected String stopTime; /* 截至时间 */
	protected String startTimeP1; /* 开始时间 */
	protected String startTimeP2; /* 开始时间 */
	protected String stopTimeP1; /* 截至时间 */
	protected String stopTimeP2; /* 截至时间 */
	protected String showStatus; /* 外显示状态 */
	protected String showCategory ; /* 外显示性质 */
	protected String reviewPercent ; /* 教师评阅完成度 */
	protected String stdFinished ; /* 学生提交完成度 */
	protected String stdStatus ; /* 展示给学生自己是否已经提交 */
	protected String clazz ; /* 班级 */
	String crsName;
	
	
	public String getCrsName() {
		return crsName;
	}

	public void setCrsName(String crsName) {
		this.crsName = crsName;
	}

	public String getClazz() {
		return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}

	protected float stdJobScore;
	protected String comment ;
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public float getStdJobScore() {
		return stdJobScore;
	}

	public void setStdJobScore(float f) {
		this.stdJobScore = f;
	}

	public String getStdStatus() {
		return stdStatus;
	}

	public void setStdStatus(String stdStatus) {
		this.stdStatus = stdStatus;
	}

	public String getReviewPercent() {
		return reviewPercent;
	}

	public void setReviewPercent(String reviewPercent) {
		this.reviewPercent = reviewPercent;
	}

	public String getStdFinished() {
		return stdFinished;
	}

	public void setStdFinished(String stdFinished) {
		this.stdFinished = stdFinished;
	}

	public String getShowCategory() {
		return showCategory;
	}

	public void setShowCategory(String showCategory) {
		this.showCategory = showCategory;
	}

	public String getShowStatus() {
		return showStatus;
	}

	public void setShowStatus(String showStatus) {
		this.showStatus = showStatus;
	}

	public String getStopTime() {
		return stopTime;
	}

	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getStartTimeP1() {
		return startTimeP1;
	}

	public void setStartTimeP1(String startTimeP1) {
		this.startTimeP1 = startTimeP1;
	}

	public String getStartTimeP2() {
		return startTimeP2;
	}

	public void setStartTimeP2(String startTimeP2) {
		this.startTimeP2 = startTimeP2;
	}

	public String getStopTimeP1() {
		return stopTimeP1;
	}

	public void setStopTimeP1(String stopTimeP1) {
		this.stopTimeP1 = stopTimeP1;
	}

	public String getStopTimeP2() {
		return stopTimeP2;
	}

	public void setStopTimeP2(String stopTimeP2) {
		this.stopTimeP2 = stopTimeP2;
	}
}
