package com.lc.ibps.platform.cat.utils;

import java.util.Collections;
import java.util.List;

import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.common.cat.persistence.entity.AreaPo;
import com.lc.ibps.common.cat.utils.AreaCacheUtil;

/**
 * 地理区域工具类
 * 
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年2月27日-下午4:04:44
 * 版权：广州流辰信息有限公司
 * </pre>
 */
public class AreaUtil {

	public static String getAreaLabel(String value, String defaultValue) {
		if (StringUtil.isNotBlank(value)) {
			for (AreaPo area : getAreaList()) {
				if (value.equals(area.getKey())) {
					return area.getName();
				}
			}
		}

		return defaultValue;
	}

	public static String getAreaLabels(String values, String split, String defaultValue) {
		if (StringUtil.isNotBlank(values)) {
			List<String> valueList = Collections.emptyList();
			for (String value : StringUtil.split(values, split)) {
				valueList.add(getAreaLabel(value, defaultValue));
			}
			return StringUtil.join(valueList, split);
		}

		return defaultValue;
	}

	public static String getAreaValue(String label, String defaultLabel) {
		if (StringUtil.isNotBlank(label)) {
			for (AreaPo area : getAreaList()) {
				if (label.equals(area.getName())) {
					return area.getKey();
				}
			}
		}

		return defaultLabel;
	}

	public static List<AreaPo> getAreaList() {
		return AreaCacheUtil.getAreaCache();
	}

	/**
	 * 返回字典列表（JSON）
	 * 
	 * @param type
	 * @return
	 */
	public static String getAreaListJson() {
		return JsonUtil.getJSONString(getAreaList());
	}
}
