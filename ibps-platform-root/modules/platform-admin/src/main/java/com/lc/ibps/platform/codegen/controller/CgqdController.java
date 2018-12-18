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
import com.lc.ibps.demo.codegen.service.CgqdService;
import com.lc.ibps.demo.codegen.service.CgqdQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;


/**
 * t_purchasedetaillist 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:06
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/cgqd/")
public class CgqdController extends GenericController{
	@Resource
	private CgqdService cgqdService;
	@Resource
	private CgqdQueryService cgqdQueryService;
	
	/**
	 * 【t_purchasedetaillist】列表(分页条件查询)数据
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
		
		String listData = cgqdQueryService.query(queryFilter);
		PageList<CgqdPo> cgqdList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<CgqdPo> list = CgqdPo.fromJsonArrayString(data.getString("data"));
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			cgqdList = new PageList<CgqdPo>(list, pageResult);
		}
		
		return new PageJson(cgqdList);
	}
	
	/**
	 * 编辑【t_purchasedetaillist】信息页面
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
		CgqdPo cgqd=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqdQueryService.get(id);
			cgqd = CgqdPo.fromJsonString(data);
		}

		return getAutoView().addObject("cgqd", cgqd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_purchasedetaillist】信息页面
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
		CgqdPo cgqd=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqdQueryService.get(id);
			cgqd = CgqdPo.fromJsonString(data);
		}
		return getAutoView().addObject("cgqd", cgqd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_purchasedetaillist】明细页面
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
		CgqdPo cgqd=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqdQueryService.get(id);
			cgqd = CgqdPo.fromJsonString(data);
		}
		return getAutoView().addObject("cgqd", cgqd).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_purchasedetaillist】信息
	 *
	 * @param request
	 * @param response
	 * @param  cgqd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			cgqdService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_purchasedetaillist成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_purchasedetaillist操作失败,"+e.getMessage());
			logger.error("对t_purchasedetaillist操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【t_purchasedetaillist】记录
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
			cgqdService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_purchasedetaillist成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_purchasedetaillist失败，" + e.getMessage());
			logger.error("删除t_purchasedetaillist失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	

}