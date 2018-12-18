package com.lc.ibps.platform.auth.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.server.IAuthClientQueryService;
import com.lc.ibps.api.auth.server.IAuthClientService;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.auth.constants.ClientStatus;
import com.lc.ibps.auth.constants.GrantType;
import com.lc.ibps.auth.constants.Scope;
import com.lc.ibps.auth.persistence.entity.AuthClientPo;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.platform.auth.builder.AuthClientBuilder;

/**
 * 第三方授权 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-24 18:20:51
 *</pre>
 */
@Controller
@RequestMapping("/platform/auth/authClient/")
public class AuthClientController extends GenericController{
	@Resource
	private IAuthClientQueryService authClientQueryService;
	@Resource
	private IAuthClientService authClientService;
	
	/**
	 * 编辑【第三方授权】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("scopes", Scope.getValidStatuses())
				.addObject("grantTypes", GrantType.getValidStatuses())
				;
	}
	
	/**
	 * 【第三方授权】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		if(!ContextUtil.isSuper()){
			queryFilter.addFilter("CREATE_BY_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		}
		
		String listData = null;
		listData = authClientQueryService.query(queryFilter);
		
		PageList<AuthClientPo> authClientList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<AuthClientPo> list = AuthClientPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			authClientList = new PageList<AuthClientPo>(list, pageResult);
		}
		
		AuthClientBuilder.build(authClientList);
		return new PageJson(authClientList);
	}
	
	/**
	 * 编辑【第三方授权】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("audit")
	public ModelAndView audit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		AuthClientPo authClient=null;
		if(StringUtil.isNotEmpty(id)){
			String data = authClientQueryService.get(id);
			authClient= AuthClientPo.fromJsonString(data);
		}else{
			authClient = getDefaultPo();
		}
		AuthClientBuilder.build(authClient);
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("scopes", Scope.getValidStatuses())
				.addObject("grantTypes", GrantType.getValidStatuses())
				.addObject("authClient", authClient)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【第三方授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authClient
	 * @throws Exception
	 */
	@RequestMapping("doAudit")
	public void doAudit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			authClientService.audit(ContextUtil.getCurrentUserId(), json);
			message=new ResultMessage(ResultMessage.SUCCESS, "审核第三方授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对第三方授权操作失败,"+e.getMessage());
			logger.error("对第三方授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【第三方授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authClient
	 * @throws Exception
	 */
	@RequestMapping("doAuditBatch")
	public void doAuditBatch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "ids");
			String nopass = RequestUtil.getString(request, "nopass", null);
			if(StringUtil.isEmpty(nopass)){
				authClientService.audit(ContextUtil.getCurrentUserId(), ids);
			}else{
				String cause = RequestUtil.getString(request, "cause", "审核不通过");
				authClientService.reject(ContextUtil.getCurrentUserId(), ids, cause);
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "审核第三方授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对第三方授权操作失败,"+e.getMessage());
			logger.error("对第三方授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 编辑【第三方授权】信息页面
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
		AuthClientPo authClient=null;
		if(StringUtil.isNotEmpty(id)){
			String data = authClientQueryService.get(id);
			authClient= AuthClientPo.fromJsonString(data);
		}else{
			authClient = getDefaultPo();
		}
		AuthClientBuilder.build(authClient);
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("scopes", Scope.getValidStatuses())
				.addObject("grantTypes", GrantType.getValidStatuses())
				.addObject("authClient", authClient)
				.addObject("returnUrl", preUrl);
	}
	
	private AuthClientPo getDefaultPo() {
		AuthClientPo po = new AuthClientPo();
		po.setCreateBy(ContextUtil.getCurrentUserId());
		po.setCreateTime(new Date());
		po.setStatus(ClientStatus.PEDDING.getValue());
		
		return po;
	}

	/**
	 * 编辑【第三方授权】信息页面
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
		AuthClientPo authClient=null;
		if(StringUtil.isNotEmpty(id)){
			String data = authClientQueryService.get(id);
			authClient= AuthClientPo.fromJsonString(data);
		}else{
			authClient = getDefaultPo();
		}
		AuthClientBuilder.build(authClient);
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("scopes", Scope.getValidStatuses())
				.addObject("grantTypes", GrantType.getValidStatuses())
				.addObject("authClient", authClient)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【第三方授权】明细页面
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
		AuthClientPo authClient=null;
		if(StringUtil.isNotEmpty(id)){
			String data = authClientQueryService.get(id);
			authClient= AuthClientPo.fromJsonString(data);
		}
		AuthClientBuilder.build(authClient);
		
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("scopes", Scope.getValidStatuses())
				.addObject("grantTypes", GrantType.getValidStatuses())
				.addObject("authClient", authClient)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【第三方授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authClient
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			authClientService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存第三方授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对第三方授权操作失败,"+e.getMessage());
			logger.error("对第三方授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 重置密钥【第三方授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authClient
	 * @throws Exception
	 */
	@RequestMapping("reset")
	public void reset(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String id = RequestUtil.getString(request, "id");
			String clientSecret = RequestUtil.getString(request, "clientSecret");
			authClientService.reset(id, clientSecret);
			message=new ResultMessage(ResultMessage.SUCCESS, "密钥重置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "密钥重置失败,"+e.getMessage());
			logger.error("密钥重置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【第三方授权】记录
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
			authClientService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除第三方授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除第三方授权失败，" + e.getMessage());
			logger.error("删除第三方授权失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
