
package com.lc.ibps.patrolp.data.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.baidu.ueditor.define.State;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;
import com.utils.FileUtil;

import ex.scala.utils4j.*;
import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.SchedulePo;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;
import com.lc.ibps.patrols.data.domain.TchInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * t_tch_inf 控制类
 * 
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/data/tchInfo/")
public class TchInfoController extends GenericController{
	@Resource
	private ScheduleInfoRepository scheduleInfoRepository;
	@Resource
	private TchInfoRepository tchInfoRepository;
	@Resource
	private ClassxxInfoRepository classxxInfoRepository;
	@Resource
	private TeachInfoRepository teachInfoRepository;
	@Resource
	private CurrentContext currentContext;	
	@Resource 
	private PartyOrgRepository partyorgRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	
	
	private String getSchoolName() {
		String userId = currentContext.getCurrentUserId();
		String orgId = partyEmployeeRepository.get(userId).getGroupID();
		if (orgId.isEmpty()) {
			System.out.println("该学校还未录入系统，请联系管理人员");
			return null;
		}		
		String usefulSchoolName = partyorgRepository.get(orgId).getName();
		return usefulSchoolName;
	}
	
	private void makeDataInfo(DataInfo dataInfo) {
		JSONArray teaTchJson =new JSONArray();
		String school = getSchoolName();
//		DataInfo dataInfo = DataInfo.getInstance();
		
		
		if (! dataInfo.getTeaTchDict().containsKey(school)) {
			List<TchInfoPo> tchs = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			for (TchInfoPo tchInfoPo : tchs) {
				teaTchJson.add( JSONObject.fromObject("{\"id\":\"" + tchInfoPo.getId() + "\",\"text\":\"" + tchInfoPo.getTchName() + "\"}") );

			}
			dataInfo.getTeaTchDict().put(school,teaTchJson);
		}
		
		JSONArray subjectJson = new JSONArray();;
		if(!dataInfo.getSubjectDict().containsKey(school)) {
			List<TchInfoPo> tchInfoPos = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			List<String> subjectList = new ArrayList<>();
			for (TchInfoPo tchInfoPo : tchInfoPos) {
				subjectList.add(tchInfoPo.getSubject());
			}
			Set<String> subjectSet = new HashSet<>(subjectList);
			for (String string : subjectSet) {
				subjectJson.add( JSONObject.fromObject("{\"id\":\"" + string + "\",\"text\":\"" + string + "\"}") );

			}

			dataInfo.getSubjectDict().put(school, subjectJson);
		}


	}
	
	private static boolean isNumeric(String  str){
	    Pattern pattern = Pattern.compile("[0-9]*");
	    return pattern.matcher(str).matches();   
	}
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
		makeDataInfo(dataInfo);
		JSONArray dayJson = new JSONArray();
		if(dayJson.isEmpty()) {
			for (int i = 1; i < 6; i++) {
				dayJson.add( JSONObject.fromObject("{\"id\":\"" + String.valueOf(i) + "\",\"text\":\"" + String.valueOf(i) + "\"}") );
			}
		}
		
