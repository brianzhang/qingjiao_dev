package com.lc.ibps.platform.report.raqsoft.controller;

import java.io.File;
import java.util.Enumeration;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.report.constant.ReportType;
import com.lc.ibps.api.report.service.IReportDefService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.report.persistence.entity.ReportDefPo;
import com.lc.ibps.report.persistence.entity.ReportParamsPo;
import com.lc.ibps.report.strategy.ReportStrategyFactory;
import com.lc.ibps.report.util.ReportJsonUtil;
import com.runqian.report4.usermodel.Context;

/**
 * 润乾报表中心
 *
 * <pre> 
 * 构建组：ibps-report-raqsoft
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年12月11日-上午9:07:44
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/report/raqsoft/")
public class RaqsoftReportCenterController extends GenericController{
	
	@Resource
	private IReportDefService reportDefService;
	@Resource
	private ReportStrategyFactory factory;
	
	/** 
	 * 报表预览
	 * @param model 
	 * @return 
	 */  
	@SuppressWarnings({ "rawtypes", "static-access" })
	@RequestMapping("showReport")
	public ModelAndView showReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String reportName = RequestUtil.getString(request, "reportName", "");
		String viewUrl = RequestUtil.getString(request, "viewUrl");
		if(StringUtil.isEmpty(viewUrl)){
			viewUrl = "/platform/report/raqsoft/showReport.jsp";
		}
		String reportType = ReportType.RAQSOFT.getValue();
		ServletContext application = request.getServletContext();
		String preUrl= RequestUtil.getPrePage(request);
		ModelAndView mv = new ModelAndView(viewUrl).addObject("returnUrl", preUrl);
		String poStr = null;
		ReportDefPo po = null;
		try {
			if(StringUtil.isNotEmpty(reportId)){
				poStr = reportDefService.loadCascade(reportId, reportType);
			}else if(StringUtil.isEmpty(reportId)&&StringUtil.isNotEmpty(reportName)){
				poStr = reportDefService.findByName(reportName, reportType);
			}
			po = ReportJsonUtil.string2ReportDef(poStr);
			
			if(BeanUtils.isEmpty(po)){
				mv.addObject("msg", "报表定义不存在！");
				return mv;
			}
			mv.addObject("reportId", reportId);
			mv.addObject("reportParams", po.getReportParamsPoList());
			Context context = Context.getInitCtx();
			String reportFileHome = null;
			if(StringPool.Y.equals(po.getIsSys())){
				reportFileHome = StringUtil.substringBeforeLast(new StringBuilder(AppFileUtil.getRealPath("/"))
						.append(po.getDir()).toString(), File.separator);
			}else{
				reportFileHome = StringUtil.substringBeforeLast(new StringBuilder(AppFileUtil.ATTACH_PATH)
						.append(File.separator).append(po.getDir()).toString(), File.separator);
			}
			
			context.setMainDir(reportFileHome);
			String report = po.getTitle();
			
			StringBuffer params = new StringBuffer();
			
			// 保证报表名称的完整性
			if (report.lastIndexOf(".raq") <= 0) {
				report = report + ".raq";
			}
			
			Enumeration paramNames = request.getParameterNames();
			List<ReportParamsPo> reportParams = po.getReportParamsPoList();
			if (paramNames != null) {
				while (paramNames.hasMoreElements()) {
					String paramName = (String) paramNames.nextElement();
					String paramValue = request.getParameter(paramName);
					if (StringUtil.isNotEmpty(paramValue)&&!"reportId".equals(paramName)) {
						// 把参数拼成name=value;name2=value2;.....的形式
						params.append(paramName).append("=").append(paramValue).append(";");
					}
				}
			}
			
			// 以下代码是检测这个报表是否有相应的参数模板
			String paramFile = po.getTitle() + "_arg.raq";
	
			File f = new File(application.getRealPath(reportFileHome + File.separator + paramFile));
			mv.addObject("hasParamFile", f.exists());
			
			mv.addObject("params", params);
			mv.addObject("params2", params.length()>0 ? "&" + params.toString().replaceAll(";", "&").substring(0, params.length()-1) : "");
			mv.addObject("report", report);
			mv.addObject("paramFile", paramFile);
			mv.addObject("appmap", request.getContextPath());
			mv.addObject("reportParams", reportParams);

		} catch (Exception e) {
			mv.addObject("msg", "预览失败，"+e.getMessage());
			logger.error("预览失败，"+e.getMessage(), e);
		}
		return mv;
	}
	
	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String reportName = RequestUtil.getString(request, "reportName", "");
		//从哪里跳去报表，拟值有list和非list，缺省值list
		String from = RequestUtil.getString(request, "from", "list");
		ModelAndView mv = new ModelAndView("/platform/report/raqsoft/preview.jsp");
		String reportType = ReportType.RAQSOFT.getValue();
		String poStr = null;
		ReportDefPo po = null;
		try {
			if(StringUtil.isNotEmpty(reportId)){
				poStr = reportDefService.loadCascade(reportId, reportType);
			}else if(StringUtil.isEmpty(reportId)&&StringUtil.isNotEmpty(reportName)){
				poStr = reportDefService.findByName(reportName, reportType);
			}
			po = ReportJsonUtil.string2ReportDef(poStr);
			if(BeanUtils.isEmpty(po)){
				mv.addObject("msg", "报表定义不存在！");
				return mv;
			}
			addToolbarParam(mv);
			mv.addObject("reportId", po.getId());
			mv.addObject("reportParams", po.getReportParamsPoList());
			mv.addObject("reportType", reportType);
			mv.addObject("from", from);
		} catch (Exception e) {
			mv.addObject("msg", "预览失败，"+e.getMessage());
			logger.error("预览失败，"+e.getMessage(), e);
		}
		return mv;
	}
	
	@RequestMapping("preview2")
	public ModelAndView preview2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String reportName = RequestUtil.getString(request, "reportName", "");
		String cname1 = RequestUtil.getString(request, "cname1", "cname1");
		String cval1 = RequestUtil.getString(request, "cval1", "cval1");
		
		cval1 = new String (cval1.getBytes("ISO8859-1"),"utf-8").trim();    //将传递的中文参数值进行转换
		
		//从哪里跳去报表，拟值有list和非list，缺省值list
		String from = RequestUtil.getString(request, "from", "list");
		ModelAndView mv = new ModelAndView("/platform/report/raqsoft/preview2.jsp");
		String reportType = ReportType.RAQSOFT.getValue();
		String poStr = null;
		ReportDefPo po = null;
		try {
			if(StringUtil.isNotEmpty(reportId)){
				poStr = reportDefService.loadCascade(reportId, reportType);
			}else if(StringUtil.isEmpty(reportId)&&StringUtil.isNotEmpty(reportName)){
				poStr = reportDefService.findByName(reportName, reportType);
			}
			po = ReportJsonUtil.string2ReportDef(poStr);
			if(BeanUtils.isEmpty(po)){
				mv.addObject("msg", "报表定义不存在！");
				return mv;
			}
			addToolbarParam(mv);
			mv.addObject("reportId", po.getId());
			mv.addObject("reportParams", po.getReportParamsPoList());
			mv.addObject("reportType", reportType);
			mv.addObject("from", from);
			mv.addObject("cname1",cname1);
			mv.addObject("cval1",cval1);
			
			mv.addObject("reportName",reportName);
		} catch (Exception e) {
			mv.addObject("msg", "预览失败，"+e.getMessage());
			logger.error("预览失败，"+e.getMessage(), e);
		}
		return mv;
	}
	
	/**
	 * 
	 * 获取工具条位置配置参数
	 *
	 * @param mv
	 */
	private void addToolbarParam(ModelAndView mv){
		String printPosition = AppUtil.getProperty("report.raqsoft.toolbar.printPosition");
		mv.addObject("printPosition", printPosition);
	}
	

}
