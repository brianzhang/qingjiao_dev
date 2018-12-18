package com.lc.ibps.platform.rest.bpmn;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.node.PrivilegeItem;
import com.lc.ibps.bpmn.api.model.node.SignRule;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.core.engine.def.DefTransFormUtil;
import com.lc.ibps.bpmn.domain.BpmDefine;
import com.lc.ibps.bpmn.helper.BpmDefineXmlBuilder;
import com.lc.ibps.bpmn.persistence.entity.BpmDefineXmlPo;
import com.lc.ibps.bpmn.repository.BpmDefineXmlRepository;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

import net.sf.json.JSONObject;

/**
 * 流程接口。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年11月30日-下午4:03:46
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/bpmSetService")
@Api(value = "/bpmSetService",description="流程定义设置服务")
@Controller
public class BpmSetController {
	
//	BpmTaskManagerService bpmTaskManagerService;
//	
//	BpmApprovalService bpmApproveService;
//	
//	IPartyEntityService entityService;
//	
//	IFormRightsService formRightsService;
//	
//	DataObjectHandler dataObjectHandler;
//	
//	BpmFormService bpmFormService;
//	
//	BpmBoService bpmBoService;
//	
//	BpmTaskService bpmTaskService;
//	
//	BpmProcInstService bpmInstService;
//	
//	BpmTaskActionService bpmTaskActionService;
//	
	BpmDefineService bpmDefineService;
//	
//	IBpmDefineReader bpmDefineReader;
//	
//	DefaultPartyUserRepository userService;
//	
//	BpmProcInstService bpmProcInstService;
//	
//	DiagramService diagramService;
	
//	BpmDefConditionService bpmDefConditionService;
	
	BpmDefine bpmDefine;
	
	BpmDefineXmlRepository bpmDefineXmlRepository;
	
	public BpmSetController(){
//		bpmTaskManagerService = AppUtil.getBean(BpmTaskManagerService.class);
//		
//		bpmApproveService = AppUtil.getBean(BpmApprovalService.class);
//		
//		entityService = AppUtil.getBean(IPartyEntityService.class);
//		
//		formRightsService = AppUtil.getBean(IFormRightsService.class);
//		
//		dataObjectHandler = AppUtil.getBean(DataObjectHandler.class);
//		
//		bpmFormService = AppUtil.getBean(BpmFormService.class);
//		
//		bpmBoService = AppUtil.getBean(BpmBoService.class);
//		
//		bpmTaskService = AppUtil.getBean(BpmTaskService.class);
//		
//		bpmInstService = AppUtil.getBean(BpmProcInstService.class);
//		
//		bpmTaskActionService = AppUtil.getBean(BpmTaskActionService.class);
//		
		bpmDefineService = AppUtil.getBean(BpmDefineService.class);
//		
//		bpmDefineReader = AppUtil.getBean(IBpmDefineReader.class);
//		
//		userService = AppUtil.getBean(DefaultPartyUserRepository.class);
//		
//		bpmProcInstService = AppUtil.getBean(BpmProcInstService.class);
//		
//		diagramService = AppUtil.getBean(DiagramService.class);
		
//		bpmDefConditionService = AppUtil.getBean(BpmDefConditionService.class);
		
		bpmDefine = AppUtil.getBean(BpmDefine.class);
		
		bpmDefineXmlRepository = AppUtil.getBean(BpmDefineXmlRepository.class);
	}

	@Path("/buildExclusiveGatewayXml")
	@ApiOperation(value = "分支条件设置", notes = "分支条件设置")
	@PUT
	public WebAPIResult buildExclusiveGatewayXml(
			@QueryParam("defId") @ApiParam(value = "流程定义ID", required = true) String defId,
			@QueryParam("nodeId") @ApiParam(value = "节点ID", required = true) String nodeId,
			@QueryParam("condition") @ApiParam(value = "规则条件", required = false) String condition) {

		WebAPIResult result = new WebAPIResult();
		try {
			
			IBpmDefine iBpmDefine = bpmDefineService.getBpmDefinitionByDefId(defId);
			BpmDefineXmlPo po = bpmDefineXmlRepository.get(iBpmDefine.getDefId());
			JSONObject condJS = JSONObject.fromObject(condition);
			@SuppressWarnings("unchecked")
			Iterator<String> keys = condJS.keys();
			Map<String,String> conds = new HashMap<String,String>();
			while(keys.hasNext()){
				String key = keys.next().toString();
				conds.put(key, condJS.getString(key).toString());
			}
			String defXml = DefTransFormUtil.converConditionXml(nodeId, conds, po.getBpmnXml());
			bpmDefine.updateBpmnXml(iBpmDefine.getDefId(), defXml);
			
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("修改条件设置成功");
			
		} catch (Exception e) {
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("修改条件设置失败");
			e.printStackTrace();
		}

		return result;
	}
	
	/**
	 * eg:
	 * {
	 * 	"decideType":"agree", // 决策类型 agree,refuse
	 * 	"followMode":"wait", // 后续处理模式  wait,complete
	 * 	"voteType":"amount", // 投票类型 amount,percent
	 * 	"voteAmount":1 // 按投票类型填写
	 * }
	 * 
	 * @param defId
	 * @param nodeId
	 * @param condition
	 * @return
	 */
	@Path("/buildSignTaskXml")
	@ApiOperation(value = "会签节点设置", notes = "会签节点设置")
	@PUT
	public WebAPIResult buildSignTaskRuleXml(
			@QueryParam("defId") @ApiParam(value = "流程定义ID", required = true) String defId,
			@QueryParam("nodeId") @ApiParam(value = "节点ID", required = true) String nodeId,
			@QueryParam("signRule") @ApiParam(value = "会签规则", required = false) String signRule,
			@QueryParam("privilege") @ApiParam(value = "会签特权", required = false) String privilege) {

		WebAPIResult result = new WebAPIResult();
		try {
			
//			SignSetting signSetting = null;
			
			IBpmDefine iBpmDefine = bpmDefineService.getBpmDefinitionByDefId(defId);
			BpmDefineXmlPo po = bpmDefineXmlRepository.get(iBpmDefine.getDefId());
			String bpmnXml = po.getBpmnXml();
			
//			Definitions defs = BpmnXmlUtil.getDefinitionsByXml(bpmnXml);
//			Process process = BpmnXmlUtil.getProcess(defs);
//			List<JAXBElement<? extends FlowElement>> flowElms = process.getFlowElement();
//			for(JAXBElement<? extends FlowElement> elm:flowElms){
//				FlowElement felm = elm.getValue();
//				if(felm.getId().equals(nodeId)){
//					signSetting = BpmnXmlUtil.getSignSetting(felm);
//				}
//			}
			
			// 节点设置bpmDefineNode
//			List<BpmDefineNode> nodes = BpmDefineSettinglBuilder.buildNodes(JSONObject.fromObject("{}"));
//			List<IBpmPluginContext> plugins = new ArrayList<IBpmPluginContext>();
//			BpmDefineNode node = null;
//			for(BpmDefineNode n:nodes){
//				if(n.getId().equals(nodeId)){
//					node = n;
//					break;
//				}
//			}
//			bpmnXml = BpmDefineXmlBuilder.buildUserTaskXml(nodeId, bpmnXml, node, plugins);
			
			// 会签规则
			if(StringUtil.isNotEmpty(signRule)){
				SignRule rule = (SignRule)JsonUtil.getDTO(signRule, SignRule.class);
				bpmnXml = BpmDefineXmlBuilder.buildSignRuleXml(nodeId, bpmnXml, rule);
			}
			
			// 会签特权
			if(StringUtil.isNotEmpty(signRule)){
				@SuppressWarnings("unchecked")
				List<PrivilegeItem> privilegeItems = (List<PrivilegeItem>)JsonUtil.getDTOList(privilege, PrivilegeItem.class);
				bpmnXml = BpmDefineXmlBuilder.buildPrivilegeXml(nodeId, bpmnXml, privilegeItems);
			}
			
			bpmDefine.updateBpmnXml(iBpmDefine.getDefId(), bpmnXml);
			
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("会签规则设置成功");
			
		} catch (Exception e) {
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("会签规则设置失败");
			e.printStackTrace();
		}

		return result;
	}
	
}
