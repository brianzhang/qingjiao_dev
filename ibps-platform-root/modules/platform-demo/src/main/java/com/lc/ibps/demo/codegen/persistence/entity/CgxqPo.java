package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import com.lc.ibps.base.core.util.json.JsonUtil;

/**
 * 采购需求 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
 @SuppressWarnings("serial")
public class CgxqPo extends CgxqTbl{
	private boolean delBeforeSave = true;
	public boolean isDelBeforeSave() {
		return delBeforeSave;
	}
	public void setDelBeforeSave(boolean delBeforeSave) {
		this.delBeforeSave = delBeforeSave;
	}	
	private List<CgqdPo> cgqdPoList = new ArrayList<CgqdPo>();
	public List<CgqdPo> getCgqdPoList() {
		return cgqdPoList;
	}
	public void setCgqdPoList(List<CgqdPo> cgqdPoList) {
		this.cgqdPoList = cgqdPoList;
	}
	private List<CgxqfjPo> cgxqfjPoList = new ArrayList<CgxqfjPo>();
	public List<CgxqfjPo> getCgxqfjPoList() {
		return cgxqfjPoList;
	}
	public void setCgxqfjPoList(List<CgxqfjPo> cgxqfjPoList) {
		this.cgxqfjPoList = cgxqfjPoList;
	}

	public static CgxqPo fromJsonString(String data){
		if(!JsonUtil.isJsonObject(data)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		map.put("cgqdPoList", CgqdPo.class);
		map.put("cgxqfjPoList", CgxqfjPo.class);
		return JsonUtil.getDTO2(data, CgxqPo.class, map);
	}
	
	public static List<CgxqPo> fromJsonArrayString(String listData){
		if(!JsonUtil.isJsonArray(listData)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		map.put("cgqdPoList", CgqdPo.class);
		map.put("cgxqfjPoList", CgxqfjPo.class);
		return JsonUtil.getDTOList2(listData, CgxqPo.class, map);
	}
	
//	@Override
//	public String toString() {
//		Map classMap = new HashMap();
//		classMap.put("settingData",SettingData.class);
//		JSONObject.fromObject(this).toString();
//		ttempTask = (TTemplateTask) JSONObject.toBean(jsonObject, TTemplateTask.class,classMap);
//		return toJsonString();
//	}
	
}