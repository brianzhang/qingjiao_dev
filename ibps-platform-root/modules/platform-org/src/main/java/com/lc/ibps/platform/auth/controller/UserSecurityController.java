package com.lc.ibps.platform.auth.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.IUserSecurityQueryService;
import com.lc.ibps.api.auth.service.IUserSecurityService;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.UserSecurityPo;

/**
 * 用户密码安全设置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：summer
 * 邮箱地址：1121813340@qq.com
 * 创建时间：2017-12-04 12:23:45
 *</pre>
 */
@Controller
@RequestMapping("/platform/auth/userSecurity/")
public class UserSecurityController extends GenericController{
	
	@Resource
	private IUserSecurityQueryService userSecurityQueryService;
	@Resource
	private IUserSecurityService userSecurityService;
	
	/**
	 * 【用户密码安全设置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<UserSecurityPo> userSecurityList = null;
		
		String listData = userSecurityQueryService.query(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<UserSecurityPo> list = UserSecurityPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			userSecurityList = new PageList<UserSecurityPo>(list, pageResult);
		}
		
		return new PageJson(userSecurityList);
	}
	
	/**
	 * 编辑【用户密码安全设置】信息页面
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
		UserSecurityPo userSecurity=null;
		if(StringUtil.isNotEmpty(id)){
			userSecurity = get(id);
		}else{
			userSecurity=getDefault();
		}
		
		return getAutoView().addObject("userSecurity", userSecurity).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【用户密码安全设置】信息页面
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
		UserSecurityPo userSecurity=null;
		if(StringUtil.isNotEmpty(id)){
			userSecurity = get(id);
		}else{
			userSecurity=getDefault();
		}
		return getAutoView().addObject("userSecurity", userSecurity).addObject("returnUrl", preUrl);
	}
	
	private UserSecurityPo getDefault(){
		UserSecurityPo po = new UserSecurityPo();
		po.setIsDefault(StringPool.N);
		po.setIsUseComp(StringPool.N);
		
		return po;
	}
	
	/**
	 * 【用户密码安全设置】明细页面
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
		UserSecurityPo userSecurity=null;
		if(StringUtil.isNotEmpty(id)){
			userSecurity = get(id);
		}
		return getAutoView().addObject("userSecurity", userSecurity).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【用户密码安全设置】信息
	 *
	 * @param request
	 * @param response
	 * @param  userSecurity
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String json = RequestUtil.getString(request, "json");
		try {
			userSecurityService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存用户密码安全设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对用户密码安全设置操作失败，"+e.getMessage());
			logger.error("对用户密码安全设置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【用户密码安全设置】记录
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
			userSecurityService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除用户密码安全设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除用户密码安全设置失败，" + e.getMessage());
			logger.error("删除用户密码安全设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  设置【用户密码安全设置】默认
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setDefault")
	public void setDefault(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String id = RequestUtil.getString(request, "id");
			userSecurityService.setDefault(id);
			message=new ResultMessage(ResultMessage.SUCCESS, "设置默认用户密码安全设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "设置默认用户密码安全设置失败，" + e.getMessage());
			logger.error("设置默认用户密码安全设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  设置【用户密码安全设置】启用/禁用
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setUse")
	public void setUse(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String use = RequestUtil.getString(request, "use");
		String id = RequestUtil.getString(request, "id");
		String profix = "启用";
		if(StringPool.N.equals(use)) profix = "禁用";
		try {
			userSecurityService.setUse(id, use);
			
			message=new ResultMessage(ResultMessage.SUCCESS, profix+"用户密码安全设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, profix+"用户密码安全设置失败，" + e.getMessage());
			logger.error(profix+"用户密码安全设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	private UserSecurityPo get(String id){
		String data = userSecurityQueryService.get(id);
		return UserSecurityPo.fromJsonString(data);
	}
}
