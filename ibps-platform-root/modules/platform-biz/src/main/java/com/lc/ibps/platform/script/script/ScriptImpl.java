package com.lc.ibps.platform.script.script;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.lc.ibps.base.core.util.string.StringUtil;
import org.apache.commons.lang3.StringUtils;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.constant.PartyRelType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.time.TimeUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.bishes.oldFile.domain.OldFile;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;
import com.lc.ibps.bishes.oldFile.repository.OldFileRepository;
import com.lc.ibps.bishes.teacherAndStudent.domain.TeacherAndStudent;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.domain.BpmTaskAssign;
import com.lc.ibps.bpmn.model.DefaultBpmIdentity;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskAssignPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskAssignRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.service.impl.BpmIdentityServiceImpl;
import com.lc.ibps.common.file.domain.Attachment;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.components.upload.constants.FileParam;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.model.FileInfo;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyRelPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.repository.DefaultPartyUserRepository;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.org.party.repository.PartyRelRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.CommonPath;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.utils.freemarker.TemplateParseUtil;

import freemarker.template.TemplateException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Groovy脚本实现
 *
 * <pre>
 *  
 * 构建组：ibps-platform-biz
 * 作者：Xu Qiang
 * 邮箱：819842974@qq.com
 * 日期：2015年12月22日-下午2:17:15
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 * 
 * @param <>
 */
public class ScriptImpl extends GenericUploadController implements IScript {
	@Resource
	CurrentContext currentContext;
	@Resource
	private UrlZhiYuanDao urlZhiYuanDao;
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepositpry;
	@Resource
	PartyRelRepository partyRelRepository;
	@Resource
	private PartyUserRepository partyUserRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	IPartyUserService userService;
	@Resource
	private PartyOrgRepository partyOrgRepository;
	@Resource
	private PartyOrgAuthRepository partyOrgAuthRepository;
	
	@Resource
	private DefaultPartyUserRepository defaultPartyUserRepository;
	@Resource
	private TeacherAndStudentRepository teacherAndStudentRepository;
	@Resource
	BpmInstRepository bpmInstRepository;
	@Resource
	BpmTaskRepository bpmTaskRepository;
	@Resource
	BpmTaskAssignRepository bpmTaskAssignRepository;
	@Resource
	AttachmentRepository attachmentRepository;
	@Resource
	OldFileRepository oldFileRepository;
	
	public static final int qianrushi_Team = 35;//嵌入式与物联网团队
	public static final int xinxi_Team = 35;//信息与系统安全团队
	public static final int kexin_Team = 15;//可信与智能感知团队
	public static final int dianzi_Team = 40;//电子政务建模仿真实验室
	public static final int fenbushi_Team = 25;//分布式计算团队
	public static final int zhineng_Team = 25;//智能信息处理团队
	public static final int wangluo_Team = 40;//网络技术与安全团队
	public static final int fanzai_Team = 10;//泛在网络与信息内容安全团队
	public static final int zhuanye_Team = 50;//专业实验教学团队
	public static final int ruanjianOne_Team = 50;//软件与社会计算团队
	public static final int ruanjianTwo_Team = 75;//软件与社会计算（二）团队
	
	

	/**
	 * 获取系统当前日期，默认格式2015-12-21
	 *
	 * @return
	 */
	public String getCurDate() {
		try {
			return TimeUtil.formatDate(System.currentTimeMillis());
		} catch (Exception ignore) {
		}
		return "";
	}

	/**
	 * 获取当前日期时间，按format格式输出
	 *
	 * @param format
	 * @return
	 */
	public String getCurDate(String format) {
		return TimeUtil.getFormatString(System.currentTimeMillis(), format);
	}

	/**
	 * 获取当前日期时间，按format格式输出
	 *
	 * @param
	 * @return
	 */
	public String getCurDateTime() {
		return getCurDate(StringPool.DATE_FORMAT_DATETIME);
	}

	/**
	 * 取得当前登录用户工号 。<br>
	 * 
	 * <pre>
	 * 脚本中使用方法:
	 * scriptImpl.getAccount()
	 * </pre>
	 * 
	 * @return
	 */
	public String getAccount() {
		User sysUser = currentContext.getCurrentUser();
		if (sysUser == null) {
			return "";
		}
		return sysUser.getAccount();
	}

