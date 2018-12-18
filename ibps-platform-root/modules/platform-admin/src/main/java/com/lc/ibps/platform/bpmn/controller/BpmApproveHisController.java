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
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.repository.BpmApproveRepository;

/**
 * 流程审批历史控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-19 15:31:07
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmApproveHis/")
public class BpmApproveHisController extends GenericController {
	@Resource
	private BpmApproveRepository bpmApproveHisRepository;

	/**
	 * 【流程审批历史】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<BpmApprovePo> bpmApproveHisList = (PageList<BpmApprovePo>) bpmApproveHisRepository.query(queryFilter);
		return new PageJson(bpmApproveHisList);
	}

	/**
	 * 【流程审批历史】明细页面
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
		BpmApprovePo bpmApproveHis = null;
		if (StringUtil.isNotEmpty(id)) {
			bpmApproveHis = bpmApproveHisRepository.get(id);
		}
		return getAutoView().addObject("bpmApproveHis", bpmApproveHis).addObject("returnUrl", preUrl);
	}
}
