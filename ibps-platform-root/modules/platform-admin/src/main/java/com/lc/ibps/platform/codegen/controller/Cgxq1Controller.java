package com.lc.ibps.platform.codegen.controller;

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
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.demo.codegen.service.Cgxq1Service;
import com.lc.ibps.demo.codegen.service.Cgxq1QueryService;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;

import java.util.List;

/**
 * t_cgxq 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:24
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/cgxq1/")
public class Cgxq1Controller extends GenericController{
	@Resource
	private Cgxq1Service cgxq1Service;
	@Resource
	private Cgxq1QueryService cgxq1QueryService;
	
	/**
	 * 【t_cgxq】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		String listData = cgxq1QueryService.query(queryFilter);
		PageList<Cgxq1Po> cgxq1List = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<Cgxq1Po> list = Cgxq1Po.fromJsonArrayString(data.getString("data"));
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			cgxq1List = new PageList<Cgxq1Po>(list, pageResult);
		}
		
		return new PageJson(cgxq1List);
	}
	
	/**
	 * 编辑【t_cgxq】信息页面
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
		Cgxq1Po cgxq1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxq1QueryService.loadCascade(id);
			cgxq1 = Cgxq1Po.fromJsonString(data);
		}

		return getAutoView().addObject("cgxq1", cgxq1).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_cgxq】信息页面
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
		Cgxq1Po cgxq1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxq1QueryService.loadCascade(id);
			cgxq1 = Cgxq1Po.fromJsonString(data);
		}
		return getAutoView().addObject("cgxq1", cgxq1).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_cgxq】明细页面
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
		Cgxq1Po cgxq1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxq1QueryService.loadCascade(id);
			cgxq1 = Cgxq1Po.fromJsonString(data);
		}
		return getAutoView().addObject("cgxq1", cgxq1).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_cgxq】信息
	 *
	 * @param request
	 * @param response
	 * @param  cgxq1
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			cgxq1Service.saveCascade(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_cgxq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_cgxq操作失败,"+e.getMessage());
			logger.error("对t_cgxq操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【t_cgxq】记录
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
			cgxq1Service.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_cgxq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_cgxq失败，" + e.getMessage());
			logger.error("删除t_cgxq失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	

}