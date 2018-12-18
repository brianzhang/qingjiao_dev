package com.lc.ibps.platform.office.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.constant.BpmAuthContants;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.domain.BpmInst;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.components.jms.handler.IJmsHandler;
import com.lc.ibps.components.jms.model.JmsVo;
import com.lc.ibps.components.jms.util.MessageUtil;

/** 
 * 我发起的流程
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年2月3日-下午5:02:24
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/office/bpmInitiatedProcess/")
public class BpmInitiatedProcessController extends GenericController {
	
	@Resource
	private BpmDefineRepository bpmDefineRepository;
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private BpmProcInstService bpmProcInstService;
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	@Resource
	private IPartyUserService userService;
	@Resource
	private TypeRepository typeRepository;

	/**
	 * 新建流程
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("newProcessJson")
	public @ResponseBody PageJson newProcessJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		
		// 查询列表
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("is_main_", "Y", QueryOP.EQUAL);
		queryFilter.addParamsFilter("rightType", BpmAuthContants.START);
		PageList<BpmDefinePo> list = (PageList<BpmDefinePo>) bpmDefineRepository.query(queryFilter, curUser.getUserId(), isSuper);
		setTypeName(list);
		return new PageJson(list);
	}

	/**
	 * 设置流程分类名称
	 *
	 * @param list 
	 */
	private void setTypeName(PageList<BpmDefinePo> list) {
		if(BeanUtils.isEmpty(list)) return;
		
		for (BpmDefinePo po : list) {
			if(BeanUtils.isNotEmpty(po.getTypeId())){
				TypePo typePo = typeRepository.get(po.getTypeId());
				if(BeanUtils.isNotEmpty(typePo)) po.setTypeName(typePo.getName());
			}
		}
	}

	/**
	 * 我的请求
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("myRequestJson")
	public @ResponseBody PageJson myRequestJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list = (PageList<BpmInstPo>) bpmInstRepository.queryRequest(userId, queryFilter);

		return new PageJson(list);
	}
	

	/**
	 * 我的办结
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("myCompletedJson")
	public @ResponseBody PageJson myCompletedJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list = (PageList<BpmInstPo>) bpmInstRepository.queryCompleted(userId, queryFilter);

		return new PageJson(list);
	}

	/**
	 * 我的草稿
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("myDraftJson")
	@ResponseBody
	public PageJson myDraftJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list = (PageList<BpmInstPo>) bpmInstRepository.queryDrafts(userId, queryFilter);

		return new PageJson(list);
	}

	/**
	 * 删除草稿
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("removeDraft")
	public void removeDraft(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			BpmInst  	bpmInst = 	bpmInstRepository.newInstance();
			bpmInst.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除草稿成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除草稿失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

//	/**
//	 * 由我发出的抄送。
//	 * 
//	 * @param request
//	 * @param reponse
//	 * @return PageJson
//	 */
//	@RequestMapping("myCopyToJson")
//	@ResponseBody
//	public PageJson myCopyToJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
//		QueryFilter queryFilter = getQuerFilter(request);
//		String userId = ContextUtil.getCurrentUserId();
//		// 查询列表
//		PageList<CopyToPo> list = (PageList<CopyToPo>) copyToRepository.getMyCopyTo(userId, queryFilter);
//
//		return new PageJson(list);
//	}
//
//	/**
//	 * 查询我流转出去的任务。
//	 * 
//	 * @param request
//	 * @param reponse
//	 * @return
//	 * @throws Exception
//	 *             PageJson
//	 */
//	@RequestMapping("myTransJson")
//	@ResponseBody
//	public PageJson myTransJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
//
//		QueryFilter queryFilter = getQuerFilter(request);
//		String userId = ContextUtil.getCurrentUserId();
//		// 查询列表
//		PageList<DefaultBpmTaskPo> list = bpmTaskRepository.getMyTransTask(userId, queryFilter);
//
//		return new PageJson(list);
//	}
//
//	/**
//	 * 撤销流转页面。
//	 * 
//	 * @param request
//	 * @param reponse
//	 * @return ModelAndView
//	 * @throws Exception
//	 */
//	@RequestMapping("revokeTrans")
//	public ModelAndView revokeTrans(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
//		String taskId = RequestUtil.getString(request, "taskId");
//		List<IJmsHandler<JmsVo>> list = MessageUtil.getHanlerList();
//		ModelAndView mv = this.getAutoView();
//
//		mv.addObject("handlerList", list);
//		mv.addObject("taskId", taskId);
//
//		return mv;
//	}
//
//	/**
//	 * 处理撤销流转任务。
//	 * 
//	 * @param request
//	 * @param reponse
//	 * @return ModelAndView
//	 * @throws Exception
//	 */
//	@RequestMapping("doRevokeTrans")
//	public void doRevokeTrans(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
//		String taskId = RequestUtil.getString(request, "taskId");
//		
//		String messageType = RequestUtil.getString(request, "messageType");
//		String cause = RequestUtil.getString(request, "cause");
//
//		ResultMessage result = null;
//		try {
//			transService.withDraw(taskId, messageType, cause,ContextUtil.getCurrentUser().getUserId());
//			result = ResultMessage.getSuccess("流转任务成功取回!");
//		} catch (Exception ex) {
//			String msg = ExceptionUtil.getExceptionMessage(ex);
//			result = ResultMessage.getFail(msg);
//		}
//		reponse.getWriter().print(result);
//	}
	
}