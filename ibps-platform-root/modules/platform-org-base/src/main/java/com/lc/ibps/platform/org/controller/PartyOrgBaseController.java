package com.lc.ibps.platform.org.controller;

import java.util.ArrayList;
import java.util.Arrays;
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
import com.lc.ibps.api.org.constant.UserStatus;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyOrgAuthQueryService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.api.org.service.IPartyRoleBaseQueryService;
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
import com.lc.ibps.org.party.builder.PartyPositionBuilder;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityTreePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;

/**
 * 组织 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-org-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-06-20 09:08:11
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyOrg/")
public class PartyOrgBaseController extends GenericController {
	
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyEntityService defaultPartyEntityService;
	@Resource
	private IPartyOrgAuthQueryService partyOrgAuthQueryService;
	
	//----------------------------------
	@Resource
	private IPartyRoleBaseQueryService partyRoleBaseQueryService;
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;

	/**
	 * 参与者列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyOrgService.query(queryFilter);
		PageList<PartyOrgPo> partyEntitList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyOrgPo> list = PartyOrgPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyOrgPo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listJson()" + "--->partyEntitList="
				+ (partyEntitList != null ? Arrays.toString(partyEntitList.toArray()) : ""));

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
	@RequestMapping("listJson4Dialog")
	public @ResponseBody PageJson listJson4Dialog(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		int type = RequestUtil.getInt(request, "type");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listJson4Dialog()" + "--->type=" + type);

		PageList<PartyOrgPo> partyEntitList = null;
		List<PartyEntityTreePo> groupTreeList = new ArrayList<PartyEntityTreePo>();
		QueryFilter queryFilter = getQuerFilter(request);

		addFilter(request, type, groupTreeList, queryFilter);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listJson4Dialog()" + "--->type=" + type
				+ ",params=" + queryFilter.getParams());

		String listData = partyOrgService.query(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyOrgPo> list = PartyOrgPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyOrgPo>(list, pageResult);
		}
		
		for (PartyOrgPo po : partyEntitList) {
			po.setPathName(PartyEntityBuilder.buildPathName(po.getId()));
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listJson4Dialog()" + "--->partyEntitList="
				+ (partyEntitList != null ? Arrays.toString(partyEntitList.toArray()) : ""));

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
	@RequestMapping("listWithLevelJson")
	public @ResponseBody PageJson listWithLevelJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listWithLevelJson()" + "--->" + "params="
				+ queryFilter.getParams());

		String listData = partyOrgService.queryWithLevel(queryFilter);
		PageList<PartyOrgPo> partyEntitList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyOrgPo> list = PartyOrgPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyOrgPo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.listWithLevelJson()"
				+ "--->partyEntitList=" + (partyEntitList != null ? Arrays.toString(partyEntitList.toArray()) : ""));

		return new PageJson(partyEntitList);
	}

	/**
	 * 
	 * 组织左树数据展示
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<PartyEntityTreePo> getTreeData(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		int type = RequestUtil.getInt(request, "type");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.getTreeData()" + "--->type=" + type);

		List<PartyEntityTreePo> groupTreeList = new ArrayList<PartyEntityTreePo>();
		List<PartyEntityTreePo> tmp = null;
		String userId = null;
		String orgId = null;
		PartyEmployeePo partyEmployee = null;
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		List<String> ids = null;
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams, PartyType.ORG.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new ArrayList<PartyEntityTreePo>();
			}
			ids = JacksonUtil.getDTOList(data, String.class);
		}

		String data = null;
		switch (type) {
		case 0:// 没有传type参数默认查询所有
		case 1:// 查询所有组织数据
			data = defaultPartyEntityService.findTreeByTypeJson(PartyType.ORG.getValue());
			if(JacksonUtil.isJsonArray(data)){
				groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
			}
			break;
		case 2:// 查询本组织数据
			userId = ContextUtil.getCurrentUserId();
			partyEmployee = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
			if (BeanUtils.isNotEmpty(partyEmployee) && StringUtil.isNotBlank(partyEmployee.getGroupID())) {
				orgId = partyEmployee.getGroupID();
				data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), orgId, true);
				if(JacksonUtil.isJsonArray(data)){
					groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
				}
			}
			break;
		case 3:// 查询指定组织数据
			orgId = RequestUtil.getString(request, "orgId");
			if (StringUtil.isNotBlank(orgId)) {
				data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), orgId, true);
				if(JacksonUtil.isJsonArray(data)){
					groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
				}
			}
			break;
		case 4:// 查询分级授权组织数据
			userId = ContextUtil.getCurrentUserId();
			data = partyOrgAuthQueryService.queryByUserId(userId);
			List<PartyOrgAuthPo> auths = PartyOrgAuthPo.fromJsonArrayString(data);
			orgId = null;
			if (auths != null){
				int idx=0;
				for (PartyOrgAuthPo po : auths) {
					orgId = po.getOrgID();
					if (StringUtil.isNotBlank(orgId)) {
						data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), orgId, idx==0?true:false);
						if(JacksonUtil.isJsonArray(data)){
							tmp = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
						}
						if (tmp != null){
							groupTreeList.addAll(tmp);
						}
						idx++;
					}
				}
			}
			break;
		default:
			break;
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.getTreeData()" + "--->type=" + type
				+ ",groupTreeList=" + (groupTreeList != null ? Arrays.toString(groupTreeList.toArray()) : ""));
		
		//过滤不符合参与者属性的数据
		List<PartyEntityTreePo> result = filterByIds(ids, groupTreeList);
		
		return result;
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
	@RequestMapping("orgPositionListJson")
	public @ResponseBody PageJson orgPositionListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		PageList<PartyPositionPo> orgPosList = new PageList<PartyPositionPo>();
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgPositionListJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyPositionService.queryWithLevelByOrgId(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyPositionPo> list = PartyPositionPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			orgPosList = new PageList<PartyPositionPo>(list, pageResult);
			PartyPositionBuilder.build(orgPosList);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgPositionListJson()" + "--->params="
				+ queryFilter.getParams() + ",orgPosList="
				+ (orgPosList != null ? Arrays.toString(orgPosList.toArray()) : ""));

		return new PageJson(orgPosList);
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
	@RequestMapping("orgRoleListJson")
	public @ResponseBody PageJson orgRoleListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgRoleListJson()" + "--->id=" + id);

		String data = partyOrgService.getByIdJson(id);
		PartyOrgPo po = PartyOrgPo.fromJsonString(data);
		
		PageList<PartyRolePo> orgRoleList = new PageList<PartyRolePo>();
		String listData = null;
		if (BeanUtils.isNotEmpty(po) && StringUtil.isNotBlank(po.getRoleIDs())) {
			List<String> ids = Arrays.asList(po.getRoleIDs().split(StringPool.COMMA));
			QueryFilter queryFilter = getQuerFilter(request);

			logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgRoleListJson()" + "--->id=" + id
					+ ",ids=" + (ids != null ? Arrays.toString(ids.toArray()) : ""));

			listData = partyRoleBaseQueryService.queryWithSysByIdsJson(ids, queryFilter.getPage());
			if(JacksonUtil.isJsonObject(listData)){
				List<PartyRolePo> list = PartyRolePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
				PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
				orgRoleList = new PageList<PartyRolePo>(list, pageResult);
			}
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgRoleListJson()" + "--->id=" + id
				+ ",orgRoleList=" + (orgRoleList != null ? Arrays.toString(orgRoleList.toArray()) : ""));

		return new PageJson(orgRoleList);
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
	@RequestMapping("roleList4EmpJson")
	public @ResponseBody List<PartyRolePo> roleList4EmpJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleList4EmpJson()" + "--->id=" + id);

		String data = partyOrgService.getByIdJson(id);
		PartyOrgPo po = PartyOrgPo.fromJsonString(data);
		
		List<PartyRolePo> orgRoleList = new ArrayList<PartyRolePo>();
		String listData = null;
		if (BeanUtils.isNotEmpty(po) && StringUtil.isNotBlank(po.getRoleIDs())) {
			List<String> ids = Arrays.asList(po.getRoleIDs().split(StringPool.COMMA));

			logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleList4EmpJson()" + "--->id=" + id
					+ ",ids=" + (ids != null ? Arrays.toString(ids.toArray()) : ""));

			listData = partyRoleBaseQueryService.findWithSysByIdsJson(ids);
			orgRoleList = PartyRolePo.fromJsonArrayString(listData);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleList4EmpJson()" + "--->id=" + id
				+ ",orgRoleList=" + (orgRoleList != null ? Arrays.toString(orgRoleList.toArray()) : ""));

		return orgRoleList;
	}

	/**
	 * 
	 * 组织人员列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("orgUserListJson")
	public @ResponseBody PageJson orgUserListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		PageList<PartyEmployeePo> positionRoleList = new PageList<PartyEmployeePo>();
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("STATUS_", UserStatus.DELETED.getValue(), QueryOP.NOT_EQUAL);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgUserListJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyEmployeeService.queryWithOrgJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			positionRoleList = new PageList<PartyEmployeePo>(list, pageResult);
		}

		logger.debug(
				"com.lc.ibps.platform.org.controller.PartyOrgController.orgUserListJson()" + "--->positionRoleList="
						+ (positionRoleList != null ? Arrays.toString(positionRoleList.toArray()) : ""));

		return new PageJson(positionRoleList);
	}

	/**
	 * 
	 * 组织人员列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("orgManagerListJson")
	public @ResponseBody PageJson orgManagerListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		PageList<PartyEmployeePo> positionRoleList = new PageList<PartyEmployeePo>();
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addParamsFilter("partyRelType", PartyRelType.ORG_MANAGER.key());

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.orgManagerListJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyEmployeeService.queryOrgManagerJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			positionRoleList = new PageList<PartyEmployeePo>(list, pageResult);
		}

		logger.debug(
				"com.lc.ibps.platform.org.controller.PartyOrgController.orgManagerListJson()" + "--->positionRoleList="
						+ (positionRoleList != null ? Arrays.toString(positionRoleList.toArray()) : ""));

		return new PageJson(positionRoleList);
	}

	/**
	 * 
	 * 组织人员列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("findByUserIdJson")
	public @ResponseBody List<PartyOrgPo> findByUserIdJson(HttpServletRequest request,
			HttpServletResponse reponse) throws Exception {
		String[] userIds = RequestUtil.getStringAryByStr(request, "userId");
		List<PartyOrgPo> entitys = new ArrayList<PartyOrgPo>();
		List<PartyOrgPo> entitys_ = null;
		for (String userId : userIds) {
			String data = partyOrgService.findByUserIdJson(userId);
			if(JacksonUtil.isNotJsonArray(data)){
				continue;
			}
			entitys_ = PartyOrgPo.fromJsonArrayString(data);
			entitys.removeAll(entitys_);
			entitys.addAll(entitys_);
		}

		return entitys;
	}

	/**
	 * 添加过滤条件
	 *
	 * @param request
	 * @param type
	 * @param groupTreeList
	 * @param queryFilter
	 */
	private void addFilter(HttpServletRequest request, int type, List<PartyEntityTreePo> groupTreeList,
			QueryFilter queryFilter) {
		List<PartyEntityTreePo> tmp;
		String userId;
		String orgId;
		String data;
		switch (type) {
		case 0:// 没有传type参数默认查询所有
		case 1:// 查询所有组织数据
			break;
		case 2:// 查询本组织数据
			com.lc.ibps.api.base.model.PartyEntity currOrg = ContextUtil.getCurrentOrg();
			if (BeanUtils.isNotEmpty(currOrg)) {
				data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), currOrg.getId(), true);
				if(JacksonUtil.isJsonArray(data)){
					groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
				}
				
				addFilter(groupTreeList, queryFilter);
			}
			break;
		case 3:// 查询指定组织数据
			orgId = RequestUtil.getString(request, "orgId");
			if (StringUtil.isNotBlank(orgId)) {
				data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), orgId, true);
				if(JacksonUtil.isJsonArray(data)){
					groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
				}
				
				addFilter(groupTreeList, queryFilter);
			}
			break;
		case 4:// 查询分级授权组织数据
			userId = ContextUtil.getCurrentUserId();
			data = partyOrgAuthQueryService.queryByUserId(userId);
			List<PartyOrgAuthPo> auths = PartyOrgAuthPo.fromJsonArrayString(data);
			orgId = null;
			if (auths != null){
				int idx=0;
				for (PartyOrgAuthPo po : auths) {
					orgId = po.getOrgID();
					if (StringUtil.isNotBlank(orgId)) {
						data = defaultPartyEntityService.findTreeByTypeAndPidJson(PartyType.ORG.getValue(), orgId, idx==0?true:false);
						if(JacksonUtil.isJsonArray(data)){
							tmp = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
							if (tmp != null) groupTreeList.addAll(tmp);
						}
					}
					idx++;
				}
			}
			if (groupTreeList != null && groupTreeList.size() != 0)
				addFilter(groupTreeList, queryFilter);
			break;
		default:
			break;
		}
	}

	/**
	 * 添加ID过滤条件
	 *
	 * @param groupTreeList
	 * @param queryFilter
	 */
	private void addFilter(List<PartyEntityTreePo> groupTreeList, QueryFilter queryFilter) {
		List<String> orgIds = new ArrayList<String>();
		for (PartyEntityTreePo po : groupTreeList) {
			orgIds.add(po.getId());
		}
		queryFilter.addFilter("ID_", orgIds, QueryOP.IN);
	}

	/**
	 * 把id列表不包含在内的节点过滤掉
	 *
	 * @param ids
	 * @param partyEntityList
	 * @return
	 */
	private List<PartyEntityTreePo> filterByIds(List<String> ids, List<PartyEntityTreePo> partyEntityList) {
		List<PartyEntityTreePo> result = new ArrayList<PartyEntityTreePo>();
		if(BeanUtils.isNotEmpty(ids)){
			for (PartyEntityTreePo partyEntityPo : partyEntityList) {
				if(ids.contains(partyEntityPo.getId())||partyEntityPo.parentId==null){
					result.add(partyEntityPo);
				}
			}
			//不以树结构显示
			for (PartyEntityTreePo partyEntityPo : result) {
				if(partyEntityPo.parentId==null) continue;
				partyEntityPo.setParentId("0");
			}
		}else{
			result = partyEntityList;
		}
		return result;
	}

}
