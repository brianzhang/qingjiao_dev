package com.lc.ibps.demo.codegen.persistence.entity;

import java.util.HashMap;
import java.util.List;
import com.lc.ibps.base.core.util.json.JsonUtil;

/**
 * 采购需求附件 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
 @SuppressWarnings("serial")
public class CgxqfjPo extends CgxqfjTbl{

	public static CgxqfjPo fromJsonString(String data){
		if(!JsonUtil.isJsonObject(data)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		return JsonUtil.getDTO2(data, CgxqfjPo.class, map);
	}
	
	public static List<CgxqfjPo> fromJsonArrayString(String listData){
		if(!JsonUtil.isJsonArray(listData)){
			return null;
		}
		HashMap<String, Class<?>> map = new HashMap<String, Class<?>>();
		return JsonUtil.getDTOList2(listData, CgxqfjPo.class, map);
	}
}