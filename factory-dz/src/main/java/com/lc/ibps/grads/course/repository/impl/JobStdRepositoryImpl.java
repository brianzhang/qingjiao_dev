package com.lc.ibps.grads.course.repository.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.common.file.persistence.dao.AttachmentQueryDao;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.dao.JobStdDao;
import com.lc.ibps.grads.course.persistence.dao.JobStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.grads.course.thread.CheckRepeat;
import com.utils.CheckMSWordUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * t_job_std 仓库的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 *</pre>
 */
@Repository
public class JobStdRepositoryImpl extends AbstractRepository<String, JobStdPo,JobStd> implements JobStdRepository{
	  
	@Resource
	private  JobStdQueryDao jobStdQueryDao;
	@Resource
	private  JobStdDao jobStdDao;
	@Resource
	AttachmentQueryDao attachmentQueryDao;
	@Override
	public JobStd newInstance() {
		JobStdPo po = new JobStdPo();
		JobStd jobStd = AppUtil.getBean(JobStd.class);
		jobStd.setData(po);
		return jobStd;
	}

	@Override
	public JobStd newInstance(JobStdPo po) {
		JobStd jobStd = AppUtil.getBean(JobStd.class);
		jobStd.setData(po);
		return jobStd;
	} 
	
	@Override
	protected IQueryDao<String, JobStdPo> getQueryDao() {
		return jobStdQueryDao;
	}

	@Override
	public JobStdPo getByCol(Map args) {
		return jobStdQueryDao.getByKey("getByCol", makeParam(args));
	}

	@Override
	public List<JobStdPo> findByCol(Map args) {
		return jobStdQueryDao.findByKey("getByCol", makeParam(args));
	}
	
	@Override
	public List<JobStdPo> getjobList(String[] arg, String jobId) {
		return jobStdQueryDao.getJobList(arg, jobId);
	}

	@Override
	public Map makeParam(Map args) {
		Map res = new HashMap<String,Map>();
		if(args.containsKey("__mode")){
			res.put("__mode", args.get("__mode"));
			args.remove("__mode");
		}
		res.put("relationMap", args);
		return res;
	}

	@Override
	public JSONArray checkRepeat(String fileId, String jobId,String stdNum) {
		JSONArray res = new JSONArray();
		Map<String,String> arg = new HashMap();
		arg.put("jobId", jobId);
		arg.put("status", ""+JobStdPo.SUBMITTED);
		arg.put("stdNum", stdNum);
		List<JobStdPo> jsps = jobStdQueryDao.findByKey("getBy_jobId_status_notMe", arg);
		if(jsps==null || jsps.size()==0)return res;
		String myPath = getPathByFileId(fileId);
 		ExecutorService pool = Executors.newFixedThreadPool(10); 
		List<Future<JSONObject>> fus = new ArrayList();
		for(JobStdPo jsp : jsps){
			Future<JSONObject> f = pool.submit(new CheckRepeat(jsp,myPath));
			fus.add(f);
		}
		
		while(!pool.isTerminated()){try {
			Thread.sleep(500);
			pool.shutdown();
		} catch (InterruptedException e) {
		}  }
		for(Future<JSONObject> future:fus){
			JSONObject jo;
			try {
				jo = future.get();
				if(jo!=null)
					res.add(jo);
			} catch (InterruptedException e) {
			} catch (ExecutionException e) {
			} catch (NullPointerException e) {
			} 
		}
		return res;
	}

	private String getPathByFileId(String fileId) {
		String path ="";
		AttachmentPo attachmentPo = attachmentQueryDao.get(fileId);
		if(attachmentPo.getExt().contains("doc"))
			path = AppFileUtil.getBasePath() + "\\"+attachmentPo.getFilePath();
		return path;
	}

	@Override
	public int countWords(String fileId) {
		String filePath = getPathByFileId(fileId);
		CheckMSWordUtil cu = new CheckMSWordUtil();
		return cu.count(filePath);
	}

	@Override
	public String getFileText(String fileId) {
		String filePath = getPathByFileId(fileId);
		if(StringUtils.isEmpty(filePath))
			return "非word文档暂时无法预览";
		CheckMSWordUtil cu = new CheckMSWordUtil();
		return cu.read(filePath);
	}

	

	@Override
	public List<JobStdPo> findAStdJobs(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return jobStdQueryDao.findByKey("findAStdJobs", map);
	}

	@Override
	public List<JobStdPo> findmanaStdJob(Map args) {
		return jobStdQueryDao.findByKey("findmanaStdJob", makeParam(args));

	}

	@Override
	public List<JobStdPo> getUnReview(String crsTchId, String jobId) {
		return jobStdQueryDao.getUnReview(crsTchId, jobId);
	}

	@Override
	public List<JobStdPo> getUnSubmit(String crsTchId, String jobId) {
		return jobStdQueryDao.getUnSubmit(crsTchId, jobId);
	}

	@Override
	public List<JobStdPo> getjobManaList(String jobId) {
		return jobStdQueryDao.getJobManaList( jobId);
	}

	@Override
	public List<JobStdPo> queryJobManaList(QueryFilter arg) {
		return jobStdQueryDao.queryJobManaList(arg);
	}
	@Override
	public List<JobStdPo>  getJson_(String JobId) {
		// TODO Auto-generated method stub
		return jobStdQueryDao.findByKey("getJson_", JobId);
	}
	@Override
	public List<JobStdPo>  get1(String JobId) {
		// TODO Auto-generated method stub
		return jobStdQueryDao.findByKey("get1", JobId);
	}



}
