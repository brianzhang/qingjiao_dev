package com.lc.ibps.loans.files.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_file 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
 @SuppressWarnings("serial")
public class FileTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  name; 		/*文件名*/
	protected String  filePath; 		/*文件地址*/
	protected String  jdid; 		/*借贷id*/
	protected String  viewer; 		/*viewer*/
	protected String  uploader; 		/*uploader*/
	protected String  time; 		/*上传日期*/

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
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 文件名
	 * @return
	 */
	public String getName() 
	{
		return this.name;
	}
	public void setFilePath(String filePath) 
	{
		this.filePath = filePath;
	}
	/**
	 * 返回 文件地址
	 * @return
	 */
	public String getFilePath() 
	{
		return this.filePath;
	}
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷id
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	public void setViewer(String viewer) 
	{
		this.viewer = viewer;
	}
	/**
	 * 返回 viewer
	 * @return
	 */
	public String getViewer() 
	{
		return this.viewer;
	}
	public void setUploader(String uploader) 
	{
		this.uploader = uploader;
	}
	/**
	 * 返回 uploader
	 * @return
	 */
	public String getUploader() 
	{
		return this.uploader;
	}
	public void setTime(String time) 
	{
		this.time = time;
	}
	/**
	 * 返回 上传日期
	 * @return
	 */
	public String getTime() 
	{
		return this.time;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("name", this.name) 
		.append("filePath", this.filePath) 
		.append("jdid", this.jdid) 
		.append("viewer", this.viewer) 
		.append("uploader", this.uploader) 
		.append("time", this.time) 
		.toString();
	}
}
