package com.lc.ibps.bishes.oldFile.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_oldfile 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:22
 *</pre>
 */
 @SuppressWarnings("serial")
public class OldFileTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  xh; 		/*学号*/
	protected String  filecategory; 		/*文件类别*/
	protected String  fileid; 		/*文件id*/
	protected String  fileVersion; 		/*文件版本*/
	protected Date  createTime; 		/*创建时间*/
	protected String comment;    /*评语或者备注*/


	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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
	public void setXh(String xh) 
	{
		this.xh = xh;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getXh() 
	{
		return this.xh;
	}
	public void setFilecategory(String filecategory) 
	{
		this.filecategory = filecategory;
	}
	/**
	 * 返回 文件类别
	 * @return
	 */
	public String getFilecategory() 
	{
		return this.filecategory;
	}
	public void setFileid(String fileid) 
	{
		this.fileid = fileid;
	}
	/**
	 * 返回 文件id
	 * @return
	 */
	public String getFileid() 
	{
		return this.fileid;
	}
	public void setFileVersion(String fileVersion) 
	{
		this.fileVersion = fileVersion;
	}
	/**
	 * 返回 文件版本
	 * @return
	 */
	public String getFileVersion() 
	{
		return this.fileVersion;
	}
	@Override
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * 返回 创建时间
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
		.append("xh", this.xh) 
		.append("filecategory", this.filecategory) 
		.append("fileid", this.fileid) 
		.append("fileVersion", this.fileVersion) 
		.append("createTime", this.createTime)
		.append("comment", this.comment)
		.toString();
	}
}
