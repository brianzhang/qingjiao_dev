package com.lc.ibps.patrolp.data.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;
import com.mysql.fabric.xmlrpc.base.Array;

import ex.scala.utils4j.ExMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import scala.io.BytePickle.PU;

@Controller
@RequestMapping("/patrolp/data/select2data/")
public class Select2Data extends GenericController {
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
	
	@RequestMapping("tch")
	public @ResponseBody JSONArray tch(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray teaTchJson =new JSONArray();
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
		
//		dataInfo.getTchDict().remove(school);
		dataInfo.getTeaTchDict().remove(school);
		
		if (! dataInfo.getTeaTchDict().containsKey(school)) {
			List<TchInfoPo> tchs = tchInfoRepository.exFindBy(null, null, ExMap.newInstance().add("school_ =", school).asJava(), null);
			for (TchInfoPo tchInfoPo : tchs) {
				teaTchJson.add( JSONObject.fromObject("{\"id\":\"" + tchInfoPo.getId() + "\",\"text\":\"" + tchInfoPo.getTchName() + "\"}") );

			}
			dataInfo.getTeaTchDict().put(school,teaTchJson);
		}
		return dataInfo.getTeaTchDict().get(school);
	}
	
	@RequestMapping("classxx")
	public @ResponseBody JSONArray classxx(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		int num = RequestUtil.getInt(request, "type");
//		JSONArray classJson =new JSONArray();
		JSONArray teaClassJson =new JSONArray();
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
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

		return dataInfo.getTeaClassDict().get(school);

	}
	
	private static boolean isNumeric(String  str){
	    Pattern pattern = Pattern.compile("[0-9]*");
	    return pattern.matcher(str).matches();   
	}
	
	@RequestMapping("day")
	public @ResponseBody JSONArray day(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray dayJson = new JSONArray();
		if(dayJson.isEmpty()) {
			for (int i = 1; i < 6; i++) {
				dayJson.add( JSONObject.fromObject("{\"id\":\"" + String.valueOf(i) + "\",\"text\":\"" + String.valueOf(i) + "\"}") );
			}
		}
		return dayJson;
	}
	
	@RequestMapping("section")
	public @ResponseBody JSONArray section(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray sectionJson = new JSONArray();
		if(sectionJson.isEmpty()) {
			for (int i = 1; i < 9; i++) {
				sectionJson.add( JSONObject.fromObject("{\"id\":\"" + String.valueOf(i) + "\",\"text\":\"" + String.valueOf(i) + "\"}") );
			}
		}
		return sectionJson;
	}
	
	@RequestMapping("master")
	public @ResponseBody JSONArray master(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray masterJson = new JSONArray();
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
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
		return dataInfo.getMasterDict().get(school);
	}

	@RequestMapping("place")
	public @ResponseBody JSONArray place(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray placeJson = new JSONArray();
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
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
		return dataInfo.getPlaceDict().get(school);
	}
	
	@RequestMapping("subject")
	public @ResponseBody JSONArray subject(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONArray subjectJson = new JSONArray();
		String school = getSchoolName();
		DataInfo dataInfo = DataInfo.getInstance();
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
		return dataInfo.getSubjectDict().get(school);
	}
	
		
}
