
package com.lc.ibps.grads.course.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.JobStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

/**
 *t_job_std 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class JobStdQueryDaoImpl extends MyBatisQueryDaoImpl<String, JobStdPo> implements JobStdQueryDao{

    @Override
    public String getNamespace() {
        return JobStdPo.class.getName();
    }

	@Override
	public List<JobStdPo> getUnReview(String crsTchId, String jobId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("crsTchId", crsTchId);
		params.put("jobId", jobId);
		return this.findByKey("getUnReview", params);
	}

	@Override
	public List<JobStdPo> getUnSubmit(String crsTchId, String jobId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("crsTchId", crsTchId);
		params.put("jobId", jobId);
		return this.findByKey("getUnSubmit", params);
	}

	@Override
	public List<JobStdPo> getJobList(String[] arg, String jobId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("stdNum", arg);
		params.put("jobId", jobId);
		return this.findByKey("joblist", params);
	}

	@Override
	public List<JobStdPo> getJobManaList(String jobId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jobId", jobId);
		return this.findByKey("jobmanalist", params);
	}

	@Override
	public List<JobStdPo> queryJobManaList(QueryFilter arg) {
		return (List<JobStdPo>) this.queryByQueryFilter("queryJobManaList", arg);
	}
}
