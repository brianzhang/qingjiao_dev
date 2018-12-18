package com.lc.ibps.bishe.kaitiGroup.controller;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.itextpdf.text.pdf.codec.Base64.InputStream;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.kaitiGroup.domain.KaitiGroup;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;
import com.lc.ibps.bishes.kaitiGroup.repository.KaitiGroupRepository;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.grads.course.repository.impl.JobStdRepositoryImpl;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import ex.scala.utils4j.ExMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class Count {
			int[][] T= new int[8][4];
	 		String Title[]={"lunWen","neiRongYuKe","xuYaoXiu","keTiNanDu","keTiGongZuoLiang","cenKaoWen","HuanJingShuXi","gongZuoJinDuoAnPai"};
	 	int[][] count(JSONArray jsonlist){	
//				Iterator iterator = jsonlist.iterator();
//				while(iterator.hasNext())
//				{
	 		for(Object  jsona:jsonlist){   
	 			JSONObject json = (JSONObject) jsona; 
//					JsonObject json=(JsonObject) iterator.next();
		 		for(int i = 0; i<8;i++){
	 				if("A".equals(json.get(Title[i])))
	 					T[i][0]++;	 				
	 				else if("B".equals(json.get(Title[i])))
	 					T[i][1]++;
	 				else if("C".equals(json.get(Title[i])))
	 					T[i][2]++;
	 				else if("D".equals(json.get(Title[i])))
	 					T[i][3]++;
//	 				else if("".equals(json.get(Title[i])))
//	 		            ;
		 		}}
				return T;
			}}	

	
	
	
	
	

	 	
//	public static void main(){
//		Count count = new Count();
//		
//		//查询语句
//		
//		
//		//JobStdPo jobStdPo = JobStdRepository.getJson_();
//		KaitiGroupController kaitiGroupController = new KaitiGroupController();
//		//JobStdPo jobStdPo = kaitiGroupController.jobStdRepository.getJson_();
//		
//		ArrayList<JobStdPo> job_stds = new ArrayList<>();    //查询结果 
//		ArrayList<JsonObject> jsonlist = new ArrayList<>();
//		
//		String json_="";
//		//json_=jobStdPo.getJson();
//		Iterator iterator = jsonlist.iterator();
//		while(iterator.hasNext())
//		{
//		//for(ArrayList<JobStdPo> JobStdPo : job_std){
//		//	jsonlist.add(JsonObject(job_stds.get(json_));
//			
//		}
		
		
//		
//		
//		int[][] T = new int[10][4];
//	//	T = count.count(jsonlist);
//	}}


