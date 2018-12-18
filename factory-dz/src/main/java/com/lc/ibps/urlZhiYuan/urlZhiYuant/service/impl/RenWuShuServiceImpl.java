package com.lc.ibps.urlZhiYuan.urlZhiYuant.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.service.RenWuShuService;

import net.sf.json.JSONObject;

@Transactional
@Service("renWuShuService")
public class RenWuShuServiceImpl implements RenWuShuService {
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;

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
		String gzmd = po.getGzmd();
		String gznrjjtyq = po.getgznrjjtyq();
		String gzjdfp = po.getGzjdfp();
		String zddyfs = po.getZddyfs();
		String renwushu_zyzl = po.getRenwushu_zyzl();
		String td3=po.getTd3();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
		urlZhiYuanPo.setTd3(td3);
		urlZhiYuanPo.setGzmd(gzmd);
		urlZhiYuanPo.setgznrjjtyq(gznrjjtyq);
		urlZhiYuanPo.setGzjdfp(gzjdfp);
		urlZhiYuanPo.setZddyfs(zddyfs);
		urlZhiYuanPo.setRenwushu_zyzl(renwushu_zyzl);
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

}
