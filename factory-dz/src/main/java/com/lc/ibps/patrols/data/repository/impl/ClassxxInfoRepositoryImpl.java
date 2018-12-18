package com.lc.ibps.patrols.data.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;
import com.lc.ibps.patrols.data.domain.ClassxxInfo;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.persistence.dao.ClassxxInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;

/**
 * 班级信息 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
@Repository
public class ClassxxInfoRepositoryImpl extends AbstractRepository<String, ClassxxInfoPo,ClassxxInfo> implements ClassxxInfoRepository{
	  
	@Resource
	private  ClassxxInfoQueryDao classxxInfoQueryDao;

	public ClassxxInfo newInstance() {
		ClassxxInfoPo po = new ClassxxInfoPo();
		ClassxxInfo classxxInfo = AppUtil.getBean(ClassxxInfo.class);
		classxxInfo.setData(po);
		return classxxInfo;
	}

	public ClassxxInfo newInstance(ClassxxInfoPo po) {
		ClassxxInfo classxxInfo = AppUtil.getBean(ClassxxInfo.class);
		classxxInfo.setData(po);
		return classxxInfo;
	} 
	
	@Override
	protected IQueryDao<String, ClassxxInfoPo> getQueryDao() {
		return classxxInfoQueryDao;
	}
	
	@Override
	public ClassxxInfoPo exGetBy(List exFileds , List exTableList , Map whereMap, Map orderBy) {
		return classxxInfoQueryDao.getByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy) );
	}

	@Override
	public List<ClassxxInfoPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		return classxxInfoQueryDao.findByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy));
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
