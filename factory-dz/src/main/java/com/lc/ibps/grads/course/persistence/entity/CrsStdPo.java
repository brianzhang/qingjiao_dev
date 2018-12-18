package com.lc.ibps.grads.course.persistence.entity;

/**
 * t_crs_std 实体对象
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
 @SuppressWarnings("serial")
public class CrsStdPo extends CrsStdTbl{
	 	public CrsStdPo() {
		}
	 	public CrsStdPo(String stdNum,String crsTchId){
	 		setStdNum(stdNum);
	 		setCrsTchId(crsTchId);
	 	}
	 
		String  stdName; 		/*姓名*/
		String  crsName; 		/*课程名称*/
		String tchNum;
		String  tchName; 		/*教师姓名*/
		String term;
		String location;
		String time;
		
		
		public String getLocation() {
			return location;
		}
		public void setLocation(String location) {
			this.location = location;
		}
		public String getTime() {
			return time;
		}
		public void setTime(String time) {
			this.time = time;
		}
		public String getTchNum() {
			return tchNum;
		}
		public void setTchNum(String tchNum) {
			this.tchNum = tchNum;
		}
		public String getCrsName() {
			return crsName;
		}
		public void setCrsName(String crsName) {
			this.crsName = crsName;
		}
		public String getTchName() {
			return tchName;
		}
		public void setTchName(String tchName) {
			this.tchName = tchName;
		}
		public String getTerm() {
			return term;
		}
		public void setTerm(String term) {
			this.term = term;
		}
		public String getStdName() {
			return stdName;
		}
		public void setStdName(String stdName) {
			this.stdName = stdName;
		}

}
