package com.lc.ibps.urlZhiYuan.urlZhiYuant.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bishes.kaitiGroup.repository.KaitiGroupRepository;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyPositionRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.service.KaiTiService;

import net.sf.json.JSONObject;

@Transactional
@Service("kaiTiService")
public class KaiTiServiceImpl implements KaiTiService {
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	AttachmentRepository attachmentRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	KaitiGroupRepository kaitiGroupRepository;
	@Resource
	PartyPositionRepository partyPositionRepository;

	@Override
	public void save(ActionCmd cmd) {
		UrlZhiYuan urlZhiYuan = getDomain(cmd);
		if (BeanUtils.isEmpty(urlZhiYuan)) {
			return;
		}
	
		urlZhiYuan.save();// 单表调用save方法

	}

	private UrlZhiYuan getDomain(ActionCmd cmd) {
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		UrlZhiYuanPo po = getFromJson(busData);
		String id =po.getId();
		String kt_bjsm = po.getKt_bjsm();
		String kt_zynr = po.getKt_zynr();
		String kt_fajdjap = po.getKt_fajdjap();
		String kt_gzfa = po.getKt_gzfa();
		String zyckzl = po.getKaiti_zyzl();
		String data = po.getKt_bgrq();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
		urlZhiYuanPo.setKt_bjsm(kt_bjsm);
		urlZhiYuanPo.setKt_fajdjap(kt_fajdjap);
		urlZhiYuanPo.setKt_gzfa(kt_gzfa);
		urlZhiYuanPo.setKt_zynr(kt_zynr);
		urlZhiYuanPo.setKt_bgrq(data);
		urlZhiYuanPo.setKaiti_zyzl(zyckzl);
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo); 
			
		return urlZhiYuan;
	}

	private UrlZhiYuanPo getFromJson(String json) {
		JSONObject jsonObj = JSONObject.fromObject(json);
		UrlZhiYuanPo urlZhiYuanPo = getUrlZhiYuanPo(jsonObj);
		return urlZhiYuanPo;
	}
	
	private UrlZhiYuanPo getUrlZhiYuanPo(JSONObject jsonObj) {
		UrlZhiYuanPo urlZhiYuanPo = (UrlZhiYuanPo) JsonUtil.getDTO(jsonObj.toString(), UrlZhiYuanPo.class);
		return urlZhiYuanPo;
	}

	@Override
	public void saveView(ActionCmd cmd) {
		JobStd jobStd = getDomain2(cmd);
		if (BeanUtils.isEmpty(jobStd)) {
			return;
		}
	
		jobStd.save();// 单表调用save方法		
	}
	private JobStd getDomain2(ActionCmd cmd) {
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		UrlZhiYuanPo po = getFromJson(busData);
		String id =po.getId();
		String view = po.getTd3id();
		UrlZhiYuanPo urlZhiYuan=urlZhiYuanRepository.get(id);
		String xh = urlZhiYuan.getXh();
		String finalteacherid = urlZhiYuan.getFinalteacherId();
		String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
		//获取开题第一次周记fileId
		Map<Object, Object> map=new HashMap<Object,Object>();
		map.put("T_CRS_TCH.TCH_NUM=", tch_num);
		map.put("T_CRS_TCH.CRS_NUM=", "2014bysj");
//	    Map<Object, Object> map = HashMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj");
		CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
		String crstchIdString= crsTchPo.getId();
		map=new HashMap<Object,Object>();
		map.put("T_CRS_JOB.CRS_TCH_ID=", crstchIdString);
		map.put("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）");
		CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
	    String jobId = crsJobPo.getId();
	    map=new HashMap<Object,Object>();
		map.put("T_JOB_STD.STD_NUM=", xh);
		map.put("T_JOB_STD.JOBID=", jobId);
		JobStdPo jobStdPo = jobStdRepository.getByCol(map);
		jobStdPo.setComment(view);
		JobStd jobStd = jobStdRepository.newInstance(jobStdPo); 
			
		return jobStd;
	}

}
