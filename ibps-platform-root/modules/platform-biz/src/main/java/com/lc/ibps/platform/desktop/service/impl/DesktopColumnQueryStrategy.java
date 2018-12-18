package com.lc.ibps.platform.desktop.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.form.service.CustomQueryService;
import com.lc.ibps.common.desktop.persistence.entity.DesktopColumnPo;
import com.lc.ibps.common.desktop.strategy.DesktopColumnStrategy;

@Service("desktopColumnQueryStrategy")
public class DesktopColumnQueryStrategy implements DesktopColumnStrategy {
	@Resource
	CustomQueryService customQueryService;
	@Override
	public Object getData(DesktopColumnPo desktopColumn, Map<String, Object> params) throws Exception {
		String alias = desktopColumn.getDataFrom();
		return customQueryService.getAllDataByAlias(alias);
	}

}
