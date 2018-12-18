package com.lc.ibps.pgs.PGData.domain;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjDao;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;
import com.lc.ibps.pgs.PGData.repository.DcwjxjRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

import net.sf.json.JSONObject;


/**
 * t_dcwjxj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")

public class Dcwjxj extends AbstractDomain<String, DcwjxjPo>{
	 
//	private static final IQueryDao<String, DcwjxjPo> DcwjxjRepository = null;
	@Resource
	private DcwjxjRepository dcwjxjRepository;
	
	private DcwjxjDao dcwjxjDao = null;
	private DcwjxjQueryDao dcwjxjQueryDao = null;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private BpmProcInstService bpmProcInstService;

	protected void init(){
		dcwjxjDao = AppUtil.getBean(DcwjxjDao.class);
		dcwjxjQueryDao = AppUtil.getBean(DcwjxjQueryDao.class);
		this.setDao(dcwjxjDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(dcwjxjQueryDao.get(getId())));
	}
	
	/**
	 * 启动流程
	 *
	 * @param flowKey
	 * @param ids 
	 */

	public void startFlow(String flowKey, String[] ids) {
		if(BeanUtils.isEmpty(ids)){
			return;
		}
		for(String id : ids){
		DcwjxjPo po = null;
		IbpsProcInstCmd cmd=null;
	
			//po = DcwjxjRepository.get(id);
		     po = dcwjxjRepository.get(id);
//			if(BeanUtils.isEmpty(po)){
//				continue;
//			}
			
			JSONObject dataJsonObject = JSONObject.fromObject(po);
			cmd = getStartCmd(flowKey, id,dataJsonObject.toString());

			bpmProcInstService.startProcInst(cmd);     //需要对t_zyurl表进行查询  findbyid
		}	
	}
	
	private IbpsProcInstCmd getStartCmd(String flowKey,  String busId,String busData) {
		IBpmDefine bpmDefine = bpmDefineService.getBpmDefinitionByDefKey(flowKey, false);
		if(BeanUtils.isEmpty(bpmDefine)){
			throw new RuntimeException("流程不存在，流程key【"+flowKey+"】");
		}
		String nodeUsers = "[]";
		Map<String, List<BpmIdentity>> specUserMap = BpmIdentityUtil.getBpmIdentity(nodeUsers);
        Map<String,Object > map = new HashMap<String, Object>();
       // DcwjxjPo dcwjxjPo = DcwjxjRepository.get(busId);
        DcwjxjPo dcwjxjPo = dcwjxjRepository.get(busId);
        String xh = dcwjxjPo.getXh();
        String name = dcwjxjPo.getName();
        String finalteacher = dcwjxjPo.getFinalteacher();
        map.put("xh", xh);
        map.put("name", name);
        map.put("finalteacher", finalteacher);
		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(flowKey);
		cmd.setBusinessKey(busId);
		cmd.setBusData(busData);
		cmd.setVariables(map);
		cmd.setCurUserName(ContextUtil.getCurrentUser().getFullname());
		// 设置指定执行人
		if (BeanUtils.isNotEmpty(specUserMap)) {
			cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, specUserMap);
		}
		// 设置当前执行人信息
		cmd.setCurUser(ContextUtil.getCurrentUser().getUserId());
		cmd.setDataMode(ActionCmd.DATA_MODE_PK);
		return cmd;
	}
}
