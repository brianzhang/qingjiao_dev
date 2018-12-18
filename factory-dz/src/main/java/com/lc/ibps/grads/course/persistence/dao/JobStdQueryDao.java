package com.lc.ibps.grads.course.persistence.dao;

import java.util.List;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

/**
 * t_job_std 查询Dao接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 *</pre>
 */
public interface JobStdQueryDao extends IQueryDao<String, JobStdPo> {
	
	List<JobStdPo> getUnReview(String crsTchId, String jobId);
	List<JobStdPo> getUnSubmit(String crsTchId, String jobId);
	List<JobStdPo> getJobList(String[] arg, String jobId);
	List<JobStdPo> getJobManaList(String jobId);
	List<JobStdPo> queryJobManaList(QueryFilter arg);
}
