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
import com.lc.ibps.auth.persistence.entity.AuthAppPo;
import com.lc.ibps.auth.service.AuthAppQueryService;
import com.lc.ibps.auth.service.AuthAppService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.platform.auth.builder.AuthAppBuilder;



/**
 * 应用 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-15 09:49:23
 *</pre>
 */
@Controller
@RequestMapping("/platform/auth/authApp/")
public class AuthAppController extends GenericController{
	@Resource
	private AuthAppService authAppService;
	@Resource
	private AuthAppQueryService authAppQueryService;
	
	/**
	 * 【应用】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		String listData = authAppQueryService.query(queryFilter);
		PageList<AuthAppPo> authAppList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<AuthAppPo> list = AuthAppPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			authAppList = new PageList<AuthAppPo>(list, pageResult);
		}
		
		AuthAppBuilder.build(authAppList);
		
		return new PageJson(authAppList);
	}
	
	/**
	 * 编辑【应用】信息页面
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
		AuthAppPo authApp=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppQueryService.get(id);
			authApp = AuthAppPo.fromJsonString(data);
		}else{
			authApp = getDefaultPo();
		}
		AuthAppBuilder.build(authApp);

		return getAutoView().addObject("authApp", authApp).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【应用】信息页面
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
		AuthAppPo authApp=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppQueryService.get(id);
			authApp = AuthAppPo.fromJsonString(data);
		}else{
			authApp = getDefaultPo();
		}
		AuthAppBuilder.build(authApp);
		
		return getAutoView().addObject("authApp", authApp).addObject("returnUrl", preUrl);
	}
	
	private AuthAppPo getDefaultPo() {
		AuthAppPo po = new AuthAppPo();
		po.setCreateBy(ContextUtil.getCurrentUserId());
		po.setCreateTime(new Date());
		
		return po;
	}
	
	/**
	 * 【应用】明细页面
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
		AuthAppPo authApp=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = authAppQueryService.get(id);
			authApp = AuthAppPo.fromJsonString(data);
		}
		AuthAppBuilder.build(authApp);
		
		return getAutoView().addObject("authApp", authApp).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【应用】信息
	 *
	 * @param request
	 * @param response
	 * @param  authApp
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			authAppService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存应用成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对应用操作失败,"+e.getMessage());
			logger.error("对应用操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【应用】记录
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
			authAppService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除应用成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除应用失败，" + e.getMessage());
			logger.error("删除应用失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
