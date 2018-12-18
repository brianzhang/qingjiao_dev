package com.lc.ibps.platform.bpmn.builder;

import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.persistence.entity.BpmOperNotifyPo;
import com.lc.ibps.bpmn.repository.BpmOperNotifyRepository;

/** 
 * 流程通知构建工具
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月29日-下午9:50:43
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class BpmOperNotifyBuilder {
	
	/**
	 * 构建展示字段
	 *
	 * @param list 
	 */
	public static void build(PageList<BpmOperNotifyPo> list){
		if(BeanUtils.isEmpty(list)){
			return;
		}
		
		for(BpmOperNotifyPo notifyPo : list){
			build(notifyPo);
		}
	}
	
	/**
	 * 构建展示字段
	 *
	 * @param notifyPo 
	 */
	public static void build(BpmOperNotifyPo notifyPo){
		if(BeanUtils.isEmpty(notifyPo)){
			return;
		}
		
		// 设置已读
		BpmOperNotifyRepository bpmOperNotifyRepository = AppUtil.getBean(BpmOperNotifyRepository.class);
		String isRead = bpmOperNotifyRepository.isRead(notifyPo.getId(), ContextUtil.getCurrentUserId());
		notifyPo.setIsRead(isRead);
		
		// 设置通知人姓名
		IPartyEntityService partyService = AppUtil.getBean(IPartyEntityService.class);
		String entity = partyService.getByIdJson(notifyPo.getNotifier());
		if(JacksonUtil.isJsonObject(entity)){
			notifyPo.setNotifierName(JacksonUtil.getString(entity, "name"));
		}

		// 设置节点名称
		if(BeanUtils.isNotEmpty(notifyPo.getNodeId())){
			IBpmDefineReader bpmDefineReader = AppUtil.getBean(IBpmDefineReader.class);
			IBpmNodeDefine nodeDefine = bpmDefineReader.getNode(notifyPo.getProcDefId(), notifyPo.getNodeId());
			if(BeanUtils.isNotEmpty(nodeDefine)){
				notifyPo.setNodeName(nodeDefine.getName());
			}
		}
		
		// 设置流程定义名称
		BpmDefineService bpmDefineService = AppUtil.getBean(BpmDefineService.class);
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefId(notifyPo.getProcDefId());
		if(BeanUtils.isNotEmpty(bpmDefine)){
			notifyPo.setProcDefName(bpmDefine.getName());
		}
	}
}