	/**
	 * 取得当前登录用户id 。<br>
	 * 
	 * <pre>
	 * 脚本中使用方法:
	 * scriptImpl.getCurrentUserId()
	 * </pre>
	 * 
	 * @return
	 */
	public String getCurrentUserId() {
		return currentContext.getCurrentUserId();
	}

	/**
	 * 取得当前登录用户名称 。<br>
	 * 
	 * <pre>
	 * 脚本中使用方法:
	 * scriptImpl.getCurrentName()
	 * </pre>
	 * 
	 * @return
	 */


	public String getCurrentName() {
		User sysUser = currentContext.getCurrentUser();
		if (sysUser == null) {
			return "";
		}
		return sysUser.getFullname();
	}

	/**
	 * 获取当前系统的用户。
	 * 
	 * <pre>
	 * 脚本中使用方法: scriptImpl.getCurrentUser();
	 * </pre>
	 * 
	 * @return 用户对象。
	 */
	public User getCurrentUser() {
		return currentContext.getCurrentUser();
	}

	/**
	 * 获取当前用户选择器的值
	 *
	 * @return
	 */
	public String getCurrentUserInfo() {
		User user = currentContext.getCurrentUser();
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(setSelector(user.getUserId(), user.getFullname()));
		return jsonArray.toString();
	}

	/**
	 * 设置一个选择器的值
	 *
	 * @param id
	 * @param name
	 * @return
	 */
	private JSONObject setSelector(String id, String name) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.accumulate("id", id);
		jsonObject.accumulate("name", name);
		return jsonObject;
	}

	/**
	 * 根据用户id设置此用户为节点执行人
	 * 
	 * @param ids
	 * @return
	 */
	public Set<BpmIdentity> setUserLit(String ids) {
		Set<BpmIdentity> users = new HashSet<BpmIdentity>();
		String[] idArray = ids.split(",");
		List<BpmIdentity> userList = new ArrayList<BpmIdentity>();
		for (int i = 0; i < idArray.length; i++) {
			BpmIdentity bpmIdentity = DefaultBpmIdentity.getIdentityByUserId(idArray[i]);
			userList.add(bpmIdentity);
			users.addAll(userList);
		}
		return users;
	}

	/**
	 * 根据用户名设置此用户为节点执行人
	 * 
	 * @param userAccout
	 * @return
	 */
	public Set<BpmIdentity> setUserByAccount(String userAccout) {
		Set<BpmIdentity> users = new HashSet<BpmIdentity>();
		if (StringUtils.isEmpty(userAccout))
			return users;
		String[] aryAccount = userAccout.split(",");
		List<String> userIds = new ArrayList<String>();
		for (String str : aryAccount) {
			User sysUser = userService.getByAccount(str);
			userIds.add(sysUser.getUserId().toString());
		}

		List<BpmIdentity> userList = new ArrayList<BpmIdentity>();
		for (int i = 0; i < userIds.size(); i++) {
			BpmIdentity bpmIdentity = DefaultBpmIdentity.getIdentityByUserId(userIds.get(i));
			userList.add(bpmIdentity);
			users.addAll(userList);
		}
		return users;
	}

	/**
	 * 设置所选团队的部门负责人为下一个节点的执行人
	 * 
	 */
	public BpmIdentity setExecutor() {
		// 获取当前用户id
		String userId = currentContext.getCurrentUserId();
		String xh = partyUserRepository.get(userId).getAccount();
		// 在t_zyurl中跟惧用户id获取团队1字段里的信息
		// urlZhiYuanRepositpry.getByUserId(userId);
		UrlZhiYuanPo po = urlZhiYuanRepositpry.getByCol("xh", xh);
		String td1Id = po.getTd1id();
		PartyEmployeePo employee = partyEmployeeRepository.get(td1Id);
		// String orgId=employee.get();
		// urlZhiYuan=urlZhiYuanRepository.newInstance();
		BpmIdentity user = (BpmIdentity) new BpmIdentityServiceImpl();

		return user;
	}

	/**
	 * 获取部门负责人
	 */
	public List<BpmIdentity> getBpmIdentitys(List<PartyEntity> list) {
		List<String> users = new ArrayList<>();
		JSONArray us = null;
		for (PartyEntity entity : list) {
			if (userService == null) {
				userService = AppUtil.getBean(IPartyUserService.class);
			}
			us = JSONArray.fromObject(userService.findByPartyRelationJson(entity.getAlias(), PartyType.ORG.getValue(),
					PartyRelType.ORG_MANAGER.key()));

			if (BeanUtils.isNotEmpty(us)) {
				for (int idx = 0; idx < us.size(); idx++) {
					JSONObject u = JSONObject.fromObject(us.get(idx));
					String uid = u.get("userId").toString();
					if (!users.contains(uid)) {
						users.add(uid);
					}
				}
			}
		}

		List<BpmIdentity> identityList = new ArrayList<BpmIdentity>();
		identityList = convertByUserIdList(users);

		return identityList;
	}
	
	
	public List<BpmIdentity> convertByUserIdList(List<String> userIdList) {
		List<BpmIdentity> bpmIdentities = new ArrayList<BpmIdentity>();
		
		if(BeanUtils.isEmpty(userIdList)){
			return bpmIdentities;
		}
		
		for(String user:userIdList){
			if(user==null) continue;
			BpmIdentity bpmIdentity = convertByUserId(user); 
			bpmIdentities.add(bpmIdentity);
		}
		return bpmIdentities;
	}
	
	public BpmIdentity convertByUserId(String userId) {
		if(userId == null) return null;
		
		DefaultBpmIdentity bpmIdentity = new DefaultBpmIdentity();
		bpmIdentity.setId(userId);
		bpmIdentity.setType(BpmIdentity.TYPE_USER);
		return bpmIdentity;
	}

	
