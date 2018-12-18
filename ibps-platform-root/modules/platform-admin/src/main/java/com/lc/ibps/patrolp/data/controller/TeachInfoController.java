
package com.lc.ibps.patrolp.data.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.ejb.Init;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.page.Page;
import com.lc.ibps.api.base.query.FieldSort;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.SchedulePo;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;
import com.lc.ibps.patrols.data.domain.ScheduleInfo;
import com.lc.ibps.patrols.data.domain.TeachInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONArray;
//import net.minidev.json.JSONArray;
import net.sf.json.JSONObject;
import scala.reflect.internal.Trees.This;


/**
 * 授课信息 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/data/teachInfo/")
public class TeachInfoController extends GenericController{
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
		
		JSONArray teaClassJson =new JSONArray();
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
		return getAutoView().addObject("tch",dataInfo.getTeaTchDict().get(school)).addObject("classxx", dataInfo.getTeaClassDict().get(school))
				.addObject("day",dayJson).addObject("section",sectionJson);
				
	}
	
	private String getUsefulScheduleId(String schoolName) {
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", schoolName).add("state_ =", "使用").asJava(), null);
		StringBuilder sBuilder =new StringBuilder();
		sBuilder.append("(");
		for (ScheduleInfoPo scheduleInfoPo : scheduleInfoPos) {
			sBuilder.append(scheduleInfoPo.getId());
			sBuilder.append(",");
		}
		String usefulScheduleId = sBuilder.toString().substring(0, sBuilder.toString().length() - 1) + ")";
		return usefulScheduleId;
	}

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
	
	/**
	 * 【授课信息】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);

		String schoolName = getSchoolName();
		
		String usefulScheduleId = getUsefulScheduleId(schoolName);
		String usefulScheduleId2 = usefulScheduleId.substring(1,usefulScheduleId.length() - 1);
		String tchName = RequestUtil.getString(request, "Q^TCH_ID_^SL");
		String classxx = RequestUtil.getString(request, "Q^CLASSXX_ID_^SL");
		String usefulTchId = "";
		String classxxId = "";
		
		String day = RequestUtil.getString(request, "Q^DAY_^SL");
		String section = RequestUtil.getString(request, "Q^SECTION_^SL");
		queryFilter.addFilter("schedule_id_", usefulScheduleId2, QueryOP.IN);
		
		PageList<TeachInfoPo> teachInfoPos23 = (PageList)teachInfoRepository.query(queryFilter);
		
		
		PageList<TeachInfoPo> teachInfoPos2 = new PageList<>();
		for (TeachInfoPo teachInfoPo : teachInfoPos23) {
			String tch = tchInfoRepository.get(teachInfoPo.getTchId()).getTchName();
			String classxxString = classxxInfoRepository.get(teachInfoPo.getClassxxId()).getClassxx();
//			String classxxInt = "1" + classxxString.split("班")[0].split("年")[1];
//			if (!isNumeric(classxxInt) ) {	
//				teachInfoPo.setClassxxId(classxxString.split("年")[1].split("班")[0]);
//			}
//			else {
//				
//			}
			teachInfoPo.setClassxxId(classxxString);
			teachInfoPo.setTchId(tch);
			teachInfoPos2.add(teachInfoPo);
		}
		
		int page = teachInfoPos23.getPageResult().getPage();
		int limit = teachInfoPos23.getPageResult().getLimit();
		int total = teachInfoPos23.getPageResult().getTotalCount();
		
		teachInfoPos2.setPageResult(new PageResult(page, limit, total));
		
		return new PageJson(teachInfoPos2);
	}
	
	private static boolean isNumeric(String  str){
	    Pattern pattern = Pattern.compile("[0-9]*");
	    return pattern.matcher(str).matches();   
	}
	
	
	/**
	 * 编辑【授课信息】信息页面
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
		TeachInfoPo teachInfo= null;
		String name ="\'请选择\'";
		String classxx ="\'请选择\'";
		String day = "\'请选择\'";
		String section = "\'请选择\'";
		if(StringUtil.isNotEmpty(id)){
			teachInfo = new TeachInfoPo();
			teachInfo=teachInfoRepository.get(id);		
			name = "\'" + tchInfoRepository.get( teachInfo.getTchId()).getTchName() + "\'";
			classxx = "\'" +  classxxInfoRepository.get( teachInfo.getClassxxId()).getClassxx() + "\'";
			day = "\'" + teachInfo.getDay() + "\'";
			section = "\'" + teachInfo.getSection() + "\'";
		}
		
		
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
		
//		return getAutoView().addObject("teachInfo", teachInfo).addObject("returnUrl", preUrl);
		return getAutoView().addObject("teachInfo",teachInfo).addObject("returnUrl",preUrl).addObject("name",name)
				.addObject("classxx",classxx).addObject("day",day).addObject("section",section)
				.addObject("tch",dataInfo.getTeaTchDict().get(school)).addObject("classxx1", dataInfo.getTeaClassDict().get(school))
				.addObject("day1",dayJson).addObject("section1",sectionJson);
	}
	
	/**
	 * 编辑【授课信息】信息页面
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
		TeachInfoPo teachInfo=null;
		if(StringUtil.isNotEmpty(id)){
			teachInfo=teachInfoRepository.get(id);
		}
		return getAutoView().addObject("teachInfo", teachInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【授课信息】明细页面
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
		TeachInfoPo teachInfo=null;
		if(StringUtil.isNotEmpty(id)){
			teachInfo=teachInfoRepository.get(id);
		}
		return getAutoView().addObject("teachInfo", teachInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【授课信息】信息
	 *
	 * @param request
	 * @param response
	 //* @param  teachInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//教师-->tchId 班级---->classxxId	
		ResultMessage message=null;
		try {
			TeachInfoPo teachInfoPo = getFromRequest(request);

			//前台检测
			if (teachInfoPo.getTchId().isEmpty() || teachInfoPo.getClassxxId().isEmpty() || teachInfoPo.getDay().isEmpty() || teachInfoPo.getSection().isEmpty()) {
				message=new ResultMessage(ResultMessage.FAIL, "填写信息有空白");
				return;
			}
			
			String tch = teachInfoPo.getTchId();
			String classxx = teachInfoPo.getClassxxId();
			String school = getSchoolName();
			try {
				String tchId = teachInfoPo.getTchId();
				String classxxId = teachInfoPo.getClassxxId();
				
				teachInfoPo.setTchId(tchId);
				teachInfoPo.setClassxxId(classxxId);
				
				List<TeachInfoPo> teachInfoPos = teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("classxx_id_ =", classxxId).add("day_ =", teachInfoPo.getDay()).add("section_ =", teachInfoPo.getSection()).asJava(), null);
				List<TeachInfoPo> teachInfoPos2 = 	teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("tch_id_ =", tchId).add("day_ =", teachInfoPo.getDay()).add("section_ =", teachInfoPo.getSection()).asJava(), null);

				//添加
				if (teachInfoPo.getScheduleId().isEmpty()) {
					if (teachInfoPos.size() > 0) {
						message=new ResultMessage(ResultMessage.FAIL, "该班级此节有教师授课");
						return;
					}
					if (teachInfoPos2.size() > 0) {
						message=new ResultMessage(ResultMessage.FAIL, "该教师此节有授课");
						return;
					}
				}
				else {
					//修改
					
					if (teachInfoPos.size() > 1 && (  teachInfoPos.size() == 1 && ( ! teachInfoPos.get(0).getScheduleId().equals(teachInfoPo.getScheduleId() )  )  )) {
						message=new ResultMessage(ResultMessage.FAIL, "该班级此节有教师授课");
						return;
					}					
					
					if (teachInfoPos2.size() > 1 || (teachInfoPos2.size() == 1 && (!teachInfoPos2.get(0).getScheduleId().equals(teachInfoPo.getScheduleId())))) {
						message=new ResultMessage(ResultMessage.FAIL, "该教师此节有授课");
						return;
					}
				}
				
				if (teachInfoPo.getScheduleId() == null || ! teachInfoPo.getScheduleId().isEmpty()) {
					//获取课表id
					String fileName = classxxId.split("年")[0] + "年级.xls";
					String schedule = scheduleInfoRepository.exGetBy(null, null, ExMap.newInstance().add("school_ =", school).add("name_ =", fileName).asJava(), null).getId();
					teachInfoPo.setScheduleId(schedule);
				}
				

				
			} catch (Exception e) {
				message=new ResultMessage(ResultMessage.FAIL, "请联系管理员");
				writeResultMessage(response.getWriter(), message);
				return ;
			}
			
			System.out.print("---------------------");
			//构造领域对象和保存数据
			TeachInfo teachInfo =teachInfoRepository.newInstance(teachInfoPo);
			teachInfo.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存授课信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "请联系管理员,"+e.getMessage());
			logger.error("对授课信息操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TeachInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TeachInfoPo teachInfoPo = getTeachInfoPo(jsonObj);

		return teachInfoPo;
	}
	
	/** 
	 * 获取授课信息数据
	 *
	 * @param jsonObj
	 */
	private TeachInfoPo getTeachInfoPo(JSONObject jsonObj){
		TeachInfoPo teachInfoPo = (TeachInfoPo) JsonUtil.getDTO(jsonObj.toString(), TeachInfoPo.class);
		return teachInfoPo;
	}
	
	
	/**
	 *  批量删除【授课信息】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			TeachInfo teachInfo =teachInfoRepository.newInstance();
			teachInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除授课信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除授课信息失败，" + e.getMessage());
			logger.error("删除授课信息失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}

