package com.lc.ibps.gradp.course.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.lc.ibps.api.base.query.QueryField;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.base.query.WhereClause;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryField;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.common.mail.persistence.entity.OutMailPo;
import com.lc.ibps.common.mail.repository.MailConfigRepository;
import com.lc.ibps.common.mail.repository.OutMailRepository;
import com.lc.ibps.grads.course.domain.CrsTch;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CourseParamModalPo;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CourseParamModalRepository;
import com.lc.ibps.grads.course.repository.CourseRepository;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.grads.course.thread.MoveFile;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.sun.star.lib.uno.environments.remote.Job;
import com.sun.xml.bind.CycleRecoverable.Context;
import com.utils.AdminUtil;
import com.utils.Constants;
import com.utils.DateUtil;
import com.utils.FileUtil;
import com.utils.SDateUtil;
import java.net.URLDecoder;
import net.lingala.zip4j.util.Zip4jUtil;
import net.minidev.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 教师课程 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:11:14
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/crsTch/")
public class CrsTchController extends GenericController implements Constants {
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	CourseRepository courseRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	CourseParamModalRepository courseParamModalRepository;
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
	JobStdRepository jobStdRepository;
	@Resource
	OutMailRepository outMailRepository;
	@Resource
	MailConfigRepository mailConfigRepository;

	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;

