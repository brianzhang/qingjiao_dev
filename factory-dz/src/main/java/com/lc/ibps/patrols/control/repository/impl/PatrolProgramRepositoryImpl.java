package com.lc.ibps.patrols.control.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.control.domain.PatrolProgram;
import com.lc.ibps.patrols.control.persistence.dao.PatrolProgramQueryDao;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;
import com.lc.ibps.patrols.control.repository.PatrolProgramRepository;

/**
 * 巡课方案 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 *</pre>
 */
@Repository
public class PatrolProgramRepositoryImpl extends AbstractRepository<String, PatrolProgramPo,PatrolProgram> implements PatrolProgramRepository{
	  
	@Resource
	private  PatrolProgramQueryDao patrolProgramQueryDao;

	public PatrolProgram newInstance() {
		PatrolProgramPo po = new PatrolProgramPo();
		PatrolProgram patrolProgram = AppUtil.getBean(PatrolProgram.class);
		patrolProgram.setData(po);
		return patrolProgram;
	}

	public PatrolProgram newInstance(PatrolProgramPo po) {
		PatrolProgram patrolProgram = AppUtil.getBean(PatrolProgram.class);
		patrolProgram.setData(po);
		return patrolProgram;
	} 
	
	@Override
	protected IQueryDao<String, PatrolProgramPo> getQueryDao() {
		return patrolProgramQueryDao;
	}
	
	@Override
	public PatrolProgramPo exGetBy(List exFileds , List exTableList , Map whereMap, Map orderBy) {
		return patrolProgramQueryDao.getByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy) );
	}

	@Override
	public List<PatrolProgramPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		return patrolProgramQueryDao.findByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy));
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
