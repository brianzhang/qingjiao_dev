package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.org.service.IPartyOrgAuthQueryService;
import com.lc.ibps.api.org.service.IPartyOrgAuthService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyUserPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;

/** 
 * 分级管理
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年8月25日-下午5:16:14
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyOrgAuth")
public class PartyOrgAuthController extends GenericController {
	
	@Resource
	private IPartyUserService partyUserService;
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyOrgAuthQueryService partyOrgAuthQueryService;
	@Resource
	private IPartyOrgAuthService partyOrgAuthService;
	
	/**
	 * 
	 * 分级管理具体授权列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.listJson()"
				+ "--->"
				+ "params="+queryFilter.getParams()
				);
		
		String listData = partyOrgAuthQueryService.query(queryFilter);
		PageList<PartyOrgAuthPo> list=null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyOrgAuthPo> result = PartyOrgAuthPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			list = new PageList<PartyOrgAuthPo>(result, pageResult);
		}

		if(BeanUtils.isNotEmpty(list)){
			for(PartyOrgAuthPo po : list){
				po.setOrgName(PartyEntityBuilder.buildPathName(po.getOrgID()));
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.listJson()"
				+ "--->"
				+ "list="+(list!=null?Arrays.toString(list.toArray()):"")
				);
		
		return new PageJson(list);
	}
	
	/**
	 * 
	 * 分级管理具体授权信息列表页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String groupId = RequestUtil.getString(request, "groupId");
		String prem = RequestUtil.getString(request, "prem");
		String mainOrgrade = RequestUtil.getString(request, "mainOrgrade");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.list()"
				+ "--->"
				+ "groupId="+groupId
				+ ",prem="+prem
				+ ",mainOrgrade="+mainOrgrade
				);
		
		String orgData = partyOrgService.getByIdJson(groupId);
		PartyOrgPo org = PartyOrgPo.fromJsonString(orgData);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.list()"
				+ "--->"
				+ "groupId="+groupId
				+ ",prem="+prem
				+ ",mainOrgrade="+mainOrgrade
				+ ",org="+(org!=null?org.toString():"")
				);
		
		return getAutoView().addObject("groupId", groupId)
				.addObject("mainOrgrade", mainOrgrade)
				.addObject("prem", prem)
				.addObject("org", org);
	}
	
	/**
	 * 
	 * 编辑分级管理具体授权信息页面
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
		boolean tree=RequestUtil.getBoolean(request, "tree");
		String groupId=RequestUtil.getString(request, "groupId");
		String mainOrgrade=RequestUtil.getString(request, "mainOrgrade");
		String prem = RequestUtil.getString(request, "prem");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				+ ",tree="+tree
				+ ",groupId="+groupId
				+ ",mainOrgrade="+mainOrgrade
				+ ",prem="+prem
				);
		
		String orgData = partyOrgService.getByIdJson(groupId);
		PartyOrgPo org = PartyOrgPo.fromJsonString(orgData);
		
		PartyOrgAuthPo orgAuth=null;
		 // 编辑
		if(StringUtil.isNotEmpty(id)){
			String orgAuthData = partyOrgAuthQueryService.get(id);
			orgAuth = PartyOrgAuthPo.fromJsonString(orgAuthData);
			
			String userData = partyUserService.getByIdJson(orgAuth.getManagerID());
			DefaultPartyUserPo po = DefaultPartyUserPo.fromJsonString2(userData);
			
			if(BeanUtils.isNotEmpty(po)) orgAuth.setManagerName(po.getName());
			if(BeanUtils.isNotEmpty(org)) orgAuth.setOrgName(org.getName());
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				+ ",tree="+tree
				+ ",groupId="+groupId
				+ ",mainOrgrade="+mainOrgrade
				+ ",prem="+prem
				+ ",org="+(org!=null?org.toString():"")
				+ ",orgAuth="+(orgAuth!=null?orgAuth.toString():"")
				);
		
		return getAutoView().addObject("partyOrgAuth", orgAuth)
							.addObject("groupId", groupId)
							.addObject("org", org)
							.addObject("tree", tree)
							.addObject("prem", prem)
							.addObject("mainOrgrade", mainOrgrade)
						    .addObject("returnUrl", preUrl);
	}
	
	/**
	 * 
	 * 系统用户信息明细页面
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
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.get()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				);
		
		PartyOrgAuthPo orgAuth=null;
		
		if(StringUtil.isNotEmpty(id)){
			String orgAuthData = partyOrgAuthQueryService.get(id);
			orgAuth = PartyOrgAuthPo.fromJsonString(orgAuthData);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.get()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				+ ",orgAuth="+(orgAuth!=null?orgAuth.toString():"")
				);
		
		return getAutoView().addObject("orgAuth", orgAuth)
			    			.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 
	 * 保存系统用户信息
	 *
	 * @param request
	 * @param response
	 * @param groupAuth
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,PartyOrgAuthPo orgAuth) throws Exception{
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.save()"
				+ "--->"
				+ "orgAuth="+(orgAuth!=null?orgAuth.toString():"")
				);
		
		String resultMsg = null;
		try {
			partyOrgAuthService.save(orgAuth.toJsonString());
			resultMsg="保存分级管理员成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			if(e instanceof OrgException){
				logger.warn(e.getMessage());
				writeResultMessage(response.getWriter(),e.getMessage(),ResultMessage.WARN);
			}else{
				resultMsg = "操作失败";
				logger.error(e.getMessage(),e);
				writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
			}
		}
	}
	
	/**
	 * 
	 * 批量删除系统用户记录(逻辑删除)
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
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyOrgAuthController.remove()"
					+ "--->"
					+ "aryIds="+(aryIds!=null?Arrays.toString(aryIds):"")
					);
			
			if(BeanUtils.isEmpty(aryIds)) throw new OrgException("没有要删除的记录");
			
			partyOrgAuthService.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除分级管理员成功");
		} catch (Exception e) {
			logger.error("删除分级管理员失败,"+e.getMessage(), e);
			message=new ResultMessage(ResultMessage.FAIL, "删除分级管理员失败,"+e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
}
