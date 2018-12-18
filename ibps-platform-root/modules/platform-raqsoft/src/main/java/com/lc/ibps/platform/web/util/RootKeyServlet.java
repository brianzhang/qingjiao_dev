package com.lc.ibps.platform.web.util;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

/**
 * 用于设置系统webAppRootKey
 *
 * <pre>
 *  
 * 构建组：ibps-platform-raqsoft
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2018年1月26日-下午3:06:22
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class RootKeyServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	/**
	 * Web app root key parameter at the servlet context level (i.e. a
	 * context-param in {@code web.xml}): "webAppRootKey".
	 */
	public static final String WEB_APP_ROOT_KEY_PARAM = "webAppRootKey";

	/** Default web app root key: "webapp.root" */
	public static final String DEFAULT_WEB_APP_ROOT_KEY = "webapp.root";

	public void init() throws ServletException {
		ServletContext servletContext = this.getServletContext();
		Assert.notNull(servletContext, "ServletContext must not be null");
		String root = servletContext.getRealPath("/");
		if (root == null) {
			throw new IllegalStateException("Cannot set web app root system property when WAR file is not expanded");
		}
		String param = this.getInitParameter(WEB_APP_ROOT_KEY_PARAM);
		String key = (param != null ? param : DEFAULT_WEB_APP_ROOT_KEY);
		String oldValue = System.getProperty(key);
		if (oldValue != null && !StringUtils.pathEquals(oldValue, root)) {
			throw new IllegalStateException("Web app root system property already set to different value: '" + key
					+ "' = [" + oldValue + "] instead of [" + root + "] - "
					+ "Choose unique values for the 'webAppRootKey' context-param in your web.xml files!");
		}
		System.setProperty(key, root);
		servletContext.log("Set web app root system property: '" + key + "' = [" + root + "]");
	}
}
