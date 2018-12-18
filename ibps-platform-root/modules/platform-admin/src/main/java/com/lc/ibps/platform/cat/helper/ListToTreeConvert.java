package com.lc.ibps.platform.cat.helper;

import net.sf.json.JSONObject;

/**
 * 平铺结构数据转换为树形结构数据。
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年1月29日-下午3:30:10
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public interface ListToTreeConvert<C> {
	JSONObject convert(C obj);
}