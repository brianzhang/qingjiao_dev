package com.lc.ibps.bishes.groupuser.persistence.entity;

/**
 * t_group_user 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:41
 *</pre>
 */
 @SuppressWarnings("serial")
public class GroupUserPo extends GroupUserTbl{
	 // xx人在xx组  秘书：sec 组长:master
	 
	 private String master;
	 private String sec;
	 private String userName;
	 private String groupName;
	 private String dbStatus;
	 private String groupPlace;

	public String getGroupPlace() {
		return groupPlace;
	}

	public void setGroupPlace(String groupPlace) {
		this.groupPlace = groupPlace;
	}

	public String getMaster() {
		return master;
	}

	public void setMaster(String master) {
		this.master = master;
	}

	public String getSec() {
		return sec;
	}

	public void setSec(String sec) {
		this.sec = sec;
	}

	public String getDbStatus() {
		return dbStatus;
	}

	public void setDbStatus(String dbStatus) {
		this.dbStatus = dbStatus;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	 
	
}
