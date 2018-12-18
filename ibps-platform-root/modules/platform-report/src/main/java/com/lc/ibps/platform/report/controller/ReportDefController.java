package com.lc.ibps.platform.report.controller;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.common.ds.model.DataSourceModel;
import com.lc.ibps.api.common.ds.service.IDataSourceDefService;
import com.lc.ibps.api.report.constant.ReportType;
import com.lc.ibps.api.report.service.IReportParser;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.report.builder.ReportDefBuilder;
import com.lc.ibps.report.constants.ControlType;
import com.lc.ibps.report.constants.ReportDataType;
import com.lc.ibps.report.domain.ReportDef;
import com.lc.ibps.report.persistence.entity.ReportDefPo;
import com.lc.ibps.report.repository.ReportDefRepository;
import com.lc.ibps.report.strategy.ReportStrategyFactory;
import com.lc.ibps.report.util.ReportJsonUtil;
import com.lc.ibps.report.util.ReportFileUtil;

/**
 * 报表定义 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:40
 *</pre>
 */
@Controller
@RequestMapping("/platform/report/reportDef/")
public class ReportDefController extends GenericController{
	@Resource
	private ReportDefRepository reportDefRepository;
	@Resource
	private IDataSourceDefService dataSourceDefService;
	@Resource
	private ReportStrategyFactory factory;
	private IReportParser reportParser;
	
