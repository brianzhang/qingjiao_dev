package com.lc.ibps.platform.maill.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.common.mail.service.OutMailService;
import com.lc.ibps.base.core.constants.Bool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.mail.constants.MailFolder;
import com.lc.ibps.common.mail.domain.MailLinkman;
import com.lc.ibps.common.mail.domain.OutMail;
import com.lc.ibps.common.mail.entity.OutMailTree;
import com.lc.ibps.common.mail.persistence.entity.MailConfigPo;
import com.lc.ibps.common.mail.persistence.entity.MailLinkmanPo;
import com.lc.ibps.common.mail.persistence.entity.OutMailPo;
import com.lc.ibps.common.mail.repository.MailConfigRepository;
import com.lc.ibps.common.mail.repository.MailDelHisRepository;
import com.lc.ibps.common.mail.repository.MailLinkmanRepository;
import com.lc.ibps.common.mail.repository.OutMailRepository;

/**
 * 外部邮件 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-05-06 10:57:11
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/mail/outMail/")
public class OutMailController extends GenericController {
	@Resource
	private OutMailRepository outMailRepository;
	@Resource
	private MailConfigRepository mailConfigRepository;
	@Resource
	private MailLinkmanRepository mailLinkmanRepository;
	@Resource
	private OutMailService outMailService;
	@Resource
	MailDelHisRepository mailDelHisRepository;
	/**
	 * 管理页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("manage")
	public ModelAndView manage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//获取当前用户id
		String userId = ContextUtil.getCurrentUserId();
		//获取当前用户默认邮箱信息
		MailConfigPo po = mailConfigRepository.getDefault(userId);
		//初始化是否默认邮箱值
		String defaultMail = "";
		if(BeanUtils.isNotEmpty(po)){
			defaultMail = po.getId();
		}
		//获取当前用户所有邮箱列表 
		List<MailConfigPo> list = mailConfigRepository.getByUserId(userId);
		return getAutoView().addObject("mailList", list).addObject("defaultMail",defaultMail);
	}

	/**
	 * 
	 * 外部邮箱菜单列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String setId = RequestUtil.getString(request, "setId");
		String types = RequestUtil.getString(request, "types");
		return getAutoView().addObject("setId", setId).addObject("types", types);
	}

	/**
	 * 外部邮件列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<OutMailPo> outMailList = (PageList<OutMailPo>) outMailRepository.query(queryFilter);
		return new PageJson(outMailList);
	}

	/**
	 * 编辑外部邮件信息页面
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
		String setId = RequestUtil.getString(request, "setId");
		OutMailPo outMail = null;
		if (StringUtil.isNotEmpty(id)) {
			outMail = outMailRepository.get(id);
			setId = outMail.getSetId();
		}
		return getAutoView().addObject("outMail", outMail).addObject("returnUrl", preUrl).addObject("setId",setId);
	}

	/**
	 * 外部邮件明细页面
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
		OutMailPo outMail = null;
		if (StringUtil.isNotEmpty(id)) {
			outMail = outMailRepository.getByID(id);
		}
		return getAutoView().addObject("outMail", outMail).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存外部邮件信息
	 *
	 * @param request
	 * @param response
	 * @param outMail
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, OutMailPo po) throws Exception {
		String resultMsg = null;
		try {//TODO 这个代码有问题
			OutMail outMail= outMailRepository.newInstance(po);
			//获取当前用户信息
			String userId = ContextUtil.getCurrentUserId();
			//发送邮件
			outMail.saveOutmail(userId);
			MailLinkman mailLink = mailLinkmanRepository.newInstance();
			//将相关发件人，抄送人信息添加为最近联系人
			mailLink.addOrUpdateMailLinkman(po.getSetId(),po.getReceiverNames(),po.getReceiverAddresses());
			//将抄送人添加为常用联系人
			mailLink.addOrUpdateMailLinkman(po.getSetId(),po.getCcNames(),po.getCcAddresses());
			//将密送人添加为常用联系人
			mailLink.addOrUpdateMailLinkman(po.getSetId(),po.getBccNames(),po.getBccAddresses());
			resultMsg = "发送邮件成功!";
			//若是草稿
			if("drafts".equals(po.getTypes())){
				resultMsg = "邮件保存成功！";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对外部邮件操作失败"+e.getMessage();
			writeResultMessage(response.getWriter(), resultMsg,ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除外部邮件记录
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
			OutMail outMail= outMailRepository.newInstance();
			outMail.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除外部邮件成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除外部邮件失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获得邮箱树形列表的json数据
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<OutMailTree> getTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "setId");
		if(StringUtil.isEmpty(id))
			return null;
		return mailConfigRepository.getTreeData(id);
	}

	/**
	 * 
	 * 邮箱同步处理
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("sync")
	public void sync(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String setId = RequestUtil.getString(request, "setId");
		try {
			MailConfigPo mailConfig = mailConfigRepository.get(setId);
			if (BeanUtils.isEmpty(mailConfig)) {
				message = new ResultMessage(ResultMessage.SUCCESS, "同步外部邮件成功");
			} else {
				outMailService.syncMail(mailConfig.toJsonString());
				message = new ResultMessage(ResultMessage.SUCCESS, "同步外部邮件成功");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "同步外部邮件失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("msgList")
	public @ResponseBody PageJson msgList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		DefaultPage page = new DefaultPage(1,10);
		Map<String, Object> params =  new HashMap<String,Object>();
		params.put("userId", ContextUtil.getCurrentUserId());
		params.put("isRead", Bool.FALSE.value());
		params.put("types", MailFolder.INBOX.key());
		List<OutMailPo> outMailList = outMailRepository.queryByUserId(params, page);
		if(BeanUtils.isNotEmpty(outMailList)){
			for (OutMailPo po : outMailList) {
				po.setDurationTime(	DateUtil.timeAgo(po.getMailDate()));
			}
		}
		return new PageJson(outMailList);
	}
	
	/**
	 * 
	 * 批量删除外部邮件记录（这里只做逻辑删除）
	 * @author hugh zhuang
	 * @date     2016年6月23日-上午11:00:01
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("deleted")
	public void deleted(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {//TODO  事务问题
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			//将删除的信息记录在删除历史记录表中
			outMailService.saveMailHis(aryIds);
			OutMail outMail= outMailRepository.newInstance();
			 outMail.updateByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除外部邮件成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除外部邮件失败:"+e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 
	 * 右边最近联系左树信息列表
	 *
	 * @param request
	 * @param response
	 * @param UserId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getLinkManTreeData")
	@ResponseBody
	public List<MailLinkmanPo> getLinkManTreeData(HttpServletRequest request,
			HttpServletResponse response,String UserId) throws Exception{
		List<MailLinkmanPo> linkManList = mailLinkmanRepository.queryByUserId(UserId);
		return linkManList;
	}
	
	/**
	 * 外部邮件回复页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("reply")
	public ModelAndView reply(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		OutMailPo outMail = null;
		if (StringUtil.isNotEmpty(id)) {
			outMail = outMailRepository.getByID(id);
		}
		return getAutoView().addObject("outMail", outMail).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 将逻辑删除的邮件恢复
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("recover")
	public void recover(HttpServletRequest request, HttpServletResponse response)throws Exception{
		ResultMessage message = null;
		try {
			String id = RequestUtil.getString(request, "id");
			String types =mailDelHisRepository.getTypesByMailId(id);
			//将原邮箱删除的信息恢复
			OutMail outMail= outMailRepository.newInstance();
			outMail.updateByTypes(id,types);
			message = new ResultMessage(ResultMessage.SUCCESS, "恢复邮件成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "恢复邮件失败:"+e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
}
