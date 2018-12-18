
package com.lc.ibps.patrolp.data.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;
import com.utils.DateUtil;
import com.utils.FileUtil;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.SchedulePo;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;
import com.lc.ibps.patrols.data.domain.ClassxxInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONArray;
//import net.minidev.json.JSONArray;
import net.sf.json.JSONObject;

import com.utils.Constants;


/**
 * 班级信息 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/data/classxxInfo/")
public class ClassxxInfoController extends GenericController implements Constants{
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
		JSONArray teaClassJson =new JSONArray();
		String school = getSchoolName();
		String classxxString = "";
		String classxx1 = "";
		String classxxInt = "";
		if (! dataInfo.getTeaClassDict().containsKey(school)) {
			List<ClassxxInfoPo> classxxs = classxxInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			for (ClassxxInfoPo classxx : classxxs) {
				classxxString = classxx.getClassxx();
				classxx1 = classxxString.split("班")[0].split("年")[1];
				classxxInt = "1" + classxx1;
				if (isNumeric(classxxInt) ) {
					teaClassJson.add( JSONObject.fromObject("{\"id\":\"" + classxx.getId() + "\",\"text\":\"" + classxxString + "\"}") );
				}
			}
			dataInfo.getTeaClassDict().put(school,teaClassJson);
		}

		
		JSONArray teaTchJson =new JSONArray();
		if (! dataInfo.getTeaTchDict().containsKey(school)) {
			List<TchInfoPo> tchs = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			for (TchInfoPo tchInfoPo : tchs) {
				teaTchJson.add( JSONObject.fromObject("{\"id\":\"" + tchInfoPo.getId() + "\",\"text\":\"" + tchInfoPo.getTchName() + "\"}") );

			}
			dataInfo.getTeaTchDict().put(school,teaTchJson);
		}
		
		JSONArray masterJson = new JSONArray();
		if(!dataInfo.getMasterDict().containsKey(school)) {
			List<ClassxxInfoPo> classxxs = classxxInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			List<String> masterList = new ArrayList<>();
			for (ClassxxInfoPo classxx : classxxs) {
				masterList.add(classxx.getClassMaster());
			}
			Set<String> masterSet = new HashSet<>(masterList);
			for (String string : masterSet) {
				masterJson.add( JSONObject.fromObject("{\"id\":\"" + string + "\",\"text\":\"" + string + "\"}") );

			}

			dataInfo.getMasterDict().put(school, masterJson);
		}
		
		JSONArray placeJson = new JSONArray();
		if(!dataInfo.getPlaceDict().containsKey(school)) {
			List<ClassxxInfoPo> classxxs = classxxInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			List<String> placeList = new ArrayList<>();
			for (ClassxxInfoPo classxx : classxxs) {
				placeList.add(classxx.getPlace());
			}
			Set<String> placeSet = new HashSet<>(placeList);
			for (String string : placeSet) {
				placeJson.add( JSONObject.fromObject("{\"id\":\"" + string + "\",\"text\":\"" + string + "\"}") );

			}

			dataInfo.getPlaceDict().put(school, placeJson);
		}

	}
	
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
		makeDataInfo(dataInfo);
		JSONArray dayJson = new JSONArray();
		return getAutoView().addObject("classxx",dataInfo.getTeaClassDict().get(school)).addObject("classMaster",dataInfo.getMasterDict().get(school))
				.addObject("place", dataInfo.getPlaceDict().get(school));
				
	}
	
	/**
	 * 【班级信息】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		
		String classxx = RequestUtil.getString(request, "Q^ID_^SL");
		String classMaster = RequestUtil.getString(request, "Q^CLASS_MASTER_^SL");
		String place = RequestUtil.getString(request, "Q^PLACE_^SL");
		
		if (classxx.equals("")) 
			classxx = null;
		if (classMaster.isEmpty() || classMaster.equals("")) 
			classMaster = null;
		if (place.isEmpty() || place.equals("")) 
			place = null;
		String schoolName = getSchoolName();
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("SCHOOL_", schoolName, QueryOP.EQUAL);

		PageList<ClassxxInfoPo>  classxxInfoPos = (PageList<ClassxxInfoPo>)classxxInfoRepository.query(queryFilter);


		return new PageJson(classxxInfoPos);
	}
	

	private static boolean isNumeric(String  str){
	    Pattern pattern = Pattern.compile("[0-9]*");
	    return pattern.matcher(str).matches();   
	}
	
	/**
	 * 编辑【班级信息】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	String oldMaster = "";
	String oldPalce = "";
	int editFlag = 0; //0:添加 1：编辑
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		ClassxxInfoPo classxxInfo=new ClassxxInfoPo();
		String master =  "\'请选择\'";
		if(StringUtil.isNotEmpty(id)){
			//编辑班级
			classxxInfo=classxxInfoRepository.get(id);
			master = "\'"  + classxxInfo.getClassMaster() + "\'" ;
			oldMaster = classxxInfo.getClassMaster();
			oldPalce = classxxInfo.getPlace();
			editFlag = 1;
		}
		else {
			//添加班级
			String schoolName = getSchoolName();
			classxxInfo.setSchool(schoolName);
			editFlag = 0;
		}
		
		DataInfo dataInfo = DataInfo.getInstance();
		makeDataInfo(dataInfo);
		String school = getSchoolName();
		System.out.println(dataInfo.getTeaTchDict().get(school));
		return getAutoView().addObject("classxxInfo", classxxInfo).addObject("returnUrl", preUrl).addObject("tch",dataInfo.getTeaTchDict().get(school)).addObject("master",master);
	}
	
	/**
	 * 编辑【班级信息】信息页面
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
		ClassxxInfoPo classxxInfo=null;
		if(StringUtil.isNotEmpty(id)){
			classxxInfo=classxxInfoRepository.get(id);
		}
		return getAutoView().addObject("classxxInfo", classxxInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【班级信息】明细页面
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
		ClassxxInfoPo classxxInfo=null;
		if(StringUtil.isNotEmpty(id)){
			classxxInfo=classxxInfoRepository.get(id);
		}
		return getAutoView().addObject("classxxInfo", classxxInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【班级信息】信息
	 *
	 * @param request
	 * @param response
	 * @param  classxxInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String school = getSchoolName();
		ResultMessage message=null;
		try {
			ClassxxInfoPo classxxInfoPo = getFromRequest(request);
			//phone.matches("1[358][0-9]{9,9}") 校验
			String claxxString = classxxInfoPo.getClassxx();
			if (!claxxString.matches("[一|二|三|四|五|六|七|八|九|十|十一|十二]年[0-9]{1,4}班") ) {
				message=new ResultMessage(ResultMessage.FAIL, "班级格式有误，正确格式：八年7班");
				writeResultMessage(response.getWriter(), message);
				return;
			}
			DataInfo dataInfo = DataInfo.getInstance();

			String schoolName = getSchoolName();
			if(classxxInfoPo.getId().isEmpty() || classxxInfoPo.getId() == null) {
				//表示添加 ----> 查看班级是否存在
				for (int i = 0; i < dataInfo.getTeaClassDict().get(school).size(); i++) {
					JSONObject aString = dataInfo.getTeaClassDict().get(school).getJSONObject(i);
					if (dataInfo.getTeaClassDict().get(school).getJSONObject(i).containsValue(classxxInfoPo.getClassxx())) {
						message=new ResultMessage(ResultMessage.FAIL, "班级已存在,不能添加,");
						writeResultMessage(response.getWriter(), message);
						return ;
					}
				}
			}

			
			
			String master = "";
			if (!classxxInfoPo.getClassMaster().isEmpty()) {
				master = tchInfoRepository.get(classxxInfoPo.getClassMaster()).getTchName();
				classxxInfoPo.setClassMaster(master);

			}

			//构造领域对象和保存数据
			ClassxxInfo classxxInfo =classxxInfoRepository.newInstance(classxxInfoPo);
			classxxInfo.save();

			
			if (editFlag == 1) {
				//如果是编辑班级
				JSONObject oldMasterJsonObject = JSONObject.fromObject("{\"id\":\"" + oldMaster + "\",\"text\":\"" + oldMaster + "\"}");
				JSONObject oldPlaceJsonObject = JSONObject.fromObject("{\"id\":\"" + oldPalce + "\",\"text\":\"" + oldPalce + "\"}");
				dataInfo.getMasterDict().get(school).remove(oldMasterJsonObject);
				dataInfo.getPlaceDict().get(school).remove(oldPlaceJsonObject);
			}
			else {
				//添加班级----->得到刚刚保存的班级的id
				String classId = classxxInfoRepository.exGetBy(null, null, ExMap.newInstance().add("school_ =", school).add("classxx_ =", classxxInfoPo.getClassxx()).asJava(), null).getId();
				if (dataInfo.getTeaClassDict().containsKey(school)) {
					JSONObject classJsonObject = JSONObject.fromObject("{\"id\":\"" + classId + "\",\"text\":\"" + classxxInfoPo.getClassxx() + "\"}");
					dataInfo.getTeaClassDict().get(school).add(classJsonObject);
				}
				else {
					makeDataInfo(dataInfo);
				}
			}
			
			if (!master.isEmpty()) {
				if (dataInfo.getMasterDict().containsKey(school)) {
					JSONObject masterJsonObject = JSONObject.fromObject("{\"id\":\"" + master + "\",\"text\":\"" + master + "\"}");
					net.sf.json.JSONArray jsonArray = dataInfo.getMasterDict().get(school);
					jsonArray.add(masterJsonObject);
				}
				else {
					makeDataInfo(dataInfo);
				}

			}
	

			if (!classxxInfoPo.getPlace().isEmpty()|| classxxInfoPo.getPlace() != null) {
				if (dataInfo.getPlaceDict().containsKey(school)) {
					JSONObject placeJsonObject = JSONObject.fromObject("{\"id\":\"" + classxxInfoPo.getPlace() + "\",\"text\":\"" + classxxInfoPo.getPlace() + "\"}");
					dataInfo.getPlaceDict().get(school).add(placeJsonObject);
				}
				else {
					makeDataInfo(dataInfo);
				}
			}
			
			message=new ResultMessage(ResultMessage.SUCCESS, "保存班级信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "请联系管理员,"+e.getMessage());
			logger.error("对班级信息操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ClassxxInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ClassxxInfoPo classxxInfoPo = getClassxxInfoPo(jsonObj);

		return classxxInfoPo;
	}
	
	/** 
	 * 获取班级信息数据
	 *
	 * @param jsonObj
	 */
	private ClassxxInfoPo getClassxxInfoPo(JSONObject jsonObj){
		ClassxxInfoPo classxxInfoPo = (ClassxxInfoPo) JsonUtil.getDTO(jsonObj.toString(), ClassxxInfoPo.class);
		return classxxInfoPo;
	}
	
	
	/**
	 *  批量删除【班级信息】记录
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
			JSONObject classJsonObject = new JSONObject();
			for (String id : ids) {
//				String className = classxxInfoRepository.get(id).getClassxx();
				classJsonObject = JSONObject.fromObject("{\"id\":\"" + id + "\",\"text\":\"" + classxxInfoRepository.get(id).getClassxx() + "\"}");
				dataInfo.getTeaClassDict().get(school).remove(classJsonObject);
				if (!classxxInfoRepository.get(id).getClassMaster().isEmpty()) {
					if (dataInfo.getMasterDict().containsKey(school)) {
						JSONObject masterJsonObject = JSONObject.fromObject("{\"id\":\"" + classxxInfoRepository.get(id).getClassMaster() + "\",\"text\":\"" + classxxInfoRepository.get(id).getClassMaster() + "\"}");
						dataInfo.getMasterDict().get(school).remove(masterJsonObject);
					}
				}
			}
			//构造领域对象和保存数据
			ClassxxInfo classxxInfo =classxxInfoRepository.newInstance();
			classxxInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除班级信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除班级信息失败，" + e.getMessage());
			logger.error("删除班级信息失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("lookclass")
	public ModelAndView lookclass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String schoolName = getSchoolName();
		//得到班级id 和 正在使用的课表的id
		String classId=RequestUtil.getString(request, "id");
		String classxx = classxxInfoRepository.get(classId).getClassxx();
		String fileName =  classxx.split("年")[0] + "年级.xls" ;
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", schoolName).add("name_ =", fileName).add("state_ =", "使用").asJava(), null);
		List<String> usefulSchduleIds = new ArrayList<String>();
		for(ScheduleInfoPo e: scheduleInfoPos)
			usefulSchduleIds.add(e.getId());

		ClassxxInfoPo classInfoPo = classxxInfoRepository.get(classId);
		String className = classInfoPo.getClassxx();
		return getAutoView().addObject("id", classId).addObject("className", className).addObject("usefulSchduleIds",usefulSchduleIds);
	}
	
	@RequestMapping("classSchedule")
	public @ResponseBody List<SchedulePo> classSchedule(HttpServletRequest request,HttpServletResponse response) throws Exception{

		//得到班级id 和 正在使用的课表的id
		String classId = RequestUtil.getString(request, "id");    
		String usefulSchduleIds =RequestUtil.getString(request, "usefulSchduleIds");
		String usefulSchduleIdStr ="(" + usefulSchduleIds.substring(1, usefulSchduleIds.length()-1) + ")" ;
		
		//得到班级课表
		List<TeachInfoPo> teachInfoPos =  teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("classxx_id_ =", classId).add("schedule_id_ in" + usefulSchduleIdStr, "").asJava(), null);
		String[][] schedule = new String[5][8];
		String day = "";
		String section = "";
		int flag = 0;
		//解析数据
		for(TeachInfoPo e: teachInfoPos){
			flag = 0;
			day = e.getDay();
			section = e.getSection();
			if (schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ]=="" || schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ]==null) {
				schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] = tchInfoRepository.get(e.getTchId()).getSubject();
			}
			else {
				if (! schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ].equals(tchInfoRepository.get(e.getTchId()).getSubject())) {
					for (String string : schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ].split(" ")) {
						if (tchInfoRepository.get(e.getTchId()).getSubject().equals(string)) {
							flag = 1;
							break;
						}
					}
					if (flag == 0) {
						schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] += " " + tchInfoRepository.get(e.getTchId()).getSubject();
					}
				}
			}
		}		
		//打包数据
		List<SchedulePo> schedulePos = new ArrayList<SchedulePo>();
		for(int j = 0; j < 8; ++j){
			SchedulePo schedulePo = new SchedulePo(schedule[0][j], schedule[1][j], schedule[2][j], schedule[3][j], schedule[4][j]);
			schedulePos.add(schedulePo);
			
		}	
		//返回数据
		return schedulePos;
	}
	
	@RequestMapping("exportSchedule")
	public void exportSchedule(HttpServletRequest request,HttpServletResponse response) throws Exception{

		String schoolName = getSchoolName();
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath  );
		//得到班级id 和 正在使用的课表的id
		String[] classIds = RequestUtil.getString(request, "id").split(","); 
		String className = "";
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("state_ =", "使用").add("school_ =", schoolName).asJava(), null);
		StringBuilder usefulSchduleIds = new StringBuilder();
		for(ScheduleInfoPo e: scheduleInfoPos){
			usefulSchduleIds.append(e.getId());
			usefulSchduleIds.append(",");
		}
		String usefulSchduleIdStr ="(" +usefulSchduleIds.substring(0, usefulSchduleIds.length() -1)  +   ")" ;
		for(String classId : classIds){	
			className =  classxxInfoRepository.get(classId).getClassxx();
			
			//得到班级课表
			List<TeachInfoPo> teachInfoPos =  teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("classxx_id_ =", classId).add("schedule_id_ in" + usefulSchduleIdStr, "").asJava(), null);
			String[][] schedule = new String[5][8];
			String day = "";
			String section = "";
			//解析数据
			for(TeachInfoPo e: teachInfoPos){
				day = e.getDay();
				section = e.getSection();
				schedule[Integer.valueOf(day) - 1 ][Integer.valueOf(section) - 1 ] = tchInfoRepository.get(e.getTchId()).getSubject();
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
			String fileName = className+"_课程表.xls";
			int i = 1;
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
			String file = filePath+ className + "_课程表.xls";
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
