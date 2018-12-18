package com.lc.ibps.pgs.Crsoutline.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_t_crs_outline 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsoutlineTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
//	protected Date  createTime; 		/*创建时间*/
//	protected String  crsNum; 		/*课程编号*/
//	protected String  crs_ch_name; 		/*中文名称*/
	
	protected String  num; 		/*英文名称*/
	protected String  name; 		/*课程性质*/
	protected String  period; 		/*开课专业*/
	protected String  credit;
	
	protected String  crs_en_name; 		/*英文名称*/
	protected String  crs_properties; 		/*课程性质*/
	protected String  crs_major; 		/*开课专业*/
	protected String  crs_term; 		/*开课学期*/
	protected String  crs_aim; 		/*课程目标*/
	protected String  tch_claim; 		/*教学基本要求*/
	protected String  tch_con_hours; 		/*教学内容与学时分配*/
	protected String  tch_method; 		/*教学方法及手段*/
	protected String  exp_con; 		/*实验或上机内容*/
	protected String  pre_crs; 		/*前续课程*/
	protected String  fliow_crs; 		/*后续课程*/
	protected String  crs_refer; 		/*参考教材及学习资源*/
	protected String  assess_way; 		/*考核方式*/
	protected String  tch_base_demand; 		/*教学基本要求项*/
	protected String  exam_type; 		/*考核形式*/
	protected String  power_ratio; 		/*占总成绩的比例*/
	protected String  tch_base_demand_1; 		/*教学基本要求项_1*/
	protected String  tch_base_demand_2; 		/*教学基本要求项_2*/
	protected String  exam_type_1; 		/*考核方式_1*/
	protected String  exam_type_2; 		/*考核方式_2*/
	protected String  power_ratio_1; 		/*占总成绩的比例_1*/
	protected String  power_ratio_2; 		/*占总成绩的比例_2*/
