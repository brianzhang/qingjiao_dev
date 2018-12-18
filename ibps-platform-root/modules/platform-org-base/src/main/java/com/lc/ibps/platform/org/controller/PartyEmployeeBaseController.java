package com.lc.ibps.platform.org.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.constant.PartyRelType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyGroupService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.api.org.service.IPartyRoleBaseQueryService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;
import com.lc.ibps.org.party.builder.PartyUserGroupBuilder;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyUserGroupPo;

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
public class PartyEmployeeBaseController  extends GenericController{
	
	@Resource
	private IPartyRoleBaseQueryService partyRoleBaseQueryService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyEntityService defaultPartyEntityService;
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private IPartyGroupService groupService;
	
	/**
	 * 参与者列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams, PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listJson()"
				+"--->"
				+"params="+queryFilter.getParams()
				);
		PageList<PartyEmployeePo> partyEntitList = null;
		String listData = partyEmployeeService.queryWithOrgJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyEmployeePo>(list, pageResult);
		}
		for(PartyEmployeePo po : partyEntitList){
			String groupId = po.getGroupID();
			if(StringUtil.isNotEmpty(groupId)){
				po.setOrgName(PartyEntityBuilder.buildPathName(groupId));
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listJson()"
				+"--->"
				+"partyEntitList="+(partyEntitList!=null?Arrays.toString(partyEntitList.toArray()):"")
				);
		
		return new PageJson(partyEntitList);
	}
	
	/**
	 * 参与者列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listWoutPosJson")
	public @ResponseBody PageJson listWoutPosJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String posId = RequestUtil.getString(request, "posId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutPosJson()"
				+ "--->"
				+ "posId="+posId
				);
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addParamsFilter("posId", "%"+posId+"%");
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if(BeanUtils.isNotEmpty(attrParams)){
			
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams, PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutPosJson()"
				+ "--->"
				+ "params="+queryFilter.getParams()
				);
		
		PageList<PartyEmployeePo> partyEntitList = null;
		String listData = partyEmployeeService.queryWithOrgForPosJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyEmployeePo>(list, pageResult);
		}
		for(PartyEmployeePo po : partyEntitList){
			if(StringUtil.isNotEmpty(po.getGroupID())){
				po.setOrgName(PartyEntityBuilder.buildPathName(po.getGroupID()));
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutPosJson()"
				+ "--->"
				+ "partyEntitList="+(partyEntitList!=null?Arrays.toString(partyEntitList.toArray()):"")
				);
		
		return new PageJson(partyEntitList);
	}
	
	/**
	 * 参与者列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listWoutOrgJson")
	public @ResponseBody PageJson listWoutOrgJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String orgId = RequestUtil.getString(request, "orgId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutOrgJson()"
				+ "--->"
				+ "orgId="+orgId
				);
		
		QueryFilter queryFilter=getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutOrgJson()"
				+ "--->"
				+ "params="+queryFilter.getParams()
				);
		
		PageList<PartyEmployeePo> partyEntitList = null;
		String listData = partyEmployeeService.queryWoutOrgJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyEmployeePo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.listWoutOrgJson()"
				+ "--->"
				+ "partyEntitList="+(partyEntitList!=null?Arrays.toString(partyEntitList.toArray()):"")
				);
		
		return new PageJson(partyEntitList);
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
	@RequestMapping("empPosListJson")
	public @ResponseBody PageJson empPosListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String id = RequestUtil.getString(request, "id");
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empPosListJson()"
	 			+ "--->"
	 			+ "id="+id
	 			);
	 	
	 	PageList<PartyPositionPo> empPosList = new PageList<PartyPositionPo>();
	 	if(StringUtil.isNotBlank(id)){
		 	PartyEmployeePo po = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(id));
		 	if(BeanUtils.isNotEmpty(po) && StringUtil.isNotBlank(po.getPositions())){
		 		List<String> ids = Arrays.asList(po.getPositions().split(StringPool.COMMA));
		 		QueryFilter queryFilter=getQuerFilter(request);
		 		
		 		String listData = partyPositionService.queryWithOrgByIds(ids, id, PartyRelType.MAIN_POST.key(), PartyRelType.PRINCIPAL.key(), queryFilter.getPage());
		 		if(JacksonUtil.isJsonObject(listData)){
		 			List<PartyPositionPo> list = PartyPositionPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
					PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
					empPosList = new PageList<PartyPositionPo>(list, pageResult);
		 		}
		 	}
	 	}
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empPosListJson()"
	 			+ "--->"
	 			+ "empPosList="+(empPosList!=null?Arrays.toString(empPosList.toArray()):"")
	 			);
		
		return new PageJson(empPosList);
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
	@RequestMapping("empPos4EditListJson")
	public @ResponseBody List<PartyPositionPo> empPos4EditListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String id = RequestUtil.getString(request, "id");
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empPos4EditListJson()"
	 			+ "--->"
	 			+ "id="+id
	 			);
	 	
	 	List<PartyPositionPo> empPosList = new ArrayList<PartyPositionPo>();
	 	if(StringUtil.isNotBlank(id)){
		 	PartyEmployeePo po = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(id));
		 	if(BeanUtils.isNotEmpty(po) && StringUtil.isNotBlank(po.getPositions())){
		 		List<String> ids = Arrays.asList(po.getPositions().split(StringPool.COMMA));
		 		String data = partyPositionService.findWithOrgByIds(ids, id, PartyRelType.MAIN_POST.key(), PartyRelType.PRINCIPAL.key());
		 		empPosList=PartyPositionPo.fromJsonArrayString(data);
		 	}
	 	}
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empPos4EditListJson()"
	 			+ "--->"
	 			+ "empPosList="+(empPosList!=null?Arrays.toString(empPosList.toArray()):"")
	 			);
		
		return empPosList;
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
	@RequestMapping("empRoleListJson")
	public @ResponseBody List<PartyRolePo> empRoleListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String id = RequestUtil.getString(request, "id");
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empRoleListJson()"
	 			+ "--->"
	 			+ "id="+id
	 			);
	 	 	
	 	List<PartyRolePo> empRoleList = 
	 			PartyRolePo.fromJsonArrayString(partyRoleBaseQueryService.findRoleByUIDJson(id));
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empRoleListJson()"
	 			+ "--->"
	 			+ "empRoleList="+(empRoleList!=null?Arrays.toString(empRoleList.toArray()):"")
	 			);
		
		return empRoleList;
	}
	/**
	 * 
	 * 获取组织或岗位的默认角色
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("roleListJson")
	public @ResponseBody List<PartyRolePo> roleListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		String posId = RequestUtil.getString(request, "posId");
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleListJson()" + "--->orgId=" + orgId + ",posId="+posId);
		
		List<String> ids = new ArrayList<String>();
		List<String> temp = null;
		if(StringUtil.isNotBlank(orgId)){
			temp = JacksonUtil.getDTOList(partyRoleBaseQueryService.findRolesByOrgIdJson(orgId), String.class);
			ids.addAll(temp);
		}
		if(StringUtil.isNotBlank(posId)){
			temp = JacksonUtil.getDTOList(partyRoleBaseQueryService.findRolesByPosIdJson(posId), String.class);
			ids.removeAll(temp);
			ids.addAll(temp);
		}
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleListJson()" + "--->orgId=" + orgId + ",posId="+posId
				+ ",ids=" + (ids != null ? Arrays.toString(ids.toArray()) : ""));
		
		if(BeanUtils.isEmpty(ids)) return null;
		List<PartyRolePo> orgRoleList = 
				PartyRolePo.fromJsonArrayString(partyRoleBaseQueryService.findWithSysByIdsJson(ids));
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleListJson()" + "--->orgId=" + orgId + ",posId="+posId
				+ ",orgRoleList=" + (orgRoleList != null ? Arrays.toString(orgRoleList.toArray()) : ""));
		for (PartyRolePo partyRolePo : orgRoleList) {
			partyRolePo.setSource("其他");
		}
		return orgRoleList;
	}
	
	/**
	 * 
	 * 用户组列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("empGroupListJson")
	public @ResponseBody List<PartyUserGroupPo> empGroupListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String id = RequestUtil.getString(request, "id", "");
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empGroupListJson()"
	 			+ "--->"
	 			+ "id="+id
	 			);
	 	
	 	if(BeanUtils.isEmpty(id)) return Collections.emptyList();
	 	
	 	List<PartyUserGroupPo> empGroupList = 
	 			PartyUserGroupPo.fromJsonArrayString(groupService.findByUserIdJson(id));
		//PartyUserGroupBuilder.build(empGroupList,id);
	 	PartyUserGroupBuilder.build(empGroupList);
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empGroupListJson()"
	 			+ "--->"
	 			+ "empGroupList="+(empGroupList!=null?Arrays.toString(empGroupList.toArray()):"")
	 			);
		
		return empGroupList;
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
	@RequestMapping("empRole4EditListJson")
	public @ResponseBody List<PartyRolePo> empRole4EditListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String id = RequestUtil.getString(request, "id");
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empRole4EditListJson()"
	 			+ "--->"
	 			+ "id="+id
	 			);
	 	
	 	PartyEmployeePo po = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(id));
	 	if(BeanUtils.isEmpty(po)) return new ArrayList<PartyRolePo>();
	 	
	 	List<PartyRolePo> roleList = 
	 			PartyRolePo.fromJsonArrayString(partyRoleBaseQueryService.findWoutURoleByUIDJson(id));
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.empRole4EditListJson()"
	 			+ "--->"
	 			+ "roleList="+(roleList!=null?Arrays.toString(roleList.toArray()):"")
	 			);
		
		return roleList;
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
	@RequestMapping("underListJson")
	public @ResponseBody List<PartyEmployeePo> underListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		// Q^MAIN_PID_^S = dfsdg-df-df-sar-gh
		QueryFilter queryFilter=getQuerFilter(request);
	 	queryFilter.addParamsFilter("partyRelType", PartyRelType.UNDER.key());
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.underListJson()"
	 			+ "--->"
	 			+ "params="+queryFilter.getParams()
	 			);
	 	
	 	List<PartyEmployeePo> underList = null;
		String listData = partyEmployeeService.queryUnderJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			underList = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
		}
		
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.underListJson()"
	 			+ "--->"
	 			+ "underList="+(underList!=null?Arrays.toString(underList.toArray()):"")
	 			);
	 	
		return underList;
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
	@RequestMapping("superiorListJson")
	public @ResponseBody List<PartyEmployeePo> superiorListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	// Q^SUB_PID_^S = dfsdg-df-df-sar-gh
		QueryFilter queryFilter=getQuerFilter(request);
	 	queryFilter.addParamsFilter("partyRelType", PartyRelType.UNDER.key());
	 	
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.superiorListJson()"
	 			+ "--->"
	 			+ "params="+queryFilter.getParams()
	 			);
	 	
	 	PageList<PartyEmployeePo> superiorList = new PageList<PartyEmployeePo>();
		String listData = partyEmployeeService.querySuperiorJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			superiorList = new PageList<PartyEmployeePo>(list, pageResult);
		}
		
	 	logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.superiorListJson()"
	 			+ "--->"
	 			+ "superiorList="+(superiorList!=null?Arrays.toString(superiorList.toArray()):"")
	 			);
	 	
		return superiorList;
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
	@RequestMapping("findByOrgId")
	public @ResponseBody List<String> findByOrgId(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
	 	String orgId = RequestUtil.getString(request, "orgId");
	 	if(BeanUtils.isEmpty(orgId)) return Collections.emptyList();
	 	List<String> userIds = new ArrayList<String>();
	 	List<PartyEmployeePo> es = 
	 			PartyEmployeePo.fromJsonArrayString(partyEmployeeService.findByOrgIdJson(orgId));
	 	for(PartyEmployeePo e : es){
	 		userIds.add(e.getId());
	 	}
	 	
	 	return userIds;
	}
	
}
