package com.lc.ibps.xinDaiLIiuCheng.liucheng.service;

import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;

public interface XinDaiLiuChengService  extends IScript {
	void save(ActionCmd cmd);
	public void nodeExecutors(String ids);
}
