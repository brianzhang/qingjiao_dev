package com.lc.ibps.platform.report.ireport.controller;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.report.constant.ReportConstants;
import com.lc.ibps.api.report.constant.ReportType;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringFormater;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.dynamic.DataSourceUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.report.ireport.mgr.JasperExporter;
import com.lc.ibps.report.ireport.mgr.JasperPreviewer;
import com.lc.ibps.report.ireport.mgr.JasperPrinter;
import com.lc.ibps.report.ireport.service.IReportReportParser;
import com.lc.ibps.report.persistence.entity.ReportDefPo;
import com.lc.ibps.report.persistence.entity.ReportParamsPo;
import com.lc.ibps.report.repository.ReportDefRepository;

import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 * 报表 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@Controller
@RequestMapping("/platform/report/ireport/")
public class ReportCenterController extends GenericController{
	
	@Resource
	private ReportDefRepository reportDefRepository;
	@Resource
	private IReportReportParser reportParserService;
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 【报表定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("page")
	@ResponseBody
	public Object page(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String reportId = RequestUtil.getString(request, "reportId", "");
		int page = RequestUtil.getInt(request, "page", 1);
		int rows = RequestUtil.getInt(request, "rows", 20);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("page", page);
		result.put("rows", rows);
		result.put("total", 0);
		result.put("records", 0);
		
		ReportDefPo po = reportDefRepository.loadCascade(reportId, ReportType.IREPORT.getValue());
		if(BeanUtils.isEmpty(po)){
			return result;
		}
		
		if(BeanUtils.isEmpty(po.getDsAlias())){
			return result;
		}
		
		DataSource ds = DataSourceUtil.getDataSourceByAlias(po.getDsAlias());
		if(BeanUtils.isEmpty(ds)){
			return result;
		}
		
		if(StringUtil.isEmpty(po.getSql())){
			return result;
		}
		
		Map<String, String> param = new HashMap<String, String>();
		Map<String, Map<String, Object>> fmtParam = parser$Params(request, po, param);
		
		jdbcTemplate = new JdbcTemplate(ds);
		
		String sql = "select count(0) tt from ("+po.getSql()+") tmp_count";
		//TODO 占位符替换，参数类型有影响
		sql = StringFormater.formatByMap(sql, "$P{", "}", fmtParam);
		Map<String, Object> ttMap = jdbcTemplate.queryForMap(sql);
		int total = Integer.valueOf(String.valueOf(ttMap.get("tt")));
		if(total%rows == 0){
			total = total/rows;
		}else{
			total = total/rows + 1;
		}
		
		result.put("total", total);
		
		String pageSql = "select count(0) rcs from ("+po.getPageSql()+") tmp_count";
		// 占位符替换
		pageSql = StringFormater.formatByMap(pageSql, "$P{", "}", fmtParam);
		Map<String, Object> rcsMap = jdbcTemplate.queryForMap(pageSql);
		result.put("records", rcsMap.get("rcs"));
		
		return result;
	}
	
	/**
	 * 参数解析
	 *
	 * @param request
	 * @param po
	 * @param param 
	 */
	private Map<String, Map<String, Object>> parser$Params(HttpServletRequest request, ReportDefPo po, Map<String, String> param) {
		Map<String, Map<String, Object>> fmtParam = new HashMap<String, Map<String, Object>>();
		Map<String, Object> paramMap = null;
		List<ReportParamsPo> paramsList = po.getReportParamsPoList();
		if(BeanUtils.isNotEmpty(paramsList)){
			for(ReportParamsPo paramsPo : paramsList){
				String paramData = RequestUtil.getString(request, paramsPo.getName(), paramsPo.getDefValue());
				param.put(paramsPo.getName(), paramData);
				paramMap = new HashMap<String, Object>();
				paramMap.put("class", paramsPo.getDataType());
				paramMap.put("value", paramData);
				fmtParam.put(paramsPo.getName(), paramMap);
			}
		}
		
		int page = RequestUtil.getInt(request, "page", 1);
		int rows = RequestUtil.getInt(request, "rows", 20);
		param.put(ReportConstants.OFFSET, String.valueOf((page -1) * rows));
		paramMap = new HashMap<String, Object>();
		paramMap.put("class", "java.lang.Integer");
		paramMap.put("value", String.valueOf((page -1) * rows));
		fmtParam.put(ReportConstants.OFFSET, paramMap);
		
		param.put(ReportConstants.LIMIT, String.valueOf(rows));
		paramMap = new HashMap<String, Object>();
		paramMap.put("class", "java.lang.Integer");
		paramMap.put("value", String.valueOf(rows));
		fmtParam.put(ReportConstants.LIMIT, paramMap);
		
		return fmtParam;
	}
	
