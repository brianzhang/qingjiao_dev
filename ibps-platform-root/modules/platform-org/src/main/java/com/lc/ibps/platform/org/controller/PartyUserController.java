package com.lc.ibps.platform.org.controller;

import java.util.Arrays;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.IUserSecurityQueryService;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.api.org.service.IPartyUserBaseService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.UserSecurityPo;
import com.lc.ibps.api.org.exception.OrgException;

import net.sf.json.JSONObject;

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
public class PartyUserController extends GenericController {
	@Resource
	private IPartyUserBaseService partyUserBaseService;
	@Resource
	private IUserSecurityQueryService userSecurityService;
	@Resource
	private IPartyEmployeeMgrService employeeMgrService;

	/**
	 * 
	 * 批量删除系统用户记录(逻辑删除)
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "userId");

			logger.debug("com.lc.ibps.platform.org.controller.PartyUserController.listJson()" + "--->" + "aryIds="
					+ (aryIds != null ? Arrays.toString(aryIds) : ""));

			if (BeanUtils.isEmpty(aryIds))
				throw new OrgException("没有要删除的记录");
			partyUserBaseService.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除用户成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除用户失败，" + e.getMessage());
			logger.error("删除用户失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 修改密码页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("changePasswordView")
	public ModelAndView changePasswordView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = RequestUtil.getString(request, "userId");
		int isReset = RequestUtil.getInt(request, "isReset", 0);
		UserSecurityPo userSecurity = UserSecurityPo.fromJsonString(userSecurityService.getDefaultUserSecurity());
		ModelAndView mv = getAutoView();
		mv.setViewName("/platform/org/changePasswordView.jsp");
		
		return mv
				.addObject("userId", userId)
				.addObject("isReset", isReset)
				.addObject("userSecurity", userSecurity);
	}

	@RequestMapping("changePassword")
	public void changePassword(HttpServletRequest request, HttpServletResponse response) throws Exception {
		int isReset = RequestUtil.getInt(request, "isReset", 0);
		String primitivePassword = RequestUtil.getString(request, "primitivePassword");
		String newPassword = RequestUtil.getString(request, "newPassword");
		String userId = RequestUtil.getString(request, "userId");
		
		ResultMessage resultMessage = new ResultMessage();
		int isSuccess = ResultMessage.FAIL;
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.accumulate("isReset", isReset);
		jsonObject.accumulate("primitivePassword", primitivePassword);
		jsonObject.accumulate("newPassword", newPassword);
		jsonObject.accumulate("id", userId);
		
		try {
			employeeMgrService.updatePasswd4Employee(jsonObject.toString());
			resultMessage.setMessage("修改密码成功");
			isSuccess = ResultMessage.SUCCESS;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			resultMessage.setMessage("修改密码失败!");
			resultMessage.setCause(e.getMessage());
		}
		resultMessage.setResult(isSuccess);
		writeResultMessage(response.getWriter(), resultMessage);
	}

}
