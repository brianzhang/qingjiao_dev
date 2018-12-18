package com.lc.ibps.grads.course.persistence.entity;

/**
 * t_job_std 实体对象
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:47
 * </pre>
 */
@SuppressWarnings("serial")
public class JobStdPo extends JobStdTbl {
	public JobStdPo() {
	}
	public JobStdPo(String jobId , String stdNum ){
		setJobid(jobId);
		setStdNum(stdNum);
		setReviewStatus(""+NOTVIEWED);
	}
	
	public static final int NOTVIEWED = 0;
	public static final int VIEWED = 1;
	public static final int SUBMITTED = 2;
	
	protected String showStatus; /* 展示状态 */
	protected String filePath;
	String title;
	String startStopTime;
	String scorePower;
	String content;
	String email ;
	String stdName;
	private String name;
	 String classr;
	 String finalteacher;
	 String finaltd;
	String stdNum;
	String finalTeacher;//最终教师
	String finalTeam;//最终团队

	public String getClassr() {
		return classr;
	}

	public void setClassr(String classr) {
		this.classr = classr;
	}

	public String getFinalteacher() {
		return finalteacher;
	}

	public void setFinalteacher(String finalteacher) {
		this.finalteacher = finalteacher;
	}

	public String getFinaltd() {
		return finaltd;
	}

	public void setFinaltd(String finaltd) {
		this.finaltd = finaltd;
	}

	@Override
	public String getStdNum() {
		return stdNum;
	}

	@Override
	public void setStdNum(String stdNum) {
		this.stdNum = stdNum;
	}

	public String getFinalTeacher() {
		return finalTeacher;
	}
	public void setFinalTeacher(String finalTeacher) {
		this.finalTeacher = finalTeacher;
	}
	public String getFinalTeam() {
		return finalTeam;
	}
	public void setFinalTeam(String finalTeam) {
		this.finalTeam = finalTeam;
	}
	@Override
	public String getStdName() {
		return stdName;
	}
	@Override
	public void setStdName(String stdName) {
		this.stdName = stdName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getScorePower() {
		return scorePower;
	}
	public void setScorePower(String scorePower) {
		this.scorePower = scorePower;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStartStopTime() {
		return startStopTime;
	}
	public void setStartStopTime(String startStopTime) {
		this.startStopTime = startStopTime;
	}
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}


	public String getShowStatus() {
		return showStatus;
	}

	public void setShowStatus(String showStatus) {
		this.showStatus = showStatus;
	}
}
