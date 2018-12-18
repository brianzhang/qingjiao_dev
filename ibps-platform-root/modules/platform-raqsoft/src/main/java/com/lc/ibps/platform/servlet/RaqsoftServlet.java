package com.lc.ibps.platform.servlet;

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.runqian.report4.usermodel.Context;

/**
 * 展示报表
 * 
 * <pre>
 *  
 * 构建组：ibps-platform-raqsoft
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年12月5日-下午4:58:46
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class RaqsoftServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Default constructor.
	 */
	public RaqsoftServlet() {

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@SuppressWarnings({ "rawtypes", "static-access" })
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ServletContext application = this.getServletContext();
		String report = request.getParameter("raq");
		String reportFileHome = Context.getInitCtx().getMainDir();

		StringBuffer param = new StringBuffer();

		// 保证报表名称的完整性
		int iTmp = 0;
		if ((iTmp = report.lastIndexOf(".raq")) <= 0) {
			report = report + ".raq";
			iTmp = 0;
		}

		Enumeration paramNames = request.getParameterNames();
		if (paramNames != null) {
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String paramValue = request.getParameter(paramName);
				if (StringUtil.isNotEmpty(paramValue)) {
					// 把参数拼成name=value;name2=value2;.....的形式
					param.append(paramName).append("=").append(paramValue).append(";");
				}
			}
		}

		// 以下代码是检测这个报表是否有相应的参数模板
		String paramFile = report.substring(0, iTmp) + "_arg.raq";

		File f = new File(application.getRealPath(reportFileHome + File.separator + paramFile));
		request.setAttribute("hasParamFile", f.exists());
		request.setAttribute("report", report);
		request.setAttribute("paramFile", paramFile);
		request.setAttribute("params", param.toString());
		request.setAttribute("appmap", request.getContextPath());

		request.getRequestDispatcher("/reportJsp/showReport.jsp").forward(request, response);

		// response.getWriter().append("Served at:
		// ").append(request.getContextPath()).append(reportFileHome);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
