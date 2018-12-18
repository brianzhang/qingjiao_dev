package com.lc.ibps.web.utils;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.method.HandlerMethod;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.log.domain.Log;
import com.lc.ibps.common.log.persistence.entity.LogModulePo;
import com.lc.ibps.common.log.persistence.entity.LogPo;
import com.lc.ibps.common.log.repository.LogModuleRepository;
import com.lc.ibps.common.log.repository.LogRepository;

/**
 * 日志工具类
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年3月1日-下午7:37:10
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class LogUtils {

	/**
	 * 保存日志
	 */
	public static void saveLog(HttpServletRequest request, String title) {
		saveLog(request, null, null, title);
	}

	/**
	 * 保存日志
	 */
	public static void saveLog(HttpServletRequest request, Object handler, Exception ex, String title) {
		saveLog(request, handler, ex, title, null);
	}

	/**
	 * 保存日志
	 */
	public static void saveLog(HttpServletRequest request, Object handler, Exception ex, String title, String url) {
		saveLog(request, handler, ex, title, url, null);
	}

	/**
	 * 保存登录日志
	 *
	 * @param request
	 * @param type
	 * @param ex
	 */
	public static void saveLoginLog(HttpServletRequest request, String type, Exception ex) {
		LogPo po = new LogPo();
		po.setType(type);
		po.setTitle("系统登录");
		po.setIpAddr(RequestUtil.getIpAddr(request));
		po.setUserAgent(RequestUtil.getUserAgent(request));
		po.setModule("login");
		po.setRequestUri(request.getRequestURI());
		po.setParams(RequestUtil.getParameterMap(request));
		po.setMethod(request.getMethod());
		// 异步保存日志
		new SaveLogThread(po, null, ex).start();
	}

	/**
	 * 保存日志
	 */
	public static void saveLog(HttpServletRequest request, Object handler, Exception ex, String title, String url,
			String type) {

		User user = ContextUtil.getCurrentUser();
		if (BeanUtils.isEmpty(user))
			return;
		String uri = StringUtil.isEmpty(url) ? request.getRequestURI() : url;
		LogPo po = new LogPo();
		po.setTitle(title);
		po.setType(StringUtil.isNotEmpty(type) ? type : (ex == null ? LogPo.TYPE_ACCESS : LogPo.TYPE_EXCEPTION));
		po.setIpAddr(RequestUtil.getIpAddr(request));
		po.setUserAgent(RequestUtil.getUserAgent(request));
		setModule(po, uri, request.getContextPath());
		po.setRequestUri(uri);
		po.setParams(RequestUtil.getParameterMap(request));
		po.setMethod(request.getMethod());
		po.setCreateBy(user.getUserId());
		po.setCreateor(user.getFullname());
		// 异步保存日志
		new SaveLogThread(po, handler, ex).start();
	}

	private static void setModule(LogPo po, String uri, String ctx) {
		String href = StringUtils.substringAfter(uri, ctx + "/");
		String[] paths = href.split("[/]");
		if (BeanUtils.isEmpty(paths))
			return;
		int pathLength = paths.length;
		// 第一,二
		if (pathLength > 2)
			po.setModule(paths[1]);
		if (pathLength > 3) {
			StringBuffer subModule = new StringBuffer();
			for (int i = 2; i < pathLength - 1; i++) {
				if (pathLength - 2 == i) {
					subModule.append(paths[i]);
				} else {
					subModule.append("/").append(paths[i]);
				}
			}
			po.setSubModule(subModule.toString());
		}
	}

	private static LogRepository logRepository = AppUtil.getBean(LogRepository.class);
	private static LogModuleRepository logModuleRepository = AppUtil.getBean(LogModuleRepository.class);

	/**
	 * 保存日志线程
	 */
	public static class SaveLogThread extends Thread {

		private LogPo logPo;
		private Object handler;
		private Exception ex;

		public SaveLogThread(LogPo logPo, Object handler, Exception ex) {
			super(SaveLogThread.class.getSimpleName());
			this.logPo = logPo;
			this.handler = handler;
			this.ex = ex;
		}

		@Override
		public void run() {
			String moduleName = "";
			// 如果是访问日志则根据
			if (logPo.getType().equals(LogPo.TYPE_ACCESS) || logPo.getType().equals(LogPo.TYPE_LOGIN)
					|| logPo.getType().equals(LogPo.TYPE_LOGIN_ERROR)) {
				LogModulePo logModulePo = null;
				if (BeanUtils.isNotEmpty(logPo.getModule()))
					logModulePo = logModuleRepository.getByAlias(logPo.getModule());
				if (BeanUtils.isEmpty(logModulePo) || logModulePo.getEnabled())
					return;
				moduleName = logModulePo.getName();
			}
			// 获取日志标题
			if (StringUtils.isBlank(logPo.getTitle())) {
				if (handler instanceof HandlerMethod) {
					Method m = ((HandlerMethod) handler).getMethod();
					System.err.println(m);
				}
				logPo.setTitle(getMenuNamePath(logPo.getRequestUri(), moduleName));
			}
			// 如果有异常，设置异常信息
			logPo.setException(ExceptionUtil.getStackTraceAsString(ex));
			// 如果无标题并无异常日志，则不保存信息
			if (StringUtils.isBlank(logPo.getTitle()) && StringUtils.isBlank(logPo.getException())) {
				return;
			}
			// 保存日志信息
			Log log = logRepository.newInstance(logPo);
			log.create();
		}
	}

	/**
	 * 获取菜单名称路径（如：用户管理-员工管理-编辑）
	 * 
	 * @param moduleName
	 */
	public static String getMenuNamePath(String requestUri, String moduleName) {
		// 这个关联菜单 TODO
		String menuNamePath = "";
		if (StringUtil.isNotEmpty(moduleName))
			menuNamePath += moduleName;
		return menuNamePath;
	}

}
