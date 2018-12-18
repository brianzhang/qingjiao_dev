package com.lc.ibps.web.restConf;

import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.glassfish.jersey.server.ResourceConfig;

/**
 * Rest配置类
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017年8月2日-下午4:47:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class RestJaxRsApplication extends ResourceConfig {
	
	public static String pkgPath = "com.lc.ibps.platform.rest";
	
    public RestJaxRsApplication(){
    	
        register(JacksonJsonProvider.class);
        packages(new String[]{pkgPath});
        
    }
	
}