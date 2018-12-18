package com.lc.ibps.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.components.httpclient.model.HttpStatus;
import com.lc.ibps.components.token.model.CommonResult;
import com.lc.ibps.components.token.util.ValidUtil;

import net.sf.json.JSONObject;

/**
 * 验证Code过滤器。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年5月17日-上午9:39:53
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class ValidCodeFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest servletRequest = (HttpServletRequest) request;
		String validCode = AppUtil.getProperty("webapi.validCode");

		String url = getUrl(servletRequest);
		CommonResult commonResult = ValidUtil.validCode(validCode, url);

		if (HttpStatus.OK.value() == commonResult.getCode()) {
			chain.doFilter(request, response);
		} else {
			commonResult.setCode(HttpStatus.BAD_REQUEST.value());
			commonResult.setMessage("授权码无效");
			commonResult.setCause("授权码无效");
			response.getWriter().println(JSONObject.fromObject(commonResult).toString());
		}

	}

	private String getUrl(HttpServletRequest servletRequest) {
		String url = servletRequest.getRequestURI();
		String contextPath = servletRequest.getContextPath();
		url = StringUtil.trimPrefix(url, contextPath);
		int indexOf = url.indexOf(".");
		if (indexOf > 0)
			url = url.substring(0, indexOf);
		return url;
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

}
