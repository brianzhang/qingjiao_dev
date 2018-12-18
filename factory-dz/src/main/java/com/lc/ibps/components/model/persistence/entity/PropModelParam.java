package com.lc.ibps.components.model.persistence.entity;

import java.util.Map;

import com.lc.ibps.components.model.interfaces.AbstractParam;

/**
 * 
 * 模板属性参数对应实体类
 * @author Administrator
 *
 */
public class PropModelParam implements AbstractParam{
	private String name;//属性名称
	private String poField;//对应实体字段
	private String propType;//属性类型
	private String tableName;//下拉框关联业务对象
	private String select;//下拉框关联字段
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getSelect() {
		return select;
	}
	public void setSelect(String select) {
		this.select = select;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPoField() {
		return poField;
	}
	public void setPoField(String poField) {
		this.poField = poField;
	}
	public String getPropType() {
		return propType;
	}
	public void setPropType(String propType) {
		this.propType = propType;
	}

	@Override
	public void translate(Map args) {
		// TODO Auto-generated method stub
		
	}

}
