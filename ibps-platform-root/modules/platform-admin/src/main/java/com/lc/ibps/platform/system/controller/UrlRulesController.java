package com.lc.ibps.platform.system.controller;


import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.domain.UrlRules;
import com.lc.ibps.common.system.persistence.entity.UrlRulesPo;
import com.lc.ibps.common.system.repository.UrlRulesRepository;

import net.sf.json.JSONObject;

/**
* ibps_SYSTEM_URL_RULES【地址拦截规则】  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-01-21 10:18:53
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/system/urlRules/")
public class UrlRulesController extends GenericController{
	@Resource
	private UrlRulesRepository urlRulesRepository;
	@Resource
	private GroovyScriptEngine engine;
	
	/**
	 * ibps_SYSTEM_URL_RULES【地址拦截规则】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		List<UrlRulesPo> urlRulesList=urlRulesRepository.query(queryFilter);
		return new PageJson(urlRulesList);
	}
	
	/**
	 * 编辑ibps_SYSTEM_URL_RULES【地址拦截规则】信息页面
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
		String sysUrlId=RequestUtil.getString(request, "sysUrlId");
		UrlRulesPo urlRules=null;
		if(StringUtil.isNotEmpty(id)){
			urlRules=urlRulesRepository.get(id);
		}else {
			urlRules = new UrlRulesPo();
			urlRules.setSysUrlId(sysUrlId);
		}
		return getAutoView().addObject("urlRules", urlRules).addObject("returnUrl", preUrl);
	}
	
	/**
	 * ibps_SYSTEM_URL_RULES【地址拦截规则】明细页面
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
		UrlRulesPo urlRules=null;
		if(StringUtil.isNotEmpty(id)){
			urlRules=urlRulesRepository.get(id);
		}
		return getAutoView().addObject("urlRules", urlRules).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存ibps_SYSTEM_URL_RULES【地址拦截规则】信息
	 *
	 * @param request
	 * @param response
	 * @param  urlRules
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,UrlRulesPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			UrlRules urlRules = urlRulesRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				urlRules.create();
				resultMsg="添加URl规则 成功";
			}else{
				urlRules.update();
				resultMsg="更新URl规则 成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对URl规则操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除ibps_SYSTEM_URL_RULES【地址拦截规则】记录
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
			UrlRules urlRules = urlRulesRepository.newInstance();
			urlRules.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除ibps_SYSTEM_URL_RULES【地址拦截规则】成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除ibps_SYSTEM_URL_RULES【地址拦截规则】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 * TODO   测试拦截规则
	 * @author hugh zhuang
	 * @date     2016年1月25日-上午10:46:16
	 * @param request
	 * @param response
	 * @throws Exception 
	 */
	@RequestMapping("testRule")
	public void testRule(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String script = RequestUtil.getString(request, "script");
		String paramString = RequestUtil.getString(request, "params");
		Map<String, Object> map = new HashMap<String, Object>();
		JSONObject jsonObject=JSONObject.fromObject(paramString);
		Iterator<?> keys=jsonObject.keys();
		while (keys.hasNext()) {
			String name=keys.next().toString();
			map.put(name, jsonObject.get(name));
		}
		Map<String, Object> vars = new HashMap<String, Object>();
		vars.put("map", map);
		try{
			Boolean result = engine.executeBoolean(script, vars);
			writeResultMessage(response.getWriter(),result.toString(),ResultMessage.SUCCESS);
		}catch(Exception e){
			writeResultMessage(response.getWriter(),e.getMessage(),ResultMessage.FAIL);
		}
	}
}
