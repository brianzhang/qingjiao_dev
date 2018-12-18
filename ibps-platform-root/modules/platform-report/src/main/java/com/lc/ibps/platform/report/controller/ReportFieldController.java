
package com.lc.ibps.platform.report.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.report.domain.ReportField;
import com.lc.ibps.report.persistence.entity.ReportFieldPo;
import com.lc.ibps.report.repository.ReportFieldRepository;

import net.sf.json.JSONObject;


/**
 * 报表字段 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:41
 *</pre>
 */
@Controller
@RequestMapping("/platform/report/reportField/")
public class ReportFieldController extends GenericController{
	@Resource
	private ReportFieldRepository reportFieldRepository;
	
	/**
	 * 【报表字段】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ReportFieldPo> reportFieldList=(PageList<ReportFieldPo>)reportFieldRepository.query(queryFilter);
		return new PageJson(reportFieldList);
	}
	
	/**
	 * 编辑【报表字段】信息页面
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
		ReportFieldPo reportField=null;
		if(StringUtil.isNotEmpty(id)){
			reportField=reportFieldRepository.get(id);
		}
		return getAutoView().addObject("reportField", reportField).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【报表字段】信息页面
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
		ReportFieldPo reportField=null;
		if(StringUtil.isNotEmpty(id)){
			reportField=reportFieldRepository.get(id);
		}
		return getAutoView().addObject("reportField", reportField).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【报表字段】明细页面
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
		ReportFieldPo reportField=null;
		if(StringUtil.isNotEmpty(id)){
			reportField=reportFieldRepository.get(id);
		}
		return getAutoView().addObject("reportField", reportField).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【报表字段】信息
	 *
	 * @param request
	 * @param response
	 * @param  reportField
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ReportFieldPo reportFieldPo = getFromRequest(request);
			//构造领域对象和保存数据
			ReportField reportField =reportFieldRepository.newInstance(reportFieldPo);
			reportField.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存报表字段成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对报表字段操作失败,"+e.getMessage());
			logger.error("对报表字段操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ReportFieldPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ReportFieldPo reportFieldPo = getReportFieldPo(jsonObj);

		return reportFieldPo;
	}
	
	/** 
	 * 获取报表字段数据
	 *
	 * @param jsonObj
	 */
	private ReportFieldPo getReportFieldPo(JSONObject jsonObj){
		ReportFieldPo reportFieldPo = (ReportFieldPo) JsonUtil.getDTO(jsonObj.toString(), ReportFieldPo.class);
		return reportFieldPo;
	}
	
	
	/**
	 *  批量删除【报表字段】记录
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
			ReportField reportField =reportFieldRepository.newInstance();
			reportField.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除报表字段成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除报表字段失败，" + e.getMessage());
			logger.error("删除报表字段失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