	@RequestMapping("uniView")
	public ModelAndView uniView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sss = RequestUtil.getString(request, "ids");
		String[] ids = sss.split(",");
		List<String> list = new LinkedList<>();
		for (String string : ids) {
			CoursePo coursePo = courseRepository.get(string);
			list.add(coursePo.getName());
		}
		return getAutoView().addObject("termList", SDateUtil.getTermList()).addObject("ids", sss)
				.addObject("crsName", list).addObject("curTerm", DateUtil.getCurTerm());
	}

	@RequestMapping("uniManage")
	@ResponseBody
	public List<String> uniManage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		String term = RequestUtil.getString(request, "term");
		String tchnum = getMyNum();
		List<String> msg = new LinkedList<>();
		for (String string : ids) {
			CoursePo coursePo = courseRepository.get(string);
			String crsNum = coursePo.getNum();
			Map<String, String> args = new HashMap<>();
			args.put("CRS_NUM=", crsNum);
			args.put("term =", term);
			List<CrsTchPo> list = crsTchRepository.findByCol(args);
			if (list.size() == 0) {
				msg.add(coursePo.getName());
				continue;
			}
			CrsTchPo newpo = new CrsTchPo();
			String uniId = term + crsNum + "manage";
			for (CrsTchPo crsTchPo : list) {
				crsTchPo.setUniManage(uniId);
				crsTchRepository.newInstance(crsTchPo).update();
			}
			newpo.setId(uniId);
			newpo.setTchNum(tchnum);
			newpo.setCrsNum(crsNum);
			newpo.setTerm(term);
			newpo.setUniManage(uniId);
			crsTchRepository.newInstance(newpo).save();
		}
		return msg;
	}

	/**
	 * 学院管理员查看本学院授课情况
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listDep")
	public ModelAndView listDepCrs(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String tchNum = getMyNum();
		Map<String, String> rawParam = (Map) request.getSession().getAttribute("params");

		String paramTerm = null;
		if (rawParam != null) {
			paramTerm = rawParam.get("TERM");
		}
		String curTerm = StringUtil.isEmpty(paramTerm) ? DateUtil.getCurTerm() : paramTerm;
		if (tchNum.contains("admin")) {
			return getAutoView().addObject("admin", true).addObject("curTerm", curTerm);
		}
		return getAutoView().addObject("admin", false).addObject("curTerm", curTerm).addObject("termList",
				SDateUtil.getTermList());
	}

	/**
	 * 学院管理员查看本学院授课情况,列表(分页条件查询)数据
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listDepJson")
	public @ResponseBody PageJson listDepCrsJson(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		Map<String, Object> params = queryFilter.getParams();
		Map<String, Object> rtnParams = (Map) request.getSession().getAttribute("params");
		// 如果当前没有查询条件，并且session中也没有 , 查询默认的项
		if (params.size() == 0 && rtnParams == null)
			queryFilter.addFilter("term", DateUtil.getCurTerm(), QueryOP.EQUAL);
		// 如果主界面进行筛选
		else if (params.size() > 0)
			request.getSession().setAttribute("params", params);
		if (!AdminUtil.isSuperAdmin(partyOrgAuthRepository, partyEntityRepository)) {
			String userId = ContextUtil.getCurrentUserId();
			List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
			String orgId = list.get(0).getOrgID();
			Map args = new HashMap<>();
			args.put("orgId=", orgId);
			List<CoursePo> courses = courseRepository.findByCol(args);
			String[] courseNum = new String[courses.size()];
			for (int i = 0; i < courseNum.length; i++) {
				courseNum[i] = courses.get(i).getNum();
			}
			queryFilter.addFilter("crs_num", courseNum, QueryOP.IN);
		}
		PageList<CrsTchPo> crsTchList = (PageList<CrsTchPo>) crsTchRepository.query(queryFilter);
		for (CrsTchPo ctp : crsTchList) {
			String[] nums = ctp.getTchNum().split(",");
			List<String> names = new ArrayList();
			for (String num : nums) {
				if (!StringUtil.isEmpty(num))
					names.add(partyEntityRepository.getByAliasPartyType(num, "employee").getName());
			}
			ctp.setTchName(StringUtils.join(names, ','));
		}
		return new PageJson(crsTchList);
	}

	/**
	 * 【教师课程】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 //* @throws ExceptionRL
	 */

	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String term = request.getParameter("Q^TERM^S");

		QueryFilter queryFilter = getQuerFilter(request);
		String tchNum = getMyNum();
		if (!tchNum.contains("admin")) {
			//Map<String, Object> params = queryFilter.getParams();
			Map<String, Object> params = new HashMap<String,Object>();
			params.put("TERM",term);
			Map<String, Object> rtnParams = (Map) request.getSession().getAttribute("params");
			// 如果当前没有查询条件，并且session中也没有 , 查询默认的项
			if (params.size() == 0 && rtnParams == null)
				queryFilter.addFilter("term", DateUtil.getCurTerm(), QueryOP.EQUAL);

				// 如果主界面进行筛选
			else if (params.size() > 0)
				request.getSession().setAttribute("params", params);

				// 处理其他界面返回按钮返回此界面
			else {
				String[] wses = ((String) rtnParams.get("whereSql")).replaceAll("[()]", "").split(" AND ");
				String[] cc = null;
				Map<String, String> cond = new HashMap();
				for (String ws : wses) {
					cc = ws.split(" ");
					cond.put(cc[0], cc[1]);
				}
				Iterator<String> keys = rtnParams.keySet().iterator();
				String key = null;
				while (keys.hasNext()) {
					key = keys.next();
					if ("whereSqltch_num".contains(key))
						continue;
					QueryOP qop = null;
					if ("=".equals(cond.get(key)))
						qop = QueryOP.EQUAL;
					else
						qop = QueryOP.LIKE;
					queryFilter.addFilter(key, rtnParams.get(key), qop);
				}
			}
			queryFilter.addFilter("tch_num", "%" + tchNum + "%", QueryOP.LIKE);
		}
		PageList<CrsTchPo> crsTchList = (PageList<CrsTchPo>) crsTchRepository.query(queryFilter);
		for (CrsTchPo ctp : crsTchList) {
			String[] nums = ctp.getTchNum().split(",");
			List<String> names = new ArrayList();
			for (String num : nums) {
				if (!StringUtil.isEmpty(num))
					names.add(partyEntityRepository.getByAliasPartyType(num, "employee").getName());
			}
			ctp.setTchName(StringUtils.join(names, ','));
		}
		return new PageJson(crsTchList);
	}

	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String tchNum = getMyNum();
		Map<String, String> rawParam = (Map) request.getSession().getAttribute("params");

		String paramTerm = null;
		if (rawParam != null) {
			paramTerm = rawParam.get("TERM");
		}
		String curTerm = StringUtil.isEmpty(paramTerm) ? DateUtil.getCurTerm() : paramTerm;
		if (tchNum.contains("admin")) {
			return getAutoView().addObject("admin", true).addObject("curTerm", curTerm);
		}
		return getAutoView().addObject("admin", false).addObject("curTerm", curTerm).addObject("termList",
				SDateUtil.getTermList());
	}

	/**
	 * 导出文件
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unused")
	@RequestMapping("export")
	public void export(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String type = RequestUtil.getString(request, "type");
		String crsName = RequestUtil.getString(request, "crsName");
		Map args = new HashMap();
		List<Map<String, String>> datas = new ArrayList();
		Map<String, String> data = null;
		String fileName = "";
		String crsTchId = "";
		int outFieldType = 0;
		switch (type) {
		case "myCourse":
			outFieldType = CRSTCH;
			String tchNum = getMyNum();
			String curTerm = DateUtil.getCurTerm();
			fileName = tchNum + "_课程表.xls";
			args.put("t_crs_tch.tch_num like", "%" + tchNum + "%");
			args.put("t_crs_tch.term = ", curTerm);
			List<CrsTchPo> ctps = crsTchRepository.findByCol(args);
			for (CrsTchPo ctp : ctps) {
				data = new HashMap();
				data.put(__crs_num, ctp.getCrsNum());
				data.put(__crs_name, ctp.getCrsName());
				data.put(__crs_term, ctp.getTerm());
				data.put(__crs_location, ctp.getLocation());
				data.put(__crs_time, ctp.getTime());
				data.put(__crs_class, ctp.getClazz());
				data.put(__crs_tch_id, ctp.getId());
				datas.add(data);
			}
			FileUtil.downLoadExcel(request, response, datas, __out_fields[outFieldType].split(","), fileName);
			break;
		case "myStudents":
			// __out_fields废弃,因为动态拼接每一次成绩,每个老师作业数目不同;
			/*
			 * StringUtils.join(Arrays.asList(__std_num , __std_name , __std_score) , ',' ),
			 */
			List<String> column = new ArrayList<>();
			column.add(__std_num);
			column.add(__std_name);
			int count = 1, flag = 0;
			Map<Integer, String> titles = new HashMap<>();
			fileName = RequestUtil.getString(request, "crsName") + "_学生名单.xls";
			outFieldType = CRSSTD;
			crsTchId = RequestUtil.getString(request, "crsTchId");
			args.put("t_crs_std.crs_tch_id =", crsTchId);
			List<CrsStdPo> csps_ms = crsStdRepository.findByCol(args);
			for (CrsStdPo csp : csps_ms) {
				data = new HashMap();
				data.put(__std_num, csp.getStdNum());
				data.put(__std_name, csp.getStdName());
				Map<String, Object> map = new HashMap<>();
				map.put("crsTchId", crsTchId);
				map.put("stdNum", csp.getStdNum());
				List<JobStdPo> pos = jobStdRepository.findAStdJobs(map);
				for (JobStdPo jobStdPo : pos) {
					if (flag == 0) {
						titles.put(count++, jobStdPo.getTitle());
					}
					data.put(jobStdPo.getTitle(), "" + jobStdPo.getScore());
				}
				flag = 1;
				data.put("总成绩", "" + csp.getScore());
				datas.add(data);
			}
			for (int i = 1; i <= titles.size(); i++) {
				column.add(titles.get(i));
			}
			column.add("总成绩");
			FileUtil.downLoadExcel(request, response, datas, StringUtil.join(column, ",").split(","), fileName);
			break;
		case "files":

			fileName = crsName + "_学生作业文件.zip";
			crsTchId = RequestUtil.getString(request, "crsTchId");
			CrsTchPo po = crsTchRepository.get(crsTchId);
			String stdNum = "";
			// 判断课程是否存在管理
			if (po.getUniManage() != null) {
				Map<String, String> temp = new HashMap<>();
				temp.put("crs_tch_id =", crsTchId);
				List<CrsStdPo> list = crsStdRepository.findByCol(temp);
				// 如果存在管理,并且此教师存在自己学生那么就仅仅下载自己学生作业
				if (list.size() > 0) {
					// stdNum += "std_num in (";
					stdNum += "std_num in (";
					for (CrsStdPo crsStdPo : list) {
						//stdNum += crsStdPo.getStdNum() + ",";
						stdNum += "'" + crsStdPo.getStdNum() + "',";
					}
					//stdNum = stdNum.substring(0, stdNum.length() - 1) + ")";
					stdNum = stdNum.substring(0, stdNum.length() - 1) + ")";
				}
			}

			args.put("t_crs_job.crs_tch_id =", crsTchId);
			List<CrsJobPo> cjps_f = crsJobRepository.findByCol(args);
			String ctemp = "d:\\temp\\freegrad\\";
			String tempDir = ctemp + crsName + "_学生作业文件\\";
			String basePath = AppFileUtil.getBasePath() + "\\";
			ExecutorService pool = Executors.newFixedThreadPool(9);
			AttachmentPo ap = null;
			// 创建所有作业目录
			for (CrsJobPo cjp : cjps_f) {
				FileUtil.createFolderFile(tempDir + cjp.getTitle() + "\\");
				// 将学生作业复制到此目录下
				args.clear();
				args.put("t_job_std.jobId =", cjp.getId());
				if (!stdNum.equals("")) {
					args.put(stdNum, "");
				}
				List<JobStdPo> jsps = jobStdRepository.findByCol(args);
				for (JobStdPo jsp : jsps) {
					if (StringUtil.isNotEmpty(jsp.getFile_id_())) {
						ap = attachmentRepository.get(jsp.getFile_id_());
						try {
							String pathFrom = basePath + ap.getFilePath();
							String fn = jsp.getStdNum() + "_" + jsp.getStdName() + "_" + ap.getFileName();
							if (ap.getFileName().contains(jsp.getStdName()))
								fn = ap.getFileName();

							String pathTo = tempDir + cjp.getTitle() + "\\" + fn + "." + ap.getExt();
							pool.submit(new MoveFile(pathFrom, pathTo));
						} catch (Exception e) {
							System.out.println(jsp.getFile_id_());
						}
					}
				}
			}

			// 打包文件
			try {
				FileUtil.zip(tempDir, false);
				FileUtil.downLoadFile(request, response, tempDir + ".zip", fileName);
				FileUtil.deleteDir(new File(tempDir));
			} catch (Exception e) {
				response.getWriter().println("<script>alert('此课程作业导出异常，请检查是否创建了作业');history.back();</script>");
			}
			break;
		case "someFiles":
			fileName = crsName + "_学生作业文件.zip";
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			crsTchId = RequestUtil.getString(request, "crsTchId");
			po = crsTchRepository.get(crsTchId);
			stdNum = "";
			// 判断课程是否存在管理
			if (po.getUniManage() != null) {
				Map<String, String> temp = new HashMap<>();
				temp.put("crs_tch_id =", crsTchId);
				List<CrsStdPo> list = crsStdRepository.findByCol(temp);
				// 如果存在管理,并且此教师存在自己学生那么就仅仅下载自己学生作业
				if (list.size() > 0) {
					stdNum += "std_num in (";
					for (CrsStdPo crsStdPo : list) {
						stdNum += crsStdPo.getStdNum() + ",";
					}
					stdNum = stdNum.substring(0, stdNum.length() - 1) + ")";
				}
			}
			List<CrsJobPo> poList = crsJobRepository.findByIds(Arrays.asList(ids));
			ctemp = "d:\\temp\\freegrad\\";
			tempDir = ctemp + crsName + "_学生作业文件\\";
			basePath = AppFileUtil.getBasePath() + "\\";
			pool = Executors.newFixedThreadPool(9);
			ap = null;
			// 创建所有作业目录
			for (CrsJobPo cjp : poList) {
				FileUtil.createFolderFile(tempDir + cjp.getTitle() + "\\");
				// 将学生作业复制到此目录下
				args.clear();
				args.put("t_job_std.jobId =", cjp.getId());
				if (!stdNum.equals("")) {
					args.put(stdNum, "");
				}
				List<JobStdPo> jsps = jobStdRepository.findByCol(args);
				for (JobStdPo jsp : jsps) {
					if (StringUtil.isNotEmpty(jsp.getFile_id_())) {
						ap = attachmentRepository.get(jsp.getFile_id_());
						try {
							String pathFrom = basePath + ap.getFilePath();
							String fn = jsp.getStdNum() + "_" + jsp.getStdName() + "_" + ap.getFileName();
							if (ap.getFileName().contains(jsp.getStdName()))
								fn = ap.getFileName();

							String pathTo = tempDir + cjp.getTitle() + "\\" + fn + "." + ap.getExt();
							pool.submit(new MoveFile(pathFrom, pathTo));
						} catch (Exception e) {
							System.out.println(jsp.getFile_id_());
						}
					}
				}
			}

			// 打包文件
			try {
				FileUtil.zip(tempDir, false);
				FileUtil.downLoadFile(request, response, tempDir + ".zip", fileName);
				FileUtil.deleteDir(new File(tempDir));
			} catch (Exception e) {
				response.getWriter().println("<script>alert('此课程作业导出异常，请检查是否创建了作业');history.back();</script>");
			}
			break;
		case "unSubmitted":
			String jobId = RequestUtil.getString(request, "jobId");
			String title = RequestUtil.getString(request, "title").replaceAll(" ", "");
			crsName = RequestUtil.getString(request, "crsName");
			crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();

			crsTchId = RequestUtil.getString(request, "crsTchId");
			args.put("t_job_std.status = 0", null);
			// 判断是点击柱状图（含有jobid）还是按钮（有crstchid）
			if (StringUtil.isNotEmpty(jobId))
				args.put("jobId =", jobId);
			else
				args.put("t_crs_job.crs_tch_id = ", crsTchId);

			List<JobStdPo> jsps = jobStdRepository.findByCol(args);
			for (JobStdPo jsp : jsps) {
				data = new HashMap();
				data.put("作业名称", jsp.getTitle());
				data.put(__std_num, jsp.getStdNum());
				data.put(__std_name, jsp.getStdName());
				data.put("提交状态", "未提交");
				datas.add(data);
			}

			fileName = crsName + title + "_未提交名单.xls";
			String[] fieds = { "作业名称", __std_num, __std_name, "提交状态" };
			FileUtil.downLoadExcel(request, response, datas, fieds, fileName);
			break;
		default:
			break;
		}
	}

	/**
	 * 编辑【教师课程】信息页面
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
		String admin = RequestUtil.getString(request, "admin", "");
		String crsName = RequestUtil.getString(request, "crsName");
		crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();
		String copy = RequestUtil.getString(request, "copy");// 从其他课程复制
		CrsTchPo crsTch = null;
		if (StringUtil.isNotEmpty(id)) {

			Map args = new HashMap();

			args.put("t_crs_tch.id_crs_tch =", id);

			crsTch = crsTchRepository.getByCol(args);

		}
		if (StringUtil.isNotEmpty(copy)) {
			return getAutoView().addObject("returnUrl", preUrl).addObject("crsTch", crsTch)
					.addObject("crsName", crsName).addObject("admin", false).addObject("copy", true)
					.addObject("tchNum", getMyNum());
		}

		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl).addObject("crsName", crsName)
				.addObject("admin", (Boolean) StringUtil.isNotEmpty(admin));
	}
	@RequestMapping("editPG")
	public ModelAndView editPG(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		String admin = RequestUtil.getString(request, "admin", "");
		String crsName = RequestUtil.getString(request, "crsName");
		String xh = RequestUtil.getString(request, "xh");
		String copy = RequestUtil.getString(request, "copy");// 从其他课程复制
		CrsTchPo crsTch = null;
		if (StringUtil.isNotEmpty(id)) {

			Map args = new HashMap();

			args.put("t_crs_tch.id_crs_tch =", id);

			crsTch = crsTchRepository.getByCol(args);

		}
		if (StringUtil.isNotEmpty(copy)) {
			return getAutoView().addObject("returnUrl", preUrl).addObject("crsTch", crsTch)
					.addObject("crsName", crsName).addObject("admin", false).addObject("copy", true)
					.addObject("tchNum", getMyNum());
		}

		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl).addObject("crsName", crsName)
				.addObject("admin", (Boolean) StringUtil.isNotEmpty(admin));
	}
	@RequestMapping("edit2")
	public ModelAndView edit2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		String admin = RequestUtil.getString(request, "admin", "");
		String crsName = RequestUtil.getString(request, "crsName");
		crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();
		String xh = RequestUtil.getString(request, "xh");
		String copy = RequestUtil.getString(request, "copy");// 从其他课程复制
		CrsTchPo crsTch = null;
		if (StringUtil.isNotEmpty(id)) {

			Map args = new HashMap();

			args.put("t_crs_tch.id_crs_tch =", id);

			crsTch = crsTchRepository.getByCol(args);

		}
		if (StringUtil.isNotEmpty(copy)) {
			return getAutoView().addObject("returnUrl", preUrl).addObject("crsTch", crsTch)
					.addObject("crsName", crsName).addObject("admin", false).addObject("copy", true)
					.addObject("tchNum", getMyNum());
		}

		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl).addObject("crsName", crsName)
				.addObject("admin", (Boolean) StringUtil.isNotEmpty(admin));
	}


	/**
	 * 编辑【教师课程】信息页面
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
		CrsTchPo crsTch = null;
		if (StringUtil.isNotEmpty(id)) {
			crsTch = crsTchRepository.get(id);
		}
		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl);
	}

	/**
	 * 【教师课程】明细页面
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
		CrsTchPo crsTch = null;
		if (StringUtil.isNotEmpty(id)) {
			crsTch = crsTchRepository.get(id);
		}
		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【教师课程】信息
	 *
	 * @param request
	 * @param response
	 * @param crsTch
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// save方法特殊的一点：绑定了新的分值参数模板的时候需要删除旧的课程作业和学生作业，同时
		// 按照新的分数参数模板写入新的课程作业和学生作业
		//
		// 新改动：判断是否清空 @ 09-26 15：09
		//////////////////////////////////////////////////////////////////////////////////////////////////

		boolean reset = RequestUtil.getBoolean(request, "reset");
		boolean copy = RequestUtil.getBoolean(request, "copy");
		ResultMessage message = null;
		boolean isError = false;
		JSONObject jo = JSONObject.fromObject(RequestUtil.getString(request, "crsTchPo"));
		CrsTchPo crsTchPo = crsTchRepository.parseCrsTchPoByJson(jo);
		if (copy) {// 从其他课程考培作业
			if (reset)
				crsTchRepository.del(crsTchPo.getId());
			String source = jo.getString("source");
			String clazz = crsTchRepository.get(source).getClazz();
			Map args = new HashMap();
			args.put("t_crs_std.crs_tch_id =", crsTchPo.getId());
			List<CrsStdPo> csps = crsStdRepository.findByCol(args);
			args.clear();
			args.put("t_crs_job.crs_tch_id =", source);
			List<CrsJobPo> cjps = crsJobRepository.findByCol(args);
			JobStdPo jsp = null;
			for (CrsJobPo cjp : cjps) {
				cjp.setId("");
				cjp.setCrsTchId(crsTchPo.getId());
				cjp.setClazz(clazz);
				cjp.setSubmitNum(0);
				cjp.setUnSubmitNum(0);
				
				crsJobRepository.newInstance(cjp).save();
				String jobId = cjp.getId();
				for (CrsStdPo csp : csps) {
					jsp = new JobStdPo(jobId, csp.getStdNum());
					jobStdRepository.newInstance(jsp).save();
				}
			}
			message = new ResultMessage(ResultMessage.SUCCESS, "作业拷贝成功！");
		} else {

			String paramId = crsTchPo.getParamid();
			if (!RequestUtil.getBoolean(request, "admin"))
				crsTchPo = crsTchRepository.get(crsTchPo.getId());
			if (StringUtil.isNotEmpty(paramId)) {
				try {
					crsTchRepository.updateByParam(paramId, crsTchPo.getId(), reset);
				} catch (ParseException e1) {
					message = new ResultMessage(ResultMessage.ERROR, "操作失败" + e1.getMessage());
					isError = true;
				}
			}
			if (!isError) {
				// 构造领域对象和保存数据
				if (StringUtil.isEmpty(crsTchPo.getStartTime())) {
					try {
						String tt[] = crsTchPo.getTerm().split("-");
						String startTime = null;
						if (tt[2].equals("1"))
							startTime = tt[0] + "-" + WINTER;
						else if (tt[2].equals("2"))
							startTime = tt[1] + "-" + SUMMER;
						startTime += " 00:00:00";
						crsTchPo.setStartTime(startTime);
					} catch (Exception e) {
						message = new ResultMessage(ResultMessage.ERROR, "学期格式错误");
						writeResultMessage(response.getWriter(), message);
						return;
					}
				}
				CrsTch crsTch = crsTchRepository.newInstance(crsTchPo);
				crsTch.save();
				message = new ResultMessage(ResultMessage.SUCCESS, "操作成功");
			}
		}

		try {
			writeResultMessage(response.getWriter(), message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CrsTchPo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		CrsTchPo crsTchPo = getCrsTchPo(jsonObj);

		return crsTchPo;
	}

	/**
	 * 获取教师课程数据
	 *
	 * @param jsonObj
	 */
	private CrsTchPo getCrsTchPo(JSONObject jsonObj) {
		CrsTchPo crsTchPo = (CrsTchPo) JsonUtil.getDTO(jsonObj.toString(), CrsTchPo.class);
		return crsTchPo;
	}

	/**
	 * 批量删除【教师课程】记录
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
			List<CrsTchPo> childs=new LinkedList<>();
			for(String id:ids) {
				Map<String, String> map=new HashMap<>();
				map.put("t_crs_tch.id_crs_tch !=", id);
				map.put("t_crs_tch.uni_manage =", id);
				List<CrsTchPo> managed = crsTchRepository.findByCol(map);
				childs.addAll(managed);
			}
			
			
			// 构造领域对象和保存数据
			CrsTch crsTch = crsTchRepository.newInstance();
			crsTch.deleteByIds(ids);
			if(childs!=null) {
				List<String> childsList=new LinkedList<>();
				for(CrsTchPo po:childs) {
					childsList.add(po.getId());
				}
				crsTch.deleteByIds(childsList.toArray(new String[childsList.size()]));
			}
			message = new ResultMessage(ResultMessage.SUCCESS, "删除教师课程成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除教师课程失败，" + e.getMessage());
			logger.error("删除教师课程失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("listMyStudents")
	public ModelAndView listMyStudents(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String preUrl = RequestUtil.getPrePage(request);
		String name = RequestUtil.getString(request, "crsName");
		return getAutoView().addObject("crsName", name).addObject("returnUrl", preUrl);
	}
	@RequestMapping("listMyStudentsPG")
	public ModelAndView listMyStudentsPG(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String preUrl = RequestUtil.getPrePage(request);
		String name = RequestUtil.getString(request, "crsName");
		return getAutoView().addObject("crsName", name).addObject("returnUrl", preUrl);
	}
	@RequestMapping("listMyStudents2")
	public ModelAndView listMyStudents2(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String preUrl = RequestUtil.getPrePage(request);
		String name = RequestUtil.getString(request, "crsName");
		return getAutoView().addObject("crsName", name).addObject("returnUrl", preUrl);
	}

	/**
	 * 查看学生列表
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("listMyStudentsJson")
	public @ResponseBody PageJson listMyStudentsJson(HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		QueryFilter queryFilter = getQuerFilter(request);
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		queryFilter.addFilter("crs_tch_id", crsTchId, QueryOP.EQUAL);
		PageList<CrsStdPo> csps = (PageList<CrsStdPo>) crsStdRepository.query(queryFilter);
		return new PageJson(csps);
	}

	CrsStdPo makeMoreCrsStdPo(CrsStdPo csp, PartyUserPo pup) {
		// user.id->employee.groupid->entity->学院、专业、班级
		String uid = pup.getId();
		String group_id = partyEmployeeRepository.get(uid).getGroupID();
		String path = partyEntityRepository.get(group_id).getPath();
		String parents[] = path.split("\\.");
		String stdName = partyEntityRepository.get(uid).getName();
		String stdClazz = partyEntityRepository.get(parents[2]).getName();
		String stdProfession = partyEntityRepository.get(parents[1]).getName();
		String stdCollege = partyEntityRepository.get(parents[0]).getName();
		csp.setStdName(stdName);
		return csp;
	}
	@RequestMapping("listMyStudentsJsonPG")
	public @ResponseBody PageJson listMyStudentsJsonPG(HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		QueryFilter queryFilter = getQuerFilter(request);
//		queryFilter.addFilter("crs_tch_id", "bysj", QueryOP.LIKE);
		PageList<UrlZhiYuanPo> csps = (PageList<UrlZhiYuanPo>) urlZhiYuanRepository.query(queryFilter);
		
//		PageList<CrsStdPo> csps = (PageList<CrsStdPo>) crsStdRepository.findBysjStd();
		return new PageJson(csps);
	}
	@RequestMapping("listMyStudentsJson2")
	public @ResponseBody PageJson listMyStudentsJson2(HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		QueryFilter queryFilter = getQuerFilter(request);
//		queryFilter.addFilter("crs_tch_id", "bysj", QueryOP.LIKE);
		PageList<UrlZhiYuanPo> csps = (PageList<UrlZhiYuanPo>) urlZhiYuanRepository.query(queryFilter);
		
//		PageList<CrsStdPo> csps = (PageList<CrsStdPo>) crsStdRepository.findBysjStd();
		return new PageJson(csps);
	}


	/**
	 * 【学生课程】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getMyStudent")
	public ModelAndView getMyStudent(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		CrsStdPo crsStd = null;
		if (StringUtil.isNotEmpty(id)) {
			crsStd = crsStdRepository.get(id);
		}
		PartyUserPo pup = partyUserRepository.getByAccount("heu" + crsStd.getStdNum());
		crsStd = makeMoreCrsStdPo(crsStd, pup);

		return getAutoView().addObject("crsStd", crsStd).addObject("returnUrl", preUrl);
	}

	@RequestMapping("dataImport")
	public void dataImport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		response.sendRedirect("/gradp/admin/data/imbort.htm?type=" + TCH_IMPORT_STD + "&crsTchId=" + crsTchId);
	}

	/**
	 * 课程数据统计界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("statistics")
	public ModelAndView statistics(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String crsName = RequestUtil.getString(request, "crsName");
		crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		return getAutoView().addObject("returnUrl", preUrl).addObject("crsTchId", crsTchId).addObject("crsName",
				crsName);
	}

	/*
	 * Recoded By Scala
	 * 
	 * @RequestMapping("getNew") public void getNew(HttpServletRequest request,
	 * HttpServletResponse response) throws IOException { Map args = new HashMap();
	 * String crsTchId = RequestUtil.getString(request, "crsTchId");
	 * args.put("crs_tch_id =", crsTchId); List<CrsJobPo> cjps =
	 * crsJobRepository.findByCol(args); List<JobStdPo> jsps = null; List<String>
	 * jobIds = new ArrayList(); for (CrsJobPo cjp : cjps) jobIds.add(cjp.getId());
	 * 
	 * String param = "('" + StringUtils.join(jobIds, "\',\'") + "')"; args.clear();
	 * String stdNums = RequestUtil.getString(request, "stdNums").replace('[',
	 * '(').replace(']', ')').replace('"', '\'');
	 * 
	 * 
	 * 
	 * args.put("jobId in " + param, ""); args.put("std_num in " + stdNums, "");
	 * args.put("t_job_std.status =", JobStdPo.SUBMITTED);
	 * args.put("review_status = " , "0"); jsps = jobStdRepository.findByCol(args);
	 * 
	 * 
	 * 
	 * 
	 * args.clear(); List<String> ids = new ArrayList() , names = new ArrayList();
	 * try { for(JobStdPo jsp : jsps){ try { if( !names.contains(jsp.getStdName())){
	 * ids.add(jsp.getStdNum()); names.add(jsp.getStdName()); } } catch (Exception
	 * e) { } } } catch (Exception e) { } JSONObject jo = new JSONObject();
	 * jo.put("id", ids); jo.put("name", names); response.getWriter().println(jo); }
	 */
	/**
	 * echarts数据源
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSubmitData")
	public void getSubmitData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		Map args = new HashMap();
		args.put("t_crs_job.crs_tch_id =", crsTchId);
		List<JobStdPo> jsps = jobStdRepository.findByCol(args);

		Map<String, Object> submitted = new LinkedHashMap(), unSubmitted = new LinkedHashMap(),
				jobTitlesJobIdsStatus = new LinkedHashMap();

		int t = 0;
		String title = null;
		boolean subed = false;
		String[] ssTime = null;
		String[] statusStr = { "未开始", "进行中", "已结束" };
		// 遍历学生作业，计算提交和未提交的总数
		for (JobStdPo jsp : jsps) {
			title = jsp.getTitle();
			subed = jsp.getStatus() == JobStdPo.SUBMITTED;

			ssTime = jsp.getStartStopTime().split("/");

			if (!jobTitlesJobIdsStatus.containsKey(title))
				jobTitlesJobIdsStatus.put(jsp.getTitle(),
						jsp.getJobid() + "@" + statusStr[DateUtil.currentCompareByRange(ssTime[0], ssTime[1]) + 1]);

			int adder = 0;
			try {
				adder = (int) submitted.get(title);
			} catch (Exception e) {
			} finally {
				submitted.put(title, adder + (subed ? 1 : 0));
				adder = 0;
			}
			try {
				adder = (int) unSubmitted.get(title);
			} catch (Exception e) {
			} finally {
				unSubmitted.put(title, adder + (!subed ? 1 : 0));
			}
		}
		// 将已提交与未提交的总数封装成echarts的{name:xxx,value:xxx}的格式
		Iterator<String> iterator = jobTitlesJobIdsStatus.keySet().iterator();
		JSONObject data[] = new JSONObject[2];
		String jobIdStatus = null, count_s = null, count_u = null, showStatus = null;
		JSONArray ja_s = new JSONArray(), ja_u = new JSONArray();
		while (iterator.hasNext()) {
			title = iterator.next();
			jobIdStatus = (String) jobTitlesJobIdsStatus.get(title);
			count_s = "" + submitted.get(title);
			count_u = "" + unSubmitted.get(title);
			data[0] = new JSONObject();
			data[1] = new JSONObject();
			data[0].put("name", jobIdStatus);
			data[0].put("value", count_s);

			data[1].put("name", jobIdStatus);
			data[1].put("value", count_u);
			ja_s.add(data[0]);
			ja_u.add(data[1]);
		}

		JSONObject jo = new JSONObject();
		jo.put("submitted", ja_s);
		jo.put("unSubmitted", ja_u);
		jo.put("jobs", jobTitlesJobIdsStatus.keySet());
		response.getWriter().println(jo);

	}

	/**
	 * 教师催促学生提交作业，发送邮件
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("sendMail")
	public void sendMail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsName = RequestUtil.getString(request, "crsName")// com.utils.StringUtil.getFromRequest(request,
																	// "crsName")
				, title = RequestUtil.getString(request, "title")// com.utils.StringUtil.getFromRequest(request,
																	// "title")
				, jobId = RequestUtil.getString(request, "jobId");

		Map args = new HashMap();
		args.put("jobId =", jobId);
		args.put("t_job_std.status = 0", "");
		List<JobStdPo> jsps = jobStdRepository.findByCol(args);
		List<PartyEntityPo> peps = new ArrayList();
		List<String> mails = new ArrayList();
		for (JobStdPo jsp : jsps)
			mails.add(jsp.getEmail());

		String email = StringUtils.join(mails, ';') + ";";
		String content = "<p>&nbsp;&nbsp;&nbsp;&nbsp;同学您好，您所选的<span style=\"font-size:24px;background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);"
				+ "  font-family: &quot;arial black&quot;, &quot;avant garde&quot;;\">" + crsName
				+ "</span>的<span style=\"font-size:24px;background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);"
				+ " font-family: &quot;arial black&quot;, &quot;avant garde&quot;;\">" + title
				+ "</span>作业还没有提交，上课老师已经通过轻教教务平台催促你提交作业！请您按时提交哦~";

		OutMailPo omp = new OutMailPo();
		omp.setTitle("【轻教】有老师催促你提交作业啦");
		omp.setContent(content);
		omp.setReceiverAddresses(email);
		omp.setSenderName("轻教");
		omp.setIsReply(false);
		omp.setSetId("1");
		omp.setTypes("outbox");

		outMailRepository.newInstance(omp).saveOutmail("1");
	}

	String getMyNum() {
		return getMe().getAlias();
	}

	private PartyEntityPo getMe() {
		String id = ContextUtil.getCurrentUserId();
		return partyEntityRepository.get(id);
	}

	String getMyName() {
		return getMe().getName();
	}
}
