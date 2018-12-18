package com.lc.ibps.bishe.urlZhiYuant.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;

import com.lc.ibps.bishes.kaitiGroup.repository.KaitiGroupRepository;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyPositionRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import ex.scala.utils4j.ExMap;

public class FirstWord {
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
	JobStdRepository jobStdRepository;
	@Resource
	KaitiGroupRepository kaitiGroupRepository;
	@Resource
	PartyPositionRepository partyPositionRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	
	public  JobStdPo  getFirstWord(String id) {
		if(StringUtils.isNotEmpty(id)){
			UrlZhiYuanPo urlZhiYuan=urlZhiYuanRepository.get(id);
			String xh = urlZhiYuan.getXh();
			String finalteacherid = urlZhiYuan.getFinalteacherId();
			String  tch_num = partyEntityRepository.get(finalteacherid).getAlias();
			//获取开题第一次周记fileId
	        Map<Object, Object> map = ExMap.newInstance().add("T_CRS_TCH.TCH_NUM=", tch_num).add("T_CRS_TCH.CRS_NUM=", "2014bysj").asJava();
		    CrsTchPo crsTchPo= crsTchRepository.getByCol(map);
		    String crstchIdString= crsTchPo.getId();
		    map = ExMap.newInstance().add("T_CRS_JOB.CRS_TCH_ID=", crstchIdString).add("T_CRS_JOB.TITLE=", "第1~2周（开题准备情况记录）").asJava();
		    CrsJobPo crsJobPo = crsJobRepository.getByCol(map);
		    String jobId = crsJobPo.getId();
		    map = ExMap.newInstance().add("T_JOB_STD.STD_NUM=", xh).add("T_JOB_STD.JOBID=", jobId).asJava();
		    JobStdPo jobStdPo = jobStdRepository.getByCol(map);
		    return jobStdPo;
		}else {
			JobStdPo jobStdPo2=null;
			return jobStdPo2;
		}
	}
	
	

}
