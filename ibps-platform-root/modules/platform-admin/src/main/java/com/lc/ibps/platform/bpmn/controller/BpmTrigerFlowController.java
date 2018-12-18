
package com.lc.ibps.platform.bpmn.controller;

import java.util.LinkedHashMap;
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
import com.lc.ibps.base.bo.persistence.entity.BoAttributePo;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.constant.NodeStatus;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.domain.BpmTrigerFlow;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTrigerFlowPo;
import com.lc.ibps.bpmn.persistence.entity.BpmTrigerParamPo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;
import com.lc.ibps.bpmn.repository.BpmTrigerFlowRepository;
import com.lc.ibps.bpmn.repository.BpmTrigerParamRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 触发新流程 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-23 19:01:23
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTrigerFlow/")
public class BpmTrigerFlowController extends GenericController{
	@Resource
	private BpmTrigerFlowRepository bpmTrigerFlowRepository;
	@Resource
	private IBpmDefineReader reader;
	@Resource
	private BpmDefineRepository bpmDefineRepository;
	@Resource
	private BpmTrigerParamRepository bpmTrigerParamRepository;
	@Resource
	private BoDefRepository boDefRepository;
	
	/**
	 * 【触发新流程】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmTrigerFlowPo> bpmTrigerFlowList=(PageList<BpmTrigerFlowPo>)bpmTrigerFlowRepository.query(queryFilter);
		return new PageJson(bpmTrigerFlowList);
	}
	
	/**
	 * 编辑【触发新流程】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String procDefId = RequestUtil.getString(request, "procDefId");
		String nodeId = RequestUtil.getString(request, "nodeId");
		
		Map<String, String> actionMap = new LinkedHashMap<String, String>();	
		actionMap.put(NodeStatus.AGREE.getKey(), NodeStatus.AGREE.getValue());
		actionMap.put(NodeStatus.OPPOSE.getKey(), NodeStatus.OPPOSE.getValue());
		actionMap.put(NodeStatus.REJECT.getKey(), NodeStatus.REJECT.getValue());
		
		return getAutoView()
				.addObject("actionMap", actionMap)
				.addObject("procDefId", procDefId)
				.addObject("nodeId", nodeId)
				.addObject("returnUrl", preUrl)
				;
	}
	
	/**
	 * 编辑【触发新流程】信息页面
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
		BpmTrigerFlowPo bpmTrigerFlow=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTrigerFlow=bpmTrigerFlowRepository.loadCascade(id);
		}
		return getAutoView().addObject("bpmTrigerFlow", bpmTrigerFlow).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【触发新流程】明细页面
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
		BpmTrigerFlowPo bpmTrigerFlow=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTrigerFlow=bpmTrigerFlowRepository.loadCascade(id);
		}
		return getAutoView().addObject("bpmTrigerFlow", bpmTrigerFlow).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【触发新流程】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTrigerFlow
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmTrigerFlowPo bpmTrigerFlowPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmTrigerFlow bpmTrigerFlow =bpmTrigerFlowRepository.newInstance(bpmTrigerFlowPo);
			bpmTrigerFlow.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存触发新流程成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对触发新流程操作失败,"+e.getMessage());
			logger.error("对触发新流程操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmTrigerFlowPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<BpmTrigerParamPo> bpmTrigerParamPoList = getBpmTrigerParamPoList(jsonObj);
		BpmTrigerFlowPo bpmTrigerFlowPo = getBpmTrigerFlowPo(jsonObj);
		bpmTrigerFlowPo.setBpmTrigerParamPoList(bpmTrigerParamPoList);

		return bpmTrigerFlowPo;
	}
	
	/** 
	 * 获取触发新流程数据
	 *
	 * @param jsonObj
	 */
	private BpmTrigerFlowPo getBpmTrigerFlowPo(JSONObject jsonObj){
		BpmTrigerFlowPo bpmTrigerFlowPo = (BpmTrigerFlowPo) JsonUtil.getDTO(jsonObj.toString(), BpmTrigerFlowPo.class);
		return bpmTrigerFlowPo;
	}
	