/*	public String setExecutors(User startUser){
		String userId=startUser.getUserId();
		return 
		
	}*/
	/**
	 * 获取选择审核人Id
	 * @param Jdid
	 * @return
	 *//*
	public String getShenHRId(String businessKey_){
		XinDaiLiuChengPo xinDaiLiuCheng = xinDaiLiuChengRepository.get(businessKey_);
		String shenHRId = xinDaiLiuCheng.getWj();
		return shenHRId;
	}*/
	
	/**
	 * 毕业设计：获取学生所选团队1的负责人
	 */
	public String getTeamOne(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String orgId = zhiyuan.getTd1id();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="MAIN_PID_="+orgId+" AND BIZ_ = 'orgManager'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		//orderBySql
		List<PartyRelPo> partyRel=partyRelRepository.query(paramQueryFilter);
		if(partyRel.size()==0){
			return null;
		}else{
			return partyRel.get(0).getSubPid();
		}
		
	}

	
	/**
	 * 毕业设计：获取学生所选团队2的负责人
	 */
	public String getTeamTwo(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String orgId = zhiyuan.getTd2id();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="MAIN_PID_="+orgId+" AND BIZ_ = 'orgManager'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		//orderBySql
		List<PartyRelPo> partyRel=partyRelRepository.query(paramQueryFilter);
		if(partyRel.size()==0){
			return null;
		}else{
			return partyRel.get(0).getSubPid();
		}
		
	}
	
	/**
	 * 毕业设计：获取学生所选团队3的负责人
	 */
	public String getTeamThree(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String orgId = zhiyuan.getTd3id();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="MAIN_PID_="+orgId+" AND BIZ_ = 'orgManager'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		//orderBySql
		List<PartyRelPo> partyRel=partyRelRepository.query(paramQueryFilter);
		if(partyRel.size()==0){
			return null;
		}else{
			return partyRel.get(0).getSubPid();
		}
		
	}
	
	/**
	 *团队带领的学生数
	 */
	public void getGroupPeopleNumber(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String team = zhiyuan.getTd1();
		String teamId = zhiyuan.getTd1id();				
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.get(teamId);
		if(teacherAndStudent==null&&!team.isEmpty()){
			teacherAndStudent = new TeacherAndStudentPo();
			teacherAndStudent.setId(teamId);
			teacherAndStudent.setTeam(team);
			teacherAndStudent.setTeamId(teamId);
			//jsid为团队负责人的userId，js为团队负责人的account
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="MAIN_PID_="+teamId+" AND BIZ_ = 'orgManager'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			List<PartyRelPo> partyRel=partyRelRepository.query(paramQueryFilter);
			String jsid = partyRel.get(0).getSubPid();
			teacherAndStudent.setJsid(jsid);
			PartyUserPo  partyUserPo = partyUserRepository.get(jsid);
			String js = partyUserPo.getAccount();
			teacherAndStudent.setJs(js);			
			long amount=40;
			teacherAndStudent.setAmount(amount);		
			TeacherAndStudent teacherAndStudent1 =teacherAndStudentRepository.newInstance(teacherAndStudent);
			teacherAndStudent1.save();
			}
		String team2 = zhiyuan.getTd2();
		String teamId2 = zhiyuan.getTd2id();	
		TeacherAndStudentPo teacherAndStudent2 = teacherAndStudentRepository.get(teamId2);
		if(teacherAndStudent2==null&&!team2.isEmpty()){
			teacherAndStudent2 = new TeacherAndStudentPo();
			teacherAndStudent2.setId(teamId2);
			teacherAndStudent2.setTeam(team2);
			teacherAndStudent2.setTeamId(teamId2);
			//jsid为团队负责人的userId，js为团队负责人的account
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="MAIN_PID_="+teamId2+" AND BIZ_ = 'orgManager'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			List<PartyRelPo> partyRel=partyRelRepository.query(paramQueryFilter);
			String jsid = partyRel.get(0).getSubPid();
			teacherAndStudent2.setJsid(jsid);
			PartyUserPo  partyUserPo = partyUserRepository.get(jsid);
			String js = partyUserPo.getAccount();
			teacherAndStudent2.setJs(js);	
			long amount2=40;
			teacherAndStudent2.setAmount(amount2);		
			TeacherAndStudent teacherAndStudent22 =teacherAndStudentRepository.newInstance(teacherAndStudent2);
			teacherAndStudent22.save();
			}
	}
	
	
	/**
	 * 获取团队1的学生数量,并将该团队确定为最终团队
	 */
	public void getStudentCount(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String tdid = zhiyuan.getTd1id();
		String td= zhiyuan.getTd1();
		String name = zhiyuan.getName();
		String xh = zhiyuan.getXh();
		TeacherAndStudentPo teacherAndStudent = teacherAndStudentRepository.get(tdid);
//		if(teacherAndStudent== null){
//			teacherAndStudent = new TeacherAndStudentPo();
//			teacherAndStudent.setId(tdid);
//			teacherAndStudent.setTeamId(tdid);
//			teacherAndStudent.setTeam(td);
//			long a = 40;
//			teacherAndStudent.setAmount(a);
//		}
		List<UrlZhiYuanPo> po=urlZhiYuanRepositpry.getByFinaltdId(tdid);
		long x = 40 ;
		switch (tdid) {
		case "370723340257591296":
			x = qianrushi_Team-po.size();
			break;
		case "370723400353579008":
			x = xinxi_Team-po.size();
			break;
		case "370723457224146944":	
			x = kexin_Team-po.size();
			break;
		case "370723663596486656":
			x = ruanjianOne_Team-po.size();
			break;
		case "370723713546452992":
			x = ruanjianTwo_Team-po.size();
			break;
		case "370723896715902976":	
			x = fenbushi_Team-po.size();
			break;
		case "370723941439766528":
			x = zhineng_Team-po.size();
			break;
		case "370724054992158720":
			x = wangluo_Team-po.size();
			break;
		case "370724105474801664":	
			x = fanzai_Team-po.size();
			break;
		case "370724320130891776":	
			x = zhuanye_Team-po.size();
			break;
		case "370724425588277248":		
			x = dianzi_Team-po.size();
			break;
		default:
			break;
		}
		String xs = teacherAndStudent.getXs();
		if(BeanUtils.isEmpty(xs)){
			JSONObject jsonObject1 = new JSONObject();
			jsonObject1.put("name", name);
			jsonObject1.put("xh", xh);
			JSONArray arr =new JSONArray();
			arr.add(jsonObject1);
			xs=arr.toString();  
		}else{
			JSONArray ja = JSONArray.fromObject(xs);
			int mark = 0;
			for(int i=0;i<ja.size();i++){
				if(ja.getJSONObject(i).get("xh").equals(xh)){
					 mark = 1;
					 break;
				}
			}
			
			if(mark == 0){
			JSONObject jsob =new JSONObject();
			jsob.put("name", name);
			jsob.put("xh", xh); 
			ja.add(jsob);
			x--;
			}
			xs=ja.toString();
			
		}
		
		zhiyuan.setFinaltd(td);
		zhiyuan.setFinaltdId(tdid);
		UrlZhiYuan ss = urlZhiYuanRepositpry.newInstance(zhiyuan);
		ss.save();
		teacherAndStudent.setAmount(x);	
		teacherAndStudent.setXs(xs);
		TeacherAndStudent xx =teacherAndStudentRepository.newInstance(teacherAndStudent);
		xx.save();
		
	}
	
	/**
	 * 获取团队2带领的学生数量
	 */
	public void getStudentCounts(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String td = zhiyuan.getTd2();
		String tdid = zhiyuan.getTd2id();
		String name = zhiyuan.getName();
		String xh = zhiyuan.getXh();
		TeacherAndStudentPo teacherAndStudent = null;
		long x = 40 ;
		if(StringUtils.isNotEmpty(tdid)){
			teacherAndStudent = teacherAndStudentRepository.get(tdid);
			List<UrlZhiYuanPo> po=urlZhiYuanRepositpry.getByFinaltdId(tdid);

			switch (tdid) {
				case "370723340257591296":
					x = qianrushi_Team-po.size();
					break;
				case "370723400353579008":
					x = xinxi_Team-po.size();
					break;
				case "370723457224146944":
					x = kexin_Team-po.size();
					break;
				case "370723663596486656":
					x = ruanjianOne_Team-po.size();
					break;
				case "370723713546452992":
					x = ruanjianTwo_Team-po.size();
					break;
				case "370723896715902976":
					x = fenbushi_Team-po.size();
					break;
				case "370723941439766528":
					x = zhineng_Team-po.size();
					break;
				case "370724054992158720":
					x = wangluo_Team-po.size();
					break;
				case "370724105474801664":
					x = fanzai_Team-po.size();
					break;
				case "370724320130891776":
					x = zhuanye_Team-po.size();
					break;
				case "370724425588277248":
					x = dianzi_Team-po.size();
					break;
				default:
					break;
			}
		}

//		if(teacherAndStudent== null){
//			teacherAndStudent = new TeacherAndStudentPo();
//			teacherAndStudent.setId(tdid);
//			teacherAndStudent.setTeamId(tdid);
//			teacherAndStudent.setTeam(td);
//			long a = 40;
//			teacherAndStudent.setAmount(a);
//		}
		if(teacherAndStudent !=null){
			String xs = teacherAndStudent.getXs();
			if(BeanUtils.isEmpty(xs)){
				JSONObject jsonObject1 = new JSONObject();
				jsonObject1.put("name", name);
				jsonObject1.put("xh", xh);
				JSONArray arr =new JSONArray();
				arr.add(jsonObject1);
				xs=arr.toString();
			}else{
				JSONArray ja = JSONArray.fromObject(xs);
				int mark = 0;
				for(int i=0;i<ja.size();i++){
					if(ja.getJSONObject(i).get("xh").equals(xh)){
						mark = 1;
						break;
					}
				}

				if(mark == 0){
					JSONObject jsob =new JSONObject();
					jsob.put("name", name);
					jsob.put("xh", xh);
					ja.add(jsob);
					x--;
				}
				xs=ja.toString();
			}
			zhiyuan.setFinaltd(td);
			zhiyuan.setFinaltdId(tdid);
			UrlZhiYuan ss = urlZhiYuanRepositpry.newInstance(zhiyuan);
			ss.save();
			teacherAndStudent.setXs(xs);
			teacherAndStudent.setAmount(x);
			TeacherAndStudent xx =teacherAndStudentRepository.newInstance(teacherAndStudent);
			xx.save();
		}

		
	}
	/**
	 * 获取团队2id
	 */
	
	public String  getTd2Id(String businessKey_) {
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String td2id = zhiyuan.getTd2id();
		if(td2id.isEmpty()) return null;
		else return td2id;
	}

	/**
	 * 保存amount和学生
	 */
	public void setFinalTd(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String tdid= zhiyuan.getFinaltdId();
		String td = zhiyuan.getFinaltd();
		TeacherAndStudentPo teacherAndStudent= teacherAndStudentRepository.get(tdid);
		long x = teacherAndStudent.getAmount();
		String name = zhiyuan.getName();
		String xh = zhiyuan.getXh();
		String xs = teacherAndStudent.getXs();
		if(BeanUtils.isEmpty(xs)){
			JSONObject jsonObject1 = new JSONObject();
			jsonObject1.put("name", name);
			jsonObject1.put("xh", xh);
			JSONArray arr =new JSONArray();
			arr.add(jsonObject1);
			xs=arr.toString();
		}else{
			JSONArray ja = JSONArray.fromObject(xs);
			int mark = 0;
			for(int i=0;i<ja.size();i++){
				if(ja.getJSONObject(i).get("xh").equals(xh)){
					 mark = 1;
					 break;
				}
			}
			
			if(mark == 0){
				JSONObject jsob =new JSONObject();
				jsob.put("name", name);
				jsob.put("xh", xh); 
				ja.add(jsob);
				x--;
				}
			xs=ja.toString();
		}
		teacherAndStudent.setXs(xs);
		teacherAndStudent.setAmount(x);	
		TeacherAndStudent xx =teacherAndStudentRepository.newInstance(teacherAndStudent);
		xx.save();
		
	}
	
	
	/**
	 * 获取填报志愿的学生id
	 */
	public String getStudent(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String studentId = zhiyuan.getXh();
		PartyUserPo partyUser = partyUserRepository.getByAccount(studentId);
		String accountId = partyUser.getId();
		return accountId;
	}
	
	/**
	 * 获取填写立题论证书的教师id
	 */
	public String getTeacher(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String jsid = zhiyuan.getFinalteacherId();
		return jsid;
	}
	
	/**
	 * 获取urlzhiyuan立题论证书团队负责人
	 */
	public String getManager(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String tdid = zhiyuan.getFinaltdId();
		TeacherAndStudentPo teacherAndStudent= teacherAndStudentRepository.get(tdid);
		String jsid = teacherAndStudent.getJsid();//jsid为团队负责人id
		return jsid;
	}
	/**
	 * 获取立题论证书交叉审核的审核人
	 */
	public String getJcShenhePerson(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String js3id = zhiyuan.getJs3id();//js3id为立题书交叉审核人
		return js3id;
	}
	
	/**
	 * 获取团队基层负责人
	 */
	public String getJicengTeacher(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String finaltdid = zhiyuan.getFinaltdId();
		TeacherAndStudentPo teacherAndStudentPo = teacherAndStudentRepository.get(finaltdid);
		return teacherAndStudentPo.getTeacherId();
	}
	
	/**
	 * 立题书领导小组审核点击反对执行此方法
	 */
	public void setLitishuBpm(String businessKey_){
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepositpry.get(businessKey_);
		String js3id = urlZhiYuanPo.getJs3id();
		if(StringUtils.isNotEmpty(js3id)){
            DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
            String whereSql="BIZ_KEY_='"+businessKey_+"'"+"AND PROC_DEF_NAME_='立题论证书'";
            paramQueryFilter.addParamsFilter("whereSql", whereSql);
            List<BpmInstPo> bpmInstPoList = bpmInstRepository.query(paramQueryFilter);
            BpmInstPo bpmInstPo = bpmInstPoList.get(0);
            String proc_inst_id = bpmInstPo.getId();
            DefaultQueryFilter paramQueryFilter2 = new DefaultQueryFilter();
            String whereSql2="PROC_INST_ID_='"+proc_inst_id+"'";
            paramQueryFilter2.addParamsFilter("whereSql", whereSql2);
            List<BpmTaskPo> bpmTaskPos = bpmTaskRepository.query(paramQueryFilter2);
            BpmTaskPo bpmTaskPo = bpmTaskPos.get(0);
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
        }


		
	}
	
	
	/**
	 * 生成立题书word
	 * @param businessKey_
	 * @throws Exception 
	 */
	public void setLitishuFile(String businessKey_) throws Exception{
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepositpry.get(businessKey_);
		String ctx = CommonPath.ctx;

		String fileId = urlZhiYuanPo.getLitishufile();
		if(StringUtil.isNotEmpty(fileId)){
			AttachmentPo attachmentPo =  attachmentRepository.get(fileId);
			if(attachmentPo != null){
				String filePath = attachmentPo.getFilePath();
				File file = new File(filePath);
				file.delete();
				Attachment attachment = attachmentRepository.newInstance(attachmentPo);
				attachment.delete();
			}

		}
		String str = urlZhiYuanPo.getZyckzl();
		if(str.contains("<")||str.contains(">")||str.contains("&")){  
            str=str.replaceAll("&", "&amp;");  
            str=str.replaceAll("<", "&lt;");  
            str=str.replaceAll(">", "&gt;");  
            urlZhiYuanPo.setZyckzl(str);
		}
		Map map = new HashMap();
	    map.put("po",urlZhiYuanPo);
	    byte[] fbs = TemplateParseUtil.parse( ctx+"/WordWorkspace/ftl/" , "templateFinal.ftl" ,map);
    	String xh = urlZhiYuanPo.getXh();
    	String name = urlZhiYuanPo.getName();
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
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepositpry.newInstance(urlZhiYuanPo);
		urlZhiYuan.save();
    	
	}
	
	/**
	 * 生成任务书word
	 * @param businessKey_
	 * @throws Exception
	 */
	public void setRenwushuFile(String businessKey_) throws Exception{
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepositpry.get(businessKey_);
		String ctx = CommonPath.ctx;
		String xh = urlZhiYuanPo.getXh();
    	String name = urlZhiYuanPo.getName();
    	OldFilePo oldFilePo = new OldFilePo();		
		oldFilePo.setXh(xh);
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="FILECATEGORY='"+"任务书' "+"AND "+"XH="+xh;
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<OldFilePo> oldFilePos=oldFileRepository.query(paramQueryFilter);
		String a = Integer.toString(oldFilePos.size()+1);
		oldFilePo.setFileVersion(a);
		String str = urlZhiYuanPo.getZyckzl();
		if(str.contains("<")||str.contains(">")||str.contains("&")){  
            str=str.replaceAll("&", "&amp;");  
            str=str.replaceAll("<", "&lt;");  
            str=str.replaceAll(">", "&gt;");  
            urlZhiYuanPo.setZyckzl(str);
		}
		Map map = new HashMap();
	    map.put("po",urlZhiYuanPo);
	    byte[] fbs = TemplateParseUtil.parse( ctx+"/WordWorkspace/ftl/" , "renwushu.ftl" ,map);
//		byte[] fbs = WordUtil.fmWord(urlZhiYuanPo , ctx+"/WordWorkspace/ftl/", "renwushu.ftl");	
    	// 初始化上传Service
    	this.getUploadService();   	
    	String fileName = xh+name+"任务书.doc";
    	long size = fbs.length;
    	//转为文件输入流
    	InputStream fis =  new ByteArrayInputStream(fbs);     	
    	Map<String,Object> params = new HashMap<String,Object>();
		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
		params.put(FileParam.FILE_SIZE, size );        	
		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
		String fid = fileInfo.getId();
		urlZhiYuanPo.setRenwushufile(fid);
		oldFilePo.setFileid(fid);
		oldFilePo.setFilecategory("任务书");	
		OldFile oldFile = oldFileRepository.newInstance(oldFilePo);
		oldFile.save();
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepositpry.newInstance(urlZhiYuanPo);
		urlZhiYuan.save();
    	
	}
	
	/**
	 * 生成开题报告
	 * @param businessKey_
	 * @throws Exception
	 */
	public void setKaitiFile(String businessKey_) throws Exception{
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepositpry.get(businessKey_);
		String ctx = CommonPath.ctx;
		String xh = urlZhiYuanPo.getXh();
    	String name = urlZhiYuanPo.getName();
    	OldFilePo oldFilePo = new OldFilePo();		
		oldFilePo.setXh(xh);
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="FILECATEGORY='"+"开题报告' "+"AND "+"XH="+xh;
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<OldFilePo> oldFilePos=oldFileRepository.query(paramQueryFilter);
		String a = Integer.toString(oldFilePos.size()+1);
		oldFilePo.setFileVersion(a);
		String str = urlZhiYuanPo.getZyckzl();
		if(str.contains("<")||str.contains(">")||str.contains("&")){  
            str=str.replaceAll("&", "&amp;");  
            str=str.replaceAll("<", "&lt;");  
            str=str.replaceAll(">", "&gt;");  
            urlZhiYuanPo.setZyckzl(str);
		}
		Map map = new HashMap();
	    
	    String ckwx = urlZhiYuanPo.getZyckzl();
	    String[] ckwxs = ckwx.split("\\[\\d\\]");
	    List<String> ckwxList = new ArrayList<>();  
	    if(ckwxs.length!=1) {
	    	 urlZhiYuanPo.setZyckzl("");     
	 	    for (int j = 0; j < ckwxs.length; j++) {
	 	  	      if(j > 0){
	 	    	        ckwxList.add("[" + j + "]" + ckwxs[j]);
	 	    	      }
	 		}
	 	   
	    }  
	    map.put("po",urlZhiYuanPo);
	    map.put("ckwxList", ckwxList);
	    byte[] fbs = TemplateParseUtil.parse( ctx+"/WordWorkspace/ftl/","kaiti.ftl" ,map);
	    urlZhiYuanPo.setZyckzl(ckwx);
    	// 初始化上传Service
    	this.getUploadService();   	
    	String fileName = xh+name+"开题报告.doc";
    	long size = fbs.length;
    	//转为文件输入流
    	InputStream fis =  new ByteArrayInputStream(fbs);     	
    	Map<String,Object> params = new HashMap<String,Object>();
		params.put(FileParam.ORIGINAL_FILE_NAME,fileName);
		params.put(FileParam.FILE_SIZE, size );        	
		FileInfo fileInfo = uploadService.uploadFile(fis, params);    		
		String fid = fileInfo.getId();
		urlZhiYuanPo.setKaitifile(fid);
		oldFilePo.setFileid(fid);
		oldFilePo.setFilecategory("开题报告");	
		OldFile oldFile = oldFileRepository.newInstance(oldFilePo);
		oldFile.save();
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepositpry.newInstance(urlZhiYuanPo);
		urlZhiYuan.save();
    	
	}

	/**
	 * 论文审核    获取评审教师
 	 */
	public String getReviewTch(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String jsid = zhiyuan.getJudgeTch();
		return jsid;
	}

	/**
	 * 论文审核    获取反对教师
	 */
	public String getOpposeTch(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		String opposeTchId = ("反对").equals(zhiyuan.getFinalTchOpinion()) ? zhiyuan.getFinalteacherId():zhiyuan.getJudgeTch();
		return opposeTchId;
	}


	/**
	 * 论文审核    获取反对教师 版本2
	 */
	public String getOpposeTch2(String businessKey_){
		UrlZhiYuanPo zhiyuan = urlZhiYuanRepositpry.get(businessKey_);
		int finalTchFlag = 0;
		int judgeTchFlag = 0;
		if (("反对").equals(zhiyuan.getFinalTchOpinion()))
			finalTchFlag = 1;
		if (("反对").equals(zhiyuan.getJudgeTchOpinion()))
			judgeTchFlag = 1;
		if (finalTchFlag == 1 && judgeTchFlag == 1)
			return zhiyuan.getFinalteacherId() + "," + zhiyuan.getJudgeTch();
		else if (finalTchFlag == 1)
			return zhiyuan.getFinalteacherId();
		else if (judgeTchFlag == 1)
			return zhiyuan.getJudgeTch();
		else
			return "null";
		//String opposeTchId = ("反对").equals(zhiyuan.getFinalTchOpinion()) ? zhiyuan.getFinalteacherId():zhiyuan.getJudgeTch();
	}

	/**
	 * 论文审核    获取评审教师和指导教师的综合意见
	 */
	public String getTchFinalOpinion(String businessKey_){
		UrlZhiYuanPo paperInfo = urlZhiYuanRepositpry.get(businessKey_);
		String finalTchOpinion = paperInfo.getFinalTchOpinion();
		String judgeTchOpinion = paperInfo.getJudgeTchOpinion();
		if ("同意".equals(finalTchOpinion) && "反对".equals(judgeTchOpinion))
			return "reUpload";
		if ("反对".equals(finalTchOpinion) && "同意".equals(judgeTchOpinion))
			return "reUpload";
		if ("反对".equals(finalTchOpinion) && "反对".equals(judgeTchOpinion))
			return "unJion";
		return "null";
	}

	/**
	 * 论文审核    获取评审教师和指导教师的综合意见
	 */
	public String getTchFinalOpinion2(String businessKey_){
		UrlZhiYuanPo paperInfo = urlZhiYuanRepositpry.get(businessKey_);
		String finalTchOpinion = paperInfo.getFinalTchOpinion();
		String judgeTchOpinion = paperInfo.getJudgeTchOpinion();
		if ("同意".equals(finalTchOpinion) && "反对".equals(judgeTchOpinion))
			return "unJoin";
		if ("反对".equals(finalTchOpinion) && "同意".equals(judgeTchOpinion))
			return "unJoin";
		if ("反对".equals(finalTchOpinion) && "反对".equals(judgeTchOpinion))
			return "unJoin";
		return "join";
	}
	/**
	 * 论文审核    学生能够参加答辩
	 */
	public void joinDb(String businessKey_){
		UrlZhiYuanPo paperInfo = urlZhiYuanRepositpry.get(businessKey_);
		paperInfo.setIsDb("同意");
		urlZhiYuanRepositpry.newInstance(paperInfo).save();
	}

	/**
	 * 论文审核    学生能够参加答辩
	 */
	public void unJoinDb(String businessKey_){
		UrlZhiYuanPo paperInfo = urlZhiYuanRepositpry.get(businessKey_);
		paperInfo.setIsDb("反对");
		urlZhiYuanRepositpry.newInstance(paperInfo).save();
	}

}