	/** 
	 * 报表预览
	 * @param model 
	 * @return 
	 */  
	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String preUrl= RequestUtil.getPrePage(request);
		
		ModelAndView mv = new ModelAndView("/platform/report/ireport/preview.jsp").addObject("returnUrl", preUrl);
		// 报表文件加载
		try {
			ReportDefPo po = reportDefRepository.loadCascade(reportId, ReportType.IREPORT.getValue());
			if(BeanUtils.isEmpty(po)){
				mv.addObject("msg", "报表定义不存在！");
				return mv;
			}
			
			if(BeanUtils.isEmpty(po.getDsAlias())){
				mv.addObject("msg", "报表数据源未绑定！");
				return mv;
			}
			
			DataSource ds = DataSourceUtil.getDataSourceByAlias(po.getDsAlias());
			if(BeanUtils.isEmpty(ds)){
				mv.addObject("msg", "系统数据源不存在！");
				return mv;
			}
			
			mv.addObject("reportId", reportId);
			mv.addObject("reportParams", po.getReportParamsPoList());
		} catch (Exception e) {
			mv.addObject("msg", "预览失败，"+e.getMessage());
			logger.error("预览失败，"+e.getMessage(), e);
		}
		
		return mv;
	}
	
	/** 
	 * 报表展示
	 * @param model 
	 * @return 
	 */  
	@RequestMapping("showReport")
	public String showReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String type = RequestUtil.getString(request, "type", ReportConstants.HTML);
		Connection conn = null;
		
		try {
			ReportDefPo po = reportDefRepository.loadCascade(reportId, ReportType.IREPORT.getValue());
			if(BeanUtils.isEmpty(po)){
				return null;
			}
			
			if(BeanUtils.isEmpty(po.getDsAlias())){
				return null;
			}
			
			DataSource ds = DataSourceUtil.getDataSourceByAlias(po.getDsAlias());
			if(BeanUtils.isEmpty(ds)){
				return null;
			}
			
			String jasper = po.getDir();
			//TODO linux路径转换
			//jasper = jasper.replaceAll("\\\\", File.separator);
			//jasper = jasper.replaceAll("/", File.separator);
			if(StringPool.Y.equals(po.getIsSys())){
				jasper = AppFileUtil.getRealPath("/") + File.separator + jasper;
			}else{
				jasper = AppFileUtil.getBasePath() + File.separator + jasper;
			}
			jasper = StringUtil.trimSuffix(jasper, ".jrxml");
			String jasperFile = jasper + ".jasper";
			String pageable = RequestUtil.getString(request, "pageable", StringPool.Y);
			if(StringPool.Y.equals(pageable)){
				jasperFile = jasper + "Page.jasper";
			}
			
			conn = ds.getConnection();
			
			// 参数解析
			Map<String, Object> param = new HashMap<String, Object>();
			parserParams(request, po, param);
			
			JasperReport report = (JasperReport) JRLoader.loadObjectFromFile(jasperFile);
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(report, param, conn);
			
			switch (type) {
			case ReportConstants.HTML:
				JasperPreviewer.html(response, jasperPrint);
				break;
			case ReportConstants.PDF:
				JasperPreviewer.pdf(response, jasperPrint);
				break;
			default:
				JasperPreviewer.html(response, jasperPrint);
				break;
			}
		} catch (Exception e) {
			logger.error("展示失败，"+e.getMessage(), e);
		}finally{
			try {
				if(null != conn && !conn.isClosed()){
					conn.close();	
				}
			} catch (SQLException ignore) {}
		}
		
		return null;
	}
	
	/** 
	 * 报表导出
	 * @param model 
	 * @return 
	 */  
	@RequestMapping("exportReport")
	public String exportReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		String type = RequestUtil.getString(request, "type", ReportConstants.HTML);
		Connection conn = null;
		
		try {
			ReportDefPo po = reportDefRepository.loadCascade(reportId, ReportType.IREPORT.getValue());
			if(BeanUtils.isEmpty(po)){
				return null;
			}
			
			if(BeanUtils.isEmpty(po.getDsAlias())){
				return null;
			}
			
			DataSource ds = DataSourceUtil.getDataSourceByAlias(po.getDsAlias());
			if(BeanUtils.isEmpty(ds)){
				return null;
			}
			
			String jasper = po.getDir();
			//TODO linux路径转换
			//jasper = jasper.replaceAll("\\\\", File.separator);
			//jasper = jasper.replaceAll("/", File.separator);
			if(StringPool.Y.equals(po.getIsSys())){
				jasper = AppFileUtil.getRealPath("/") + File.separator + jasper;
			}else{
				jasper = AppFileUtil.getBasePath() + File.separator + jasper;
			}
			jasper = StringUtil.trimSuffix(jasper, ".jrxml");
			String jasperFile = jasper + ".jasper";
			
			conn = ds.getConnection();
			
			// 参数解析
			Map<String, Object> param = new HashMap<String, Object>();
			parserParams(request, po, param);
			
			JasperReport report = (JasperReport) JRLoader.loadObjectFromFile(jasperFile);
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(report, param, conn);
			
			JasperExporter.export(type, response, jasperPrint, po.getTitle());
		} catch (Exception e) {
			logger.error("展示失败，"+e.getMessage(), e);
		}finally{
			try {
				if(null != conn && !conn.isClosed()){
					conn.close();	
				}
			} catch (SQLException ignore) {}
		}
		
		return null;
	}
	
	/** 
	 * 报表打印
	 * @param model 
	 * @return 
	 */  
	@RequestMapping("printReport")
	public String printReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportId = RequestUtil.getString(request, "reportId", "");
		Connection conn = null;
		
		try {
			ReportDefPo po = reportDefRepository.loadCascade(reportId, ReportType.IREPORT.getValue());
			if(BeanUtils.isEmpty(po)){
				return null;
			}
			
			if(BeanUtils.isEmpty(po.getDsAlias())){
				return null;
			}
			
			DataSource ds = DataSourceUtil.getDataSourceByAlias(po.getDsAlias());
			if(BeanUtils.isEmpty(ds)){
				return null;
			}
			
			String jasper = po.getDir();
			//TODO linux路径转换
			//jasper = jasper.replaceAll("\\\\", File.separator);
			//jasper = jasper.replaceAll("/", File.separator);
			if(StringPool.Y.equals(po.getIsSys())){
				jasper = AppFileUtil.getRealPath("/") + File.separator + jasper;
			}else{
				jasper = AppFileUtil.getBasePath() + File.separator + jasper;
			}
			jasper = StringUtil.trimSuffix(jasper, ".jrxml");
			String jasperFile = jasper + ".jasper";
			
			conn = ds.getConnection();
			
			// 参数解析
			Map<String, Object> param = new HashMap<String, Object>();
			parserParams(request, po, param);
			
			JasperReport report = (JasperReport) JRLoader.loadObjectFromFile(jasperFile);
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(report, param, conn);
			
			JasperPrinter.print(jasperPrint);
		} catch (Exception e) {
			logger.error("展示失败，"+e.getMessage(), e);
		}finally{
			try {
				if(null != conn && !conn.isClosed()){
					conn.close();	
				}
			} catch (SQLException ignore) {}
		}
		
		return null;
	}

	/**
	 * 参数解析
	 *
	 * @param request
	 * @param po
	 * @param param 
	 */
	private void parserParams(HttpServletRequest request, ReportDefPo po, Map<String, Object> param) {
		List<ReportParamsPo> paramsList = po.getReportParamsPoList();
		if(BeanUtils.isNotEmpty(paramsList)){
			for(ReportParamsPo paramsPo : paramsList){
				String paramData = RequestUtil.getString(request, paramsPo.getName(), paramsPo.getDefValue());
				param.put(paramsPo.getName(), paramData);
			}
		}
		
		String pageable = RequestUtil.getString(request, "pageable", StringPool.Y);
		if(StringPool.Y.equals(pageable)){
			int page = RequestUtil.getInt(request, "page", 1);
			int rows = RequestUtil.getInt(request, "rows", 20);
			param.put(ReportConstants.OFFSET, (page -1) * rows);
			param.put(ReportConstants.LIMIT, rows);
		}
	}
	
	/**
	 *  编译【报表定义】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("init")
	public void init(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			reportParserService.initSysReport(ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "系统报表初始化成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "系统报表初始化失败，" + e.getMessage());
			logger.error("系统报表初始化失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