	/** 
	 * 获取触发参数数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<BpmTrigerParamPo> getBpmTrigerParamPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("bpmTrigerParamPoList")){
			return null;
		}
		
		List<BpmTrigerParamPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("bpmTrigerParamPoList").toString(), 
													BpmTrigerParamPo.class);
		jsonObj.discard("bpmTrigerParamPoList");
		return rs;
	}
	
	/**
	 *  批量删除【触发新流程】记录
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
			BpmTrigerFlow bpmTrigerFlow =bpmTrigerFlowRepository.newInstance();
			bpmTrigerFlow.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除触发新流程成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除触发新流程失败，" + e.getMessage());
			logger.error("删除触发新流程失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  读取源数据属性
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("srcRead")
	public void srcRead(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String msg = "";
		List<BoAttributePo> attrs = null;
		try {
			String defId = RequestUtil.getString(request, "defId");
			IBpmProcDefine<IBpmProcExtendDefine> bpmProcDefine = reader.getBpmProcDefine(defId);
			BpmProcExtendDefine bpmProcExt = (BpmProcExtendDefine) bpmProcDefine.getBpmProcExtendDefine();
			ProcBoDefine boDefine = bpmProcExt.getBoDefine();
			if(BeanUtils.isEmpty(boDefine)){
				msg = "流程未配置业务对象";
			}else{
				attrs = getAttrs(boDefine);
				if(BeanUtils.isEmpty(attrs)){
					msg = "业务对象数据为空";
				}
			}
			
			message=new ResultMessage(ResultMessage.SUCCESS, msg);
			String rs = BeanUtils.isEmpty(attrs)?"[]":JSONArray.fromObject(attrs).toString();
			message.addVariable("attrs", rs);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL);
			logger.error("流程业务对象查询失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  读取目标数据属性
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("destRead")
	public void destRead(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String msg = "";
		List<BoAttributePo> attrs = null;
		try {
			String defKey = RequestUtil.getString(request, "defKey");
			BpmDefinePo bpmDefinePo =  bpmDefineRepository.getByDefKey(defKey);
			if(BeanUtils.isEmpty(bpmDefinePo)){
				msg = "流程已被删除";
			}else{
				IBpmProcDefine<IBpmProcExtendDefine> bpmProcDefine = reader.getBpmProcDefine(bpmDefinePo.getDefId());
				BpmProcExtendDefine bpmProcExt = (BpmProcExtendDefine) bpmProcDefine.getBpmProcExtendDefine();
				ProcBoDefine boDefine = bpmProcExt.getBoDefine();
				if(BeanUtils.isEmpty(boDefine)){
					msg = "流程未配置业务对象";
				}else{
					attrs = getAttrs(boDefine);
					if(BeanUtils.isEmpty(attrs)){
						msg = "业务对象数据为空";
					}
				}
			}
			
			message=new ResultMessage(ResultMessage.SUCCESS, msg);
			String rs = BeanUtils.isEmpty(attrs)?"[]":JSONArray.fromObject(attrs).toString();
			message.addVariable("attrs", rs);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "流程业务对象查询失败，" + e.getMessage());
			logger.error("流程业务对象查询失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	private List<BoAttributePo> getAttrs(ProcBoDefine boDefine){
		BoDefPo boPo = boDefRepository.getByCode(boDefine.getKey(), boDefine.getVersion());
		if(BeanUtils.isEmpty(boPo) || BeanUtils.isEmpty(boPo.getAttrList())){
			return null;
		}
		
		return boPo.getAttrList();
	}
	
	/**
	 *  读取已配置数据属性
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("dataRead")
	public void dataRead(HttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String msg = "";
		List<BpmTrigerParamPo> attrs = null;
		try {
			String defId = RequestUtil.getString(request, "defId");
			String nodeId = RequestUtil.getString(request, "nodeId");
			String defKey = RequestUtil.getString(request, "defKey");
			
			BpmDefinePo bpmDefinePo =  bpmDefineRepository.getByDefKey(defKey);
			if(BeanUtils.isEmpty(bpmDefinePo)){
				msg = "触发流程已被删除";
			}else{
				BpmTrigerFlowPo po = bpmTrigerFlowRepository.getByDefIdNodeIdKey(defId, nodeId, defKey);
				if(BeanUtils.isEmpty(po) || BeanUtils.isEmpty(po.getBpmTrigerParamPoList())){
					msg = "触发流程数据映射暂无数据";
				}else{
					attrs = po.getBpmTrigerParamPoList();
				}
			}
			
			message=new ResultMessage(ResultMessage.SUCCESS, msg);
			String rs = BeanUtils.isEmpty(attrs)?"[]":JSONArray.fromObject(attrs).toString();
			message.addVariable("attrs", rs);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL);
			logger.error("流程业务对象查询失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
