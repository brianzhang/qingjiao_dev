package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import com.lc.ibps.base.core.util.json.JsonUtil;

/**
 * t_cgxq 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
 @SuppressWarnings("serial")
public class Cgxq1Po extends Cgxq1Tbl{
	private boolean delBeforeSave = true;
	public boolean isDelBeforeSave() {
		return delBeforeSave;
	}
	public void setDelBeforeSave(boolean delBeforeSave) {
		this.delBeforeSave = delBeforeSave;
	}	
	private List<Cgqd1Po> cgqd1PoList = new ArrayList<Cgqd1Po>();
	public List<Cgqd1Po> getCgqd1PoList() {
		return cgqd1PoList;
	}
	public void setCgqd1PoList(List<Cgqd1Po> cgqd1PoList) {
		this.cgqd1PoList = cgqd1PoList;
	}

	public static Cgxq1Po fromJsonString(String data){
		if(!JsonUtil.isJsonObject(data)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		map.put("cgqd1PoList", Cgqd1Po.class);
		return JsonUtil.getDTO2(data, Cgxq1Po.class, map);
	}
	
	public static List<Cgxq1Po> fromJsonArrayString(String listData){
		if(!JsonUtil.isJsonArray(listData)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		map.put("cgqd1PoList", Cgqd1Po.class);
		return JsonUtil.getDTOList2(listData, Cgxq1Po.class, map);
	}
}