//	protected String  total_hour; 		/*总学时*/
//	protected String  total_marks; 		/*总学分*/
	protected String  theory_hours; 		/*理论学时*/
	protected String  exp_hour; 		/*实验学时*/
	protected String  up_hour; 		/*上机学时*/
	protected String  other_hour; 		/*其他学时*/
	protected String  beiZhu; 		/*备注*/
	protected String  first_year_1; 		/*第一学年_1*/
	protected String  first_year_2; 		/*第一学年_2*/
	protected String  second_year_3; 		/*第二学年_3*/
	protected String  second_year_4; 		/*第二学年_4*/
	protected String  third_year_5; 		/*第三学年_5*/
	protected String  third_year_6; 		/*第三学年_6*/
	protected String  four_year_7; 		/*第四学年_7*/
	protected String  four_year_8; 		/*第四学年_8*/
	protected String  number; 		/*序号*/
	protected String  crs_proper_EN; 		/*课程性质_EN*/

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
//	public Date getCreateTime() 
//	{
//		return this.createTime;
//	}
//	public void setCrsNum(String crsNum) 
//	{
//		this.crsNum = crsNum;
//	}
//	/**
//	 * 返回 课程编号
//	 * @return
//	 */
//	public String getCrsNum() 
//	{
//		return this.crsNum;
//	}
//	public void setCrs_ch_name(String crs_ch_name) 
//	{
//		this.crs_ch_name = crs_ch_name;
//	}
//	/**
//	 * 返回 中文名称
//	 * @return
//	 */
//	public String getCrs_ch_name() 
//	{
//		return this.crs_ch_name;
//	}
	public void setCrs_en_name(String crs_en_name) 
	{
		this.crs_en_name = crs_en_name;
	}
	/**
	 * 返回 英文名称
	 * @return
	 */
	public String getCrs_en_name() 
	{
		return this.crs_en_name;
	}
	public void setCrs_properties(String crs_properties) 
	{
		this.crs_properties = crs_properties;
	}
	/**
	 * 返回 课程性质
	 * @return
	 */
	public String getCrs_properties() 
	{
		return this.crs_properties;
	}
	public void setCrs_major(String crs_major) 
	{
		this.crs_major = crs_major;
	}
	/**
	 * 返回 开课专业
	 * @return
	 */
	public String getCrs_major() 
	{
		return this.crs_major;
	}
	public void setCrs_term(String crs_term) 
	{
		this.crs_term = crs_term;
	}
	/**
	 * 返回 开课学期
	 * @return
	 */
	public String getCrs_term() 
	{
		return this.crs_term;
	}
	public void setCrs_aim(String crs_aim) 
	{
		this.crs_aim = crs_aim;
	}
	/**
	 * 返回 课程目标
	 * @return
	 */
	public String getCrs_aim() 
	{
		return this.crs_aim;
	}
	public void setTch_claim(String tch_claim) 
	{
		this.tch_claim = tch_claim;
	}
	/**
	 * 返回 教学基本要求
	 * @return
	 */
	public String getTch_claim() 
	{
		return this.tch_claim;
	}
	public void setTch_con_hours(String tch_con_hours) 
	{
		this.tch_con_hours = tch_con_hours;
	}
	/**
	 * 返回 教学内容与学时分配
	 * @return
	 */
	public String getTch_con_hours() 
	{
		return this.tch_con_hours;
	}
	public void setTch_method(String tch_method) 
	{
		this.tch_method = tch_method;
	}
	/**
	 * 返回 教学方法及手段
	 * @return
	 */
	public String getTch_method() 
	{
		return this.tch_method;
	}
	public void setExp_con(String exp_con) 
	{
		this.exp_con = exp_con;
	}
	/**
	 * 返回 实验或上机内容
	 * @return
	 */
	public String getExp_con() 
	{
		return this.exp_con;
	}
	public void setPre_crs(String pre_crs) 
	{
		this.pre_crs = pre_crs;
	}
	/**
	 * 返回 前续课程
	 * @return
	 */
	public String getPre_crs() 
	{
		return this.pre_crs;
	}
	public void setFliow_crs(String fliow_crs) 
	{
		this.fliow_crs = fliow_crs;
	}
	/**
	 * 返回 后续课程
	 * @return
	 */
	public String getFliow_crs() 
	{
		return this.fliow_crs;
	}
	public void setCrs_refer(String crs_refer) 
	{
		this.crs_refer = crs_refer;
	}
	/**
	 * 返回 参考教材及学习资源
	 * @return
	 */
	public String getCrs_refer() 
	{
		return this.crs_refer;
	}
	public void setAssess_way(String assess_way) 
	{
		this.assess_way = assess_way;
	}
	/**
	 * 返回 考核方式
	 * @return
	 */
	public String getAssess_way() 
	{
		return this.assess_way;
	}
	public void setTch_base_demand(String tch_base_demand) 
	{
		this.tch_base_demand = tch_base_demand;
	}
	/**
	 * 返回 教学基本要求项
	 * @return
	 */
	public String getTch_base_demand() 
	{
		return this.tch_base_demand;
	}
	public void setExam_type(String exam_type) 
	{
		this.exam_type = exam_type;
	}
	/**
	 * 返回 考核形式
	 * @return
	 */
	public String getExam_type() 
	{
		return this.exam_type;
	}
	public void setPower_ratio(String power_ratio) 
	{
		this.power_ratio = power_ratio;
	}
	/**
	 * 返回 占总成绩的比例
	 * @return
	 */
	public String getPower_ratio() 
	{
		return this.power_ratio;
	}
	public void setTch_base_demand_1(String tch_base_demand_1) 
	{
		this.tch_base_demand_1 = tch_base_demand_1;
	}
	/**
	 * 返回 教学基本要求项_1
	 * @return
	 */
	public String getTch_base_demand_1() 
	{
		return this.tch_base_demand_1;
	}
	public void setTch_base_demand_2(String tch_base_demand_2) 
	{
		this.tch_base_demand_2 = tch_base_demand_2;
	}
	/**
	 * 返回 教学基本要求项_2
	 * @return
	 */
	public String getTch_base_demand_2() 
	{
		return this.tch_base_demand_2;
	}
	public void setExam_type_1(String exam_type_1) 
	{
		this.exam_type_1 = exam_type_1;
	}
	/**
	 * 返回 考核方式_1
	 * @return
	 */
	public String getExam_type_1() 
	{
		return this.exam_type_1;
	}
	public void setExam_type_2(String exam_type_2) 
	{
		this.exam_type_2 = exam_type_2;
	}
	/**
	 * 返回 考核方式_2
	 * @return
	 */
	public String getExam_type_2() 
	{
		return this.exam_type_2;
	}
	public void setPower_ratio_1(String power_ratio_1) 
	{
		this.power_ratio_1 = power_ratio_1;
	}
	/**
	 * 返回 占总成绩的比例_1
	 * @return
	 */
	public String getPower_ratio_1() 
	{
		return this.power_ratio_1;
	}
	public void setPower_ratio_2(String power_ratio_2) 
	{
		this.power_ratio_2 = power_ratio_2;
	}
	/**
	 * 返回 占总成绩的比例_2
	 * @return
	 */
	public String getPower_ratio_2() 
	{
		return this.power_ratio_2;
	}
