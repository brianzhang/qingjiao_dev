

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
import com.lc.ibps.demo.codegen.service.PurchaseAttachService;
import com.lc.ibps.demo.codegen.service.PurchaseAttachQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseAttachPo;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;


/**
 * 采购需求附件 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/purchaseAttach/")
public class PurchaseAttachController extends GenericController{
	@Resource
	private PurchaseAttachService purchaseAttachService;
	@Resource
	private PurchaseAttachQueryService purchaseAttachQueryService;
	
	/**
	 * 【采购需求附件】列表(分页条件查询)数据
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
		
		String listData = purchaseAttachQueryService.query(queryFilter);
		PageList<PurchaseAttachPo> purchaseAttachList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<PurchaseAttachPo> list = JsonUtil.getDTOList(data.getString("data"), PurchaseAttachPo.class);
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			purchaseAttachList = new PageList<PurchaseAttachPo>(list, pageResult);
		}
		
		return new PageJson(purchaseAttachList);
	}
	
	/**
	 * 编辑【采购需求附件】信息页面
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
		PurchaseAttachPo purchaseAttach=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseAttachQueryService.get(id);
			purchaseAttach = (PurchaseAttachPo)JsonUtil.getDTO(data, PurchaseAttachPo.class);
		}

		return getAutoView().addObject("purchaseAttach", purchaseAttach).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【采购需求附件】信息页面
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
		PurchaseAttachPo purchaseAttach=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseAttachQueryService.get(id);
			purchaseAttach = (PurchaseAttachPo)JsonUtil.getDTO(data, PurchaseAttachPo.class);
		}
		return getAutoView().addObject("purchaseAttach", purchaseAttach).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【采购需求附件】明细页面
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
		PurchaseAttachPo purchaseAttach=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = purchaseAttachQueryService.get(id);
			purchaseAttach = (PurchaseAttachPo)JsonUtil.getDTO(data, PurchaseAttachPo.class);
		}
		return getAutoView().addObject("purchaseAttach", purchaseAttach).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【采购需求附件】信息
	 *
	 * @param request
	 * @param response
	 * @param  purchaseAttach
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			purchaseAttachService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存采购需求附件成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对采购需求附件操作失败,"+e.getMessage());
			logger.error("对采购需求附件操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【采购需求附件】记录
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
			purchaseAttachService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除采购需求附件成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除采购需求附件失败，" + e.getMessage());
			logger.error("删除采购需求附件失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PurchaseAttachPo getFromJson(String json){
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PurchaseAttachPo purchaseAttachPo = getPurchaseAttachPo(jsonObj);

		return purchaseAttachPo;
	}
	
	/** 
	 * 获取采购需求附件数据
	 *
	 * @param jsonObj
	 */
	private PurchaseAttachPo getPurchaseAttachPo(JSONObject jsonObj){
		PurchaseAttachPo purchaseAttachPo = (PurchaseAttachPo) JsonUtil.getDTO(jsonObj.toString(), PurchaseAttachPo.class);
		return purchaseAttachPo;
	}
	

}
