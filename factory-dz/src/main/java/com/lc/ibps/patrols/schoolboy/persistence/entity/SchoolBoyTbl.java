package com.lc.ibps.patrols.schoolboy.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_schoolboy 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 12:03:02
 *</pre>
 */
 @SuppressWarnings("serial")
public class SchoolBoyTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  name; 		/*姓名*/
	protected Date  startTime; 		/*入学时间*/
	protected Date  finishTime; 		/*毕业时间*/
	protected String  classJob; 		/*班级职务*/
	protected String  teacher; 		/*班主任*/
	protected String  highSchool; 		/*高中*/
	protected String  daXue; 		/*大学*/
	protected String  job; 		/*工作单位*/
	protected String  atSchool; 		/*个人在校照片*/
	protected String  jinZhao; 		/*近照*/
	protected String  biYeZhao; 		/*毕业照*/
	protected String  geRenRongYu; 		/*个人荣誉*/

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
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 姓名
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setStartTime(Date startTime) 
	{
		this.startTime = startTime;
	}
	/**
	 * 返回 入学时间
	 * @return
	 */
	public Date getStartTime() 
	{
		return this.startTime;
	}
	public void setFinishTime(Date finishTime) 
	{
		this.finishTime = finishTime;
	}
	/**
	 * 返回 毕业时间
	 * @return
	 */
	public Date getFinishTime() 
	{
		return this.finishTime;
	}
	public void setClassJob(String classJob) 
	{
		this.classJob = classJob;
	}
	/**
	 * 返回 班级职务
	 * @return
	 */
	public String getClassJob() 
	{
		return this.classJob;
	}
	public void setTeacher(String teacher) 
	{
		this.teacher = teacher;
	}
	/**
	 * 返回 班主任
	 * @return
	 */
	public String getTeacher() 
	{
		return this.teacher;
	}
	public void setHighSchool(String highSchool) 
	{
		this.highSchool = highSchool;
	}
	/**
	 * 返回 高中
	 * @return
	 */
	public String getHighSchool() 
	{
		return this.highSchool;
	}
	public void setDaXue(String daXue) 
	{
		this.daXue = daXue;
	}
	/**
	 * 返回 大学
	 * @return
	 */
	public String getDaXue() 
	{
		return this.daXue;
	}
	public void setJob(String job) 
	{
		this.job = job;
	}
	/**
	 * 返回 工作单位
	 * @return
	 */
	public String getJob() 
	{
		return this.job;
	}
	public void setAtSchool(String atSchool) 
	{
		this.atSchool = atSchool;
	}
	/**
	 * 返回 个人在校照片
	 * @return
	 */
	public String getAtSchool() 
	{
		return this.atSchool;
	}
	public void setJinZhao(String jinZhao) 
	{
		this.jinZhao = jinZhao;
	}
	/**
	 * 返回 近照
	 * @return
	 */
	public String getJinZhao() 
	{
		return this.jinZhao;
	}
	public void setBiYeZhao(String biYeZhao) 
	{
		this.biYeZhao = biYeZhao;
	}
	/**
	 * 返回 毕业照
	 * @return
	 */
	public String getBiYeZhao() 
	{
		return this.biYeZhao;
	}
	public void setGeRenRongYu(String geRenRongYu) 
	{
		this.geRenRongYu = geRenRongYu;
	}
	/**
	 * 返回 个人荣誉
	 * @return
	 */
	public String getGeRenRongYu() 
	{
		return this.geRenRongYu;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("name", this.name) 
		.append("startTime", this.startTime) 
		.append("finishTime", this.finishTime) 
		.append("classJob", this.classJob) 
		.append("teacher", this.teacher) 
		.append("highSchool", this.highSchool) 
		.append("daXue", this.daXue) 
		.append("job", this.job) 
		.append("atSchool", this.atSchool) 
		.append("jinZhao", this.jinZhao) 
		.append("biYeZhao", this.biYeZhao) 
		.append("geRenRongYu", this.geRenRongYu) 
		.toString();
	}
}
