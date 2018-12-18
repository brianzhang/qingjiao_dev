package com.lc.ibps.urlZhiYuan.urlZhiYuant.service.impl;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;
import com.lc.ibps.bishes.oldFile.repository.OldFileRepository;
import com.lc.ibps.bpmn.cmd.IbpsTaskFinishCmd;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.bpmn.api.constant.BpmConstants;
import com.lc.ibps.bpmn.cmd.IbpsProcInstCmd;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.service.UrlZhiYuanService;

import net.sf.json.JSONObject;

@Transactional
@Service("urlZhiYuanService")
public class  UrlZhiYuanServiceImpl extends GenericUploadController implements UrlZhiYuanService  {
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	private OldFileRepository oldFileRepository;

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
		String finalteacher = po.getFinalteacher();
		String finalteacherId = po.getFinalteacherId();
		String finaltd= po.getFinaltd();
		String finaltdId = po.getFinaltdId();
		String id = po.getId();
		String td1 = po.getTd1();
		String td1id = po.getTd1id();
		String td2 = po.getTd2();
		String td2id = po.getTd2id();
		UrlZhiYuanPo urlZhiYuanPo =urlZhiYuanRepository.get(id);
		String classr = urlZhiYuanPo.getClassr();
		urlZhiYuanPo.setClassr(classr);
		urlZhiYuanPo.setId(cmd.getBusinessKey());
		urlZhiYuanPo.setFinaltd(finaltd);
		urlZhiYuanPo.setFinaltdId(finaltdId);
		urlZhiYuanPo.setFinalteacher(finalteacher);
		urlZhiYuanPo.setFinalteacherId(finalteacherId);
		urlZhiYuanPo.setTd1(td1);
		urlZhiYuanPo.setTd1id(td1id);
		urlZhiYuanPo.setTd2(td2);
		urlZhiYuanPo.setTd2id(td2id);
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo); 
		
    		
    		
		return urlZhiYuan;
	}

	/**
	 * 获取表单数据
	 *
	 * @param
	 */
	private UrlZhiYuanPo getFromJson(String json) {
		JSONObject jsonObj = JSONObject.fromObject(json);
		UrlZhiYuanPo urlZhiYuanPo = getUrlZhiYuanPo(jsonObj);
		return urlZhiYuanPo;
	}

	/**
	 * 获取t_codegen_demo数据
	 *
	 * @param jsonObj
	 */
	private UrlZhiYuanPo getUrlZhiYuanPo(JSONObject jsonObj) {
		UrlZhiYuanPo urlZhiYuanPo = (UrlZhiYuanPo) JsonUtil.getDTO(jsonObj.toString(), UrlZhiYuanPo.class);
		return urlZhiYuanPo;
	}
	@Override
	public void nodeExecutors(String ids) {
		IbpsProcInstCmd cmd = new IbpsProcInstCmd();
		cmd.addTransitVars(BpmConstants.BPM_NODE_USERS, ids);
		
	}
	@Override
	public void saveLitishu(ActionCmd cmd) {		
		UrlZhiYuan urlZhiYuan = getDomains(cmd);
		if (BeanUtils.isEmpty(urlZhiYuan)) {
			return;
		}
		urlZhiYuan.save();// 单表调用save方法
		
	}
	private UrlZhiYuan getDomains(ActionCmd cmd) {
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		UrlZhiYuanPo po = getFromJson(busData);
		String id = po.getId();
		String yx =po.getYx();
		String ktdbjhmd = po.getKtdbjhmd();
		String zc = po.getZc();
		Date sbsj = po.getSbsj();
		 String  tmmc = po.getTmmc();
		 String tmly = po.getTmly();
		 String tmlx = po.getTmlx();
		 String ktnjjdwt= po.getKtnjjdwt();
		 String rjhj =po.getRjhj();
		 String yjhj = po.getYjhj();
		 String ktyqmbhcg = po.getKtyqmbhcg();
		 String ktcgjzywcdgzrw = po.getKtcgjzywcdgzrw();
		 String bktdcgxs = po.getBktdcgxs();
		 String nf=po.getNf();
		 String tmdyzy = po.getTmdyzy();
		 String sjjs =po.getSjjs();
		 String ydwx = po.getYdwx();
		 String jbyq = po.getJbyq();
		 String tzzs = po.getTzzs();
		 String dlbks = po.getDlbks();
		 String dsbjzs= po.getDsbjzs();
		 String zyckzl = po.getZyckzl();
		UrlZhiYuanPo urlZhiYuanPo =urlZhiYuanRepository.get(id);
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo); 
		urlZhiYuanPo.setYx(yx);
		urlZhiYuanPo.setKtdbjhmd(ktdbjhmd);
		urlZhiYuanPo.setZc(zc);
		urlZhiYuanPo.setSbsj(sbsj);
		urlZhiYuanPo.setTmmc(tmmc);
		urlZhiYuanPo.setTmly(tmly);
		urlZhiYuanPo.setTmlx(tmlx);
		urlZhiYuanPo.setKtnjjdwt(ktnjjdwt);
		urlZhiYuanPo.setRjhj(rjhj);
		urlZhiYuanPo.setYjhj(yjhj);
		urlZhiYuanPo.setKtyqmbhcg(ktyqmbhcg);
		urlZhiYuanPo.setKtcgjzywcdgzrw(ktcgjzywcdgzrw);
		urlZhiYuanPo.setBktdcgxs(bktdcgxs);
		urlZhiYuanPo.setNf(nf);
		urlZhiYuanPo.setTmdyzy(tmdyzy);
		urlZhiYuanPo.setSjjs(sjjs);
		urlZhiYuanPo.setYdwx(ydwx);
		urlZhiYuanPo.setJbyq(jbyq);
		urlZhiYuanPo.setTzzs(tzzs);
		urlZhiYuanPo.setDlbks(dlbks);
		urlZhiYuanPo.setDsbjzs(dsbjzs);
		urlZhiYuanPo.setZyckzl(zyckzl);

		return urlZhiYuan;
	}
	@Override
	public void saveView(ActionCmd cmd) {
		UrlZhiYuan urlZhiYuan = getDomainView(cmd);
		if (BeanUtils.isEmpty(urlZhiYuan)) {
			return;
		}
	
		urlZhiYuan.save();// 单表调用save方法
		
	}

	//论文审核  保存教师意见和审阅时间
    @Override
    public void saveTchOpinion(ActionCmd cmd) {
		IbpsTaskFinishCmd ibpsTaskFinishCmd = (IbpsTaskFinishCmd)cmd;
		String opinion = ibpsTaskFinishCmd.getApprovalOpinion();
		String curUser = ibpsTaskFinishCmd.getCurUser();
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return ;
		}

		JSONObject jsonObj = JSONObject.fromObject(busData);
		String id = (String) jsonObj.get("id");
		UrlZhiYuanPo po = urlZhiYuanRepository.get(id);
		String xh = po.getXh();
		//获得当前时间 并保存为评审时间
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		if (curUser.equals(po.getFinalteacherId())){
			String finalTchComment = (String) jsonObj.get("finalTchComment");
			po.setFinalTchOpinion(opinion);
			po.setFinalTchComment(finalTchComment);
			po.setFinalTchDate(date);
		}
		if (curUser.equals(po.getJudgeTch())){
			String judgeTchComment = (String) jsonObj.get("judgeTchComment");
			po.setJudgeTchOpinion(opinion);
			po.setJudgeTchComment(judgeTchComment);
			po.setJudgeTchDate(date);
		}
		//获取教师上传的文档 若有则保存为学生论文
		String fileInfoStr = jsonObj.getString("file");
		if (StringUtils.isNotBlank(fileInfoStr)){
			fileInfoStr = fileInfoStr.substring(1,fileInfoStr.length() - 1);
			JSONObject fileInfoJo = JSONObject.fromObject(fileInfoStr);
			String fileId = fileInfoJo.getString("id");
			OldFilePo oldFilePo = new OldFilePo();
			if (curUser.equals(po.getFinalteacherId())){
				//保存历史文件
				oldFilePo.setXh(xh);
				oldFilePo.setFilecategory("正常论文");
				oldFilePo.setFileid(po.getNormalPaperId());
				String whereSql="FILECATEGORY='正常论文' "+"AND "+"XH= '"+xh + "'";
				List<OldFilePo> oldFilePos = oldFileRepository.getBySql(whereSql);
				oldFilePo.setFileVersion(Integer.toString(oldFilePos.size()+1));
				oldFilePo.setComment(po.getFinalTchComment());
				oldFileRepository.newInstance(oldFilePo).save();
				//更新当前论文信息
				po.setNormalPaperId(fileId);
			}
			if (curUser.equals(po.getJudgeTch())){
				//保存历史文件
				oldFilePo.setXh(xh);
				oldFilePo.setFilecategory("匿名论文");
				oldFilePo.setFileid(po.getAnonymousPaperId());
				String whereSql="FILECATEGORY='匿名论文' "+"AND "+"XH= '"+xh + "'";
				List<OldFilePo> oldFilePos = oldFileRepository.getBySql(whereSql);
				oldFilePo.setFileVersion(Integer.toString(oldFilePos.size()+1));
				oldFilePo.setComment(po.getJudgeTchComment());
				oldFileRepository.newInstance(oldFilePo).save();
				//更新当前论文信息
				po.setAnonymousPaperId(fileId);
			}
		}

		urlZhiYuanRepository.newInstance(po).save();
    }

	//重传论文会产生历史文件的概念 用oldFilePo来维护
	@Override
	@Transactional
	public void stuReupload(ActionCmd cmd) {
		String reuploadInfoStr = cmd.getBusData();
		JSONObject reuploadInfoJo = JSONObject.fromObject(reuploadInfoStr);
		String id = reuploadInfoJo.getString("id");
		UrlZhiYuanPo paperInfo = urlZhiYuanRepository.get(id);
		String xh = paperInfo.getXh();
		//得到反对教师的标志位
		String normalFlge = reuploadInfoJo.getString("normalFlge");
		String anonymousFlge = reuploadInfoJo.getString("anonymousFlge");

		//重传了正常论文
		if (("1").equals(normalFlge)){
			String fileInfoStr = reuploadInfoJo.getString("normalFile");
			fileInfoStr = fileInfoStr.substring(1,fileInfoStr.length() - 1);
			JSONObject fileInfoJo = JSONObject.fromObject(fileInfoStr);
			String fileId = fileInfoJo.getString("id");
			OldFilePo oldFilePo = new OldFilePo();
			//保存历史文件
			oldFilePo.setXh(xh);
			oldFilePo.setFilecategory("正常论文");
			oldFilePo.setFileid(paperInfo.getNormalPaperId());
			String whereSql="FILECATEGORY='正常论文' "+"AND "+"XH= '"+xh + "'";
			List<OldFilePo> oldFilePos = oldFileRepository.getBySql(whereSql);
			oldFilePo.setFileVersion(Integer.toString(oldFilePos.size()+1));
			oldFilePo.setComment(paperInfo.getFinalTchComment());
			oldFileRepository.newInstance(oldFilePo).save();
			//更新当前论文信息
			paperInfo.setNormalPaperId(fileId);
		}
		//重传了匿名论文
		if (("1").equals(anonymousFlge)){
			String fileInfoStr = reuploadInfoJo.getString("anonymousFile");
			fileInfoStr = fileInfoStr.substring(1,fileInfoStr.length() - 1);
			JSONObject fileInfoJo = JSONObject.fromObject(fileInfoStr);
			String fileId = fileInfoJo.getString("id");
			OldFilePo oldFilePo = new OldFilePo();
			//保存历史文件
			oldFilePo.setXh(xh);
			oldFilePo.setFilecategory("匿名论文");
			oldFilePo.setFileid(paperInfo.getAnonymousPaperId());
			String whereSql="FILECATEGORY='匿名论文' "+"AND "+"XH= '"+xh + "'";
			List<OldFilePo> oldFilePos = oldFileRepository.getBySql(whereSql);
			oldFilePo.setFileVersion(Integer.toString(oldFilePos.size()+1));
			oldFilePo.setComment(paperInfo.getJudgeTchComment());
			oldFileRepository.newInstance(oldFilePo).save();
			//更新当前论文信息
			paperInfo.setAnonymousPaperId(fileId);
		}
		urlZhiYuanRepository.newInstance(paperInfo).save();
	}

	private UrlZhiYuan getDomainView(ActionCmd cmd) {
		String busData = cmd.getBusData();
		if (BeanUtils.isEmpty(busData)) {
			return null;
		}
		UrlZhiYuanPo po = getFromJson(busData);
		String id = po.getId();
		UrlZhiYuanPo urlZhiYuanPo =urlZhiYuanRepository.get(id);
		String td3 = po.getTd3();
		urlZhiYuanPo.setTd3(td3);
		UrlZhiYuan urlZhiYuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo); 
		return urlZhiYuan;
	}
}
