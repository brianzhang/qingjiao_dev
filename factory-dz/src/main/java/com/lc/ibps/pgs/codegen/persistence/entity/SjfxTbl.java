package com.lc.ibps.pgs.codegen.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * 学院试卷分析报告 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:53
 *</pre>
 */
 @SuppressWarnings("serial")
public class SjfxTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  keChengMingChen; 		/*课程名称*/
	protected String  keChengDaiMa; 		/*课程代码*/
	protected String  keChengXingZhi; 		/*课程性质*/
	protected String  xueFen; 		/*学分*/
	protected String  renKeJiaoShi; 		/*任课教师*/
	protected String  banJiMingCheng; 		/*班级名称*/
	protected String  kaoHuXingShi; 		/*考核形式*/
	protected String  kaoShiRiQi; 		/*考试日期*/
	protected String  renShu; 		/*人数*/
	protected String  renShuo1; 		/*人数1*/
	protected String  renShu2; 		/*人数2*/
	protected String  renShuoSan; 		/*人数3*/
	protected String  renShuSi; 		/*人数4*/
	protected String  renShuoWu; 		/*人数5*/
	protected String  biLi1; 		/*比例1*/
	protected String  biLi2; 		/*比例2*/
	protected String  biLi3; 		/*比例3*/
	protected String  biLi4; 		/* 比例4*/
	protected String  biLi5; 		/*比例5*/
	protected String  pingYunChengJi; 		/*平均成绩*/
	protected String  biaoZhunChai; 		/*标准差*/
	protected String  nanDuo1; 		/*难度1*/
	protected String  nanDuo2; 		/*难度2*/
	protected String  nanDuo3; 		/*难度3*/
	protected String  nanDu4; 		/*难度4*/
	protected String  nanDu5; 		/*难度5*/
	protected String  ouFenDuo1; 		/*区分度1*/
	protected String  ouFenDuo2; 		/*区分度2*/
	protected String  ouFenDuo3; 		/*区分度3*/
	protected String  ouFenDuo4; 		/*区分度4*/
	protected String  xiaoGuoFenXi; 		/*效果分析*/
	protected String  gaiJinCuoShi; 		/*改进措施*/

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
	public void setKeChengMingChen(String keChengMingChen) 
	{
		this.keChengMingChen = keChengMingChen;
	}
	/**
	 * 返回 课程名称
	 * @return
	 */
	public String getKeChengMingChen() 
	{
		return this.keChengMingChen;
	}
	public void setKeChengDaiMa(String keChengDaiMa) 
	{
		this.keChengDaiMa = keChengDaiMa;
	}
	/**
	 * 返回 课程代码
	 * @return
	 */
	public String getKeChengDaiMa() 
	{
		return this.keChengDaiMa;
	}
	public void setKeChengXingZhi(String keChengXingZhi) 
	{
		this.keChengXingZhi = keChengXingZhi;
	}
	/**
	 * 返回 课程性质
	 * @return
	 */
	public String getKeChengXingZhi() 
	{
		return this.keChengXingZhi;
	}
	public void setXueFen(String xueFen) 
	{
		this.xueFen = xueFen;
	}
	/**
	 * 返回 学分
	 * @return
	 */
	public String getXueFen() 
	{
		return this.xueFen;
	}
	public void setRenKeJiaoShi(String renKeJiaoShi) 
	{
		this.renKeJiaoShi = renKeJiaoShi;
	}
	/**
	 * 返回 任课教师
	 * @return
	 */
	public String getRenKeJiaoShi() 
	{
		return this.renKeJiaoShi;
	}
	public void setBanJiMingCheng(String banJiMingCheng) 
	{
		this.banJiMingCheng = banJiMingCheng;
	}
	/**
	 * 返回 班级名称
	 * @return
	 */
	public String getBanJiMingCheng() 
	{
		return this.banJiMingCheng;
	}
	public void setKaoHuXingShi(String kaoHuXingShi) 
	{
		this.kaoHuXingShi = kaoHuXingShi;
	}
	/**
	 * 返回 考核形式
	 * @return
	 */
	public String getKaoHuXingShi() 
	{
		return this.kaoHuXingShi;
	}
	public void setKaoShiRiQi(String kaoShiRiQi) 
	{
		this.kaoShiRiQi = kaoShiRiQi;
	}
	/**
	 * 返回 考试日期
	 * @return
	 */
	public String getKaoShiRiQi() 
	{
		return this.kaoShiRiQi;
	}
	public void setRenShu(String renShu) 
	{
		this.renShu = renShu;
	}
	/**
	 * 返回 人数
	 * @return
	 */
	public String getRenShu() 
	{
		return this.renShu;
	}
	public void setRenShuo1(String renShuo1) 
	{
		this.renShuo1 = renShuo1;
	}
	/**
	 * 返回 人数1
	 * @return
	 */
	public String getRenShuo1() 
	{
		return this.renShuo1;
	}
	public void setRenShu2(String renShu2) 
	{
		this.renShu2 = renShu2;
	}
	/**
	 * 返回 人数2
	 * @return
	 */
	public String getRenShu2() 
	{
		return this.renShu2;
	}
	public void setRenShuoSan(String renShuoSan) 
	{
		this.renShuoSan = renShuoSan;
	}
	/**
	 * 返回 人数3
	 * @return
	 */
	public String getRenShuoSan() 
	{
		return this.renShuoSan;
	}
	public void setRenShuSi(String renShuSi) 
	{
		this.renShuSi = renShuSi;
	}
	/**
	 * 返回 人数4
	 * @return
	 */
	public String getRenShuSi() 
	{
		return this.renShuSi;
	}
	public void setRenShuoWu(String renShuoWu) 
	{
		this.renShuoWu = renShuoWu;
	}
	/**
	 * 返回 人数5
	 * @return
	 */
	public String getRenShuoWu() 
	{
		return this.renShuoWu;
	}
	public void setBiLi1(String biLi1) 
	{
		this.biLi1 = biLi1;
	}
	/**
	 * 返回 比例1
	 * @return
	 */
	public String getBiLi1() 
	{
		return this.biLi1;
	}
	public void setBiLi2(String biLi2) 
	{
		this.biLi2 = biLi2;
	}
	/**
	 * 返回 比例2
	 * @return
	 */
	public String getBiLi2() 
	{
		return this.biLi2;
	}
	public void setBiLi3(String biLi3) 
	{
		this.biLi3 = biLi3;
	}
	/**
	 * 返回 比例3
	 * @return
	 */
	public String getBiLi3() 
	{
		return this.biLi3;
	}
	public void setBiLi4(String biLi4) 
	{
		this.biLi4 = biLi4;
	}
	/**
	 * 返回  比例4
	 * @return
	 */
	public String getBiLi4() 
	{
		return this.biLi4;
	}
	public void setBiLi5(String biLi5) 
	{
		this.biLi5 = biLi5;
	}
	/**
	 * 返回 比例5
	 * @return
	 */
	public String getBiLi5() 
	{
		return this.biLi5;
	}
	public void setPingYunChengJi(String pingYunChengJi) 
	{
		this.pingYunChengJi = pingYunChengJi;
	}
	/**
	 * 返回 平均成绩
	 * @return
	 */
	public String getPingYunChengJi() 
	{
		return this.pingYunChengJi;
	}
	public void setBiaoZhunChai(String biaoZhunChai) 
	{
		this.biaoZhunChai = biaoZhunChai;
	}
	/**
	 * 返回 标准差
	 * @return
	 */
	public String getBiaoZhunChai() 
	{
		return this.biaoZhunChai;
	}
	public void setNanDuo1(String nanDuo1) 
	{
		this.nanDuo1 = nanDuo1;
	}
	/**
	 * 返回 难度1
	 * @return
	 */
	public String getNanDuo1() 
	{
		return this.nanDuo1;
	}
	public void setNanDuo2(String nanDuo2) 
	{
		this.nanDuo2 = nanDuo2;
	}
	/**
	 * 返回 难度2
	 * @return
	 */
	public String getNanDuo2() 
	{
		return this.nanDuo2;
	}
	public void setNanDuo3(String nanDuo3) 
	{
		this.nanDuo3 = nanDuo3;
	}
	/**
	 * 返回 难度3
	 * @return
	 */
	public String getNanDuo3() 
	{
		return this.nanDuo3;
	}
	public void setNanDu4(String nanDu4) 
	{
		this.nanDu4 = nanDu4;
	}
	/**
	 * 返回 难度4
	 * @return
	 */
	public String getNanDu4() 
	{
		return this.nanDu4;
	}
	public void setNanDu5(String nanDu5) 
	{
		this.nanDu5 = nanDu5;
	}
	/**
	 * 返回 难度5
	 * @return
	 */
	public String getNanDu5() 
	{
		return this.nanDu5;
	}
	public void setOuFenDuo1(String ouFenDuo1) 
	{
		this.ouFenDuo1 = ouFenDuo1;
	}
	/**
	 * 返回 区分度1
	 * @return
	 */
	public String getOuFenDuo1() 
	{
		return this.ouFenDuo1;
	}
	public void setOuFenDuo2(String ouFenDuo2) 
	{
		this.ouFenDuo2 = ouFenDuo2;
	}
	/**
	 * 返回 区分度2
	 * @return
	 */
	public String getOuFenDuo2() 
	{
		return this.ouFenDuo2;
	}
	public void setOuFenDuo3(String ouFenDuo3) 
	{
		this.ouFenDuo3 = ouFenDuo3;
	}
	/**
	 * 返回 区分度3
	 * @return
	 */
	public String getOuFenDuo3() 
	{
		return this.ouFenDuo3;
	}
	public void setOuFenDuo4(String ouFenDuo4) 
	{
		this.ouFenDuo4 = ouFenDuo4;
	}
	/**
	 * 返回 区分度4
	 * @return
	 */
	public String getOuFenDuo4() 
	{
		return this.ouFenDuo4;
	}
	public void setXiaoGuoFenXi(String xiaoGuoFenXi) 
	{
		this.xiaoGuoFenXi = xiaoGuoFenXi;
	}
	/**
	 * 返回 效果分析
	 * @return
	 */
	public String getXiaoGuoFenXi() 
	{
		return this.xiaoGuoFenXi;
	}
	public void setGaiJinCuoShi(String gaiJinCuoShi) 
	{
		this.gaiJinCuoShi = gaiJinCuoShi;
	}
	/**
	 * 返回 改进措施
	 * @return
	 */
	public String getGaiJinCuoShi() 
	{
		return this.gaiJinCuoShi;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("keChengMingChen", this.keChengMingChen) 
		.append("keChengDaiMa", this.keChengDaiMa) 
		.append("keChengXingZhi", this.keChengXingZhi) 
		.append("xueFen", this.xueFen) 
		.append("renKeJiaoShi", this.renKeJiaoShi) 
		.append("banJiMingCheng", this.banJiMingCheng) 
		.append("kaoHuXingShi", this.kaoHuXingShi) 
		.append("kaoShiRiQi", this.kaoShiRiQi) 
		.append("renShu", this.renShu) 
		.append("renShuo1", this.renShuo1) 
		.append("renShu2", this.renShu2) 
		.append("renShuoSan", this.renShuoSan) 
		.append("renShuSi", this.renShuSi) 
		.append("renShuoWu", this.renShuoWu) 
		.append("biLi1", this.biLi1) 
		.append("biLi2", this.biLi2) 
		.append("biLi3", this.biLi3) 
		.append("biLi4", this.biLi4) 
		.append("biLi5", this.biLi5) 
		.append("pingYunChengJi", this.pingYunChengJi) 
		.append("biaoZhunChai", this.biaoZhunChai) 
		.append("nanDuo1", this.nanDuo1) 
		.append("nanDuo2", this.nanDuo2) 
		.append("nanDuo3", this.nanDuo3) 
		.append("nanDu4", this.nanDu4) 
		.append("nanDu5", this.nanDu5) 
		.append("ouFenDuo1", this.ouFenDuo1) 
		.append("ouFenDuo2", this.ouFenDuo2) 
		.append("ouFenDuo3", this.ouFenDuo3) 
		.append("ouFenDuo4", this.ouFenDuo4) 
		.append("xiaoGuoFenXi", this.xiaoGuoFenXi) 
		.append("gaiJinCuoShi", this.gaiJinCuoShi) 
		.toString();
	}
}
