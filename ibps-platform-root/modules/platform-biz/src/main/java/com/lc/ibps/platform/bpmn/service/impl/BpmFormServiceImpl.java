package com.lc.ibps.platform.bpmn.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.bo.model.IDataObject;
import com.lc.ibps.api.form.constants.RightsScope;
import com.lc.ibps.api.form.model.IFormDef;
import com.lc.ibps.api.form.service.IFormDefService;
import com.lc.ibps.api.form.service.IFormRightsService;
import com.lc.ibps.api.form.vo.FormPermissionVo;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.string.StringValidator;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.cmd.BaseActionCmd;
import com.lc.ibps.bpmn.api.constant.ProcInstStatus;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcExtendDefine;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.form.IForm;
import com.lc.ibps.bpmn.api.model.form.IFormModel;
import com.lc.ibps.bpmn.api.model.inst.IBpmProcInst;
import com.lc.ibps.bpmn.api.model.node.IBpmNodeDefine;
import com.lc.ibps.bpmn.api.model.node.UserTaskNodeDefine;
import com.lc.ibps.bpmn.api.nat.inst.NatProInstService;
import com.lc.ibps.bpmn.api.service.BpmBoService;
import com.lc.ibps.bpmn.api.service.BpmFormService;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.model.form.DefaultForm;
import com.lc.ibps.bpmn.persistence.entity.BpmBusRelPo;
import com.lc.ibps.bpmn.repository.BpmBusRelRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.form.form.helper.FormDefDataBuilder;
import com.lc.ibps.form.form.persistence.entity.FormDefPo;
import com.lc.ibps.form.form.repository.FormDefRepository;

/**
 * 流程获取表单
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-2-5 09:25:42
 *</pre>
 */
@Service
public class BpmFormServiceImpl implements BpmFormService {
	
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private BpmBoService bpmBoService;
	@Resource
	private IFormRightsService formRightsService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private IFormDefService formDefService;
	@Resource
	private NatProInstService natProInstService;
	@Resource
	private BpmBusRelRepository bpmBusRelRepository;
	@Resource
	private FormDefRepository formDefRepository;
	
	@Override
	public Map<String, Object> instFormInfoByInstId(String instId, String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", true);
		//获取正在运行的流程实例信息
		IBpmProcInst bpmProcessInstance = bpmInstRepository.get(instId);
		if(BeanUtils.isEmpty(bpmProcessInstance)){
			//获取结束的流程实例信息
			bpmProcessInstance = bpmInstRepository.getHistoryById(instId);
		}
		// 如果是子流程，则获取其所属主流程的实例
		IBpmProcInst topBpmProcessInstance = bpmInstRepository.getTopBpmProcInst(bpmProcessInstance);
		// 表单
		IFormModel formModel = this.getInstFormByDefId(topBpmProcessInstance);
		String permissions= "";
		// BO
		IDataObject dataObject = bpmBoService.getDataByInst(bpmProcessInstance);
		if (BeanUtils.isNotEmpty(formModel) && FormCategory.INNER.equals(formModel.getType())) {
			Map<String, String> rightsMap = new HashMap<String, String>();
			rightsMap.put(FormPermissionVo.FLOW_KEY,bpmProcessInstance.getProcDefKey());
			 
			permissions = formRightsService.getPermission(new FormPermissionVo(RightsScope.INST,userId,
					formModel.getKey(), rightsMap));
		}
		map.put("formModel",formModel);
		// bo数据
		map.put("boData", BeanUtils.isNotEmpty(dataObject)?dataObject.getData():null);
		map.put("permissions", permissions);
		return map;
	}
	
