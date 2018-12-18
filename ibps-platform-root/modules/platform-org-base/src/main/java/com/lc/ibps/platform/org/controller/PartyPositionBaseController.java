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
import com.lc.ibps.api.org.constant.PartyRelType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.api.org.service.IPartyRelQueryService;
import com.lc.ibps.api.org.service.IPartyRoleBaseQueryService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityTreePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;
import com.lc.ibps.org.party.persistence.entity.PartyRelPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;

/**
 * 岗位 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-common-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-08-05 10:07:14
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyPosition/")
public class PartyPositionBaseController extends GenericController {
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private IPartyEntityService partyEntityService;
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyRoleBaseQueryService partyRoleBaseQueryService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyRelQueryService partyRelQueryService;

	/**
	 * 岗位列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyPositionService.query(queryFilter);
		PageList<PartyPositionPo> partyPositionList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyPositionPo> list = PartyPositionPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyPositionList = new PageList<PartyPositionPo>(list, pageResult);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listJson()" + "--->partyPositionList="
				+ (partyPositionList != null ? Arrays.toString(partyPositionList.toArray()) : ""));

		return new PageJson(partyPositionList);
	}

	/**
	 * 岗位列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonByOrgNull")
	public @ResponseBody PageJson listJsonByOrgNull(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listJsonByOrgNull()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyPositionService.queryOrgIsNull(queryFilter);
		PageList<PartyPositionPo> partyPositionList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyPositionPo> list = PartyPositionPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyPositionList = new PageList<PartyPositionPo>(list, pageResult);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listJsonByOrgNull()"
				+ "--->partyPositionList="
				+ (partyPositionList != null ? Arrays.toString(partyPositionList.toArray()) : ""));

		return new PageJson(partyPositionList);
	}

	/**
	 * 岗位列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listWithOrgJson")
	public @ResponseBody PageJson listWithOrgJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listWithOrgJson()" + "--->params="
				+ queryFilter.getParams());

		String listData = partyPositionService.queryWithOrg(queryFilter);
		PageList<PartyPositionPo> partyPositionList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyPositionPo> list = PartyPositionPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyPositionList = new PageList<PartyPositionPo>(list, pageResult);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.listWithOrgJson()"
				+ "--->partyPositionList="
				+ (partyPositionList != null ? Arrays.toString(partyPositionList.toArray()) : ""));

		return new PageJson(partyPositionList);
	}

	/**
	 * 
	 * 岗位左树数据展示
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
		// String type=RequestUtil.getString(request, "type");
		String orgId = RequestUtil.getString(request, "orgId");
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		List<String> ids = null;
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = partyEntityService.findByAttrKeyValueJson(attrParams, PartyType.POSITION.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new ArrayList<PartyEntityTreePo>();
			}
			ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new ArrayList<PartyEntityTreePo>();
			}
		}
		
		List<PartyEntityTreePo> groupTreeList = null;
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.getTreeData()" + "--->" + "orgId="
				+ orgId);

		String data = null;
		if (StringUtil.isNotEmpty(orgId)) {
			data = partyEntityService.findTreeByTypeAndOidJson(PartyType.POSITION.getValue(), orgId, ids);
		} else {
			data = partyEntityService.findTreeByTypeJson(PartyType.POSITION.getValue(), ids);
		}
		
		if(JacksonUtil.isJsonArray(data)){
			groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.getTreeData()" + "--->"
				+ "groupTreeList=" + (groupTreeList != null ? Arrays.toString(groupTreeList.toArray()) : ""));

		return groupTreeList;
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
	@RequestMapping("positionRoleListJson")
	public @ResponseBody PageJson positionRoleListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.positionRoleListJson()" + "--->"
				+ "id=" + id);

		PageList<PartyRolePo> positionRoleList = new PageList<PartyRolePo>();
		List<String> ids = new ArrayList<String>();
		
		String data = partyPositionService.get(id);
		PartyPositionPo po = PartyPositionPo.fromJsonString(data);
		if (BeanUtils.isEmpty(po))
			return new PageJson(positionRoleList);

		List<String> cannotDelete = null;
		if (StringUtil.isNotBlank(po.getOrgID())) {
			data = partyOrgService.getByIdJson(po.getOrgID());
			PartyOrgPo org = PartyOrgPo.fromJsonString(data);
			if(BeanUtils.isNotEmpty(org)){
				cannotDelete = parseRoleIds(org.getRoleIDs());
				ids.addAll(cannotDelete);
			}
		}

		List<String> canDelete = parseRoleIds(po.getRelRoles());
		ids.removeAll(canDelete);
		ids.addAll(canDelete);
		String listData = null;
		if (ids != null && ids.size() != 0) {
			QueryFilter queryFilter = getQuerFilter(request);
			listData = partyRoleBaseQueryService.queryWithSysByIdsJson(ids, queryFilter.getPage());
			if(JacksonUtil.isJsonObject(listData)){
				List<PartyRolePo> list = PartyRolePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
				PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
				positionRoleList = new PageList<PartyRolePo>(list, pageResult);
			}
			setCanDelete(canDelete, positionRoleList);
		}
		
		setSource(canDelete,cannotDelete,positionRoleList);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.positionRoleListJson()" + "--->"
				+ "positionRoleList=" + (positionRoleList != null ? Arrays.toString(positionRoleList.toArray()) : ""));

		return new PageJson(positionRoleList);
	}
	
	private void setSource(List<String> canDelete, List<String> cannotDelete, PageList<PartyRolePo> positionRoleList) {
		if(BeanUtils.isEmpty(positionRoleList))
			return;
		Boolean isCanNull = BeanUtils.isNotEmpty(canDelete);
		Boolean isCannotNull = BeanUtils.isNotEmpty(cannotDelete);
		StringBuilder tmp = new StringBuilder("");
		for (PartyRolePo partyRolePo : positionRoleList) {
			if(isCanNull&&canDelete.contains(partyRolePo.getId())){
				tmp.append("自有");
			}
			if(isCannotNull&&cannotDelete.contains(partyRolePo.getId())){
				if(tmp.length()>0) tmp.append(StringPool.COMMA);
				tmp.append("组织");
			}
			partyRolePo.setSource(tmp.toString());
			tmp.setLength(0);
		}
		
	}

	private void setCanDelete(List<String> canDelete, PageList<PartyRolePo> positionRoleList){
		if(BeanUtils.isEmpty(canDelete) || BeanUtils.isEmpty(positionRoleList)){
			return;
		}
		
		for(PartyRolePo po : positionRoleList){
			if(canDelete.contains(po.getId())){
				po.setCanDelete(true);
			}else{
				po.setCanDelete(false);
			}
		}
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

		logger.debug(
				"com.lc.ibps.platform.org.controller.PartyPositionController.roleList4EmpJson()" + "--->" + "id=" + id);

		List<PartyRolePo> positionRoleList = new ArrayList<PartyRolePo>();
		
		String data = partyPositionService.get(id);
		PartyPositionPo po = PartyPositionPo.fromJsonString(data);
		
		String listData = null;
		if (BeanUtils.isNotEmpty(po) && StringUtil.isNotBlank(po.getRelRoles())) {
			List<String> ids = Arrays.asList(po.getRelRoles().split(StringPool.COMMA));
			listData = partyRoleBaseQueryService.findWithSysByIdsJson(ids);
			positionRoleList = PartyRolePo.fromJsonArrayString(listData);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.roleList4EmpJson()" + "--->"
				+ "positionRoleList=" + (positionRoleList != null ? Arrays.toString(positionRoleList.toArray()) : ""));

		return positionRoleList;
	}

	/**
	 * 
	 * 岗位人员列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("positionUserListJson")
	public @ResponseBody PageJson positionUserListJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		PageList<PartyEmployeePo> positionRoleList = new PageList<PartyEmployeePo>();
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.positionUserListJson()" + "--->"
				+ "params=" + queryFilter.getParams());

		String listData = partyEmployeeService.queryWithOrgJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEmployeePo> list = PartyEmployeePo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			positionRoleList = new PageList<PartyEmployeePo>(list, pageResult);
		}

		fill(request, positionRoleList);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.positionUserListJson()" + "--->"
				+ "positionRoleList=" + (positionRoleList != null ? Arrays.toString(positionRoleList.toArray()) : ""));

		return new PageJson(positionRoleList);
	}

	/**
	 * 
	 * 是否主岗位或主负责人
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("isMorP")
	public @ResponseBody Boolean isMorP(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String userId = RequestUtil.getString(request, "userId");
		String posId = RequestUtil.getString(request, "posId");
		String biz = RequestUtil.getString(request, "biz");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.isMorP()" + "--->" + "userId="
				+ userId + ",posId=" + posId + ",biz=" + biz);

		PartyRelType _org = PartyRelType.get(biz);
		if (_org == null) {
			writeResultMessage(reponse.getWriter(), "不存在关系类型biz=" + biz, ResultMessage.FAIL);
			return false;
		}

		String data = partyRelQueryService.getByMSB(posId, userId, _org.key());
		PartyRelPo rel = PartyRelPo.fromJsonString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.isMorP()" + "--->" + "userId="
				+ userId + ",posId=" + posId + ",biz=" + biz + ",rel=" + (rel != null ? rel.toString() : ""));

		return rel == null ? false : true;
	}

	/**
	 * 角色ids转换list
	 *
	 * @param roleIds
	 * @return
	 */
	private List<String> parseRoleIds(String roleIds) {
		List<String> ids = new ArrayList<String>();

		if (StringUtil.isNotBlank(roleIds)) {
			ids = Arrays.asList(roleIds.split(StringPool.COMMA));
		}

		return ids;
	}

	/**
	 * 填充岗位字段
	 *
	 * @param request
	 * @param poList
	 */
	private void fill(HttpServletRequest request, PageList<PartyEmployeePo> poList) {
		if (BeanUtils.isEmpty(poList))
			return;
		String posId = RequestUtil.getString(request, "Q^POSITIONS_^SL");
		for (PartyEmployeePo po : poList) {
			String userId = po.getId();
			if (isMorP(posId, userId, PartyRelType.MAIN_POST)) {
				po.setIsMainPost("Y");
			} else {
				po.setIsMainPost("N");
			}
			if (isMorP(posId, userId, PartyRelType.PRINCIPAL)) {
				po.setIsPrincipal("Y");
			} else {
				po.setIsPrincipal("N");
			}
		}
	}

	/**
	 * 岗位人员关系判断，主岗位、主负责人
	 *
	 * @param posId
	 * @param userId
	 * @param biz
	 * @return
	 */
	private boolean isMorP(String posId, String userId, PartyRelType biz) {
		String data = partyRelQueryService.getByMSB(posId, userId, biz.key());
		PartyRelPo rel = PartyRelPo.fromJsonString(data);

		return rel == null ? false : true;
	}

}
