package com.lc.ibps.platform.desktop.helper;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.web.util.RequestUtil;

import net.sf.json.JSONObject;

/**
 * 桌面管理工具类。
 *
 * <pre> 
 * 构建组：ibps-common-biz
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年11月21日-下午8:26:46
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class DesktopUtil {

	/**
	 * 获取map
	 * @param request
	 * @return
	 */
	public static Map<String, Object> getParameterValueMap(
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("__ctx", request.getContextPath());
		String params = RequestUtil.getString(request, "params");
		if (BeanUtils.isEmpty(params))
			return map;
		JSONObject json = JSONObject.fromObject(params);
		Iterator<?> it = json.keys();
		while (it.hasNext()) {
			String key = (String) it.next();
			Object value = json.get(key);
			map.put(key, value);
		}
		return map;
	}

}
