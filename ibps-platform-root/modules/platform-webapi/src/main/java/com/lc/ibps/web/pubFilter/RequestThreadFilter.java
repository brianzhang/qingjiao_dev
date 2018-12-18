package com.lc.ibps.web.pubFilter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.web.context.RequestContext;

/**
 * 用于拦截请求以获取HttpSevletRequest对象。<br>
 * 以供后续其他类使用,如可获取当前用户请求的IP等信息 <br>
 * 用于相同线程间共享Request对象
 * 
 * <pre>
 * 构建组：ibps-base-web
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-10-13-上午10:28:58
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class RequestThreadFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		try {
			cleanThreadLocal();
			RequestContext.setHttpServletRequest((HttpServletRequest) request);
			chain.doFilter(request, response);
		} finally {
			cleanThreadLocal();
		}
	}

	/**
	 *清理线程数据
	 */
	private void cleanThreadLocal() {
		RequestContext.clearHttpReqResponse();

		 //AnchorTag.cleanFuncRights(); //清理权限标签的 缓存
		 DbContextHolder.setDefaultDataSource();
	//	 ActivitiDefCache.clearLocal();//清理 Activiti定义缓存
	}



	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
		
	}




}
