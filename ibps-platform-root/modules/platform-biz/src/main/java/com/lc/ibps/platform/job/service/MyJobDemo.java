package com.lc.ibps.platform.job.service;

import org.quartz.JobExecutionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.components.quartz.BaseJob;

@Service
@Scope("prototype")
public class MyJobDemo extends BaseJob {

	@Override
	public void executeJob(JobExecutionContext context) throws Exception {
		System.out.println("执行测试");
	}

}
