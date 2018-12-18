package com.lc.ibps.platform.console.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.web.model.UrlOption;
import com.lc.ibps.common.log.persistence.entity.LogPo;
import com.lc.ibps.common.log.utils.LogUtils;

/**
 * 异常处理。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-5-上午10:55:47
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/")
public class ErrorController {
	protected Logger logger = LoggerFactory.getLogger(ErrorController.class);

	@Resource
	private UrlOption urlOption;
	
	@RequestMapping("error")
	public ModelAndView error(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Throwable  ex = (Throwable ) request.getAttribute("javax.servlet.error.exception");
		String error = ""; // 错误内容
		if (ex != null)
			error = ExceptionUtil.getStackTraceAsString(ex);
		return new ModelAndView("error/error.jsp")
				.addObject("logout", urlOption.getLogoutUrl())
				.addObject("error", error);
	}

	/**
	 * 400 错误 请求无效
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get400")
	public ModelAndView get400(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String error = "400,请求无效"; // 错误内容
		LogUtils.saveLog(request, null, null, error, LogPo.TYPE_400);
		return new ModelAndView("error/400.jsp").addObject("logout", urlOption.getLogoutUrl());
	}

	/**
	 * 403 错误 禁止执行访问
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get403")
	public ModelAndView get403(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String error = "403,禁止执行访问"; // 错误内容
		LogUtils.saveLog(request, null, null, error, LogPo.TYPE_403);
		return new ModelAndView("error/403.jsp").addObject("logout", urlOption.getLogoutUrl());
	}

	/**
	 * 404错误 页面不存在错误
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get404")
	public ModelAndView get404(HttpServletRequest request, HttpServletResponse response) throws Exception {

		/*
		 * Enumeration<String> enumeration = request.getAttributeNames(); while
		 * (enumeration.hasMoreElements()) { String attrName =
		 * enumeration.nextElement(); Object attribute =
		 * request.getAttribute(attrName); logger.info(attrName + "," +
		 * attribute); }
		 */
		// javax.servlet.forward.request_uri
		String error = "404,页面不存在错误"; // 错误内容
		String url = (String) request.getAttribute("javax.servlet.forward.request_uri");
		LogUtils.saveLog(request, null, null, error, url, LogPo.TYPE_404);
		return new ModelAndView("error/404.jsp").addObject("url", url).addObject("logout", urlOption.getLogoutUrl());
	}

	/**
	 * 消息提醒
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("msg")
	public ModelAndView msg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String msg = request.getAttribute("msg") == null ? "" : request.getAttribute("msg").toString();
		return new ModelAndView("error/msg.jsp").addObject("msg", msg).addObject("logout", urlOption.getLogoutUrl());
	}

}