		JSONArray sectionJson = new JSONArray();
		if(sectionJson.isEmpty()) {
			for (int i = 1; i < 9; i++) {
				sectionJson.add( JSONObject.fromObject("{\"id\":\"" + String.valueOf(i) + "\",\"text\":\"" + String.valueOf(i) + "\"}") );
			}
		}
		return getAutoView().addObject("tchName",dataInfo.getTeaTchDict().get(school)).addObject("subject",dataInfo.getSubjectDict().get(school));
				
	}
	
	/**
	 * 【t_tch_inf】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tchName = RequestUtil.getString(request, "Q^ID_^SL");
		String subject = RequestUtil.getString(request, "Q^SUBJECT_^SL");
		String schoolName =getSchoolName();

		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("SCHOOL_", schoolName, QueryOP.EQUAL);
		PageList<TchInfoPo> tchInfoPoList = null;
		tchInfoPoList=(PageList<TchInfoPo>)tchInfoRepository.query(queryFilter);
		return new PageJson(tchInfoPoList);
	}
	

	/**
	 * 编辑【t_tch_inf】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TchInfoPo tchInfo=new TchInfoPo();
		if(StringUtil.isNotEmpty(id)){
			tchInfo=tchInfoRepository.get(id);
		}
		else {
			String schoolName = getSchoolName();
			tchInfo.setSchool(schoolName);
			
		}
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
		makeDataInfo(dataInfo);
		return getAutoView().addObject("tchInfo", tchInfo).addObject("returnUrl", preUrl).addObject("subject",dataInfo.getSubjectDict().get(school));
	}
	
	/**
	 * 编辑【t_tch_inf】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TchInfoPo tchInfo=null;
		if(StringUtil.isNotEmpty(id)){
			tchInfo=tchInfoRepository.get(id);
		}
		return getAutoView().addObject("tchInfo", tchInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_tch_inf】明细页面
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
		TchInfoPo tchInfo=null;
		if(StringUtil.isNotEmpty(id)){
			tchInfo=tchInfoRepository.get(id);
		}
		return getAutoView().addObject("tchInfo", tchInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_tch_inf】信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String school = getSchoolName();
		try {
			TchInfoPo tchInfoPo = getFromRequest(request);
			
			//校验
			if (tchInfoPo.getTchName().isEmpty() || tchInfoPo.getTchNum().isEmpty() || tchInfoPo.getSubject().isEmpty()) {
				message=new ResultMessage(ResultMessage.FAIL, "信息不能有空");
				writeResultMessage(response.getWriter(), message);
				return;
			}
			String schoolName = getSchoolName();
			List<TchInfoPo> allTch = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ = ", schoolName).asJava(), null);
			for(TchInfoPo e : allTch){
				if ( (e.getTchNum()).equals(tchInfoPo.getTchNum()) ) {
					message=new ResultMessage(ResultMessage.FAIL, "教师已存在,不能添加,");
					writeResultMessage(response.getWriter(), message);
					return ;
				}
			}
			//构造领域对象和保存数据
			TchInfo tchInfo =tchInfoRepository.newInstance(tchInfoPo);
			tchInfo.save();
			DataInfo dataInfo = DataInfo.getInstance();
//			JSONObject tchJsonObject = JSONObject.fromObject("{\"id\":\"" + tchInfoPo.getTchName() + "\",\"text\":\"" + tchInfoPo.getTchName() + "\"}");
//			dataInfo.getTchDict().get(school).add(tchJsonObject);
			//得到刚刚保存的教师的id
			System.out.print(dataInfo.getTeaTchDict());
			if (dataInfo.getTeaTchDict().containsKey(school)) {
				String tchId = tchInfoRepository.exGetBy(null, null, ExMap.newInstance().add("school_ =", school).add("tch_name_ =", tchInfoPo.getTchName()).add("subject_ =", tchInfoPo.getSubject()).asJava(), null).getId();
				JSONObject tchJsonObject = JSONObject.fromObject("{\"id\":\"" + tchId + "\",\"text\":\"" + tchInfoPo.getTchName() + "\"}");
				dataInfo.getTeaTchDict().get(school).add(tchJsonObject);
			}
			else {
				makeDataInfo(dataInfo);
			}
//			dataInfo.getTeaTchDict().remove(school);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存教师成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "联系管理员,"+e.getMessage());
			logger.error("对t_tch_inf操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TchInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TchInfoPo tchInfoPo = getTchInfoPo(jsonObj);

		return tchInfoPo;
	}
	
	/** 
	 * 获取t_tch_inf数据
	 *
	 * @param jsonObj
	 */
	private TchInfoPo getTchInfoPo(JSONObject jsonObj){
		TchInfoPo tchInfoPo = (TchInfoPo) JsonUtil.getDTO(jsonObj.toString(), TchInfoPo.class);
		return tchInfoPo;
	}
	
	
	/**
	 *  批量删除【t_tch_inf】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String school = getSchoolName();
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//处理字典
			DataInfo dataInfo = DataInfo.getInstance();
			JSONObject tchJsonObject = new JSONObject();
			for (String id : ids) {
				String tchName = tchInfoRepository.get(id).getTchName();
//				dataInfo.getTchDict().get(school).remove(tchName);
				System.out.print(dataInfo.getTeaTchDict());
				boolean isDict = dataInfo.getTeaTchDict().containsKey(school);
				if (!isDict) {
					makeDataInfo(dataInfo);
				}
				tchJsonObject = JSONObject.fromObject("{\"id\":\"" + id + "\",\"text\":\"" + tchInfoRepository.get(id).getTchName() + "\"}");
				dataInfo.getTeaTchDict().get(school).remove(tchJsonObject);
			}
			//构造领域对象和保存数据
			TchInfo tchInfo =tchInfoRepository.newInstance();
			tchInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除教师成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除教师失败，" + e.getMessage());
			logger.error("删除t_tch_inf失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("savetodb")
	public void savetodb(MultipartHttpServletRequest request,HttpServletResponse response) throws Exception{
		MultipartFile file = request.getFile("xlsFile");
		InputStream is = file.getInputStream();	
		String fileName = file.getOriginalFilename();
		String string = XunUtil.trans( is , fileName);
		System.out.println(string);
		String userId = currentContext.getCurrentUserId();
		String orgId = partyEmployeeRepository.get(userId).getGroupID();
		if (orgId.isEmpty()) {
			//不会
			return ;
		}
		
		String schoolName = partyorgRepository.get(orgId).getName();
		
		
		String fileId = "1";
		String tchNum = "";
		String classMaster = "无";
		String place = "无";
		String scheduleId = "";
		final String state = "停用";
		ExList base = ExList.newInstance().union( JSONArray.fromObject( string ).toArray() );
		
		//在写入到数据库之前检测此条数据是否已存在
		
		//保存课表信息
		scheduleInfoRepository.newInstance(new ScheduleInfoPo(fileId, schoolName, fileName ,state)).save();
		
//		List<TchInfoPo> tchInfoPoss = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add(" =", "").asJava(), null);
		List<TchInfoPo> tchInfoPos = tchInfoRepository.findAll();
		List<ClassxxInfoPo> classxxInfoPos = classxxInfoRepository.findAll();
		//保存教师信息  学校名  教师名  教师工号 科目 
		base.map( getInfo(schoolName, tchNum) ).exDistinct().map( toTchInfo(  ) ).map( saveTch( tchInfoRepository, tchInfoPos) );
		System.out.println("_______________________________________");
		
		//保存班级信息 学校名 班级（六年1班） 班主任 地点
		base.map(getClassInfo(schoolName, classMaster, place)).exDistinct().map(toCalssInfo( ) ).map( saveClassInfo( classxxInfoRepository,classxxInfoPos) );
		System.out.println("_______________________________________");
		
		ScheduleInfoPo scheduleInfoPo = scheduleInfoRepository.exGetBy(null, null, ExMap.newInstance().add("file_id_ =", fileId).asJava(), null);
		scheduleId = scheduleInfoPo.getId();
		scheduleInfoPo.setFileId(scheduleId);
		scheduleInfoRepository.newInstance(scheduleInfoPo).update();
		//保存授课信息  课表id 教师id 班级id 周几 节次
		base.map( toTheach(schoolName,scheduleId, tchInfoRepository, classxxInfoRepository) ).map( saveTeachInfo( teachInfoRepository ) );
		
		
		JSONObject jo = new JSONObject();
		jo.put("success", true);
		jo.put("msg", "上传成功！");
		response.getWriter().println(jo);
	}

	private boolean inTchInfoPos(TchInfoPo tchInfoPo, List<TchInfoPo> tchInfoPos) {
		for(TchInfoPo e : tchInfoPos){
			if (e.equlas(tchInfoPo)) {
				return true;
			}
		}
		return false;
	}
	
	private boolean inClassxxInfos(ClassxxInfoPo classxxInfoPo, List<ClassxxInfoPo> classxxInfoPos) {
		for(ClassxxInfoPo e: classxxInfoPos){
			if (e.equlas(classxxInfoPo)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * function site
	 */
	
	private Function getClassInfo(final String schoolName, final String classMaster, final String place) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				JSONObject jo = JSONObject.fromObject( e );
				String year = ( ( String ) jo.get("year") );
				String classxx = year.substring(0, year.length() -1 ) + (String) jo.get("clazz") + "班";   //获取班级
				return ExList.newInstance().append( schoolName ).append( classxx ).append(classMaster).append(place).mkString(",");
			}
		};
	}
	private Function<Object, Object> toCalssInfo( ) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				String[] tcy = ( (String)e ).split(",");
				return new ClassxxInfoPo( tcy[ 0 ] ,tcy[ 1 ], tcy[ 2 ], tcy[ 3 ] );
			}
		};
	}	
	private Function saveClassInfo(final ClassxxInfoRepository classxxInfoRepository, final List<ClassxxInfoPo> classxxInfoPos) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				if (!( inClassxxInfos( (ClassxxInfoPo)e, classxxInfoPos))) {
					classxxInfoRepository.newInstance( ( ClassxxInfoPo ) e).save(); 
				}
				 return null;
			}
		};
	}
	
	private Function saveTeachInfo(final TeachInfoRepository teachInfoRepository) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				teachInfoRepository.newInstance( ( TeachInfoPo ) e ).save();
				return null;
			}
		};
	}
	private Function<Object, Object> toTheach(final String schoolName,final String scheduleId,final TchInfoRepository tchInfoRepository, final ClassxxInfoRepository classxxInfoRepository) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				JSONObject jo = JSONObject.fromObject( e );
				String teacherName = jo.getString("tch");
				//根据教师名 和 学校 名获取教师id    有教师工号后换成教师工号
				String tchId =  tchInfoRepository.exGetBy(null, null, ExMap.newInstance().add("tch_name_ =", teacherName).add("school_ =", schoolName).asJava(), null).getId();
				
				String year = ( ( String ) jo.get("year") );
				String classxx = year.substring(0, year.length() -1 ) + (String) jo.get("clazz") + "班";   //获取班级
				//根据班级 和 学校 获取班级id
				String classxxId = classxxInfoRepository.exGetBy(null, null, ExMap.newInstance().add("classxx_ =", classxx).add("school_ =", schoolName).asJava(), null).getId();
				return new TeachInfoPo(scheduleId, tchId, classxxId, jo.getString("day"), jo.getString("time") );		
			}
		};
	}

	private Function<Object, Object> saveTch(final TchInfoRepository tchInfoRepository,final List<TchInfoPo> tchInfoPos ) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				if (! ( inTchInfoPos((TchInfoPo)e, tchInfoPos) )) {
					tchInfoRepository.newInstance( (TchInfoPo) e ).save();
				}
				return null;
			}
		};
	}
	private Function<Object, Object> toTchInfo( ) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				String[] tcy = ( (String)e ).split(",");
				return new TchInfoPo( tcy[ 0 ] ,tcy[ 1 ] , tcy[ 2 ], tcy[3]);
			}
		};
	}	
	private Function<Object, Object>  getInfo(final String schoolName, final String tchName) {
		return new Function<Object, Object>() {
			@Override public Object run(Object e) {
				JSONObject jo = JSONObject.fromObject( e );
				return ExList.newInstance().append(schoolName).append(jo.get("tch") ).append(tchName ).append( jo.get("crs") ).mkString(",");
			}
		};
	}
	

	@RequestMapping("lookteacher")
	public ModelAndView lookteacher(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String schoolName = getSchoolName();
		String teacherId=RequestUtil.getString(request, "id");
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", schoolName).add("state_ =", "使用").asJava(), null);
		List<String> usefulSchduleIds = new ArrayList<String>();
		for(ScheduleInfoPo e: scheduleInfoPos)
			usefulSchduleIds.add(e.getId());
		
		TchInfoPo tchInfoPo = tchInfoRepository.get(teacherId);
		return getAutoView().addObject("id", teacherId).addObject("name",tchInfoPo.getTchName()).addObject("subject",tchInfoPo.getSubject()).addObject("usefulSchduleIds",usefulSchduleIds);
	}

	@RequestMapping("teacherShedule")
	public @ResponseBody List<SchedulePo> teachersShedule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String teacherId=RequestUtil.getString(request, "id"); //教师id
		String usefulSchduleIds =RequestUtil.getString(request, "usefulSchduleIds");
		String usefulSchduleIdStr ="(" + usefulSchduleIds.substring(1, usefulSchduleIds.length()-1) + ")" ;
