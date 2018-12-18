package com.lc.ibps.grads.course.thread;

import java.util.ArrayList;
import java.util.List;

import com.lc.ibps.grads.course.persistence.dao.JobStdDao;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

public class DeleteJobStd implements Runnable {
	private JobStdDao jobStdDao;
	private List<JobStdPo> jsps;
	public DeleteJobStd( List<JobStdPo> jsps,JobStdDao jobStdDao){
		this.jsps = jsps;
		this.jobStdDao = jobStdDao;
	}
	@Override
	public void run() {
		List<String> ids = new ArrayList<>();
		for (JobStdPo jsp : jsps) {
			ids.add(jsp.getId());
		}
		jobStdDao.deleteByIds((String[]) ids.toArray());
	}

}
