package com.lc.ibps.patrols.data.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import ex.scala.utils4j.ExMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.data.domain.PatrolDetail;
import com.lc.ibps.patrols.data.persistence.dao.PatrolDetailQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo;
import com.lc.ibps.patrols.data.repository.PatrolDetailRepository;

/**
 * t_patrol_detail 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:24
 *</pre>
 */
@Repository
public class PatrolDetailRepositoryImpl extends AbstractRepository<String, PatrolDetailPo,PatrolDetail> implements PatrolDetailRepository{
	  
	@Resource
	private  PatrolDetailQueryDao patrolDetailQueryDao;


	public PatrolDetail newInstance() {
		PatrolDetailPo po = new PatrolDetailPo();
		PatrolDetail patrolDetail = AppUtil.getBean(PatrolDetail.class);
		patrolDetail.setData(po);
		return patrolDetail;
	}

	public PatrolDetail newInstance(PatrolDetailPo po) {
		PatrolDetail patrolDetail = AppUtil.getBean(PatrolDetail.class);
		patrolDetail.setData(po);
		return patrolDetail;
	} 
	
	@Override
	protected IQueryDao<String, PatrolDetailPo> getQueryDao() {
		return patrolDetailQueryDao;
	}
	@Override
	public PatrolDetailPo exGetBy(List exFileds , List exTableList , Map whereMap, Map orderBy) {
		return patrolDetailQueryDao.getByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy) );
	}

	@Override
	public List<PatrolDetailPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		return patrolDetailQueryDao.findByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy));
	}

	@Override
	public Map makeParam(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		if( whereMap == null || whereMap.isEmpty()  ) {
			throw new IllegalArgumentException("where 条件必须非空");
		}
		Map res = new HashMap<String,Object>();
		if( exFileds != null && !exFileds.isEmpty()){
			res.put("exFields", exFileds);
		}
		if( exTableList != null && !exTableList.isEmpty() ){
			res.put("exTableList", exTableList);
		}
		res.put("relationMap", whereMap);
		if (orderBy != null && !orderBy.isEmpty()) {
			res.put("orderByMap", orderBy);
		}
		return res;
	}

	
}
