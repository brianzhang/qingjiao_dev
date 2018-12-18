package com.lc.ibps.xinDaiLIiuCheng.liucheng.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;
import com.lc.ibps.loans.daikuanInfo.repository.DaiKuanShenQingInfoRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.domain.XinDaiLiuCheng;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.service.XinDaiLiuChengService;

import net.sf.json.JSONObject;



@Transactional
@Service("xinDaiLiuChengService")
public class XinDaiLiuChengServiceImpl implements XinDaiLiuChengService {
	@Resource
	private XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	private DaiKuanShenQingInfoRepository daiKuanShenQingInfoRepository;

	@Override
	public void save(ActionCmd cmd) {
		System.out.println("cmd======="+cmd);
		XinDaiLiuCheng xinDaiLiuCheng = getDomain(cmd);
		if (BeanUtils.isEmpty(xinDaiLiuCheng)) {
			return;
		}
		xinDaiLiuCheng.save();// 单表调用save方法
	}
	private XinDaiLiuCheng getDomain(ActionCmd cmd) {
		String busData = cmd.getBusData();
		System.out.println("busdata===="+busData);
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		JSONObject obj = JSONObject.fromObject(busData);
		String jdid = obj.getString("id"); 
		XinDaiLiuChengPo po = getFromJson(busData);
		po.setZjlx("身份证");
		DaiKuanShenQingInfoPo daikuan=null;
		daikuan = daiKuanShenQingInfoRepository.getByJdId(jdid);
        Double dkje = daikuan.getSqje();
        Long sqje = Math.round(dkje);
        po.setDkje(sqje);
		po.setId(cmd.getBusinessKey());
		XinDaiLiuCheng xinDaiLiuCheng = xinDaiLiuChengRepository.newInstance(po); 

		return xinDaiLiuCheng;
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private XinDaiLiuChengPo getFromJson(String json) {
		JSONObject jsonObj = JSONObject.fromObject(json);
		XinDaiLiuChengPo xinDaiLiuChengPo = getXinDaiLiuChengPo(jsonObj);
		return xinDaiLiuChengPo;
	}

	/**
	 * 获取t_codegen_demo数据
	 *
	 * @param jsonObj
	 */
	private XinDaiLiuChengPo getXinDaiLiuChengPo(JSONObject jsonObj) {
		XinDaiLiuChengPo xinDaiLiuChengPo = (XinDaiLiuChengPo) JsonUtil.getDTO(jsonObj.toString(), XinDaiLiuChengPo.class);
		return xinDaiLiuChengPo;
	}

	@Override
	public void nodeExecutors(String ids) {
		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, ids);
	}

}
