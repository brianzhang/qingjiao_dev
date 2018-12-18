
package com.lc.ibps.bishe.urlZhiYuant.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hrbeu.heu.WordUtil;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.bishe.groupuser.controller.GroupUserController;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;
import com.lc.ibps.bishes.group.repository.GradGroupRepository;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;
import com.lc.ibps.bishes.groupuser.repository.GroupUserRepository;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.jfree.data.gantt.GanttCategoryDataset;
import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.repository.LabelDefRepository;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;
import com.lc.ibps.bishes.kaitiGroup.repository.KaitiGroupRepository;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;
import com.lc.ibps.bishes.labelType.repository.LabelTypeRepository;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
import com.lc.ibps.bpmn.core.xml.element.activiti.In;
import com.lc.ibps.bpmn.domain.BpmTaskAssign;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskAssignPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskAssignRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.common.file.domain.Attachment;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.components.upload.constants.FileParam;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.model.FileInfo;
import com.lc.ibps.components.upload.util.UploadUtil;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityTreePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserRolePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.org.party.repository.PartyPositionRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.CommonPath;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.sun.star.util.URL;
import com.utils.FileUtil;
import com.utils.OrgUtil;
import com.utils.freemarker.TemplateParseUtil;

import ex.scala.utils4j.ExMap;

import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.lc.ibps.report.persistence.entity.ReportDefPo;
import com.lc.ibps.report.persistence.entity.ReportParamsPo;
import com.lc.ibps.report.strategy.ReportStrategyFactory;
import com.lc.ibps.report.util.ReportJsonUtil;
import com.runqian.report4.model.ReportDefine;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.Engine;
import com.runqian.report4.usermodel.IReport;
import com.runqian.report4.util.ReportUtils;
import com.runqian.report4.view.word.WordReport;


/**
 * t_zyurl 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:07
 *</pre>
 */
@Controller
@RequestMapping("/bishe/urlZhiYuant/urlZhiYuan/")
public class UrlZhiYuanController extends GenericUploadController{
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	CurrentContext currentContext;	
	@Resource
	PartyUserRepository partyUserRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	TeacherAndStudentRepository teacherAndStudentRepository;
	@Resource
	BpmInstRepository bpmInstRepository;
	@Resource
	BpmTaskRepository bpmTaskRepository;
	@Resource
	BpmTaskAssignRepository bpmTaskAssignRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	AttachmentRepository attachmentRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	KaitiGroupRepository kaitiGroupRepository;
	@Resource
	PartyPositionRepository partyPositionRepository;
	@Resource
	TchLabelRepository tchLabelRepository;
	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	LabelDefRepository labelDefRepository;
	@Resource
	LabelTypeRepository labelTypeRepository;
    @Resource
	GradGroupRepository gradGroupRepository;
	@Resource
	GroupUserRepository groupUserRepository;
	@Resource
	IPartyEntityService partyEntityService;




	Map<String, String> labelMap = new HashMap<>();
	Map<String, String> stuNum = new HashMap<>();

	private Map<String, List<String>> orgMap = new HashMap<String, List<String>>();
	private Map<String, List<String>> tchMap = new HashMap<String, List<String>>();
	
	public static final String one = "计算机科学与技术学院";
	public static final String  a = "计算机科学与技术专业";
	public static final String two = "计算机科学与技术学院";
	public static final String b = "物联网工程";
	public static final String three = "软件学院";
	public static final String c= "软件工程";
	public static final String four = "软件学院";
	public static final String  d ="软件工程（数字新媒体）";
	public static final String five = "国家保密学院";
	public static final String e = "信息安全（保密管理）";
	public static final String six = "国家保密学院";
	public static final String f ="信息安全（保密技术）";

