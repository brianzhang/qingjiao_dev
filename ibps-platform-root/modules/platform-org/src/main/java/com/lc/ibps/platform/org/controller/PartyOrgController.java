package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.org.constant.GroupStatus;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyLevelQueryService;
import com.lc.ibps.api.org.service.IPartyOrgAuthQueryService;
import com.lc.ibps.api.org.service.IPartyOrgMgrService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionMgrService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.persistence.entity.PartyLevelPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;

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
public class PartyOrgController extends GenericController {

	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyOrgMgrService partyOrgMgrService;
	@Resource
	private IPartyEntityService partyEntityService;
	@Resource
	private IPartyLevelQueryService partyLevelQueryService;
	@Resource
	private IPartyPositionMgrService partyPositionMgrService;
	@Resource
	private IPartyEmployeeMgrService partyEmployeeMgrService;
	@Resource
	private IPartyOrgAuthQueryService partyOrgAuthQueryService;

	/**
	 * 编辑组织信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		// 获取当前树节点的id作为下个节点的父节点
		String parentId = RequestUtil.getString(request, "parentId");
		// 获取当前树节点的ID
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.edit()" + "--->id=" + id + ",parentId="
				+ parentId + ",preUrl=" + preUrl);

		PartyOrgPo partyOrg = new PartyOrgPo();

		if (StringUtil.isNotEmpty(id)) {
			String data = partyOrgService.getByIdJson(id);
			partyOrg = PartyOrgPo.fromJsonString(data);
		}
		// 初始化参与者等级信息列表
		String data = partyLevelQueryService.findByPartyType(PartyType.ORG.getValue());
		List<PartyLevelPo> levelList = PartyLevelPo.fromJsonArrayString(data);
		
		GroupStatus[] statuses = GroupStatus.values();

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.edit()" + "--->levelList="
				+ (levelList != null ? Arrays.toString(levelList.toArray()) : "") + ",partyOrg="
				+ (partyOrg != null ? partyOrg.toString() : "") + ",preUrl=" + preUrl);

		return getAutoView()
				.addObject("partyOrg", partyOrg)
				.addObject("parentId", parentId)
				.addObject("returnUrl", preUrl)
				.addObject("statuses", statuses)
				.addObject("levelList", levelList);
	}

	@RequestMapping("manager")
	public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = getAutoView();
		// 获取所有组织信息
		List<PartyOrgPo> partyOrgPoList = null;
		String data = partyOrgService.findAllJson();
		partyOrgPoList = PartyOrgPo.fromJsonArrayString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.manager()" + "--->partyOrgPoList="
				+ (partyOrgPoList != null ? Arrays.toString(partyOrgPoList.toArray()) : ""));

		return mv.addObject("partyOrgPoList", partyOrgPoList);
	}

	@RequestMapping("gradeManager")
	public ModelAndView gradeManager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String prem = RequestUtil.getString(request, "prem");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradeManager()" + "--->prem=" + prem);

		ModelAndView mv = getAutoView();
		// 获取所有组织信息
		List<PartyOrgPo> partyOrgPoList = null;
		String data = partyOrgService.findAllJson();
		partyOrgPoList = PartyOrgPo.fromJsonArrayString(data);
		
		String userId = ContextUtil.getCurrentUserId();
		String odata = partyOrgAuthQueryService.queryByUserId(userId);
		List<PartyOrgAuthPo> partyOrgAuths = PartyOrgAuthPo.fromJsonArrayString(odata);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradeManager()" + "--->partyOrgPoList="
				+ (partyOrgPoList != null ? Arrays.toString(partyOrgPoList.toArray()) : "") + "--->partyOrgAuths="
				+ (partyOrgAuths != null ? Arrays.toString(partyOrgAuths.toArray()) : "") + ",partyOrgAuths=" + partyOrgAuths);

		return mv.addObject("partyOrgPoList", partyOrgPoList).addObject("partyOrgAuths", partyOrgAuths).addObject("prem",
				prem);
	}

	/**
	 * 组织明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.get()" + "--->id=" + id);

		PartyOrgPo partyOrg = null;

		// 初始化参与者等级信息
		PartyLevelPo level = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = partyOrgService.getByIdJson(id);
			partyOrg = PartyOrgPo.fromJsonString(data);
			if(BeanUtils.isNotEmpty(partyOrg)){
				data = partyLevelQueryService.get(partyOrg.getLevelID());
				level = PartyLevelPo.fromJsonString(data);
			}
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.get()" + "--->id=" + id + ",partyOrg="
				+ (partyOrg != null ? partyOrg.toString() : "") + ",level=" + (level != null ? level.toString() : ""));

		return getAutoView().addObject("partyOrg", partyOrg).addObject("level", level).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存参与者信息
	 *
	 * @param request
	 * @param response
	 * @param partyEntit
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, PartyOrgPo po) throws Exception {
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.save()" + "--->partyOrg="
				+ (po != null ? po.toString() : ""));

		String resultMsg = null;
		String id = po.getId();
		try {
			partyEntityService.isAliasExist(id, po.getOrgAlias(), PartyType.ORG.getValue());
			// 获取当前树节点的id作为下个节点的父节点
			String parentId = RequestUtil.getString(request, "partyEntityPo.parentId");
			if (StringUtil.isEmpty(parentId)) {
				po.setParentId("0");
			} else {
				po.setParentId(parentId);
			}
			
			partyOrgMgrService.save(po.toJsonString());
			resultMsg = "操作组织成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对组织操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 批量删除参与者记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");

			logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.remove()" + "--->aryIds="
					+ (aryIds != null ? Arrays.toString(aryIds) : ""));

			if (BeanUtils.isEmpty(aryIds))
				throw new OrgException("没有要删除的记录");
			
			partyOrgService.canDelete(aryIds);
			partyOrgMgrService.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除组织成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除组织失败，" + e.getMessage());
			logger.error("删除组织失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 
	 * 行政岗位列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("positionList")
	public ModelAndView positionList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "groupId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.positionList()" + "--->id=" + id);

		return getAutoView().addObject("id", id);
	}

	/**
	 * 
	 * 行政岗位列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("gradePositionList")
	public ModelAndView gradePositionList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "groupId");
		String prem = RequestUtil.getString(request, "prem");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradePositionList()" + "--->id=" + id
				+ ",prem=" + prem);

		return getAutoView().addObject("id", id).addObject("prem", prem);
	}

	@RequestMapping("changeOrgPosStatus")
	public void changeOrgPosStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "组织岗位取消成功";
		String id = RequestUtil.getString(request, "id");
		String status = RequestUtil.getString(request, "status");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.changeOrgPosStatus()" + "--->id=" + id
				+ ",status=" + status);

		if ("deleted".equalsIgnoreCase(status)) {
			partyPositionMgrService.removeOrg(id);
		}

		writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
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

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.roleList()" + "--->id=" + id);

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
	@RequestMapping("gradeRoleList")
	public ModelAndView gradeRoleList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "groupId");
		String prem = RequestUtil.getString(request, "prem");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradeRoleList()" + "--->id=" + id
				+ ",prem=" + prem);

		return getAutoView().addObject("id", id).addObject("prem", prem);
	}

	@RequestMapping("changeOrgRelationStatus")
	public void changeOrgRelationStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "组织角色取消成功";
		String pid = RequestUtil.getString(request, "pid");
		String id = RequestUtil.getString(request, "id");
		String status = RequestUtil.getString(request, "status");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.changeOrgRelationStatus()" + "--->pid="
				+ pid + ",id=" + id + ",status=" + status);

		if ("deleted".equalsIgnoreCase(status)) {
			PartyOrgPo po = new PartyOrgPo();
			po.setId(pid);
			po.setRoleIDs(id);
			partyOrgMgrService.modifyRoleIds(po.toJsonString());
		}

		writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
	}

	/**
	 * 
	 * @名称 添加可分配角色
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("addAssignRoles")
	public void addAssignRoles(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String roleIDs = RequestUtil.getString(request, "roleIds");
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.addAssignRoles()" + "--->roleIDs="
				+ roleIDs + ",id=" + id);

		try {
			// 直接将角色ids添加在组织信息中
			if (StringUtil.isNotEmpty(roleIDs)) {
				PartyOrgPo po = new PartyOrgPo();
				po.setId(id);
				po.setRoleIDs(roleIDs);
				partyOrgMgrService.addRoleIds(po.toJsonString());
			}
			resultMsg = "组织角色设置成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "组织角色设置失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * 组织的tab列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("info")
	public ModelAndView info(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		PartyOrgPo org = null;
		String data = partyOrgService.getByIdJson(id);
		org = PartyOrgPo.fromJsonString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.info()" + "--->org="
				+ (org != null ? org.toString() : "") + ",id=" + id);

		return this.getAutoView().addObject("id", id).addObject("org", org);
	}

	/**
	 * 
	 * 组织的tab列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("gradeInfo")
	public ModelAndView gradeInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String prem = RequestUtil.getString(request, "prem");
		PartyOrgPo org = null;
		String data = partyOrgService.getByIdJson(id);
		org = PartyOrgPo.fromJsonString(data);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradeInfo()" + "--->id=" + id + ",prem="
				+ prem + ",org=" + (org != null ? org.toString() : ""));

		return this.getAutoView().addObject("id", id).addObject("prem", prem).addObject("org", org);
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
	@RequestMapping("userList")
	public ModelAndView userList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.userList()" + "--->id=" + id);

		return getAutoView().addObject("id", id);
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
	@RequestMapping("gradeUserList")
	public ModelAndView gradeUserList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "orgId");
		String prem = RequestUtil.getString(request, "prem");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.gradeUserList()" + "--->id=" + id
				+ ",prem=" + prem);

		return getAutoView().addObject("orgId", id).addObject("prem", prem);
	}

	/**
	 * 添加人员到组织
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("addUser")
	public void addUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "orgId");
		String[] userIds = RequestUtil.getStringAryByStr(request, "userIds");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.addUser()" + "--->orgId=" + orgId
				+ ",userIds=" + (userIds != null ? Arrays.toString(userIds) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyEmployeeMgrService.addOrgInfo(orgId, userIds);
				resultMsg = "添加人员成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "添加人员操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 移除组织人员
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("removeUser")
	public void removeUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "orgId");
		String[] aryIds = RequestUtil.getStringAryByStr(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.removeUser()" + "--->orgId=" + orgId
				+ ",aryIds=" + (aryIds != null ? Arrays.toString(aryIds) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyEmployeeMgrService.removeOrgInfo(orgId, aryIds);
				resultMsg = "移除人员成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "移除人员操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 添加岗位到组织
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("addPos")
	public void addPos(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "id");
		String[] posIds = RequestUtil.getStringAryByStr(request, "posIds");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.addPos()" + "--->orgId=" + orgId
				+ ",posIds=" + (posIds != null ? Arrays.toString(posIds) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyPositionMgrService.addOrg(orgId, posIds);
				resultMsg = "添加岗位成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "添加岗位操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 移除组织岗位
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("removePos")
	public void removePos(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "orgId");
		String[] aryIds = RequestUtil.getStringAryByStr(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.removePos()" + "--->orgId=" + orgId
				+ ",aryIds=" + (aryIds != null ? Arrays.toString(aryIds) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyPositionMgrService.removeOrg(aryIds);
				resultMsg = "移除岗位成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "移除岗位操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * 组织负责人列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("managerList")
	public ModelAndView managerList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "orgId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.managerList()" + "--->orgId=" + id);

		return getAutoView().addObject("orgId", id);
	}

	/**
	 * 设置组织负责人
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("addManager")
	public void addManager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "orgId");
		String[] userIdArr = RequestUtil.getStringAryByStr(request, "userIds");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.addManager()" + "--->orgId=" + orgId
				+ ",userIdArr=" + (userIdArr != null ? Arrays.toString(userIdArr) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyEmployeeMgrService.addManager(orgId, userIdArr);
				resultMsg = "设置组织负责人成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "设置组织负责人操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 撤销组织负责人
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("removeManager")
	public void removeManager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String orgId = RequestUtil.getString(request, "orgId");
		String[] aryIds = RequestUtil.getStringAryByStr(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyOrgController.removeManager()" + "--->orgId=" + orgId
				+ ",aryIds=" + (aryIds != null ? Arrays.toString(aryIds) : ""));

		try {
			if (StringUtil.isNotBlank(orgId)) {
				partyEmployeeMgrService.removeManager(orgId, aryIds);
				resultMsg = "撤销组织负责人成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "撤销组织负责人操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + e.getMessage(), e);
		}
	}

	/**
	 * 跳转到排序页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 * @exception @since
	 *                1.0.0
	 */
	@RequestMapping("moveNode")
	public ModelAndView moveNode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		return getAutoView().addObject("id", id);
	}

	/**
	 * 
	 * 保存组织移动
	 *
	 * @param id
	 *            要移动的组织
	 * @param destinationId
	 *            移动到组织的位置
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("saveMove")
	public void saveMove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String id = RequestUtil.getString(request, "id");
			String destinationId = RequestUtil.getString(request, "destinationId");
			partyOrgMgrService.move(id, destinationId);
			message = new ResultMessage(ResultMessage.SUCCESS, "移动成功!");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "移动失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

}
