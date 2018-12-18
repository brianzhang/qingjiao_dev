package com.lc.ibps.platform.bpmn.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.model.PartyEmployee;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.api.common.cat.model.IType;
import com.lc.ibps.api.common.cat.service.ITypeService;
import com.lc.ibps.api.org.constant.PartyRelType;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.api.org.service.IPartyRelQueryService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.bpmn.model.statistics.EndStatVO;
import com.lc.ibps.bpmn.model.statistics.PandingStatVO;
import com.lc.ibps.bpmn.model.statistics.RunningStatVO;
import com.lc.ibps.bpmn.repository.BpmInstHisRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskAssignRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyRelPo;


@Controller
@RequestMapping("/platform/bpmn/bpmStatistics/")
public class BpmStatisticsController extends GenericController {
	
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private BpmInstHisRepository bpmInstHisRepository;
	@Resource
	private IPartyUserService userService;
	@Resource
	private IPartyOrgService orgService;
	@Resource
	private IPartyRelQueryService partyRelQueryService;
	@Resource
	private IPartyEntityService entityService;
	@Resource
	private IPartyEmployeeService employeeService;
	@Resource
	private BpmTaskAssignRepository bpmTaskAssignRepository;
	@Resource
	private ITypeService typeService;
	
	@RequestMapping("pending")
	public ModelAndView pending(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = getAutoView();
		setPendingView(mv);
		return mv;
	}

	private void setPendingView(ModelAndView mv) {
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		String orgId = "";
		if (!isSuper) {
			String data = employeeService.getByIdJson(curUser.getUserId());
			PartyEmployee employee =  PartyEmployeePo.fromJsonString(data);
			if(BeanUtils.isNotEmpty(employee) && StringUtil.isNotEmpty(employee.getGroupID())){
				orgId = employee.getGroupID();
				String dataStr = partyRelQueryService.getByMSB(orgId, curUser.getUserId(), PartyRelType.ORG_MANAGER.key());
				PartyRelPo partyRelPo = PartyRelPo.fromJsonString(dataStr);
				if(!BeanUtils.isEmpty(partyRelPo)){
					mv.addObject("orgId", orgId);
				}
			}
		}
		mv.addObject("isSuper", isSuper);
		mv.addObject("userId", curUser.getUserId());
	}
	
	@RequestMapping("pendingStatistics")
	@ResponseBody
	public PageJson pendingStatistics(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		User curUser = ContextUtil.getCurrentUser();
		List<PandingStatVO> result = new ArrayList<PandingStatVO>();
		if(StringUtils.isEmpty(queryFilter.getParams().get("executorId"))){
			List<String> userIds = bpmTaskAssignRepository.queryALLExecutor(queryFilter);
			for (String id : userIds) {
				String data = entityService.findByUserIdJson(id);
				if(JacksonUtil.isJsonArray(data)){
					List<PartyEntityPo> pes = JacksonUtil.getDTOList(data, PartyEntityPo.class);
					Map<String, String> groups = PartyUtil.convertGroupList(new ArrayList<PartyEntity>(pes));
					queryFilter.addParamsFilter("executorId", id);
					List<PandingStatVO> list = bpmTaskRepository.queryPendingStat(id, groups, queryFilter);
					if (list.size()>0&&BeanUtils.isNotEmpty(list.get(0))) {
						result.add(list.get(0));
					}
				}
			}
			return new PageJson(result,((PageList<String>)userIds).getPageResult());
		}else{
			String data = entityService.findByUserIdJson(curUser.getUserId());
			if(JacksonUtil.isJsonArray(data)){
				List<PartyEntityPo> pes = JacksonUtil.getDTOList(data, PartyEntityPo.class);
				Map<String, String> groups = PartyUtil.convertGroupList(new ArrayList<PartyEntity>(pes));
				List<PandingStatVO> list = bpmTaskRepository.queryPendingStat(curUser.getUserId(), groups, queryFilter);
				return new PageJson(list);
			}
		}
		return new PageJson();
	}

	@RequestMapping("runningStatistics")
	@ResponseBody
	public PageJson runningStatistics(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
//		queryFilter.addFilter("status_", ProcInstStatus.STATUS_RUNNING.getKey(), QueryOP.EQUAL);
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		List<RunningStatVO> list = bpmInstRepository.queryRunningStat(queryFilter, curUser.getUserId(), isSuper);
		return new PageJson(list);
	}
	
	@RequestMapping("endStatistics")
	@ResponseBody
	public PageJson endStatistics(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = userService.isSuperUser(curUser.getAccount());
		List<EndStatVO> list = bpmInstHisRepository.queryEndStat(queryFilter, curUser.getUserId(), isSuper);
		return new PageJson(list);
	}
	
	@RequestMapping("type")
	public ModelAndView typeStatistics(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception{
		ModelAndView mv = getAutoView();
		List<IType> list = typeService.getByCatKey(CategoryConstants.CAT_FLOW.key());
		
		TypePo typePo = new TypePo();
		typePo.setName("其他");
		typePo.setTypeKey("$null");
		list.add(typePo);
		
		String printPosition = AppUtil.getProperty("report.raqsoft.toolbar.printPosition");
		mv.addObject("printPosition", printPosition);
		mv.addObject("types", list);
		mv.addObject("reportName", "demo_statistics_type");
		return mv;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("personPending")
	public ModelAndView personPendingStatistics(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception{
		ModelAndView mv = getAutoView();
		String orgListString = orgService.findAllJson();
		List<PartyOrgPo> orgList = JsonUtil.getDTOList(orgListString, PartyOrgPo.class);
		mv.addObject("orgList",orgList);
		String printPosition = AppUtil.getProperty("report.raqsoft.toolbar.printPosition");
		mv.addObject("printPosition", printPosition);
		return mv;
	}
	
	@RequestMapping("pendingRaq")
	public ModelAndView pendingRaq(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mv = getAutoView();
		setPendingView(mv);
		return mv;
	}
	
}
