

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
import com.lc.ibps.demo.codegen.service.PurchaseDemandService;
import com.lc.ibps.demo.codegen.service.PurchaseDemandQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDemandPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;

import java.util.List;

/**
 * 采购需求 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:48
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/purchaseDemand/")
public class PurchaseDemandController extends GenericController{
	@Resource
	private PurchaseDemandService purchaseDemandService;
	@Resource
	private PurchaseDemandQueryService purchaseDemandQueryService;
	
	/**
	 * 【采购需求】列表(分页条件查询)数据
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
		
		String listData = purchaseDemandQueryService.query(queryFilter);
		PageList<PurchaseDemandPo> purchaseDemandList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<PurchaseDemandPo> list = JsonUtil.getDTOList(data.getString("data"), PurchaseDemandPo.class);
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			purchaseDemandList = new PageList<PurchaseDemandPo>(list, pageResult);
		}
		
		return new PageJson(purchaseDemandList);
	}
	
	/**
	 * 编辑【采购需求】信息页面
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
		PurchaseDemandPo purchaseDemand=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDemandQueryService.loadCascade(id);
			purchaseDemand = (PurchaseDemandPo)JsonUtil.getDTO(data, PurchaseDemandPo.class);
		}

		return getAutoView().addObject("purchaseDemand", purchaseDemand).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【采购需求】信息页面
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
		PurchaseDemandPo purchaseDemand=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDemandQueryService.loadCascade(id);
			purchaseDemand = (PurchaseDemandPo)JsonUtil.getDTO(data, PurchaseDemandPo.class);
		}
		return getAutoView().addObject("purchaseDemand", purchaseDemand).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【采购需求】明细页面
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
		PurchaseDemandPo purchaseDemand=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseDemandQueryService.loadCascade(id);
			purchaseDemand = (PurchaseDemandPo)JsonUtil.getDTO(data, PurchaseDemandPo.class);
		}
		return getAutoView().addObject("purchaseDemand", purchaseDemand).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【采购需求】信息
	 *
	 * @param request
	 * @param response
	 * @param  purchaseDemand
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			purchaseDemandService.saveCascade(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存采购需求成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对采购需求操作失败,"+e.getMessage());
			logger.error("对采购需求操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【采购需求】记录
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
			purchaseDemandService.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除采购需求成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除采购需求失败，" + e.getMessage());
			logger.error("删除采购需求失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseDemandPo getFromJson(String json){
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<PurchaseAttachPo> purchaseAttachPoList = getPurchaseAttachPoList(jsonObj);
		List<PurchaseDetailPo> purchaseDetailPoList = getPurchaseDetailPoList(jsonObj);
		PurchaseDemandPo purchaseDemandPo = getPurchaseDemandPo(jsonObj);
		purchaseDemandPo.setPurchaseAttachPoList(purchaseAttachPoList);
		purchaseDemandPo.setPurchaseDetailPoList(purchaseDetailPoList);

		return purchaseDemandPo;
	}
	
	/** 
	 * 获取采购需求数据
	 *
	 * @param jsonObj
	 */
	private PurchaseDemandPo getPurchaseDemandPo(JSONObject jsonObj){
		PurchaseDemandPo purchaseDemandPo = (PurchaseDemandPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseDemandPo.class);
		return purchaseDemandPo;
	}
	
	/** 
	 * 获取采购需求附件数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<PurchaseAttachPo> getPurchaseAttachPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("purchaseAttachPoList")){
			return null;
		}
		
		List<PurchaseAttachPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("purchaseAttachPoList").toString(), 
													PurchaseAttachPo.class);
		jsonObj.discard("purchaseAttachPoList");
		return rs;
	}
	/** 
	 * 获取t_purchasedetaillist数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<PurchaseDetailPo> getPurchaseDetailPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("purchaseDetailPoList")){
			return null;
		}
		
		List<PurchaseDetailPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("purchaseDetailPoList").toString(), 
													PurchaseDetailPo.class);
		jsonObj.discard("purchaseDetailPoList");
		return rs;
	}

}
