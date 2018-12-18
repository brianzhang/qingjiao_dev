package com.lc.ibps.grads.course.persistence.entity;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_course_param_modal 表对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
 @SuppressWarnings("serial")
public class CourseParamModalTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  name; 		/*分值模板名称*/
	protected String  param; 		/*分值参数*/

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
	public void setName(String name) 
	{
		this.name = name;
	}
	/**
	 * 返回 分值模板名称
	 * @return
	 */
	@Override
	public String getName() 
	{
		return this.name;
	}
	public void setParam(String param) 
	{
		this.param = param;
	}
	/**
	 * 返回 分值参数
	 * @return
	 */
	public String getParam() 
	{
		return this.param;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("name", this.name) 
		.append("param", this.param) 
		.toString();
	}
}
