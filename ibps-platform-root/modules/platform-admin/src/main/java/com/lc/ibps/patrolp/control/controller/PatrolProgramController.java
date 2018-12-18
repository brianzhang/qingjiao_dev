
package com.lc.ibps.patrolp.control.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrolp.data.controller.DataInfo;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;
import com.lc.ibps.patrols.control.repository.PatrolProgramRepository;
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.PatrolDetailRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;


import ex.scala.utils4j.ExMap;
import net.sf.json.JSONObject;


/**
 * 巡课方案 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/control/patrolProgram/")
public class PatrolProgramController extends GenericController{
//	@Resource
//	private PatrolProgramRepository patrolProgramRepository;
//	@Resource
//	private ScheduleInfoRepository scheduleInfoRepository;
//	@Resource
//	private TchInfoRepository tchInfoRepository;
//	@Resource
//	private ClassxxInfoRepository classxxInfoRepository;
//	@Resource
//	private TeachInfoRepository teachInfoRepository;
//	@Resource
//	private PatrolDetailRepository patrolDetailRepository;
//	@Resource
//	private CurrentContext currentContext;	
//	@Resource 
//	private PartyOrgRepository partyorgRepository;
//	@Resource
//	private PartyEmployeeRepository partyEmployeeRepository;
//	
//	
//	private String getShoolName() {
//		String userId = currentContext.getCurrentUserId();
//		String orgId = partyEmployeeRepository.get(userId).getGroupID();
//		if (orgId.isEmpty()) {
//			//不会
//			ResultMessage message=new ResultMessage(ResultMessage.FAIL, "该学校还未录入系统，请联系管理人员");
//			return null;
//		}
//		String usefulSchoolName = partyorgRepository.get(orgId).getName();
//		return usefulSchoolName;
//	}
//	
//	/**
//	 * 【巡课方案】列表(分页条件查询)数据
//	 *
//	 * @param request
//	 * @param reponse
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping("listJson")
//	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		QueryFilter queryFilter=getQuerFilter(request);
//		PageList<PatrolProgramPo> patrolProgramList=(PageList<PatrolProgramPo>)patrolProgramRepository.query(queryFilter);
//		return new PageJson(patrolProgramList);
//	}
//	/** 
//	 * 保存【巡课方案】信息
//	 *
//	 * @param request
//	 * @param response
//	 * @param  patrolProgram
//	 * @throws Exception
//	 */
//	@RequestMapping("save")
//	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		
//		PrintWriter wt = response.getWriter();
//		String cwd = getCurrentWeekDate();
//		String uid = ContextUtil.getCurrentUserId();
//		PatrolProgramPo ppp = patrolProgramRepository.exGetBy(null, null, ExMap.newInstance().add("patroller_ =", uid).add("start_time_ =", cwd).asJava() , null);
//		if( ppp != null ){
//			return;
//		}
//		
//		patrolProgramRepository.newInstance( new PatrolProgramPo(uid, cwd)).save();
//		
//		//TODO 巡课记录
//	}
//	private String getCurrentWeekDate() {
//		String time = DateUtil.getCurrentTime();
//		char weekDay = com.utils.DateUtil.dayForWeek(time);
//		
//		return "星期"+weekDay +" 第n节";
//	}
//	@RequestMapping("getInf")
//	public void getInf(HttpServletRequest request,HttpServletResponse response) throws IOException{
//		String className = RequestUtil.getString(request, "name"),
//				  curTime = getCurrentWeekDate(),
//				  tch = "",
//				  pgId = RequestUtil.getString(request, "id");
//		
//		// 非空则表示巡课历史，通过巡课id查找课程节次
//		if( StringUtil.isNotEmpty(pgId)){
//			curTime = patrolProgramRepository.get(pgId).getStartTime();
//		}else{
//			pgId = patrolProgramRepository.exGetBy(null, null, ExMap.newInstance().add("patroller_ =", ContextUtil.getCurrentUserId()).add("start_time_ = ", curTime).asJava(), null).getId();
//		}
//
//		
//		// 通过班级名称、当前节次获取授课教师
//		//tch = xxxx.xxx( className , curTime );
////		String classxxId = classxxInfoRepository.exGetBy(null, null,ExMap.newInstance().add("classxx_ =", "六年1班").asJava() , null).getId();
//		
//		String gradeAndclass  = "七年1班";
//		String dayAndSection = "星期二 第7节";
//		tch = this.getTchByDetail(className, dayAndSection);
//		if (tch.equals("none")) {
//			return;
//		}
//		
////		String gradeAndclass  = "七年1班";
////		String dayAndSection = "星期一 第6节";
////		String tchName = this.getTchByDetail(gradeAndclass, dayAndSection);
//		
////		tch = "教师1";
//		
//		// 通过pgid ， className 获得巡课记录，提取实际教师以及原因、状态
//		PatrolDetailPo patrolDetailPo = patrolDetailRepository.exGetBy(null, null, ExMap.newInstance().add("pg_id_ =", pgId).add("class_name_ =", className).asJava(), null);
//		
//		
//		boolean as = new Random().nextInt(2) == 1;
//		response.getWriter().println(  JSONObject.fromObject( ExMap.newInstance().add("tch", tch).add("curTime", curTime ).add("actTch", as?"教师2":"").add("reason", as?"原因1":"").asJava() ) );
//	}
//	
//	private String getTchByDetail(String gradeAndclass ,String dayAndSection){
//		//解析参数  "七年1班"  "星期五 第1节" ------> class_id_ 
//		
//		//数据校验
//		if (! gradeAndclass.matches("^[一|二|三|四|五|六|七|八|九|十|十一|十二|十三]年[0-9]{1,4}班$")) {
//			return "none";
//		}
//		if (! dayAndSection.matches("^星期[一|二|三|四|五|六|日] 第[1-8]{1,1}节$")) {
//			return "none";
//		}
//		//得到班级id
//		
//		
//		String schoolName = getShoolName();
//		if (schoolName == null) {
//			schoolName = "单位一";
//		}
//		String classxx = gradeAndclass;
//		System.out.println(classxxInfoRepository.toString());
//		String classxxId = classxxInfoRepository.exGetBy(null, null,ExMap.newInstance().add("classxx_ =", classxx).add("school_ =", schoolName).asJava() , null).getId();
//		Map<String, String> chinese2Num =  new HashMap<String, String>();
//		chinese2Num.put("一", "1");
//		chinese2Num.put("二", "2");
//		chinese2Num.put("三", "3");
//		chinese2Num.put("四", "4");
//		chinese2Num.put("五", "5");
//		chinese2Num.put("六", "6");
//		chinese2Num.put("七", "7");
//		chinese2Num.put("八", "8");
//		String chineseDay = dayAndSection.split(" ")[0].split("期")[1];
//		String section = dayAndSection.split("第")[1].split("节")[0];
//		String day = chinese2Num.get(chineseDay);	
//		List<TeachInfoPo> teachInfoPos = teachInfoRepository.exFindBy(null, null,ExMap.newInstance().add("classxx_id_ =", classxxId).add( "day_ =", day).add("section_ =",section).asJava() , null);
//		String tchId = "";
//		if (teachInfoPos.size() == 0) {
//			return "none";
//		}
//		else {
//			tchId = teachInfoPos.get(0).getTchId();
//		}
//		String tchName = tchInfoRepository.get(tchId).getTchName();
//		return tchName;
//	}
	
}
