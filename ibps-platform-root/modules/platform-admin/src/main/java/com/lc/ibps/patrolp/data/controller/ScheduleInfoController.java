
package com.lc.ibps.patrolp.data.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.core.xml.element.Message;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;
import com.lc.ibps.patrols.data.domain.ScheduleInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.minidev.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * 课表信息 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/data/scheduleInfo/")
public class ScheduleInfoController extends GenericController{
	@Resource
	private ScheduleInfoRepository scheduleInfoRepository;
	@Resource
	private TeachInfoRepository teachInfoRepository;
	@Resource
	private CurrentContext currentContext;	
	@Resource 
	private PartyOrgRepository partyorgRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	
	//得到学校上传的最新课表
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String schoolName = getSchoolName();
		List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", schoolName).asJava(), null);
		JSONArray classNameJson = null;
		Set<String> classNameSet = new HashSet<>();
		classNameJson = new JSONArray();
		for(ScheduleInfoPo e : scheduleInfoPos){
			String className = e.getName().split("\\.")[0];
			if (! classNameSet.contains(className)) {
				classNameSet.add(className);
				classNameJson.add( JSONObject.fromObject("{\"id\":\"" + className + "\",\"text\":\"" + className + "\"}") );
			}
		}
		JSONArray schoolJson = new JSONArray();
		schoolJson.add( JSONObject.fromObject("{\"id\":\"" + schoolName + "\",\"text\":\"" + schoolName + "\"}") );
		return getAutoView().addObject("className", classNameJson).addObject("schoolName",schoolName);
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
	 * 【课表信息】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String schoolName = RequestUtil.getString(request, "Q^SCHOOL_^SL");
		String className = RequestUtil.getString(request, "Q^NAME_^SL");
		String state = RequestUtil.getString(request, "Q^STATE_^SL");
		schoolName =getSchoolName();
		
		String whereSql = getWhereSql(className,state,schoolName);
		QueryFilter queryFilter=getQuerFilter(request);

		PageList<ScheduleInfoPo> scheduleInfoPos = null;
		if (whereSql != null) {
			queryFilter.addParamsFilter("whereSql", whereSql);
			scheduleInfoPos = (PageList<ScheduleInfoPo>) scheduleInfoRepository.query(queryFilter);
		}
		
