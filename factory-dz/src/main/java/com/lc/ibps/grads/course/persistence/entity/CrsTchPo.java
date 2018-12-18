package com.lc.ibps.grads.course.persistence.entity;

/**
 * t_crs_tch 实体对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:11:13
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsTchPo extends CrsTchTbl{
		protected String nianji;
		protected String zhuanye;
		
		protected  String tchName;
		protected String  crsName;
		
		public CrsTchPo(){}
		public CrsTchPo(String id ,String tchNum,String crsName, String crsNum, String term,String time, String location,  String clazz ,String startTime) {
			setId(id);
			setTchNum(tchNum);
			setCrsName(crsName);
			setCrsNum(crsNum);
			setTerm(term);
			setLocation(location);
			setTime(time);
			setClazz(clazz);
			setStartTime(startTime);
		}
		public String getTchName() {
			return tchName;
		}
		public void setTchName(String tchName) {
			this.tchName = tchName;
		}
		public String getCrsName() {
			return crsName;
		}
		public void setCrsName(String crsName) {
			this.crsName = crsName;
		}
		public String getNianji() {
			return nianji;
		}
		public void setNianji(String nianji) {
			this.nianji = nianji;
		}
		public String getZhuanye() {
			return zhuanye;
		}
		public void setZhuanye(String zhuanye) {
			this.zhuanye = zhuanye;
		}

	
}
