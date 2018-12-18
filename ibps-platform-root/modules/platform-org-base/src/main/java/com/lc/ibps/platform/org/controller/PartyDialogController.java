package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.org.constant.PartyAttrType;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyAttrQueryService;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.api.org.service.IPartyRoleService;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.GsonUtil;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.SubSystemPo;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyAttrPo;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;

/** 
 * 选择器 控制器
 * 
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年8月31日-下午2:36:40
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@RequestMapping("/platform/org/partyDialog")
@Controller
public class PartyDialogController extends GenericController{
	
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyPositionService partyPositionService;
	
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyRoleService partyRoleService;
	@Resource
	private ISubSysQueryService subSysQueryService;
	@Resource
	private IPartyAttrQueryService partyAttrQueryService;
	
	/**
	 * 
	 * 人员选择器
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("person")
	public ModelAndView person(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		boolean tree = RequestUtil.getBoolean(request, "tree");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.person()"
				+ "--->"
				+ "orgId="+orgId+",tree="+tree);
		
		return getAutoView().addObject("orgId", orgId)
							.addObject("entitys", PartyType.listWithoutEmployee())
							.addObject("tree", tree);
	}
	
	/**
	 * 
	 * 角色选择器
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("role")
	public ModelAndView role(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String subSystemId = RequestUtil.getString(request, "subSystemId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.role()"
				+ "--->"
				+ "subSystemId="+subSystemId);
		
		// 查询当前用户拥有的角色
		String userId = ContextUtil.getCurrentUserId();
		List<DefaultPartyRolePo> roleList = 
				DefaultPartyRolePo.fromJsonArrayString(partyRoleService.findUserRolesByUserIdJson(userId));
		List<SubSystemPo> subSystemList = null;
		String listData = subSysQueryService.findAll();
		if(GsonUtil.isJsonArray(listData)){
			subSystemList = JacksonUtil.getDTOList(listData, SubSystemPo.class);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.role()"
				+ "-->"
				+ "roleList="+(roleList!=null?Arrays.toString(roleList.toArray()):"")
				+",subSystemList="+(subSystemList!=null?Arrays.toString(subSystemList.toArray()):"")
				);
		
		return getAutoView().addObject("subSystemId", subSystemId)
							.addObject("roleList", roleList)
							.addObject("subSystemList", subSystemList);
	}
	
	/**
	 * 
	 * 岗位选择器
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("position")
	public ModelAndView position(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		boolean tree = RequestUtil.getBoolean(request, "tree");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.position()"
				+ "--->"
				+ "orgId="+orgId+",tree="+tree
				);
		
		// 查询当前用户的岗位
		String userId = ContextUtil.getCurrentUserId();
		PartyEmployeePo employee = 
				PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
		String positions = employee.getPositions();
		List<PartyPositionPo> posList = null;
		if(StringUtil.isNotBlank(positions)){
			String data = partyPositionService.findByIds(positions.split(StringPool.COMMA));
			posList = PartyPositionPo.fromJsonArrayString(data);
			// 查询岗位组织完整路径
			for(PartyPositionPo position : posList){
				if(StringUtil.isNotBlank(position.getOrgID())){
					position.setOrgName(PartyEntityBuilder.buildPathName(position.getOrgID()));
				}
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.position()"
				+ "--->"
				+ "posList="+(posList!=null?Arrays.toString(posList.toArray()):"")
				);
		
		return getAutoView().addObject("orgId", orgId)
							.addObject("tree", tree)
							.addObject("posList", posList);
	}
	
	/**
	 * 
	 * 岗位选择器
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("org")
	public ModelAndView org(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.org()"
				+ "--->"
				+ "orgId="+orgId
				);
		
		// 查询当前用户的组织
		String userId = ContextUtil.getCurrentUserId();
		PartyEmployeePo employee = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
		String _orgId = employee.getGroupID();
		PartyOrgPo org = null;
		if(StringUtil.isNotBlank(_orgId)){
			String data = partyOrgService.getByIdJson(_orgId);
			org = PartyOrgPo.fromJsonString(data);
			// 查询岗位组织完整路径
			if(BeanUtils.isNotEmpty(org)) org.setPathName(PartyEntityBuilder.buildPathName(_orgId));
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.org()"
				+ "--->"
				+ "org="+(org!=null?org.toString():"")
				);
		
		return getAutoView().addObject("orgId", orgId)
							.addObject("org", org);
	}
	
	/**
	 * 
	 * 参与者选择器
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("party")
	public ModelAndView party(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.party()"
				+ "--->"
				+ "orgId="+orgId);
		
		// 查询当前用户的组织
		String userId = ContextUtil.getCurrentUserId();
		PartyEmployeePo employee = 
				PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
		String _orgId = employee.getGroupID();
		PartyOrgPo org = null;
		if(StringUtil.isNotBlank(_orgId)){
			String data = partyOrgService.getByIdJson(_orgId);
			org = PartyOrgPo.fromJsonString(data);
			// 查询岗位组织完整路径
			if(BeanUtils.isNotEmpty(org)) org.setPathName(PartyEntityBuilder.buildPathName(_orgId));
		}
		
		// 查询当前用户的岗位
		String positions = employee.getPositions();
		List<PartyPositionPo> posList = null;
		if(StringUtil.isNotBlank(positions)){
			String data = partyPositionService.findByIds(positions.split(StringPool.COMMA));
			posList = PartyPositionPo.fromJsonArrayString(data);
			// 查询岗位组织完整路径
			for(PartyPositionPo position : posList){
				if(StringUtil.isNotBlank(position.getOrgID())){
					position.setOrgName(PartyEntityBuilder.buildPathName(position.getOrgID()));
				}
			}
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.party()"
				+ "--->"
				+ "org="+(org!=null?org.toString():"")
				+",posList="+(posList!=null?Arrays.toString(posList.toArray()):"")
				);
		
		return getAutoView().addObject("orgId", orgId)
							.addObject("org", org)
							.addObject("posList", posList);
	}
	
	/**
	 * 
	 * 属性输入框
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("attr")
	public ModelAndView attr(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String partyType = RequestUtil.getString(request, "partyType");
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.attr()"
				+ "--->"
				+ "partyType="+partyType);
		
		String listData = partyAttrQueryService.findByPartyTypeType(partyType, PartyAttrType.QUERY.getValue());
		List<PartyAttrPo> attrs = JacksonUtil.getDTOList(listData, PartyAttrPo.class);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyDialogController.attr()"
				+ "-->"
				+ "attrs="+(attrs!=null?Arrays.toString(attrs.toArray()):"")
				);
		
		return getAutoView().addObject("partyAttrs", attrs);
	}

}
