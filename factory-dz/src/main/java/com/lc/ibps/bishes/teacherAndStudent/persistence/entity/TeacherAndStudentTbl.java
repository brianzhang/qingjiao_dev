package com.lc.ibps.bishes.teacherAndStudent.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_tddsxs 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-26 21:39:04
 *</pre>
 */
 @SuppressWarnings("serial")
public class TeacherAndStudentTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  js; 		/*教师*/
	protected String  jsid; 		/*教师id*/
	protected String  team; 		/*教师所在团队*/
	protected String  teamId; 		/*教师所在团队id*/
	protected Long  amount; 		/*学生数目*/
	protected String  xs; 		/*学生*/
	protected String  teacherId; 		/*基层负责人id*/
	protected String  file; 		/*文件地址*/
	protected Date  uploadTime; 		/*上传日期*/
	protected String  wjm; 		/*文件名*/

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
	public void setJs(String js) 
	{
		this.js = js;
	}
	/**
	 * 返回 教师
	 * @return
	 */
	public String getJs() 
	{
		return this.js;
	}
	public void setJsid(String jsid) 
	{
		this.jsid = jsid;
	}
	/**
	 * 返回 教师id
	 * @return
	 */
	public String getJsid() 
	{
		return this.jsid;
	}
	public void setWjm(String wjm) 
	{
		this.wjm = wjm;
	}
	/**
	 * 返回  文件名
	 * @return
	 */
	public String getWjm() 
	{
		return this.wjm;
	}
	public void setTeam(String team) 
	{
		this.team = team;
	}
	/**
	 * 返回 教师所在团队
	 * @return
	 */
	public String getTeam() 
	{
		return this.team;
	}
	public void setTeamId(String teamId) 
	{
		this.teamId = teamId;
	}
	/**
	 * 返回 教师所在团队id
	 * @return
	 */
	public String getTeamId() 
	{
		return this.teamId;
	}
	public void setAmount(Long amount) 
	{
		this.amount = amount;
	}
	/**
	 * 返回 学生数目
	 * @return
	 */
	public Long getAmount() 
	{
		return this.amount;
	}
	public void setXs(String xs) 
	{
		this.xs = xs;
	}
	/**
	 * 返回 学生
	 * @return
	 */
	public String getXs() 
	{
		return this.xs;
	}
	public void setTeacherId(String teacherId) 
	{
		this.teacherId = teacherId;
	}
	/**
	 * 返回 教师员工号
	 * @return
	 */
	public String getTeacherId() 
	{
		return this.teacherId;
	}
	public void setFile(String file) 
	{
		this.file = file;
	}
	/**
	 * 返回 文件地址
	 * @return
	 */
	public String getFile() 
	{
		return this.file;
	}
	public void setUploadTime(Date uploadTime) 
	{
		this.uploadTime = uploadTime;
	}
	/**
	 * 返回 上传日期
	 * @return
	 */
	public Date getUploadTime() 
	{
		return this.uploadTime;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("js", this.js) 
		.append("jsid", this.jsid) 
		.append("team", this.team) 
		.append("teamId", this.teamId) 
		.append("amount", this.amount) 
		.append("xs", this.xs) 
		.append("teacherId", this.teacherId) 
		.append("file", this.file) 
		.append("uploadTime", this.uploadTime) 
		.toString();
	}
}
