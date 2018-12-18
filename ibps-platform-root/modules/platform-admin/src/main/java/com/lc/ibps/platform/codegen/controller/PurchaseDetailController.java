

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
import com.lc.ibps.demo.codegen.service.PurchaseDetailService;
import com.lc.ibps.demo.codegen.service.PurchaseDetailQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;
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
 * 创建时间：2018-02-07 10:46:50
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/purchaseDetail/")
public class PurchaseDetailController extends GenericController{
	@Resource
	private PurchaseDetailService purchaseDetailService;
	@Resource
	private PurchaseDetailQueryService purchaseDetailQueryService;
	
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
		
		String listData = purchaseDetailQueryService.query(queryFilter);
		PageList<PurchaseDetailPo> purchaseDetailList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<PurchaseDetailPo> list = JsonUtil.getDTOList(data.getString("data"), PurchaseDetailPo.class);
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			purchaseDetailList = new PageList<PurchaseDetailPo>(list, pageResult);
		}
		
		return new PageJson(purchaseDetailList);
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
		PurchaseDetailPo purchaseDetail=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDetailQueryService.get(id);
			purchaseDetail = (PurchaseDetailPo)JsonUtil.getDTO(data, PurchaseDetailPo.class);
		}

		return getAutoView().addObject("purchaseDetail", purchaseDetail).addObject("returnUrl", preUrl);
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
		PurchaseDetailPo purchaseDetail=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDetailQueryService.get(id);
			purchaseDetail = (PurchaseDetailPo)JsonUtil.getDTO(data, PurchaseDetailPo.class);
		}
		return getAutoView().addObject("purchaseDetail", purchaseDetail).addObject("returnUrl", preUrl);
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
		PurchaseDetailPo purchaseDetail=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDetailQueryService.get(id);
			purchaseDetail = (PurchaseDetailPo)JsonUtil.getDTO(data, PurchaseDetailPo.class);
		}
		return getAutoView().addObject("purchaseDetail", purchaseDetail).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_purchasedetaillist】信息
	 *
	 * @param request
	 * @param response
	 * @param  purchaseDetail
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			purchaseDetailService.save(json);
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
			purchaseDetailService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_purchasedetaillist成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_purchasedetaillist失败，" + e.getMessage());
			logger.error("删除t_purchasedetaillist失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseDetailPo getFromJson(String json){
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PurchaseDetailPo purchaseDetailPo = getPurchaseDetailPo(jsonObj);

		return purchaseDetailPo;
	}
	
	/** 
	 * 获取t_purchasedetaillist数据
	 *
	 * @param jsonObj
	 */
	private PurchaseDetailPo getPurchaseDetailPo(JSONObject jsonObj){
		PurchaseDetailPo purchaseDetailPo = (PurchaseDetailPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseDetailPo.class);
		return purchaseDetailPo;
	}
	

}
