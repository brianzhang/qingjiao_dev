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
import com.lc.ibps.components.codegen.persistence.entity.TemplatePo;

/** 
 * 构建模板data
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TemplateBuilder {
	
	public static List<Map<String, Object>> buildMapList(List<TemplatePo> templateList){
		List<Map<String, Object>> rss = new ArrayList<Map<String, Object>>();
		if(BeanUtils.isEmpty(templateList)){
			return rss;
		}
		
		Map<String, Object> map = null;
		for(TemplatePo template : templateList){
			map = new HashMap<String, Object>();
			map.put("key", template.getKey());
			map.put("name", template.getName());
			rss.add(map);
		}
		
		return rss;
	}
	
	public static List<Map<String, String>> build(List<TemplatePo> templateList, String templateKeys, String templateKey){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(TemplatePo template : templateList){
			if(templateKeys.contains(template.getKey()) || !template.getKey().contains(templateKey)){
				continue;
			}
			
			map = new HashMap<String, String>();
			map.put("id", template.getKey());
			map.put("text", template.getKey());
			rs.add(map);
		}
		
		return rs;
	}
	
	public static void build(List<TemplatePo> list){
		if(BeanUtils.isEmpty(list)){
			return;
		}
		
		for(TemplatePo po : list){
			build(po);
		}
	}

	public static void build(TemplatePo po) {
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
