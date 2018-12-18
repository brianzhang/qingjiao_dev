package com.lc.ibps.platform.job.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.quartz.SchedulerException;
import org.quartz.Trigger.TriggerState;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.scheduler.persistence.manager.SchedulerManager;
import com.lc.ibps.common.scheduler.persistence.model.JobDetailVo;
import com.lc.ibps.common.scheduler.persistence.model.TriggerVo;
import com.lc.ibps.components.quartz.ISchedulerService;

@Controller
@RequestMapping("/platform/job/scheduler/")
public class SchedulerController extends GenericController {

	@Resource
	private SchedulerManager schedulerManager;
	@Resource
	private ISchedulerService schedulerService;

	/**
	 * 添加任务
	 * 
	 * @param response
	 * @param request
	 * @param viewName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("jobSave")
	public void jobSave(HttpServletResponse response, HttpServletRequest request) throws Exception {
		String resultMsg = "";
		try {
			String jobClass = RequestUtil.getString(request, "jobClass");
			String jobName = RequestUtil.getString(request, "jobName");
			String group = RequestUtil.getString(request, "group");
			String parameterJson = RequestUtil.getString(request, "parameterJson");
			String description = RequestUtil.getString(request, "description");
			boolean isExist = schedulerManager.isJobExists(jobName, group);
			if (isExist) {
				resultMsg = "任务名称已经存在，添加失败!";
				writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
			} else {
				schedulerManager.addJob(jobName, group, jobClass, parameterJson, description);
				writeResultMessage(response.getWriter(), "添加任务成功!", ResultMessage.SUCCESS);
			}
		} catch (ClassNotFoundException ex) {
			resultMsg = "添加指定的任务类不存在!";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
		} catch (Exception e) {
			resultMsg = "添加任务失败!";
			logger.error(e.getMessage(), e);
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 任务列表
	 * 
	 * @param response
	 * @param request
	 * @return
	 * @throws SchedulerException
	 */
	@RequestMapping("jobListJson")
	@ResponseBody
	public PageJson jobListJson(HttpServletResponse response, HttpServletRequest request) throws SchedulerException {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<JobDetailVo> list = (PageList<JobDetailVo>) schedulerManager.queryJob(queryFilter);
		PageJson pageJson = new PageJson(list);
		return pageJson;
	}

