package com.lc.ibps.grads.course.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 违规操作表 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
 @SuppressWarnings("serial")
public class IllegalTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  userid; 		/*用户id*/
	protected String  stdNum; 		/*学号*/
	protected String  name; 		/*姓名*/
	protected Date  createTime; 		/*操作时间*/

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
	public void setUserid(String userid) 
	{
		this.userid = userid;
	}
	/**
	 * 返回 用户id
	 * @return
	 */
	public String getUserid() 
	{
		return this.userid;
	}
	public void setStdNum(String stdNum) 
	{
		this.stdNum = stdNum;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getStdNum() 
	{
		return this.stdNum;
	}
	@Override
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 姓名
	 * @return
	 */
	@Override
	public String getName() 
	{
		return this.name;
	}
	@Override
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 操作时间
	 * @return
	 */
	@Override
	public Date getCreateTime() 
	{
		return this.createTime;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("userid", this.userid) 
		.append("stdNum", this.stdNum) 
		.append("name", this.name) 
		.append("createTime", this.createTime) 
		.toString();
	}
}
