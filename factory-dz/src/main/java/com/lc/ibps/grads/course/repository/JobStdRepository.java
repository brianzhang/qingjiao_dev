package com.lc.ibps.grads.course.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

import net.sf.json.JSONArray;

/**
 * t_job_std 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 *</pre>
 */
public interface JobStdRepository extends IRepository<String, JobStdPo,JobStd>{
	JobStdPo getByCol(Map args);
	List<JobStdPo> findByCol(Map args);
	Map makeParam(Map args);
	JSONArray checkRepeat(String fileId, String jobId,String stdNum);
	int countWords(String fileId);
	String getFileText(String fileId);
	List<JobStdPo> findAStdJobs(Map< String, Object> map);
	List<JobStdPo> findmanaStdJob(Map args);
	List<JobStdPo> getUnReview(String crsTchId, String jobId);
	List<JobStdPo> getUnSubmit(String crsTchId, String jobId);
	List<JobStdPo> getjobList(String[] arg, String jobId);
	List<JobStdPo> getjobManaList( String jobId);
	List<JobStdPo> queryJobManaList(QueryFilter arg);
	//JobStdPo getJson_();//获取Json
	List<JobStdPo> getJson_(String JobId);
	List<JobStdPo> get1(String jobId);
}
