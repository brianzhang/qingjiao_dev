package com.lc.ibps.platform.org.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.org.service.IPartyGroupMgrService;
import com.lc.ibps.api.org.service.IPartyGroupService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyGroupPo;

/**
 * 用户组 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-07 14:21:55
 *</pre>
 */
@Controller
@RequestMapping("/platform/org/partyGroup/")
public class PartyGroupController extends GenericController{
	
	@Resource
	private IPartyGroupService partyGroupService;
	@Resource
	private IPartyGroupMgrService partyGroupMgrService;
	
	/**
	 * 编辑【用户组】信息页面
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
		PartyGroupPo partyGroup=null;
		if(StringUtil.isNotEmpty(id)){
			partyGroup=PartyGroupPo.fromJsonString(partyGroupService.loadCascade(id));
		}
		return getAutoView()
				.addObject("partyGroup", partyGroup)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【用户组】信息页面
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
		PartyGroupPo partyGroup=null;
		if(StringUtil.isNotEmpty(id)){
			partyGroup=PartyGroupPo.fromJsonString(partyGroupService.loadCascade(id));
		}
		return getAutoView().addObject("partyGroup", partyGroup).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【用户组】明细页面
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
		PartyGroupPo partyGroup=null;
		if(StringUtil.isNotEmpty(id)){
			partyGroup=PartyGroupPo.fromJsonString(partyGroupService.loadCascade(id));
		}
		return getAutoView().addObject("partyGroup", partyGroup).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【用户组】信息
	 *
	 * @param request
	 * @param response
	 * @param  partyGroup
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			partyGroupMgrService.save(RequestUtil.getString(request, "json"));
			message=new ResultMessage(ResultMessage.SUCCESS, "保存用户组成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对用户组操作失败,"+e.getMessage());
			logger.error("对用户组操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【用户组】记录
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
			partyGroupMgrService.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除用户组成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除用户组失败，" + e.getMessage());
			logger.error("删除用户组失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
