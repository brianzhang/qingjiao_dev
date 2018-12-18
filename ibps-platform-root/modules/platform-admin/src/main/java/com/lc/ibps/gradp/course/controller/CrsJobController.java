
package com.lc.ibps.gradp.course.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.datasource.pooled.PooledDataSourceFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.Direction;
import com.lc.ibps.api.base.query.FieldSort;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultFieldSort;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.grads.course.domain.CrsJob;
import com.lc.ibps.grads.course.domain.CrsStd;
import com.lc.ibps.grads.course.persistence.entity.CourseParamPo;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CourseRepository;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.utils.DateUtil;
import com.utils.FileUtil;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;

import net.sf.json.JSONObject;


/**
 * 课程作业 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/crsJob/")
public class CrsJobController extends GenericController {
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	CourseRepository courseRepository;
	@Resource
	AttachmentRepository attachmentRepository;

	/**
	 * 【课程作业】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		PageList<CrsJobPo> res=null;
		
		//正常课程可以发布作业
		if(crsTchPo.getUniManage()==null||crsTchPo.getUniManage().equals(crsTchId)) {
			List<CrsJobPo> submitUnSubmitNum = crsJobRepository.selectSubmitUnSubmitNum(crsTchId);
			
			for (CrsJobPo crsJobPo : submitUnSubmitNum) {
				CrsJobPo po = crsJobRepository.get(crsJobPo.getId());
				//liujia 加入一个po判断条件 解决了新增作业后无法数据不显示的bug 希望做这个项目的人有时间好好看一下
				if (po != null) {
					po.setUnSubmitNum(crsJobPo.getUnSubmitNum());
					po.setSubmitNum(crsJobPo.getSubmitNum());
					crsJobRepository.newInstance(po).update();
				}

			}
			//处理已批阅信息
			List<CrsJobPo> checkAllNum = crsJobRepository.selectAllCheck(crsTchId);
			for (CrsJobPo crsJobPo : checkAllNum) {
				CrsJobPo po = crsJobRepository.get(crsJobPo.getId());
				po.setTchAllFnsh(crsJobPo.getTchAllFnsh());
				crsJobRepository.newInstance(po).update();
			}
			QueryFilter qf = getQuerFilter(request);
			qf.addFilter("crs_tch_id", crsTchId, QueryOP.EQUAL);
			PageList<CrsJobPo> cjps = (PageList) crsJobRepository.query(qf);
			 res = new PageList<>(cjps.getPageResult());
			for (CrsJobPo cjp : cjps) {
				cjp = crsJobRepository.makeTime(cjp);
				cjp = crsJobRepository.makeStatus(cjp);
				res.add(cjp);
			}
		}else {
			//被管理课程
			List<CrsJobPo> selectVirSub = crsJobRepository.selectVirSub(crsTchPo);
			Map<String,Integer> mapsub=new HashMap<>();
			for (CrsJobPo crsJobPo : selectVirSub) {
				mapsub.put(crsJobPo.getId(), crsJobPo.getSubmitNum());
			}
			List<CrsJobPo> selectVirUnSub = crsJobRepository.selectVirUnSub(crsTchPo);
			Map<String,Integer> mapunsub=new HashMap<>();
			for (CrsJobPo crsJobPo : selectVirUnSub) {
				mapunsub.put(crsJobPo.getId(), crsJobPo.getUnSubmitNum());
			}
			List<CrsJobPo> selectCheck= crsJobRepository.selectCheck(crsTchPo);
			Map<String,Integer> mapcheck=new HashMap<>();
			for (CrsJobPo crsJobPo : selectCheck) {
				mapcheck.put(crsJobPo.getId(), crsJobPo.getTchFnsh());
			}
			QueryFilter qf = getQuerFilter(request);
			qf.addFilter("crs_tch_id", crsTchPo.getUniManage(), QueryOP.EQUAL);
			PageList<CrsJobPo> cjps = (PageList) crsJobRepository.query(qf);
			res = new PageList<>(cjps.getPageResult());
			for (CrsJobPo cjp : cjps) {
				cjp = crsJobRepository.makeTime(cjp);
				cjp = crsJobRepository.makeStatus(cjp);
				cjp.setSubmitNum(mapsub.get(cjp.getId()));
				cjp.setUnSubmitNum(mapunsub.get(cjp.getId()));
     			cjp.setTchAllFnsh(mapcheck.get(cjp.getId()));
				res.add(cjp);
			}
		}
		return new PageJson(res);

		/*
		 * QueryFilter queryFilter = getQuerFilter(request); List<FieldSort> fieldSorts
		 * = queryFilter.getFieldSortList(); Map<String,String> arg = new HashMap(); if
		 * (BeanUtils.isEmpty(fieldSorts)) { fieldSorts = new ArrayList<FieldSort>();
		 * fieldSorts.add(new DefaultFieldSort("start_stop_time",
		 * Direction.fromString("asc"))); queryFilter.setFieldSortList(fieldSorts); }
		 * 
		 * int t = RequestUtil.getInt(request, "t"); String obj =
		 * RequestUtil.getString(request, "obj"); String num =
		 * RequestUtil.getString(request, "num"); PageList<CrsJobPo> crsJobList; if
		 * (obj.equals("student")) { arg.put("std_num", num); CrsStdPo csp =
		 * crsStdRepository.getByCol(arg); String crsTchId = csp.getCrsTchId();
		 * queryFilter.addFilter("crs_tch_id", crsTchId, QueryOP.EQUAL); //
		 * queryFilter.addFilter("crs_tch_id", "1", QueryOP.EQUAL); } else {
		 * arg.put("tch_num", num); List<CrsTchPo> ctps =
		 * crsTchRepository.findByCol(arg); String[] ids = new String[ctps.size()]; int
		 * i = 0; for (CrsTchPo ctp : ctps) { ids[i] = ""; ids[i++] = ctp.getId(); }
		 * queryFilter.addFilter("crs_tch_id", ids, QueryOP.IN); } arg.clear();
		 * queryFilter.addFilter("category", t, QueryOP.EQUAL); crsJobList =
		 * crsJobRepository.resFromPageList((PageList<CrsJobPo>)
		 * crsJobRepository.query(queryFilter)); PageList<CrsJobPo> crsJobListRes = new
		 * PageList(); if (obj.equals("student")) {
		 * crsJobListRes.setPageResult(crsJobList.getPageResult()); for (CrsJobPo cjp :
		 * crsJobList) { arg.put("jobId", cjp.getId()); arg.put("stdNum", num); JobStdPo
		 * jsp = jobStdRepository.getByCol("jobId_Me", arg); if
		 * (!StringUtil.isNotEmpty(jsp.getActionTime())) {
		 * cjp.setStdStatus("<span style=\"color:red\">未完成</span>"); } else {
		 * cjp.setStdStatus("<span style=\"color:green\">已完成</span>"); }
		 * cjp.setComment(jsp.getComment()); cjp.setStdJobScore(jsp.getScore());
		 * crsJobListRes.add(cjp); } } else { crsJobListRes = crsJobList; } return new
		 * PageJson(crsJobListRes);
		 */
	}

	
	@RequestMapping("listJson2")
	public @ResponseBody PageJson listJson2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		PageList<CrsJobPo> res=null;
		
		//正常课程可以发布作业
		if(crsTchPo.getUniManage()==null||crsTchPo.getUniManage().equals(crsTchId)) {
			List<CrsJobPo> submitUnSubmitNum = crsJobRepository.selectSubmitUnSubmitNum(crsTchId);
			
			for (CrsJobPo crsJobPo : submitUnSubmitNum) {
				CrsJobPo po = crsJobRepository.get(crsJobPo.getId());
				po.setUnSubmitNum(crsJobPo.getUnSubmitNum());
				po.setSubmitNum(crsJobPo.getSubmitNum());
				crsJobRepository.newInstance(po).update();
			}
			//处理已批阅信息
			List<CrsJobPo> checkAllNum = crsJobRepository.selectAllCheck(crsTchId);
			for (CrsJobPo crsJobPo : checkAllNum) {
				CrsJobPo po = crsJobRepository.get(crsJobPo.getId());
				po.setTchAllFnsh(crsJobPo.getTchAllFnsh());
				crsJobRepository.newInstance(po).update();
			}
			QueryFilter qf = getQuerFilter(request);
			qf.addFilter("crs_tch_id", crsTchId, QueryOP.EQUAL);
			PageList<CrsJobPo> cjps = (PageList) crsJobRepository.query(qf);
			 res = new PageList<>(cjps.getPageResult());
			for (CrsJobPo cjp : cjps) {
				cjp = crsJobRepository.makeTime(cjp);
				cjp = crsJobRepository.makeStatus(cjp);
				res.add(cjp);
			}
		}else {
			//被管理课程
			List<CrsJobPo> selectVirSub = crsJobRepository.selectVirSub(crsTchPo);
			Map<String,Integer> mapsub=new HashMap<>();
			for (CrsJobPo crsJobPo : selectVirSub) {
				mapsub.put(crsJobPo.getId(), crsJobPo.getSubmitNum());
			}
			List<CrsJobPo> selectVirUnSub = crsJobRepository.selectVirUnSub(crsTchPo);
			Map<String,Integer> mapunsub=new HashMap<>();
			for (CrsJobPo crsJobPo : selectVirUnSub) {
				mapunsub.put(crsJobPo.getId(), crsJobPo.getUnSubmitNum());
			}
			List<CrsJobPo> selectCheck= crsJobRepository.selectCheck(crsTchPo);
			Map<String,Integer> mapcheck=new HashMap<>();
			for (CrsJobPo crsJobPo : selectCheck) {
				mapcheck.put(crsJobPo.getId(), crsJobPo.getTchFnsh());
			}
			QueryFilter qf = getQuerFilter(request);
			qf.addFilter("crs_tch_id", crsTchPo.getUniManage(), QueryOP.EQUAL);
			PageList<CrsJobPo> cjps = (PageList) crsJobRepository.query(qf);
			res = new PageList<>(cjps.getPageResult());
			for (CrsJobPo cjp : cjps) {
				cjp = crsJobRepository.makeTime(cjp);
				cjp = crsJobRepository.makeStatus(cjp);
				cjp.setSubmitNum(mapsub.get(cjp.getId()));
				cjp.setUnSubmitNum(mapunsub.get(cjp.getId()));
     			cjp.setTchAllFnsh(mapcheck.get(cjp.getId()));
				res.add(cjp);
			}
		}
		return new PageJson(res);
	}

	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		boolean uniManage=false;
		if(crsTchPo.getUniManage()!=null&&!crsTchPo.getUniManage().equals(crsTchId)) uniManage=true;
		String name = RequestUtil.getString(request, "crsName");
		name = new String (name.getBytes("ISO8859-1"),"utf-8").trim();
		String admin = RequestUtil.getString(request, "admin");
		boolean normalteacher=true;
		boolean shenyue=true;
		if(!admin.equals("")||uniManage) {
			normalteacher=false;
		}
		if(!admin.equals("")) shenyue=false;
		return getAutoView().addObject("crsName", name).addObject("crsTchId", crsTchId).addObject("normalteacher", normalteacher).addObject("shenyue", shenyue);
	}

	
	
	@RequestMapping("list2")
	public ModelAndView list2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
		boolean uniManage=false;
		if(crsTchPo.getUniManage()!=null&&!crsTchPo.getUniManage().equals(crsTchId)) uniManage=true;
		String name = RequestUtil.getString(request, "crsName");
		name = new String (name.getBytes("ISO8859-1"),"utf-8").trim();
		String admin = RequestUtil.getString(request, "admin");
		boolean normalteacher=true;
		boolean shenyue=true;
		if(!admin.equals("")||uniManage) {
			normalteacher=false;
		}
		if(!admin.equals("")) shenyue=false;
		return getAutoView().addObject("crsName", name).addObject("crsTchId", crsTchId).addObject("normalteacher", normalteacher).addObject("shenyue", shenyue);
	}
	/**
	 * 编辑【课程作业】信息页面
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
		boolean showChangeAfter = false;
		CrsJobPo crsJob = null;
		if (StringUtil.isNotEmpty(id)) {
			crsJob = crsJobRepository.get(id);
			crsJob = crsJobRepository.makeTime(crsJob);
			if (StringUtils.isNotEmpty(crsJob.getModelFile()))
				crsJob.setModelFile("[" + crsJob.getModelFile() + "]");
			showChangeAfter = true;
		} else {
			crsJob = new CrsJobPo();
			crsJob.setCrsTchId(RequestUtil.getString(request, "crsTchId"));

		}
		return getAutoView().addObject("crsJob", crsJob).addObject("returnUrl", preUrl).addObject("showChangeAfter",
				showChangeAfter);

	}
	@RequestMapping("edit2")
	public ModelAndView edit2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		boolean showChangeAfter = false;
		CrsJobPo crsJob = null;
		if (StringUtil.isNotEmpty(id)) {
			crsJob = crsJobRepository.get(id);
			crsJob = crsJobRepository.makeTime(crsJob);
			if (StringUtils.isNotEmpty(crsJob.getModelFile()))
				crsJob.setModelFile("[" + crsJob.getModelFile() + "]");
			showChangeAfter = true;
		} else {
			crsJob = new CrsJobPo();
			crsJob.setCrsTchId(RequestUtil.getString(request, "crsTchId"));

		}
		return getAutoView().addObject("crsJob", crsJob).addObject("returnUrl", preUrl).addObject("showChangeAfter",
				showChangeAfter);

	}

	/**
	 * 编辑【课程作业】信息页面
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
		CrsJobPo crsJob = null;
		if (StringUtil.isNotEmpty(id)) {
			crsJob = crsJobRepository.get(id);
		}
		return getAutoView().addObject("crsJob", crsJob).addObject("returnUrl", preUrl);
	}

	/**
	 * 【课程作业】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	/*
	 * @RequestMapping("get") public ModelAndView get(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { String preUrl =
	 * RequestUtil.getPrePage(request); String id = RequestUtil.getString(request,
	 * "id"); CrsJobPo crsJob = null; if (StringUtil.isNotEmpty(id)) { crsJob =
	 * crsJobRepository.get(id); } String showStatus = ""; int s =
	 * crsJob.getStatus(); if (s == CrsJobPo.NOTSTART) { showStatus =
	 * "<span style=\"color:gray\">未开始</span>"; } else if (s == CrsJobPo.STARTING) {
	 * showStatus = "<span style=\"color:green\">进行中</span>"; } else if (s ==
	 * CrsJobPo.CLOSED) { showStatus = "<span style=\"color:red\">已结束</span>"; }
	 * crsJob.setShowStatus(showStatus);
	 * crsJob.setStartStopTime(crsJob.getStartStopTime().replace("/", " 至 "));
	 * 
	 * // id->已提交未提交 List<JobStdPo> jsps = jobStdRepository.findByCol("jobId", id);
	 * int submitted = 0, unSubmitted = 0; for (JobStdPo jsp : jsps) if
	 * (jsp.getStatus() != 0) submitted++; else unSubmitted++;
	 * 
	 * return getAutoView().addObject("crsJob", crsJob).addObject("returnUrl",
	 * preUrl) .addObject("submitted", submitted).addObject("unSubmitted",
	 * unSubmitted) .addObject("categoryList", CourseParamPo.CATEGORYLIST); }
	 */

	/**
	 * 保存【课程作业】信息
	 *
	 * @param request
	 * @param response
	 * @param crsJob
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		boolean changeAfter = RequestUtil.getBoolean(request, "after");
		try {
			CrsJobPo crsJobPo = getFromRequest(request);
			
			String mf = crsJobPo.getModelFile();
			if (StringUtil.isNotEmpty(mf))
				crsJobPo.setModelFile(mf.substring(1, mf.length() - 1));
			// 构造领域对象和保存数据
			String startTime = crsJobPo.getStartTimeP1() + ' ' + crsJobPo.getStartTimeP2();
			String stopTime = crsJobPo.getStopTimeP1() + ' ' + crsJobPo.getStopTimeP2();
			int r = DateUtil.compareTo(startTime, stopTime);
			if (r == DateUtil.AFTER) {
				message = new ResultMessage(ResultMessage.FAIL, "开始时间应早于截止时间");
			}else if (StringUtil.isNotEmpty(crsJobPo.getId())) {
				CrsJobPo old = crsJobRepository.get(crsJobPo.getId());
				QueryFilter queryFilter = getQuerFilter(request);
				queryFilter.addFilter("jobID",crsJobPo.getId(), QueryOP.EQUAL);
				queryFilter.addFilter("status",2,QueryOP.EQUAL);
				List<JobStdPo> list = jobStdRepository.query(queryFilter);
				if(list.size()!=0&&old.getScorePower()!=crsJobPo.getScorePower()) {
					message = new ResultMessage(ResultMessage.FAIL, "该作业已经有学生上交作业,不可以更改分数");
				}else {
					String newSST = startTime + '/' + stopTime;
					if (old != null && !newSST.equals(old.getStartStopTime()) && changeAfter) {
						String[] t = old.getStartStopTime().split("/");
						String oldStart = t[0];
						String oldStop = t[1];
						long[] distanceStart = crsJobRepository.getDistanceTimes(oldStart, startTime);
						long[] distanceStop = crsJobRepository.getDistanceTimes(oldStop, stopTime);

						List<CrsJobPo> afterTodayJobs = crsJobRepository.getAfterJobs(oldStart, crsJobPo.getCrsTchId());
						SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm");
						for (CrsJobPo cjp : afterTodayJobs) {
							String[] tt = cjp.getStartStopTime().split("/");

							Calendar ca = Calendar.getInstance();
							ca.setTime(f.parse(tt[0]));
							ca.add(Calendar.DATE, (int) distanceStart[0]);
							ca.add(Calendar.HOUR, (int) distanceStart[1]);
							ca.add(Calendar.MINUTE, (int) distanceStart[2]);
							String newStart = f.format(ca.getTime());

							ca.setTime(f.parse(tt[1]));
							ca.add(Calendar.DATE, (int) distanceStop[0]);
							ca.add(Calendar.HOUR, (int) distanceStop[1]);
							ca.add(Calendar.MINUTE, (int) distanceStop[2]);
							String newStop = f.format(ca.getTime());
							String newStartStop = newStart + '/' + newStop;

							cjp.setStartStopTime(newStartStop);
							CrsJob cj = crsJobRepository.newInstance(cjp);
							cj.save();
						}
					}
					crsJobPo.setStartStopTime(newSST);
					crsJobPo.setUpdateTime(new Date());
					crsJobRepository.newInstance(crsJobPo).save();
					message = new ResultMessage(ResultMessage.SUCCESS, "保存课程作业成功");
				}
				
			} else {
				String newSST = startTime + '/' + stopTime;
				crsJobPo.setStartStopTime(newSST);
				crsJobRepository.newInstance(crsJobPo).save();
				message = new ResultMessage(ResultMessage.SUCCESS, "保存课程作业成功");
				// 分发学生作业
				String crsTchId = crsJobPo.getCrsTchId();
				CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
				String jobId = crsJobPo.getId(); 
				JobStdPo jsp = null;
				if(crsTchPo.getUniManage()==null||crsTchPo.getUniManage().equals("")) {
					Map args = new HashMap<>();
					args.put("crs_tch_id =", crsTchId);
					List<CrsStdPo> csps = crsStdRepository.findByCol(args);
					for (CrsStdPo csp : csps) {
						String stdNum = csp.getStdNum();
						jsp = new JobStdPo(jobId, stdNum);
						jobStdRepository.newInstance(jsp).save();
					}
				}else {
					Map<String, String> args=new HashMap<>();
					args.put("UNI_MANAGE=", crsTchId);
					List<CrsTchPo> list = crsTchRepository.findByCol(args);
					for (CrsTchPo PO : list) {
						Map args2 = new HashMap<>();
						args2.put("CRS_TCH_ID=", PO.getId());
						List<CrsStdPo> csps = crsStdRepository.findByCol(args2);
						for (CrsStdPo csp : csps) {
							String stdNum = csp.getStdNum();
							jsp = new JobStdPo(jobId, stdNum);
							jobStdRepository.newInstance(jsp).save();
						}
					}
					
				}
			}
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对课程作业操作失败," + e.getMessage());
			logger.error("对课程作业操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CrsJobPo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		CrsJobPo crsJobPo = getCrsJobPo(jsonObj);

		return crsJobPo;
	}

	/**
	 * 获取课程作业数据
	 *
	 * @param jsonObj
	 */
	private CrsJobPo getCrsJobPo(JSONObject jsonObj) {

		CrsJobPo crsJobPo = (CrsJobPo) JsonUtil.getDTO(jsonObj.toString(), CrsJobPo.class);
		return crsJobPo;
	}

	/**
	 * 批量删除【课程作业】记录
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
			CrsJob crsJob = crsJobRepository.newInstance();
			crsJob.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除课程作业成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除课程作业失败，" + e.getMessage());
			logger.error("删除课程作业失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
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

	@RequestMapping("getChange")
	public void getChange(HttpServletRequest request, HttpServletResponse response) {
		String id = RequestUtil.getString(request, "id");
		CrsJobPo cjp = crsJobRepository.get(id);

		try {
			PrintWriter out = response.getWriter();
			String res = cjp.getTchFnsh() + "/" + cjp.getTchNd();
			out.print(res);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("exbort")
	public void exbort(HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*
		 * String jobId = RequestUtil.getString(request, "jobId"); Map arg = new
		 * HashMap(); arg.put("jobId", jobId); arg.put("status", 0); List<JobStdPo> jsps
		 * = jobStdRepository.findByCol("jobId_status", jobId); HSSFWorkbook wb = new
		 * HSSFWorkbook();// 创建工作薄
		 * 
		 * HSSFFont font = wb.createFont(); font.setFontHeightInPoints((short) 16);
		 * font.setFontName("宋体"); font.setColor(HSSFColor.BLACK.index);
		 * font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		 * 
		 * HSSFCellStyle style = wb.createCellStyle();
		 * style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		 * style.setFillForegroundColor(HSSFColor.LIGHT_TURQUOISE.index);
		 * style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		 * style.setBorderBottom(HSSFCellStyle.BORDER_THICK); style.setFont(font);
		 * 
		 * HSSFSheet sheet = wb.createSheet("未提交名单");// 创建工作表，名称为test
		 * 
		 * // title HSSFRow row = sheet.createRow(0); HSSFCell cell =
		 * row.createCell((short) 0); cell.setCellValue(new HSSFRichTextString("学号"));
		 * // cell.setCellStyle(style); cell = row.createCell((short) 1);
		 * cell.setCellValue(new HSSFRichTextString("姓名")); // cell.setCellStyle(style);
		 * int i = 1; for (JobStdPo jsp : jsps) { HSSFRow r = sheet.createRow(i++);
		 * HSSFCell c = r.createCell((short) 0); c.setCellValue(new
		 * HSSFRichTextString(jsp.getStdNum())); c = r.createCell((short) 1);
		 * c.setCellValue(new HSSFRichTextString(jsp.getStdName())); }
		 * 
		 * ByteArrayOutputStream os = new ByteArrayOutputStream();
		 * 
		 * try { wb.write(os); } catch (IOException e) { e.printStackTrace(); // return
		 * null; } String clazz = RequestUtil.getString(request, "clazz"); String title
		 * = RequestUtil.getString(request, "title"); clazz = new
		 * String(clazz.getBytes("iso-8859-1"), "UTF-8"); title = new
		 * String(title.getBytes("iso-8859-1"), "UTF-8").replaceAll(" ", ""); byte[] xls
		 * = os.toByteArray(); FileUtil.downLoadFileByByte(request, response, xls,
		 * clazz+'-'+title+"-未提交名单.xls");
		 */
	}

	@RequestMapping("saveTemplateFile")
	public void saveTemplateFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String jobStdId = RequestUtil.getString(request, "jobStdId"),
				file = URLDecoder.decode(request.getParameter("file"), "UTF-8");
		CrsJobPo cjp = crsJobRepository.get(jobStdRepository.get(jobStdId).getJobid());
		cjp.setModelFile(file);
		crsJobRepository.newInstance(cjp).save();
		response.getWriter().println("上传成功！");
	}

	@RequestMapping("zip")
	public void zip(HttpServletRequest request, HttpServletResponse response) throws SQLException {
		String num = getMyNum();
		Map<String, String> arg = new HashMap();
		arg.put("tch_num", num);
		List<CrsTchPo> ctps = crsTchRepository.findByCol(arg);

		Map<String, Map<String, Map<String, String>>> dir = new HashMap();// course
																			// ,
																			// std
																			// ,
																			// job
																			// ,
																			// file
		ExecutorService pool = Executors.newFixedThreadPool(10);
		List<Future<JSONObject>> fus = new ArrayList();

		Properties properties = new Properties();
		properties.setProperty("driver", "com.mysql.jdbc.Driver");
		properties.setProperty("url", "jdbc:mysql://172.16.0.127:3306/hgc3");
		properties.setProperty("username", "user124");
		properties.setProperty("password", "123");
		PooledDataSourceFactory pooledDataSourceFactory = new PooledDataSourceFactory();
		pooledDataSourceFactory.setProperties(properties);
		DataSource dataSource = pooledDataSourceFactory.getDataSource();
		Connection con = null;
		String sql = "SELECT" + " t_crs_job.title," + " t_course.name," + " t_crs_std.std_num,"
				+ " ibps_file_attachment.FILE_PATH_," + " t_crs_tch.clazz," + " ibps_party_entity.NAME_" + " FROM"
				+ " t_crs_tch," + " t_course," + " t_crs_job," + " t_crs_std," + " t_job_std,"
				+ " ibps_file_attachment," + " ibps_party_entity" + " WHERE" + "	t_crs_tch.tch_num ='" + num + "'"
				+ " AND t_crs_tch.crs_num = t_course.num" + " AND t_crs_job.crs_tch_id = t_crs_tch.id_crs_tch"
				+ " AND t_crs_std.crs_tch_id = t_crs_tch.id_crs_tch" + " AND t_job_std.jobID = t_crs_job.id_"
				+ " AND t_job_std.std_num = t_crs_std.std_num" + " AND t_job_std.file_id_ = ibps_file_attachment.ID_"
				+ " AND concat('heu', t_job_std.std_num) = ibps_party_entity.PARTY_ALIAS_";
		Map<String, String> res = new HashMap();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = dataSource.getConnection();
			Statement s = con.createStatement();
			ResultSet r = s.executeQuery(sql);
			while (r.next()) {
				res.put(r.getString(1), r.getString(2));
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} catch (Exception e) {
			e.getStackTrace();
		} finally {
			con.close();
		}

		/*
		 * for(CrsTchPo ctp:ctps){ List<CrsJobPo> cjps =
		 * crsJobRepository.findByCol("crs_tch_id", ctp.getId()); List<CrsStdPo> csps =
		 * crsStdRepository.findByCol("crs_tch_id", ctp.getId()); Map std = new
		 * HashMap(); for(CrsStdPo csp : csps){ Map res = new HashMap(); for(CrsJobPo
		 * cjp:cjps){ Map map = new HashMap(); map.put( "stdNum" , csp.getStdNum() );
		 * map.put( "jobId" , cjp.getId() ); JobStdPo
		 * jsp=jobStdRepository.getByCol("jobId_Me", map);
		 * if(!StringUtil.isEmpty(jsp.getFile_id_())){ AttachmentPo ap =
		 * attachmentRepository.get(jsp.getFile_id_()); String filePath =
		 * ap.getFilePath(); String fileName = ap.getFileName(); res.put(cjp.getTitle(),
		 * filePath +"@split@"+ fileName); }
		 * 
		 * } std.put(csp.getStdNum(), res); }
		 * dir.put(ctp.getCrsName()+'-'+ctp.getClazz(), std); }
		 */

	}

	@RequestMapping("editMarks")
	@ResponseBody
	public List<String> editMarks(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		float power = RequestUtil.getFloat(request, "power");
		QueryFilter queryFilter = getQuerFilter(request);
		List<String> msg=new java.util.LinkedList<>();
		List<CrsJobPo> jobs = crsJobRepository.findByIds(Arrays.asList(ids));
		for (CrsJobPo job : jobs) {
			queryFilter.addFilter("jobID",job.getId() , QueryOP.EQUAL);
			queryFilter.addFilter("status",2,QueryOP.EQUAL);
			List<JobStdPo> list = jobStdRepository.query(queryFilter);
			if(list.size()!=0) {
				msg.add(job.getTitle());
				continue;
			}else {
				job.setScorePower(power);
				crsJobRepository.newInstance(job).update();
			}
		}
		return msg;
	}
	
	@RequestMapping("getEdits")
	public @ResponseBody List<CrsJobPo> getEdits (HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		List<String> params = Arrays.asList(ids);
		 List<CrsJobPo> pos = crsJobRepository.findByIds(params);
		return pos;
	}
	

}
