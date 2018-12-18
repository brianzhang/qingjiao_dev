package com.lc.ibps.platform.codegen.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.lc.ibps.api.form.model.IFormDef;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.components.codegen.persistence.entity.SchemePo;

/** 
 * 构建生成方案data
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class SchemeBuilder {
	
	public static List<Map<String, String>> build(List<IFormDef> formDefs, String formName){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		if(BeanUtils.isEmpty(formDefs)) {
			return rs;
		}
		
		Map<String, String> map = null;
		for(IFormDef formDef : formDefs){
			if(!formDef.getName().contains(formName)){
				continue;
			}
			
			map = new HashMap<String, String>();
			map.put("id", formDef.getId());
			map.put("text", formDef.getName());
			rs.add(map);
		}
		
		return rs;
	}
	
	public static void build(List<SchemePo> list){
		if(BeanUtils.isEmpty(list)){
			return;
		}
		
		for(SchemePo po : list){
			build(po);
		}
	}

	public static void build(SchemePo po) {
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
