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
import com.lc.ibps.auth.constants.ApiScope;
import com.lc.ibps.auth.persistence.entity.AuthAppApiPo;
import com.lc.ibps.auth.service.AuthAppApiQueryService;
import com.lc.ibps.auth.service.AuthAppApiService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.platform.auth.builder.AuthAppApiBuilder;



/**
 * 应用API 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-15 11:36:13
 *</pre>
 */
@Controller
@RequestMapping("/platform/auth/authAppApi/")
public class AuthAppApiController extends GenericController{
	@Resource
	private AuthAppApiService authAppApiService;
	@Resource
	private AuthAppApiQueryService authAppApiQueryService;
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return getAutoView()
				.addObject("scopes", ApiScope.list())
				;
	}
	
	/**
	 * 【应用API】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		String listData = authAppApiQueryService.query(queryFilter);
		PageList<AuthAppApiPo> authAppApiList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<AuthAppApiPo> list = AuthAppApiPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			authAppApiList = new PageList<AuthAppApiPo>(list, pageResult);
		}
		AuthAppApiBuilder.build(authAppApiList);
		
		return new PageJson(authAppApiList);
	}
	
	/**
	 * 【应用API】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listGrantJson")
	public @ResponseBody PageJson listGrantJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		String grantKey = RequestUtil.getString(request, "grantKey", "");
		queryFilter.addParamsFilter("grantKey", grantKey);
		
		String listData = authAppApiQueryService.query(queryFilter);
		PageList<AuthAppApiPo> authAppApiList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<AuthAppApiPo> list = AuthAppApiPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			authAppApiList = new PageList<AuthAppApiPo>(list, pageResult);
		}
		AuthAppApiBuilder.build(authAppApiList);
		
		return new PageJson(authAppApiList);
	}
	
	/**
	 * 编辑【应用API】信息页面
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
		AuthAppApiPo authAppApi=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppApiQueryService.get(id);
			authAppApi = AuthAppApiPo.fromJsonString(data);
		}else{
			authAppApi = getDefaultPo();
		}

		AuthAppApiBuilder.build(authAppApi);
		
		return getAutoView().addObject("authAppApi", authAppApi)
				.addObject("scopes", ApiScope.list())
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【应用API】信息页面
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
		AuthAppApiPo authAppApi=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppApiQueryService.get(id);
			authAppApi = AuthAppApiPo.fromJsonString(data);
		}else{
			authAppApi = getDefaultPo();
		}
		
		AuthAppApiBuilder.build(authAppApi);
		
		return getAutoView().addObject("authAppApi", authAppApi)
				.addObject("scopes", ApiScope.list())
				.addObject("returnUrl", preUrl);
	}
	
	private AuthAppApiPo getDefaultPo() {
		AuthAppApiPo po = new AuthAppApiPo();
		po.setCreateBy(ContextUtil.getCurrentUserId());
		po.setCreateTime(new Date());
		
		return po;
	}
	
	/**
	 * 【应用API】明细页面
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
		AuthAppApiPo authAppApi=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppApiQueryService.get(id);
			authAppApi = AuthAppApiPo.fromJsonString(data);
		}
		
		AuthAppApiBuilder.build(authAppApi);
		
		return getAutoView().addObject("authAppApi", authAppApi)
				.addObject("scopes", ApiScope.list())
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【应用API】信息
	 *
	 * @param request
	 * @param response
	 * @param  authAppApi
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			authAppApiService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存应用API成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对应用API操作失败,"+e.getMessage());
			logger.error("对应用API操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【应用API】记录
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
			authAppApiService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除应用API成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除应用API失败，" + e.getMessage());
			logger.error("删除应用API失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

}
