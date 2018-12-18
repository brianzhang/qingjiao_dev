package com.lc.ibps.platform.form.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  表单数据模版 控制类。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年6月16日-上午9:47:09
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/f/")
public class FormDataTemplateUrlController {

	/**
	 * 预览界面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("{id}.htm")
	public String preview(HttpServletRequest request, HttpServletResponse response,@PathVariable("id") String id) throws Exception {
		return "forward:/platform/form/formDataTemplate/url.htm?id="+id;
	}
}