	/**
	 * 【报表定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String reportType = RequestUtil.getString(request, "reportType");
		if(StringUtil.isNotEmpty(reportType))
			queryFilter.addFilter("REPORT_TYPE_", reportType, QueryOP.EQUAL);
		PageList<ReportDefPo> reportDefList=(PageList<ReportDefPo>)reportDefRepository.query(queryFilter);
		ReportDefBuilder.build(reportDefList);
		return new PageJson(reportDefList);
	}
	
	/**
	 * 导入BO对象
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("importReport")
	public void importReport(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportType = RequestUtil.getString(request, "reportType");
		MultipartFile fileLoad = request.getFile("reportFile");
		ResultMessage message = null;
		ReportDefPo reportDefPo=null;
		File[] files = null;
		try {
			// 当前报表文件目录
			String currReportDir = AppFileUtil.getBasePath() + File.separator + reportType + File.separator 
									+ DateUtil.getCurrentTime(StringPool.DATE_FORMAT_TIMESTAMP_NOSPLIT);
			FileUtil.createFolder(currReportDir, false);
			
			// 原始文件名
			String name = fileLoad.getOriginalFilename();
			ReportDef reportDef = reportDefRepository.newInstance();
			String fileDir = StringUtil.substringBeforeLast(name, ".");
			//检查是否重复
			if(!reportDef.isExists(fileDir, reportType)){
				// 解压后文件的真正路径
				String unZipFilePath = currReportDir + File.separator + fileDir;
				// 解压文件
				AppFileUtil.unZipFile(fileLoad, unZipFilePath);
				reportParser = factory.get(reportType);
				// 校验是否包含源文件，有且只有一个
//				ReportFileUtil.validate(unZipFilePath, reportType);
				// 解析报表源文件
				File file = new File(unZipFilePath);
				if(file.isDirectory()){
					files = ReportFileUtil.findFile(file.getAbsolutePath(), reportType);
					for (File reportFile : files) {
						reportDefPo = ReportJsonUtil.string2ReportDef(reportParser.execute(reportFile, StringPool.N));
						
						reportDef.setData(reportDefPo);
						reportDef.saveCascade();
						
					}
//					file = ReportFileUtil.getFile(file.getAbsolutePath(), reportType);
				}
				
				if(BeanUtils.isNotEmpty(files)){
					message = new ResultMessage(ResultMessage.SUCCESS, "导入成功!");
				}else{
					message = new ResultMessage(ResultMessage.FAIL, "导入失败:返回对象为空！");
				}
			}else{
				message = new ResultMessage(ResultMessage.FAIL, "导入失败:该报表已经存在！");
			}
		} catch (Exception e) {
			logger.error("导入失败:" + e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "导入失败:" + e.getMessage());
		}
		
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 编辑【报表定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView mv = null;
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String reportType = RequestUtil.getString(request, "reportType");
		ReportDefPo reportDef=null;
		if(StringUtil.isNotEmpty(id)){
			reportDef=reportDefRepository.loadCascade(id, reportType);
			ReportDefBuilder.build(reportDef);
		}
		List<DataSourceModel> dataSourceList = dataSourceDefService.query(getQuerFilter(request));
		if(ReportType.RAQSOFT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/raqsoft/reportDefEdit.jsp");
		}else if(ReportType.IREPORT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/ireport/reportDefEdit.jsp");
		}else{
			mv = getAutoView();
		}
		
		mv.addObject("reportDataType", ReportDataType.stringfiy(reportType));
		mv.addObject("reportControlType",ControlType.stringfiy());
		return mv.addObject("dataSourceList", dataSourceList).addObject("reportDef", reportDef)
				.addObject("returnUrl", preUrl).addObject("reportType", reportType);
	}
	
	/**
	 * 编辑【报表定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView mv = null;
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String reportType = RequestUtil.getString(request, "reportType");
		ReportDefPo reportDef=null;
		if(StringUtil.isNotEmpty(id)){
			reportDef=reportDefRepository.loadCascade(id, reportType);
			ReportDefBuilder.build(reportDef);
		}
		List<DataSourceModel> dataSourceList = dataSourceDefService.query(getQuerFilter(request));
		if(ReportType.RAQSOFT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/raqsoft/reportDefEdit.jsp");
		}else if(ReportType.IREPORT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/ireport/reportDefEdit.jsp");
		}else{
			mv = getAutoView();
		}
		return mv.addObject("dataSourceList", dataSourceList).addObject("reportDef", reportDef)
				.addObject("returnUrl", preUrl).addObject("reportType", reportType);
	}
	
	/**
	 * 【报表定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView mv = null;
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String reportType = RequestUtil.getString(request, "reportType");
		ReportDefPo reportDef=null;
		if(StringUtil.isNotEmpty(id)){
			reportDef=reportDefRepository.loadCascade(id, reportType);
			ReportDefBuilder.build(reportDef);
		}
		if(ReportType.RAQSOFT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/raqsoft/reportDefGet.jsp");
		}else if(ReportType.IREPORT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/ireport/reportDefGet.jsp");
		}else{
			mv = getAutoView();
		}
		return mv.addObject("reportDef", reportDef).addObject("returnUrl", preUrl)
				.addObject("reportType", reportType);
	}
	
	/** 
	 * 保存【报表定义】信息
	 *
	 * @param request
	 * @param response
	 * @param  reportDef
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ReportDefPo reportDefPo = getFromRequest(request);
			//构造领域对象和保存数据
			ReportDef reportDef =reportDefRepository.newInstance(reportDefPo);
			reportDef.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存报表定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对报表定义操作失败,"+e.getMessage());
			logger.error("对报表定义操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ReportDefPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		return ReportJsonUtil.string2ReportDef(json);
	}
	
	/**
	 *  批量删除【报表定义】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			ReportDef reportDef =reportDefRepository.newInstance();
			reportDef.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除报表定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除报表定义失败，" + e.getMessage());
			logger.error("删除报表定义失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 初始化系统报表
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("initSysReport")
	public void initSysReport(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String reportType=RequestUtil.getString(request, "reportType");
			//构造领域对象和保存数据
			ReportDef reportDef =reportDefRepository.newInstance();
			reportDef.initSysReport("-1", reportType);
			message=new ResultMessage(ResultMessage.SUCCESS, "初始化系统报表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "初始化系统报表失败，" + e.getMessage());
			logger.error("删除报表定义失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	

}
