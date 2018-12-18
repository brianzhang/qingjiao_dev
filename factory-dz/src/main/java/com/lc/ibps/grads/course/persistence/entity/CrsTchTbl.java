package com.lc.ibps.grads.course.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_crs_tch 表对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:11:13
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsTchTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  tchNum; 		/*教师编号*/

	protected String  crsNum; 		/*课程编号*/
	protected String  term; 		/*授课学期*/
	protected String  time; 		/*授课时间*/
	protected String  location; 		/*上课地点*/
	protected String  clazz; 		/*授课班级*/
	protected String  paramid; 		/*分值模板id*/
	protected String  startTime; 		/*开课时间*/

	protected String  uniManage;    //院系统一管理





	
	public String getUniManage() {
		return uniManage;
	}
	public void setUniManage(String uniManage) {
		this.uniManage = uniManage;
	}
	public String getTerm() {
		return term;
	}
	public void setTerm(String term) {
		this.term = term;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getParamid() {
		return paramid;
	}
	public void setParamid(String paramid) {
		this.paramid = paramid;
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
	public void setTchNum(String tchNum) 
	{
		this.tchNum = tchNum;
	}
	/**
	 * 返回 教师编号
	 * @return
	 */
	public String getTchNum() 
	{
		return this.tchNum;
	}
	public void setCrsNum(String crsNum) 
	{
		this.crsNum = crsNum;
	}
	/**
	 * 返回 课程编号
	 * @return
	 */
	public String getCrsNum() 
	{
		return this.crsNum;
	}
	public void setTime(String time) 
	{
		this.time = time;
	}
	/**
	 * 返回 授课时间
	 * @return
	 */
	public String getTime() 
	{
		return this.time;
	}
	public void setLocation(String location) 
	{
		this.location = location;
	}
	/**
	 * 返回 上课地点
	 * @return
	 */
	public String getLocation() 
	{
		return this.location;
	}
	public void setClazz(String clazz) 
	{
		this.clazz = clazz;
	}
	/**
	 * 返回 授课班级
	 * @return
	 */
	public String getClazz() 
	{
		return this.clazz;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("tchNum", this.tchNum) 
		.append("crsNum", this.crsNum) 
		.append("time", this.time) 
		.append("location", this.location) 
		.append("clazz", this.clazz) 
		.toString();
	}
}
