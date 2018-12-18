package com.lc.ibps.platform.codegen.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.components.codegen.persistence.entity.DoTypePo;

/** 
 * 构建生成类型data
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class DoTypeBuilder {
	
	public static List<Map<String, String>> build(List<DoTypePo> doTypeList, String doTypeKeys, String doTypeKey){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(DoTypePo doType : doTypeList){
			if(doTypeKeys.contains(doType.getKey()) || !doType.getKey().contains(doTypeKey)){
				continue;
			}
			
			map = new HashMap<String, String>();
			map.put("id", doType.getKey());
			map.put("text", doType.getKey());
			rs.add(map);
		}
		
		return rs;
	}
	
	public static List<Map<String, Object>> build(String groupLabel, List<DoTypePo> doTypeList, String doTypeKeys, String doTypeKey){
		List<Map<String, Object>> rss = new ArrayList<Map<String, Object>>();
		
		Map<String, Object> group = new HashMap<String, Object>();
		rss.add(group);
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		group.put("text", groupLabel);
		group.put("children", rs);
		Map<String, String> map = null;
		for(DoTypePo doType : doTypeList){
			if(doTypeKeys.contains(doType.getKey()) || !doType.getKey().contains(doTypeKey)){
				continue;
			}
			
			map = new HashMap<String, String>();
			map.put("id", doType.getKey());
			map.put("text", doType.getKey());
			rs.add(map);
		}
		
		return rss;
	}
	
	public static List<Map<String, Object>> buildMapList(List<DoTypePo> doTypeList){
		List<Map<String, Object>> rss = new ArrayList<Map<String, Object>>();
		if(BeanUtils.isEmpty(doTypeList)){
			return rss;
		}
		
		Map<String, Object> map = null;
		for(DoTypePo doType : doTypeList){
			map = new HashMap<String, Object>();
			map.put("key", doType.getKey());
			map.put("name", doType.getName());
			rss.add(map);
		}
		
		return rss;
	}
	
	public static void build(List<DoTypePo> list){
		if(BeanUtils.isEmpty(list)){
			return;
		}
		
		for(DoTypePo po : list){
			build(po);
		}
	}

	public static void build(DoTypePo po) {
		if(BeanUtils.isEmpty(po)){
			return;
		}
		
		if(StringUtil.isNotEmpty(po.getTypeId())){
		TypeRepository typeRepository = AppUtil.getBean(TypeRepository.class);
		TypePo typePo = typeRepository.get(po.getTypeId());
		if(BeanUtils.isNotEmpty(typePo)){
			po.setTypeName(typePo.getName());
		}
		}
	}
	
}
