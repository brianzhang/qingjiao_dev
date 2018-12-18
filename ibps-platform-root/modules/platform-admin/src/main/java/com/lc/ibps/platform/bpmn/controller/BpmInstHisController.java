package com.lc.ibps.platform.bpmn.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.persistence.entity.BpmInstHisPo;
import com.lc.ibps.bpmn.repository.BpmInstHisRepository;

/**
 * 流程实例历史 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-19 15:39:04
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/instance/bpmInstHis/")
public class BpmInstHisController extends GenericController {
	@Resource
	private BpmInstHisRepository bpmInstHisRepository;

	/**
	 * 【流程实例历史】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<BpmInstHisPo> bpmInstHisList = (PageList<BpmInstHisPo>) bpmInstHisRepository.query(queryFilter);
		return new PageJson(bpmInstHisList);
	}

	/**
	 * 【流程实例历史】明细页面
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
		BpmInstHisPo bpmInstHis = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmInstHis = bpmInstHisRepository.get(id);
		}
		return getAutoView().addObject("bpmInstHis", bpmInstHis).addObject("returnUrl", preUrl);
	}

	/**
	 * 流程结束实例明细页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("detail")
	public ModelAndView detail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		return getAutoView().addObject("id", id).addObject("returnUrl", preUrl);
	}
}
