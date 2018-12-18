package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyLevelQueryService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyPositionMgrService;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.api.org.exception.OrgException;
import com.lc.ibps.org.party.persistence.entity.PartyLevelPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyPositionPo;

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
public class PartyPositionController extends GenericController {
	@Resource
	private IPartyPositionService partyPositionService;
	@Resource
	private IPartyPositionMgrService partyPositionMgrService;
	@Resource
	private IPartyEntityService partyEntityService;
	@Resource
	private IPartyOrgService partyOrgService;
	@Resource
	private IPartyLevelQueryService partyLevelQueryService;
	@Resource
	private IPartyEmployeeMgrService partyEmployeeMgrService;

	/**
	 * 编辑岗位信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		// 获取当前树节点ID
		String id = RequestUtil.getString(request, "id");
		// 获取当前树节点的id作为下个节点的父节点
		String parentId = RequestUtil.getString(request, "parentId");
		String orgId = RequestUtil.getString(request, "orgId");
		boolean tree = RequestUtil.getBoolean(request, "tree");
		boolean self = RequestUtil.getBoolean(request, "self");
		String mainOrgrade = RequestUtil.getString(request, "mainOrgrade");
		String prem = RequestUtil.getString(request, "prem");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.edit()" + "--->" + "preUrl=" + preUrl
				+ ",id=" + id + ",parentId=" + parentId + ",orgId=" + orgId + ",tree=" + tree + ",self=" + self
				+ ",mainOrgrade=" + mainOrgrade + ",prem=" + prem);

		PartyPositionPo partyPosition = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = partyPositionService.get(id);
			partyPosition = PartyPositionPo.fromJsonString(data);
		}

		// 获取参与者等级信息
		String data = partyLevelQueryService.findByPartyType(PartyType.POSITION.getValue());
		List<PartyLevelPo> levelList = PartyLevelPo.fromJsonArrayString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.edit()" + "--->partyPosition="
				+ (partyPosition != null ? partyPosition.toString() : "") + ",levelList="
				+ (levelList != null ? Arrays.toString(levelList.toArray()) : ""));

		return getAutoView().addObject("partyPosition", partyPosition).addObject("levelList", levelList)
				.addObject("orgId", orgId).addObject("tree", tree).addObject("self", self).addObject("prem", prem)
				.addObject("mainOrgrade", mainOrgrade).addObject("parentId", parentId).addObject("returnUrl", preUrl);
	}

	/**
	 * 岗位明细页面
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
		PartyPositionPo partyPosition = null;

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.get()" + "--->" + "preUrl=" + preUrl
				+ ",id=" + id);

		// 参与者等级信息
		PartyLevelPo level = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = partyPositionService.get(id);
			partyPosition = PartyPositionPo.fromJsonString(data);
			if(BeanUtils.isNotEmpty(partyPosition)){
				data = partyLevelQueryService.get(partyPosition.getLevelID());
				level = PartyLevelPo.fromJsonString(data);
			}
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.get()" + "--->" + "preUrl=" + preUrl
				+ ",id=" + id + ",partyPosition=" + (partyPosition != null ? partyPosition.toString() : "")
				+ ",levelList=" + (level != null ? level.toString() : ""));

		return getAutoView().addObject("partyPosition", partyPosition).addObject("level", level).addObject("returnUrl",
				preUrl);
	}

	/**
	 * 保存岗位信息
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, PartyPositionPo po) throws Exception {
		String resultMsg = null;
		String id = po.getId();
		String parentId = RequestUtil.getString(request, "partyEntityPo.parentId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.save()" + "--->" + "partyPosition="
				+ (po != null ? po.toString() : "") + ",id=" + id + ",parentId=" + parentId);

		try {
			partyEntityService.isAliasExist(id, po.getPosAlias(), PartyType.POSITION.getValue());
			if (StringUtil.isEmpty(parentId)) {
				po.setParentId("0");
			} else {
				po.setParentId(parentId);
			}
			
			partyPositionMgrService.save(po.toJsonString());
			resultMsg = "操作岗位成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对岗位操作失败，";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.ERROR);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 批量删除岗位记录
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

			logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.remove()" + "--->" + "aryIds="
					+ (aryIds != null ? Arrays.toString(aryIds) : ""));

			if (BeanUtils.isEmpty(aryIds))
				throw new OrgException("没有要删除的记录");
			partyPositionMgrService.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除岗位成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.ERROR, "删除岗位失败," + e.getMessage());
			logger.error("删除岗位失败," + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 岗位管理菜单列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("manager")
	public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = getAutoView();
		// 获取所有岗位信息
		String data = partyPositionService.findAllJson();
		List<PartyPositionPo> poLit = PartyPositionPo.fromJsonArrayString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.manager()" + "--->" + "poLit="
				+ (poLit != null ? Arrays.toString(poLit.toArray()) : ""));

		return mv.addObject("partyPositionPoList", poLit);
	}

	/**
	 * 
	 * 岗位组的tab列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("info")
	public ModelAndView info(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.info()" + "--->" + "id=" + id);

		String data = partyPositionService.get(id);
		PartyPositionPo position = PartyPositionPo.fromJsonString(data);

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.info()" + "--->" + "position="
				+ (position != null ? position.toString() : ""));

		return this.getAutoView().addObject("id", id).addObject("position", position);
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
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.roleList()" + "--->" + "id=" + id);

		return getAutoView().addObject("id", id);
	}

	@RequestMapping("changePosRelationStatus")
	public void changePosRelationStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "岗位角色取消成功";
		String pid = RequestUtil.getString(request, "pid");
		String id = RequestUtil.getString(request, "id");
		String status = RequestUtil.getString(request, "status");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.changePosRelationStatus()" + "--->"
				+ "pid=" + pid + ",id=" + id + ",status=" + status);

		if ("deleted".equalsIgnoreCase(status)) {
			partyPositionMgrService.modifyRole(pid, id);
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

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.addAssignRoles()" + "--->"
				+ "roleIDs=" + roleIDs + ",id=" + id);

		try {
			// 直接将角色ids添加在岗位信息中
			if (StringUtil.isNotEmpty(roleIDs)) {
				partyPositionMgrService.addRole2Position(id, roleIDs);
			}
			resultMsg = "岗位角色设置成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "岗位角色设置失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 岗位归属组织明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("orgInfo")
	public ModelAndView orgInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.orgInfo()" + "--->" + "preUrl="
				+ preUrl + ",id=" + id);

		PartyOrgPo partyOrg = null;
		PartyPositionPo partyPosition = null;

		// 参与者等级信息
		PartyLevelPo level = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = partyPositionService.get(id);
			partyPosition = PartyPositionPo.fromJsonString(data);
			if (BeanUtils.isNotEmpty(partyPosition) && StringUtil.isNotBlank(partyPosition.getOrgID())) {
				data = partyOrgService.getByIdJson(partyPosition.getOrgID());
				partyOrg = PartyOrgPo.fromJsonString(data);
				if(BeanUtils.isNotEmpty(partyOrg)){
					data = partyLevelQueryService.get(partyOrg.getLevelID());
					level = PartyLevelPo.fromJsonString(data);
				}
			}
		}

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.orgInfo()" + "--->" + "preUrl="
				+ preUrl + ",id=" + id + ",partyPosition=" + (partyPosition != null ? partyPosition.toString() : "")
				+ ",partyOrg=" + (partyOrg != null ? partyOrg.toString() : "") + ",level="
				+ (level != null ? level.toString() : ""));

		return getAutoView().addObject("partyPosition", partyPosition).addObject("partyOrg", partyOrg)
				.addObject("level", level).addObject("id", id).addObject("returnUrl", preUrl);
	}

	/**
	 * 
	 * @名称 添加岗位
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("addAssignOrg")
	public void addAssignOrg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String orgId = RequestUtil.getString(request, "orgId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.addAssignOrg()" + "--->" + "id=" + id
				+ ",orgid=" + orgId);

		try {
			// 直接将组织id添加在岗位信息中
			if (StringUtil.isNotEmpty(orgId)) {
				partyPositionMgrService.addOrg4Position(id, orgId);
			}
			resultMsg = "岗位组织设置成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "岗位组织设置失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @名称 添加岗位
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeOrg")
	public void removeOrg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.removeOrg()" + "--->" + "id=" + id);

		try {
			if (StringUtil.isNotEmpty(id)) {
				partyPositionMgrService.removeOrg(id);
			}
			resultMsg = "岗位组织清除成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "岗位组织清除失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @名称 为用户添加主岗位
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("assignMainPost")
	public void assignMainPost(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String posId = RequestUtil.getString(request, "posId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.assignMainPost()" + "--->" + "id="
				+ id + ",posId=" + posId);

		try {
			if (StringUtil.isNotEmpty(posId) && StringUtil.isNotEmpty(id)) {
				partyEmployeeMgrService.assignMainPost(posId, id);
			}
			resultMsg = "用户主岗位设置成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "用户主岗位设置失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @名称 设置用户为岗位负责人
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("assignPrincipal")
	public void assignPrincipal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String posId = RequestUtil.getString(request, "posId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.assignPrincipal()" + "--->" + "id="
				+ id + ",posId=" + posId);

		try {
			if (StringUtil.isNotEmpty(posId) && StringUtil.isNotEmpty(id)) {
				partyEmployeeMgrService.assignPrincipal(posId, id);
			}
			resultMsg = "岗位主负责人设置成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "岗位主负责人设置失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @名称 撤销用户主岗位
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeMainPost")
	public void removeMainPost(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String posId = RequestUtil.getString(request, "posId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.removeMainPost()" + "--->" + "id="
				+ id + ",posId=" + posId);

		try {
			if (StringUtil.isNotEmpty(posId) && StringUtil.isNotEmpty(id)) {
				partyEmployeeMgrService.removeMainPost(posId, id);
			}
			resultMsg = "撤销主岗位成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "撤销主岗位失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 
	 * @名称 撤销用户为岗位负责人
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removePrincipal")
	public void removePrincipal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = "";
		String id = RequestUtil.getString(request, "id");
		String posId = RequestUtil.getString(request, "posId");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.removePrincipal()" + "--->" + "id="
				+ id + ",posId=" + posId);

		try {
			if (StringUtil.isNotEmpty(posId) && StringUtil.isNotEmpty(id)) {
				partyEmployeeMgrService.removePrincipal(posId, id);
			}
			resultMsg = "撤销主负责人成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "撤销主负责人失败";
			writeResultMessage(response.getWriter(), resultMsg + "," + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
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
	@RequestMapping("userList")
	public ModelAndView userList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.userList()" + "--->" + "id=" + id);

		return getAutoView().addObject("id", id);
	}

	/**
	 * 添加人员到岗位
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("addUser")
	public void addUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String posId = RequestUtil.getString(request, "posId");
		String[] aryIds = RequestUtil.getStringAryByStr(request, "userIds");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.addUser()" + "--->" + "posId=" + posId
				+ ",aryIds=" + (aryIds != null ? Arrays.toString(aryIds) : ""));

		try {
			if (StringUtil.isNotBlank(posId)) {
				partyEmployeeMgrService.addUsertoPos(posId, aryIds);
				resultMsg = "添加人员成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "添加人员操作失败";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
		}
	}

	/**
	 * 移除岗位人员
	 *
	 * @param request
	 * @param response
	 * @param partyPosition
	 * @throws Exception
	 */
	@RequestMapping("removeUser")
	public void removeUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String posId = RequestUtil.getString(request, "posId");
		String[] aryIds = RequestUtil.getStringAryByStr(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyPositionController.removeUser()" + "--->" + "posId="
				+ posId + ",aryIds=" + (aryIds != null ? Arrays.toString(aryIds) : ""));

		try {
			if (StringUtil.isNotBlank(posId)) {
				partyEmployeeMgrService.removePositionInfo(posId, aryIds);
				resultMsg = "移除人员成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "移除人员操作失败";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
			logger.error(resultMsg + "," + e.getMessage(), e);
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
			partyPositionMgrService.move(id, destinationId);
			message = new ResultMessage(ResultMessage.SUCCESS, "移动成功!");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "移动失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

}
