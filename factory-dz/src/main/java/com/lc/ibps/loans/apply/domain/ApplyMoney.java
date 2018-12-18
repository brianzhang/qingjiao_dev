package com.lc.ibps.loans.apply.domain;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.util.AppUtil;
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
import com.lc.ibps.loans.apply.persistence.dao.ApplyMoneyDao;
import com.lc.ibps.loans.apply.persistence.dao.ApplyMoneyQueryDao;
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;
import com.lc.ibps.loans.apply.repository.ApplyMoneyRepository;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;
import com.lc.ibps.loans.daikuanInfo.repository.DaiKuanShenQingInfoRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

import net.sf.json.JSONObject;

/**
 * t_jiedai 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:37:03
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ApplyMoney extends AbstractDomain<String, ApplyMoneyPo>{
	 
	private ApplyMoneyDao applyMoneyDao = null;
	private ApplyMoneyQueryDao applyMoneyQueryDao = null;
	
	@Resource
	private ApplyMoneyRepository applyMoneyRepository;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;
	@Resource
	private DaiKuanShenQingInfoRepository daiKuanShenQingInfoRepository;
	


	protected void init(){
		applyMoneyDao = AppUtil.getBean(ApplyMoneyDao.class);
		applyMoneyQueryDao = AppUtil.getBean(ApplyMoneyQueryDao.class);
		this.setDao(applyMoneyDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(applyMoneyQueryDao.get(getId())));
	}

	public void startFlow(String flowKey, String id) {
		if(BeanUtils.isEmpty(id)){
			return;
		}
		
		ApplyMoneyPo po = null;
		IbpsProcInstCmd cmd=null;
		po = applyMoneyRepository.get(id);
			
		JSONObject dataJsonObject = JSONObject.fromObject(po);
		cmd = getStartCmd(flowKey, id,dataJsonObject.toString());
		
		bpmProcInstService.startProcInst(cmd);
		}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private IbpsProcInstCmd getStartCmd(String flowKey,  String busId,String busData) {
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(flowKey, false);
		if(BeanUtils.isEmpty(bpmDefine)){
			throw new RuntimeException("流程不存在，流程key【"+flowKey+"】");
		}
		String nodeUsers = "[]";
		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);

		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(flowKey);
		cmd.setBusinessKey(busId);
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
