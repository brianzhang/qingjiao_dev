package com.lc.ibps.test.demo.domain;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.define.IBpmProcDefine;
import com.lc.ibps.bpmn.api.model.form.FormCategory;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.model.node.ProcBoDefine;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.model.define.BpmProcExtendDefine;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.test.demo.persistence.dao.UrlFormDao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormQueryDao;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2Dao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.demo.repository.UrlFormRepository;

import net.sf.json.JSONObject;

/**
 * url表单例子 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class UrlForm extends AbstractDomain<String, UrlFormPo>{
	 
	private UrlFormDao urlFormDao = null;
	private UrlFormQueryDao urlFormQueryDao = null;
	private UrlFormSub2Dao urlFormSub2Dao = null;
	@Resource
	private UrlFormRepository urlFormRepository;
	
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;


	protected void init(){
		urlFormDao = AppUtil.getBean(UrlFormDao.class);
		urlFormQueryDao = AppUtil.getBean(UrlFormQueryDao.class);
		urlFormSub2Dao = AppUtil.getBean(UrlFormSub2Dao.class);
		this.setDao(urlFormDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(urlFormQueryDao.get(getId())));
	}
	
	/**
	 * 主从表一并保存 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void saveCascade(){
		save();
		if(getData().isDelBeforeSave()){
			urlFormSub2Dao.deleteByMainId(getId());
		}
		
		if(BeanUtils.isNotEmpty(getData().getUrlFormSub2PoList())){
			for(UrlFormSub2Po urlFormSub2Po:getData().getUrlFormSub2PoList()){
				//设置外键
				urlFormSub2Po.setParentId(getId());
				
				urlFormSub2Dao.create(urlFormSub2Po);
			}
		}
	}	
	
	/**
	 * 主从表一并删除 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void deleteByIdsCascade(String[] ids){
		for(String id : ids){
			urlFormSub2Dao.deleteByMainId(id);	
		}
		deleteByIds(ids);
	}

	/**
	 * 启动流程
	 *
	 * @param defKey
	 * @param ids 
	 */
	public void startFlow(String defKey, String destination, String[] ids) {
		if(BeanUtils.isEmpty(ids)){
			return;
		}
		
		UrlFormPo po = null;
		IbpsProcInstCmd cmd = null;
		for(String id : ids){
			po = urlFormRepository.loadCascade(id);
			if(BeanUtils.isEmpty(po)){
				continue;
			}
			
			JSONObject dataJsonObject = JSONObject.fromObject(po);
			cmd = getStartCmd(defKey, destination, id, dataJsonObject.toString());
			bpmProcInstService.startProcInst(cmd);
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getStartCmd(String defKey, String destination, String busId,String busData) {
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(defKey, false);
		if(BeanUtils.isEmpty(bpmDefine)){
			throw new RuntimeException("流程不存在，流程key【"+defKey+"】");
		}
		
		/* 节点执行人
		 * [
		 * 	{nodeId:"UserTask_16w6bmp"
		 * 	 ,executors:[{id:"1",type:"employee",name:"管理员"}]
		 * 	}
		 * ]
		 */
		String nodeUsers = "[]";

		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(defKey);
		cmd.setBusinessKey(busId);
		cmd.setDestination(destination);
		if (StringUtil.isNotEmpty(busData)) {
			IBpmProcDefine<BpmProcExtendDefine> bpmProcessDef = (IBpmProcDefine) bpmDefineReader.getBpmProcDefine(bpmDefine.getDefId());
			BpmProcExtendDefine bpmProcExtendDefine= bpmProcessDef.getBpmProcExtendDefine();
			String dataSaveMode = DataSaveMode.TABLE;
			FormCategory formCategory = bpmProcExtendDefine.getGlobalForm().getType();
			if(FormCategory.INNER.equals(formCategory)  ){
				ProcBoDefine boDef = bpmProcExtendDefine.getBoDefine();
				dataSaveMode = boDef.isSaveTable()?DataSaveMode.TABLE:DataSaveMode.INSTANCE;
			}else if(FormCategory.URL_LOAD.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PK;
			}else if(FormCategory.FRAME.equals(formCategory)){
				dataSaveMode =ActionCmd.DATA_MODE_PAIR;
			}
			
			cmd.setDataMode(dataSaveMode);
		
			cmd.setBusData(busData);
		}

		// 设置指定执行人
		if (BeanUtils.isNotEmpty(specUserMap)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}

		// 设置当前执行人信息
		cmd.setCurUser(ContextUtil.getCurrentUser().getUserId());
		
		return cmd;
	}
	
}
