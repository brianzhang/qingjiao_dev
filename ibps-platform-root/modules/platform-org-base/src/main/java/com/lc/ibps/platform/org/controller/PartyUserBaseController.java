package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyOrgAuthQueryService;
import com.lc.ibps.api.org.service.IPartyUserBaseQueryService;
import com.lc.ibps.base.core.exception.BaseException;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;

/**
 * 用户管理。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-13-上午10:29:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@RequestMapping("/platform/org/partyUser")
@Controller
public class PartyUserBaseController extends GenericController {
	
	@Resource
	private IPartyUserBaseQueryService partyUserBaseQueryService;
	@Resource
	private IPartyOrgAuthQueryService partyOrgAuthQueryService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyEntityService defaultPartyEntityService;
	@Resource
	private IPartyEmployeeMgrService employeeMgrService;

	/**
	 * 
	 * ibps_ORG_USER【系统用户】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.listJson()" + "--->" + "params="
				+ queryFilter.getParams());

		PageList<PartyUserPo> userList = null;
		String listData = partyUserBaseQueryService.queryJson(queryFilter);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyUserPo> list = PartyUserPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			userList = new PageList<PartyUserPo>(list, pageResult);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.listJson()" + "--->" + "userList="
				+ (userList != null ? Arrays.toString(userList.toArray()) : ""));

		return new PageJson(userList);
	}

	/**
	 * 
	 * 用户选择框查询数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("dialogUserJson")
	public @ResponseBody PageJson dialogUserJson(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		int type = RequestUtil.getInt(request, "type");
		boolean inclueChild = RequestUtil.getBoolean(request, "inclueChild");
		String orgId = RequestUtil.getString(request, "orgId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson()" + "-->type:" + type
				+ ",inclueChild：" + inclueChild + ",orgId:" + orgId);

		QueryFilter queryFilter = getQuerFilter(request);
		orgId = getOrgId(type, orgId);
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams,PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}

		try {
			getUserIdByAttrValue(request, queryFilter);
		} catch (Exception e) {
			return new PageJson(new PageList<PartyUserPo>());
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson()" + "-->type:" + type
				+ ",inclueChild：" + inclueChild + ",orgId:" + orgId + ",params=" + queryFilter.getParams());

		List<PartyUserPo> userList = null;
		String listData = partyUserBaseQueryService.queryDialogUserByParamJson(queryFilter, orgId, inclueChild);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyUserPo> list = PartyUserPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			userList = new PageList<PartyUserPo>(list, pageResult);
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson()" + "-->userList:"
				+ (userList != null ? Arrays.toString(userList.toArray()) : ""));

		return new PageJson((PageList<PartyUserPo>) userList);
	}

	/**
	 * 
	 * 用户选择框查询数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("dialogUserJson4Post")
	public @ResponseBody PageJson dialogUserJson4Post(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		boolean inclueChild = RequestUtil.getBoolean(request, "inclueChild");
		String posId = RequestUtil.getString(request, "posId");
		String orgId = RequestUtil.getString(request, "orgId");
		QueryFilter queryFilter = getQuerFilter(request);
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams,PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}
		
		try {
			getUserIdByAttrValue(request, queryFilter);
		} catch (Exception e) {
			return new PageJson(new PageList<PartyUserPo>());
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson4Post()" + "-->inclueChild："
				+ inclueChild + ",posId:" + posId + ",params=" + queryFilter.getParams());
		List<PartyUserPo> userList4Post = null;
		String listData = partyUserBaseQueryService.queryDialogUserByParam4Post(queryFilter, orgId, posId, inclueChild);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyUserPo> list = PartyUserPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			userList4Post = new PageList<PartyUserPo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson4Post()"
				+ "-->userList4Post:" + (userList4Post != null ? Arrays.toString(userList4Post.toArray()) : ""));

		return new PageJson(userList4Post);
	}

	/**
	 * 
	 * 用户选择框查询数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("dialogUserJson4Role")
	public @ResponseBody PageJson dialogUserJson4Role(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		boolean inclueChild = RequestUtil.getBoolean(request, "inclueChild");
		String roleId = RequestUtil.getString(request, "roleId");

		QueryFilter queryFilter = getQuerFilter(request);
		
		Map<String,Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if(BeanUtils.isNotEmpty(attrParams)){
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams,PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if(BeanUtils.isEmpty(ids)){
				return new PageJson(new PageList<PartyEmployeePo>());
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}
		
		try {
			getUserIdByAttrValue(request, queryFilter);
		} catch (Exception e) {
			return new PageJson(new PageList<PartyUserPo>());
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson4Role()" + "-->inclueChild："
				+ inclueChild + ",roleId:" + roleId + ",params=" + queryFilter.getParams());

		List<PartyUserPo> userList = null;
		String listData = partyUserBaseQueryService.queryDialogUserByParam4Role(queryFilter, roleId, inclueChild);
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyUserPo> list = PartyUserPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			userList = new PageList<PartyUserPo>(list, pageResult);
		}
		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialogUserJson4Role()" + "-->userList:"
				+ (userList != null ? Arrays.toString(userList.toArray()) : ""));

		return new PageJson(userList);
	}

	/**
	 * 
	 * 用户选择框
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("userInfo")
	@ResponseBody
	public Object userInfo(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String userId = RequestUtil.getString(request, "id");

		logger.debug(
				"com.lc.ibps.platform.org.controller.PartyUserController.userInfo()" + "--->" + "userId=" + userId);

		// ibps1.0可以用User接口
		PartyUserPo user = PartyUserPo.fromJsonString(partyUserBaseQueryService.getById(userId));

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.userInfo()" + "--->" + "user="
				+ (user != null ? user.toString() : ""));

		Map<String, Object> map = new HashMap<String, Object>();
		if (BeanUtils.isEmpty(user)) {
			return map;
		}

		map.put("id", userId);
		map.put("name", user.getFullname());
		return map;
	}

	/**
	 * 根据类型获取组织id
	 *
	 * @param type
	 * @return
	 */
	private String getOrgId(int type, String orgId) {
		switch (type) {
		case 2:
			// if(BeanUtils.isNotEmpty(ContextUtil.getCurrentOrg()))
			// orgId = ContextUtil.getCurrentOrg().getId();
			PartyEmployeePo employee = PartyEmployeePo.fromJsonString(
					partyEmployeeService.getByIdJson(ContextUtil.getCurrentUserId()));
			orgId = employee.getGroupID();
			break;
		case 3:
			break;
		case 4:
			String data = partyOrgAuthQueryService.queryByUserId(ContextUtil.getCurrentUserId());
			List<PartyOrgAuthPo> auths = PartyOrgAuthPo.fromJsonArrayString(data);
			if (auths != null)
				orgId = auths.get(0).getOrgID();
			break;
		default:
			break;
		}
		return orgId;
	}

	/**
	 * 查找符合参与者属性的参与者ID
	 *
	 * @param request
	 * @param queryFilter
	 */
	private void getUserIdByAttrValue(HttpServletRequest request, QueryFilter queryFilter) {
		Map<String, Object> attrParams = RequestUtil.getMapByProfix(request, "QA^");
		if (BeanUtils.isNotEmpty(attrParams)) {
			String data = defaultPartyEntityService.findByAttrKeyValueJson(attrParams,PartyType.EMPLOYEE.getValue());
			if(JacksonUtil.isNotJsonArray(data)){
				throw new BaseException("没有符合参与者属性的参与者ID");
			}
			List<String> ids = JacksonUtil.getDTOList(data, String.class);
			if (BeanUtils.isEmpty(ids)) {
				throw new BaseException("没有符合参与者属性的参与者ID");
			}
			queryFilter.addFilter("ID_", ids, QueryOP.IN);
		}
	}

	/**
	 * 
	 * 获得选择器的值
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSelectorInfo")
	@ResponseBody
	public Object getSelectorInfo(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String type = RequestUtil.getString(request, "type");

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.selectorInfo()" + "--->" + "id=" + id);
		String name = "";
		if ("user".equals(type)) {// 用户
			type = PartyType.EMPLOYEE.getValue();
		}
		
		String data = defaultPartyEntityService.getByIdPartyTypeJson(id, type);
		if(JacksonUtil.isJsonObject(data)){
			PartyEntity entity = PartyEntityPo.fromJsonString(data);
			if (BeanUtils.isNotEmpty(entity))
				name = entity.getName();
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("name", name);
		return map;
	}

}
