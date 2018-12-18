package com.lc.ibps.pgs.Report.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_bkkcjxjdb 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:13
 *</pre>
 */
 @SuppressWarnings("serial")
public class JxjdTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  crs_id; 		/*课程编号*/
	protected String  crs_name; 		/*课程名称*/
	public String getCrs_name() {
		return crs_name;
	}
	public void setCrs_name(String crs_name) {
		this.crs_name = crs_name;
	}
	protected String  crs_unit; 		/*开课单位*/
	protected String  teachinghours; 		/*教学学时*/
	protected String  teachingcontent; 		/*教学内容*/
	protected String  remark; 		/*说明*/
	protected String  author; 		/*撰写人*/
	protected String  sign; 		/*院系教学院长签字*/

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
	public void setCrs_id(String crs_id) 
	{
		this.crs_id = crs_id;
	}
	/**
	 * 返回 课程编号
	 * @return
	 */
	public String getCrs_id() 
	{
		return this.crs_id;
	}
	public void setCrs_unit(String crs_unit) 
	{
		this.crs_unit = crs_unit;
	}
	/**
	 * 返回 开课单位
	 * @return
	 */
	public String getCrs_unit() 
	{
		return this.crs_unit;
	}
	public void setTeachinghours(String teachinghours) 
	{
		this.teachinghours = teachinghours;
	}
	/**
	 * 返回 教学学时
	 * @return
	 */
	public String getTeachinghours() 
	{
		return this.teachinghours;
	}
	public void setTeachingcontent(String teachingcontent) 
	{
		this.teachingcontent = teachingcontent;
	}
	/**
	 * 返回 教学内容
	 * @return
	 */
	public String getTeachingcontent() 
	{
		return this.teachingcontent;
	}
	public void setRemark(String remark) 
	{
		this.remark = remark;
	}
	/**
	 * 返回 说明
	 * @return
	 */
	public String getRemark() 
	{
		return this.remark;
	}
	public void setAuthor(String author) 
	{
		this.author = author;
	}
	/**
	 * 返回 撰写人
	 * @return
	 */
	public String getAuthor() 
	{
		return this.author;
	}
	public void setSign(String sign) 
	{
		this.sign = sign;
	}
	/**
	 * 返回 院系教学院长签字
	 * @return
	 */
	public String getSign() 
	{
		return this.sign;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("crs_id", this.crs_id) 
		.append("crs_unit", this.crs_unit) 
		.append("teachinghours", this.teachinghours) 
		.append("teachingcontent", this.teachingcontent) 
		.append("remark", this.remark) 
		.append("author", this.author) 
		.append("sign", this.sign) 
		.toString();
	}
}
