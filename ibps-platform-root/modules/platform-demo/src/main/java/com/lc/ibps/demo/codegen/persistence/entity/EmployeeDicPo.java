package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.HashMap;
import java.util.List;
import com.lc.ibps.base.core.util.json.JsonUtil;

/**
 * t_employee_dic 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:26
 *</pre>
 */
 @SuppressWarnings("serial")
public class EmployeeDicPo extends EmployeeDicTbl{

	protected String userName;
	protected String dicName;
	protected String dicNames;
	protected String catetory;
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDicName() {
		return dicName;
	}

	public void setDicName(String dicName) {
		this.dicName = dicName;
	}

	public String getDicNames() {
		return dicNames;
	}

	public void setDicNames(String dicNames) {
		this.dicNames = dicNames;
	}

	public String getCatetory() {
		return catetory;
	}

	public void setCatetory(String catetory) {
		this.catetory = catetory;
	}

	public static EmployeeDicPo fromJsonString(String data){
		if(!JsonUtil.isJsonObject(data)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		return JsonUtil.getDTO2(data, EmployeeDicPo.class, map);
	}
	
	public static List<EmployeeDicPo> fromJsonArrayString(String listData){
		if(!JsonUtil.isJsonArray(listData)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		return JsonUtil.getDTOList2(listData, EmployeeDicPo.class, map);
	}
}