//		String teacherId = "384330255478816768";
		if (teacherId == null || teacherId == "") {
			return null;
		}		
		List<TeachInfoPo> teachInfoPos = teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("tch_id_ =", teacherId).add("schedule_id_ in" + usefulSchduleIdStr, "").asJava(), null);
		String[][] schedule = new String[5][8];
		String day = "";
		String section = "";
		String classxx = "";
		//解析数据
		for(TeachInfoPo e: teachInfoPos){
			day = e.getDay();
			section = e.getSection();
//			classxx = classxxInfoRepository.get(e.getClassxxId()).getClassxx().split("年")[1].split("班")[0];	
			classxx = classxxInfoRepository.get(e.getClassxxId()).getClassxx();
			if (schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] != null) {
				schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] += " " + classxx;
			}
			else {
				schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] =  classxx;
			}
			
		}		
		
		//打包数据
		List<SchedulePo> teacherSchedulePos = new ArrayList<SchedulePo>();
		teacherSchedulePos.clear();
		for(int j = 0; j < 8; ++j){
			SchedulePo teacherSchedulePo = new SchedulePo(schedule[0][j], schedule[1][j], schedule[2][j], schedule[3][j], schedule[4][j]);
			teacherSchedulePos.add(teacherSchedulePo);
		}
		return teacherSchedulePos;
		
	}
	
	@RequestMapping("exportSchedule")
	public void exportSchedule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String schoolName = getSchoolName();
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath  );
		
		String[] teacherIds=RequestUtil.getString(request, "id").split(","); ; //教师id
		String teacherName = "";
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("state_ =", "使用").add("school_ =", schoolName).asJava(), null);
		StringBuilder usefulSchduleIds = new StringBuilder();
		for(ScheduleInfoPo e: scheduleInfoPos){
			usefulSchduleIds.append(e.getId());
			usefulSchduleIds.append(",");
		}
		String usefulSchduleIdStr ="(" +usefulSchduleIds.substring(0, usefulSchduleIds.length() -1)  +   ")" ;
		for(String teacherId : teacherIds){	
			teacherName =  tchInfoRepository.get(teacherId).getTchName();
			
			//得到教师课表
			List<TeachInfoPo> teachInfoPos =  teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("tch_id_ =", teacherId).add("schedule_id_ in" + usefulSchduleIdStr, "").asJava(), null);
			String[][] schedule = new String[5][8];
			String day = "";
			String section = "";
			String classxx = "";
			//解析数据
			for(TeachInfoPo e: teachInfoPos){
				day = e.getDay();
				section = e.getSection();
				classxx = classxxInfoRepository.get(e.getClassxxId()).getClassxx();
				if (schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] != null) {
					schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] += " " + classxx;
				}
				else {
					schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] =  classxx;
				}
			}		
			//打包数据
			List<SchedulePo> schedulePos = new ArrayList<SchedulePo>();
			for(int j = 0; j < 8; ++j){
				SchedulePo schedulePo = new SchedulePo(schedule[0][j], schedule[1][j], schedule[2][j], schedule[3][j], schedule[4][j]);
				schedulePos.add(schedulePo);
			}	

			List<Map<String, String>> datas = new ArrayList<Map<String, String>>();
			Map<String,String>data = null;
			//下载导出
			int i = 1;
			String fileName = teacherName+"_课程表.xls";
			for(SchedulePo ctp : schedulePos){
				data = new HashMap();
				data.put("节次", "第" + String.valueOf(i) + "节");
				data.put("周一", ctp.getFirst());
				data.put("周二", ctp.getSecond());
				data.put("周三", ctp.getThird());
				data.put("周四", ctp.getFourth());
				data.put("周五", ctp.getFifth());
				datas.add(data);
				i++;
			}
			List<String> fileNames = new ArrayList<>();
			String[] fieds = { "节次","周一", "周二", "周三", "周四", "周五" };
			String file = filePath+ teacherName + "_课程表.xls";
			fileNames.add(file);
			byte[] fileByte = FileUtil.toExcel(datas, fieds);
			InputStream in = new ByteArrayInputStream(fileByte);
			FileUtil.writeFile(file,	in);
		}
		FileUtil.zip(filePath,false);
		
		FileUtil.downLoadFile(request, response, filePath +".zip", "课表.zip");
		File file = new File(filePath);
		FileUtil.deleteDir(file);
		
	}
}
