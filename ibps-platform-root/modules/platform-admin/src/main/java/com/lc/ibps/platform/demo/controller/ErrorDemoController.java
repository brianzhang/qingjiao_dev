package com.lc.ibps.platform.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 统一异常跳转测试页面。
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-10-下午8:23:30
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/demo/error/")
public class ErrorDemoController {

	/**
	 * 400 错误 请求无效
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get400")
	public void get400(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.sendError(HttpServletResponse.SC_BAD_REQUEST);
	}

	/**
	 * 403 错误 禁止执行访问
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get403")
	public void get403(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.sendError(HttpServletResponse.SC_FORBIDDEN);
	}

	/**
	 * 404 页面 不存在错误
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get404")
	public void get404(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);
	}

	/**
	 * 500 服务器内部错误
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("get500")
	public void get500(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	}

	/**
	 * 异常错误
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("getException")
	public void getException(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		throw new NullPointerException();
	}
}