	@Override
	public IForm getFormDefByDefNode(String defId, String nodeId, IBpmProcInst instance) {
		IBpmNodeDefine bpmNodeDef = bpmDefineReader.getNode(defId, nodeId);

		IForm form = null;

		String parentInstId = instance.getParentInstId();
		int i = 0;
		while (!StringValidator.isZeroEmpty(parentInstId)) {
			IBpmProcInst parentInstance = bpmInstRepository.get(parentInstId);
			// 首先查看有没有从父流程配置表单。
			if (i == 0) {
				String parentDefKey = parentInstance.getProcDefKey();
				form = bpmNodeDef.getForm(parentDefKey);
				if (form != null && StringUtil.isNotEmpty(form.getFormValue())) {
					convertForm(form);
					return form;
				}
			}
			// 如果没有则直接往上查找，找到顶层流程，
			else {
				parentInstId = parentInstance.getParentInstId();
				if (StringValidator.isZeroEmpty(parentInstId)) {
					String tmpdefId = parentInstance.getProcDefId();
					form = getFormDefByDefId(tmpdefId);
					if (form != null && StringUtil.isNotEmpty(form.getFormValue())){
						convertForm(form);
						return form;
					}
				}
			}
			i++;
		}
		
		form = bpmNodeDef.getForm();
		if (form != null && StringUtil.isNotEmpty(form.getFormValue())) {
			convertForm(form);
			return form;
		}
		
		return null;
	}

	@Override
	public IFormModel getByDefId(String defId) {
		IForm frm = getFormDefByDefId(defId);
		if (frm == null  || StringUtil.isEmpty(frm.getFormValue()))
			return null;
		IFormModel formModel = getByForm(frm, null);
		return formModel;
	}

	private IFormModel getByForm(IForm frm, IBpmProcInst instance) {
		IFormModel formModel = new DefaultForm(frm);
		if (FormCategory.INNER.equals(formModel.getType())) {//在线表单
			String formKey = formModel.getFormValue();
			IFormDef formDef = formDefService.getMainByFormKey(formKey);
			if(BeanUtils.isEmpty(formDef))
				return null;
			formModel.setFormData(formDefService.getFormData(formDef.getId()));
			formModel.setKey(formDef.getKey());
			formModel.setId(formDef.getId());
		} else if (FormCategory.URL_LOAD.equals(formModel.getType())) {
			if (instance != null) {
				instance = getParentInstance(instance);
				String url = frm.getFormValue();
				url = getUrl(instance, url);
				formModel.setFormValue(url);
			}else{
				String url = frm.getFormValue();
				url = replaceUrl(url);
				formModel.setFormValue(url);
			}
		} else if (FormCategory.FRAME.equals(formModel.getType())) {
			if (instance != null) {
				instance = getParentInstance(instance);
				String url = frm.getFormValue();
				url = getUrl(instance, url);
				formModel.setFormValue(url);

				String editUrl = frm.getEditUrl();
				url = getUrl(instance, editUrl);
				formModel.setEditUrl(url);
			}
		}

		return formModel;
	}

	private String replaceUrl(String url) {
		Map<String, String> map = new HashMap<String, String>();
		return replaceStr(url, map);
	}

	private String getUrl(IBpmProcInst instance, String url) {
		Map<String, String> map = new HashMap<String, String>();
		// 获取流程实例的状态
		String status = instance.getStatus();
		// url中支持流程变量 格式{}
		Map<String, Object> variables = null;
		// 流程变量获取
		if(ProcInstStatus.STATUS_END.getKey().equals(status) 
				|| ProcInstStatus.STATUS_MANUAL_END.getKey().equals(status)){
			variables = natProInstService.getHisVariables(instance.getBpmnInstId());
		}else{
			variables = natProInstService.getVariables(instance.getBpmnInstId());
		}
		if (BeanUtils.isNotEmpty(variables)){
			for (String key : variables.keySet()) {
				Object value = variables.get(key);
				if (value == null){
					continue;
				}
				map.put(key, value.toString());
			}
		}
			
		if (ActionCmd.DATA_MODE_PK.equals(instance.getDataMode())) {
			map.put(ActionCmd.DATA_MODE_PK, instance.getBizKey());
		} else {
			List<BpmBusRelPo> list = bpmBusRelRepository.getByInst(instance.getId());
			for (BpmBusRelPo link : list) {
				map.put(link.getFormIdentify(), link.getBusinesskey());
			}
		}
		url = replaceStr(url, map);

		return url;
	}
	
