package com.lc.ibps.web.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.components.token.model.CommonResult;

/**
 * 出错处理类。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年5月10日-上午9:13:45
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class ErrorUtil {

	/**
	 * 
	 * 过滤验证时出错同一重定向到error/getError 方法中，根据原来请求的方法的后缀返回对应的数据格式
	 *
	 * @param commonResult
	 * @param request
	 * @param response
	 */
	public static void errorResponse(CommonResult commonResult, ServletRequest request, ServletResponse response) {
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		String url = servletRequest.getRequestURI();
		try {
			request.setAttribute("commonResult", commonResult);
			if ("xml".equals(getExt(url))) {
				request.getRequestDispatcher("/error/getError.xml").forward(request, response);
			} else {
				request.getRequestDispatcher("/error/getError.json").forward(request, response);
			}
		} catch (Exception e) {
			// 日志记录
			e.printStackTrace();
		} finally {
		}
	}

	final static Pattern pattern = Pattern.compile("\\S*[?]\\S*");

	/**
	 * 
	 * 获取url请求的后缀 url格式1：xxx/xxx/xxx.json?xx='xx' url格式2：xxx/xxx/xxx.xml?xx='xx'
	 *
	 * @param url
	 * @return
	 */
	private static String getExt(String url) {
		Matcher matcher = pattern.matcher(url);

		String[] spUrl = url.toString().split("/");
		int len = spUrl.length;
		String endUrl = spUrl[len - 1];

		if (matcher.find()) {
			String[] spEndUrl = endUrl.split("\\?");
			return spEndUrl[0].split("\\.")[1];
		}
		return endUrl.split("\\.")[1];
	}

}
