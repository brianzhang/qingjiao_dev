package com.lc.ibps.platform.org.controller;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.IResourcesQueryService;
import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyOrgAuthQueryService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.api.org.service.IPartyRoleBaseQueryService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.api.org.service.IRoleResourceQueryService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.ResourcesPo;
import com.lc.ibps.org.auth.persistence.entity.SubSystemPo;
import com.lc.ibps.org.party.builder.PartyRoleBuilder;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyRoleTreePo;

/**
* 角色  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-08-08 10:28:09
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/org/partyRole/")
public class PartyRoleBaseController extends GenericController{
	@Resource
	private IPartyRoleBaseQueryService partyRoleBaseQueryService;
	@Resource
	private ISubSysQueryService subSysQueryService;
	@Resource
	private IRoleResourceQueryService roleResourceQueryService;
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyOrgAuthQueryService partyOrgAuthQueryService;
	
	@Resource
	private IResourcesQueryService resourcesQueryService;
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private IPartyUserService defaultPartyUserService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	
	/**
	 * 角色列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		PageList<PartyRolePo> partyRoleList = null;
		QueryFilter queryFilter=getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson()--->params="
						+queryFilter.getParams());
		String listData = partyRoleBaseQueryService.queryWithSysBySysIdJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyRolePo> list = PartyRolePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyRoleList = new PageList<PartyRolePo>(list, pageResult);
		}
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson()--->partyRoleList="
				+(partyRoleList!=null?Arrays.toString(partyRoleList.toArray()):"")
				);
		
		return new PageJson(partyRoleList);
	}
	
	/**
	 * 角色列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listBySubSysJson")
	public @ResponseBody PageJson listBySubSysJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		PageList<PartyRolePo> partyRoleList = new PageList<PartyRolePo>();
		QueryFilter queryFilter=getQuerFilter(request);
		
		//过滤已分配角色
		String partyType=RequestUtil.getString(request, "partyType");
		String partyId=RequestUtil.getString(request, "partyId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listBySubSysJson()--->params="
				+queryFilter.getParams()
				+",partyType="+partyType + ",partyId="+partyId);
		
		if(StringUtil.isNotEmpty(partyId) && StringUtil.isNotEmpty(partyType)){
			List<String> ids = getPartyRoleIds(partyType, partyId);
			if(BeanUtils.isNotEmpty(ids)) queryFilter.addFilter("ID_", ids, QueryOP.NOTIN);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listBySubSysJson()--->params="
				+queryFilter.getParams()
				+",partyType="+partyType + ",partyId="+partyId);
		
		String listData = partyRoleBaseQueryService.queryWithSysBySysIdJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyRolePo> list = PartyRolePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyRoleList = new PageList<PartyRolePo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listBySubSysJson()--->partyRoleList="
				+(partyRoleList!=null?Arrays.toString(partyRoleList.toArray()):"")
				);
		
		return new PageJson(partyRoleList);
	}
	
	/**
	 * 分级管理员角色列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson4Grade")
	public @ResponseBody PageJson listJson4Grade(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		PageList<PartyRolePo> partyRoleList = new PageList<PartyRolePo>();
		List<String> rids = new ArrayList<String>();
		
		String userId = ContextUtil.getCurrentUserId();
		String data = partyOrgAuthQueryService.queryByUserId(userId);
		List<PartyOrgAuthPo> auths = PartyOrgAuthPo.fromJsonArrayString(data);
		if(auths != null){
			for(PartyOrgAuthPo auth : auths){
				//查询权限组织角色
				data = partyOrgService.getByIdJson(auth.getOrgID());
				PartyOrgPo org = PartyOrgPo.fromJsonString(data);
				if(BeanUtils.isNotEmpty(org) && StringUtil.isNotEmpty(org.getRoleIDs())){
					rids.addAll(Arrays.asList(org.getRoleIDs().split(StringPool.COMMA)));
				}
			}
			QueryFilter queryFilter=getQuerFilter(request);
			
			//过滤已分配角色
			String partyType=RequestUtil.getString(request, "partyType");
			String partyId=RequestUtil.getString(request, "partyId");
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson4Grade()--->params="
					+queryFilter.getParams()
					+",partyType="+partyType + ",partyId="+partyId);
			
			if(StringUtil.isNotEmpty(partyId) && StringUtil.isNotEmpty(partyType)){
				List<String> ids = getPartyRoleIds(partyType, partyId);
				rids.removeAll(ids);
			}
			if(BeanUtils.isEmpty(rids)){
				logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson4Grade()--->ids为空，没有可分配角色,"
						, rids.toString());
				return new PageJson();
			}
				
			//查询可分配角色
			queryFilter.addFilter("ID_", rids, QueryOP.IN);
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson4Grade()--->params="
					+queryFilter.getParams()
					+",partyType="+partyType + ",partyId="+partyId);
			
			String listData = partyRoleBaseQueryService.queryWithSysBySysIdJson(queryFilter);
			if(JacksonUtil.isJsonObject(listData)){
				List<PartyRolePo> list = PartyRolePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
				PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
				partyRoleList = new PageList<PartyRolePo>(list, pageResult);
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.listJson4Grade()--->partyRoleList="
				+(partyRoleList!=null?Arrays.toString(partyRoleList.toArray()):"")
				);
		
		return new PageJson(partyRoleList);
	}
	
	/**
	 * 分配角色资源
	 * @return
	 */
	@RequestMapping("resourceDialog")
	public ModelAndView resourceDialog(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String roleId = RequestUtil.getString(request, "roleId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.resourceDialog()--->roleId="+roleId);
		
		List<SubSystemPo> subSystemList = new ArrayList<SubSystemPo>();
		PartyRolePo role = null;
		if(StringUtil.isNotEmpty(roleId)){
			role = PartyRolePo.fromJsonString(partyRoleBaseQueryService.getRoleByIdJson(roleId));
			if(role.getSubSystemId() == null || "0".equals(role.getSubSystemId())){
				String listData = subSysQueryService.findAll();
				if(JacksonUtil.isJsonArray(listData)){
					subSystemList = SubSystemPo.fromJsonArrayString(listData);
				}
			}else{
				String data = subSysQueryService.get(role.getSubSystemId());
				SubSystemPo po = SubSystemPo.fromJsonString(data);
				subSystemList.add(po);
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.resourceDialog()--->roleId="+roleId
				+",role="+(role!=null?role.toString():"")
				+",subSystemList="+(subSystemList!=null?Arrays.toString(subSystemList.toArray()):"")
				);
		
		return getAutoView().addObject("role", role)
							.addObject("subSystemList", subSystemList);
	}
	
	/**
	 * @return 
	 * @名称  根据角色获取选中的资源
	 * @return
	 */
	@RequestMapping("getRolResTreeChecked")
	public @ResponseBody List<ResourcesPo> getRolResTreeChecked(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String roleId = RequestUtil.getString(request, "roleId");
		String systemId = RequestUtil.getString(request, "systemId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.getRolResTreeChecked()--->roleId="
					+roleId+",systemId="+systemId
					);
		
		List<ResourcesPo> resourcesList = new ArrayList<ResourcesPo>();
		
		String listData = roleResourceQueryService.getRoleResTreeChecked(roleId,systemId);
		List<ResourcesPo> resourcesList_ = ResourcesPo.fromJsonArrayString(listData);
		
		if(BeanUtils.isNotEmpty(resourcesList_)) resourcesList.addAll(resourcesList_);
		
		String rootData = resourcesQueryService.getParentResourcesByParentId(systemId, "0");
		ResourcesPo root = ResourcesPo.fromJsonString(rootData);
		resourcesList.add(root);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.getRolResTreeChecked()--->roleId="
				+roleId+",systemId="+systemId
				+",resourcesList="+(resourcesList!=null?Arrays.toString(resourcesList.toArray()):"")
				);
		
		return resourcesList;
	}
	
	/**
	 * @return 
	 * @名称  根据角色获取选中的资源
	 * @return
	 */
	@RequestMapping("getTreeData")
	public @ResponseBody List<PartyRoleTreePo> getTreeData(HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<PartyRoleTreePo> rst = new ArrayList<PartyRoleTreePo>();
		List<SubSystemPo> subSystemList = null;
		String listData = subSysQueryService.findAll();
		if(JacksonUtil.isJsonArray(listData)){
			subSystemList = SubSystemPo.fromJsonArrayString(listData);
		}
		List<PartyRoleTreePo> rs = PartyRoleBuilder.buildParentTreePo(subSystemList);
		if(BeanUtils.isNotEmpty(rs)) rst.addAll(rs);
		
		List<PartyRolePo> roleList = PartyRolePo.fromJsonArrayString(partyRoleBaseQueryService.queryWithSysJson());
		List<PartyRoleTreePo> _rs = PartyRoleBuilder.buildTree(roleList);
		if(BeanUtils.isNotEmpty(_rs)) rst.addAll(_rs);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.getTreeData()--->"
				+"rst="+(rst!=null?Arrays.toString(rst.toArray()):"")
				);
		
		return rst;
	}
	
	/**
	 * 获取角色人员数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("findUsersByRoleId")
	public @ResponseBody PageJson findUsersByRoleId(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String roleId = RequestUtil.getString(request, "roleId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.findUsersByRoleId()--->roleId="+roleId);
		if(StringUtil.isBlank(roleId)) return new PageJson();
		
		QueryFilter queryFilter=getQuerFilter(request);
//		//获取用户相关的用户ids
		String ids = defaultPartyUserService.findUserByRoleId(roleId);
		if(StringUtil.isBlank(ids))return new PageJson();
		
		queryFilter.addFilter("ID_", ids, QueryOP.IN);
		PageList<PartyEmployeePo> employeeList = new PageList<PartyEmployeePo>();
		String listData = partyEmployeeService.queryJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			employeeList = new PageList<PartyEmployeePo>(list, pageResult);
		}
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.findUsersByRoleId()--->"
				+"employeeList="+(employeeList!=null?Arrays.toString(employeeList.toArray()):"")
				);
		
		return new PageJson(employeeList);
	}
	
	/*###################################*/
	
	/**
	 * 根据参与者类型、id获取已分配角色id列表
	 *
	 * @param partyType
	 * @param partyId
	 * @return 
	 */
	private List<String> getPartyRoleIds(String partyType, String partyId){
		List<String> ids = new ArrayList<String>();
		
		if(PartyType.ORG.getValue().equals(partyType)){
			getOrgRoleIds(partyId, ids);
		}else if(PartyType.POSITION.getValue().equals(partyType)){
			getPositionRoleIds(partyId, ids);
		}
		
		return ids;
	}

	/**
	 * 根据组织id获取组织已分配角色列表
	 *
	 * @param partyId
	 * @param ids 
	 */
	private void getOrgRoleIds(String partyId, List<String> ids) {
		String data = partyOrgService.getByIdJson(partyId);
		PartyOrgPo org = PartyOrgPo.fromJsonString(data);
		if(BeanUtils.isNotEmpty(org) && BeanUtils.isNotEmpty(org.getRoleIDs())){
			ids.addAll(Arrays.asList(org.getRoleIDs().split(StringPool.COMMA)));
		}
	}
	
	/**
	 * 根据岗位id获取组织已分配角色列表
	 *
	 * @param partyId
	 * @param ids 
	 */
	private void getPositionRoleIds(String partyId, List<String> ids) {
		String data = partyPositionService.get(partyId);
		PartyPositionPo position = PartyPositionPo.fromJsonString(data);
		if(BeanUtils.isNotEmpty(position) && BeanUtils.isNotEmpty(position.getOrgID())){
			getOrgRoleIds(position.getOrgID(), ids);
		}
		if(BeanUtils.isNotEmpty(position) && BeanUtils.isNotEmpty(position.getRelRoles())){
			ids.removeAll(Arrays.asList(position.getRelRoles().split(StringPool.COMMA)));
			ids.addAll(Arrays.asList(position.getRelRoles().split(StringPool.COMMA)));
		}
	}
}
