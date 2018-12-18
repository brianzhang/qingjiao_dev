package com.lc.ibps.platform.office.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.constant.NodeStatus;
import com.lc.ibps.bpmn.api.service.BpmTaskService;
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.repository.BpmApproveRepository;

/** 
 * 流程中心-我的办理任务
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年1月17日-下午2:00:44
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/office/bpmReceivedTask/")
public class BpmReceivedTaskController extends GenericController {
	
	@Resource
	private BpmApproveRepository bpmApproveRepository;
	@Resource
	private BpmTaskService bpmTaskService;
	
	/**
	 * 已办任务
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("handledJson")
	@ResponseBody
	public PageJson handledJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		
		String userId = ContextUtil.getCurrentUserId();
		queryFilter.addFilter("AUDITOR_",userId, QueryOP.EQUAL);
		
		List<String> statuses = new ArrayList<String>();
		statuses.add(NodeStatus.AGREE.getKey());
		statuses.add(NodeStatus.OPPOSE.getKey());
		statuses.add(NodeStatus.REJECT.getKey());
		statuses.add(NodeStatus.REJECT_TO_START.getKey());
		statuses.add(NodeStatus.ABANDON.getKey());
		queryFilter.addParamsFilter("list", statuses);
		
		// 查询列表
		PageList<BpmApprovePo> list = (PageList<BpmApprovePo>) bpmApproveRepository.queryHandled(queryFilter);
		
		return new PageJson(list);
	}
	
	@RequestMapping("revoke")
	public void revoke(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//procInstId, taskId, taskKey
		String procInstId = RequestUtil.getString(request, "procInstId");
		String taskId = RequestUtil.getString(request, "taskId");
		String taskKey = RequestUtil.getString(request, "taskKey");
		ResultMessage message = null;
		try {
			bpmTaskService.recover(procInstId, taskId, taskKey);
			message = new ResultMessage(ResultMessage.SUCCESS, "流程任务撤回成功");
		} catch (Exception e) {
			logger.error("流程任务撤回失败，" + e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "流程任务撤回失败，" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