//	public void setTotal_hour(String total_hour) 
//	{
//		this.total_hour = total_hour;
//	}
//	/**
//	 * 返回 总学时
//	 * @return
//	 */
//	public String getTotal_hour() 
//	{
//		return this.total_hour;
//	}
//	public void setTotal_marks(String total_marks) 
//	{
//		this.total_marks = total_marks;
//	}
//	/**
//	 * 返回 总学分
//	 * @return
//	 */
//	public String getTotal_marks() 
//	{
//		return this.total_marks;
//	}
	public void setTheory_hours(String theory_hours) 
	{
		this.theory_hours = theory_hours;
	}
	/**
	 * 返回 理论学时
	 * @return
	 */
	public String getTheory_hours() 
	{
		return this.theory_hours;
	}
	public void setExp_hour(String exp_hour) 
	{
		this.exp_hour = exp_hour;
	}
	/**
	 * 返回 实验学时
	 * @return
	 */
	public String getExp_hour() 
	{
		return this.exp_hour;
	}
	public void setUp_hour(String up_hour) 
	{
		this.up_hour = up_hour;
	}
	/**
	 * 返回 上机学时
	 * @return
	 */
	public String getUp_hour() 
	{
		return this.up_hour;
	}
	public void setOther_hour(String other_hour) 
	{
		this.other_hour = other_hour;
	}
	/**
	 * 返回 其他学时
	 * @return
	 */
	public String getOther_hour() 
	{
		return this.other_hour;
	}
	public void setBeiZhu(String beiZhu) 
	{
		this.beiZhu = beiZhu;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBeiZhu() 
	{
		return this.beiZhu;
	}
	public void setFirst_year_1(String first_year_1) 
	{
		this.first_year_1 = first_year_1;
	}
	/**
	 * 返回 第一学年_1
	 * @return
	 */
	public String getFirst_year_1() 
	{
		return this.first_year_1;
	}
	public void setFirst_year_2(String first_year_2) 
	{
		this.first_year_2 = first_year_2;
	}
	/**
	 * 返回 第一学年_2
	 * @return
	 */
	public String getFirst_year_2() 
	{
		return this.first_year_2;
	}
	public void setSecond_year_3(String second_year_3) 
	{
		this.second_year_3 = second_year_3;
	}
	/**
	 * 返回 第二学年_3
	 * @return
	 */
	public String getSecond_year_3() 
	{
		return this.second_year_3;
	}
	public void setSecond_year_4(String second_year_4) 
	{
		this.second_year_4 = second_year_4;
	}
	/**
	 * 返回 第二学年_4
	 * @return
	 */
	public String getSecond_year_4() 
	{
		return this.second_year_4;
	}
	public void setThird_year_5(String third_year_5) 
	{
		this.third_year_5 = third_year_5;
	}
	/**
	 * 返回 第三学年_5
	 * @return
	 */
	public String getThird_year_5() 
	{
		return this.third_year_5;
	}
	public void setThird_year_6(String third_year_6) 
	{
		this.third_year_6 = third_year_6;
	}
	/**
	 * 返回 第三学年_6
	 * @return
	 */
	public String getThird_year_6() 
	{
		return this.third_year_6;
	}
	public void setFour_year_7(String four_year_7) 
	{
		this.four_year_7 = four_year_7;
	}
	/**
	 * 返回 第四学年_7
	 * @return
	 */
	public String getFour_year_7() 
	{
		return this.four_year_7;
	}
	public void setFour_year_8(String four_year_8) 
	{
		this.four_year_8 = four_year_8;
	}
	/**
	 * 返回 第四学年_8
	 * @return
	 */
	public String getFour_year_8() 
	{
		return this.four_year_8;
	}
	public void setNumber(String number) 
	{
		this.number = number;
	}
	/**
	 * 返回 序号
	 * @return
	 */
	public String getNumber() 
	{
		return this.number;
	}
	public void setCrs_proper_EN(String crs_proper_EN) 
	{
		this.crs_proper_EN = crs_proper_EN;
	}
	/**
	 * 返回 课程性质_EN
	 * @return
	 */
	public String getCrs_proper_EN() 
	{
		return this.crs_proper_EN;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("createTime", this.createTime) 
//		.append("crsNum", this.crsNum) 
//		.append("crs_ch_name", this.crs_ch_name) 
		.append("crs_en_name", this.crs_en_name) 
		.append("crs_properties", this.crs_properties) 
		.append("crs_major", this.crs_major) 
		.append("crs_term", this.crs_term) 
		.append("crs_aim", this.crs_aim) 
		.append("tch_claim", this.tch_claim) 
		.append("tch_con_hours", this.tch_con_hours) 
		.append("tch_method", this.tch_method) 
		.append("exp_con", this.exp_con) 
		.append("pre_crs", this.pre_crs) 
		.append("fliow_crs", this.fliow_crs) 
		.append("crs_refer", this.crs_refer) 
		.append("assess_way", this.assess_way) 
		.append("tch_base_demand", this.tch_base_demand) 
		.append("exam_type", this.exam_type) 
		.append("power_ratio", this.power_ratio) 
		.append("tch_base_demand_1", this.tch_base_demand_1) 
		.append("tch_base_demand_2", this.tch_base_demand_2) 
		.append("exam_type_1", this.exam_type_1) 
		.append("exam_type_2", this.exam_type_2) 
		.append("power_ratio_1", this.power_ratio_1) 
		.append("power_ratio_2", this.power_ratio_2) 
//		.append("total_hour", this.total_hour) 
//		.append("total_marks", this.total_marks) 
		.append("theory_hours", this.theory_hours) 
		.append("exp_hour", this.exp_hour) 
		.append("up_hour", this.up_hour) 
		.append("other_hour", this.other_hour) 
		.append("beiZhu", this.beiZhu) 
		.append("first_year_1", this.first_year_1) 
		.append("first_year_2", this.first_year_2) 
		.append("second_year_3", this.second_year_3) 
		.append("second_year_4", this.second_year_4) 
		.append("third_year_5", this.third_year_5) 
		.append("third_year_6", this.third_year_6) 
		.append("four_year_7", this.four_year_7) 
		.append("four_year_8", this.four_year_8) 
		.append("number", this.number) 
		.append("crs_proper_EN", this.crs_proper_EN) 
		.toString();
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getCredit() {
		return credit;
	}
	public void setCredit(String credit) {
		this.credit = credit;
	}
}
