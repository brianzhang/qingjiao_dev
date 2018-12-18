package com.lc.ibps.grads.course.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_job_std 表对象
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 * </pre>
 */
@SuppressWarnings("serial")
public class JobStdTbl extends AbstractPo<String> {
	protected String id; /* 主键 */
	protected String jobid; /* 作业ID */
	protected String stdNum; /* 学号 */
	protected String file; /* 学生作业文件 */
	protected String actionTime; /* 响应时间 */
	protected String reviewTime; /* 评阅时间 */
	protected String reviewStatus; /* 评阅状态 */
	protected String file_id_;
	protected String comment;
	protected String json;
	
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}

	protected String stdName; /* 姓名 */
	public String getStdName() {
		return stdName;
	}
	public void setStdName(String stdName) {
		this.stdName = stdName;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getFile_id_() {
		return file_id_;
	}
	public void setFile_id_(String file_id_) {
		this.file_id_ = file_id_;
	}
	public String getReviewStatus() {
		return reviewStatus;
	}
	public void setReviewStatus(String reviewStatus) {
		this.reviewStatus = reviewStatus;
	}
	public String getActionTime() {
		return actionTime;
	}
	public void setActionTime(String actionTime) {
		this.actionTime = actionTime;
	}
	public String getReviewTime() {
		return reviewTime;
	}
	public void setReviewTime(String reviewTime) {
		this.reviewTime = reviewTime;
	}

	protected float score; /* 作业成绩 */
	protected int status; /* 完成状态 */
	public static String[] parseFile(String str){
		String[] res = new String[2];
		String[] t=str.replaceAll("[\\[\\]\"{}]", "").split(",");
		res[0]=t[0].split(":")[1];
		res[1]=t[1].split(":")[1];
		return res;
	}
	@Override
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 返回 主键
	 * 
	 * @return
	 */
	@Override
	public String getId() {
		return this.id;
	}

	public void setJobid(String jobid) {
		this.jobid = jobid;
	}

	/**
	 * 返回 作业ID
	 * 
	 * @return
	 */
	public String getJobid() {
		return this.jobid;
	}

	public void setStdNum(String stdNum) {
		this.stdNum = stdNum;
	}

	/**
	 * 返回 学号
	 * 
	 * @return
	 */
	public String getStdNum() {
		return this.stdNum;
	}

	public void setFile(String file) {
		this.file = file;
	}

	/**
	 * 返回 学生作业文件
	 * 
	 * @return
	 */
	public String getFile() {
		return this.file;
	}

	public void setFileUploadTime(String fileUploadTime) {
		this.actionTime = fileUploadTime;
	}

	/**
	 * 返回 文件上传时间
	 * 
	 * @return
	 */
	public String getFileUploadTime() {
		return this.actionTime;
	}

	public void setScore(float score) {
		this.score = score;
	}

	/**
	 * 返回 作业成绩
	 * 
	 * @return
	 */
	public float getScore() {
		return this.score;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * 返回 完成状态
	 * 
	 * @return
	 */
	public int getStatus() {
		return this.status;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return new ToStringBuilder(this).append("id", this.id).append("jobid", this.jobid).append("stdNum", this.stdNum)
				.append("file", this.file).append("fileUploadTime", this.actionTime).append("score", this.score)
				.append("status", this.status).toString();
	}
}
