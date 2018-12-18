
package com.lc.ibps.bishe.kaitiGroup.controller;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Arrays;
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
import com.lc.ibps.grads.course.persistence.entity.JobStdTbl;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import ex.scala.utils4j.ExMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
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
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import ex.scala.utils4j.ExMap;
import net.sf.json.JSONObject;


/**
 * t_ktxz 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
@Controller
@RequestMapping("/bishe/kaitiGroup/kaitiGroup/")
public class KaitiGroupController extends GenericController{
	@Resource
	private KaitiGroupRepository kaitiGroupRepository;
	@Resource
	CurrentContext currentContext;
	@Resource
	TeacherAndStudentRepository teacherAndStudentRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	/**
	 * 【t_ktxz】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.getByJsid(userId);
		String tdid = teacherAndStudent.getTeamId();
		String whereSql="TDID='"+tdid+"'";
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<KaitiGroupPo> kaitiGroupList=(PageList<KaitiGroupPo>)kaitiGroupRepository.query(queryFilter);
		return new PageJson(kaitiGroupList);
	}
	
	/**
	 * 编辑【t_ktxz】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		DefaultQueryFilter defaultQueryFilter = new DefaultQueryFilter();
		DefaultQueryFilter defaultQueryFilter2 = new DefaultQueryFilter();
		DefaultQueryFilter defaultQueryFilter3 = new DefaultQueryFilter();
		DefaultQueryFilter defaultQueryFilter4 = new DefaultQueryFilter();
		KaitiGroupPo kaitiGroup =new KaitiGroupPo();
		String whereSql="DBFZR_ID='"+userId+"'";
		defaultQueryFilter.addParamsFilter("whereSql", whereSql);
		PageList<KaitiGroupPo> kaitiGroupList=(PageList<KaitiGroupPo>)kaitiGroupRepository.query(defaultQueryFilter);
		PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(userId);
		String position = partyEmployeePo.getPositions();	
		whereSql ="POSITIONS_='"+position+"'";
		defaultQueryFilter2.addParamsFilter("whereSql", whereSql);
		List<PartyEmployeePo> partyEmployeePos =partyEmployeeRepository.query(defaultQueryFilter2);		
		String mz = partyEmployeePo.getName();
		if(kaitiGroupList.size()==0) {
			kaitiGroup=new KaitiGroupPo();
			kaitiGroup.setDbfzr(mz);
			kaitiGroup.setDbfzrId(userId);
			kaitiGroup.setDbgroupId(position);
		    whereSql="FINALTEACHERID='"+userId+"'";
			defaultQueryFilter3.addParamsFilter("whereSql", whereSql);
			List<UrlZhiYuanPo> urlZhiYuanList1=urlZhiYuanRepository.query(defaultQueryFilter3);
			UrlZhiYuanPo urlZhiYuanPo =urlZhiYuanList1.get(0);
			String tdid = urlZhiYuanPo.getFinaltdId();
			kaitiGroup.setTdid(tdid);
			whereSql ="TDID='"+tdid+"'";
			defaultQueryFilter4.addParamsFilter("whereSql", whereSql);
			List<KaitiGroupPo> kaitiGroupPos=kaitiGroupRepository.query(defaultQueryFilter4);
			int size = kaitiGroupPos.size();
			kaitiGroup.setDaBianXiaoZu("开题小组"+(size+1));
		}else {
			kaitiGroup=kaitiGroupList.get(0);
		}
		
		String name ="";
		for(PartyEmployeePo partyEmployee : partyEmployeePos) {
			if(partyEmployee.getName().equals(mz)) 
				continue;
			if(name.isEmpty())
				  name+=partyEmployee.getName();
		    else 
			      name = name+","+partyEmployee.getName();
		
		}
		return getAutoView().addObject("kaitiGroup", kaitiGroup).addObject("returnUrl", preUrl).addObject("name", name);
	}
	
	/**
	 * 开题组长查看学生
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("student")
	public @ResponseBody PageJson student(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(userId);
		String position = partyEmployeePo.getPositions();
		DefaultQueryFilter defaultQueryFilter = new DefaultQueryFilter();
		String whereSql ="POSITIONS_='"+position+"'";
		defaultQueryFilter.addParamsFilter("whereSql", whereSql);
		List<PartyEmployeePo> partyEmployeePos =partyEmployeeRepository.query(defaultQueryFilter);
		PageList<UrlZhiYuanPo>  urlZhiYuanList =new PageList<UrlZhiYuanPo>();
		for(PartyEmployeePo partyEmployee : partyEmployeePos) {
			String teacherId = partyEmployee.getId();
			DefaultQueryFilter defaultQueryFilter2 = new DefaultQueryFilter();
		    whereSql ="FINALTEACHERID='"+teacherId+"'";
		    defaultQueryFilter2.addParamsFilter("whereSql", whereSql);
		    PageList<UrlZhiYuanPo>  urlZhiYuanList2=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(defaultQueryFilter2);
		    urlZhiYuanList.addAll(urlZhiYuanList2);
		    /*for(UrlZhiYuanPo urlZhiYuanPo2 : urlZhiYuanList2) {
		    	String id = urlZhiYuanPo2.getId();
		    	urlZhiYuanList.add(urlZhiYuanPo2);
		    }*/
		}
		return  new PageJson(urlZhiYuanList);
	}
	
	/**
	 * 编辑【t_ktxz】信息页面
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
		KaitiGroupPo kaitiGroup=null;
		if(StringUtils.isNotEmpty(id)){
			kaitiGroup=kaitiGroupRepository.get(id);
		}
		return getAutoView().addObject("kaitiGroup", kaitiGroup).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_ktxz】明细页面
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
		KaitiGroupPo kaitiGroup=null;
		if(StringUtils.isNotEmpty(id)){
			kaitiGroup=kaitiGroupRepository.get(id);
		}
		return getAutoView().addObject("kaitiGroup", kaitiGroup).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_ktxz】信息
	 *
	 * @param request
	 * @param response
	 //* @param  kaitiGroup
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			KaitiGroupPo kaitiGroupPo = getFromRequest(request);
			//构造领域对象和保存数据
			KaitiGroup kaitiGroup =kaitiGroupRepository.newInstance(kaitiGroupPo);
			kaitiGroup.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private KaitiGroupPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		KaitiGroupPo kaitiGroupPo = getKaitiGroupPo(jsonObj);

		return kaitiGroupPo;
	}
	
	/** 
	 * 获取t_ktxz数据
	 *
	 * @param jsonObj
	 */
	private KaitiGroupPo getKaitiGroupPo(JSONObject jsonObj){
		KaitiGroupPo kaitiGroupPo = (KaitiGroupPo) JsonUtil.getDTO(jsonObj.toString(), KaitiGroupPo.class);
		return kaitiGroupPo;
	}
	
	
	/**
	 *  批量删除【t_ktxz】记录
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
			KaitiGroup kaitiGroup =kaitiGroupRepository.newInstance();
			kaitiGroup.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_ktxz成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_ktxz失败，" + e.getMessage());
			logger.error("删除t_ktxz失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 学生查看
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("studentLook")
	public ModelAndView studentLook (HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String xh =user.getAccount();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.getByCol("xh", xh);
		String finalteacherId = urlZhiYuanPo.getFinalteacherId();
		PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(finalteacherId);
		String position = partyEmployeePo.getPositions();
		DefaultQueryFilter defaultQueryFilter = new DefaultQueryFilter();
		String whereSql ="DBGROUP_ID='"+position+"'";
		defaultQueryFilter.addParamsFilter("whereSql", whereSql);
		List<KaitiGroupPo> kaitiGroupPos =kaitiGroupRepository.query(defaultQueryFilter);
		if(kaitiGroupPos.size()==0) {
			return  getAutoView().addObject("urlZhiYuan",urlZhiYuanPo);
		}
		KaitiGroupPo kaitiGroupPo = kaitiGroupPos.get(0);
		
//		String ktrq = urlZhiYuanPo.getKt_bgrq();
//		String ktsj = kaitiGroupPo.getKtsj();
//		String ktdd=kaitiGroupPo.getDaBianDeDian();
//		String group = kaitiGroupPo.getDaBianXiaoZu();
//		String name = urlZhiYuanPo.getName();
//		String finalteacher = urlZhiYuanPo.getFinalteacher();

		return  getAutoView().addObject("urlZhiYuan",urlZhiYuanPo).addObject("kaitiGroup",kaitiGroupPo);
	}
	
	@RequestMapping("ktgrad")
	public void ktgrad (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		String json= RequestUtil.getString(request, "json");
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
		String xh = urlZhiYuanPo.getXh();
		String finalteacherid = urlZhiYuanPo.getFinalteacherId();
		String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
	    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
	    //String crstchIdString= crsTchPo.getId(); // 由于数据库表结构改动  现修改如下
	    String crstchIdString= crsTchPo.getUniManage();
	    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）").asJava();
	    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
	    String jobId = crsJobPo.getId();
	    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
	    JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
	    if(jobStdPo!=null&&jobStdPo.getStatus()==JobStdPo.SUBMITTED){
	    	jobStdPo.setJson(json);	
	    	JobStd jobStd = jobStdRepository.newInstance(jobStdPo);
	    	jobStd.save();
	    } 
	}
	
	@RequestMapping("ktdata")
	public void ktdata (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
		String xh = urlZhiYuanPo.getXh();
		String finalteacherid = urlZhiYuanPo.getFinalteacherId();
		String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
	    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
	    //String crstchIdString= crsTchPo.getId(); // 由于数据库表结构改动  现修改如下
	    String crstchIdString= crsTchPo.getUniManage();
	    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）").asJava();
	    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
	    String jobId = crsJobPo.getId();
	    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
	    JobStdPo jobStdPo = jobStdRepository.getByCol(map);
	    String json_="";
	    JSONObject json = new JSONObject();
	    if(jobStdPo!=null&&jobStdPo.getStatus()==JobStdPo.SUBMITTED){
	    	json_=jobStdPo.getJson();
	    	if(json_==null||json_.isEmpty()) {
	    		JSONObject obj = new JSONObject();
	    		obj.put("xh", xh);
	    		json_=obj.toString();
	    	}
	    		
	    	String fileId = jobStdPo.getFile_id_();
	    	json=JSONObject.fromObject(json_);
	    	json.put("fileId", fileId);	    	
	    } 
	    response.getWriter().print(json); 
	}
	//中期情况记录，问卷json存取函数
	@RequestMapping("zqgrad")
	public void zqgrad (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String xh= RequestUtil.getString(request, "xh");
		String json= RequestUtil.getString(request, "json");
		byte[] blobJson = json.getBytes();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.getby_xh(xh);
	    if(urlZhiYuanPo!=null){	    	
	    	urlZhiYuanPo.setZqGrade(blobJson);	
	    	UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
	    	urlZhiYuan.save();
	
	    } 
	}
	
	@RequestMapping("zqdata")
	public void zqdata (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String xh= RequestUtil.getString(request, "xh");
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.getby_xh(xh);	
		byte[] blobJson ;
	    String gradeJson ="";
	    JSONObject json = new JSONObject();
	    blobJson = urlZhiYuanPo.getZqGrade();
    	if(blobJson==null||blobJson.length == 0) {
    		JSONObject obj = new JSONObject();
    		obj.put("xh", urlZhiYuanPo.getXh());
    		gradeJson=obj.toString();
    		gradeJson = new String(gradeJson.getBytes("ISO8859-1"),"utf-8").trim();
    		json = JSONObject.fromObject(gradeJson);
    	}else {
    		
    		gradeJson = new String(gradeJson.getBytes("ISO8859-1"),"utf-8").trim();
    		json=JSONObject.fromObject(new String(blobJson));
		}		  	
	    response.getWriter().print(json); 
	    
	}
	//测试代码
		@RequestMapping("getJson")
		public ModelAndView getJson(HttpServletRequest request,HttpServletResponse response) throws Exception{
			String preUrl= RequestUtil.getPrePage(request);
			String JobId="422840024715755520";
			List<JobStdPo> jobStdPolist1 = jobStdRepository.get1(JobId); //获取json为null的学生姓名
			List<JobStdPo> jobStdPolist = jobStdRepository.getJson_(JobId);
		   
		    JSONArray js = new JSONArray();
		    for(JobStdPo jobStdPo :jobStdPolist) {
		    	String j = jobStdPo.getJson();
//		    	String k = jobStdPo.getId();
//			    System.out.println(k);

//		    	JSONObject jo = new JSONObject();
		    	if(j=="")    //json为null
		    	continue;	
		    	JSONObject json_j = JSONObject.fromObject(j);
//		    	jo.put("", json_j);
		    	js.add(json_j);
		    	
		    }
		    ArrayList<String> listtest = new ArrayList<String>();
		    
		   // System.out.println(Arrays.asList(jobStdPolist1));
		    
		    for(JobStdPo jobStdPo :jobStdPolist1) {
		    	String m = jobStdPo.getStdNum();
		    	//String n = jobStdPo.getStdName();
		    	System.out.println(m);
		    	//System.out.println(n);
		    	listtest.add(m);
		    	//listtest.add(n);
		    }
		    Count count = new Count();
//		    for(int i =0; i<)
		    int[][] T = count.count(js);
//		    System.out.println(T[1][0]);
		    int result = T[0][0]+T[0][1]+T[0][2]+T[0][3];
            
		    ArrayList<Integer> list = null;
	        ArrayList<ArrayList<Integer>> list2 = new ArrayList<ArrayList<Integer>>();
	        for (int i = 0; i < T.length; i++) {
	            list = new ArrayList<Integer>();
	            for (int j = 0; j < T[i].length; j++) {
	                list.add(T[i][j]);
	            }
	            list2.add(list);
	        }
//	        Iterator it = list2.iterator();
//	        while (it.hasNext()) {
//	            System.out.println(it.next());
//	        }
	        
			return getAutoView().addObject("T", list2).addObject("returnUrl", preUrl).addObject("result", result).addObject("M", listtest);
//		    response.getWriter().print(T);
		    
		    
		    
		
	}
	
	
	
}