		PageList<ScheduleInfoPo> usefulscheduleInfoPo =  new PageList<ScheduleInfoPo>();
		usefulscheduleInfoPo = dropXls(scheduleInfoPos);
		PageList<ScheduleInfoPo> scheduleInfoList = (PageList<ScheduleInfoPo>)usefulscheduleInfoPo;
		return new PageJson(scheduleInfoList);
	}
	
	private String getWhereSql(String className, String state, String schoolName) {
		StringBuilder whereSql = new StringBuilder();
		if(className != null && !className.isEmpty() && !className.equals(""))
			whereSql.append("name_ = \'" + className + ".xls\'"+ " and ");
		if(state != null && !state.isEmpty() && !state.equals(""))
			whereSql.append("state_ = \'" + state + "\'" + " and ");
		if(schoolName != null && !schoolName.isEmpty() && !schoolName.equals(""))
			whereSql.append("school_ = \'" + schoolName + "\'");
		if (whereSql != null && whereSql.length() != 0 && !whereSql.equals("")) {
			return whereSql.toString();
		}
		return null;
	}

	private PageList<ScheduleInfoPo> dropXls(PageList<ScheduleInfoPo> usefulscheduleInfoPo) {
		PageList<ScheduleInfoPo> scheduleInfoPos = new PageList<>();
		for(ScheduleInfoPo e : usefulscheduleInfoPo){
			String className = e.getName().split("\\.")[0];
			e.setName(className);
			scheduleInfoPos.add(e);
		}
		return scheduleInfoPos;
	}

	/**
	 * 编辑【课表信息】信息页面
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
		ScheduleInfoPo scheduleInfo=null;
		if(StringUtil.isNotEmpty(id)){
			scheduleInfo=scheduleInfoRepository.get(id);
		}
		return getAutoView().addObject("scheduleInfo", scheduleInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【课表信息】信息页面
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
		ScheduleInfoPo scheduleInfo=null;
		if(StringUtil.isNotEmpty(id)){
			scheduleInfo=scheduleInfoRepository.get(id);
		}
		return getAutoView().addObject("scheduleInfo", scheduleInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【课表信息】明细页面
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
		ScheduleInfoPo scheduleInfo=null;
		if(StringUtil.isNotEmpty(id)){
			scheduleInfo=scheduleInfoRepository.get(id);
		}
		return getAutoView().addObject("scheduleInfo", scheduleInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【课表信息】信息
	 *
	 * @param request
	 * @param response
	 * @param  scheduleInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ScheduleInfoPo scheduleInfoPo = getFromRequest(request);
			//构造领域对象和保存数据
			ScheduleInfo scheduleInfo =scheduleInfoRepository.newInstance(scheduleInfoPo);
			scheduleInfo.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存课表信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对课表信息操作失败,"+e.getMessage());
			logger.error("对课表信息操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ScheduleInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ScheduleInfoPo scheduleInfoPo = getScheduleInfoPo(jsonObj);

		return scheduleInfoPo;
	}
	
	/** 
	 * 获取课表信息数据
	 *
	 * @param jsonObj
	 */
	private ScheduleInfoPo getScheduleInfoPo(JSONObject jsonObj){
		ScheduleInfoPo scheduleInfoPo = (ScheduleInfoPo) JsonUtil.getDTO(jsonObj.toString(), ScheduleInfoPo.class);
		return scheduleInfoPo;
	}
	
	
	/**
	 *  批量删除【课表信息】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//应该删除课表信息 和 授课信息里 的记录
			//获得待删除的课表id
			String[] scheduleInfoIds=RequestUtil.getStringAryByStr(request, "id");
			for(String scheduleInfoid : scheduleInfoIds){
				List<TeachInfoPo> teachInfoPos = teachInfoRepository.exFindBy(null, null, ExMap.newInstance().add("schedule_id_ =", scheduleInfoid).asJava(), null);
				for(TeachInfoPo e : teachInfoPos )
					teachInfoRepository.newInstance(e).delete();		
			}
			
			//构造领域对象和保存数据
			ScheduleInfo scheduleInfo =scheduleInfoRepository.newInstance();
			scheduleInfo.deleteByIds(scheduleInfoIds);
			
			
			message=new ResultMessage(ResultMessage.SUCCESS, "删除课表信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除课表信息失败，" + e.getMessage());
			logger.error("删除课表信息失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("useSchedule")
	public void useSchedule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String schoolName = getSchoolName();
		try {
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			String className = "";
			ScheduleInfoPo scheduleInfoPo = new ScheduleInfoPo();
			//构造领域对象和保存数据
			for(String id : ids){
				scheduleInfoPo = scheduleInfoRepository.get(id);
				className = scheduleInfoPo.getName();
				List<ScheduleInfoPo> scheduleInfoPos = scheduleInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", schoolName).add("name_ = ", className).add("state_ =", "使用").asJava(), null);
				if ( !scheduleInfoPos.isEmpty()) {
					for(ScheduleInfoPo e:scheduleInfoPos){
						e.setState("停用");
						scheduleInfoRepository.newInstance(e).update();
						message=new ResultMessage(ResultMessage.SUCCESS, "启用课表成功");
					}
				}
				scheduleInfoPo.setState("使用");
				scheduleInfoRepository.newInstance(scheduleInfoPo).update();
				message=new ResultMessage(ResultMessage.SUCCESS, "启用课表成功");
//				else {
//
//					message=new ResultMessage(ResultMessage.FAIL, "请先停止" + className.split("\\.")[0]+ "课表");
//				}
			}
			
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对课表信息操作失败,"+e.getMessage());
			logger.error("对课表信息操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("stopSchedule")
	public void stopSchedule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			String className = "";
			ScheduleInfoPo scheduleInfoPo = new ScheduleInfoPo();
			//构造领域对象和保存数据
			for(String id : ids){
				scheduleInfoPo = scheduleInfoRepository.get(id);
				className = scheduleInfoPo.getName();
				scheduleInfoPo.setState("停用");
				scheduleInfoRepository.newInstance(scheduleInfoPo).update();
				message=new ResultMessage(ResultMessage.WARN, "停用课表成功,稍后请启动" + className.split("\\.")[0] + "课表");
			}
			
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对课表信息操作失败,"+e.getMessage());
			logger.error("对课表信息操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
