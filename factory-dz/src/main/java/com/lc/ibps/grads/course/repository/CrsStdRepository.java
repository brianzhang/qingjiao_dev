package com.lc.ibps.grads.course.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.CrsStd;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
/**
 * t_crs_std 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
public interface CrsStdRepository extends IRepository<String, CrsStdPo,CrsStd>{
	CrsStdPo getByCol(Map args);
	List<CrsStdPo> findByCol(Map args);
	Map makeParam(Map<String,String> args);
	List<CrsStdPo> findByColPG(Map args);
	List<CrsStdPo> findBysjStd();

}
