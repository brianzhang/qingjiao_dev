package com.lc.ibps.web.listener;

import javax.servlet.ServletContextEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lc.ibps.base.web.listener.StartupListner;

/**
 * 系统初始化监听
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年12月29日-上午9:12:29
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class WebApiStartupListener extends StartupListner{
	protected static final Logger logger = LoggerFactory
			.getLogger(WebApiStartupListener.class);
	
	@Override
	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
	}
}
