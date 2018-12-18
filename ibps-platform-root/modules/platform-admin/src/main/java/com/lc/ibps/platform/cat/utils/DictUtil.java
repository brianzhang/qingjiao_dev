package com.lc.ibps.platform.cat.utils;

import java.util.List;

import com.google.common.collect.Lists;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.common.cat.helper.DictionaryBuilder;
import com.lc.ibps.common.cat.persistence.entity.DictionaryPo;
import com.lc.ibps.common.cat.utils.DictCacheUtil;

/** 
 * 数据字典工具类
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年2月27日-下午4:04:44
 * 版权：广州流辰信息有限公司
 * </pre>
 */
public class DictUtil {
	
	public static String getDictLabel(String value, String type, String field, String defaultValue){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(value)){
			for (DictionaryPo dict : getDictList(type)){
				if("id".equalsIgnoreCase(field) && value.equals(dict.getId())){
					return dict.getName();
				}else if("key".equalsIgnoreCase(field) && value.equals(dict.getKey())){
					return dict.getName();
				}else if(value.equals(dict.getKey())){
					return dict.getName();
				}
			}
		}
		
		return defaultValue;
	}
	
	public static String getDictLabels(String values, String type, String field, String defaultValue){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(values)){
			List<String> valueList = Lists.newArrayList();
			for (String value : StringUtil.split(values, ",")){
				valueList.add(getDictLabel(value, type, field, defaultValue));
			}
			return StringUtil.join(valueList, ",");
		}
		
		return defaultValue;
	}
	
	public static String getDictLabel(String value, String type, String field, String displayMode, String split, String defaultValue){
		if(StringUtil.isBlank(split)) split = "/";
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(value)){
			for (DictionaryPo dict : getDictList(type)){
				if(("id".equalsIgnoreCase(field) && value.equals(dict.getId()))
						|| ("key".equalsIgnoreCase(field) && value.equals(dict.getKey()))
						|| (value.equals(dict.getKey()))
					){
					if("path".equalsIgnoreCase(displayMode)){
						return DictionaryBuilder.getTreeName(dict.getId(), split, getDictList(type));
					}else{
						return dict.getName();
					}
				}
			}
		}
		
		return defaultValue;
	}
	
	public static String getDictLabels(String values, String type, String field, String displayMode, String split, String defaultValue){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(values)){
			List<String> valueList = Lists.newArrayList();
			for (String value : StringUtil.split(values, ",")){
				valueList.add(getDictLabel(value, type, field, displayMode, split, defaultValue));
			}
			return StringUtil.join(valueList, ",");
		}
		
		return defaultValue;
	}

	public static String getDictValue(String label, String type, String field, String defaultLabel){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(label)){
			for (DictionaryPo dict : getDictList(type)){
				if("id".equalsIgnoreCase(field) && label.equals(dict.getName())){
					return dict.getId();
				}else if("key".equalsIgnoreCase(field) && label.equals(dict.getName())){
					return dict.getKey();
				}else if(label.equals(dict.getName())){
					return dict.getKey();
				}
			}
		}
		
		return defaultLabel;
	}
	
	public static List<DictionaryPo> getDictList(String type){
		return DictCacheUtil.getDictCache(type);
	}
	
	/**
	 * 返回字典列表（JSON）
	 * @param type
	 * @return
	 */
	public static String getDictListJson(String type){
		return JsonUtil.getJSONString(getDictList(type));
	}
}
