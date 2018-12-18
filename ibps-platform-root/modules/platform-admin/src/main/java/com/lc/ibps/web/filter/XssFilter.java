package com.lc.ibps.web.filter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.util.RegMatchers;

/**
 *  * XSS安全过滤器。
 * <pre>
 *  这个功能是为了放置XSS攻击。
 *  如果有Xss攻击：
 *  	1.表单提交方式，平台将去到一个提示页面。
 *  	2.AJAX提交方式，弹出提示信息。
 *  可以配置某些不需要检测的URL.
 * </pre>
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年2月23日-上午10:30:02
 * 版权：广州流辰信息科技有限公司版权所有
 * </pre>
 */
public class XssFilter  implements Filter {
	
	private Pattern regex = Pattern.compile("<(\\S*?)[^>]*>.*?</\\1>|<[^>]+>", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE | Pattern.DOTALL | Pattern.MULTILINE);
	
	@Resource(name="xssUrl")
	RegMatchers matchers;

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest) request;
		//页面是否忽略。
		boolean isIngoreUrl=matchers.isContainUrl(req.getRequestURI());
		if(isIngoreUrl){
			chain.doFilter(request, response);
		}
		else{
			//检测是否有XSS攻击。
			boolean hasXss= checkXss(req);
			if(hasXss){
				String reqWith=req.getHeader("x-requested-with");
				//非ajax请求。
				if(StringUtil.isEmpty(reqWith)){
					request.getRequestDispatcher("/commons/xss.jsp")
						.forward(request, response);
				}
				else{
					ResultMessage resultMessage= new ResultMessage(ResultMessage.FAIL, "检测到XSS攻击，请检是否输入了HTML字符！");
					//resultMessage.setCause("nologin");
					response.getWriter().print(resultMessage);
				}
			}
			else{
				chain.doFilter(request, response);
			}
		}
	}
	
	

	@Override
	public void init(FilterConfig config) throws ServletException {
	}
	
	/**
	 * 判断输入是否有XSS注入问题。
	 * @param request
	 * @return
	 */
	private boolean checkXss(HttpServletRequest request){
		Enumeration<?> params = request.getParameterNames();
		while (params.hasMoreElements()) {
			String key = params.nextElement().toString();
			String[] vals=request.getParameterValues(key);
			String val=StringUtil.join(vals, "");
			if(StringUtil.isEmpty(val)) continue;
			
			Matcher regexMatcher = regex.matcher(val);
			if(regexMatcher.find()){
				return true;
			}
		}
		return false;
	}

	
	
}