package com.lc.ibps.bishes.teacherAndStudent.domain;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.bo.constants.DataSaveMode;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bishes.teacherAndStudent.persistence.dao.TeacherAndStudentDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.dao.TeacherAndStudentQueryDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;
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

import net.sf.json.JSONObject;

/**
 * t_tddsxs 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TeacherAndStudent extends AbstractDomain<String, TeacherAndStudentPo>{
	 
	private TeacherAndStudentDao teacherAndStudentDao = null;
	private TeacherAndStudentQueryDao teacherAndStudentQueryDao = null;
	
	@Resource
	private TeacherAndStudentRepository teacherAndStudentRepository;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;


	@Override
	protected void init(){
		teacherAndStudentDao = AppUtil.getBean(TeacherAndStudentDao.class);
		teacherAndStudentQueryDao = AppUtil.getBean(TeacherAndStudentQueryDao.class);
		this.setDao(teacherAndStudentDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(teacherAndStudentQueryDao.get(getId())));
	}

	public void startFlow(String flowKey, String id) {
		if(BeanUtils.isEmpty(id)){
			return;
	}
		TeacherAndStudentPo po = null;
		IbpsProcInstCmd cmd=null;
		po = teacherAndStudentRepository.get(id);
			
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
		if (StringUtils.isNotEmpty(busData)) {
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
