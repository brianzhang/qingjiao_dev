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
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionService;
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
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;

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
@RequestMapping("/platform/org/")
public class PartyOrgDialogController  extends GenericController{
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private ISubSysQueryService subSysQueryService;
	
	/**
	 * 
	 * 选择框
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("partyEmployee/dialog")
	public ModelAndView employeeDialog(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEmployeeController.dialog()"
				+ "--->"
				+ "id="+id
				);
		
		return getAutoView().addObject("id", id);
	}
	
	/**
	 * 组织选择框
	 */
	@RequestMapping("partyOrg/dialog")
	public ModelAndView orgDialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 查询当前用户的组织
		String userId = ContextUtil.getCurrentUserId();
		PartyEmployeePo employee = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
		PartyOrgPo org = null;
		if (BeanUtils.isNotEmpty(employee) && StringUtil.isNotBlank(employee.getGroupID())) {
			String _orgId = employee.getGroupID();
			String data = partyOrgService.getByIdJson(_orgId);
			org = PartyOrgPo.fromJsonString(data);
			// 查询岗位组织完整路径
			if (BeanUtils.isNotEmpty(org))
				org.setPathName(PartyEntityBuilder.buildPathName(_orgId));
		}

		return getAutoView().addObject("org", org);
	}
	
	/**
	 * 
	 * 岗位选择框
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("partyPosition/dialog")
	public ModelAndView partyPositionDialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		boolean hiddenOrgName = RequestUtil.getBoolean(request, "hiddenOrgName");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.dialog()" + "--->" + "hiddenOrgName="
				+ hiddenOrgName);

		// 查询当前用户的岗位
		String userId = ContextUtil.getCurrentUserId();
		PartyEmployeePo employee = PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(userId));
		String positions = employee.getPositions();
		List<PartyPositionPo> posList = null;
		if (StringUtil.isNotBlank(positions)) {
			String listData = partyPositionService.findByIds(positions.split(StringPool.COMMA));
			posList = PartyPositionPo.fromJsonArrayString(listData);
			// 查询岗位组织完整路径
			for (PartyPositionPo position : posList) {
				if (StringUtil.isNotBlank(position.getOrgID())) {
					position.setOrgName(PartyEntityBuilder.buildPathName(position.getOrgID()));
				}
			}
		}

		return this.getAutoView().addObject("hiddenOrgName", hiddenOrgName).addObject("posList", posList);
	}
	
	/**
	 * 角色选择框
	 */
	@RequestMapping("partyRole/dialog")
	public ModelAndView partyRoleDialog(HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<SubSystemPo> subSystemList = null;
		String listData = subSysQueryService.findAll();
		if(GsonUtil.isJsonArray(listData)){
			subSystemList = JacksonUtil.getDTOList(listData, SubSystemPo.class);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.dialog()--->"
				+"subSystemList="+(subSystemList!=null?Arrays.toString(subSystemList.toArray()):"")
				);
		
		return getAutoView().addObject("subSystemList", subSystemList);
	}
	
	/**
	 * 
	 * 用户选择框
	 *
	 * @param request
	 * @param reponse
	 * @param type
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("partyUser/dialog")
	public ModelAndView partyUserDialog(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String orgId = RequestUtil.getString(request, "orgId");
		boolean tree = RequestUtil.getBoolean(request, "tree");

		logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.dialog()" + "--->" + "orgId=" + orgId
				+ ",tree=" + tree);

		return getAutoView().addObject("orgId", orgId).addObject("tree", tree);
	}
	
}