	/**
	 * 替换字符串。
	 * 
	 * @param str
	 * @param map
	 * @return String
	 */
	private static String replaceStr(String str, Map<String, String> map) {
		if (StringUtil.isEmpty(str))
			return "";

		Pattern regex = Pattern.compile("\\{(.*?)\\}", Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);
		Matcher regexMatcher = regex.matcher(str);
		while (regexMatcher.find()) {
			String key = regexMatcher.group(1);
			String toReplace = regexMatcher.group(0);
			String val = map.get(key);
			if (val == null)
				val ="";
			str = str.replace(toReplace, val);
		}
		return str;

	}

	private IBpmProcInst getParentInstance(IBpmProcInst instance) {
		if (StringValidator.isZeroEmpty(instance.getParentInstId()))
			return instance;
		while (!StringValidator.isZeroEmpty(instance.getParentInstId())) {
			instance = bpmInstRepository.get(instance.getParentInstId());
		}
		return instance;
	}

	/**
	 * 在发起流程时获取流程表单。
	 * 
	 * <pre>
	 * 获取逻辑顺序：
	 * 1.取得开启节点的表单。
	 * 2.获取第一个任务节点的表单。
	 * 3.取得全局表单。
	 * </pre>
	 * 
	 * @param defId
	 * @return Form
	 */
	private IForm getFormDefByDefId(String defId) {
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(defId);
		// 发起节点
		IBpmNodeDefine bpmNodeDef = bpmProcessDef.getStartEvent();
		IForm form = bpmNodeDef.getForm();
		
		// 取第一个节点
		if (form == null || StringUtil.isEmpty(form.getFormValue())) {
			List<IBpmNodeDefine> bpmNodeDefs = bpmProcessDef.getStartNodes();
			if (BeanUtils.isNotEmpty(bpmNodeDefs) && bpmNodeDefs.size() == 1) {
				IBpmNodeDefine nodeDef = bpmNodeDefs.get(0);
				if (nodeDef instanceof UserTaskNodeDefine) {
					form = nodeDef.getForm();
				}
			}
		}
		
		// 取全局表单
		if (form == null || StringUtil.isEmpty(form.getFormValue())) {
			BpmProcExtendDefine defExt = (BpmProcExtendDefine)bpmProcessDef.getBpmProcExtendDefine();
			form = defExt.getGlobalForm();
		}
		
		if (form != null && StringUtil.isNotEmpty(form.getFormValue())) {
			convertForm(form);
			return form;
		}
		
		return null;
	}
	
	private void convertForm(IForm form) {
		if (FormCategory.INNER.equals(form.getType())) {
			IFormDef frm = formDefService.getMainByFormKey(form.getFormValue());
			if(BeanUtils.isEmpty(frm))
				return;
			frm.setFormHtml(form.getFormValue());
		}
	}

	@Override
	public IFormModel getByDraft(IBpmProcInst instance) {
		String defId = instance.getProcDefId();
		IForm form = getFormDefByDefId(defId);
		IFormModel formModel = getByForm(form, instance);
		return formModel;
	}

