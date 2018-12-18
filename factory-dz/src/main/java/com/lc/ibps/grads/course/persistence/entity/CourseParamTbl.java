package com.lc.ibps.grads.course.persistence.entity;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;
@SuppressWarnings("serial")
public class CourseParamTbl extends AbstractPo<String> {
	protected String  id; 					/*主键*/
	protected String  name; 				/*名称*/
	protected String  scorePower; 		/*分值*/
	protected String  startWeek; 		/*第几周开始*/
	protected String  startDay; 			/*周几开始*/
	protected String  startTime; 		/*开始时间*/
	protected String  cycle; 				/*作业周期*/
	protected String  period; 				/*作业持续时长*/
	protected String  count; 				/*数量*/
	protected int  isTrans; 		/*分数是否折合*/
	protected int  category; 		/*性质*/
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
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
	@Override
	public String getName() {
		return name;
	}
	@Override
	public void setName(String name) {
		this.name = name;
	}
	public String getScorePower() {
		return scorePower;
	}
	public void setScorePower(String scorePower) {
		this.scorePower = scorePower;
	}
	public String getStartWeek() {
		return startWeek;
	}
	public void setStartWeek(String startWeek) {
		this.startWeek = startWeek;
	}
	public String getStartDay() {
		return startDay;
	}
	public void setStartDay(String startDay) {
		this.startDay = startDay;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getCycle() {
		return cycle;
	}
	public void setCycle(String cycle) {
		this.cycle = cycle;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public int getIsTrans() {
		return isTrans;
	}
	public void setIsTrans(int isTrans) {
		this.isTrans = isTrans;
	}
}
