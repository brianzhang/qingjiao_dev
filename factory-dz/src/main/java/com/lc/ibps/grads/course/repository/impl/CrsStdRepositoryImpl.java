package com.lc.ibps.grads.course.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.grads.course.domain.CrsStd;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.persistence.dao.CrsStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;

/**
 * t_crs_std 仓库的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:58:28
 *</pre>
 */
@Repository
public class CrsStdRepositoryImpl extends AbstractRepository<String, CrsStdPo,CrsStd> implements CrsStdRepository{
	  
	@Resource
	private  CrsStdQueryDao crsStdQueryDao;

	@Override
	public CrsStd newInstance() {
		CrsStdPo po = new CrsStdPo();
		CrsStd crsStd = AppUtil.getBean(CrsStd.class);
		crsStd.setData(po);
		return crsStd;
	}

	@Override
	public CrsStd newInstance(CrsStdPo po) {
		CrsStd crsStd = AppUtil.getBean(CrsStd.class);
		crsStd.setData(po);
		return crsStd;
	} 
	
	@Override
	protected IQueryDao<String, CrsStdPo> getQueryDao() {
		return crsStdQueryDao;
	}
	@Override
	public CrsStdPo getByCol(Map args) {
		return crsStdQueryDao.getByKey("getByCol", makeParam(args));
	}

	@Override
	public List<CrsStdPo> findByCol(Map args) {
		return crsStdQueryDao.findByKey("getByCol", makeParam(args));
	}

	@Override
	public List<CrsStdPo> findByColPG(Map args) {
		return crsStdQueryDao.findByKey("getByColPG", makeParam(args));
	}

	@Override
	public Map makeParam(Map<String,String> args) {
		Map res = new HashMap<String,Map>();
		if(args.containsKey("__mode")){
			res.put("__mode", args.get("__mode"));
			args.remove("__mode");
		}
		res.put("relationMap", args);
		return res;
	}
	@Override
	public List<CrsStdPo> findBysjStd() {
		// TODO Auto-generated method stub
		return crsStdQueryDao.findByKey("getBysjStd");
	}

	
	}	
	