	/**
	 * 添加计划
	 * 
	 * @param response
	 * @param request
	 * @param viewName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("jobEdit")
	public ModelAndView jobEdit(HttpServletResponse response, HttpServletRequest request) throws Exception {
		String returnUrl = RequestUtil.getPrePage(request);
		List<String> groupList = schedulerManager.getAllGroups();
		Map<String, List<String>> jobName = schedulerManager.getAllJobNameMap();
		String jobNameMap = JsonUtil.getJSONString(jobName);
		jobNameMap = StringEscapeUtils.escapeHtml(jobNameMap);
		return getAutoView().addObject("jobNameMap", jobNameMap).addObject("returnUrl", returnUrl)
				.addObject("groupList", groupList);

	}

	/**
	 * 删除任务
	 * 
	 * @param response
	 * @param request
	 * @throws IOException
	 * @throws SchedulerException
	 * @throws ClassNotFoundException
	 */
	@RequestMapping("jobRemove")
	public void jobRemove(HttpServletResponse response, HttpServletRequest request)
			throws SchedulerException, IOException {

		ResultMessage message = null;
		try {
			String[] jobNames = RequestUtil.getStringAryByStr(request, "jobName");
			String[]  groups = RequestUtil.getStringAryByStr(request, "group");
			schedulerManager.jobRemove(jobNames, groups);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除任务成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除任务失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("executeJob")
	public void executeJob(HttpServletResponse response, HttpServletRequest request) throws IOException {
		ResultMessage message = null;
		String jobName = RequestUtil.getString(request, "jobName");
		String group = RequestUtil.getString(request, "group");
		try {
			schedulerService.executeJob(jobName, group);
			message = new ResultMessage(ResultMessage.SUCCESS, "执行任务成功");
		} catch (SchedulerException e) {
			message = new ResultMessage(ResultMessage.FAIL, "执行任务失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 添加计划
	 * 
	 * @param response
	 * @param request
	 * @param viewName
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("trigEdit")
	public ModelAndView trigEdit(HttpServletResponse response, HttpServletRequest request) throws Exception {
		String returnUrl = RequestUtil.getPrePage(request);
		String jobName = RequestUtil.getString(request, "jobName");
		String group = RequestUtil.getString(request, "group");
		List<String> allTrigNameList = schedulerManager.getTrigNameByJobNameAndGroup(jobName, group);
		String allTrigName = JsonUtil.getJSONString(allTrigNameList);
		allTrigName = StringEscapeUtils.escapeHtml(allTrigName);
		return getAutoView().addObject("jobName", jobName).addObject("group", group).addObject("returnUrl", returnUrl)
				.addObject("allTrigName", allTrigName);

	}

	/**
	 * 计划列表
	 * 
	 * @param response
	 * @param request
	 * @return
	 * @throws SchedulerException
	 */
	@RequestMapping("trigListJson")
	@ResponseBody
	public PageJson trigListJson(HttpServletResponse response, HttpServletRequest request) throws SchedulerException {

		String jobName = RequestUtil.getString(request, "jobName");
		String group = RequestUtil.getString(request, "group");
		PageList<TriggerVo> list = schedulerManager.queryTriggers(jobName, group);
		PageJson pageJson = new PageJson(list);
		return pageJson;
	}

	@RequestMapping("trigSave")
	public void trigSave(HttpServletRequest request, HttpServletResponse response, DataSourcePo dataSource)
			throws Exception {
		String resultMsg = null;
		String trigName = RequestUtil.getString(request, "trigName");
		String jobName = RequestUtil.getString(request, "jobName");
		String group = RequestUtil.getString(request, "group");
		String planJson = RequestUtil.getString(request, "planJson");
		boolean isExist = schedulerManager.isTriggerExists(trigName, group);
		if (isExist) {
			resultMsg = "指定的计划名称" + trigName + "已经存在!";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
		}
		try {
			schedulerManager.addTrigger(jobName, group, trigName, planJson);
			resultMsg = "添加定时任务计划成功！";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "添加定时任务计划失败";
			e.printStackTrace();
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 验证类
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("validClass")
	@ResponseBody
	public void validClass(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String jobClass = RequestUtil.getString(request, "jobClass", "");
		boolean rtn = BeanUtils.validClass(jobClass);
		// BeanUtils.isInherit(Class.forName(jobClass), BaseJob.class);
		if (rtn) {
			message = new ResultMessage(ResultMessage.SUCCESS, "验证类成功!");
		} else {
			message = new ResultMessage(ResultMessage.FAIL, "验证类失败!");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 删除触发器
	 * 
	 * @param response
	 * @param request
	 * @throws IOException
	 * @throws SchedulerException
	 * @throws ClassNotFoundException
	 */
	@RequestMapping("trigRemove")
	public void trigRemove(HttpServletResponse response, HttpServletRequest request)
			throws IOException, SchedulerException, ClassNotFoundException {
		ResultMessage message = null;
		try {
			String trigName = RequestUtil.getString(request, "trigName");
			String group = RequestUtil.getString(request, "group");
			schedulerManager.trigRemove(trigName, group);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除计划成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除计划失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 启用或禁用
	 * 
	 * @param response
	 * @param request
	 * @throws IOException
	 * @throws SchedulerException
	 */
	@RequestMapping("/toggleTriggerRun")
	public void toggleTriggerRun(HttpServletResponse response, HttpServletRequest request)
			throws IOException, SchedulerException {
		String trigName = RequestUtil.getString(request, "trigName");
		String group = RequestUtil.getString(request, "group");
		String state = RequestUtil.getString(request, "state");
		if (TriggerState.NORMAL.name().equals(state)) {
			schedulerService.stopTrigger(trigName, group);
		} else if (TriggerState.PAUSED.name().equals(state)) {//暂停
			schedulerService.runTrigger(trigName, group);
		}
		response.sendRedirect(RequestUtil.getPrePage(request));
	}

}
