package com.lc.ibps.pgs.PGData.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_p_kcdcdhlxpj 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsAchieveTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected Date  createTime; 		/*创建时间*/
	protected String  result1; 		/*合理*/
	protected String  principle1; 		/*负责人*/
	protected String  normative; 		/*规范性*/
	protected String  integrity; 		/*完整性*/
	protected String  analyze1; 		/*试卷分析*/
	protected String  analyze2; 		/*课程分析*/
	protected String  remark; 		/*备注*/
	protected String  manager; 		/*管理人员*/
	protected String  result2; 		/*判定结果*/
	protected String  opinion; 		/*整改意见*/
	protected String  principle2; 		/*负责人*/
	protected String  cover; 		/*覆盖*/
	protected String  crs_id;
	public String getCrs_id() {
		return crs_id;
	}
	public void setCrs_id(String crs_id) {
		this.crs_id = crs_id;
	}
	protected String  json; 		/*调查问卷json字段*/

	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
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
	public void setResult1(String result1) 
	{
		this.result1 = result1;
	}
	/**
	 * 返回 合理
	 * @return
	 */
	public String getResult1() 
	{
		return this.result1;
	}
	public void setPrinciple1(String principle1) 
	{
		this.principle1 = principle1;
	}
	/**
	 * 返回 负责人
	 * @return
	 */
	public String getPrinciple1() 
	{
		return this.principle1;
	}
	public void setNormative(String normative) 
	{
		this.normative = normative;
	}
	/**
	 * 返回 规范性
	 * @return
	 */
	public String getNormative() 
	{
		return this.normative;
	}
	public void setIntegrity(String integrity) 
	{
		this.integrity = integrity;
	}
	/**
	 * 返回 完整性
	 * @return
	 */
	public String getIntegrity() 
	{
		return this.integrity;
	}
	public void setAnalyze1(String analyze1) 
	{
		this.analyze1 = analyze1;
	}
	/**
	 * 返回 试卷分析
	 * @return
	 */
	public String getAnalyze1() 
	{
		return this.analyze1;
	}
	public void setAnalyze2(String analyze2) 
	{
		this.analyze2 = analyze2;
	}
	/**
	 * 返回 课程分析
	 * @return
	 */
	public String getAnalyze2() 
	{
		return this.analyze2;
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
	public void setManager(String manager) 
	{
		this.manager = manager;
	}
	/**
	 * 返回 管理人员
	 * @return
	 */
	public String getManager() 
	{
		return this.manager;
	}
	public void setResult2(String result2) 
	{
		this.result2 = result2;
	}
	/**
	 * 返回 判定结果
	 * @return
	 */
	public String getResult2() 
	{
		return this.result2;
	}
	public void setOpinion(String opinion) 
	{
		this.opinion = opinion;
	}
	/**
	 * 返回 整改意见
	 * @return
	 */
	public String getOpinion() 
	{
		return this.opinion;
	}
	public void setPrinciple2(String principle2) 
	{
		this.principle2 = principle2;
	}
	/**
	 * 返回 负责人
	 * @return
	 */
	public String getPrinciple2() 
	{
		return this.principle2;
	}
	public void setCover(String cover) 
	{
		this.cover = cover;
	}
	/**
	 * 返回 覆盖
	 * @return
	 */
	public String getCover() 
	{
		return this.cover;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
		.append("result1", this.result1) 
		.append("principle1", this.principle1) 
		.append("normative", this.normative) 
		.append("integrity", this.integrity) 
		.append("analyze1", this.analyze1) 
		.append("analyze2", this.analyze2) 
		.append("remark", this.remark) 
		.append("manager", this.manager) 
		.append("result2", this.result2) 
		.append("opinion", this.opinion) 
		.append("principle2", this.principle2) 
		.append("cover", this.cover) 
		.toString();
	}
}
