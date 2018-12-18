package com.lc.ibps.platform.org.controller;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.org.constant.GroupStatus;
import com.lc.ibps.api.org.service.IPartyAttrQueryService;
import com.lc.ibps.api.org.service.IPartyEntityMgrService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.persistence.entity.PartyAttrPo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;

/**
* 参与者  控制器类。
*
* <pre> 
* 构建组：ibps-org-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-06-20 09:08:11
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/org/partyEntity/")
public class PartyEntityController extends GenericController{
	@Resource
	private IPartyEntityMgrService partyEntityMgrService;
	@Resource
	private IPartyEntityService partyEntityService;
	@Resource
	private IPartyAttrQueryService partyAttrQueryService;
	
	/**
	 * 编辑参与者信息页面
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
		String parentId=RequestUtil.getString(request, "parentId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",paranetId="+parentId
				);
		
		PartyEntityPo partyEntity=null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyEntityService.getByIdJson(id);
			partyEntity = PartyEntityPo.fromJsonString(data);
		}
		
		GroupStatus[] statuses = GroupStatus.values();
		
		return getAutoView()
				.addObject("parentId", parentId)
				.addObject("statuses", statuses)
				.addObject("partyEntity", partyEntity)
				.addObject("returnUrl", preUrl);
	}
	
	@RequestMapping("manager")
	public ModelAndView manager(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView mv=getAutoView();
		//获取所有参与者信息
		String data = partyEntityService.findAll();
		List<PartyEntityPo> partyEntityPoList = PartyEntityPo.fromJsonArrayString(data);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.edit()"
				+ "--->"
				+ "partyEntityPoList="+(partyEntityPoList!=null?Arrays.toString(partyEntityPoList.toArray()):"")
				);
		
		return mv.addObject("partyEntityPoList", partyEntityPoList);
	}
	
	/**
	 * 参与者明细页面
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
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.get()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				);
		
		PartyEntityPo partyEntity=null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyEntityService.getByIdJson(id);
			partyEntity = PartyEntityPo.fromJsonString(data);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.get()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				+ ",partyEntity="+(partyEntity!=null?partyEntity.toString():"")
				);
		
		return getAutoView().addObject("partyEntity", partyEntity)
							.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存参与者信息
	 *
	 * @param request
	 * @param response
	 * @param  partyEntit
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,PartyEntityPo po) throws Exception{
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.save()"
				+ "--->"
				+ "partyEntity="+(po!=null?po.toString():"")
				);
		
		String resultMsg=null;
		try {
			if(StringUtil.isEmpty(po.getParentId())){
				po.setParentId("0");
			}
			partyEntityMgrService.save(po.toJsonString());
			resultMsg="操作参与者成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对参与者操作失败，";
			writeResultMessage(response.getWriter(),resultMsg+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
	/**
	 *  批量删除参与者记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aryIds=RequestUtil.getStringAryByStr(request, "id");
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.remove()"
					+ "--->"
					+ "aryIds="+(aryIds!=null?Arrays.toString(aryIds):"")
					);
			
			if(BeanUtils.isEmpty(aryIds)) throw new OrgException("没有要删除的记录");
			partyEntityMgrService.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除参与者成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除参与者失败,"+e.getMessage());
			logger.error("删除参与者失败,"+e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 参与者扩展属性编辑页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("attrEdit")
	public ModelAndView attrEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "entityId");
		String partyType=RequestUtil.getString(request, "partyType");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.attrEdit()"
				+ "--->preUrl="+preUrl
				+ ",id="+id+",partyType="+partyType);
		
		List<PartyAttrPo> partyAttrs = null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyAttrQueryService.findByPartyTypeUserId4Edit(partyType, id);
			if(JacksonUtil.isJsonArray(data)){
				partyAttrs = JacksonUtil.getDTOList(data, PartyAttrPo.class);
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.attrEdit()"
				+ "--->"
				+ "partyAttrs="+(partyAttrs!=null?partyAttrs.toString():"")
				);
		
		return getAutoView().addObject("partyAttrs", partyAttrs)
							.addObject("entityId", id)
							.addObject("partyType", partyType)
							.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 参与者扩展属性明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("attrGet")
	public ModelAndView attrGet(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String partyType=RequestUtil.getString(request, "partyType");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.attrGet()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id+",partyType="+partyType);
		
		List<PartyAttrPo> partyAttrs = null;
		if(StringUtil.isNotEmpty(id)){
			String data = partyAttrQueryService.findByPartyTypeUserId4Get(partyType, id);
			if(JacksonUtil.isJsonArray(data)){
				partyAttrs = JacksonUtil.getDTOList(data, PartyAttrPo.class);
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.attrGet()"
				+ "--->partyAttrs="+(partyAttrs==null?"":partyAttrs.toString())
				);
		
		return getAutoView().addObject("partyAttrs", partyAttrs)
							.addObject("returnUrl", preUrl)
							.addObject("partyType", partyType);
	}
	
	/** 
	 * 保存参与者信息
	 *
	 * @param request
	 * @param response
	 * @param  partyEntit
	 * @throws Exception
	 */
	@RequestMapping("addAttr")
	public void addAttr(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg=null;
		String id = RequestUtil.getString(request, "entityId");
		String json = RequestUtil.getString(request, "json");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.addAttr()"
				+ "--->"
				+ "entityId="+id+",json="+json);
		
		try {
			String data = JacksonUtil.getString(json, "attrItemList");
			partyEntityMgrService.addAttr(id, data);
			resultMsg = "参与者扩展属性操作成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对参与者扩展属性操作失败,";
			writeResultMessage(response.getWriter(),resultMsg+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
}
