//package com.lc.ibps.platform.codegen.controller;
//
//import java.util.List;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.servlet.ModelAndView;
//
//import com.lc.ibps.api.base.query.QueryFilter;
//import com.lc.ibps.base.core.entity.ResultMessage;
//import com.lc.ibps.base.core.util.json.JsonUtil;
//import com.lc.ibps.base.core.util.string.StringUtil;
//import com.lc.ibps.base.framework.page.PageList;
//import com.lc.ibps.base.framework.page.PageResult;
//import com.lc.ibps.base.web.controller.GenericController;
//import com.lc.ibps.base.web.json.PageJson;
//import com.lc.ibps.base.web.util.RequestUtil;
//import com.lc.ibps.demo.codegen.service.BudgetApplyQueryService;
//import com.lc.ibps.demo.codegen.service.BudgetApplyService;
//
//import net.sf.json.JSONObject;
//
//
///**
// * t_budgetapply2018 控制类
// *
// *<pre> 
// * 开发公司：广州流辰信息技术有限公司
// * 开发人员：eddy
// * 邮箱地址：1546077710@qq.com
// * 创建时间：2018-03-23 10:03:59
// *</pre>
// */
//@Controller
//@RequestMapping("/platform/codegen/budgetApply/")
//public class BudgetApplyController extends GenericController{
//	@Resource
//	private BudgetApplyService budgetApplyService;
//	@Resource
//	private BudgetApplyQueryService budgetApplyQueryService;
//	
//	/**
//	 * 【t_budgetapply2018】列表(分页条件查询)数据
//	 *
//	 * @param request
//	 * @param reponse
//	 * @return
//	 * @throws Exception
//	 */
//	@SuppressWarnings("unchecked")
//	@RequestMapping("listJson")
//	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		QueryFilter queryFilter = getQuerFilter(request);
//		
//		String listData = budgetApplyQueryService.query(queryFilter);
//		PageList<BudgetApplyPo> budgetApplyList = null;
//		if(JsonUtil.isJsonObject(listData)){
//			JSONObject data = JSONObject.fromObject(listData);
//			List<BudgetApplyPo> list = BudgetApplyPo.fromJsonArrayString(data.getString("data"));
//			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
//			budgetApplyList = new PageList<BudgetApplyPo>(list, pageResult);
//		}
//		
//		return new PageJson(budgetApplyList);
//	}
//	
//	/**
//	 * 编辑【t_budgetapply2018】信息页面
//	 *
//	 * @param request
//	 * @param response
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping("edit")
//	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		String preUrl= RequestUtil.getPrePage(request);
//		String id=RequestUtil.getString(request, "id");
//		BudgetApplyPo budgetApply=null;
//		if(StringUtil.isNotEmpty(id)){
//			String data = null;
//			data = budgetApplyQueryService.get(id);
//			budgetApply = BudgetApplyPo.fromJsonString(data);
//		}
//
//		return getAutoView().addObject("budgetApply", budgetApply).addObject("returnUrl", preUrl);
//	}
//	
//	/**
//	 * 编辑【t_budgetapply2018】信息页面
//	 *
//	 * @param request
//	 * @param response
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping("flowEdit")
//	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		String preUrl= RequestUtil.getPrePage(request);
//		String id=RequestUtil.getString(request, "id");
//		BudgetApplyPo budgetApply=null;
//		if(StringUtil.isNotEmpty(id)){
//			String data = null;
//			data = budgetApplyQueryService.get(id);
//			budgetApply = BudgetApplyPo.fromJsonString(data);
//		}
//		return getAutoView().addObject("budgetApply", budgetApply).addObject("returnUrl", preUrl);
//	}
//	
//	/**
//	 * 【t_budgetapply2018】明细页面
//	 *
//	 * @param request
//	 * @param response
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping("get")
//	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		String preUrl= RequestUtil.getPrePage(request);
//		String id=RequestUtil.getString(request, "id");
//		BudgetApplyPo budgetApply=null;
//		if(StringUtil.isNotEmpty(id)){
//			String data = null;
//			data = budgetApplyQueryService.get(id);
//			budgetApply = BudgetApplyPo.fromJsonString(data);
//		}
//		return getAutoView().addObject("budgetApply", budgetApply).addObject("returnUrl", preUrl);
//	}
//	
//	/** 
//	 * 保存【t_budgetapply2018】信息
//	 *
//	 * @param request
//	 * @param response
//	 * @param  budgetApply
//	 * @throws Exception
//	 */
//	@RequestMapping("save")
//	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		ResultMessage message=null;
//		try {
//			String json = RequestUtil.getString(request, "json");
//			budgetApplyService.save(json);
//			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_budgetapply2018成功");
//		} catch (Exception e) {
//			message=new ResultMessage(ResultMessage.FAIL, "对t_budgetapply2018操作失败,"+e.getMessage());
//			logger.error("对t_budgetapply2018操作失败，" + e.getMessage(),e);
//		}
//		writeResultMessage(response.getWriter(), message);
//	}
//	
//	/**
//	 *  批量删除【t_budgetapply2018】记录
//	 *
//	 * @param request
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping("remove")
//	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		ResultMessage message=null;
//		try {
//			//获得待删除的id
//			String[] ids=RequestUtil.getStringAryByStr(request, "id");
//			budgetApplyService.deleteByIds(ids);
//			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_budgetapply2018成功");
//		} catch (Exception e) {
//			message=new ResultMessage(ResultMessage.FAIL, "删除t_budgetapply2018失败，" + e.getMessage());
//			logger.error("删除t_budgetapply2018失败，" + e.getMessage(),e);
//		}
//		writeResultMessage(response.getWriter(), message);
//	}
//	
//
//}