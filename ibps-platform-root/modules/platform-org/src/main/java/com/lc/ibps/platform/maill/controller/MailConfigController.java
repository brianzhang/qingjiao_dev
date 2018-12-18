package com.lc.ibps.platform.maill.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.mail.domain.MailConfig;
import com.lc.ibps.common.mail.persistence.entity.MailConfigPo;
import com.lc.ibps.common.mail.repository.MailConfigRepository;
import com.lc.ibps.components.mail.constants.MailProtocol;

/**
 * 外部邮件用户设置 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-05-04 16:59:36
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/mail/mailConfig/")
public class MailConfigController extends GenericController {
	@Resource
	private MailConfigRepository mailConfigRepository;

	/**
	 * 外部邮件用户设置列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("user_id_", ContextUtil.getCurrentUserId(),QueryOP.EQUAL);
		PageList<MailConfigPo> mailConfigList = (PageList<MailConfigPo>) mailConfigRepository.query(queryFilter);
		return new PageJson(mailConfigList);
	}

	/**
	 * 编辑外部邮件用户设置信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		MailConfigPo mailConfig = null;
		if (StringUtil.isNotEmpty(id)) {
			mailConfig = mailConfigRepository.get(id);
		} else {
			mailConfig = new MailConfigPo();
			mailConfig.setUserId(ContextUtil.getCurrentUserId());
			mailConfig.setMailType(MailProtocol.POP3.getName());
			mailConfig.setPopPort("110");
			mailConfig.setSmtpPort("25");
		}
		return getAutoView().addObject("mailConfig", mailConfig).addObject("returnUrl", preUrl);
	}

	/**
	 * 外部邮件用户设置明细页面
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
		MailConfigPo mailConfig = null;
		if (StringUtil.isNotEmpty(id)) {
			mailConfig = mailConfigRepository.get(id);
		}
		return getAutoView().addObject("mailConfig", mailConfig).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存外部邮件用户设置信息
	 *
	 * @param request
	 * @param response
	 * @param mailConfig
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, MailConfigPo po) throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			MailConfig mailConfig = mailConfigRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				mailConfig.create();
				resultMsg = "添加外部邮件用户设置成功";
			} else {
				mailConfig.update();
				resultMsg = "更新外部邮件用户设置成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对外部邮件用户设置操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除外部邮件用户设置记录
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
			MailConfig mailConfig = mailConfigRepository.newInstance();
			mailConfig.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除外部邮件用户设置成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除外部邮件用户设置失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 测试接收/发送 服务器连接情况
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("test")
	public void test(HttpServletRequest request, HttpServletResponse response, MailConfigPo mailConfig)
			throws Exception {
		ResultMessage resultMessage = null;
		try {
			mailConfigRepository.testConnection(mailConfig);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "测试通过!"));
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
				String message = "测试连接失败，请检查邮箱设置是否正确！";
				resultMessage = new ResultMessage(ResultMessage.FAIL, message,e.getMessage());
				response.getWriter().print(resultMessage);
		}
	}
}
