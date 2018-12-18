package com.lc.ibps.grads.course.thread;

import com.lc.ibps.grads.course.persistence.dao.JobStdDao;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

public class CreateJobStd implements Runnable {
	private CrsStdPo csp;
	private String jobId;
	private JobStdDao jobStdDao;
	public CreateJobStd( CrsStdPo csp,String jobId,JobStdDao jobStdDao){
		this.csp = csp;
		this.jobId = jobId;
		this.jobStdDao = jobStdDao;
	}
	@Override
	public void run() {
			JobStdPo jsp = new JobStdPo();
			jsp.setJobid(jobId);
			jsp.setStdNum(csp.getStdNum());
			jsp.setStatus(JobStdPo.NOTVIEWED);
			jsp.setScore(0);
			jsp.setReviewStatus("0");
			jsp.setFile_id_("");
			jobStdDao.create(jsp);
	}
}
