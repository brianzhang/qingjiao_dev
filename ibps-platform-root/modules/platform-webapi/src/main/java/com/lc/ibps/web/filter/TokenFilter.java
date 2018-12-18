package com.lc.ibps.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.handler.SecurityUrlHandler;
import com.lc.ibps.api.base.cache.ICache;
import com.lc.ibps.components.cache.impl.MemoryCache;
import com.lc.ibps.components.httpclient.model.HttpStatus;
import com.lc.ibps.components.token.model.CommonResult;
import com.lc.ibps.components.token.model.Token;
import com.lc.ibps.components.token.model.TokenResult;
import com.lc.ibps.components.token.util.ValidUtil;

import net.sf.json.JSONObject;

/**
 * Token过滤器。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年5月17日-上午9:40:28
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TokenFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@SuppressWarnings("unchecked")
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		 
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		
		String url = servletRequest.getRequestURI();
		url = removeCtx(url, servletRequest.getContextPath());
		
		SecurityUrlHandler securityUrlHandler= (SecurityUrlHandler)AppUtil.getBean(SecurityUrlHandler.class);
		boolean isAnony = securityUrlHandler.isAnonymousAccess(url);
		CommonResult commonResult = null;
		int resCode = 200;
		
		if(!isAnony){
			String account = AppUtil.getAppid() + StringPool.COLON + servletRequest.getParameter("account");
			ICache<String> cache = AppUtil.getBean(MemoryCache.class);
			String token = (String) cache.getByKey(account);
			commonResult = ValidUtil.validToken(token);
			resCode = commonResult.getCode();
		}
		// 验证失败，返回
		if (HttpStatus.OK.value() == resCode) {
			TokenResult tokenResult = (TokenResult) commonResult;
			if (isAnony || tokenResult.getType() == Token.TOKEN_FORMAL) {
				chain.doFilter(request, response);
			} else {
				commonResult.setCode(HttpStatus.BAD_REQUEST.value());
				commonResult.setMessage("token是匿名的，不能访问url:" + url + ",请先登录!");
				commonResult.setCause("token是匿名的，不能访问url:" + url + ",请先登录!");
				response.getWriter().println(JSONObject.fromObject(commonResult).toString());
			}
		} else {
			response.getWriter().println(JSONObject.fromObject(commonResult).toString());
		}
	}

	@Override
	public void destroy() {
	}

	/**
	 * 获取当前URL
	 * 
	 * @param url
	 * @param contextPath
	 * @return
	 */
	private static String removeCtx(String url, String contextPath) {
		url = url.trim();
		if (StringUtil.isEmpty(contextPath))
			return url;
		if (StringUtil.isEmpty(url))
			return "";
		if (url.startsWith(contextPath)) {
			url = url.replaceFirst(contextPath, "");
		}
		return url;
	}

}

