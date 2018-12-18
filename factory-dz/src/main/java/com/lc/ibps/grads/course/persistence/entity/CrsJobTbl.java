package com.lc.ibps.grads.course.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_crs_job 表对象
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
public class CrsJobTbl extends AbstractPo<String> {
	protected String id; /* 主键 */
	protected String title; /* 作业标题 */
	protected String crsTchId; /* 授课码 */
	protected String startStopTime; /* 起止时间 */
	protected int status; /* 状态 */
	protected String content; /* 备注 */
	protected String createdTime; /* 创建时间 */
	protected float scorePower; /* 分值 */
	protected int isTrans; /* 分数是否折合 */
	protected int category; /* 性质 */
	protected int tchNd; /**/
	protected int stdNd; /**/
	protected int tchFnsh; /**/
	protected int stdFnsh; /**/
	protected int tchAllFnsh; /**/
	protected int stdAllFnsh; /**/
	protected String modelFile;
	protected int unSubmitNum;
	protected int submitNum;

	public int getSubmitNum() {
		return submitNum;
	}

	public void setSubmitNum(int submitNum) {
		this.submitNum = submitNum;
	}

	public int getUnSubmitNum() {
		return unSubmitNum;
	}

	public void setUnSubmitNum(int unSubmitNum) {
		this.unSubmitNum = unSubmitNum;
	}

	public String getModelFile() {
		return modelFile;
	}

	public void setModelFile(String modelFile) {
		this.modelFile = modelFile;
	}

	public int getTchAllFnsh() {
		return tchAllFnsh;
	}

	public void setTchAllFnsh(int tchAllFnsh) {
		this.tchAllFnsh = tchAllFnsh;
	}

	public int getStdAllFnsh() {
		return stdAllFnsh;
	}

	public void setStdAllFnsh(int stdAllFnsh) {
		this.stdAllFnsh = stdAllFnsh;
	}

	public int getTchNd() {
		return tchNd;
	}

	public void setTchNd(int tchNd) {
		this.tchNd = tchNd;
	}

	public int getStdNd() {
		return stdNd;
	}

	public void setStdNd(int stdNd) {
		this.stdNd = stdNd;
	}

	public int getTchFnsh() {
		return tchFnsh;
	}

	public void setTchFnsh(int tchFnsh) {
		this.tchFnsh = tchFnsh;
	}

	public int getStdFnsh() {
		return stdFnsh;
	}

	public void setStdFnsh(int stdFnsh) {
		this.stdFnsh = stdFnsh;
	}

	protected Date updateTime; /* 性质 */

	public String getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}

	@Override
	public Date getUpdateTime() {
		return updateTime;
	}

	@Override
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public int getCategory() {
		return category;
	}

	public void setCategory(int category) {
		this.category = category;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}

	public int getIsTrans() {
		return isTrans;
	}

	public void setIsTrans(int isTrans) {
		this.isTrans = isTrans;
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

	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * 返回 作业标题
	 * 
	 * @return
	 */
	public String getTitle() {
		return this.title;
	}

	public void setCrsTchId(String crsTchId) {
		this.crsTchId = crsTchId;
	}

	/**
	 * 返回 授课码
	 * 
	 * @return
	 */
	public String getCrsTchId() {
		return this.crsTchId;
	}

	public void setStartStopTime(String startStopTime) {
		this.startStopTime = startStopTime;
	}

	/**
	 * 返回 起止时间
	 * 
	 * @return
	 */
	public String getStartStopTime() {
		return this.startStopTime;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * 返回 状态
	 * 
	 * @return
	 */
	public int getStatus() {
		return this.status;
	}

	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * 返回 备注
	 * 
	 * @return
	 */
	public String getContent() {
		return this.content;
	}

	public void setScorePower(float scorePower) {
		this.scorePower = scorePower;
	}

	/**
	 * 返回 分值
	 * 
	 * @return
	 */
	public float getScorePower() {
		return this.scorePower;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return new ToStringBuilder(this).append("id", this.id).append("title", this.title)
				.append("crsTchId", this.crsTchId).append("startStopTime", this.startStopTime)
				.append("status", this.status).append("content", this.content).append("scorePower", this.scorePower)
				.toString();
	}
}
