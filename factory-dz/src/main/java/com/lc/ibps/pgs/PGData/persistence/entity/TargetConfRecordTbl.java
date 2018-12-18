package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_xyjxyzxwyhtlqkjl 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:10:51
 *</pre>
 */
 @SuppressWarnings("serial")
public class TargetConfRecordTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  time; 		/*时间*/
	protected String  committee; 		/*委员会*/
	protected String  content; 		/*内容*/
	protected String  result; 		/*结果*/
	protected String  remark; 		/*备注*/
	

	


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
	public void setTime(String time) 
	{
		this.time = time;
	}
	/**
	 * 返回 时间
	 * @return
	 */
	public String getTime() 
	{
		return this.time;
	}
	public void setCommittee(String committee) 
	{
		this.committee = committee;
	}
	/**
	 * 返回 委员会
	 * @return
	 */
	public String getCommittee() 
	{
		return this.committee;
	}
	public void setContent(String content) 
	{
		this.content = content;
	}
	/**
	 * 返回 内容
	 * @return
	 */
	public String getContent() 
	{
		return this.content;
	}
	public void setResult(String result) 
	{
		this.result = result;
	}
	/**
	 * 返回 结果
	 * @return
	 */
	public String getResult() 
	{
		return this.result;
	}
	public void setRemark(String remark) 
	{
		this.remark = remark;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getRemark() 
	{
		return this.remark;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("time", this.time) 
		.append("committee", this.committee) 
		.append("content", this.content) 
		.append("result", this.result) 
		.append("remark", this.remark) 
		.toString();
	}
}
