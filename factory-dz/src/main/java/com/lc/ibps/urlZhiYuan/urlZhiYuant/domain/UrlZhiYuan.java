package com.lc.ibps.urlZhiYuan.urlZhiYuant.domain;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.lc.ibps.bpmn.persistence.dao.BpmDefineQueryDao;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.api.define.IBpmDefineReader;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.model.identity.BpmIdentity;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.api.service.BpmProcInstService;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.bpmn.utils.BpmIdentityUtil;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanQueryDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import net.sf.json.JSONObject;

/**
 * t_zyurl 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:07
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class UrlZhiYuan extends AbstractDomain<String, UrlZhiYuanPo>{
	 
	private UrlZhiYuanDao urlZhiYuanDao = null;
	private UrlZhiYuanQueryDao urlZhiYuanQueryDao = null;

	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private IBpmDefineReader bpmDefineReader;
	@Resource
	private BpmProcInstService bpmProcInstService;

	@Resource
	private BpmDefineQueryDao bpmDefineQueryDao;
	@Override
	protected void init(){
		urlZhiYuanDao = AppUtil.getBean(UrlZhiYuanDao.class);
		urlZhiYuanQueryDao = AppUtil.getBean(UrlZhiYuanQueryDao.class);
		this.setDao(urlZhiYuanDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(urlZhiYuanQueryDao.get(getId())));
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
		
		UrlZhiYuanPo po = null;
		IbpsProcInstCmd cmd=null;
		for(String id : ids){
			po = urlZhiYuanRepository.get(id);
			if(BeanUtils.isEmpty(po)){
				continue;
			}
			
			JSONObject dataJsonObject = JSONObject.fromObject(po);
			cmd = getStartCmd(flowKey, id,dataJsonObject.toString());

			bpmProcInstService.startProcInst(cmd);
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
        UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(busId);
        String xh = urlZhiYuanPo.getXh();
        String name = urlZhiYuanPo.getName();
        String finalteacher = urlZhiYuanPo.getFinalteacher();
        map.put("xh", xh);
        map.put("name", name);
        map.put("finalteacher", finalteacher);
		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.setFlowKey(flowKey);
		cmd.setBusinessKey(busId);
		cmd.setBusData(busData);
		cmd.setVariables(map);
		cmd.setCurUserName(ContextUtil.getCurrentUser().getFullname());
		//得到流程名
		List<BpmDefinePo> bpmDefinePos = bpmDefineQueryDao.findByDefKey(flowKey);
		String flowName = null;
		if(bpmDefinePos.size() !=0){
			BpmDefinePo bpmDefinePo = bpmDefinePos.get(0);
			flowName = bpmDefinePo.getName();
		}
		//设置流程名
		cmd.setSubject(flowName+"-"+name+"-"+xh);
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
