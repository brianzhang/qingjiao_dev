
package com.lc.ibps.platform.report.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.report.constant.ReportType;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.report.constants.ControlType;
import com.lc.ibps.report.constants.ReportDataType;
import com.lc.ibps.report.domain.ReportParams;
import com.lc.ibps.report.persistence.entity.ReportParamsPo;
import com.lc.ibps.report.repository.ReportParamsRepository;

import net.sf.json.JSONObject;


/**
 * 报表参数 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:41
 *</pre>
 */
@Controller
@RequestMapping("/platform/report/reportParams/")
public class ReportParamsController extends GenericController{
	@Resource
	private ReportParamsRepository reportParamsRepository;
	
	/**
	 * 【报表参数】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ReportParamsPo> reportParamsList=(PageList<ReportParamsPo>)reportParamsRepository.query(queryFilter);
		return new PageJson(reportParamsList);
	}
	
	/**
	 * 编辑【报表参数】信息页面
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
		String reportType=RequestUtil.getString(request, "reportType");
		ReportParamsPo reportParams=null;
		if(StringUtil.isNotEmpty(id)){
			reportParams=reportParamsRepository.get(id);
		}
		if(ReportType.RAQSOFT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/raqsoft/reportParamsEdit.jsp");
		}else if(ReportType.IREPORT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/ireport/reportParamsEdit.jsp");
		}else{
			mv = getAutoView();
		}
		mv.addObject("reportDataType", ReportDataType.values());
		mv.addObject("reportControlType",ControlType.values());
		return mv.addObject("reportParams", reportParams).addObject("returnUrl", preUrl)
				.addObject("reportType", reportType);
	}
	
	/**
	 * 编辑【报表参数】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String reportType=RequestUtil.getString(request, "reportType");
		ReportParamsPo reportParams=null;
		if(StringUtil.isNotEmpty(id)){
			reportParams=reportParamsRepository.get(id);
		}
		return getAutoView().addObject("reportParams", reportParams).addObject("returnUrl", preUrl)
				.addObject("reportType", reportType);
	}
	
	/**
	 * 【报表参数】明细页面
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
		String reportType=RequestUtil.getString(request, "reportType");
		ReportParamsPo reportParams=null;
		if(StringUtil.isNotEmpty(id)){
			reportParams=reportParamsRepository.get(id);
		}
		if(ReportType.RAQSOFT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/raqsoft/reportParamsEdit.jsp");
		}else if(ReportType.IREPORT.getValue().equals(reportType)){
			mv = getAutoView("/platform/report/ireport/reportParamsEdit.jsp");
		}else{
			mv = getAutoView();
		}
		mv.addObject("reportDataType", ReportDataType.values());
		mv.addObject("reportControlType",ControlType.values());
		return mv.addObject("reportParams", reportParams).addObject("returnUrl", preUrl)
				.addObject("reportType", reportType);
	}
	
	/** 
	 * 保存【报表参数】信息
	 *
	 * @param request
	 * @param response
	 * @param  reportParams
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ReportParamsPo reportParamsPo = getFromRequest(request);
			//构造领域对象和保存数据
			ReportParams reportParams =reportParamsRepository.newInstance(reportParamsPo);
			reportParams.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存报表参数成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对报表参数操作失败,"+e.getMessage());
			logger.error("对报表参数操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ReportParamsPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ReportParamsPo reportParamsPo = getReportParamsPo(jsonObj);

		return reportParamsPo;
	}
	
	/** 
	 * 获取报表参数数据
	 *
	 * @param jsonObj
	 */
	private ReportParamsPo getReportParamsPo(JSONObject jsonObj){
		ReportParamsPo reportParamsPo = (ReportParamsPo) JsonUtil.getDTO(jsonObj.toString(), ReportParamsPo.class);
		return reportParamsPo;
	}
	
	
	/**
	 *  批量删除【报表参数】记录
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
			ReportParams reportParams =reportParamsRepository.newInstance();
			reportParams.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除报表参数成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除报表参数失败，" + e.getMessage());
			logger.error("删除报表参数失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
