
package com.lc.ibps.bishe.group.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
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
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.group.repository.GradGroupRepository;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;
import com.lc.ibps.bishes.groupuser.repository.GroupUserRepository;
import com.lc.ibps.form.form.repository.FormDefRepository;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.utils.DateUtil;
import com.utils.FileUtil;
import com.utils.List2SqlList;
import com.utils.OrgUtil;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;
import com.lc.ibps.bishes.group.persistence.entity.GradeItem;
import com.lc.ibps.bishes.group.domain.GradGroup;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;


/**
 * t_grad_group 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
@Controller
@RequestMapping("/bishe/group/gradGroup/")
public class GradGroupController extends GenericController{
	@Resource
	private GradGroupRepository gradGroupRepository;
	@Resource
	CurrentContext currentContext;
	@Resource
	private PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	private GroupUserRepository groupUserRepository;
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	private FormDefRepository formDefRepository;
	
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	
	Set<String> problemStuSet = new HashSet<>();
	
	List<String> typeList = Arrays.asList("开题", "中期","答辩");
	
	
	
	/**
	 * 【t_grad_group】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		//String type = "";
		String typeFlag = RequestUtil.getString(request, "typeFlag");
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");
		if ("1".equals(typeFlag)) {
			String whereSql = "type_ = '中期'";
			List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(whereSql);
			PageList<GradGroupPo> gradGroupPos2 = new PageList<>(new PageResult(1, gradGroupPos.size(), 1));
			for (GradGroupPo gradGroupPo : gradGroupPos) {
				gradGroupPos2.add(gradGroupPo);
			}
			return new PageJson(gradGroupPos2);
		}	
		if ("2".equals(typeFlag)) {
			String whereSql = "type_ = '答辩'";
			queryFilter.addFilter("type_","答辩",QueryOP.EQUAL);
//			List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(whereSql);
//			PageList<GradGroupPo> gradGroupPos2 = new PageList<>(new PageResult(1, 100, gradGroupPos.size()));
//			for (GradGroupPo gradGroupPo : gradGroupPos) {
//				gradGroupPos2.add(gradGroupPo);
//			}
            PageList<GradGroupPo> gradGroupList=(PageList<GradGroupPo>)gradGroupRepository.query(queryFilter);
            return new PageJson(gradGroupList);
		}
		PageList<GradGroupPo> gradGroupList=(PageList<GradGroupPo>)gradGroupRepository.query(queryFilter);
		//查看
		return new PageJson(gradGroupList);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception{
		return getAutoView().addObject("typeList", typeList);
	}
	
	
	/**
	 * 小组成绩提交情况统计
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonForSta")
	public @ResponseBody PageJson listJsonForSta(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		//String type = "";
		String typeFlag = RequestUtil.getString(request, "typeFlag");
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");
		if ("1".equals(typeFlag)) {
			String whereSql = "type_ = '中期'";
			queryFilter.addFilter("type_", "中期", QueryOP.EQUAL);
			queryFilter.addFilter("org_id_", orgId, QueryOP.EQUAL);
			PageList<GradGroupPo> gradGroupList1=(PageList<GradGroupPo>)gradGroupRepository.query(queryFilter);
			for (GradGroupPo es : gradGroupList1) {
				String groupId = es.getId();
				String groupSql = "group_id_ = '" + groupId + "' and type_ = 'stu'" ;
 				List<GroupUserPo> totaList = groupUserRepository.getBySql(groupSql);
 				List<String> stuIdList = new ArrayList<>();
 				for (GroupUserPo groupUser : totaList) {
					String stuId = groupUser.getUserId();
					stuIdList.add(stuId);
				}
 				String noAuditSql = "id_ in " + List2SqlList.parse(stuIdList) + " and zq_grade_ is null or zq_grade_ = ''";
 				List<UrlZhiYuanPo> noAuditStuList = urlZhiYuanRepository.getBySql(noAuditSql);
 				es.setTotalNum(totaList.size());
 				es.setNoAuditNum(noAuditStuList.size());
			}
			return new PageJson(gradGroupList1);
		}
		if ("2".equals(typeFlag)) {
			queryFilter.addFilter("type_", "答辩", QueryOP.EQUAL);
			PageList<GradGroupPo> gradGroupList1=(PageList<GradGroupPo>)gradGroupRepository.query(queryFilter);
			for (GradGroupPo es : gradGroupList1) {
				String groupId = es.getId();
				String groupSql = "group_id_ = '" + groupId + "' and type_ = 'stu'" ;
 				List<GroupUserPo> totaList = groupUserRepository.getBySql(groupSql);
 				List<String> stuIdList = new ArrayList<>();
 				for (GroupUserPo groupUser : totaList) {
					String stuId = groupUser.getUserId();
					stuIdList.add(stuId);
				}
 				String noAuditSql = "id_ in " + List2SqlList.parse(stuIdList) + " and zq_grade_ is null or zq_grade_ = ''";
 				List<UrlZhiYuanPo> noAuditStuList = urlZhiYuanRepository.getBySql(noAuditSql);
 				es.setTotalNum(totaList.size());
 				es.setNoAuditNum(noAuditStuList.size());
			}
			return new PageJson(gradGroupList1);
		}	
		PageList<GradGroupPo> gradGroupList=(PageList<GradGroupPo>)gradGroupRepository.query(queryFilter);
		//查看
		return new PageJson(gradGroupList);
	}
	
	@RequestMapping("listForSta")
	public ModelAndView listForSta(HttpServletRequest request, HttpServletResponse response) throws Exception{
		int typeFlag = RequestUtil.getInt(request, "typeFlag");
		return getAutoView().addObject("typeFlag", typeFlag);
	}
	
	/**
	 * 编辑【t_grad_group】信息页面
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
		GradGroupPo gradGroup=null;
		String curType = "";
		if(StringUtil.isNotEmpty(id)){
			gradGroup=gradGroupRepository.get(id);
			curType = gradGroup.getType();
		}
		return getAutoView().addObject("gradGroup", gradGroup).addObject("returnUrl", preUrl).addObject("typeList", typeList).addObject("curtype", curType);
	}
	
	/**
	 * 编辑【t_grad_group】信息页面
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
		GradGroupPo gradGroup=null;
		if(StringUtil.isNotEmpty(id)){
			gradGroup=gradGroupRepository.get(id);
		}
		return getAutoView().addObject("gradGroup", gradGroup).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_grad_group】明细页面
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
		GradGroupPo gradGroup=null;
		if(StringUtil.isNotEmpty(id)){
			gradGroup=gradGroupRepository.get(id);
		}
		return getAutoView().addObject("gradGroup", gradGroup).addObject("returnUrl", preUrl);
	}
	
	
	/**
	 * 教师查看且秘书编辑
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getForTch")
	public ModelAndView getForTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String name = user.getFullname();
		
		String type ="";
		int typeFlag = RequestUtil.getInt(request, "type");
		if (typeFlag == 1) {
			type = "中期";
		}
		if (typeFlag == 2) {
			type = "答辩";
		}
		
		//String type = RequestUtil.getString(request, "type");
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");
		
		
		String whereSql = "type_ = 'tch'"  + "and user_id_ = '" + userId + "'";
		List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
		
		GradGroupPo gradGroup=null;
		String sec = "";
		
		if(groupUserPos != null || groupUserPos.size() != 0){
			for (GroupUserPo e : groupUserPos) {
				if (type.equals(gradGroupRepository.get(e.getGroupId()).getType())) {
					gradGroup=gradGroupRepository.get(  e.getGroupId() );
					String secId = gradGroup.getSecId();
					if (type.equals("中期")&&userId.equals(secId)) {
						sec = "sec";
					}
				}
			}
			
		}
		return getAutoView().addObject("gradGroup", gradGroup).addObject("returnUrl", preUrl)
				.addObject("tchName",name).addObject("role", sec).addObject("type",type);
	}
	
	/**
	 * 教师查看且秘书编辑
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getForStu")
	public ModelAndView getForStu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		User user = currentContext.getCurrentUser();
		String name = user.getFullname();
		String userId = user.getUserId();
		String xh = user.getAccount();
		String xhSql = "xh = " + "'" + xh + "'";
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(xhSql);
		if (urlZhiYuanPos.size() != 0) {
			userId = urlZhiYuanPos.get(0).getId();
		}
		
		//String type = RequestUtil.getString(request, "type");
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");
		
		String type ="";
		int typeFlag = RequestUtil.getInt(request, "type");
		if (typeFlag == 1) {
			type = "中期";
		}
		
		String whereSql = "type_ = 'stu'"  + "and user_id_ = '" + userId +"'";
		List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
		
		GradGroupPo gradGroup=null;
		
		if(groupUserPos != null || groupUserPos.size() != 0){
			for (GroupUserPo e : groupUserPos) {
				if (type.equals(gradGroupRepository.get(e.getGroupId()).getType())) {
					gradGroup=gradGroupRepository.get(  e.getGroupId() );
				}
			}
			
		}
		return getAutoView().addObject("gradGroup", gradGroup).addObject("returnUrl", preUrl).addObject("stuName",name);
	}
	
	/** 
	 * 保存【t_grad_group】信息
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			String orgId = "";
			List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
			if (orgIds.size() == 1) {
				orgId = orgIds.get(0).getOrgID();
			}else {
				message=new ResultMessage(ResultMessage.FAIL, "添加小组操作失败,未获得管理员权限");
				writeResultMessage(response.getWriter(), message);
				return;
			}
			GradGroupPo gradGroupPo = getFromRequest(request);
			gradGroupPo.setOrgId(orgId);
			gradGroupPo.setTerm(DateUtil.getCurTerm());
			//构造领域对象和保存数据
			GradGroup gradGroup =gradGroupRepository.newInstance(gradGroupPo);
			gradGroup.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_grad_group成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_grad_group操作失败,"+e.getMessage());
			logger.error("对t_grad_group操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private GradGroupPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		String date = (String)jsonObj.get("data");
		if (("").equals(date) || date == null) {
			jsonObj.put("data", null);
		}
		System.out.println(jsonObj);
		String[] dateFormats = new String[] {"yyyy-MM-dd"}; 
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats)); 
		
		GradGroupPo gradGroupPo = getGradGroupPo(jsonObj);

		return gradGroupPo;
	}
	
	/** 
	 * 获取t_grad_group数据
	 *
	 * @param jsonObj
	 */
	private GradGroupPo getGradGroupPo(JSONObject jsonObj){
		GradGroupPo gradGroupPo = (GradGroupPo) JsonUtil.getDTO(jsonObj.toString(), GradGroupPo.class);
		return gradGroupPo;
	}
	
	
	/**
	 *  批量删除【t_grad_group】记录
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
			GradGroup gradGroup =gradGroupRepository.newInstance();
			gradGroup.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_grad_group成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_grad_group失败，" + e.getMessage());
			logger.error("删除t_grad_group失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  保存小组信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveGroupData")
	public void saveGroupData(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			//获得信息
			String groupId = request.getParameter("groupId");
			String date = request.getParameter("date");
			String time = request.getParameter("time");
			String place = request.getParameter("place");
			GradGroupPo gradGroupPo = gradGroupRepository.get(groupId);
			gradGroupPo.setDate(sdf.parse(date));
			gradGroupPo.setTime(time);
			gradGroupPo.setPlace(place);
			gradGroupRepository.newInstance(gradGroupPo).save();
			jo.put("status", true);
			jo.put("msg", "更新信息成功");
		} catch (Exception e) {
			logger.error(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "更新信息失败");
		}
		response.getWriter().println(jo);
	}
	
	
	@RequestMapping("listForGradeItem")
	public ModelAndView listForGradeItem(HttpServletRequest request, HttpServletResponse response) throws Exception{
		int typeFlag = RequestUtil.getInt(request, "typeFlag");
		String formkey = RequestUtil.getString(request, "formkey");
		
		return getAutoView().addObject("typeFlag", typeFlag).addObject("formkey", formkey);
	}
	
	@RequestMapping("problemStu")
	public void problemStu(HttpServletRequest request, HttpServletResponse response) throws Exception{
			JSONObject jo = new JSONObject();
			jo.put("data",problemStuSet);
			response.getWriter().println(jo);
	}
	
	//统计该学生的中期或者答辩成绩  此方法还能重构
	@RequestMapping("listJsonForGradeItem")
	public @ResponseBody PageJson listJsonForGradeItem (HttpServletRequest request,HttpServletResponse response) throws Exception{
	/*	String FormKey ="bysjzqjc"; //bysj_ktqk
*/		//String FormKey = request.getParameter("formkey");
		String FormKey = RequestUtil.getString(request, "formkey");
		List<String> gradeList =  Arrays.asList("A", "B", "C", "D");
		List<String> NogradeStu = Arrays.asList();
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		String whereSql = "orgId = '" + orgId +"'";
		Map<String, Map<String, Integer>> itemGradeMap = new HashMap<>(); //表示xx项的xx等级有xx人
		Map<String, Map<String, String>> itemDescMap = new HashMap<>();   //表示xx项的xx等级的含义是xx
		Map<String, String> itemMap = new HashMap<>();					//表示xx项的名称是xx
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
		int flag = 0;
		for (UrlZhiYuanPo es : urlZhiYuanPos) {
			byte[] blobJson =null;
			if (FormKey.equals("bysjzqjc")){
				blobJson = es.getZqGrade();	
			}
			else {
				if (FormKey.equals("bysj_ktqk")){
					String xh = es.getXh();
					String finalteacherid = es.getFinalteacherId();
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
				    if (jobStdPo.getStatus()!=JobStdPo.SUBMITTED){
						NogradeStu.add(es.getName()); //统计未评价学生名单				    	
				    }
				    
				    String blobJsonStr = jobStdPo.getJson();
				    if (blobJsonStr != null) {
				    	 blobJson = blobJsonStr.getBytes();
					}else {

						continue;
					}
						
				}
				
			}
			
			if (blobJson!=null && blobJson.length != 0) {
				JSONObject json=JSONObject.fromObject(new String(blobJson));	
				if (flag == 0) {
					JSONArray fields = formDefRepository.getFields(FormKey);  //bysjzqjc是表单名称，应从id取，但当初没有设计好，故在此写死。
					//得到评分项
					for (Object field : fields) {
						JSONObject fieldJson = ((JSONObject)field);
						if ( ("radio").equals( fieldJson.getString("field_type") ) ) {
							itemMap.put(fieldJson.getString("name"), fieldJson.getString("label"));
							Map<String, Integer> gradeMap = new HashMap<>();
							gradeMap.put("A", 0);
							gradeMap.put("B", 0);
							gradeMap.put("C", 0);
							gradeMap.put("D", 0);
							gradeMap.put("问题学生", 0);
							itemGradeMap.put(fieldJson.getString("name"), gradeMap);
							//得到每个等级的描述
							String totalDesc = fieldJson.getString("desc");
							String[] gradeDesc = totalDesc.split("[ABCD]{1}：");  //选项含义解析正则， 不同的定义解析不一样
							Map<String, String> descMap = new HashMap<>();
							for (int i = 1; i < gradeDesc.length; i++) {
								descMap.put(gradeList.get(i-1), gradeDesc[i]);
							}
							itemDescMap.put(fieldJson.getString("name"), descMap);
						}
					}
					flag = 1;
				}

				//判定评分等级
				for (String  field : itemMap.keySet()) {
					//得到filed项的分数
					String grade = json.getString(field);
					if(field.equals("gongZuoJinZhan") && grade.equals("D")) {
						System.out.println("有人严重滞后");
						System.out.println(es.getName());
					}
					switch (grade) {
					case "A":
						Integer nowANum = itemGradeMap.get(field).get("A") + 1;
						itemGradeMap.get(field).put("A", nowANum);
						break;
					case "B":
						Integer nowBNum = itemGradeMap.get(field).get("B") + 1;
						itemGradeMap.get(field).put("B", nowBNum);
						break;
					case "C":
						Integer nowCNum = itemGradeMap.get(field).get("C") + 1;
						itemGradeMap.get(field).put("C", nowCNum);
						break;
					case "D":
						Integer nowDNum = itemGradeMap.get(field).get("D") + 1;
						itemGradeMap.get(field).put("D", nowDNum);
						break;
					default:
						System.out.println("问题学生:" + es.getName());
						if (FormKey.equals("bysjzqjc")){
							problemStuSet.add(es.getName()+"--"+getZqZZ(es.getId()) + ", ");	
						}
						if (FormKey.equals("bysj_ktqk")){
							problemStuSet.add(es.getName()+", ");	
						}
						Integer nowProblemNum = itemGradeMap.get(field).get("问题学生") + 1;
						itemGradeMap.get(field).put("问题学生", nowProblemNum);
						break;
					}
				}
				System.out.println("被评价学生" + es.getName() + "  ------" + json);
//				formDefRepository.getFormFieldMap(arg0, arg1)
			}
		}
		System.out.println(itemGradeMap);
		System.out.println("未提交学生:");
		System.out.println(NogradeStu);
		//格式化数据打入前台
		PageList<GradeItem> gradeItems = new PageList<>();
		for (Entry<String, Map<String, Integer>> entry : itemGradeMap.entrySet()) {
			Map<String, Integer> gradeMap = entry.getValue();
			Map<String, String> descMap = itemDescMap.get(entry.getKey());
			//String aa=itemMap.get(entry.getKey()).split("\\.")[1];
			itemMap.get(entry.getKey());
			//System.out.println(aa);

			GradeItem gradeItem = new GradeItem((itemMap.get(entry.getKey()).split("\\."))[1] , gradeMap.get("A"), gradeMap.get("B"), 
												gradeMap.get("C"),  gradeMap.get("D"),gradeMap.get("问题学生"), descMap.get("A") +"  ",
												descMap.get("B") +"  ",(descMap.get("C") != null? descMap.get("C"):"无此选项") ,(descMap.get("D")!=null?descMap.get("D"):"无此选项"));
			gradeItems.add(gradeItem);	
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
		Collections.sort(gradeItems, new Comparator<GradeItem>() {
			@Override
			public int compare(GradeItem o1, GradeItem o2) {
				return o1.toString().compareTo(o2.toString()); //升序
			}  
		});
		return new PageJson(gradeItems);
	}
	
	private String getZqZZ(String id) {
		String whereSql = "user_id_ = '" + id + "'" + "and type_ = 'stu'";
		List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
		if (groupUserPos.size() == 1) {
			String groupId = groupUserPos.get(0).getGroupId();
			String grouoLeader = gradGroupRepository.get(groupId).getLeader();
			return grouoLeader;
		}
		return "None";
	}

	@RequestMapping("exportGradeItem")
	public  void exportGradeItem (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String filePath = request.getSession().getServletContext().getRealPath("") + "\\file\\";
		FileUtil.createFolderFile(filePath  );
		String[] fieds = { "名称","A人数", "A含义", "B人数", "B含义", "C人数", "C含义","D人数", "D含义","问题学生人数" };
		List<GradeItem> gradeItems = getGradItems();
		List<Map<String, String>> datas = new ArrayList<Map<String, String>>();
		Map<String,String>data = null;
		for (GradeItem gradeItem : gradeItems) {
			data = new HashMap();
			data.put("名称", gradeItem.getItemName());
			data.put("A人数", (gradeItem.getaNum() + ""));
			data.put("A含义", gradeItem.getaMean());
			data.put("B人数", gradeItem.getbNum() + "");
			data.put("B含义", gradeItem.getbMean());
			data.put("C人数", gradeItem.getcNum() + "");
			data.put("C含义", gradeItem.getcMean());
			data.put("D人数", gradeItem.getdNum() + "");
			data.put("D含义", gradeItem.getdMean());
			data.put("问题学生人数", gradeItem.getProblemNum() + "");
			datas.add(data);
		}
		String file = filePath  + "中期情况统计表.xls";
		byte[] fileByte = FileUtil.toExcel(datas, fieds);
		InputStream in = new ByteArrayInputStream(fileByte);
		FileUtil.writeFile(file,	in);
		FileUtil.zip(filePath,false);
		FileUtil.downLoadFile(request, response, filePath +".zip", "中期情况统计表.zip");
		File file1 = new File(filePath);
		FileUtil.deleteDir(file1);
	}

	private List<GradeItem> getGradItems() {
		List<String> gradeList =  Arrays.asList("A", "B", "C", "D");
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		String whereSql = "orgId = '" + orgId +"'";
		Map<String, Map<String, Integer>> itemGradeMap = new HashMap<>();
		Map<String, Map<String, String>> itemDescMap = new HashMap<>();
		Map<String, String> itemMap = new HashMap<>();
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
		int flag = 0;
		for (UrlZhiYuanPo es : urlZhiYuanPos) {
			byte[] blobJson = es.getZqGrade();
			if (blobJson!=null && blobJson.length != 0) {
				JSONObject json=JSONObject.fromObject(new String(blobJson));	
				if (flag == 0) {
					String key = (String) json.get("id");
					String formData = formDefRepository.getFormData("432588794160480256");
					JSONArray fields = formDefRepository.getFields("bysjzqjc");
					//得到评分项
					for (Object field : fields) {
						JSONObject fieldJson = ((JSONObject)field);
						if ( ("radio").equals( fieldJson.getString("field_type") ) ) {
							itemMap.put(fieldJson.getString("name"), fieldJson.getString("label"));
							Map<String, Integer> gradeMap = new HashMap<>();
							gradeMap.put("A", 0);
							gradeMap.put("B", 0);
							gradeMap.put("C", 0);
							gradeMap.put("D", 0);
							gradeMap.put("问题学生", 0);
							itemGradeMap.put(fieldJson.getString("name"), gradeMap);
							//得到每个等级的描述
							String totalDesc = fieldJson.getString("desc");
							String[] gradeDesc = totalDesc.split("[ABCD]{1}：");
							Map<String, String> descMap = new HashMap<>();
							for (int i = 1; i < gradeDesc.length; i++) {
								descMap.put(gradeList.get(i-1), gradeDesc[i]);
							}
							itemDescMap.put(fieldJson.getString("name"), descMap);
						}
					}
					flag = 1;
				}

				//判定评分等级
				for (String  field : itemMap.keySet()) {
					//得到filed项的分数
					String grade = json.getString(field);
					if(field.equals("kaiFaGongJu") && grade.equals("D")) {
						System.out.println("进入了  发现错误");
						System.out.println(es.getName());
					}
					switch (grade) {
					case "A":
						Integer nowANum = itemGradeMap.get(field).get("A") + 1;
						itemGradeMap.get(field).put("A", nowANum);
						break;
					case "B":
						Integer nowBNum = itemGradeMap.get(field).get("B") + 1;
						itemGradeMap.get(field).put("B", nowBNum);
						break;
					case "C":
						Integer nowCNum = itemGradeMap.get(field).get("C") + 1;
						itemGradeMap.get(field).put("C", nowCNum);
						break;
					case "D":
						Integer nowDNum = itemGradeMap.get(field).get("D") + 1;
						itemGradeMap.get(field).put("D", nowDNum);
						break;
					default:
						System.out.println("问题学生:" + es.getName());
						problemStuSet.add(es.getName()+","+" ");
						Integer nowProblemNum = itemGradeMap.get(field).get("问题学生") + 1;
						itemGradeMap.get(field).put("问题学生", nowProblemNum);
						break;
					}
				}
				System.out.println("被评价学生" + es.getName() + "  ------" + json);
//				formDefRepository.getFormFieldMap(arg0, arg1)
			}
		}
		System.out.println(itemGradeMap);
		//格式化数据
		List<GradeItem> gradeItems = new ArrayList<>();
		for (Entry<String, Map<String, Integer>> entry : itemGradeMap.entrySet()) {
			Map<String, Integer> gradeMap = entry.getValue();
			Map<String, String> descMap = itemDescMap.get(entry.getKey());
			GradeItem gradeItem = new GradeItem((itemMap.get(entry.getKey()).split("\\."))[1] , gradeMap.get("A"), gradeMap.get("B"), 
												gradeMap.get("C"),  gradeMap.get("D"),gradeMap.get("问题学生"), descMap.get("A") +"  ",
												descMap.get("B") +"  ",(descMap.get("C") != null? descMap.get("C"):"无此选项") ,(descMap.get("D")!=null?descMap.get("D"):"无此选项"));
			gradeItems.add(gradeItem);	
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
		Collections.sort(gradeItems, new Comparator<GradeItem>() {
			@Override
			public int compare(GradeItem o1, GradeItem o2) {
				return o1.toString().compareTo(o2.toString()); //升序
			}  
		});
		return gradeItems;
	}

	
}
