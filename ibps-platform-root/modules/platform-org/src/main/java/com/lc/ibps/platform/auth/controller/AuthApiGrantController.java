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

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.auth.constants.ClientStatus;
import com.lc.ibps.auth.persistence.entity.AuthApiGrantPo;
import com.lc.ibps.auth.service.AuthApiGrantQueryService;
import com.lc.ibps.auth.service.AuthApiGrantService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;



/**
 * API授权 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-27 17:56:49
 *</pre>
 */
@Controller
@RequestMapping("/platform/auth/authApiGrant/")
public class AuthApiGrantController extends GenericController{
	@Resource
	private AuthApiGrantService authApiGrantService;
	@Resource
	private AuthApiGrantQueryService authApiGrantQueryService;
	
	/**
	 * 编辑【API授权】信息页面
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
				.addObject("clientKey", RequestUtil.getString(request, "clientKey", ""))
				;
	}
	
	/**
	 * 【API授权】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		if(!ContextUtil.isSuper()){
			queryFilter.addFilter("CREATE_BY_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		}
		
		String listData = authApiGrantQueryService.query(queryFilter);
		PageList<AuthApiGrantPo> authApiGrantList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<AuthApiGrantPo> list = AuthApiGrantPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			authApiGrantList = new PageList<AuthApiGrantPo>(list, pageResult);
		}
		
		return new PageJson(authApiGrantList);
	}
	
	private AuthApiGrantPo getDefaultPo() {
		AuthApiGrantPo po = new AuthApiGrantPo();
		po.setCreateBy(ContextUtil.getCurrentUserId());
		po.setCreateTime(new Date());
		po.setStatus(ClientStatus.PEDDING.getValue());
		po.setGrantType("client");
		
		return po;
	}
	
	/**
	 * 编辑【API授权】信息页面
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
		AuthApiGrantPo authApiGrant=null;
		if(StringUtil.isNotEmpty(id)){
			String data = authApiGrantQueryService.get(id);
			authApiGrant= AuthApiGrantPo.fromJsonString(data);
		}else{
			authApiGrant = getDefaultPo();
		}
		
		//AuthClientBuilder.build(authClient);
		return getAutoView()
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("authApiGrant", authApiGrant)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【API授权】信息
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
			authApiGrantService.audit(ContextUtil.getCurrentUserId(), json);
			message=new ResultMessage(ResultMessage.SUCCESS, "审核API授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对API授权操作失败,"+e.getMessage());
			logger.error("对API授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【API授权】信息
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
				authApiGrantService.audit(ContextUtil.getCurrentUserId(), ids);
			}else{
				String cause = RequestUtil.getString(request, "cause", "审核不通过");
				authApiGrantService.reject(ContextUtil.getCurrentUserId(), ids, cause);
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "审核API授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对API授权操作失败,"+e.getMessage());
			logger.error("对API授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 编辑【API授权】信息页面
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
		AuthApiGrantPo authApiGrant=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authApiGrantQueryService.get(id);
			authApiGrant = AuthApiGrantPo.fromJsonString(data);
		}

		return getAutoView()
				.addObject("authApiGrant", authApiGrant)
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【API授权】信息页面
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
		AuthApiGrantPo authApiGrant=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authApiGrantQueryService.get(id);
			authApiGrant = AuthApiGrantPo.fromJsonString(data);
		}
		return getAutoView()
				.addObject("authApiGrant", authApiGrant)
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【API授权】明细页面
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
		AuthApiGrantPo authApiGrant=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authApiGrantQueryService.get(id);
			authApiGrant = AuthApiGrantPo.fromJsonString(data);
		}
		return getAutoView()
				.addObject("authApiGrant", authApiGrant)
				.addObject("clientStatus", ClientStatus.getValidStatuses())
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【API授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authApiGrant
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			authApiGrantService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存API授权成功");
			
			AuthApiGrantPo po = AuthApiGrantPo.fromJsonString(json);
			message.addVariable("clientKey", po.getGrantKey());
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对API授权操作失败,"+e.getMessage());
			logger.error("对API授权操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【API授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  authApiGrant
	 * @throws Exception
	 */
	@RequestMapping("grant")
	public void grant(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "apiArr");
			String grantKey = RequestUtil.getString(request, "grantKey");
			authApiGrantService.grant(grantKey, json);
			message=new ResultMessage(ResultMessage.SUCCESS, "API授权申请成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "API授权申请操作失败,"+e.getMessage());
			logger.error("API授权申请操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【API授权】记录
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
			authApiGrantService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除API授权成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除API授权失败，" + e.getMessage());
			logger.error("删除API授权失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

}
