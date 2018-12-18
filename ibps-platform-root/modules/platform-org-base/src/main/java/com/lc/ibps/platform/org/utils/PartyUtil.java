package com.lc.ibps.platform.org.utils;

import java.util.List;

import com.google.common.collect.Lists;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.utils.PartyCacheUtil;

/** 
 * 参与者工具类
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年2月27日-下午4:04:44
 * 版权：广州流辰信息有限公司
 * </pre>
 */
public class PartyUtil {
	
	/**
	 * TODO方法名称描述
	 *
	 * @param value
	 * @param type			{@link PartyType}
	 * @param defaultValue
	 * @return 
	 */
	public static String getPartyLabel(String value, String type, String defaultValue){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(value)){
			for (PartyEntityPo party : getPartyList(type)){
				if(value.equals(party.getId())){
					return party.getName();
				}
			}
		}
		
		return defaultValue;
	}
	
	public static String getPartyLabels(String values, String type, String defaultValue){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(values)){
			List<String> valueList = Lists.newArrayList();
			for (String value : StringUtil.split(values, ",")){
				valueList.add(getPartyLabel(value, type, defaultValue));
			}
			return StringUtil.join(valueList, ",");
		}
		
		return defaultValue;
	}

	public static String getPartyValue(String label, String type, String defaultLabel){
		if (StringUtil.isNotBlank(type) && StringUtil.isNotBlank(label)){
			for (PartyEntityPo party : getPartyList(type)){
				if(label.equals(party.getName())){
					return party.getId();
				}
			}
		}
		
		return defaultLabel;
	}
	
	public static List<PartyEntityPo> getPartyList(String type){
		return PartyCacheUtil.getPartyCache(type);
	}
	
	/**
	 * 返回字典列表（JSON）
	 * @param type
	 * @return
	 */
	public static String getPartyListJson(String type, String field){
		return JsonUtil.getJSONString(getPartyList(type));
	}
}
