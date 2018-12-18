package com.lc.ibps.bpmn.listener;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Service;

import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.bo.service.IBoInstanceService;
import com.lc.ibps.api.bo.vo.BoResultVo;
import com.lc.ibps.api.bo.vo.SubDataVo;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringValidator;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.cmd.ProcInstCmd;
import com.lc.ibps.bpmn.api.constant.AopType;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.event.BpmStartEvent;
import com.lc.ibps.bpmn.api.event.BpmStartModel;
import com.lc.ibps.bpmn.api.exception.HandlerException;
import com.lc.ibps.bpmn.api.model.define.BpmDefineAttributes;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.define.NodeAttributes;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.model.node.UserTaskNodeDefine;
import com.lc.ibps.bpmn.api.service.DataObjectHandler;
import com.lc.ibps.bpmn.domain.BpmBusRel;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmBusRelPo;
import com.lc.ibps.bpmn.persistence.entity.BpmInstPo;
import com.lc.ibps.bpmn.repository.BpmBusRelRepository;
import com.lc.ibps.bpmn.repository.BpmExecRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.utils.BpmUtil;
import com.lc.ibps.bpmn.utils.HandlerUtil;

/**
 * 流程启动前置后置事件
 * 
 * <pre>
 *  
 * 构建组：ibps-bpmn-biz
 * 作者：simon cai
 * 邮箱:3286168767@qq.com
 * 日期:2016-6-6-下午4:33:16
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Service
public class BpmStartEventListener implements ApplicationListener<BpmStartEvent>, Ordered {

	@Resource
	private BpmBusRelRepository bpmBusRelRepository;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private IBoInstanceService boInstanceService;
	@Resource
	private DataObjectHandler dataObjectHandler;
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private BpmExecRepository bpmExecRepository;

	@Override
	public void onApplicationEvent(BpmStartEvent ev) {
		BpmStartModel model = (BpmStartModel) ev.getSource();
		if (AopType.PREV.equals(model.getAopType())) {
			before(model);
		} else {
			after(model);
		}
	}

	private void before(BpmStartModel model) {
		// 执行前置处理器
		this.exeHandler(model, true);
		// 添加业务表的中间数据库表
		this.addBusRel(model);
	}
	
	/**
	 * 执行节点处理器。
	 * 
	 * @param model
	 * @param isBefore
	 *            void
	 */
	private void exeHandler(BpmStartModel model, boolean isBefore) {
		IBpmProcInst instance = model.getBpmProcessInstance();
		ActionCmd cmd = model.getCmd();
		// 获取发起节点获取不到则获取第一个节点。
		NodeAttributes properties = this.getStartProperties(instance);
		if(BeanUtils.isEmpty(properties))
			return;
		String handler = isBefore ? properties.getPrevHandler() : properties.getPostHandler();
		if(StringUtils.isEmpty(handler)){
			IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(instance.getProcDefId());
			BpmDefineAttributes attr = bpmProcessDef.getBpmProcExtendDefine().getExtendAttributes();
			handler = isBefore?attr.getPrevHandler():attr.getPostHandler();
			if (StringUtils.isEmpty(handler)){return;}
			properties = new NodeAttributes();
			properties.setPostHandler(attr.getPostHandler());
			properties.setPrevHandler(attr.getPrevHandler());
		}

		try {
			HandlerUtil.invokeHandler(cmd, handler);
		} catch (Exception ex) {
			throw new HandlerException(ex.getMessage(), ex.getCause());
		}
	}
	
	/**
	 * 添加关联数据
	 * 
	 * @param model
	 * void
	 */
	private void addBusRel(BpmStartModel model) {
		ActionCmd cmd = model.getCmd();
		if (cmd instanceof ProcInstCmd) {
			String curUser = cmd.getCurUser();
			BpmInstPo inst = (BpmInstPo) model.getBpmProcessInstance();
			// 设置数据模式
			inst.setDataMode(cmd.getDataMode());
		
			// 键名 键值
			if (ActionCmd.DATA_MODE_PAIR.equals(cmd.getDataMode())) {
				BpmBusRelPo busLink = this.buildBusRel(model, curUser);
				BpmBusRel bpmBusRel = bpmBusRelRepository.newInstance(busLink);
				bpmBusRel.create();
			}
			// 单主键
			else if (ActionCmd.DATA_MODE_PK.equals(cmd.getDataMode())) {
				BpmBusRelPo busLink = this.buildBusRel(model, curUser);
				BpmBusRel bpmBusRel = bpmBusRelRepository.newInstance(busLink);
				bpmBusRel.create();
			}
			
			//将数据都保存在变量表中
			this.handSaveBoData(model, cmd.getBusData(), cmd, curUser);
		}
	}

	/**
	 * 根据流程实例获取发起节点的属性配置。
	 * 
	 * @param instance
	 * @return NodeProperties
	 */
	private NodeAttributes getStartProperties(IBpmProcInst instance) {
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(instance.getProcDefId());

		IBpmNodeDefine bpmNodeDefine = bpmProcessDef.getStartEvent();
		//取开始节点的配置
		NodeAttributes properties = bpmNodeDefine.getLocalProperties();
		if (properties != null)
			return properties;

		List<IBpmNodeDefine> bpmNodeDefines = bpmProcessDef.getStartNodes();
		for (IBpmNodeDefine nodeDef : bpmNodeDefines) {
			if (nodeDef instanceof UserTaskNodeDefine) {
				String parentInstId = instance.getParentInstId();
				if (StringValidator.isZeroEmpty(parentInstId)) {
					properties = nodeDef.getLocalProperties();
				} else {
					IBpmProcInst parentInst = bpmInstRepository.get(parentInstId);
					String defKey = parentInst.getProcDefKey();
					properties = nodeDef.getPropByParentProcDefineKey(defKey);
				}
				break;
			}
		}
		return properties;
	}



	/**
	 * 处理BO数据保存。
	 * 
	 * <pre>
	 * 	1.验证bo数据。
	 * 		判断提交的BO数据是否包含流程定义的必须的。
	 *  2.将JSON数据进行分解和流程定义BO定义分解。
	 *  
	 *  3.如果是保存到物理表，那么添加关联数据到业务中间表。
	 *  
	 *  4.添加bo数据到流程变量，在展示表单时需要从流程变量中获取变量的值，
	 *  
	 *  再获取bo对象，展示到表单。
	 * </pre>
	 * 
	 * @param model
	 * @param boJson
	 * @param cmd
	 *            void
	 */
	private void handSaveBoData(BpmStartModel model, String boJson, ActionCmd cmd, String curUser) {
		BpmProcExtendDefine bpmProcessDefExt = getByStartModel(model);
		if(StringUtils.isEmpty(boJson))
			return;
		//JSONObject jsonObj = JSONObject.fromObject(boJson);
		//BoDataUtil.validBo(bpmProcessDefExt, jsonObj);

		ProcBoDefine boDef = bpmProcessDefExt.getBoDefine();
		String saveType = boDef.isSaveTable() ? DataSaveMode.TABLE : DataSaveMode.INSTANCE;

		Map<String, IDataObject> boMap = new HashMap<String, IDataObject>();

		String key = boDef.getKey();
		//String json= BoDataUtil.getBoJson(key,jsonObj);

		IDataObject dataObject = null;
		if(StringUtils.isNotEmpty(key)){
			dataObject = boInstanceService.createDataObject(key, boDef.getVersion(), boJson);
		}
		if(BeanUtils.isNotEmpty(dataObject)){
			dataObject.setId(cmd.getBusinessKey());
			dataObject.setCurUserId(curUser);
			// 处理bo数据(后置脚本)
			dataObjectHandler.handSaveData(model.getBpmProcessInstance(), dataObject);
			
			// bo数据处理
			if (DataSaveMode.TABLE.equals(cmd.getDataMode())
					|| DataSaveMode.INSTANCE.equals(cmd.getDataMode())) {
				// BO数据存到物理表。
				BoResultVo boResult = boInstanceService.save(saveType, dataObject);
				this.addBoBusRel(model, boResult, curUser);
			}
			
			boMap.put(dataObject.getIboDef().getCode(), dataObject);
		}
			
		// 将BO放入cmd上下文中。
		cmd.getTransitVars().put(BpmConstants.BO_INST, boMap);
	}

	/**
	 * 根据BpmStartModel获取流程定义扩展信息。
	 * 
	 * @param model
	 * @return DefaultBpmProcessDefExt
	 */
	private BpmProcExtendDefine getByStartModel(BpmStartModel model) {
		IBpmProcInst instance = model.getBpmProcessInstance();
		String defId = instance.getProcDefId();
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(defId);
		BpmProcExtendDefine bpmProcessDefExt = (BpmProcExtendDefine) bpmProcessDef.getBpmProcExtendDefine();
		return bpmProcessDefExt;
	}

	/**
	 * 添加bo数据到业务中间关联表。
	 * 
	 * @param model
	 * @param boResult
	 *            void
	 */
	private void addBoBusRel(BpmStartModel model, BoResultVo boResult, String curUser) {
		BpmBusRelPo busRel = BpmUtil.buildBusLink(model.getBpmProcessInstance(), curUser);
		busRel.setBusinesskey(boResult.getResultId());
		busRel.setFormIdentify(boResult.getTableName());
		busRel.setIsMain(1);
		busRel.setCreateDate(new Date());
		BpmBusRel bpmBusRel = bpmBusRelRepository.newInstance(busRel);
		bpmBusRel.create();

		List<SubDataVo> subDatas = boResult.getSubDataList();

		for (SubDataVo subData : subDatas) {
			BpmBusRelPo subBusRel = BpmUtil.buildBusLink(model.getBpmProcessInstance(), curUser);
			subBusRel.setBusinesskey(subData.getPk());
			subBusRel.setFormIdentify(subData.getTableName());
			subBusRel.setIsMain(0);
			BpmBusRel bpmBusRel0 = bpmBusRelRepository.newInstance(subBusRel);
			bpmBusRel0.create();
		}
	}

	/**
	 * 构建业务中间表。
	 * 
	 * @param model
	 * @return BpmBusLink
	 */
	private BpmBusRelPo buildBusRel(BpmStartModel model, String curUser) {
		ActionCmd cmd = model.getCmd();
		ProcInstCmd processCmd = (ProcInstCmd) cmd;
		String businessKey = processCmd.getBusinessKey();

		BpmBusRelPo busRel = BpmUtil.buildBusLink(model.getBpmProcessInstance(), curUser);
		busRel.setBusinesskey(businessKey);

		String formIdentity = (String) cmd.getVariables().get(BpmConstants.BPM_FORM_IDENTITY);
		busRel.setFormIdentify(formIdentity);

		return busRel;
	}

	private void after(BpmStartModel model) {
		// 执行后置处理器
		exeHandler(model, false);
	}
	
	@Override
	public int getOrder() {
		return 5;
	}

}
