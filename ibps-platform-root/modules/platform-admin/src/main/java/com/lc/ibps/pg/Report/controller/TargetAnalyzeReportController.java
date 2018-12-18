
package com.lc.ibps.pg.Report.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.pgs.Report.repository.TargetAnalyzeReportRepository;
import com.lc.ibps.pgs.Report.persistence.entity.TargetAnalyzeReportPo;
import com.lc.ibps.pgs.Report.domain.TargetAnalyzeReport;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_fxbg 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:52:06
 *</pre>
 */
@Controller
@RequestMapping("/pg/Report/targetAnalyzeReport/")
public class TargetAnalyzeReportController extends GenericController{
	@Resource
	private TargetAnalyzeReportRepository targetAnalyzeReportRepository;
	
	/**
	 * 【t_p_fxbg】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TargetAnalyzeReportPo> targetAnalyzeReportList=(PageList<TargetAnalyzeReportPo>)targetAnalyzeReportRepository.query(queryFilter);
		return new PageJson(targetAnalyzeReportList);
	}
	
	/**
	 * 编辑【t_p_fxbg】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TargetAnalyzeReportPo targetAnalyzeReport=null;
		if(StringUtil.isNotEmpty(id)){
			targetAnalyzeReport=targetAnalyzeReportRepository.get(id);
		}
		return getAutoView().addObject("targetAnalyzeReport", targetAnalyzeReport).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_fxbg】信息页面
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
		TargetAnalyzeReportPo targetAnalyzeReport=null;
		if(StringUtil.isNotEmpty(id)){
			targetAnalyzeReport=targetAnalyzeReportRepository.get(id);
		}
		return getAutoView().addObject("targetAnalyzeReport", targetAnalyzeReport).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_fxbg】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TargetAnalyzeReportPo targetAnalyzeReport=null;
		if(StringUtil.isNotEmpty(id)){
			targetAnalyzeReport=targetAnalyzeReportRepository.get(id);
		}
		return getAutoView().addObject("targetAnalyzeReport", targetAnalyzeReport).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_fxbg】信息
	 *
	 * @param request
	 * @param response
	 * @param  targetAnalyzeReport
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TargetAnalyzeReportPo targetAnalyzeReportPo = getFromRequest(request);
			//构造领域对象和保存数据
			TargetAnalyzeReport targetAnalyzeReport =targetAnalyzeReportRepository.newInstance(targetAnalyzeReportPo);
			targetAnalyzeReport.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_fxbg成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_fxbg操作失败,"+e.getMessage());
			logger.error("对t_p_fxbg操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TargetAnalyzeReportPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TargetAnalyzeReportPo targetAnalyzeReportPo = getTargetAnalyzeReportPo(jsonObj);

		return targetAnalyzeReportPo;
	}
	
	/** 
	 * 获取t_p_fxbg数据
	 *
	 * @param jsonObj
	 */
	private TargetAnalyzeReportPo getTargetAnalyzeReportPo(JSONObject jsonObj){
		TargetAnalyzeReportPo targetAnalyzeReportPo = (TargetAnalyzeReportPo) JsonUtil.getDTO(jsonObj.toString(), TargetAnalyzeReportPo.class);
		return targetAnalyzeReportPo;
	}
	
	
	/**
	 *  批量删除【t_p_fxbg】记录
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
			TargetAnalyzeReport targetAnalyzeReport =targetAnalyzeReportRepository.newInstance();
			targetAnalyzeReport.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_fxbg成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_fxbg失败，" + e.getMessage());
			logger.error("删除t_p_fxbg失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
