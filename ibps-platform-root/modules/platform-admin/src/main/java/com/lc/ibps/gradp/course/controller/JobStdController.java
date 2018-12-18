
package com.lc.ibps.gradp.course.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.management.j2ee.statistics.Statistic;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.time.DateUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.grads.course.domain.CrsStd;
import com.lc.ibps.grads.course.domain.Illegal;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.IllegalRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.grads.course.thread.GetFileDetail;
import com.lc.ibps.org.party.domain.PartyEmployee;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanTbl;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import freemarker.core.FMParser;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 学生作业 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/jobStd/")
public class JobStdController extends GenericController {
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyUserRepository partyUserRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	AttachmentRepository attachmentRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	IllegalRepository illegalRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;

	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter qf = getQuerFilter(request);
		qf.addFilter("user_id_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		int a = 0;
		if (partyUserRoleRepository.query(qf).get(0).getRoleID().equals("324883999077957632")) {
			a = 1;
		}
		String preUrl = RequestUtil.getPrePage(request);
		String tt = RequestUtil.getString(request, "clazz");
		return getAutoView().addObject("returnUrl", preUrl).addObject("curtitle", tt).addObject("a", a);
	}

	/**
	 * 【学生作业】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String jobId = RequestUtil.getString(request, "jobId");
		int f = RequestUtil.getInt(request, "f");// 0未提交，1已提交
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("jobid", jobId, QueryOP.EQUAL);
		if (f == JobStdPo.NOTVIEWED)
			queryFilter.addFilter("status", JobStdPo.NOTVIEWED, QueryOP.EQUAL);
		else
			queryFilter.addFilter("status", JobStdPo.NOTVIEWED, QueryOP.GREAT);
		PageList<JobStdPo> jobStdList = (PageList<JobStdPo>) jobStdRepository.query(queryFilter);
		PageList<JobStdPo> jobStdListRes = new PageList();
		jobStdListRes.setPageResult(jobStdList.getPageResult());
		for (JobStdPo jsp : jobStdList) {
			jsp = makeMoreJobStdPo(jsp);
			float score = jsp.getScore();
			jsp.setScore(score);
			jobStdListRes.add(jsp);
		}
		return new PageJson(jobStdListRes);
	}
	@RequestMapping("listJsonPG")
	public @ResponseBody PageJson listJsonPG(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String jobId = RequestUtil.getString(request, "jobId");
		String std_num = RequestUtil.getString(request, "xh");
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("jobId", jobId, QueryOP.EQUAL);
		queryFilter.addFilter("std_num", std_num, QueryOP.EQUAL);
//		PageList<JobStdPo> res=null;
		PageList<JobStdPo> csps = (PageList<JobStdPo>) jobStdRepository.query(queryFilter);
		
		return new PageJson(csps);
	}
	@RequestMapping("listPG")
	public ModelAndView listPG(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		String crsTchId = RequestUtil.getString(request, "crsTchId");
		String crsTchId = "2014liuxibysj";
		String xh = RequestUtil.getString(request, "xh");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		
		return getAutoView().addObject("xh", xh).addObject("crsTchId", crsTchId);
	}

	JobStdPo makeMoreJobStdPo(JobStdPo jsp) {
		// user.id->employee.groupid->entity->学院、专业、班级
		String stdNum = jsp.getStdNum();
		PartyUserPo pup = partyUserRepository.getByAccount("heu" + stdNum);
		String uid = pup.getId();
		String stdName = partyEntityRepository.get(uid).getName();
		jsp.setStdName(stdName);
		String showStatus = "";
		int status = jsp.getStatus();
		if (status == JobStdPo.NOTVIEWED) {
			showStatus = "<span style=\"color:red\">未查看</span>";
		} else if (status == JobStdPo.VIEWED) {
			showStatus = "<span style=\"color:green\">已签到</span>";
		} else
			showStatus = "<span style=\"color:green\">已提交</span>";
		jsp.setShowStatus(showStatus);
		return jsp;
	}

	/**
	 * 编辑【学生作业】信息页面
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
		JobStdPo jobStd = null;
		if (StringUtil.isNotEmpty(id)) {
			jobStd = jobStdRepository.get(id);
		}
		return getAutoView().addObject("jobStd", jobStd).addObject("returnUrl", preUrl);
	}

	/**
	 * 编辑【学生作业】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		JobStdPo jobStd = null;
		if (StringUtil.isNotEmpty(id)) {
			jobStd = jobStdRepository.get(id);
		}
		return getAutoView().addObject("jobStd", jobStd).addObject("returnUrl", preUrl);
	}

	/**
	 * 【学生作业】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("listJob")
	public void listJob(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String role = RequestUtil.getString(request, "role");
		String fileId = RequestUtil.getString(request, "fileId");
		String jobId = RequestUtil.getString(request, "jobId");
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		
		String single = RequestUtil.getString(request, "single");
		String stdNum = RequestUtil.getString(request, "stdNum");
		Map args = new HashMap();
		//重上传判断
		if(StringUtil.isNotEmpty(fileId)){
			try{
				JSONObject jo = new JSONObject();
				jo.put("detail", jobStdRepository.getFileText(fileId));
				jo.put("time", DateUtil.getCurrentTime());
				response.getWriter().print(jo);
			}catch(Exception e){
				e.getStackTrace();
			}
		}else{
			List<JobStdPo> jsps = null;
			//横向批阅判断
			if(StringUtil.isNotEmpty(jobId)){
				args.put("t_job_std.jobId =", jobId);
				if( StringUtil.isEmpty(single) )
					args.put("t_job_std.status =", JobStdPo.SUBMITTED);
				else
					args.put("t_job_std.std_num =", stdNum);
			}else {
				args.put("crs_tch_id =", crsTchId);
				List<CrsJobPo> cjps = crsJobRepository.findByCol(args);
				List<String> jobIds = new ArrayList();
				for (CrsJobPo cjp : cjps)
					jobIds.add(cjp.getId());
				
				String param = "('" + StringUtils.join(jobIds, "\',\'") + "')";
				args.clear();
				args.put("t_job_std.std_num =", stdNum);
				args.put("jobId in " + param, "");
			}

			jsps = jobStdRepository.findByCol(args);
			JSONArray ja = new JSONArray();
			Map texts = new HashMap<String, String>();
			ExecutorService pool = Executors.newFixedThreadPool(9);
			List<Future> fus = new ArrayList();
			int i = 0;
			for (JobStdPo jsp : jsps) {
				if (!StringUtil.isEmpty(jsp.getFile_id_())) {
					Future<Map<String, String>> fu = pool
							.submit(new GetFileDetail(jsp.getId(), jobStdRepository, jsp.getFile_id_()));
					fus.add(fu);
				}
			}

			while (!pool.isTerminated()) {
				try {
					Thread.sleep(500);
					pool.shutdown();
				} catch (InterruptedException e) {
				}
			}

			for (Future<Map<String, String>> future : fus) {
				Map map = new HashMap<String, String>();
				try {
					map = future.get();
					texts.putAll(map);
				} catch (InterruptedException e) {
				} catch (ExecutionException e) {
				} catch (NullPointerException e) {
				}
			}
			Date now = new Date();
			int activeIndex_std = 0;// 作业单页号
			boolean meetActive_std = false;
			int activeIndex_tch = 0;// 作业单页号
			boolean meetActive_tch = false;
			CrsJobPo cjp = null;
			for (JobStdPo jsp : jsps) {
				if(jsp.getReviewStatus().equals("0") && jsp.getStatus() == JobStdPo.SUBMITTED){
					meetActive_tch = true;
				}else {
					if( ! meetActive_tch )
						activeIndex_tch++;
				}
					
				JSONObject jo = new JSONObject();
				jo.put("jobStdId", jsp.getId());
				int k = 0;
				
				try {
					String[] ssTime = jsp.getStartStopTime().split("/");
					k = com.utils.DateUtil.currentCompareByRange(ssTime[0], ssTime[1]);
					if (k == com.utils.DateUtil.BETWEEN) {
						jo.put("title", jsp.getTitle() + "<span style='color:green'>(进行中)</span>");
						if( jsp.getStatus() == JobStdPo.NOTVIEWED )
							meetActive_std = true;
					} else if (k == com.utils.DateUtil.BEFORE)
						jo.put("title", jsp.getTitle() + "<span style='color:gray'>(未开始)</span>");
					else if (k == com.utils.DateUtil.AFTER)
						jo.put("title", jsp.getTitle() + "<span style='color:red'>(已结束)</span>");
					
					jo.put("startStopTime",
							"from&nbsp;&nbsp;&nbsp;" + ssTime[0].substring(5).replace('-', '月').replace(' ', '日')
									+ "&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;"
									+ ssTime[1].substring(5).replace('-', '月').replace(' ', '日'));
				} catch (Exception e) {
				}
				jo.put("power", jsp.getScorePower());

				jo.put("file", jsp.getFile());
				jo.put("fileId", jsp.getFile_id_());
				String time = jsp.getActionTime();
				jo.put("time", StringUtil.isEmpty(time) ? "<span style='color:red'>未提交</span>" : time);
				jo.put("detail", texts.get(jsp.getId()));
				jo.put("comment", jsp.getComment());
				jo.put("score", jsp.getScore());
				jo.put("content", jsp.getContent());
				jo.put("stdNum", jsp.getStdNum());
				jo.put("stdName", jsp.getStdName());
				jo.put("json", jsp.getJson());
				jo.put("status", k);
				
				cjp = crsJobRepository.get(jsp.getJobid());
				try {
					jo.put("templateFile",JSONObject.fromObject( cjp.getModelFile()));
				} catch (Exception e) {
				}
				ja.add(jo);
				if (!meetActive_std)
					activeIndex_std++;
			}
			if (activeIndex_std == ja.size())
				activeIndex_std = 0;
			if (activeIndex_tch == ja.size())
				activeIndex_tch = 0;
			JSONObject res = new JSONObject();
			res.put("data", ja);
			
			if(role.equals("std"))
				res.put("pageIndex", activeIndex_std + 1);
			else{
				res.put("pageIndex", activeIndex_tch + 1);
			}
			response.getWriter().print(res);
		}
		
	}
	@RequestMapping("thisD")
	public void thisD(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String jobStdID = RequestUtil.getString(request, "jobStdId");
		JobStdPo jsp = jobStdRepository.get(jobStdID);
		String detail = jobStdRepository.getFileText(jsp.getFile_id_());
		String time = DateUtil.getCurrentTime();
		JSONObject jo = new JSONObject();
		jo.put("file", jsp.getFile());
		jo.put("fileId", jsp.getFile_id_());
		jo.put("detail", detail);
		jo.put("time", time);
		response.getWriter().print(jo);
	}
	
	/**
	 * 保存【学生作业】信息
	 *
	 * @param request
	 * @param response
	 * @param jobStd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			JobStdPo jobStdPo = getFromRequest(request);
			// 构造领域对象和保存数据
			JobStd jobStd = jobStdRepository.newInstance(jobStdPo);
			jobStd.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存学生作业成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对学生作业操作失败," + e.getMessage());
			logger.error("对学生作业操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private JobStdPo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		JobStdPo jobStdPo = getJobStdPo(jsonObj);

		return jobStdPo;
	}

	/**
	 *
	 * @param jsonObj
	 */
	private JobStdPo getJobStdPo(JSONObject jsonObj) {
		JobStdPo jobStdPo = (JobStdPo) JsonUtil.getDTO(jsonObj.toString(), JobStdPo.class);
		return jobStdPo;
	}

