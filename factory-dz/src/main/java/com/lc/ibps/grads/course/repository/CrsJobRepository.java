package com.lc.ibps.grads.course.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.CrsJob;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

import net.sf.json.JSONArray;

/**
 * t_crs_job 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 *</pre>
 */
public interface CrsJobRepository extends IRepository<String, CrsJobPo,CrsJob>{
	CrsJobPo getByCol(Map args);
	List<CrsJobPo> findByCol(Map args);
	Map makeParam(Map<String,String> args);
	PageList<CrsJobPo> resFromPageList(PageList<CrsJobPo> crsJobList);
	JSONArray checkRepeat(List<JobStdPo> jsps);
	long[] getDistanceTimes(String oldStart, String startTime);
	List getAfterJobs(String o,String string);
	CrsJobPo makeTime(CrsJobPo crsJob);
	CrsJobPo makeStatus(CrsJobPo cjp);
	List<CrsJobPo> selectSubmitUnSubmitNum(String crs_tch_id);
	List<CrsJobPo> selectVirSub(CrsTchPo crsTchPo);
	List<CrsJobPo> selectVirUnSub(CrsTchPo crsTchPo);
	List<CrsJobPo> selectCheck(CrsTchPo crsTchPo);
	List<CrsJobPo> selectAllCheck(String crs_tch_id);
	
	
	
}
