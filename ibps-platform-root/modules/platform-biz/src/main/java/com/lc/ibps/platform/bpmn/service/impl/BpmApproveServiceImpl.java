package com.lc.ibps.platform.bpmn.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.bpmn.api.constant.NodeStatus;
import com.lc.ibps.bpmn.api.model.task.IBpmTaskApproval;
import com.lc.ibps.bpmn.api.model.vo.QualifiedExecutor;
import com.lc.ibps.bpmn.persistence.entity.BpmApprovePo;
import com.lc.ibps.bpmn.service.impl.BpmApprovalServiceImpl;
import com.lc.ibps.org.party.persistence.entity.DefaultPartyUserPo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 流程审批历史信息，取审批人信息
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-09-18 14:53:18
 * </pre>
 */
@Service
public class BpmApproveServiceImpl extends BpmApprovalServiceImpl {
	
	@Resource
	private IPartyEntityService entityService;
	@Resource
	private IPartyUserService userService;
	
	@Override
	public List<IBpmTaskApproval> setAuditorInfo(List<IBpmTaskApproval> list) {
		
		for (IBpmTaskApproval opinion : list) {
			
			BpmApprovePo po = (BpmApprovePo)opinion;
			
			// 审批人姓名
			String auditor = po.getAuditor();
			String oppinion = po.getOpinion();

			if(StringUtil.isNotEmpty(auditor)){
				String entity = entityService.getByIdJson(auditor);
				if (JacksonUtil.isJsonObject(entity))
					po.setAuditorName(JacksonUtil.getString(entity, "name"));
	
				// 审批人头像图片
				User usrInfo = DefaultPartyUserPo.fromJsonString2(userService.getByIdJson(auditor));
				if (BeanUtils.isNotEmpty(usrInfo))
					po.setUserImg(usrInfo.getPhoto());
			}else if(BeanUtils.isNotEmpty(po.getQualifiedExecutor())){
				List<QualifiedExecutor> users = po.getQualifiedExecutor();
				for(QualifiedExecutor user:users){
					String userId = user.getExecutId();
					String entity = entityService.getByIdJson(userId);
					if(JacksonUtil.isJsonObject(entity)){
						String name = JacksonUtil.getString(entity, "name");
						user.setExecutor(JacksonUtil.getString(entity, name));
						oppinion = oppinion.replaceAll(userId, name);
						po.setOpinion(oppinion);
					}
				}
			}
		}
		
		return list;
	}

	@Override
	public List<IBpmTaskApproval> setAuditorOpinion(List<IBpmTaskApproval> list) {
		for (IBpmTaskApproval opinion : list) {
			BpmApprovePo po = (BpmApprovePo)opinion;
			
			String auditor = po.getAuditor();
			if(StringUtil.isNotEmpty(auditor)){
				String entity = entityService.getByIdJson(po.getAuditor());
				if (JacksonUtil.isJsonObject(entity)){
					po.setOpinion(JacksonUtil.getString(entity, "name") + ":" + po.getOpinion());
				}
			}
		}
		
		return list;
	}

	@Override
	public Map<String, Object> setApprovalerName(Map<String, Object> rs) {
		String reRs = "";
		StringBuffer rss = new StringBuffer("[");
		List<?> data = (List<?>)rs.get("data");
		if(BeanUtils.isEmpty(data))
			return rs;
		for(Object p:data){
			
			if(!(p instanceof BpmApprovePo)){
				break;
			}
			BpmApprovePo po = (BpmApprovePo)p;
			
			if(BeanUtils.isNotEmpty(po.getQualifiedExecutor())){
				List<QualifiedExecutor> users = po.getQualifiedExecutor();
				for(QualifiedExecutor user:users){
					String userId = user.getExecutId();
					String entity = entityService.getByIdJson(userId);
					if(JacksonUtil.isJsonObject(entity)){
						user.setExecutor(JacksonUtil.getString(entity, "name"));
					}
				}
			}
			
			String qualfieds = po.getQualfieds();
			JSONArray arrs = JSONArray.fromObject(qualfieds);
			User user = null;
			for(int ix=0;ix<arrs.size();ix++){
				JSONObject arr = JSONObject.fromObject(arrs.getString(ix));
				user = DefaultPartyUserPo.fromJsonString2(userService.getByIdJson(arr.getString("id")));
				if(BeanUtils.isNotEmpty(user)){
					rss.append("{\"id\":\"").append(user.getUserId()).append("\",");
					rss.append("\"name:\":\"").append(user.getFullname()).append("\",");
					rss.append("\"type:\":\"").append(arr.getString("type")).append("\"},");
				}else{
					//获取执行人的ID
					String auditor = po.getAuditor();
					if(StringUtil.isNotEmpty(auditor)){
						user = DefaultPartyUserPo.fromJsonString2(userService.getByIdJson(auditor));
						rss.append("{\"id\":\"").append(user.getUserId()).append("\",");
						rss.append("\"name:\":\"").append(user.getFullname()).append("\",");
						rss.append("\"type:\":\"").append(arr.getString("type")).append("\"},");
					}
				}
			}
			if(rss.length()>1){
				reRs = rss.substring(0, rss.length()-1);
				reRs += "]";
			}
			po.setQualfieds(reRs);	
			
			if (StringUtil.isNotEmpty(po.getAuditor())){
				String entity = entityService.getByIdJson(po.getAuditor());
				if (JacksonUtil.isJsonObject(entity)){
					po.setAuditorName(JacksonUtil.getString(entity, "name"));
				}
			}
		}
		
		return rs;
	}

	@Override
	public List<IBpmTaskApproval> findApprovalHisIgnoreFirstSkip(String procInstId, String curUser) {
		String skipFirstNode = AppUtil.getProperty("bpm.def.node.history.skipFirstNode");
		List<IBpmTaskApproval> hisList = findApprovalHis(procInstId, curUser);
		if("true".equals(skipFirstNode)&&hisList.size()>=2){
			IBpmTaskApproval his0 = hisList.get(0);
			IBpmTaskApproval his1 = hisList.get(1);
			if(NodeStatus.SKIP.getKey().equals(his1.getStatus())
					&&his0.getAuditor().equals(his1.getAuditor())){
				hisList.remove(1);
			}
		}
		return hisList;
	}

}
