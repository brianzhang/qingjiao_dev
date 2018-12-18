package com.lc.ibps.grads.paper.persistence.entity;


import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 我的论文表单 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：xubaocheng
 * 邮箱地址：100000000000@qq.com
 * 创建时间：2017-05-19 12:27:00
 *</pre>
 */
 @SuppressWarnings("serial")
public class MyPaperTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  title; 		/*题目*/
	protected String  stunum; 		/*学号*/
	protected String  stuname; 		/*学生姓名*/
	protected String  ptcomment; 		/*评阅教师评语*/
	protected String  ptreviewfid; 		/*评阅教师批阅文件ID*/
	protected String  ttreviewfid; 		/*指导教师批阅文件ID*/
	protected String  stupppfid; 		/*学生评阅论文文件ID*/
	protected String  ptdowntime; 		/*评阅教师下载学生论文时间*/
	protected Long  ttidea; 		/*指导教师评审意见*/
	protected String  stupptuptime; 		/*学生答辩ppt上传时间*/
	protected String  ttnum; 		/*指导教师工号*/
	protected String  stuteam; 		/*学生所属团队*/
	protected String  pfileuptime; 		/*学生评阅文件上传时间*/
	protected String  location; 		/*地点*/
	protected String  ptptime; 		/*评阅教师评阅时间*/
	protected String  ttreviewuptime; 		/*指导教师批阅文件上传时间*/
	protected String  subject; 		/*班级*/
	protected String  stuppfid; 		/*学生论文文件ID*/
	protected String  ttcomment; 		/*指导教师评审评语*/
	protected String  ttdowntime; 		/*指导教师下载学生论文时间*/
	protected String  stupptime; 		/*学生论文上传时间*/
	protected Long  ptidea; 		/*评阅教师意见*/
	protected String  ptreviewuptime; 		/*评阅教师批阅文件上传时间*/
	protected String  stupptfid; 		/*学生答辩ppt文件ID*/
	protected String  ttreviewtime; 		/*指导教师评审时间*/
	protected String  college; 		/*所属学院*/
	protected String  titlesrc; 		/*题目来源*/
	protected String  titletype; 		/*题目类型*/
	protected String  ttposition; 		/*指导教师职称*/
	protected String  ptnum; 		/*评阅教师工号*/
	protected String  remarks; 		/*备注*/

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
	public void setTitle(String title) 
	{
		this.title = title;
	}
	/**
	 * 返回 题目
	 * @return
	 */
	public String getTitle() 
	{
		return this.title;
	}
	
	public String getStuname() {
		return stuname;
	}
	public void setStuname(String stuname) {
		this.stuname = stuname;
	}
	public void setStunum(String stunum) 
	{
		this.stunum = stunum;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getStunum() 
	{
		return this.stunum;
	}
	public void setPtcomment(String ptcomment) 
	{
		this.ptcomment = ptcomment;
	}
	/**
	 * 返回 评阅教师评语
	 * @return
	 */
	public String getPtcomment() 
	{
		return this.ptcomment;
	}
	public void setPtreviewfid(String ptreviewfid) 
	{
		this.ptreviewfid = ptreviewfid;
	}
	/**
	 * 返回 评阅教师批阅文件ID
	 * @return
	 */
	public String getPtreviewfid() 
	{
		return this.ptreviewfid;
	}
	public void setTtreviewfid(String ttreviewfid) 
	{
		this.ttreviewfid = ttreviewfid;
	}
	/**
	 * 返回 指导教师批阅文件ID
	 * @return
	 */
	public String getTtreviewfid() 
	{
		return this.ttreviewfid;
	}
	public void setStupppfid(String stupppfid) 
	{
		this.stupppfid = stupppfid;
	}
	/**
	 * 返回 学生评阅论文文件ID
	 * @return
	 */
	public String getStupppfid() 
	{
		return this.stupppfid;
	}
	public void setPtdowntime(String ptdowntime) 
	{
		this.ptdowntime = ptdowntime;
	}
	/**
	 * 返回 评阅教师下载学生论文时间
	 * @return
	 */
	public String getPtdowntime() 
	{
		return this.ptdowntime;
	}
	public void setTtidea(Long ttidea) 
	{
		this.ttidea = ttidea;
	}
	/**
	 * 返回 指导教师评审意见
	 * @return
	 */
	public Long getTtidea() 
	{
		return this.ttidea;
	}
	public void setStupptuptime(String stupptuptime) 
	{
		this.stupptuptime = stupptuptime;
	}
	/**
	 * 返回 学生答辩ppt上传时间
	 * @return
	 */
	public String getStupptuptime() 
	{
		return this.stupptuptime;
	}
	public void setTtnum(String ttnum) 
	{
		this.ttnum = ttnum;
	}
	/**
	 * 返回 指导教师工号
	 * @return
	 */
	public String getTtnum() 
	{
		return this.ttnum;
	}
	public void setStuteam(String stuteam) 
	{
		this.stuteam = stuteam;
	}
	/**
	 * 返回 学生所属团队
	 * @return
	 */
	public String getStuteam() 
	{
		return this.stuteam;
	}
	public void setPfileuptime(String dateTime) 
	{
		this.pfileuptime = dateTime;
	}
	/**
	 * 返回 学生评阅文件上传时间
	 * @return
	 */
	public String getPfileuptime() 
	{
		return this.pfileuptime;
	}
	public void setLocation(String location) 
	{
		this.location = location;
	}
	/**
	 * 返回 地点
	 * @return
	 */
	public String getLocation() 
	{
		return this.location;
	}
	public void setPtptime(String ptptime) 
	{
		this.ptptime = ptptime;
	}
	/**
	 * 返回 评阅教师评阅时间
	 * @return
	 */
	public String getPtptime() 
	{
		return this.ptptime;
	}
	public void setTtreviewuptime(String ttreviewuptime) 
	{
		this.ttreviewuptime = ttreviewuptime;
	}
	/**
	 * 返回 指导教师批阅文件上传时间
	 * @return
	 */
	public String getTtreviewuptime() 
	{
		return this.ttreviewuptime;
	}
	public void setSubject(String subject) 
	{
		this.subject = subject;
	}
	/**
	 * 返回 班级
	 * @return
	 */
	public String getSubject() 
	{
		return this.subject;
	}
	public void setStuppfid(String stuppfid) 
	{
		this.stuppfid = stuppfid;
	}
	/**
	 * 返回 学生论文文件ID
	 * @return
	 */
	public String getStuppfid() 
	{
		return this.stuppfid;
	}
	public void setTtcomment(String ttcomment) 
	{
		this.ttcomment = ttcomment;
	}
	/**
	 * 返回 指导教师评审评语
	 * @return
	 */
	public String getTtcomment() 
	{
		return this.ttcomment;
	}
	public void setTtdowntime(String ttdowntime) 
	{
		this.ttdowntime = ttdowntime;
	}
	/**
	 * 返回 指导教师下载学生论文时间
	 * @return
	 */
	public String getTtdowntime() 
	{
		return this.ttdowntime;
	}
	public void setStupptime(String dateTime) 
	{
		this.stupptime = dateTime;
	}
	/**
	 * 返回 学生论文上传时间
	 * @return
	 */
	public String getStupptime() 
	{
		return this.stupptime;
	}
	public void setPtidea(Long ptidea) 
	{
		this.ptidea = ptidea;
	}
	/**
	 * 返回 评阅教师意见
	 * @return
	 */
	public Long getPtidea() 
	{
		return this.ptidea;
	}
	public void setPtreviewuptime(String ptreviewuptime) 
	{
		this.ptreviewuptime = ptreviewuptime;
	}
	/**
	 * 返回 评阅教师批阅文件上传时间
	 * @return
	 */
	public String getPtreviewuptime() 
	{
		return this.ptreviewuptime;
	}
	public void setStupptfid(String stupptfid) 
	{
		this.stupptfid = stupptfid;
	}
	/**
	 * 返回 学生答辩ppt文件ID
	 * @return
	 */
	public String getStupptfid() 
	{
		return this.stupptfid;
	}
	public void setTtreviewtime(String ttreviewtime) 
	{
		this.ttreviewtime = ttreviewtime;
	}
	/**
	 * 返回 指导教师评审时间
	 * @return
	 */
	public String getTtreviewtime() 
	{
		return this.ttreviewtime;
	}
	public void setCollege(String college) 
	{
		this.college = college;
	}
	/**
	 * 返回 所属学院
	 * @return
	 */
	public String getCollege() 
	{
		return this.college;
	}
	public void setTitlesrc(String titlesrc) 
	{
		this.titlesrc = titlesrc;
	}
	/**
	 * 返回 题目来源
	 * @return
	 */
	public String getTitlesrc() 
	{
		return this.titlesrc;
	}
	public void setTitletype(String titletype) 
	{
		this.titletype = titletype;
	}
	/**
	 * 返回 题目类型
	 * @return
	 */
	public String getTitletype() 
	{
		return this.titletype;
	}
	public void setTtposition(String ttposition) 
	{
		this.ttposition = ttposition;
	}
	/**
	 * 返回 指导教师职称
	 * @return
	 */
	public String getTtposition() 
	{
		return this.ttposition;
	}
	public void setPtnum(String ptnum) 
	{
		this.ptnum = ptnum;
	}
	/**
	 * 返回 评阅教师工号
	 * @return
	 */
	public String getPtnum() 
	{
		return this.ptnum;
	}
	public void setRemarks(String remarks) 
	{
		this.remarks = remarks;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getRemarks() 
	{
		return this.remarks;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("title", this.title) 
		.append("stunum", this.stunum) 
		.append("ptcomment", this.ptcomment) 
		.append("ptreviewfid", this.ptreviewfid) 
		.append("ttreviewfid", this.ttreviewfid) 
		.append("stupppfid", this.stupppfid) 
		.append("ptdowntime", this.ptdowntime) 
		.append("ttidea", this.ttidea) 
		.append("stupptuptime", this.stupptuptime) 
		.append("ttnum", this.ttnum) 
		.append("stuteam", this.stuteam) 
		.append("pfileuptime", this.pfileuptime) 
		.append("location", this.location) 
		.append("ptptime", this.ptptime) 
		.append("ttreviewuptime", this.ttreviewuptime) 
		.append("subject", this.subject) 
		.append("stuppfid", this.stuppfid) 
		.append("ttcomment", this.ttcomment) 
		.append("ttdowntime", this.ttdowntime) 
		.append("stupptime", this.stupptime) 
		.append("ptidea", this.ptidea) 
		.append("ptreviewuptime", this.ptreviewuptime) 
		.append("stupptfid", this.stupptfid) 
		.append("ttreviewtime", this.ttreviewtime) 
		.append("college", this.college) 
		.append("titlesrc", this.titlesrc) 
		.append("titletype", this.titletype) 
		.append("ttposition", this.ttposition) 
		.append("ptnum", this.ptnum) 
		.append("remarks", this.remarks) 
		.toString();
	}
}
