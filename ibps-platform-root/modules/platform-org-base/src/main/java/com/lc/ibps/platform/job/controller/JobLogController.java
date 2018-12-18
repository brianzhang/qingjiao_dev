package com.lc.ibps.platform.job.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.job.domain.JobLog;
import com.lc.ibps.common.job.persistence.entity.JobLogPo;
import com.lc.ibps.common.job.repository.JobLogRepository;

/**
* 【定时器运行日志】  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-12-01 10:27:24
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/job/jobLog/")
public class JobLogController extends GenericController{
	@Resource
	private JobLogRepository jobLogRepository;
	
	/**
	 * 【定时器运行日志】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		
		String jobName = RequestUtil.getString(request, "jobName");
		String trigName = RequestUtil.getString(request, "trigName");
		String group = RequestUtil.getString(request, "group");
		QueryFilter queryFilter=getQuerFilter(request);
		if (StringUtil.isNotEmpty(jobName)) {
			queryFilter.addFilter("JOB_NAME_", jobName, QueryOP.LIKE);
			queryFilter.addFilter("GROUP_", group, QueryOP.LIKE);
		}else if(StringUtil.isNotEmpty(trigName)) {
			queryFilter.addFilter("TRIG_NAME_", trigName, QueryOP.LIKE);
			queryFilter.addFilter("GROUP_", group, QueryOP.LIKE);
		}
		PageList<JobLogPo> jobLogList=(PageList<JobLogPo>)jobLogRepository.query(queryFilter);
		return new PageJson(jobLogList);
	}
	
	
	
	/**
	 * 【定时器运行日志】明细页面
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
		JobLogPo jobLog=null;
		if(StringUtil.isNotEmpty(id)){
			jobLog=jobLogRepository.get(id);
		}
		return getAutoView().addObject("jobLog", jobLog).addObject("returnUrl", preUrl);
	}
	
	
	/**
	 *  批量删除【定时器运行日志】记录
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
			JobLog jobLog= jobLogRepository.newInstance();
			 jobLog.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除【定时器运行日志】成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除【定时器运行日志】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