	@Override
	public IFormModel getByDefId(String defId, String nodeId, IBpmProcInst instance) {
		IForm frm = null;
		//初始化打印模版ID信息
		String templateId = null;
		// 获取节点表单
		frm = getFormDefByDefNode(defId, nodeId, instance);
		if (frm != null && StringUtil.isNotEmpty(frm.getFormValue())) {
			IFormModel formModel = getByForm(frm, instance);
			//单个节点获取打印模版为空,则获取全局的
			if(StringUtil.isEmpty(formModel.getTemplateId())){
				IForm frmPrint = this.getGlobal(defId);
				if(BeanUtils.isNotEmpty(frmPrint)){
					templateId = frmPrint.getTemplateId();
					formModel.setTemplateId(templateId);
				}
			}
			return formModel;
		}
		
		// 获取运行时表单
		String formType = instance.getFormType();
		if(StringUtil.isNotEmpty(formType)){
			String formKey = instance.getFormKey();
			IFormModel formModel = new DefaultForm();
			formModel.setType(FormCategory.get(formType));
			if(FormCategory.INNER.value().equals(formType)){//inner表单
				IFormDef formDef = formDefService.getMainByFormKey(formKey);
				if(BeanUtils.isEmpty(formDef))
					return null;
				//获取打印模版ID信息
				if(StringUtil.isEmpty(formModel.getTemplateId())){
					IForm frmPrint = this.getGlobal(defId);
					if(BeanUtils.isNotEmpty(frmPrint)){
						templateId = frmPrint.getTemplateId();
						formModel.setTemplateId(templateId);
					}
				}
				formModel.setFormData(formDefService.getFormData(formDef.getId()));
				formModel.setKey(formDef.getKey());
				formModel.setId(formDef.getId());
			} else {
				instance = getParentInstance(instance);
				formKey = getUrl(instance, formKey);
				formModel.setFormValue(formKey);
			}
			
			return formModel;
		}
		
		// 获取全局表单
		if (frm == null  || StringUtil.isEmpty(frm.getFormValue())) {
			frm = this.getGlobal(defId);
		}
		
		if (frm != null && StringUtil.isNotEmpty(frm.getFormValue())) {
			convertForm(frm);
			IFormModel formModel = getByForm(frm, instance);
			return formModel;
		}
		
		return null;
	}
	
	/**
	 * 获取全局的表单信息
	 * @param instance
	 * @return
	 */
	private IForm getGlobal(String defId){
		IForm frm = null;
		if(StringUtil.isEmpty(defId)){
			return frm;
		}
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(defId);
		BpmProcExtendDefine defExt = (BpmProcExtendDefine) bpmProcessDef.getBpmProcExtendDefine();
		frm = defExt.getGlobalForm();
		return frm;
	}
	

	@Override
	public IFormModel getInstFormByDefId(IBpmProcInst instance) {
		String defId = instance.getProcDefId();
		
		// 获取实例表单
		IBpmProcDefine<IBpmProcExtendDefine> bpmProcessDef = bpmDefineReader.getBpmProcDefine(defId);
		BpmProcExtendDefine defExt = (BpmProcExtendDefine) bpmProcessDef.getBpmProcExtendDefine();
		IForm frm = defExt.getInstForm();
		if (frm == null || StringUtil.isEmpty(frm.getFormValue())){//获取不到获全局表单
			 frm = defExt.getGlobalForm();
		}
			
		if (frm == null || StringUtil.isEmpty(frm.getFormValue())){
			return null;
		}

		IFormModel frmModel = getByForm(frm, instance);
		return frmModel;
	}

	@Override
	public void setFormOptions(BaseActionCmd cmd, String defId) {
		// 获取表单
		IFormModel formModel = this.getByDefId(defId);
		if(BeanUtils.isNotEmpty(formModel)){
			//设置表单数据。
			FormDefPo formDefPo = formDefRepository.getByFormKey(formModel.getKey());
			if(BeanUtils.isNotEmpty(formDefPo))
				cmd.setFormOptions(FormDefDataBuilder.buildFormOptionData(formDefPo,cmd.getBusData()));
		}
	}

	@Override
	public void setFormOptions(BaseActionCmd cmd, String defId, String nodeId, IBpmProcInst instance) {
		// 表单
		IFormModel	formModel = this.getByDefId(defId,nodeId, instance);
		if(BeanUtils.isNotEmpty(formModel)){
			//设置表单数据。
			FormDefPo formDefPo = formDefRepository.getByFormKey(formModel.getKey());
			if(BeanUtils.isNotEmpty(formDefPo))
				cmd.setFormOptions(FormDefDataBuilder.buildFormOptionData(formDefPo,cmd.getBusData()));
		}
	}

}
