
package com.lc.ibps.platform.bpmn.controller;

import java.util.Date;

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
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.builder.BpmAgentBuilder;
import com.lc.ibps.bpmn.domain.BpmAgent;
import com.lc.ibps.bpmn.persistence.entity.BpmAgentPo;
import com.lc.ibps.bpmn.repository.BpmAgentRepository;

/**
 * 流程代理 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-30 17:29:13
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmAgent/")
public class BpmAgentController extends GenericController{
	@Resource
	private BpmAgentRepository bpmAgentRepository;
	
	/**
	 * 列表【流程代理】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		boolean notHide = ContextUtil.getCurrentUser().isSuper();
		return getAutoView().addObject("notHide", notHide);
	}
	
	/**
	 * 【流程代理】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		if(!ContextUtil.getCurrentUser().isSuper()){
			queryFilter.addFilter("DELEGATOR_ID_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		}
		PageList<BpmAgentPo> bpmAgentList=(PageList<BpmAgentPo>)bpmAgentRepository.query(queryFilter);
		BpmAgentBuilder.build(bpmAgentList);
		return new PageJson(bpmAgentList);
	}
	
	/**
	 * 编辑【流程代理】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmAgentPo bpmAgent=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgent=bpmAgentRepository.loadCascade(id);
			BpmAgentBuilder.build(bpmAgent);
		}else{
			bpmAgent = new BpmAgentPo();
			bpmAgent.setAgentType(BpmAgentPo.AGENT_TYPE_ALL);
			bpmAgent.setIsEnabled(BpmAgentPo.ENABLED);
			bpmAgent.setCreateBy(ContextUtil.getCurrentUserId());
			bpmAgent.setDelegatorId(ContextUtil.getCurrentUserId());
			bpmAgent.setDelegatorName(ContextUtil.getCurrentUser().getFullname());
			bpmAgent.setCreateTime(new Date());
			bpmAgent.setEffectiveTime(new Date());
			bpmAgent.setExpiryTime(new Date());
		}
		return getAutoView().addObject("bpmAgent", bpmAgent)
				.addObject("returnUrl", preUrl)
				.addObject("isSuper", ContextUtil.getCurrentUser().isSuper())
				;
	}
	
	/**
	 * 编辑【流程代理】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmAgentPo bpmAgent=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgent=bpmAgentRepository.loadCascade(id);
			BpmAgentBuilder.build(bpmAgent);
		}else{
			bpmAgent = new BpmAgentPo();
			bpmAgent.setAgentType(BpmAgentPo.AGENT_TYPE_ALL);
			bpmAgent.setIsEnabled(BpmAgentPo.ENABLED);
			bpmAgent.setCreateBy(ContextUtil.getCurrentUserId());
			bpmAgent.setDelegatorId(ContextUtil.getCurrentUserId());
			bpmAgent.setDelegatorName(ContextUtil.getCurrentUser().getFullname());
			bpmAgent.setCreateTime(new Date());
			bpmAgent.setEffectiveTime(new Date());
			bpmAgent.setExpiryTime(new Date());
		}
		return getAutoView().addObject("bpmAgent", bpmAgent)
				.addObject("returnUrl", preUrl)
				.addObject("isSuper", ContextUtil.getCurrentUser().isSuper())
				;
	}
	
	/**
	 * 【流程代理】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmAgentPo bpmAgent=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgent=bpmAgentRepository.loadCascade(id);
			BpmAgentBuilder.build(bpmAgent);
		}
		return getAutoView().addObject("bpmAgent", bpmAgent)
				.addObject("isSuper", ContextUtil.getCurrentUser().isSuper())
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程代理】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmAgent
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmAgentPo bpmAgentPo = getFromRequest2(request);
			//BpmAgentPo bpmAgentPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmAgent bpmAgent =bpmAgentRepository.newInstance(bpmAgentPo);
			bpmAgent.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程代理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程代理操作失败,"+e.getMessage());
			logger.error("对流程代理操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmAgentPo getFromRequest2(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		
		BpmAgentPo bpmAgentPo = JacksonUtil.getDTO(json, BpmAgentPo.class);
		
		if(bpmAgentPo.getEffectiveTime().getTime() != bpmAgentPo.getExpiryTime().getTime()
				&& !DateUtil.compare(bpmAgentPo.getEffectiveTime(), bpmAgentPo.getExpiryTime())){
			throw new RuntimeException("代理日期范围不合法");
		}
		
		return bpmAgentPo;
	}
	
//	/** 
//	 * 获取表单数据
//	 *
//	 * @param request
//	 */
//	private BpmAgentPo getFromRequest(HttpServletRequest request){
//		String json = RequestUtil.getString(request, "json");
//		JSONObject jsonObj = JSONObject.fromObject(json);
//		
//		List<BpmAgentDefPo> bpmAgentDefPoList = getBpmAgentDefPoList(jsonObj);
//		List<BpmAgentConditionPo> bpmAgentConditionPoList = getBpmAgentConditionPoList(jsonObj);
//		BpmAgentPo bpmAgentPo = getBpmAgentPo(jsonObj);
//		bpmAgentPo.setBpmAgentDefPoList(bpmAgentDefPoList);
//		bpmAgentPo.setBpmAgentConditionPoList(bpmAgentConditionPoList);
//
//		if(bpmAgentPo.getEffectiveTime().getTime() != bpmAgentPo.getExpiryTime().getTime()
//				&& !DateUtil.compare(bpmAgentPo.getEffectiveTime(), bpmAgentPo.getExpiryTime())){
//			throw new RuntimeException("代理日期范围不合法");
//		}
//		
//		return bpmAgentPo;
//	}
//	
//	/** 
//	 * 获取流程代理数据
//	 *
//	 * @param jsonObj
//	 */
//	private BpmAgentPo getBpmAgentPo(JSONObject jsonObj){
//		BpmAgentPo bpmAgentPo = (BpmAgentPo) JsonUtil.getDTO(jsonObj.toString(), BpmAgentPo.class);
//		return bpmAgentPo;
//	}
//	
//	/** 
//	 * 获取流程代理定义数据
//	 *
//	 * @param jsonObj
//	 */
//	@SuppressWarnings("unchecked")
//	private List<BpmAgentDefPo> getBpmAgentDefPoList(JSONObject jsonObj){
//		if(!jsonObj.containsKey("bpmAgentDefPoList")){
//			return null;
//		}
//		
//		List<BpmAgentDefPo> rs = JsonUtil.getDTOList(
//													jsonObj.getJSONArray("bpmAgentDefPoList").toString(), 
//													BpmAgentDefPo.class);
//		jsonObj.discard("bpmAgentDefPoList");
//		return rs;
//	}
//	
//	/** 
//	 * 获取流程代理条件数据
//	 *
//	 * @param jsonObj
//	 */
//	private List<BpmAgentConditionPo> getBpmAgentConditionPoList(JSONObject jsonObj){
//		if(!jsonObj.containsKey("bpmAgentConditionPoList")){
//			return null;
//		}
//		
//		JSONArray conditionArr = jsonObj.getJSONArray("bpmAgentConditionPoList");
//		if(JsonUtil.isEmpty(conditionArr)){
//			return null;
//		}
//		
//		JSONObject jsonObj_ = null;
//		String condition = null;
//		String conditionKey = "condition";
//		List<BpmAgentConditionPo> rs = new ArrayList<BpmAgentConditionPo>();
//		BpmAgentConditionPo po = null;
//		for(int i = 0, size = conditionArr.size(); i < size; i ++){
//			jsonObj_ = conditionArr.getJSONObject(i);
//			// 条件值是json串，需要特殊处理
//			if(jsonObj_.containsKey(conditionKey)){
//				condition = jsonObj_.getString(conditionKey);
//				jsonObj_.discard(conditionKey);
//			}
//			po = (BpmAgentConditionPo) JsonUtil.getDTO(jsonObj_.toString(), BpmAgentConditionPo.class);
//			po.setCondition(condition);
//			rs.add(po);
//		}
//		
//		jsonObj.discard("bpmAgentConditionPoList");
//		return rs;
//	}
	
	/**
	 *  批量删除【流程代理】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			BpmAgent bpmAgent =bpmAgentRepository.newInstance();
			bpmAgent.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程代理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程代理失败，" + e.getMessage());
			logger.error("删除流程代理失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  设置 流程代理 启用/禁用
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setEnable")
	public void setEnable(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String prfix = "启用";
		try {
			String id=RequestUtil.getString(request, "id");
			String isEnabled=RequestUtil.getString(request, "isEnabled");
			if(BpmAgentPo.DISABLED.equals(isEnabled)){
				prfix = "禁用";
			}
			//构造领域对象和保存数据
			BpmAgent bpmAgent =bpmAgentRepository.newInstance();
			bpmAgent.setEnable(id, isEnabled);
			message=new ResultMessage(ResultMessage.SUCCESS, prfix+"流程代理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, prfix+"流程代理失败，" + e.getMessage());
			logger.error(prfix+"流程代理失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
