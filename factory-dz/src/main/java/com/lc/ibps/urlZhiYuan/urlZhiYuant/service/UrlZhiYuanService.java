package com.lc.ibps.urlZhiYuan.urlZhiYuant.service;


import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;

public interface UrlZhiYuanService extends IScript {
	public void save(ActionCmd cmd);
	public void saveLitishu(ActionCmd cmd);
	public void nodeExecutors(String ids);
	public void saveView(ActionCmd cmd);
	public void saveTchOpinion(ActionCmd cmd);
	public void stuReupload(ActionCmd cmd);
}
