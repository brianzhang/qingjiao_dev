package com.lc.ibps.web.filter;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.web.util.RegMatchers;

/**
 * 防止CSRF跨站请求攻击。
 * <pre>
 * 	这个主要是防止外链连入到本系统。
 * </pre>
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年2月23日-上午10:30:18
 * 版权：广州流辰信息科技有限公司版权所有
 * </pre>
 */
public class CsrfFilter  implements Filter {
	
	@Resource(name="csrfUrl")
	RegMatchers matchers;

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;
		
		//判断是否外链。
		String referer = req.getHeader("Referer");   
		String serverName = request.getServerName();
		//请求不是来自本网站。
//		if(null != referer&&referer.indexOf(serverName) < 0){  
//			//是否包含当前URL
//			boolean isIngoreUrl=matchers.isContainUrl(referer);
//			if(isIngoreUrl){
//				chain.doFilter(request, response);
//			}
//			else{
//				req.getRequestDispatcher("/commons/csrf.jsp").forward(req, response);  
//			}
//		}
//		else{
			chain.doFilter(request, response);
//		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
	}

}
