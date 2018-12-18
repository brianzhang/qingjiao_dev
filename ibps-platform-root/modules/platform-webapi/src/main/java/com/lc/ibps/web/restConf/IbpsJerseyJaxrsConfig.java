package com.lc.ibps.web.restConf;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.jaxrs.config.BeanConfig;

/**
 * 重写JerseyJaxrsConfig
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017年8月29日-下午3:52:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class IbpsJerseyJaxrsConfig extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	public void init(ServletConfig config) throws ServletException
	{
		super.init(config);
		
	    BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion(AppUtil.getProperty("webapi.version"));
        beanConfig.setResourcePackage(RestJaxRsApplication.pkgPath);
        beanConfig.setBasePath(AppUtil.getProperty("webapi.baseURL"));
        beanConfig.setScan(true);
	    
	}

}
