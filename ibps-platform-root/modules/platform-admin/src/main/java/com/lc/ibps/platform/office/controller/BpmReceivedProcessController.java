package com.lc.ibps.platform.office.controller;

import java.util.ArrayList;
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
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.builder.BpmTaskBuilder;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;

/** 
 * 流程中心-我的待办流程
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年1月17日-下午2:00:44
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/office/bpmReceivedProcess/")
public class BpmReceivedProcessController extends GenericController {
	
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private IPartyUserService userService;
	@Resource
	private IPartyEntityService entityService;
	
	/**
	 * 待办事宜
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pendingJson")
	@ResponseBody
	public PageJson pendingJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		List<PartyEntity> pes = new ArrayList<PartyEntity>();
		String data = entityService.findByUserIdJson(userId);
		if(JacksonUtil.isJsonArray(data)){
			List<PartyEntityPo> peps = JacksonUtil.getDTOList(data, PartyEntityPo.class);
			pes.addAll(peps);
		}
		Map<String, String> groups = PartyUtil.convertGroupList(pes);
		// 查询列表
		List<BpmTaskPo> list = bpmTaskRepository.queryByUser(userId, groups, queryFilter);
		
		BpmTaskBuilder.build(list);
		
		return new PageJson((PageList<BpmTaskPo>)list);
	}

	/**
	 * 已办事宜
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("handledJson")
	public @ResponseBody
	PageJson handledJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list  = new PageList<BpmInstPo>();
		//是否是办结菜单
		String end = RequestUtil.getString(request, "end");
		if(StringUtil.isNotEmpty(end)){
			list = (PageList<BpmInstPo>) bpmInstRepository.queryEndHandled(userId, queryFilter);
		}else{
			list = (PageList<BpmInstPo>) bpmInstRepository.queryHandled(userId, queryFilter);
		}
		return new PageJson(list);
	}

	/**
	 * 办结事宜
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("completedJson")
	public @ResponseBody PageJson completedJson(HttpServletRequest request,
			HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list = (PageList<BpmInstPo>) bpmInstRepository.queryCompleted(userId, queryFilter);
		return new PageJson(list);
	}
	
	/**
	 * 可撤回事宜
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("revokeJson")
	public @ResponseBody
	PageJson revokeJson(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		// 查询列表
		PageList<BpmInstPo> list = (PageList<BpmInstPo>) bpmInstRepository.queryRevoke(userId, queryFilter);

		return new PageJson(list);
	}
	
}
