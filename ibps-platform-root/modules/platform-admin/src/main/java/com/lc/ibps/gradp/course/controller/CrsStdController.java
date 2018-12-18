
package com.lc.ibps.gradp.course.controller;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


//import com.utils.SDateUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.Collections;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.grads.course.domain.CrsStd;
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
import com.utils.CollectionUtil;
import com.utils.Constants;
import com.utils.DateUtil;


import net.sf.json.JSONObject;

/**
 * 学生课程 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/crsStd/")
public class CrsStdController extends GenericController implements Constants {
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CourseRepository courseRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;

	/**
	 * 【学生课程】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String sql = queryFilter.getFieldLogic().getSql();
		String stdNum = ContextUtil.getCurrentUser().getAccount();
		String tip = "<span class=\"tip\">●</span>";
		if (!stdNum.contains("admin"))
			// 如果不是管理员则只把学生本人的课程筛选出来
			queryFilter.addFilter("std_num", stdNum, QueryOP.EQUAL);
		if (!sql.contains("TERM"))
			queryFilter.addFilter("term", DateUtil.getCurTerm(), QueryOP.EQUAL);
		PageList<CrsStdPo> crsStdList = (PageList<CrsStdPo>) crsStdRepository.query(queryFilter);
		PageList<CrsStdPo> crsStdListRes = new PageList();
		crsStdListRes.setPageResult(crsStdList.getPageResult());

		// 找到相应教师姓名
		for (CrsStdPo csp : crsStdList) {

			// 导入的时候excel中可能存在 教师工号：062000xxxx,062000xxxx,xxxxxxx 教师姓名：xxx,xx,xx的格式
			String tchNums[] = csp.getTchNum().split(",");
			String tchNames[] = new String[tchNums.length];
			int i = 0;
			for (String tchNum : tchNums)
				tchNames[i++] = partyEntityRepository.getByAliasPartyType(tchNum, "employee").getName();
			csp.setTchName(StringUtils.join(tchNames, ','));

			String crsTchId = csp.getCrsTchId();
			Map args = new HashMap<>();
			args.put("t_crs_job.crs_tch_id =", crsTchId);
			args.put("t_job_std.std_num =", stdNum);
			List<JobStdPo> jsps = jobStdRepository.findByCol(args);

			// 如果该课程的作业中有现在可以提交的，并且学生未提交，则添加提示
			for (JobStdPo jsp : jsps) {
				String[] ssTime = jsp.getStartStopTime().split("/");
				if (DateUtil.currentCompareByRange(ssTime[0], ssTime[1]) == DateUtil.BETWEEN
						&& jsp.getStatus() == JobStdPo.NOTVIEWED) {
					csp.setCrsName(csp.getCrsName() + "&nbsp;" + tip);
					break;
				}
			}
			crsStdListRes.add(csp);
		}

		// 将列表中的带提示的课程排在前面
		java.util.Collections.sort(crsStdListRes, new Comparator<CrsStdPo>() {
			String tip = "<span class=\"tip\">●</span>";

			@Override
			public int compare(CrsStdPo o1, CrsStdPo o2) {
				int b1 = o1.getCrsName().contains(tip) ? 1 : 0, b2 = o2.getCrsName().contains(tip) ? 1 : 0;
				return b2 - b1;
			}
		});

		return new PageJson(crsStdListRes);
	}

	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		boolean admin = RequestUtil.getBoolean(request, "admin");
		return getAutoView().addObject("admin", admin).addObject("termList", SDateUtil.getTermList())
				.addObject("curTerm", DateUtil.getCurTerm());
	}

	/**
	 * 编辑【学生课程】信息页面
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
		CrsStdPo crsStd = null;
		if (StringUtil.isNotEmpty(id)) {
			crsStd = crsStdRepository.get(id);
		}
		return getAutoView().addObject("crsStd", crsStd).addObject("returnUrl", preUrl);
	}

	/**
	 * 编辑【学生课程】信息页面
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
		CrsStdPo crsStd = null;
		if (StringUtil.isNotEmpty(id)) {
			crsStd = crsStdRepository.get(id);
		}
		return getAutoView().addObject("crsStd", crsStd).addObject("returnUrl", preUrl);
	}

	/**
	 * 【学生课程】明细页面
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
	 * 保存【学生课程】信息
	 *
	 * @param request
	 * @param response
	 //* @param crsStd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			CrsStdPo crsStdPo = getFromRequest(request);
			// 构造领域对象和保存数据
			CrsStd crsStd = crsStdRepository.newInstance(crsStdPo);
			crsStd.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存学生课程成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对学生课程操作失败," + e.getMessage());
			logger.error("对学生课程操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CrsStdPo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		CrsStdPo crsStdPo = getCrsStdPo(jsonObj);

		return crsStdPo;
	}

	/**
	 * 获取学生课程数据
	 *
	 * @param jsonObj
	 */
	private CrsStdPo getCrsStdPo(JSONObject jsonObj) {
		CrsStdPo crsStdPo = (CrsStdPo) JsonUtil.getDTO(jsonObj.toString(), CrsStdPo.class);
		return crsStdPo;
	}

	/**
	 * 批量删除【学生课程】记录
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
			CrsStd crsStd = crsStdRepository.newInstance();
			crsStd.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除学生课程成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除学生课程失败，" + e.getMessage());
			logger.error("删除学生课程失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("getChange")
	public void getChange(HttpServletRequest request, HttpServletResponse response) {
		String stdNum = RequestUtil.getString(request, "stdNum");
		Map arg = new HashMap<>();
		arg.put("std_num =", stdNum);
		CrsStdPo csp = crsStdRepository.getByCol(arg);

		try {
			PrintWriter out = response.getWriter();
			JSONObject jo = new JSONObject();
			jo.put("score", csp.getScore());
			out.print(jo);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("getCrsScoreError")
	public void getCrsScoreError(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String crsTchId = RequestUtil.getString(request, "crsTchId");
		List<String> errMsg = new LinkedList<String>();
		int count = 0;
		int total = 0;
		Map arg=new HashMap<>();
		arg.put("crs_tch_id=", crsTchId);
		List<CrsStdPo> findAll = crsStdRepository.findByCol(arg);
		for (CrsStdPo crsStdPo : findAll) {
			String stdNum = crsStdPo.getStdNum();
			float score = crsStdPo.getScore();
			float newscore = 0;
			Map args = new HashMap<>();
			args.put("crs_tch_id =", crsTchId);
			List<CrsJobPo> jobs = crsJobRepository.findByCol(args);
			for (CrsJobPo job : jobs) {
				Map args2 = new HashMap<>();
				args2.put("jobID=", job.getId());
				args2.put("std_num=", stdNum);
				JobStdPo student = jobStdRepository.getByCol(args2);
				if (student==null) {
					continue;
				}
				newscore += (job.getScorePower() * 0.01 * student.getScore());
			}
			total++;
			if (score - newscore > 0.1 || newscore - score > 0.1) {
				errMsg.add("发生错误学号："+stdNum +" 现有成绩" + score + " 应有成绩：" + newscore);
				count++;
			}
		}
			CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
			String whereSql = "PARTY_ALIAS_=" + crsTchPo.getTchNum();
			DefaultQueryFilter filter = new DefaultQueryFilter();
			filter.addParamsFilter("whereSql", whereSql);
			List<PartyEntityPo> list = partyEntityRepository.query(filter);
			Map args3 = new HashMap<>();
			args3.put("num=", crsTchPo.getCrsNum());
			CoursePo coursePo = courseRepository.getByCol(args3);
			String resmsg = "课程编号:" + coursePo.getNum() + " 课程名:" + coursePo.getName() + "课程教师名:"
					+ list.get(0).getName();
			String fileName="D:\\"+coursePo.getNum()+"_"+coursePo.getName()+"_"+list.get(0).getName()+".txt";
			File f=new File(fileName);
			if(!f.exists())f.createNewFile();
			FileWriter file=null;
			try {
				 file=new FileWriter(fileName);
				 file.write(resmsg+"\r\n");
				 file.write("共比较:"+total+"\r\n"); 
				 file.write("错误数:"+count+"\r\n");
				 for (String msg : errMsg) {
					 file.write(msg+"\r\n");
				}
				 file.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
	}
	
	
	
	
	
	/**
	 * 验证所有成绩正确性，仅为必要时测试准备 localhost/gradp/course/crsStd/getError.htm
	 * 请在特殊情况下开放,无特殊情况不要解除
	 */
	/*@RequestMapping("getAllError")
	public void getAllError(HttpServletRequest request) {
		Map<String, List<String>> errMsg = new HashMap<>();
		int count = 0;
		int total = 0;
		List<CrsStdPo> findAll = crsStdRepository.findAll();
		for (CrsStdPo crsStdPo : findAll) {
			String crsTchId = crsStdPo.getCrsTchId();
			String stdNum = crsStdPo.getStdNum();
			float score = crsStdPo.getScore();
			float newscore = 0;
			Map args = new HashMap<>();
			CrsTchPo crsTchPo = crsTchRepository.get(crsTchId);
			if(crsTchPo.getId()==crsTchPo.getUniManage()) args.put("crs_tch_id =", crsTchId);
			else args.put("crs_tch_id =", crsTchPo.getUniManage());
			List<CrsJobPo> jobs = crsJobRepository.findByCol(args);
			for (CrsJobPo job : jobs) {
				Map args2 = new HashMap<>();
				args2.put("jobID=", job.getId());
				args2.put("std_num=", stdNum);
				List<JobStdPo> ss = jobStdRepository.findByCol(args2);
				if (ss.size() == 0) {
					continue;
				}
				JobStdPo student = ss.get(0);
				newscore += (job.getScorePower() * 0.01 * student.getScore());
			}
			total++;
			if (score - newscore > 0.1 || newscore - score > 0.1) {
				if (errMsg.get(crsTchId) == null) {
					List<String> nums = new LinkedList<String>();
					nums.add(stdNum + " " + score + " " + newscore);
					errMsg.put(crsTchId, nums);
				} else {
					List<String> list = errMsg.get(crsTchId);
					list.add(stdNum + " " + score + " " + newscore);
					errMsg.put(crsTchId, list);
				}
				count++;
			}
		}
		Set<String> keySet = errMsg.keySet();
		List<String> res = new LinkedList<>();
		for (String string : keySet) {
			CrsTchPo crsTchPo = crsTchRepository.get(string);
			String whereSql = "PARTY_ALIAS_=" + crsTchPo.getTchNum();
			DefaultQueryFilter filter = new DefaultQueryFilter();
			filter.addParamsFilter("whereSql", whereSql);
			List<PartyEntityPo> list = partyEntityRepository.query(filter);
			Map args3 = new HashMap<>();
			args3.put("num=", crsTchPo.getCrsNum());
			CoursePo coursePo = courseRepository.getByCol(args3);
			String resmsg = "====" + coursePo.getNum() + "=====" + coursePo.getName() + "=========="
					+ list.get(0).getName() + "======";
			List<String> students = errMsg.get(string);
			for (String snum : students) {
				resmsg += " " + snum + " ";
			}
			res.add(resmsg);
		}
		for (String string : res) {
			System.out.println(string);
		}
		System.out.println("=================TOTAL=====================" + total);
		System.out.println("=================ERROR=====================" + count);
	}*/
	
	
	
	

}
