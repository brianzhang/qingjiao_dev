package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.IUserSecurityQueryService;
import com.lc.ibps.api.base.constants.UserInfoConstants;
import com.lc.ibps.api.org.constant.PartyAttrType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.constant.UserStatus;
import com.lc.ibps.api.org.service.IPartyAttrQueryService;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyLevelQueryService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyUserBaseQueryService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.UserSecurityPo;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;
import com.lc.ibps.org.party.persistence.entity.PartyAttrPo;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityTreePo;
import com.lc.ibps.org.party.persistence.entity.PartyLevelPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;

/** 员工 控制器类
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年8月17日-下午2:36:35
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyEmployee/")
public class PartyEmployeeController  extends GenericController{
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyEmployeeMgrService partyEmployeeMgrService;
	@Resource
	private IPartyUserBaseQueryService partyUserBaseQueryService;
	@Resource
	private IPartyEntityService partyEntityService;
	@Resource
	private IPartyLevelQueryService partyLevelQueryService;
	@Resource
	private IPartyAttrQueryService partyAttrQueryService;
	@Resource
	private IUserSecurityQueryService userSecurityService;
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = getAutoView();
		String data = partyAttrQueryService.findByPartyTypeType(PartyType.EMPLOYEE.getValue(), PartyAttrType.QUERY.getValue());
		List<PartyAttrPo> attrs = PartyAttrPo.fromJsonArrayString(data);
		modelAndView.addObject("hasPartyAttr", BeanUtils.isNotEmpty(attrs)?true:false);
		modelAndView.addObject("attrs", BeanUtils.isNotEmpty(attrs)?attrs:"[]");
		return modelAndView;
	}
	
	/**
	 * 编辑员工信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		//获取当前树节点的ID
		String id = RequestUtil.getString(request, "id");
		String orgId = RequestUtil.getString(request, "orgId");
		
		//获取分级组织授权信息
		String prem = RequestUtil.getString(request, "prem");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",orgId="+orgId
				+ ",id="+id
				);
		
		PartyEmployeePo partyEmployee = null;
		PartyUserPo partyUser = null;
		PartyOrgPo partyOrg = null;
		PartyLevelPo partyLevel = null;
		List<PartyAttrPo> partyAttrs = null;
		UserSecurityPo userSecurity = JsonUtil.getDTO2(userSecurityService.getDefaultUserSecurity(), UserSecurityPo.class);
		if(StringUtil.isNotEmpty(id)){
			partyEmployee = PartyEmployeePo.fromJsonString(partyEmployeeService.getWithOrgJson(id));
			partyUser = PartyUserPo.fromJsonString(partyUserBaseQueryService.getById(id));
			
			if(BeanUtils.isNotEmpty(partyEmployee) && StringUtil.isNotBlank(partyEmployee.getGroupID())){
				String data = partyOrgService.getByIdJson(partyEmployee.getGroupID());
				partyOrg = PartyOrgPo.fromJsonString(data);
				if(BeanUtils.isNotEmpty(partyOrg)) {
					data = partyLevelQueryService.get(partyOrg.getLevelID());
					partyLevel = PartyLevelPo.fromJsonString(data);
				}
				if(BeanUtils.isNotEmpty(partyOrg)){
					partyOrg.setPathName(PartyEntityBuilder.buildPathName(partyOrg.getId()));
				}
			}
		}
		
		String data = partyAttrQueryService.findByPartyTypeUserId4Edit(PartyType.EMPLOYEE.getValue(), id);
		partyAttrs = PartyAttrPo.fromJsonArrayString(data);
		
		UserStatus[] statuses = UserStatus.values();
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",orgId="+orgId
				+ ",id="+id
				+ ",partyEmployee="+(partyEmployee!=null?partyEmployee.toString():"")
				+ ",partyUser="+(partyUser!=null?partyUser.toString():"")
				+ ",partyOrg="+(partyOrg!=null?partyOrg.toString():"")
				+ ",partyLevel="+(partyLevel!=null?partyLevel.toString():"")
				+ ",partyAttrs="+(partyAttrs!=null?Arrays.toString(partyAttrs.toArray()):"")
				);
		
		return getAutoView().addObject("partyEmployee",partyEmployee)
							.addObject("partyUser",partyUser)
							.addObject("partyOrg",partyOrg)
							.addObject("partyAttrs",partyAttrs)
							.addObject("orgId",orgId)
							.addObject("partyLevel",partyLevel)
							.addObject("prem",prem)
							.addObject("statuses", statuses)
							.addObject("userSecurity", userSecurity)
							.addObject("returnUrl", preUrl);
	}
	
	@RequestMapping("manager")
	public ModelAndView manager(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView mv=getAutoView();
		//获取所有员工信息
		List<PartyEmployeePo> partyEmployeeList = 
				PartyEmployeePo.fromJsonArrayString(partyEmployeeService.findAllJson());
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.manager()"
				+ "--->"
				+ "partyEmployeeList="+(partyEmployeeList!=null?Arrays.toString(partyEmployeeList.toArray()):"")
				);
		
		return mv.addObject("partyEmployeeList", partyEmployeeList);
	}
	
	/**
	 * 员工明细页面
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
		Boolean isDialog = RequestUtil.getBoolean(request, "isDialog",false);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.get()"
				+ "--->"
				+ "preUrl="+preUrl+",isDialog="+isDialog+",id="+id);
		
		PartyEmployeePo partyEmployee = null;
		PartyUserPo partyUser = null;
		PartyOrgPo partyOrg = null;
		PartyLevelPo partyLevel = null;
		List<PartyAttrPo> partyAttrs = null;
		String pictureLoad = UserInfoConstants.DEFAULT_USER_IMAGE;
		
		if(StringUtil.isNotEmpty(id)){
			partyEmployee = PartyEmployeePo.fromJsonString(partyEmployeeService.getWithOrgJson(id));
			partyUser = PartyUserPo.fromJsonString(partyUserBaseQueryService.getById(id));
			if(BeanUtils.isNotEmpty(partyEmployee) && StringUtil.isNotBlank(partyEmployee.getGroupID())){
				String data = partyOrgService.getByIdJson(partyEmployee.getGroupID());
				partyOrg = PartyOrgPo.fromJsonString(data);
				if(BeanUtils.isNotEmpty(partyOrg)) {
					data = partyLevelQueryService.get(partyOrg.getLevelID());
					partyLevel = PartyLevelPo.fromJsonString(data);
				}
				// 组织路径
				if(BeanUtils.isNotEmpty(partyOrg)) {
					partyOrg.setPathName(PartyEntityBuilder.buildPathName(partyOrg.getId()));
				}
			}
			
			String data = partyAttrQueryService.findByPartyTypeUserId4Get(PartyType.EMPLOYEE.getValue(), id);
			partyAttrs = PartyAttrPo.fromJsonArrayString(data);
		}
		
		UserStatus[] statuses = UserStatus.values();
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.edit()"
				+ "--->"
				+ "preUrl="+preUrl
				+ ",id="+id
				+",isDialog="+isDialog
				+",pictureLoad="+pictureLoad
				+ ",partyEmployee="+(partyEmployee!=null?partyEmployee.toString():"")
				+ ",partyUser="+(partyUser!=null?partyUser.toString():"")
				+ ",partyOrg="+(partyOrg!=null?partyOrg.toString():"")
				+ ",partyLevel="+(partyLevel!=null?partyLevel.toString():"")
				+ ",partyAttrs="+(partyAttrs!=null?Arrays.toString(partyAttrs.toArray()):"")
				);
		
		return getAutoView().addObject("partyEmployee",partyEmployee)
							.addObject("partyUser",partyUser)
							.addObject("partyOrg",partyOrg)
							.addObject("partyLevel",partyLevel)
							.addObject("partyAttrs",partyAttrs)
							.addObject("isDialog",isDialog)
							.addObject("returnUrl", preUrl)
							.addObject("statuses", statuses)
							.addObject("pictureLoad", pictureLoad);
	}
	
	/** 
	 * 保存参与者信息
	 *
	 * @param request
	 * @param response
	 * @param  partyEntit
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg="";
		String json = RequestUtil.getString(request, "json");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.save()"
				+ "--->"
				+ "json="+json);
		String result = "";
		try {
			String parentId=RequestUtil.getString(request, "partyEntityPo.parentId");
			result = partyEmployeeMgrService.save(json, parentId);
			String[] resultArr = result.split(StringPool.COMMA);
			writeResultMessage(response.getWriter(),resultArr[0],Integer.valueOf(resultArr[1]));
		} catch (Exception e) {
			resultMsg="对员工操作失败,";
			writeResultMessage(response.getWriter(),resultMsg+e.getMessage(),ResultMessage.ERROR);
			logger.error(e.getMessage(), e);
		}
	}
	
	/**
	 *  批量删除参与者记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String ids=RequestUtil.getString(request, "id");
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.remove()"
					+ "--->"
					+ "aryIds="+(ids!=null?ids:"")
					);
			
			if(BeanUtils.isEmpty(ids)) throw new OrgException("没有要删除的记录");
			partyEmployeeMgrService.deleteEmployee(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除员工成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除员工失败，"+e.getMessage());
			logger.error("删除员工失败，"+e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 
	 * 员工左树数据展示
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<PartyEntityTreePo> getTreeData(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String data = partyEntityService.findTreeByTypeJson(PartyType.EMPLOYEE.getValue());
		List<PartyEntityTreePo> groupTreeList = null;
		if(JacksonUtil.isJsonArray(data)){
			groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.getTreeData()"
				+ "--->"
				+ "groupTreeList="+(groupTreeList!=null?Arrays.toString(groupTreeList.toArray()):"")
				);
		
		return groupTreeList;
	}
	
	/**
	 * 
	 * 岗位列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("posList")
	public ModelAndView posList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "groupId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.posList()"
				+ "--->"
				+ "groupId="+id
				);
		
		return getAutoView().addObject("id", id);
	}
	
	/**
	 * 
	 * 可分配角色列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("roleList")
	public ModelAndView roleList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "groupId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.roleList()"
				+ "--->"
				+ "groupId="+id
				);
		
		return getAutoView().addObject("id", id);
	}
	
	/**
	 * 
	 * 员工关系列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("relList")
	public ModelAndView relList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = ContextUtil.getCurrentUserId();
		String fullName = ContextUtil.getCurrentUser().getFullname();
		boolean isSuper = ContextUtil.isSuper();
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.relList()"
				+ "--->"
				+ "id="+id
				);
		
		return getAutoView()
				.addObject("id", id)
				.addObject("fullName", fullName)
				.addObject("isSuper", isSuper)
				;
	}
	
	/**
	 * 
	 * 员工下属列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("underList")
	public ModelAndView underList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.underList()"
				+ "--->"
				+ "id=" + id
				);
		
		return getAutoView().addObject("id", id);
	}
	
	/**
	 * 
	 * @名称 添加员工下属
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("addUnder")
	public void addUnder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String[] relIds = RequestUtil.getStringAryByStr(request,"relIds");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.addUnder()"
				+ "--->"
				+ "id="+id+",relIds="+relIds);
		
		try {
			partyEmployeeMgrService.addUnder(id, relIds);
			resultMsg = "员工下属设置成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		}catch (Exception e) {
			resultMsg = "员工下属设置失败";
			writeResultMessage(response.getWriter(),resultMsg+","+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+","+e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * @名称 移除员工下属
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeUnder")
	public void removeUnder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg = "";
		String id = RequestUtil.getString(request, "userId");
		String[] aryIds = RequestUtil.getStringAryByStr(request,"id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.removeUnder()"
				+ "--->"
				+ "id="+id+",aryIds="+aryIds
				);
		
		try {
			partyEmployeeMgrService.removeUnder(id, aryIds);
			resultMsg = "员工下属移除成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		}catch (Exception e) {
			resultMsg = "员工下属移除失败";
			writeResultMessage(response.getWriter(),resultMsg+","+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+","+e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * 员工上级列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("superiorList")
	public ModelAndView superiorList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.superiorList()"
				+ "--->"
				+ "id=" + id);
		
		return getAutoView().addObject("id", id);
	}
	
	/**
	 * 
	 * 用户激活
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("active")
	public void active(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String resultMsg = "";
		String ids = RequestUtil.getString(request,"id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.active()"
				+ "--->"
				+ "ids="+ids
				);
		
		try {
			partyEmployeeMgrService.unlock(ids);
			resultMsg = "员工激活成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		}catch (Exception e) {
			resultMsg = "员工激活失败";
			writeResultMessage(response.getWriter(),resultMsg+","+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+","+e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * 用户禁用
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("disable")
	public void disable(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String resultMsg = "";
		String ids = RequestUtil.getString(request,"id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.disable()"
				+ "--->"
				+ "ids="+ids
				);
		
		try {
			partyEmployeeMgrService.disable(ids);
			resultMsg = "员工禁用成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		}catch (Exception e) {
			resultMsg = "员工禁用失败";
			writeResultMessage(response.getWriter(),resultMsg+","+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+","+e.getMessage(), e);
		}
	}
	@RequestMapping("list2")
	public ModelAndView list2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ModelAndView modelAndView = getAutoView();
		String data = partyAttrQueryService.findByPartyTypeType(PartyType.EMPLOYEE.getValue(), PartyAttrType.QUERY.getValue());
		List<PartyAttrPo> attrs = PartyAttrPo.fromJsonArrayString(data);
		modelAndView.addObject("hasPartyAttr", BeanUtils.isNotEmpty(attrs)?true:false);
		modelAndView.addObject("attrs", BeanUtils.isNotEmpty(attrs)?attrs:"[]");
		return modelAndView;
	}
}