	@RequestMapping("totalNum")
	public void totalNum(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		String typeFlag = request.getParameter("typeFlag");
		JSONObject jo = new JSONObject();
		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
			jo.put("status", false);
			jo.put("msg", "小组类型错误");
			reponse.getWriter().println(jo);
			return;
		}
		if (StringUtils.isBlank(orgId)) {
			jo.put("status", false);
			jo.put("msg", "找不到院系");
		}else {
			List<UrlZhiYuanPo> urlZhiYuanPos = null;
			if ("1".equals(typeFlag)){
				String whereSql = "orgId = '" + orgId + "'";
				urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			}
			if ("2".equals(typeFlag)){
				String whereSql = "orgId = '" + orgId + "' and is_db_ = '同意'";
				urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			}
			jo.put("status", true);
			jo.put("msg", urlZhiYuanPos.size());
		}
		reponse.getWriter().println(jo);	
	}
	
	@RequestMapping("curBatchTotalNum")
	public void curBatchTotalNum(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		JSONObject jo = new JSONObject();
		String type = "";
		String typeFlag = request.getParameter("typeFlag");
		String curBatch = request.getParameter("curBatch");
		
		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
	        jo.put("status", false);
	        jo.put("msg", "小组类型错误");
	        reponse.getWriter().println(jo);
	        return;
		}
		
		
		if (StringUtils.isBlank(curBatch)) {
			jo.put("status", false);
			jo.put("msg", "请选择参数");
			reponse.getWriter().println(jo);
			return ;
		}
		if (StringUtils.isBlank(orgId)) {
			jo.put("status", false);
			jo.put("msg", "找不到院系");
		}else {
			String whereSql = "orgId = '" + orgId + "'";
			if ("1".equals(typeFlag)) {
				whereSql =  whereSql + " and zq_batch_ = '" + curBatch+"'";
			}
			if ("2".equals(typeFlag)) {
				whereSql =  whereSql + " and db_batch_ = '" + curBatch+"'";
			}
			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			if (urlZhiYuanPos == null || urlZhiYuanPos.size() == 0) {
				jo.put("status", false);
				jo.put("msg", "该批次没有人，请重新选择");
			}else {
				jo.put("status", true);
				jo.put("msg", urlZhiYuanPos.size());
			}
		}
		reponse.getWriter().println(jo);	
	}
	
	/**
	 * 【t_zyurl】列表(分页条件查询)数据
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
		String orgId = "";

		List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
		if (partyOrgAuthPos.size() != 0) {


			List<String> orgIds = new ArrayList<>();
			for (PartyOrgAuthPo e : partyOrgAuthPos) {
				orgIds.add(e.getOrgID());
			}
			queryFilter.addFilter("orgId", orgIds, QueryOP.IN);
		}
		
		CommonPath.ctx = request.getSession().getServletContext().getRealPath("");
		PageList<UrlZhiYuanPo> urlZhiYuanList1=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
		//论文审核 审核教师得分
		String flag = RequestUtil.getString(request,"flag");
		String org = OrgUtil.getOrgId(currentContext,partyOrgAuthRepository);
		if ("1".equals(flag)){
			for (UrlZhiYuanPo es:urlZhiYuanList1) {
				String judgeTch = es.getJudgeTch();
				if (StringUtils.isBlank(judgeTch)){
					es.setJudgeTchName("无");
					es.setMatch(0);
				}else {
					int match = getMatch(es);
					es.setMatch(match);
				}
			}
		}
		return new PageJson(urlZhiYuanList1);
	}

	private int getMatch(UrlZhiYuanPo es) {
		String stuLabel = es.getLabelId();
		String judgeTchId = es.getJudgeTch();
		String tchLabel = tchLabelRepository.get(judgeTchId).getLabelId();
		if ( StringUtils.isBlank(stuLabel) || StringUtils.isBlank(tchLabel)) {
			return 0;
		}
		stuLabel = stuLabel.substring(0, stuLabel.length() - 1 );
		String[] stuLabels = stuLabel.split(",");
		tchLabel = tchLabel.substring(0, tchLabel.length() - 1 );
		String[] tchLabels = tchLabel.split(",");
		Set<String> result = new HashSet<String>();   //学生和教师共有的标签
		result.clear();
		result.addAll(new HashSet<>(Arrays.asList(stuLabels)));
		result.retainAll( new HashSet<>(Arrays.asList(tchLabels)));
		return result.size();
	}

	@RequestMapping("listJsonForLabel")
	public @ResponseBody PageJson listJsonForLabel(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);

	
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";

		List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
		if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
			return null;
		}else {
			List<String> orgIds = new ArrayList<>();
			for (PartyOrgAuthPo e : partyOrgAuthPos) {
				orgIds.add(e.getOrgID());
			}
			queryFilter.addFilter("orgId", orgIds, QueryOP.IN);
		}
		CommonPath.ctx = request.getSession().getServletContext().getRealPath("");
		PageList<UrlZhiYuanPo> urlZhiYuanList1=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
		//labelid == > 中文
		Map<String, String> labelMap = makeLableMap(userId);	
		StringBuffer sBuffer = new StringBuffer();
		for (UrlZhiYuanPo e : urlZhiYuanList1) {
			String labelId = e.getLabelId();
			if (labelId != null && !("").equals(labelId)) {
				String[] labelIds = labelId.split(",");
				for (String es : labelIds) {
					if (!("").equals(es)) {
						String labelName = labelMap.get(es);
						sBuffer.append( labelName );
						sBuffer.append(",");
					}
				}
				if (sBuffer.length() > 0) {
					sBuffer.deleteCharAt(sBuffer.length() - 1);
				}
			}
			e.setLabelId(sBuffer.toString());
			sBuffer.delete(0, sBuffer.length());
		}
		return new PageJson(urlZhiYuanList1);
	}
	
	
	/**
	 * 团队学生列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listForStudent")
	public @ResponseBody PageJson  listForStudent(HttpServletRequest request,HttpServletResponse response) throws Exception{

		QueryFilter queryFilter=getQuerFilter(request);

		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.getByJsid(userId);
		String tdid = teacherAndStudent.getTeamId();
		String whereSql="FINALTDID='"+tdid+"'";
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<UrlZhiYuanPo> urlZhiYuanList1=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
		return new PageJson(urlZhiYuanList1);
	}


	/**
	 * 团队学生列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonForBatch")
	public @ResponseBody PageJson  listJsonForBatch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String orgId = OrgUtil.getOrgId(currentContext,partyOrgAuthRepository);
		String whereSql = "orgId = '" + orgId + "'" + "and is_db_ = '同意'";
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<UrlZhiYuanPo> urlZhiYuanList=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
		return new PageJson(urlZhiYuanList);
	}
	/**
	 * 立题书审核人信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("searchNumber")
	public @ResponseBody PageJson  listShenhePeople(HttpServletRequest request,HttpServletResponse response) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		

		
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.getByJsid(userId);
		String tdid = teacherAndStudent.getTeamId();	
		String whereSql="FINALTDID='"+tdid+"'";
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<UrlZhiYuanPo> urlZhiYuanList1=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(queryFilter);
		return new PageJson(urlZhiYuanList1);
	}
	

	
	/**
	 * 教师管理学生
	 *
	 */
	@RequestMapping("manageStudent")
	public @ResponseBody PageJson  manageStudent(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="FINALTEACHERID='"+userId+"'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		PageList<UrlZhiYuanPo>  urlZhiYuanList=(PageList<UrlZhiYuanPo>)urlZhiYuanRepository.query(paramQueryFilter);
		
		Map<String, String> labelMap = makeLableMap(userId);
		
		StringBuffer sBuffer = new StringBuffer();
		//labelId --> 中文
		for (UrlZhiYuanPo e : urlZhiYuanList) {
			String labelId = e.getLabelId();
			if (labelId != null && !("").equals(labelId)) {
				String[] labelIds = labelId.split(",");
				for (String es : labelIds) {
					if (!("").equals(es)) {
						String labelName = labelMap.get(es);
						sBuffer.append( labelName );
						sBuffer.append(",");
					}
				}
				if (sBuffer.length() > 0) {
					sBuffer.deleteCharAt(sBuffer.length() - 1);
				}	
			}
			e.setLabelId(sBuffer.toString());
			sBuffer.delete(0, sBuffer.length());
		}
		return new PageJson(urlZhiYuanList);  
	}
	
	private Map<String, String> makeLableMap(String userId) {
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="org_id_ ='"+orgId+"'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<LabelDefPo> labelDefPos = labelDefRepository.query(paramQueryFilter);
		Map<String, String> labelMap = new HashMap<>();
		for (LabelDefPo labelDefPo : labelDefPos) {
			labelMap.put(labelDefPo.getId(), labelDefPo.getLabelName());
		}
		return labelMap;
	}

	@RequestMapping("listForStudents")
	public ModelAndView listForStudents(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.getByJsid(userId);
		String tdid = teacherAndStudent.getTeamId();
		return getAutoView().addObject("tdid", tdid);
	}
	@RequestMapping("manageStu")
	public ModelAndView manageStu(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//QueryFilter queryFilter=getQuerFilter(request);
		String preUrl = RequestUtil.getPrePage(request);
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		//by litao 不知什么原因无法获取团队名
//		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
//		//根据id查groupid
//		String whereSql="ID_='"+userId+"'";
//		paramQueryFilter.addParamsFilter("whereSql", whereSql);
//		List<PartyEmployeePo>  emplist=partyEmployeeRepository.query(paramQueryFilter);
//		PartyEmployeePo emp =  emplist.get(0);	
//		String empgroupid=emp.getGroupID();
//	//根据groupid（teamid）查team
//	 String team="无团队";
//	  TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.getByGroupid(empgroupid); 
//	  if(teacherAndStudent!=null){
//		  team= teacherAndStudent.getTeam();
//	  }
//		return getAutoView().addObject("team", team).addObject("returnUrl", preUrl);
		String team="无团队";
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getByFinalTchId(userId);
		if (urlZhiYuanPos.size() != 0) {
			team = urlZhiYuanPos.get(0).getFinaltd();
		}
		Map<String, String> labelMap = makeLableMap(userId);
		StringBuffer sBuffer = new StringBuffer();
		//String labelId = tchLabelRepository.get(userId).getLabelId();
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		String labelId = null;
		if(tchLabelPo != null){
			labelId = tchLabelPo.getLabelId();
		}


		if (labelId != null && !("").equals(labelId)) {
			String[] labelIds = labelId.split(",");
			for (String e : labelIds) {
				if (!("".equals(e))) {
					String labelName = labelMap.get(e);
					sBuffer.append( labelName );
					sBuffer.append(",");
				}
			}
			if (sBuffer.length() > 0) {
				sBuffer.deleteCharAt(sBuffer.length() - 1);
			}	
		}
		return getAutoView().addObject("team", team).addObject("returnUrl", preUrl).addObject("labelName", sBuffer.toString());
	}

	/**
	 * 编辑【t_zyurl】信息页面
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
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}


	/**
	 * 编辑答辩批次信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("editBatch")
	public ModelAndView editBatch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		String orgId = OrgUtil.getOrgId(currentContext,partyOrgAuthRepository);
		String whereSql = "orgId = '" + orgId + "'";
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
		Set<String> batchSet = new HashSet<>();
		for (UrlZhiYuanPo e: urlZhiYuanPos) {
			if (StringUtils.isNotBlank(e.getDbBatch()))
				batchSet.add(e.getDbBatch());
		}
		List<String> batchList = new ArrayList<>(batchSet);
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("batchList",batchList);
	}

	@RequestMapping("liTiShu")
	public ModelAndView liTiShu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String classr = urlZhiYuan.getClassr();
			switch(classr){
			case "20140611":
				urlZhiYuan.setTmdyzy(a);
				urlZhiYuan.setYx(one);
			    break;
			case "20140612":
				urlZhiYuan.setTmdyzy(a);
				urlZhiYuan.setYx(one);
			    break;
			case "20140613":
				urlZhiYuan.setTmdyzy(a);
				urlZhiYuan.setYx(one);
			    break;    
			case "20140614":
				urlZhiYuan.setTmdyzy(a);
				urlZhiYuan.setYx(one);
			    break;
			case "20140615":
				urlZhiYuan.setTmdyzy(a);
				urlZhiYuan.setYx(one);
			    break;  
			case "20140641":
				urlZhiYuan.setTmdyzy(b);
				urlZhiYuan.setYx(two);
			    break;      
			case "20142011":
				urlZhiYuan.setTmdyzy(c);
				urlZhiYuan.setYx(three);
			    break; 
			case "20142012":
				urlZhiYuan.setTmdyzy(c);
				urlZhiYuan.setYx(three);
			    break; 
			case "20142013":
				urlZhiYuan.setTmdyzy(c);
				urlZhiYuan.setYx(three);
			    break; 
			case "20142014":
				urlZhiYuan.setTmdyzy(c);
				urlZhiYuan.setYx(three);
			    break; 
			case "20142021":
				urlZhiYuan.setTmdyzy(d);
				urlZhiYuan.setYx(four);
			    break;    
			case "20142111":
				urlZhiYuan.setTmdyzy(e);
				urlZhiYuan.setYx(five);
			    break;  
			case "20142121":
				urlZhiYuan.setTmdyzy(f);
				urlZhiYuan.setYx(six);
			    break;        
			}
		}
		JSONArray ja = null;
    	JSONObject obj= new JSONObject();
    	UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
    	int type = 1;
    	String litishufile = urlZhiYuanPo.getLitishufile();
    	if(litishufile==null||litishufile.isEmpty()){
    		type=0;
    	}
    	String xh = urlZhiYuanPo.getXh(); 
	    String name = urlZhiYuanPo.getName();
    	String fileId = urlZhiYuanPo.getLitishufile();
    	String fileName = xh+name+"立题书.doc";
    	obj.put("fileName", fileName);
		obj.put("id", fileId);
		ja = new JSONArray();
		ja.add(obj);
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("filedownload", ja).addObject("type", type);
	}
	
	@RequestMapping("renwushu")
	public ModelAndView renwushu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		JSONArray ja = null;
    	JSONObject obj= new JSONObject();
    	UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
    	int type = 1;
    	String renwushufile = urlZhiYuanPo.getRenwushufile();
    	if(renwushufile==null||renwushufile.isEmpty()){
    		type=0;
    	}
    	String xh = urlZhiYuanPo.getXh(); 
	    String name = urlZhiYuanPo.getName();
    	String fileId = urlZhiYuanPo.getRenwushufile();
    	String fileName = xh+name+"任务书.doc";
    	obj.put("fileName", fileName);
		obj.put("id", fileId);
		ja = new JSONArray();
		ja.add(obj);
		String gzjdfp = urlZhiYuan.getGzjdfp();
		if(gzjdfp==null||gzjdfp.isEmpty()){
			urlZhiYuan.setGzjdfp("第1~2周：\n"
					+ "第3~4周：\n"
					+ "第5~6周：\n"
					+ "第7~8周：\n"
					+ "第9~10周：\n"
					+ "第11~12周：\n"
					+ "第13~14周：\n");
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("filedownload", ja).addObject("type", type);
	}
	/**
	 * 团队负责人分配学生
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("fenpei")
	public ModelAndView fenpei(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		List<PartyEmployeePo> partyEmployeePo =null;
		List<PartyEmployeePo> partyEmployeePoGroup = new ArrayList<>();
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String tdid=urlZhiYuan.getFinaltdId();
			//找到团队信息，获取团队负责人
			TeacherAndStudentPo teacherAndStudent=teacherAndStudentRepository.get(tdid);
			String tdfzrid=teacherAndStudent.getJsid();
			//找到团队负责人的position
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="ID_='"+tdfzrid+"'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			partyEmployeePo=partyEmployeeRepository.query(paramQueryFilter);
			String fzrPositions= null;
			if(partyEmployeePo.size()!=0) {
				fzrPositions=partyEmployeePo.get(0).getPositions();
			String var = "position";
			List<String> ids = null;
			List<PartyEntityTreePo> pos = this.partyEntityRepository.getTreeByType(var, ids);
			//得到负责人所在的团队的path
				Map<String,String> map = new HashMap<String,String>();
				String[ ] tdPaths =null;
				for (PartyEntityTreePo team:pos) {
					String tdPath = new String();
					if(team.getId().equals(fzrPositions)) {
						tdPath = team.getPath();
						 tdPaths = tdPath.split("\\.");//用.分隔开，其中taPaths[1]就是团队i
					}
				}
				for (PartyEntityTreePo team:pos) {
					if(team.getParentId()!=null&&team.getParentId().equals(tdPaths[1])){
						map.put(team.getId(),team.getId());//找到团队下的小组的id
					}
				}

				//根据postions字段寻找同一小组人员
				Collection<String> values = map.values();
				Iterator<String> it = values.iterator();
				while(it.hasNext()){
					List<PartyEmployeePo> partyEmployeePoGroup1 =null;
					String whereSql2 = "POSITIONS_='" + it.next() + "'";
					paramQueryFilter.addParamsFilter("whereSql", whereSql2);
					partyEmployeePoGroup1 = partyEmployeeRepository.query(paramQueryFilter);//得到的同一个小组的人员
					partyEmployeePoGroup.addAll(partyEmployeePoGroup1);//将多组的数据合为一组
					}
				}
			}
		return getAutoView()
				.addObject("urlZhiYuan", urlZhiYuan)
				.addObject("returnUrl", preUrl)
				.addObject("partyEmployeePo", partyEmployeePoGroup);
	}
	
	@RequestMapping("fenpeiJcShenhe")
	public ModelAndView fenpeiJcShenhe(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		List<PartyEmployeePo> partyEmployeePo =null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String tdid=urlZhiYuan.getTd3id();
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="GROUP_ID_='"+tdid+"'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
		    partyEmployeePo=partyEmployeeRepository.query(paramQueryFilter);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("partyEmployeePo", partyEmployeePo);
	}
	
	@RequestMapping("first")
	public ModelAndView first(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	@RequestMapping("third")
	public ModelAndView third(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	@RequestMapping("second")
	public ModelAndView second(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	@RequestMapping("finals")
	public ModelAndView finals(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	/**
	 * 学生查看填报志愿结果
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("studentLook")
	public ModelAndView studentLook(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		PartyUserPo partyUserPo = partyUserRepository.get(userId);
		String xh = partyUserPo.getAccount();
		UrlZhiYuanPo urlZhiYuan=null;
		PartyEmployeePo partyEmployee =null;
		if(StringUtils.isNotEmpty(userId)){
			urlZhiYuan=urlZhiYuanRepository.getByCol("xh", xh);
			String finalteaid =urlZhiYuan.getFinalteacherId();
			partyEmployee=partyEmployeeRepository.get(finalteaid);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("partyEmployee",partyEmployee);
	}
	
	/**
	 * 学生查看立题书,任务书
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("studentLitishu")
	public ModelAndView studentLitishu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type = RequestUtil.getString(request, "type");
		String id = RequestUtil.getString(request, "id");
//		String returnButton="0";
		String xh="";
		UrlZhiYuanPo urlZhiYuanPo=null;
		PartyEmployeePo partyEmployee =null;
		if(id.isEmpty()){
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			PartyUserPo partyUserPo = partyUserRepository.get(userId);
			 xh = partyUserPo.getAccount();		
			if(StringUtils.isNotEmpty(userId)){
				urlZhiYuanPo=urlZhiYuanRepository.getByCol("xh", xh);
			}		
		}else{
			urlZhiYuanPo=urlZhiYuanRepository.get(id);
			xh=urlZhiYuanPo.getXh();
//			returnButton="1";
		}
		String word="1";
		JSONArray ja = null;
    	JSONObject obj= new JSONObject();
	    String name = urlZhiYuanPo.getName();
	    if(type.equals("1")){
	    	String fileId = urlZhiYuanPo.getRenwushufile();
	    	if(fileId!=null){
	    		 String fileName = xh+name+"任务书.doc";
	 		    obj.put("fileName", fileName);
	 			obj.put("id", fileId); 
	    	}else{
	    		word="0";
	    	}
		   
	    }else if(type.equals("0")){
	    	String fileId = urlZhiYuanPo.getLitishufile();
	    	if(fileId!=null){
	    		String fileName = xh+name+"立题书.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);
	    	}else{
	    		word="0";
	    	}
	    	
	    }else if(type.equals("2")){
	    	String fileId = urlZhiYuanPo.getKaitifile();
	    	if(fileId!=null){
	    		String fileName = xh+name+"开题报告.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);
	    	}else{
	    		word="0";
	    	}
		    
	    }
	      	
		ja = new JSONArray();
		ja.add(obj);
		return getAutoView().addObject("urlZhiYuan", urlZhiYuanPo).addObject("filedownload", ja).addObject("word", word);
	}
	
	@RequestMapping("studentLitishu2")
	public ModelAndView studentLitishu2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type = RequestUtil.getString(request, "type");
		String id = RequestUtil.getString(request, "id");
//		String returnButton="0";
		String xh="";
		UrlZhiYuanPo urlZhiYuanPo=null;	
		if(id.isEmpty()){
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			PartyUserPo partyUserPo = partyUserRepository.get(userId);
			 xh = partyUserPo.getAccount();		
			if(StringUtils.isNotEmpty(userId)){
				urlZhiYuanPo=urlZhiYuanRepository.getByCol("xh", xh);
			}		
		}else{
			urlZhiYuanPo=urlZhiYuanRepository.get(id);
			xh=urlZhiYuanPo.getXh();
//			returnButton="1";
		}
		String word="1";
		JSONArray ja = null;
    	JSONObject obj= new JSONObject();
	    String name = urlZhiYuanPo.getName();
	    if(type.equals("1")){
	    	String fileId = urlZhiYuanPo.getRenwushufile();
	    	if(fileId!=null){
	    		 String fileName = xh+name+"任务书.doc";
	 		    obj.put("fileName", fileName);
	 			obj.put("id", fileId); 
	    	}else{
	    		word="0";
	    	}
		   
	    }else if(type.equals("0")){
	    	String fileId = urlZhiYuanPo.getLitishufile();
	    	if(fileId!=null){
	    		String fileName = xh+name+"立题书.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);
	    	}else{
	    		word="0";
	    	}
		    
	    }
	      	
		ja = new JSONArray();
		ja.add(obj);
		return getAutoView().addObject("urlZhiYuan", urlZhiYuanPo).addObject("filedownload", ja).addObject("word", word);
	}
	@RequestMapping("studentLitishu2PG")
	public ModelAndView studentLitishu2PG(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type = RequestUtil.getString(request, "type");
		String id = RequestUtil.getString(request, "id");
//		String returnButton="0";
		String xh="";
		UrlZhiYuanPo urlZhiYuanPo=null;	
		if(id.isEmpty()){
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			PartyUserPo partyUserPo = partyUserRepository.get(userId);
			 xh = partyUserPo.getAccount();		
			if(StringUtils.isNotEmpty(userId)){
				urlZhiYuanPo=urlZhiYuanRepository.getByCol("xh", xh);
			}		
		}else{
			urlZhiYuanPo=urlZhiYuanRepository.get(id);
			xh=urlZhiYuanPo.getXh();
//			returnButton="1";
		}
		String word="1";
		JSONArray ja = null;
    	JSONObject obj= new JSONObject();
	    String name = urlZhiYuanPo.getName();
	    if(type.equals("1")){
	    	String fileId = urlZhiYuanPo.getRenwushufile();
	    	if(fileId!=null){
	    		 String fileName = xh+name+"任务书.doc";
	 		    obj.put("fileName", fileName);
	 			obj.put("id", fileId); 
	    	}else{
	    		word="0";
	    	}
		   
	    }else if(type.equals("0")){
	    	String fileId = urlZhiYuanPo.getLitishufile();
	    	if(fileId!=null){
	    		String fileName = xh+name+"立题书.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);
	    	}else{
	    		word="0";
	    	}
		    
	    }
	      	
		ja = new JSONArray();
		ja.add(obj);
		return getAutoView().addObject("urlZhiYuan", urlZhiYuanPo).addObject("filedownload", ja).addObject("word", word);
	}
	@RequestMapping("admin")
	public ModelAndView admin(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	/**
	 * 指定交叉审核团队
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	
	@RequestMapping("designatedAuditorTeam")
	public ModelAndView designatedAuditorTeam(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id=RequestUtil.getString(request, "id");
		System.out.println("id"+id);;
		List<TeacherAndStudentPo> teacherAndStudent = teacherAndStudentRepository.findAll();	
		PartyRolePo po = partyRoleRepository.getRoleByRoleAlias("bs_leadTeam");
		String roleid = po.getId();
		List<PartyUserRolePo> userid=partyUserRoleRepository.findUserRolesByRoleId(roleid);
		List<PartyEmployeePo> users= new ArrayList<PartyEmployeePo>();
		List<String> userids= new ArrayList<String>();
		for (PartyUserRolePo partyUserRolePo : userid) {
			String userId=partyUserRolePo.getUserID();
			userids.add(userId);
		}
		List<PartyEmployeePo> user=partyEmployeeRepository.findAll();
		for (PartyEmployeePo partyEmployeePo : user) {
			for (String string : userids) {
				if(partyEmployeePo.getId().equals(string))
				{
					users.add(partyEmployeePo);
					break;
				}
			}
		}
		return getAutoView().addObject("id", id).addObject("user", users);
	}
	
	
	/**
	 * 【t_zyurl】明细页面
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
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zyurl】信息
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("saveShenheTeam")
	public void saveShenheTeam(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			String id = RequestUtil.getString(request, "id");
			//js3id为立题书审核人id
			String js3id = urlZhiYuanPo.getJs3id();
			//js3为立题书审核人
			String js3 = partyEmployeeRepository.get(js3id).getName();
			String[] ids = id.split(",");
			//表关系：t_zyurl的id为bpm_inst的bussinesskey_，其id为bpm_tasks和bpm_tasks_assgin的PROC_INST_ID_
			for(int i =0;i<ids.length;i++){
				String bussinessKey = ids[i];
				UrlZhiYuanPo urlZhiYuanPo2 = urlZhiYuanRepository.get(bussinessKey);
				DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
				String whereSql="BIZ_KEY_='"+bussinessKey+"'";
				paramQueryFilter.addParamsFilter("whereSql", whereSql);
				List<BpmInstPo> bpmInstPoList = bpmInstRepository.query(paramQueryFilter);
				BpmInstPo bpmInstPo = bpmInstPoList.get(0);
				String proc_inst_id = bpmInstPo.getId();
				DefaultQueryFilter paramQueryFilter2 = new DefaultQueryFilter();
				String whereSql2="PROC_INST_ID_='"+proc_inst_id+"'";
				paramQueryFilter2.addParamsFilter("whereSql", whereSql2);
				List<BpmTaskPo> bpmTaskPos = bpmTaskRepository.query(paramQueryFilter2);
				BpmTaskPo bpmTaskPo = bpmTaskPos.get(0);
				String nodeId = bpmTaskPo.getNodeId();
				if(!nodeId.equals("UserTask_0vf84d1")) 
					continue;
				String taskId = bpmTaskPo.getTaskId();
			    List<BpmTaskAssignPo> bpmTaskAssignPos =  bpmTaskAssignRepository.getByTask(taskId);
				BpmTaskAssignPo bpmTaskAssignPo = null;
			    if(!bpmTaskAssignPos.isEmpty()&& bpmTaskAssignPos != null ){
			    	  bpmTaskAssignPo = bpmTaskAssignPos.get(0);
			    	  bpmTaskAssignPo.setExecutor(js3id);
						BpmTaskAssign bpmTaskAssign = bpmTaskAssignRepository.newInstance(bpmTaskAssignPo);
						bpmTaskAssign.save();
			    }else{
					BpmTaskAssignPo bpmTaskAssignPo2 = new BpmTaskAssignPo();
					bpmTaskAssignPo2.setTaskId(taskId);
					bpmTaskAssignPo2.setType("employee");
					bpmTaskAssignPo2.setProcInstId(proc_inst_id);
					bpmTaskAssignPo2.setExecutor(js3id);
					BpmTaskAssign bpmTaskAssign = bpmTaskAssignRepository.newInstance(bpmTaskAssignPo2);
					bpmTaskAssign.save();
				}
				urlZhiYuanPo2.setJs3(js3);
				urlZhiYuanPo2.setJs3id(js3id);
				//构造领域对象和保存数据
				UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(urlZhiYuanPo2);		
				urlZhiYuan.save();
			} 
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			String id = urlZhiYuanPo.getId();
			String finalteacherId = urlZhiYuanPo.getFinalteacherId();
			UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
			po.setFinalteacherId(finalteacherId);
			PartyEmployeePo  partyEmployeePo = partyEmployeeRepository.get(finalteacherId);
			String finalteacher = partyEmployeePo.getName();
			po.setFinalteacher(finalteacher);
			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}


	@RequestMapping("saveBatch")
	public void saveBatch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			String id = urlZhiYuanPo.getId();
			String dbBatch = urlZhiYuanPo.getDbBatch();
			if (StringUtils.isBlank(dbBatch)){
				message=new ResultMessage(ResultMessage.FAIL, "批次不能为空");
				writeResultMessage(response.getWriter(), message);
				return;
			}
			if (StringUtils.isBlank(id)){
				message=new ResultMessage(ResultMessage.FAIL, "请选择学生");
				writeResultMessage(response.getWriter(), message);
				return;
			}
			UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
			po.setDbBatch(dbBatch);
			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存批次成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "保存批次失败,"+e.getMessage());
			logger.error("保存批次失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	/**
	 * 保存立题书草稿
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping("saveCg")
	public void saveCg(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			//提取立题书信息
            String id = urlZhiYuanPo.getId();
            String yx = urlZhiYuanPo.getYx();
            String ktdbjhmd = urlZhiYuanPo.getKtdbjhmd();
            String zc = urlZhiYuanPo.getZc();
            Date sbsj = urlZhiYuanPo.getSbsj();
            String tmmc = urlZhiYuanPo.getTmmc();
            String tmly = urlZhiYuanPo.getTmly();
            String tmlx = urlZhiYuanPo.getTmlx();
            String ktnjjdwt = urlZhiYuanPo.getKtnjjdwt();
            String rjhj = urlZhiYuanPo.getRjhj();
            String yjhj = urlZhiYuanPo.getYjhj();
            String ktyqmbhcg = urlZhiYuanPo.getKtyqmbhcg();
            String ktcgjzywcdgzrw = urlZhiYuanPo.getKtcgjzywcdgzrw();
            String bktdcgxs = urlZhiYuanPo.getBktdcgxs();
            String nf = urlZhiYuanPo.getNf();
            String tmdyzy = urlZhiYuanPo.getTmdyzy();
            String sjjs = urlZhiYuanPo.getSjjs();
            String ydwx = urlZhiYuanPo.getYdwx();
            String jbyq = urlZhiYuanPo.getJbyq();
            String tzzs = urlZhiYuanPo.getTzzs();
            String dlbks = urlZhiYuanPo.getDlbks();
            String dsbjzs = urlZhiYuanPo.getDsbjzs();
            String zyckzl = urlZhiYuanPo.getZyckzl();
            String fzx = urlZhiYuanPo.getFzx();

            //更新立题书信息
            UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
            po.setYx(yx);
            po.setKtdbjhmd(ktdbjhmd);
            po.setZc(zc);
            po.setSbsj(sbsj);
            po.setTmmc(tmmc);
            po.setTmly(tmly);
            po.setTmlx(tmlx);
            po.setKtnjjdwt(ktnjjdwt);
            po.setRjhj(rjhj);
            po.setYjhj(yjhj);
            po.setKtyqmbhcg(ktyqmbhcg);
            po.setKtcgjzywcdgzrw(ktcgjzywcdgzrw);
            po.setBktdcgxs(bktdcgxs);
            po.setNf(nf);
            po.setTmdyzy(tmdyzy);
            po.setSjjs(sjjs);
            po.setYdwx(ydwx);
            po.setJbyq(jbyq);
            po.setTzzs(tzzs);
            po.setDlbks(dlbks);
            po.setDsbjzs(dsbjzs);
            po.setZyckzl(zyckzl);
            po.setFzx(fzx);

			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 保存任务书草稿
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveCg2")
	public void saveCg2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			String id =urlZhiYuanPo.getId();
			String gzmd = urlZhiYuanPo.getGzmd();
			String gznrjjtyq = urlZhiYuanPo.getgznrjjtyq();
			String gzjdfp = urlZhiYuanPo .getGzjdfp();
			String zddyfs = urlZhiYuanPo .getZddyfs();
			String renwushu_zyzl=urlZhiYuanPo.getRenwushu_zyzl();
			UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
			po.setGzmd(gzmd);
			po.setgznrjjtyq(gznrjjtyq);
			po.setGzjdfp(gzjdfp);
			po.setZddyfs(zddyfs);
			po.setRenwushu_zyzl(renwushu_zyzl);

			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("saveKaitiCg")
	public void saveKaitiCg(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);
			String id =urlZhiYuanPo.getId();
			
			String kt_bgrq = urlZhiYuanPo.getKt_bgrq();
			String kt_bjsm = urlZhiYuanPo.getKt_bjsm();
			String kt_zynr = urlZhiYuanPo .getKt_zynr();
			String kt_fajdjap = urlZhiYuanPo.getKt_fajdjap();
			String kt_gzfa = urlZhiYuanPo.getKt_gzfa();
			String zyckzl = urlZhiYuanPo.getKaiti_zyzl();
			UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
			po.setKt_bgrq(kt_bgrq);
			po.setKt_bjsm(kt_bjsm);
			po.setKt_fajdjap(kt_fajdjap);
			po.setKt_gzfa(kt_gzfa);
			po.setKt_zynr(kt_zynr);
			po.setKaiti_zyzl(zyckzl);

			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
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
	private UrlZhiYuanPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		UrlZhiYuanPo urlZhiYuanPo = getUrlZhiYuanPo(jsonObj);

		return urlZhiYuanPo;
	}
	
	/** 
	 * 获取t_zyurl数据
	 *
	 * @param jsonObj
	 */
	private UrlZhiYuanPo getUrlZhiYuanPo(JSONObject jsonObj){
		UrlZhiYuanPo urlZhiYuanPo = (UrlZhiYuanPo) JsonUtil.getDTO(jsonObj.toString(), UrlZhiYuanPo.class);
		return urlZhiYuanPo;
	}
	
	
	/**
	 *  批量删除【t_zyurl】记录
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
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance();
			urlZhiYuan.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	/**
	 *  启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String flowKey = RequestUtil.getString(request, "flowKey");
			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan=urlZhiYuanRepository.newInstance();
			urlZhiYuan.startFlow(flowKey,ids);


			for(String id:ids){
				UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
				//js为立题书标记位
				//js1id为任务书标记位
				String js1=urlZhiYuanPo.getJs1();
				String js1id =urlZhiYuanPo.getJs1id();
				String js2=urlZhiYuanPo.getJs2();
				if(js1==null||js1.isEmpty())
				    urlZhiYuanPo.setJs1("是");
				if(js1id==null||js1id.isEmpty())
					urlZhiYuanPo.setJs1id("是");
				if(js2==null||js2.isEmpty())
				    urlZhiYuanPo.setJs2("是");
				UrlZhiYuan urlZhiYuan2=urlZhiYuanRepository.newInstance(urlZhiYuanPo);
				urlZhiYuan2.save();
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "流程启动失败，" + e.getMessage());
			logger.error("流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
    @RequestMapping("infoForJiaoWuDaying")
	public ModelAndView infoForJiaoWuDaying(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String Name = RequestUtil.getString(request, "Name");
		String id = RequestUtil.getString(request, "id");
		System.out.println("Name:"+Name);
		String ctx = request.getSession().getServletContext().getRealPath("");
		if(Name.equals("")){	
			return this.getAutoView().addObject("tourl", "");
		}else{
		    System.out.println(">>>>>>>>>开始打印");
			String jasperName=ctx+"/IReportWorkspace/jiaowu/"+Name+".jasper";
			String PDFaddr1=ctx+"/IReportJiaoWu/PDFCreate/";
			String PDFaddr2=ctx+"/IReportJiaoWu/PDFForDayin/";
			String img=ctx+"/IReportJiaoWu/background.jpg";
			String imagepath = ctx+"/IReportJiaoWu/head.jpg";
			Map<String,Object> mapForCom= new HashMap<String,Object>();
			mapForCom.put("imagepath", imagepath);
			if(!id.isEmpty()){
			mapForCom.put("id", id);
			}
			String tourl =JasperReportsForJiaoWu.dayin(mapForCom,jasperName,PDFaddr1,PDFaddr2,img ,Name);
			System.out.println(">>>>>>>>>打印完成："+tourl);
			
			tourl = "/IReportJiaoWu/PDFForDayin/"+Name+".pdf";
			System.out.println(tourl);
			return this.getAutoView().addObject("tourl", tourl);
		}
	}
    @RequestMapping("infoForWord")
	public ModelAndView infoForWord(HttpServletRequest request, HttpServletResponse response) throws Exception {    		
    	String id = RequestUtil.getString(request, "id");
    	String type=null;
    	type =RequestUtil.getString(request, "type");
    	UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
    	JSONArray ja = null;
    	JSONObject obj= new JSONObject();
    	String xh = urlZhiYuanPo.getXh(); 
	    String name = urlZhiYuanPo.getName();
	    String td3 = urlZhiYuanPo.getTd3();
	    if(type.equals("1")){
	    	String fileId = urlZhiYuanPo.getRenwushufile();
	    	String fileName = xh+name+"任务书.doc";
	    	urlZhiYuanPo.setTd3(td3);
	    	obj.put("fileName", fileName);
			obj.put("id", fileId);
	    }else{
	    	String fileId = urlZhiYuanPo.getLitishufile();
	    	String fileName = xh+name+"立题书.doc";
	    	urlZhiYuanPo.setTd3(td3);
	    	obj.put("fileName", fileName);
			obj.put("id", fileId);
			type="0";
	    }
    	
		ja = new JSONArray();
		ja.add(obj);
    	
    	return this.getAutoView().addObject("urlZhiYuan",urlZhiYuanPo).addObject("filedownload", ja).addObject("type",type);
    	
    }
    
    @RequestMapping("infoRenwushu")
	public ModelAndView infoRenwushu(HttpServletRequest request, HttpServletResponse response) throws Exception {    		
    	String id = RequestUtil.getString(request, "id");
    	UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
    	JSONArray ja = null;
    	JSONObject obj= new JSONObject();
    	String xh = urlZhiYuanPo.getXh(); 
	    String name = urlZhiYuanPo.getName();
	    String fileId = urlZhiYuanPo.getRenwushufile();
	    String fileName = xh+name+"任务书.doc";
	    obj.put("fileName", fileName);
		obj.put("id", fileId);  	
		ja = new JSONArray();
		ja.add(obj);
    	
    	return this.getAutoView().addObject("urlZhiYuan",urlZhiYuanPo).addObject("filedownload", ja);
    	
    }
    
    
    /**
     * 生成word
     * @param request
     * @param response
     * @throws Exception
     */
    
    @RequestMapping("getWord")
	public void getWord(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	String ctx = request.getSession().getServletContext().getRealPath("");
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	for(UrlZhiYuanPo urlZhiYuanPo:urlZhiYuanPos ){
    		if(urlZhiYuanPo.getLitishufile()!=null) continue;
    		String str = urlZhiYuanPo.getZyckzl();
    		if(str==null||str.isEmpty()) continue;
    		if(str.contains("<")||str.contains(">")||str.contains("&")){  
                str=str.replaceAll("&", "&amp;");  
                str=str.replaceAll("<", "&lt;");  
                str=str.replaceAll(">", "&gt;");  
                urlZhiYuanPo.setZyckzl(str);
    		}
    		    byte[] fbs = WordUtil.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "template.ftl");
        	    String litishufile = urlZhiYuanPo.getLitishufile();
             	String xh = urlZhiYuanPo.getXh();
             	String name = urlZhiYuanPo.getName();
            	if(litishufile!=null&&!litishufile.isEmpty()){
            		AttachmentPo attachmentPo =  attachmentRepository.get(litishufile);
        			String filePath = attachmentPo.getFilePath();
        			File file = new File(filePath);
        	        file.delete();
        	        Attachment attachment = attachmentRepository.newInstance(attachmentPo);
        	        attachment.delete();
            	}
        		// 初始化上传Service
            	this.getUploadService();   	
            	String fileName = xh+name+"立题书.doc";
            	long size = fbs.length;
            	//转为文件输入流
            	InputStream fis =  new ByteArrayInputStream(fbs);     	
            	Map<String,Object> params = new HashMap<String,Object>();
        		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
        		params.put(FileParam.FILE_SIZE, size );        	
        		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
        		String fid = fileInfo.getId();
        		urlZhiYuanPo.setLitishufile(fid);
        		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
        		urlZhiYuan.save();
        	}
    		}
    
    
    
    /**
     * 生成word
     * @param request
     * @param response
     * @throws Exception
     */
    
    @RequestMapping("getWordTest")
	public void getWordTest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	String ctx = request.getSession().getServletContext().getRealPath("");
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	int i = 0;
    	for(UrlZhiYuanPo urlZhiYuanPo:urlZhiYuanPos ){
//    		if(urlZhiYuanPo.getLitishufile()!=null) continue;
    		System.out.println(i++);
//    		System.out.println(urlZhiYuanPo.toString());
    		System.out.println(urlZhiYuanPo.getName());
    		String str = urlZhiYuanPo.getZyckzl();
//    		if (urlZhiYuanPo.getName().equals("徐绍宁")) {
//				continue;
//			}
    		if(str==null||str.isEmpty()) continue;
    		if(str.contains("<")||str.contains(">")||str.contains("&")){  
                str=str.replaceAll("&", "&amp;");  
                str=str.replaceAll("<", "&lt;");  
                str=str.replaceAll(">", "&gt;");
                System.out.println(str);
//                String[] ckzl = str.split("	");
//                str = str.replaceAll("\\r\\n", "<w:p></w:p>");
                urlZhiYuanPo.setZyckzl(str);
               
    		}
    		
    	
    		
//    		    byte[] fbs = WordUtil.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "templateFinal4.ftl");
    		    byte[] fbs = this.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "kaiti.ftl");
    		    urlZhiYuanPo.setZyckzl(str);
        	    String litishufile = urlZhiYuanPo.getLitishufile();
             	String xh = urlZhiYuanPo.getXh();
             	String name = urlZhiYuanPo.getName();
            	if(litishufile!=null&&!litishufile.isEmpty()){
            		AttachmentPo attachmentPo =  attachmentRepository.get(litishufile);
        			String filePath = attachmentPo.getFilePath();
        			File file = new File(filePath);
        	        file.delete();
        	        Attachment attachment = attachmentRepository.newInstance(attachmentPo);
        	        attachment.delete();
            	}
        		// 初始化上传Service
            	this.getUploadService();   	
            	String fileName = xh+name+"立题书.doc";
            	long size = fbs.length;
            	//转为文件输入流
            	InputStream fis =  new ByteArrayInputStream(fbs);     	
            	Map<String,Object> params = new HashMap<String,Object>();
        		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
        		params.put(FileParam.FILE_SIZE, size );        	
        		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
        		String fid = fileInfo.getId();
        		urlZhiYuanPo.setLitishufile(fid);
        		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
        		urlZhiYuan.save();
        	}
    }
    
	private  byte[] fmWord(UrlZhiYuanPo po, String tPath, String tName) throws TemplateException, IOException {
		Map<String, Object> map = new HashMap<>();
		/*if(po.getFinalTchDate()!=null&&po.getJudgeTchDate()!=null){
			String finalTchTime = new SimpleDateFormat("yyyy-MM-dd").format(po.getFinalTchDate());
			String []finalTchTim=finalTchTime.split("-");//索引0对应年 1对应月  2对应日

			String judgeTchTime = new SimpleDateFormat("yyyy-MM-dd").format(po.getJudgeTchDate());
			String []judgeTchTim=judgeTchTime.split("-");//索引0对应年 1对应月  2对应日
			map.put("finalTchTimey",finalTchTim[0]);
			map.put("finalTchTimem",finalTchTim[1]);
			map.put("finalTchTimed",finalTchTim[2]);
			map.put("judgeTchTimey",judgeTchTim[0]);
			map.put("judgeTchTimem",judgeTchTim[1]);
			map.put("judgeTchTimed",judgeTchTim[2]);
		}*/


		String ckwx = po.getZyckzl();
        String shenbaotime = new SimpleDateFormat("yyyy-MM-dd").format(po.getSbsj());

	    String[] ckwxs = ckwx.split("\\[\\d\\]");
	    po.setZyckzl("");
	    List<String> ckwxList = new ArrayList<>();    
	    for (int j = 0; j < ckwxs.length; j++) {
	  	      if(j > 0){
	    	        ckwxList.add("[" + j + "]" + ckwxs[j]);
	    	      }
		}
	    map.put("po",po);
	    map.put("ckwxList", ckwxList);

        map.put("shenbaotime",shenbaotime);
	    return TemplateParseUtil.parse(tPath,tName,map);
	}
    
    /**
     * 开题准备情况记录s
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("kaitiFirst")
	public ModelAndView kaitiFirst(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		JSONArray ja = null;
		String word="0";
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String xh = urlZhiYuan.getXh();
			String name = urlZhiYuan.getName();
			String finalteacherid = urlZhiYuan.getFinalteacherId();
			String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
			//获取开题第一次周记fileId
	        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
		    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
		    String crstchIdString= crsTchPo.getId();
		    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）").asJava();
		    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
		    String jobId = crsJobPo.getId();
		    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
		    JobStdPo jobStdPo = jobStdRepository.getByCol(map);
		    if(jobStdPo!=null&&jobStdPo.getStatus()==JobStdPo.SUBMITTED){	
		    	JSONObject obj= new JSONObject();
		    	String fileId = jobStdPo.getFile_id_();
			    String fileName = xh+name+"开题准备情况记录.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);  	
				ja = new JSONArray();
				ja.add(obj);
		        word="1";	    	
		    }
		    
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("filedownload", ja).addObject("word",word);
	}
    
    /**
     * 填写开题报告
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("kaitiWord")
	public ModelAndView kaitiWord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String finalteacherId = urlZhiYuan.getFinalteacherId();
			PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(finalteacherId);
			String position = partyEmployeePo.getPositions();
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="DBGROUP_ID='"+position+"'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			KaitiGroupPo  kaitiGroupPo=kaitiGroupRepository.query(paramQueryFilter).get(0);
			Date  date = kaitiGroupPo.getDaBianShiJian();
			String rq = date.toLocaleString();
			String[] a=rq.split("0:");
           urlZhiYuan.setKt_bgrq(a[0]);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl);
	}
    /**
     * 开题检查情况
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("kaitiCheck")
	public ModelAndView kaitiCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuan=null;
		JSONArray ja = null;
		String word="0";
		if(StringUtils.isNotEmpty(id)){
			urlZhiYuan=urlZhiYuanRepository.get(id);
			String xh = urlZhiYuan.getXh();
			String name = urlZhiYuan.getName();
			String finalteacherid = urlZhiYuan.getFinalteacherId();
			String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
			//获取开题第一次周记fileId
	        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
		    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
		    String crstchIdString= crsTchPo.getId();
		    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）").asJava();
		    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
		    String jobId = crsJobPo.getId();
		    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
		    JobStdPo jobStdPo = jobStdRepository.getByCol(map);
		    if(jobStdPo!=null&&jobStdPo.getStatus()==JobStdPo.SUBMITTED){	
		    	JSONObject obj= new JSONObject();
		    	String fileId = jobStdPo.getFile_id_();
			    String fileName = xh+name+"开题准备情况记录.doc";
			    obj.put("fileName", fileName);
				obj.put("id", fileId);  	
				ja = new JSONArray();
				ja.add(obj);
				String comment = jobStdPo.getComment();
				urlZhiYuan.setTd3id(comment);
   	            word="1";
		    }
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("returnUrl", preUrl).addObject("filedownload", ja).addObject("word",word);
	}
    /**
     * 指导教师，基层负责人审阅开题报告
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("kaitiTeacherCheck")
	public ModelAndView kaitiTeacherCheck(HttpServletRequest request, HttpServletResponse response) throws Exception {    		
    	String id = RequestUtil.getString(request, "id");
    	String tch = RequestUtil.getString(request, "tch");
    	UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
    	JSONArray ja = null;
    	JSONObject obj= new JSONObject();
    	String xh = urlZhiYuanPo.getXh(); 
	    String name = urlZhiYuanPo.getName();
	    String fileId = urlZhiYuanPo.getKaitifile();
	    String fileName = xh+name+"开题报告.doc";
	    urlZhiYuanPo.setTd3(null);
	    obj.put("fileName", fileName);
		obj.put("id", fileId);
		ja = new JSONArray();
		ja.add(obj);
    	
    	return this.getAutoView().addObject("urlZhiYuan",urlZhiYuanPo).addObject("filedownload", ja).addObject("tch", tch);
    	
    }
    /**
	 * 教师查看答辩小组
	 *
	 * @param request
	 * @param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("tchSee")
	public ModelAndView tchSee(HttpServletRequest request, HttpServletResponse response) throws Exception {
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String whereSql="ID_='"+userId+"'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<PartyEmployeePo>  emplist=partyEmployeeRepository.query(paramQueryFilter);
		PartyEmployeePo emp =  emplist.get(0);	
//		for (PartyEmployeePo partyEmployeePo : emplist) {
//			System.err.println(partyEmployeePo);
//		}
		String empposid=emp.getPositions();
		String empname=emp.getName();
//		System.err.println("empposid"+empposid);
	    whereSql="ID_='"+empposid+"'";
	    paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<PartyPositionPo> poslist=partyPositionRepository.query(paramQueryFilter);
		PartyPositionPo pos = poslist.get(0);	
		String ktname=pos.getName();
		KaitiGroupPo ktgroup=kaitiGroupRepository.getBydbgroup(empposid);
		String date = new SimpleDateFormat("yyyy-MM-dd").format(ktgroup.getDaBianShiJian());
		return getAutoView().addObject("ktxz", ktname).addObject("name",empname).addObject("kaitipo",ktgroup).addObject("date",date);

	}
	
	@RequestMapping("job_bysj")
	public ModelAndView job_bysj (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type = RequestUtil.getString(request, "type");
		User user = currentContext.getCurrentUser();
		String account = user.getAccount();
		String crsTchId = account+"2014bysj";
		String crsName = "2014级毕业设计";
		String reqUrl="";
		if(type.equals("0"))
			 reqUrl ="/gradp/course/crsTch/listMyStudents.htm?crsTchId="+crsTchId+"&crsName="+crsName;
		else if(type.equals("1"))
			reqUrl ="/gradp/course/crsJob/list.htm?crsTchId="+ crsTchId + "&crsName="+crsName;
		 return new ModelAndView("redirect:"+reqUrl);
	}
	
	@RequestMapping("student_bysj")
	public ModelAndView student_bysj (HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String account = user.getAccount();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.getByCol("xh", account);
		String finalteacherId = urlZhiYuanPo.getFinalteacherId();
		PartyEntityPo partyEntityPo = partyEntityRepository.get(finalteacherId);
		String tch = partyEntityPo.getAlias();
		String crsTchId = tch+"2014bysj";
	    String reqUrl="/gradp/course/jobStd/markScore.htm?role=std&stdNum="+account+"&crsTchId="+crsTchId;
		return new ModelAndView("redirect:"+reqUrl);
	}
    
	
	@RequestMapping("labeldialog")
	public ModelAndView labeldialog(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("labelTypeList", labelTypePos);
	}
	
	private List<LabelTypePo> getLabelType(CurrentContext currentContext) {
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		String whereSql = "org_id_ = " + orgId;
		List<LabelTypePo> labelTypePos = labelTypeRepository.findBySql(whereSql);
			return labelTypePos;
	}
	
    @RequestMapping("exportLiTiShu")
	public void exportLiTiShu(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
    	FileUtil.createFolderFile(filePath);
    	//创建目录结构
//    	File dir = new File(filePath);
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	List<String> urlIds = new ArrayList<>();
    	Set<String> classxxSet = new HashSet<>();
    	for (UrlZhiYuanPo e : urlZhiYuanPos) {
    		urlIds.add(e.getId());
			classxxSet.add(e.getClassr());
			
		}
    	for (String classxx : classxxSet) {
			String classxxDir = filePath + "\\" + classxx + "\\";
			FileUtil.createFolderFile(classxxDir);
		}
//    	String[] urlIds = RequestUtil.getString(request, "id").split(",");
    	List<String> fileNames = new ArrayList<>();
		this.getUploadService();
		UrlZhiYuanPo urlZhiYuanPo = null;
		int i = 0;
		for (String urlId : urlIds) {
			urlZhiYuanPo = urlZhiYuanRepository.get(urlId);
			//得到班级目录
			String classxx = urlZhiYuanPo.getClassr();
			String classxxDir = filePath + "\\" + classxx + "\\";
			
			String stuNum = urlZhiYuanPo.getXh();
			String stuName = urlZhiYuanPo.getName();
			String mentor = urlZhiYuanPo.getFinalteacher();
			mentor = mentor.replace("/", "--");
			
			String liTishuId = urlZhiYuanPo.getLitishufile();
			FileInfo fileInfo = uploadService.downloadFile(liTishuId);
			if (BeanUtils.isNotEmpty(fileInfo)) {
				byte[] fileBlob = fileInfo.getFileBytes();
				InputStream in = new ByteArrayInputStream(fileBlob);
				String file = classxxDir+ stuNum + "--" + stuName +"--" + mentor + ".doc";
				FileUtil.writeFile(file,in);
				i++;
			}
		}
		FileUtil.zip(filePath,false);	
		FileUtil.downLoadFile(request, response, filePath +".zip", "立题书.zip");
		File file = new File(filePath);
		System.out.println("数目 : "  + i);
		FileUtil.deleteDir(file);
    }
    
    @RequestMapping("getRWS")
	public void getRWS(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	int i =0;
    	for (UrlZhiYuanPo urlZhiYuanPo : urlZhiYuanPos) {
        	String ctx = request.getSession().getServletContext().getRealPath("");
        	String str = urlZhiYuanPo.getZyckzl();
    		String xh = urlZhiYuanPo.getXh();
        	String name = urlZhiYuanPo.getName();
    		String finaltdid = urlZhiYuanPo.getFinaltdId();
    		TeacherAndStudentPo teacherAndStudentPo = teacherAndStudentRepository.get(finaltdid);
    		String tchId = teacherAndStudentPo.getTeacherId();
    		String oldJs3Id = urlZhiYuanPo.getJs3id();
    		urlZhiYuanPo.setJs3id( partyEmployeeRepository.get(tchId).getName() );
    		if(str.contains("<")||str.contains(">")||str.contains("&")){  
                str=str.replaceAll("&", "&amp;");  
                str=str.replaceAll("<", "&lt;");  
                str=str.replaceAll(">", "&gt;");  
                urlZhiYuanPo.setZyckzl(str);
    		}
    		Map map = new HashMap();
    	    map.put("po",urlZhiYuanPo);
    	    byte[] fbs = TemplateParseUtil.parse( ctx+"/WordWorkspace/ftl/" , "renwushu04.ftl" ,map);
        	// 初始化上传Service
        	this.getUploadService();   	
        	String fileName = xh+name+"任务书_01.doc";
        	long size = fbs.length;
        	//转为文件输入流
        	InputStream fis =  new ByteArrayInputStream(fbs);     	
        	Map<String,Object> params = new HashMap<String,Object>();
    		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
    		params.put(FileParam.FILE_SIZE, size );        	
    		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
    		String fid = fileInfo.getId();
    		urlZhiYuanPo.setRenwushufile(fid);
    		urlZhiYuanPo.setJs3id(oldJs3Id);
    		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
    		urlZhiYuan.save();
    		i++;
		}
    	System.out.println("数目：" + i);

    }

    @RequestMapping("getLTS")
	public void getLTS(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	int i = 0;
    	for (UrlZhiYuanPo urlZhiYuanPo : urlZhiYuanPos) {
    		UrlZhiYuanPo urlPo = urlZhiYuanPo;//应该这么使用
        	String ctx = request.getSession().getServletContext().getRealPath("");
    		String xh = urlZhiYuanPo.getXh();
        	String name = urlZhiYuanPo.getName();
    		String str = urlZhiYuanPo.getZyckzl();
    		String oldStr = str;
    		if(str.contains("<")||str.contains(">")||str.contains("&")){  
                str=str.replaceAll("&", "&amp;");  
                str=str.replaceAll("<", "&lt;");  
                str=str.replaceAll(">", "&gt;");  
                urlZhiYuanPo.setZyckzl(str);
    		}
    		//得到审核教师id
    		String shjsid = urlZhiYuanPo.getJs3id();
    		String jsname = partyEmployeeRepository.get(shjsid).getName();
    		urlZhiYuanPo.setJs3id(jsname);
    		//得到申报时间，提交日期和审核日期
    		String dateT = "2017-11";
    		List<String> sbDate = new ArrayList<String>();
    		List<String> tjDate = new ArrayList<String>();
    		List<String> shDate = new ArrayList<String>();
    		for (int j = 6; j < 15; j++) {
				sbDate.add(dateT + "-" + j+ "");
			}
    		for (int j = 15; j < 19; j++) {
    			tjDate.add(j+ "");
			}
    		for (int j = 23; j < 27; j++) {
    			shDate.add(j+ "");
			}
    		Random rand = new Random();  
    		String Oldtd1 = urlZhiYuanPo.getTd1();
    		String Oldtd2 = urlZhiYuanPo.getTd2();
    		String Oldtd3 = urlZhiYuanPo.getTd3();
    		urlZhiYuanPo.setTd1( sbDate.get( rand.nextInt(sbDate.size()) ) );
    		urlZhiYuanPo.setTd2( tjDate.get( rand.nextInt(tjDate.size()) ) );
    		urlZhiYuanPo.setTd3( shDate.get( rand.nextInt(shDate.size()) ) );
    		Map map = new HashMap();
    	    map.put("po",urlZhiYuanPo);
    	    //byte[] fbs = this.f( ctx+"/WordWorkspace/ftl/" , "templateFinal4.ftl" ,map);
    	    byte[] fbs = this.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "litishu07.ftl");
        	// 初始化上传Service
        	this.getUploadService();   	
        	String fileName = xh+name+"立题书_01.doc";
        	long size = fbs.length;
        	//转为文件输入流
        	InputStream fis =  new ByteArrayInputStream(fbs);     	
        	Map<String,Object> params = new HashMap<String,Object>();
    		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
    		params.put(FileParam.FILE_SIZE, size );        	
    		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
    		String fid = fileInfo.getId();
    		urlZhiYuanPo.setLitishufile(fid);
    		//还原审核教师id
    		urlZhiYuanPo.setJs3id(shjsid);
    		urlZhiYuanPo.setZyckzl(oldStr);
    		urlZhiYuanPo.setTd1(Oldtd1);
    		urlZhiYuanPo.setTd2(Oldtd2);
    		urlZhiYuanPo.setTd3(Oldtd3);
    		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
    		urlZhiYuan.save();
    		i++;
		}

    	System.out.println("数目：" + i);
    }

	@RequestMapping("getRENWUSHU")
	public void getRENWUSHU(HttpServletRequest request,HttpServletResponse response) throws Exception {
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath);
		//创建目录结构
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
		List<String> urlIds = new ArrayList<>();
		Set<String> classxxSet = new HashSet<>();
		for (UrlZhiYuanPo e : urlZhiYuanPos) {
			urlIds.add(e.getId());
			classxxSet.add(e.getClassr());

		}
		for (String classxx : classxxSet) {
			String classxxDir = filePath + "\\" + classxx + "\\";
			FileUtil.createFolderFile(classxxDir);
		}
		List<String> fileNames = new ArrayList<>();
		this.getUploadService();
		UrlZhiYuanPo urlZhiYuanPo = null;
		int i = 0;
		for (String urlId : urlIds) {
			urlZhiYuanPo = urlZhiYuanRepository.get(urlId);
			//得到班级目录
			String classxx = urlZhiYuanPo.getClassr();
			String classxxDir = filePath + "\\" + classxx + "\\";

			String stuNum = urlZhiYuanPo.getXh();
			String stuName = urlZhiYuanPo.getName();
			//String mentor = urlZhiYuanPo.getFinalteacher();
			//mentor = mentor.replace("/", "--");

			//导出任务书内容
			String str = urlZhiYuanPo.getZyckzl();
			if(str.contains("<")||str.contains(">")||str.contains("&")){
				str=str.replaceAll("&", "&amp;");
				str=str.replaceAll("<", "&lt;");
				str=str.replaceAll(">", "&gt;");
				urlZhiYuanPo.setZyckzl(str);
			}
			Map map = new HashMap();
			map.put("po",urlZhiYuanPo);
			String ctx = request.getSession().getServletContext().getRealPath("");
			byte[] fbs = this.fmWord(urlZhiYuanPo,ctx+"/WordWorkspace/ftl/" , "renwushu04.ftl" );
			InputStream fis =  new ByteArrayInputStream(fbs);    //转为文件输入流
			String fileName = classxxDir+stuNum+ "--" +stuName+ "--" +"任务书.doc";
			FileUtil.writeFile(fileName,fis);
			i++;
		}
		FileUtil.zip(filePath,false);
		FileUtil.downLoadFile(request, response, filePath +".zip", "任务书.zip"); //下载文件
		File file = new File(filePath);
		System.out.println("数目 : "  + i);
		FileUtil.deleteDir(file);  //删除目录
	}

	@RequestMapping("getKAITIBAOGAO")
	public void getKAITI(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath);
		//创建目录结构
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
		List<String> urlIds = new ArrayList<>();
		Set<String> classxxSet = new HashSet<>();
		for (UrlZhiYuanPo e : urlZhiYuanPos) {
			urlIds.add(e.getId());
			classxxSet.add(e.getClassr());

		}
		for (String classxx : classxxSet) {
			String classxxDir = filePath + "\\" + classxx + "\\";
			FileUtil.createFolderFile(classxxDir);
		}
		List<String> fileNames = new ArrayList<>();
		this.getUploadService();
		UrlZhiYuanPo urlZhiYuanPo = null;
		int i = 0;
		for (String urlId : urlIds) {
			urlZhiYuanPo = urlZhiYuanRepository.get(urlId);
			//得到班级目录
			String classxx = urlZhiYuanPo.getClassr();
			String classxxDir = filePath + "\\" + classxx + "\\";

			String stuNum = urlZhiYuanPo.getXh();
			String stuName = urlZhiYuanPo.getName();
			//String mentor = urlZhiYuanPo.getFinalteacher();
			//mentor = mentor.replace("/", "--");

			//导出开题报告内容
			String str = urlZhiYuanPo.getZyckzl();
			if(str.contains("<")||str.contains(">")||str.contains("&")){
				str=str.replaceAll("&", "&amp;");
				str=str.replaceAll("<", "&lt;");
				str=str.replaceAll(">", "&gt;");
				urlZhiYuanPo.setZyckzl(str);
			}
			Map map = new HashMap();
			map.put("po",urlZhiYuanPo);
			String ctx = request.getSession().getServletContext().getRealPath("");
			byte[] fbs = this.fmWord(urlZhiYuanPo,ctx+"/WordWorkspace/ftl/" , "kaiti.ftl" );
			InputStream fis =  new ByteArrayInputStream(fbs);    //转为文件输入流
			String fileName = classxxDir+stuNum+ "--" +stuName+ "--" +"开题报告.doc";
			FileUtil.writeFile(fileName,fis);
			i++;
		}
		FileUtil.zip(filePath,false);
		FileUtil.downLoadFile(request, response, filePath +".zip", "开题报告.zip"); //下载文件
		File file = new File(filePath);
		System.out.println("数目 : "  + i);
		FileUtil.deleteDir(file);  //删除目录
	}

    @RequestMapping("getLiTISHU")
	public void getLiTISHU(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
    	FileUtil.createFolderFile(filePath);
    	//创建目录结构
//    	File dir = new File(filePath);
    	List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
    	List<String> urlIds = new ArrayList<>();
    	Set<String> classxxSet = new HashSet<>();
    	for (UrlZhiYuanPo e : urlZhiYuanPos) {
    		urlIds.add(e.getId());
			classxxSet.add(e.getClassr());
			
		}
    	for (String classxx : classxxSet) {
			String classxxDir = filePath  + "\\" + classxx + "\\";
			FileUtil.createFolderFile(classxxDir);
		}
    	List<String> fileNames = new ArrayList<>();
		this.getUploadService();
		UrlZhiYuanPo urlZhiYuanPo = null;
		int i = 0;
		for (String urlId : urlIds) {
			urlZhiYuanPo = urlZhiYuanRepository.get(urlId);
			//得到班级目录
			String classxx = urlZhiYuanPo.getClassr();
			String classxxDir = filePath.trim() + "\\" + classxx.trim() + "\\";
			
			String stuNum = urlZhiYuanPo.getXh();
			String stuName = urlZhiYuanPo.getName();
			String mentor = urlZhiYuanPo.getFinalteacher();
			mentor = mentor.replace("/", "--");
			
			//导出立题书内容
			
			String str = urlZhiYuanPo.getZyckzl();
			if(str.contains("<")||str.contains(">")||str.contains("&")){  
	            str=str.replaceAll("&", "&amp;");  
	            str=str.replaceAll("<", "&lt;");  
	            str=str.replaceAll(">", "&gt;");  
	            urlZhiYuanPo.setZyckzl(str);
			}
			Map map = new HashMap();
		    map.put("po",urlZhiYuanPo);
		    String ctx = request.getSession().getServletContext().getRealPath("");
		    byte[] fbs = this.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "templateFinal4.ftl");

		    InputStream in = new ByteArrayInputStream(fbs);
			String file = classxxDir+ stuNum + "--" + stuName +"--" + mentor + ".doc";
			FileUtil.writeFile(file,in);
			i++;

		}
		FileUtil.zip(filePath,false);	
		FileUtil.downLoadFile(request, response, filePath +".zip", "立题书.zip");
		File file = new File(filePath);
		System.out.println("数目 : "  + i);
		FileUtil.deleteDir(file);
    }
    
    @RequestMapping("testBB")
	public void testBB(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	String ctx = request.getSession().getServletContext().getRealPath("");
    	//第一步，读取报表模板
    	File raqFile = new File(ctx+"/WordWorkspace/raq/zhidaojiaships.raq");
    	InputStream fis = new FileInputStream(raqFile);
    	ReportDefine rd = (ReportDefine) ReportUtils.read(fis);
    	
    	//第二步，运算报表
    	Context context = new Context();
    	Engine enging = new Engine(rd, context);
    	IReport iReport = enging.calc();
    	context.setParamValue("arg1", "369433450031087616");
    	//生成word
    	WordReport word  = new WordReport();
    	word.export(iReport);
    	word.saveTo("D:/test"+".doc");
    }
    
	/**
	 * 学生申请最终答辩资格
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("studentApply")
	public ModelAndView studentApply(HttpServletRequest request,HttpServletResponse response) throws Exception{
		int normalPaperFlag = 1;
		int anonymousPaperFlag = 1;
		String id = RequestUtil.getString(request, "id");
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		String normalPaperId = paperInfo.getNormalPaperId();
		String anonymousPaperId = paperInfo.getAnonymousPaperId();
		
		if (StringUtils.isBlank(normalPaperId) || StringUtils.isBlank(anonymousPaperId)) {
			
			String xh = paperInfo.getXh();
			String finalteacherid = paperInfo.getFinalteacherId();
			String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
		    
			if (StringUtils.isBlank(normalPaperId)) {
				//从作业管理系统中获取
		        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
			    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
			    String crstchIdString= crsTchPo.getUniManage();
			    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "最终答辩论文").asJava();
			    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
			    String jobId = crsJobPo.getId();
			    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
			    JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
			    if (jobStdPo != null && StringUtils.isNotBlank(jobStdPo.getFile_id_()) ) {
					paperInfo.setNormalPaperId( jobStdPo.getFile_id_() );
				}else {
					normalPaperFlag = 0; //表示正常论文未提交
				}
			}
			
			if (StringUtils.isBlank(anonymousPaperId)) {
				//从作业管理系统中获取
		        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
			    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
			    String crstchIdString= crsTchPo.getUniManage();
			    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "最终答辩论文").asJava();
			    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
			    String jobId = crsJobPo.getId();
			    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
			    JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
			    if (jobStdPo != null && StringUtils.isNotBlank(jobStdPo.getFile_id_()) ) {
					paperInfo.setAnonymousPaperId( jobStdPo.getFile_id_() );
				}else {
					anonymousPaperFlag = 0; //表示正常论文未提交
				}
			}
			urlZhiYuanRepository.newInstance(paperInfo).save();
		}

		normalPaperId = paperInfo.getNormalPaperId();
		anonymousPaperId = paperInfo.getAnonymousPaperId();

		JSONArray normalPaperIdja =  new JSONArray();
		JSONArray anonymousPaperIdja =  new JSONArray();
    	JSONObject normalPaperIdJo= new JSONObject();
    	JSONObject anonymousPaperIdJo= new JSONObject();
    	String xh = paperInfo.getXh();
    	String name = paperInfo.getName();
    	if (StringUtils.isNotBlank(normalPaperId)) {
   		 	String fileName = xh+name+"答辩论文.doc";
   		 	normalPaperIdJo.put("fileName", fileName);
   		 	normalPaperIdJo.put("id", normalPaperId);
   		 	normalPaperIdja.add(normalPaperIdJo);
		}
    	if (StringUtils.isNotBlank(anonymousPaperId)) {
   		 	String fileName = "答辩论文.doc";
   		 	anonymousPaperIdJo.put("fileName", fileName);
   		 	anonymousPaperIdJo.put("id", anonymousPaperId);
   		 	anonymousPaperIdja.add(anonymousPaperIdJo);
		}
		return getAutoView().addObject("urlZhiYuan", paperInfo).addObject("normalFileDownload", normalPaperIdja)
				.addObject("anonymousFileDownload", anonymousPaperIdja).addObject("normalPaperFlag",normalPaperFlag)
				.addObject("anonymousPaperFlag",anonymousPaperFlag);
	}

	@RequestMapping("tchReview")
	public ModelAndView tchReview(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String role = "";
		int fileType = 0 ;
		String id = RequestUtil.getString(request, "id");
		String flag = RequestUtil.getString(request, "flag");
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
    	String xh = paperInfo.getXh();
    	String name = paperInfo.getName();
    	String tmmc = paperInfo.getTmmc();
		String user = currentContext.getCurrentUserId();
		JSONArray ja = new JSONArray();
		JSONObject jo = new JSONObject();
		String status = "";
		int stayusFlag = 0;
		if (user.equals(paperInfo.getFinalteacherId())) {
			status = getPaperInfo(id,"normal");
			paperInfo = urlZhiYuanRepository.get(id);
   		 	String fileName = xh+name+"答辩论文.doc";
   		 	jo.put("fileName", fileName);
   		 	jo.put("id", paperInfo.getNormalPaperId());
   		 	ja.add(jo);
   		 	role = "finalTch";
   		 	fileType = 3;
		}
		if (user.equals(paperInfo.getJudgeTch())) {
			status = getPaperInfo(id,"anonymous");
			paperInfo = urlZhiYuanRepository.get(id);
   		 	String fileName = tmmc+".doc";
   		 	jo.put("fileName", fileName);
   		 	jo.put("id", paperInfo.getAnonymousPaperId());
   		 	ja.add(jo);
   		 	role = "judgeTch";
   		 	fileType = 4;
		}
		if (status.equals("succuss"))
			stayusFlag = 1;
		if (status.equals("unUpload"))
			stayusFlag = 0;
		return getAutoView().addObject("urlZhiYuan", paperInfo).addObject("filedownload",ja)
				.addObject("role",role).addObject("fileType",fileType)
				.addObject("statusFlag",stayusFlag).addObject("flag",flag);
	}

	private String getPaperInfo(String id, String type) {
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		String normalPaperId = paperInfo.getNormalPaperId();
		String anonymousPaperId = paperInfo.getAnonymousPaperId();
		if (type.equals("normal")){
			if (StringUtils.isNotBlank(normalPaperId) ){
				return "succuss";
			}else {
				String xh = paperInfo.getXh();
				String finalteacherid = paperInfo.getFinalteacherId();
				String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
				//从作业管理系统中获取
				Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
				CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
				String crstchIdString= crsTchPo.getUniManage();
				map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "上传正常版本论文（供指导教师评阅）").asJava();
				CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
				String jobId = crsJobPo.getId();
				map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
				JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
				if (jobStdPo != null && StringUtils.isNotBlank(jobStdPo.getFile_id_()) ) {
					paperInfo.setNormalPaperId( jobStdPo.getFile_id_() );
				}else {
					return "unUpload"; //表示正常论文未提交
				}
			}
		}
		if (type.equals("anonymous")){
			if (StringUtils.isNotBlank(anonymousPaperId) ){
				return "succuss";
			}else {
				String xh = paperInfo.getXh();
				String finalteacherid = paperInfo.getFinalteacherId();
				String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
				//从作业管理系统中获取
				Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
				CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
				String crstchIdString= crsTchPo.getUniManage();
				map = ExMap.newInstance()
						.add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=",   "匿名版论文（供评阅教师评阅）").asJava();
				CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
				String jobId = crsJobPo.getId();
				map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
				JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
				if (jobStdPo != null && StringUtils.isNotBlank(jobStdPo.getFile_id_()) ) {
					paperInfo.setAnonymousPaperId( jobStdPo.getFile_id_() );
				}else {
					return "unUpload"; //表示正常论文未提交
				}
			}
		}
		urlZhiYuanRepository.newInstance(paperInfo).save();
		return "succuss";
	}

	@RequestMapping("stuLookIsDb")
	public ModelAndView stuLookIsDb(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id = RequestUtil.getString(request, "id");
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		return getAutoView().addObject("urlZhiYuan", paperInfo);
	}

	@RequestMapping("studentReupload")
	public ModelAndView studentReupload(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id = RequestUtil.getString(request, "id");
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		int normalFlge = 0;
		int anonymousFlge = 0;

		JSONArray normalJa = new JSONArray();
		JSONArray anonymousJa = new JSONArray();
		JSONObject normaljo = new JSONObject();
		JSONObject anonymousjo = new JSONObject();
		String xh  = paperInfo.getXh();
		String name = paperInfo.getName();
		String tmmc = paperInfo.getTmmc();
		if (("反对").equals(paperInfo.getFinalTchOpinion())) {
			String fileName = xh+name+"答辩论文.doc";
			normaljo.put("fileName", fileName);
			normaljo.put("id", paperInfo.getNormalPaperId());
			normalJa.add(normaljo);
			normalFlge = 1;
		}
		if (("反对").equals(paperInfo.getJudgeTchOpinion())) {
			String fileName = tmmc + ".doc";
			anonymousjo.put("fileName", fileName);
			anonymousjo.put("id", paperInfo.getAnonymousPaperId());
			anonymousJa.add(anonymousjo);
			anonymousFlge = 1;
		}
		return getAutoView().addObject("urlZhiYuan",paperInfo).addObject("normalFlge",normalFlge)
				.addObject("anonymousFlge",anonymousFlge)
				.addObject("normalFileDownload",normalJa).addObject("anonymousFileDownload",anonymousJa);
	}

	@RequestMapping("setJudgeTch")
	public void setJudgeTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String id = request.getParameter("id");
		String tchId = request.getParameter("tchIds");
		if (tchId.indexOf(',') != -1){
			jo.put("status",false);
			jo.put("msg","只能选择一位盲审教师");
			response.getWriter().println(jo);
			return;
		}

		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		paperInfo.setJudgeTch(tchId);
		paperInfo.setJudgeTchName(partyEmployeeRepository.get(tchId).getName());
		urlZhiYuanRepository.newInstance(paperInfo).save();
		jo.put("status",true);
		jo.put("msg","盲审教师修改成功");
		response.getWriter().println(jo);
	}

	@RequestMapping("stuSeeAudit")
	public ModelAndView stuSeeAudit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		PartyUserPo partyUserPo = partyUserRepository.get(userId);
		String xh = partyUserPo.getAccount();
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(userId)){
			urlZhiYuan=urlZhiYuanRepository.getByCol("xh", xh);
		}
		int normalFlge = 0;
		int anonymousFlge = 0;

		JSONArray normalJa = new JSONArray();
		JSONArray anonymousJa = new JSONArray();
		JSONObject normaljo = new JSONObject();
		JSONObject anonymousjo = new JSONObject();
		String name = urlZhiYuan.getName();
		String tmmc = urlZhiYuan.getTmmc();

		String normalPaperId = urlZhiYuan.getNormalPaperId();
		if (StringUtils.isNotBlank(normalPaperId) && !("null").equals(normalPaperId)){
			String fileName = xh+name+"答辩论文.doc";
			normaljo.put("fileName", fileName);
			normaljo.put("id", urlZhiYuan.getNormalPaperId());
			normalJa.add(normaljo);
			normalFlge = 1;
		}

		String anonymousPaperId = urlZhiYuan.getAnonymousPaperId();
		if (StringUtils.isNotBlank(anonymousPaperId) && !("null").equals(anonymousPaperId)){
			String fileName1 = tmmc + ".doc";
			anonymousjo.put("fileName", fileName1);
			anonymousjo.put("id", urlZhiYuan.getAnonymousPaperId());
			anonymousJa.add(anonymousjo);
			anonymousFlge = 1;
		}


		return getAutoView().addObject("urlZhiYuan", urlZhiYuan).addObject("normalFlge",normalFlge)
				.addObject("anonymousFlge",anonymousFlge)
				.addObject("normalFileDownload",normalJa).addObject("anonymousFileDownload",anonymousJa);
	}

	@RequestMapping("stuSeeDbBatch")
	public ModelAndView stuSeeDbBatch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		PartyUserPo partyUserPo = partyUserRepository.get(userId);
		String xh = partyUserPo.getAccount();
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(userId)){
			urlZhiYuan=urlZhiYuanRepository.getByCol("xh", xh);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan);
	}

	/**
	 * 保存答辩成绩
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveDbGrade")
	public void saveDbGrade(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlZhiYuanPo urlZhiYuanPo = getFromRequest(request);

			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(userId);
			Date date = new Date();

			String id =urlZhiYuanPo.getId();
			String oneDb = urlZhiYuanPo.getOneDb();
			String twoDb = urlZhiYuanPo.getTwoDb();
			String threeDb = urlZhiYuanPo .getThreeDb();
			String fourDb = urlZhiYuanPo .getFourDb();
			String fiveDb=urlZhiYuanPo.getFiveDb();
			String masterComment = urlZhiYuanPo.getMasterComment();
			String masterName = partyEmployeePo.getName();

			int totalDb = Integer.parseInt(oneDb) + Integer.parseInt(twoDb) + Integer.parseInt(threeDb) + Integer.parseInt(fourDb)+ Integer.parseInt(fiveDb);

			UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
			po.setOneDb(oneDb);
			po.setTwoDb(twoDb);
			po.setThreeDb(threeDb);
			po.setFourDb(fourDb);
			po.setFiveDb(fiveDb);
			po.setTotalDb(String.valueOf(totalDb));
			po.setMasterComment(masterComment);
			po.setMasterName(masterName);
			po.setMasterData(date);

			//构造领域对象和保存数据
			UrlZhiYuan urlZhiYuan =urlZhiYuanRepository.newInstance(po);
			urlZhiYuan.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "提交答辩成绩成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "提交答辩成绩失败,"+e.getMessage());
			logger.error("提交答辩成绩失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("dbGrade")
	public ModelAndView dbGrade(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id = request.getParameter("id");
		UrlZhiYuanPo urlZhiYuan = urlZhiYuanRepository.get(id);
		String preUrl = "";
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan);
	}

	@RequestMapping("stateGroupUser")
	public void stateGroupUser(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//得到答辩小组
		String groupType = "type_ ='答辩'";
		List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(groupType);
		//得到教师小组关系 学生小组关系
		Map<String,String> userMap = new HashMap<>();
		for (GradGroupPo e : gradGroupPos){
			String groupId = e.getId();
			String tchSql = "group_id_ = '" +groupId+"' and type_='tch'";
			List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(tchSql);
			for (GroupUserPo es : groupUserPos){
				userMap.put(es.getUserId(),es.getGroupId());
			}
			String stuSql = "group_id_ = '" +groupId+"' and type_='stu'";
			List<GroupUserPo> groupUserPos1 = groupUserRepository.getBySql(stuSql);
			for (GroupUserPo es : groupUserPos1){
				userMap.put(es.getUserId(),es.getGroupId());
			}
		}
		//统计在评审教师所在小组的人数
		int i =0 ,j = 0;
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
		for (UrlZhiYuanPo e : urlZhiYuanPos){
			String judegeId = e.getJudgeTch();
			String finalId = e.getFinalteacherId();
			if (userMap.get(judegeId).equals(userMap.get(e.getId()))){
				i++;
			}
			if (userMap.get(finalId).equals(userMap.get(e.getId()))){
				System.out.println(e.getName());
				j++;
			}
		}
		System.out.println("分配在评审教师所在小组人数：" + i);
		System.out.println("分配在指导教师所在小组人数：" + j);
	}


	@RequestMapping("exportDbPPT")
	public void exportDbPPT(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath);
		//创建目录结构
//    	File dir = new File(filePath);
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
		List<String> urlIds = new ArrayList<>();
		Set<String> classxxSet = new HashSet<>();
		for (UrlZhiYuanPo e : urlZhiYuanPos) {
			urlIds.add(e.getId());
			classxxSet.add(e.getClassr());

		}
		for (String classxx : classxxSet) {
			String classxxDir = filePath + "\\" + classxx + "\\";
			FileUtil.createFolderFile(classxxDir);
		}
//    	String[] urlIds = RequestUtil.getString(request, "id").split(",");
		List<String> fileNames = new ArrayList<>();
		this.getUploadService();
		UrlZhiYuanPo urlZhiYuanPo = null;
		int i = 0;
		for (String urlId : urlIds) {
			urlZhiYuanPo = urlZhiYuanRepository.get(urlId);
			//得到班级目录
			String classxx = urlZhiYuanPo.getClassr();
			String classxxDir = filePath + "\\" + classxx + "\\";

			//String stuNum = urlZhiYuanPo.getXh();
			//String stuName = urlZhiYuanPo.getName();


			//得到答辩PPT fileId
			String fileId = "";
			String finalteacherid = urlZhiYuanPo.getFinalteacherId();
			String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();

			String xh = urlZhiYuanPo.getXh();

			if ("2014201407".equals(xh) || "2014061323".equals(xh) || "2014023124".equals(xh)){
				continue;
			}

			Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
			CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
			String crstchIdString= crsTchPo.getUniManage();
			map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "答辩PPT").asJava();
			CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
			String jobId = crsJobPo.getId();
			map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
			JobStdPo jobStdPo = jobStdRepository.getByCol(map);  //为空
			if (jobStdPo != null && StringUtils.isNotBlank(jobStdPo.getFile_id_()) ) {
				if ("null".equals(jobStdPo.getFile_id_())){
					System.out.println(xh);
					continue;
				}else {
					fileId=  jobStdPo.getFile_id_() ;
				}
			}else {
				continue; //表示正常论文未提交
			}

			FileInfo fileInfo = uploadService.downloadFile(fileId);
			if (BeanUtils.isNotEmpty(fileInfo)) {
				byte[] fileBlob = fileInfo.getFileBytes();
				InputStream in = new ByteArrayInputStream(fileBlob);
				String file =   classxxDir + stuNum.get(xh) + "--" + urlZhiYuanPo.getTmmc() + ".ppt"; //名字
				FileUtil.writeFile(file,in);
				i++;
			}
		}
		FileUtil.zip(filePath,false);
		FileUtil.downLoadFile(request, response, filePath +".zip", "答辩ppt.zip");
		File file = new File(filePath);
		System.out.println("数目 : "  + i);
		FileUtil.deleteDir(file);
	}

	@RequestMapping("saveStuTodb")
	public void saveStuTodb(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception{
		stuNum.clear();
		MultipartFile file = request.getFile("xlsFile1");
		InputStream  is = file.getInputStream();
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		List<String> labelNames = new ArrayList<>();  //标签名字列表
		HSSFSheet hssfSheet = null;
		HSSFRow hssfRow = null;
		HSSFCell numCell = null;
		HSSFCell xhCell = null;
		String cellStr = null;
		Map<String , List<String>> rowList = new HashMap<>();
		hssfSheet = hssfWorkbook.getSheetAt(0);
		hssfRow = hssfSheet.getRow(0);
		System.out.println(hssfRow);
		//遍历xls的行
		for (int rowNum = 0; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
			hssfRow = hssfSheet.getRow(rowNum);
			int minColIx = hssfRow.getFirstCellNum();
			int maxColIx = hssfRow.getLastCellNum();
			numCell = hssfRow.getCell( 0 );
			xhCell = hssfRow.getCell(1);
			stuNum.put(getStringVal(xhCell),getStringVal(numCell));
		}
		return;
	}

	static String getStringVal(HSSFCell cell) {
		if (cell == null)
			return "";
		switch (cell.getCellType()) {
			case HSSFCell.CELL_TYPE_BOOLEAN:
				return cell.getBooleanCellValue() ? "TRUE" : "FALSE";
			case HSSFCell.CELL_TYPE_FORMULA:
				return cell.getCellFormula();
			case HSSFCell.CELL_TYPE_NUMERIC:
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				return cell.getStringCellValue();
			case HSSFCell.CELL_TYPE_STRING:
				return cell.getStringCellValue();
			default:
				return "";
		}
	}

	@RequestMapping("stuSeeDbGrade")
	public ModelAndView stuSeeDbGrade(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		PartyUserPo partyUserPo = partyUserRepository.get(userId);
		String xh = partyUserPo.getAccount();
		UrlZhiYuanPo urlZhiYuan=null;
		if(StringUtils.isNotEmpty(userId)){
			urlZhiYuan=urlZhiYuanRepository.getByCol("xh", xh);
		}
		return getAutoView().addObject("urlZhiYuan", urlZhiYuan);
	}

}
    


