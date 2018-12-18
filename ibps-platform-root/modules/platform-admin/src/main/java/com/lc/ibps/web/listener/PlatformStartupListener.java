package com.lc.ibps.web.listener;

import java.util.Map;

import javax.servlet.ServletContextEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lc.ibps.api.report.service.IReportParser;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.web.listener.StartupListner;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.common.desktop.domain.DesktopColumn;
import com.lc.ibps.components.codegen.domain.Template;
import com.lc.ibps.components.codegen.repository.TemplateRepository;
import com.lc.ibps.report.strategy.ReportStrategyFactory;

/**
 * 系统初始化监听
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年12月29日-上午9:12:29
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class PlatformStartupListener extends StartupListner {
	protected static final Logger logger = LoggerFactory.getLogger(PlatformStartupListener.class);

	@Override
	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
		AppFileUtil.init(event.getServletContext());
		this.initDesktop();
		this.initCodeTemplate();
		this.initSysReport();
	}
	
	/**
	 * 初始系统报表
	 * 
	 */
	private void initSysReport() {
		logger.debug("开始初始系统报表------------------>");
		try {
			ReportStrategyFactory factory = AppUtil.getBean(ReportStrategyFactory.class);
			IReportParser parser = null;
			Map<String, IReportParser> map = factory.getReportParserMap();
			for (Map.Entry<String, IReportParser> entry: map.entrySet()) {
				parser = entry.getValue();
				Integer count = parser.countSysReport();
				if (BeanUtils.isNotEmpty(count) && count > 0) continue;
				parser.initSysReport("-1");
			}
		} catch (Exception e) {
			logger.error("初始化系统报表失败，详细请查看:", e);
		} finally {
			logger.debug("结束始初始化系统报表<---------------------");
		}
	}

	/**
	 * 初始在线代码生成器模板
	 * 
	 */
	private void initCodeTemplate() {
		logger.debug("开始初始在线代码生成器模板------------------>");
		try {
			TemplateRepository templateRepository = AppUtil.getBean(TemplateRepository.class);
			Integer count = templateRepository.countAll();
			if (BeanUtils.isNotEmpty(count) && count > 0) {
				return;
			}

			Template templateDomain = templateRepository.newInstance();
			templateDomain.initTemplate("-1");
		} catch (Exception e) {
			logger.error("初始化在线代码生成器模板失败，详细请查看:", e);
		} finally {
			logger.debug("结束始初始化在线代码生成器模板<---------------------");
		}
	}



	/**
	 * 初始化桌面
	 *
	 */
	private void initDesktop() {
		try {
			logger.debug("开始初始化桌面信息------------------>");
			DesktopColumn deskCol = (DesktopColumn) AppUtil.getBean("desktopColumn"); // 获取栏目实例
			deskCol.initDesktopColumn(false);
		} catch (Exception e) {
			logger.error("初始化桌面信息失败，详细请查看:" , e);
		} finally {
			logger.debug("结束始初始化桌面信息<---------------------");
		}

	}
}