	/**
	 * 批量删除【学生作业】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			JobStd jobStd = jobStdRepository.newInstance();
			jobStd.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除学生作业成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除学生作业失败，" + e.getMessage());
			logger.error("删除学生作业失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("submit")
	public ModelAndView submit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String jobId = RequestUtil.getString(request, "jobId");
		String jobName = crsJobRepository.get(jobId).getTitle();
		String stdNum = getMyNum();
		String stdName = getMyName();
		request.getSession().setAttribute("jobId", jobId);
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("jobId", jobId, QueryOP.EQUAL);
		queryFilter.addFilter("std_num", stdNum, QueryOP.EQUAL);
		List<JobStdPo> jsps = jobStdRepository.query(queryFilter);
		JobStdPo jsp = jsps.get(0);

		return getAutoView().addObject("jobStd", jsp).addObject("jobName", jobName).addObject("jobId", jobId)
				.addObject("stdNum", stdNum).addObject("stdName", stdName);
	}

	/**
	 * 保存文件id
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("saveUploadFile")
	public void saveUploadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String raw = request.getParameter("file");
		String file = URLDecoder.decode(raw,"UTF-8"),
				fileId = RequestUtil.getString(request, "fileId"),
				jobStdId = RequestUtil.getString(request, "jobStdId");
//		String fn = (String) JSONObject.fromObject(file).get("fileName");
//		String ext = fn.substring(fn.lastIndexOf(".") + 1);
//		String[] avln = {"doc","docx","xls","xlsx","pdf"};
//		if(!Arrays.asList(avln).contains(ext)){
//			response.getWriter().print("非法格式："+ext);
//			return;
//		}
		Map args = new HashMap<>();
		args.put("t_job_std.id_ =", jobStdId);
		JobStdPo jsp = jobStdRepository.getByCol(args);
		String[] sst = jsp.getStartStopTime().split("/");
		if(com.utils.DateUtil.currentCompareByRange(sst[0], sst[1]) == com.utils.DateUtil.AFTER){
			response.getWriter().print("error：截止时间已过！");
		}else{
			jsp.setActionTime(DateUtil.getCurrentTime());
			jsp.setFile(file);
			jsp.setFile_id_(fileId);
			jsp.setStatus(JobStdPo.SUBMITTED);
			jobStdRepository.newInstance(jsp).save();
			response.getWriter().print("提交成功！");
		}
		
		/*
		 * ResultMessage message = null; JSONArray fileArr =
		 * RequestUtil.getJSONArray(request, "file"); String file =
		 * fileArr.getString(0); String stdNum = RequestUtil.getString(request,
		 * "stdNum"); String stdName = RequestUtil.getString(request,
		 * "stdName"); String jobId = RequestUtil.getString(request, "jobId");
		 * CrsJobPo cjp = crsJobRepository.get(jobId); SimpleDateFormat sdf =
		 * new SimpleDateFormat("yyyy-MM-dd HH:mm"); Date today = new Date();
		 * Date startTime = sdf.parse(cjp.getStartStopTime().split("/")[0]);
		 * Date stopTime = sdf.parse(cjp.getStartStopTime().split("/")[1]);
		 * Calendar c = Calendar.getInstance(); c.setTime(stopTime);
		 * c.add(Calendar.MINUTE, 10); stopTime = c.getTime(); if
		 * (today.compareTo(stopTime) > 0 || today.compareTo(startTime) < 0) {
		 * IllegalPo ip; Map arg = new HashMap<String, String>();
		 * arg.put("std_num_", stdNum); if (illegalRepository.findByCols(arg,
		 * "").size() == 0) { message = new ResultMessage(ResultMessage.ERROR,
		 * "非法操作！error：恶意篡改！<br>系统已记录您的非法操作，<br>违规操作2次系统将禁止您登录！"); } else {
		 * PartyEmployeePo pep =
		 * partyEmployeeRepository.get(ContextUtil.getCurrentUserId());
		 * pep.setStatus("inactive"); PartyEmployee pe =
		 * partyEmployeeRepository.newInstance(pep); pe.save(); message = new
		 * ResultMessage(ResultMessage.ERROR,
		 * "非法操作！error：恶意篡改！<br>检测到您有过非法操作记录，<br>系统已将您列入黑名单"); message.setCause(
		 * "<script>window.location.href='/logout.htm';</script>"); } ip = new
		 * IllegalPo(); ip.setUserid(ContextUtil.getCurrentUserId());
		 * ip.setStdNum(stdNum); ip.setName(stdName); Illegal illegal =
		 * illegalRepository.newInstance(ip); illegal.save(); } else { if (file
		 * == null || file.equals("")) { message = new
		 * ResultMessage(ResultMessage.ERROR, "请上传作业文件!"); } else { String[] t =
		 * JobStdPo.parseFile(file); String fileName = t[0]; String fileId =
		 * t[1]; if (!fileName.contains(stdNum) && !fileName.contains(stdName))
		 * { message = new ResultMessage(ResultMessage.ERROR, "文件名应包含:" + stdNum
		 * + "和" + stdName); } else { int wordsCount =
		 * jobStdRepository.countWords(fileId); if (wordsCount <
		 * CrsJobPo.MINCOUNT && !cjp.getTitle().contains("汇总表")) { message = new
		 * ResultMessage(ResultMessage.ERROR, "字数限制！</br>最少" + CrsJobPo.MINCOUNT
		 * + "字，实际：" + wordsCount + "字");
		 * writeResultMessage(response.getWriter(), message); return; } if
		 * (wordsCount < 1500 && cjp.getTitle().equals("总结报告")) { message = new
		 * ResultMessage(ResultMessage.ERROR, "字数限制！</br>最少1500字，实际：" +
		 * wordsCount + "字"); writeResultMessage(response.getWriter(), message);
		 * return; } if (wordsCount < 3500 && cjp.getTitle().contains("专题报告")) {
		 * message = new ResultMessage(ResultMessage.ERROR,
		 * "字数限制！</br>最少3500字，实际：" + wordsCount + "字");
		 * writeResultMessage(response.getWriter(), message); return; }
		 * JSONArray checkRepeatRes = null; if (!cjp.getTitle().contains("汇总表"))
		 * checkRepeatRes = jobStdRepository.checkRepeat(fileId, jobId, stdNum);
		 * String doc1Name = ""; String doc2Name = ""; JSONObject jo = null; if
		 * (checkRepeatRes != null && checkRepeatRes.size() > 0) { jo =
		 * checkRepeatRes.getJSONObject(0); String doc1 = jo.getString("doc1");
		 * String doc2 = jo.getString("doc2"); QueryFilter queryFilter =
		 * getQuerFilter(request); queryFilter.addFilter("file_path_", "\\\\" +
		 * doc1, QueryOP.EQUAL); AttachmentPo ap =
		 * attachmentRepository.query(queryFilter).get(0); doc1Name =
		 * ap.getFileName() + '.' + ap.getExt(); queryFilter =
		 * getQuerFilter(request); queryFilter.addFilter("file_path_", "\\\\" +
		 * doc2, QueryOP.EQUAL); ap =
		 * attachmentRepository.query(queryFilter).get(0); doc2Name =
		 * ap.getFileName() + '.' + ap.getExt(); String msg = " " +
		 * checkRepeatRes.size() + " 个作业与你的十分相似，最高相似：<br>" + doc1Name +
		 * " 和 <br>" + doc2Name + " <br>相似度：" + jo.getString("similarity");
		 * message = new ResultMessage(ResultMessage.ERROR, msg); } else {
		 * QueryFilter queryFilter = getQuerFilter(request);
		 * queryFilter.addFilter("jobId", jobId, QueryOP.EQUAL);
		 * queryFilter.addFilter("std_num", stdNum, QueryOP.EQUAL);
		 * List<JobStdPo> jsps = jobStdRepository.query(queryFilter); JobStdPo
		 * jsp = jsps.get(0);
		 * 
		 * String date = sdf.format(new Date()); jsp.setFileUploadTime(date); if
		 * (file.charAt(0) == '{') file = '[' + file + ']'; jsp.setFile(file);
		 * jsp.setFile_id_(fileId); if (jsp.getStatus() == JobStdPo.NOTVIEWED)
		 * crsJobAdd(jsp.getJobid(), 0); jsp.setStatus(JobStdPo.SUBMITTED);
		 * 
		 * JobStd js = jobStdRepository.newInstance(jsp); js.save(); // crsjob
		 * 完成数量+1 message = new ResultMessage(ResultMessage.SUCCESS, "字数：" +
		 * wordsCount + "字，无重复作业，提交成功!"); }
		 * 
		 * } } } writeResultMessage(response.getWriter(), message);
		 */
	}

	private void crsJobAdd(String jobid, int i) {
		CrsJobPo cjp = crsJobRepository.get(jobid);
		if (i == 0) {
			cjp.setStdFnsh(cjp.getStdFnsh() + 1);
			if (cjp.getStdFnsh() == cjp.getStdNd())
				cjp.setStdAllFnsh(1);
		} else {
			cjp.setTchFnsh(cjp.getTchFnsh() + 1);
			if (cjp.getTchFnsh() == cjp.getTchNd())
				cjp.setTchAllFnsh(1);
		}
		crsJobRepository.newInstance(cjp).save();
	}

	
	@RequestMapping("markScore")
	public ModelAndView markScore(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String returnUrl = RequestUtil.getPrePage(request),crsTchId = RequestUtil.getString(request, "crsTchId"),
		jobId = RequestUtil.getString(request, "jobId"),stdNum = RequestUtil.getString(request, "stdNum");//横向批阅参数
		
		String crsTchId1 = crsTchId; //教师授课id
		
		if(StringUtil.isEmpty(jobId)&&StringUtil.isNotEmpty(stdNum)){
			String  role = RequestUtil.getString(request, "role"),
			stdName = RequestUtil.getString(request, "stdName");
			stdName = new String (stdName.getBytes( "ISO8859-1" ), "utf-8" ).trim();//姓名乱码修改
			CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
			if(StringUtils.isNotBlank(crsTchPo.getUniManage()))crsTchId1=crsTchPo.getUniManage();  
			return getAutoView().addObject("stdNum", stdNum).addObject("role", role).addObject("crsTchId", crsTchId1).addObject("crsTchId1", crsTchId)
					.addObject("crsName", crsTchPo.getCrsName()).addObject("stdName", stdName).addObject("returnUrl", returnUrl);
		}else if(StringUtil.isNotEmpty(jobId)&&StringUtil.isEmpty(stdNum)){
			String title = RequestUtil.getString(request, "title");
			title = new String (title.getBytes( "ISO8859-1" ), "utf-8" ).trim();
			return getAutoView().addObject("jobId", jobId).addObject("title", title).addObject("role", "tch").addObject("crsTchId", crsTchId).addObject("returnUrl", returnUrl);
		}else {
			String title = RequestUtil.getString(request, "title");
			title = new String (title.getBytes( "ISO8859-1" ), "utf-8" ).trim();
			return getAutoView().addObject("jobId", jobId).addObject("title", title).addObject("role", "tch").addObject("stdNum", stdNum).addObject("returnUrl", returnUrl).addObject("crsTchId", crsTchId);
		}
	}

	/**
	 * 评分保存分数
	 * 
	 */
	@Transactional
	@RequestMapping("saveScore")
	public void saveScore(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		
		String id = RequestUtil.getString(request, "jobStdId");
		String score = RequestUtil.getString(request, "score");
		String comment = RequestUtil.getString(request, "comment");
		String stdNum = RequestUtil.getString(request, "stdNum");
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		String json = RequestUtil.getString(request, "json");
		float power = RequestUtil.getFloat(request, "power");
		float scoref = 0;
		scoref = Float.parseFloat(score);
		JobStdPo jsp = jobStdRepository.get(id);
		float oldScore = jsp.getScore();
		jsp.setScore(scoref);
		jsp.setJson(json);
		jsp.setComment(comment);
		jsp.setReviewTime(DateUtil.getCurrentTime());
		jsp.setReviewStatus("1");
		jobStdRepository.newInstance(jsp).save();
		
		String crsTchId1 = RequestUtil.getString(request, "crsTchId1"); 
		if(!("").equals(crsTchId1) || crsTchId1 == null)
			crsTchId = crsTchId1;
		
		/*CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		if(StringUtils.isNotBlank(crsTchPo.getUniManage()))
			crsTchId=crsTchPo.getUniManage(); */ 
		scoref *= (0.01 * power);
		oldScore *= (0.01 * power);
		// crs-std 总分
		Map args = new HashMap<>();
		args.put("crs_tch_id =", crsTchId);
		args.put("std_num =", stdNum);
		CrsStdPo csp = crsStdRepository.getByCol(args);
		csp.setScore(csp.getScore() - oldScore + scoref);
		crsStdRepository.newInstance(csp).save();
		response.getWriter().println("评阅成功！");
	}

	/**
	 * 签到
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("checkIn")
	public void checkIn(HttpServletRequest request, HttpServletResponse response) {
		try {
			PrintWriter out = response.getWriter();
			String id = RequestUtil.getString(request, "id");
			String stdNum = getMyNum();
			QueryFilter queryFilter = getQuerFilter(request);
			queryFilter.addFilter("jobId", id, QueryOP.EQUAL);
			queryFilter.addFilter("std_num", stdNum, QueryOP.EQUAL);
			JobStdPo jsp = jobStdRepository.query(queryFilter).get(0);
			if (jsp.getStatus() == JobStdPo.VIEWED) {
				out.print("已签到！");
			} else {
				CrsJobPo cjp = crsJobRepository.get(id);
				/**
				 * 获取地理位置信息，暂时存到file字段中，签到时间存到actionTime中
				 */
				// 获取地理位置信息
				// 时间
				String date = DateUtil.getCurrentTime();
				jsp.setFileUploadTime(date);
				jsp.setStatus(JobStdPo.VIEWED);
				jsp.setScore(cjp.getScorePower());

				QueryFilter queryFilter1 = getQuerFilter(request);
				queryFilter1.addFilter("crs_tch_id", cjp.getCrsTchId(), QueryOP.EQUAL);
				queryFilter1.addFilter("std_num", stdNum, QueryOP.EQUAL);
				CrsStdPo csp = crsStdRepository.query(queryFilter1).get(0);
				csp.setScore(csp.getScore() + cjp.getScorePower());
				CrsStd cs = crsStdRepository.newInstance(csp);
				cs.save();

				JobStd js = jobStdRepository.newInstance(jsp);
				js.save();

				// crsJob 完成数量+1
				cjp.setStdFnsh(cjp.getStdFnsh() + 1);
				if (cjp.getStdFnsh() == cjp.getStdNd())
					cjp.setStdAllFnsh(1);
				crsJobRepository.newInstance(cjp).save();
				out.print("签到成功！");
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	String getMyNum() {
		return getMe().getAlias().replace("heu", "");
	}

	private PartyEntityPo getMe() {
		String id = ContextUtil.getCurrentUserId();
		return partyEntityRepository.get(id);
	}

	String getMyName() {
		return getMe().getName();
	}

	@RequestMapping("getChange")
	public void getChange(HttpServletRequest request, HttpServletResponse response) {
		String id = RequestUtil.getString(request, "id");
		JobStdPo jsp = jobStdRepository.get(id);

		try {
			PrintWriter out = response.getWriter();
			JSONObject jo = new JSONObject();
			jo.put("reviewTime", jsp.getReviewTime());
			jo.put("score", jsp.getScore());
			out.print(jo);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping("listStdsPG")
	public ModelAndView listStdsPG(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String preUrl = RequestUtil.getPrePage(request);
		String xh = RequestUtil.getString(request, "xh");
		String jobID = RequestUtil.getString(request, "jobID");
		
		return getAutoView().addObject("jobID",jobID).addObject("returnUrl", preUrl).addObject("xh", xh);
	}
	@RequestMapping("listStds2")
	public ModelAndView listStds2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String preUrl = RequestUtil.getPrePage(request);
		String name = RequestUtil.getString(request, "jobName");
		name = new String (name.getBytes("ISO8859-1"),"utf-8").trim();
		String jobID = RequestUtil.getString(request, "jobID");
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		boolean uniManage=true;
		System.out.println(crsTchPo.getUniManage().equals(crsTchId));
		if(crsTchPo.getUniManage()!=null&&crsTchPo.getUniManage().equals(crsTchId)) uniManage=false;
		String crsName = RequestUtil.getString(request, "crsName");
		crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();
		String scorePower = RequestUtil.getString(request, "scorePower");
		return getAutoView().addObject("jobName", name ).addObject("jobID",jobID).addObject("returnUrl", preUrl).addObject("crsTchId", crsTchId).addObject("crsName", crsName).addObject("uniManage", uniManage).addObject("scorePower", scorePower);
	}

	@RequestMapping("listStds")
	public ModelAndView listStds(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String preUrl = RequestUtil.getPrePage(request);
		String name = RequestUtil.getString(request, "jobName");
		String jobID = RequestUtil.getString(request, "jobID");
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		boolean uniManage=true;
//		System.out.println(crsTchPo.getUniManage().equals(crsTchId));
		if(crsTchPo.getUniManage()!=null&&crsTchPo.getUniManage().equals(crsTchId)) uniManage=false;
		String crsName = RequestUtil.getString(request, "crsName");
		String scorePower = RequestUtil.getString(request, "scorePower");
		return getAutoView().addObject("jobName", name ).addObject("jobID",jobID).addObject("returnUrl", preUrl).addObject("crsTchId", crsTchId).addObject("crsName", crsName).addObject("uniManage", uniManage).addObject("scorePower", scorePower);
	}
	/**
	 * 查看学生列表
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("listStdsJson")
	public @ResponseBody PageJson listStdsJson(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String,String> args=new HashMap<>();
		args.put("crs_tch_id=", RequestUtil.getString(request, "crsTchId"));
		System.out.println(RequestUtil.getString(request, "crsTchId"));
		List<CrsStdPo> students = crsStdRepository.findByCol(args);
		System.out.println( students.size());
		if(students.size()!=0) {
			String[] stdNum=new String[students.size()];
			int count=0;
			for (CrsStdPo crsStdPo : students) {
				stdNum[count++]=crsStdPo.getStdNum();
			}
			QueryFilter queryFilter = getQuerFilter(request);
			queryFilter.addFilter("jobID", RequestUtil.getString(request, "jobID"), QueryOP.EQUAL);
			queryFilter.addFilter("std_num", stdNum, QueryOP.IN);
			PageList<JobStdPo> csps = (PageList<JobStdPo>) jobStdRepository.query(queryFilter);
			for (JobStdPo jobStdPo : csps) {
				String whereSql="PARTY_ALIAS_='"+jobStdPo.getStdNum()+"'";
				DefaultQueryFilter filter=new DefaultQueryFilter();
				filter.addParamsFilter("whereSql", whereSql);
				List<PartyEntityPo> list = partyEntityRepository.query(filter);
				jobStdPo.setStdName(list.get(0).getName());
			}
			return new PageJson(csps);
		}else {
			DefaultQueryFilter queryFilter1 =  (DefaultQueryFilter) getQuerFilter(request);
//		    List<WhereClause>  whereClause=queryFilter1.getFieldLogic().getWhereClauses();
//		    String fieldLogic=queryFilter1.getFieldLogic().getSql();
//		    String whereSql ="";
//		    if(whereClause.size()==0)
//		    {
//		    	whereSql =  "js.std_num=zy.xh and js.jobID= " + RequestUtil.getString(request, "jobID")+" "+fieldLogic;
//		    } else {
//		    	whereSql =  "js.std_num=zy.xh and js.jobID= " + RequestUtil.getString(request, "jobID");
//		    	for (WhereClause whereClause2 : whereClause) {
//		    		whereSql +=" and "+whereClause2.getSql();
//			    }
//				}
//		    queryFilter1.setFieldLogic( new DefaultFieldLogic());
//			String whereSql ="std_num = zy.xh";
//			queryFilter1.addParamsFilter("whereSql", whereSql);
//			queryFilter1.addFilter("std_num", zy.xh,QueryOP.EQUAL);
			queryFilter1.addFilter("jobID", RequestUtil.getString(request, "jobID"), QueryOP.EQUAL);
			String  aa = queryFilter1.getFieldLogic().getSql();
		
			
//			queryFilter1.addParamsFilter("whereSql", "");
			PageList<JobStdPo> joblistByliujia = (PageList<JobStdPo>) jobStdRepository.queryJobManaList(queryFilter1);
			for (JobStdPo jobStdPo : joblistByliujia) {
			//String whereSql1="PARTY_ALIAS_="+jobStdPo.getStdNum();
			DefaultQueryFilter filter=new DefaultQueryFilter();
			//filter.addParamsFilter("whereSql", whereSql1);
				filter.addFilter("PARTY_ALIAS_",jobStdPo.getStdNum(),QueryOP.EQUAL);
			List<PartyEntityPo> liststu = partyEntityRepository.query(filter);
			jobStdPo.setStdName(liststu.get(0).getName());
		}
			return new PageJson(joblistByliujia);
		
		}
	}
	@RequestMapping("listStdsJsonPG")
	public @ResponseBody PageJson listStdsJsonPG(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String xh = RequestUtil.getString(request, "xh");
		String jobID = RequestUtil.getString(request, "jobID");
			
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("jobId", jobID, QueryOP.EQUAL);
		queryFilter.addFilter("std_num", xh, QueryOP.EQUAL);
//		PageList<JobStdPo> res=null;
		PageList<JobStdPo> csps = (PageList<JobStdPo>) jobStdRepository.query(queryFilter);
		
		
		return new PageJson(csps);
		
		}
	@RequestMapping("listStdsJson2")
	public @ResponseBody PageJson listStdsJson2(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String,String> args=new HashMap<>();
		args.put("crs_tch_id=", RequestUtil.getString(request, "crsTchId"));
		System.out.println(RequestUtil.getString(request, "crsTchId"));
		List<CrsStdPo> students = crsStdRepository.findByCol(args);
		System.out.println( students.size());
		if(students.size()!=0) {
			String[] stdNum=new String[students.size()];
			int count=0;
			for (CrsStdPo crsStdPo : students) {
				stdNum[count++]=crsStdPo.getStdNum();
			}
			QueryFilter queryFilter = getQuerFilter(request);
			queryFilter.addFilter("jobID", RequestUtil.getString(request, "jobID"), QueryOP.EQUAL);
			queryFilter.addFilter("std_num", stdNum, QueryOP.IN);
			PageList<JobStdPo> csps = (PageList<JobStdPo>) jobStdRepository.query(queryFilter);
			for (JobStdPo jobStdPo : csps) {
				String whereSql="PARTY_ALIAS_="+jobStdPo.getStdNum();
				DefaultQueryFilter filter=new DefaultQueryFilter();
				filter.addParamsFilter("whereSql", whereSql);
				List<PartyEntityPo> list = partyEntityRepository.query(filter);
				jobStdPo.setStdName(list.get(0).getName());
			}
			return new PageJson(csps);
		}else {
			DefaultQueryFilter queryFilter1 =  (DefaultQueryFilter) getQuerFilter(request);
			queryFilter1.addFilter("jobID", RequestUtil.getString(request, "jobID"), QueryOP.EQUAL);
			String  aa = queryFilter1.getFieldLogic().getSql();
			PageList<JobStdPo> joblistByliujia = (PageList<JobStdPo>) jobStdRepository.queryJobManaList(queryFilter1);
			for (JobStdPo jobStdPo : joblistByliujia) {
			String whereSql1="PARTY_ALIAS_="+jobStdPo.getStdNum();
			DefaultQueryFilter filter=new DefaultQueryFilter();
			filter.addParamsFilter("whereSql", whereSql1);
			
			
			String xh= jobStdPo.getStdNum();
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.getByxh(xh);
			System.out.println(urlZhiYuanPo);
			String classr =  urlZhiYuanPo.getClassr();
		    String finalteacher =  urlZhiYuanPo.getFinalteacher();
			String finaltd = urlZhiYuanPo.getFinaltd();
		    
		    
			List<PartyEntityPo> liststu = partyEntityRepository.query(filter);
			jobStdPo.setStdName(liststu.get(0).getName());
			jobStdPo.setClassr(classr);
			jobStdPo.setFinalteacher(finalteacher);
			jobStdPo.setFinaltd(finaltd);
		}
			return new PageJson(joblistByliujia);
		
		}
	}
	
	
	
	@RequestMapping("editScores")
	public void editScores(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			float score = RequestUtil.getFloat(request, "score");
			float power = RequestUtil.getFloat(request, "power");
			String crsTchId = RequestUtil.getString(request, "crsTchId");
			String[] ids = RequestUtil.getStringAryByStr(request, "ids");
			List<String> params = Arrays.asList(ids);
			List<JobStdPo> pos = jobStdRepository.findByIds(params);
			float scoref = score;
			for (JobStdPo po : pos) {
				float oldScore = po.getScore();
				if(po.getStatus()==2) {
					po.setScore(score);
					po.setReviewStatus("1");
					po.setReviewTime(DateUtil.getCurrentTime());
					jobStdRepository.newInstance(po).update();
					scoref=(float) (score* (0.01 * power));
					oldScore *= (0.01 * power);
					// crs-std 总分
					Map args = new HashMap<>();
					args.put("crs_tch_id =", crsTchId);
					args.put("std_num =", po.getStdNum());
					CrsStdPo csp = crsStdRepository.getByCol(args);
					if(csp!=null) {
						csp.setScore(csp.getScore() - oldScore + scoref);
						crsStdRepository.newInstance(csp).save();
					}
				}
				
			}
		} catch (Exception e) {
			logger.error("修改课程作业失败，" + e.getMessage(), e);
		}
		response.getWriter().println("ok");
		
	}
	
	@RequestMapping("getEdits")
	public @ResponseBody List<JobStdPo> getEdits (HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		List<String> params = Arrays.asList(ids);
		List<JobStdPo> pos = jobStdRepository.findByIds(params);
		return pos;
	}
	
	
}
