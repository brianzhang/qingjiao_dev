package com.lc.ibps.platform.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.domain.UrlPermission;
import com.lc.ibps.common.system.persistence.entity.UrlPermissionPo;
import com.lc.ibps.common.system.persistence.entity.UrlRulesPo;
import com.lc.ibps.common.system.repository.UrlPermissionRepository;
import com.lc.ibps.common.system.repository.UrlRulesRepository;

/**
 * 【url地址拦截】 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-01-19 15:39:37
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/system/urlPermission/")
public class UrlPermissionController extends GenericController {
	@Resource
	private UrlPermissionRepository urlPermissionRepository;
	@Resource
	private UrlRulesRepository urlRulesRepository;

	/**
	 * 【url地址拦截】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		List<UrlPermissionPo> urlPermissionList = urlPermissionRepository
				.query(queryFilter);
		return new PageJson(urlPermissionList);
	}

	/**
	 * 编辑【url地址拦截】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		UrlPermissionPo urlPermission = null;
		List<UrlRulesPo> urlRulesList = new ArrayList<UrlRulesPo>();
		if (StringUtil.isNotEmpty(id)) {
			urlPermission = urlPermissionRepository.get(id);
			urlRulesList = urlRulesRepository.getByUrlPerId(id);
		}
		return getAutoView().addObject("urlPermission", urlPermission)
				.addObject("urlRules", urlRulesList).addObject("returnUrl", preUrl);
	}

	/**
	 * 【url地址拦截】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		UrlPermissionPo urlPermission = null;
		if (StringUtil.isNotEmpty(id)) {
			urlPermission = urlPermissionRepository.get(id);
		}
		return getAutoView().addObject("urlPermission", urlPermission).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【url地址拦截】信息
	 *
	 * @param request
	 * @param response
	 * @param urlPermission
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, UrlPermissionPo po)
			throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			UrlPermission urlPermission = urlPermissionRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				urlPermission.create();
				resultMsg = "添加【url地址拦截】成功";
			} else {
				urlPermission.update();
				resultMsg = "更新【url地址拦截】成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对【url地址拦截】操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除【url地址拦截】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			UrlPermission urlPermission = urlPermissionRepository.newInstance();
			urlPermission.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除【url地址拦截】成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除【url地址拦截】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * TODO方法名称描述
	 * @author hugh zhuang
	 * @date     2016年1月25日-上午10:48:18
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("getById")
	@ResponseBody
	public Object getById(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id=RequestUtil.getString(request, "id");
		UrlPermissionPo urlPermission = null;
		List<UrlRulesPo> urlRulesList = new ArrayList<UrlRulesPo>();
		if(StringUtil.isNotEmpty(id)){
			urlPermission=urlPermissionRepository.get(id);
			urlRulesList=urlRulesRepository.getByUrlPerId(id);
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("urlPermission", urlPermission);
		map.put("urlRulesList", urlRulesList);
		return map;
	}
}
