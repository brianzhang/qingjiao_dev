package com.lc.ibps.patrolp.data.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;

import net.sf.json.JSONArray;

@Controller
public class DataInfo {
	
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
	
//	private static Map<String, JSONArray> tchDict;
//	private static Map<String, JSONArray> clasxxDict;
	private static Map<String, JSONArray> masterDict;
	private static Map<String, JSONArray> placeDict;
	private static Map<String, JSONArray> subjectDict;
	private static Map<String, JSONArray> teaTchDict;
	private static Map<String, JSONArray> teaClassDict;
    private DataInfo() {
//    	this.tchDict = new HashMap<>();
//    	this.clasxxDict = new HashMap<>();
    	this.masterDict = new HashMap<>();
    	this.placeDict = new HashMap<>();
    	this.subjectDict = new HashMap<>();
    	this.teaTchDict = new HashMap<>();
    	this.teaClassDict = new HashMap<>();
    }  
    private static final DataInfo single = new DataInfo();  
    //静态工厂方法   
    public static DataInfo getInstance() {  
        return single;  
    }
//	public static Map<String, JSONArray> getTchDict() {
//		return tchDict;
//	}
//	public static void setTchDict(Map<String, JSONArray> tchDict) {
//		DataInfo.tchDict = tchDict;
//	}
//	public static Map<String, JSONArray> getClasxxDict() {
//		return clasxxDict;
//	}
//	public static void setClasxxDict(Map<String, JSONArray> clasxxDict) {
//		DataInfo.clasxxDict = clasxxDict;
//	}
	public static Map<String, JSONArray> getMasterDict() {
		return masterDict;
	}
	public static void setMasterDict(Map<String, JSONArray> masterDict) {
		DataInfo.masterDict = masterDict;
	}
	public static Map<String, JSONArray> getPlaceDict() {
		return placeDict;
	}
	public static void setPlaceDict(Map<String, JSONArray> placeDict) {
		DataInfo.placeDict = placeDict;
	}
	public static Map<String, JSONArray> getSubjectDict() {
		return subjectDict;
	}
	public static void setSubjectDict(Map<String, JSONArray> subjectDict) {
		DataInfo.subjectDict = subjectDict;
	}
	public static Map<String, JSONArray> getTeaTchDict() {
		return teaTchDict;
	}
	public static void setTeaTchDict(Map<String, JSONArray> teaTchDict) {
		DataInfo.teaTchDict = teaTchDict;
	}
	public static Map<String, JSONArray> getTeaClassDict() {
		return teaClassDict;
	}
	public static void setTeaClassDict(Map<String, JSONArray> teaClassDict) {
		DataInfo.teaClassDict = teaClassDict;
	}  
    
}
