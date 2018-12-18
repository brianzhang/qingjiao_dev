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
import com.lc.ibps.patrols.data.domain.TchInfo;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.persistence.dao.TchInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;

/**
 * t_tch_inf 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
@Repository
public class TchInfoRepositoryImpl extends AbstractRepository<String, TchInfoPo,TchInfo> implements TchInfoRepository{
	  
	@Resource
	private  TchInfoQueryDao tchInfoQueryDao;

	public TchInfo newInstance() {
		TchInfoPo po = new TchInfoPo();
		TchInfo tchInfo = AppUtil.getBean(TchInfo.class);
		tchInfo.setData(po);
		return tchInfo;
	}

	public TchInfo newInstance(TchInfoPo po) {
		TchInfo tchInfo = AppUtil.getBean(TchInfo.class);
		tchInfo.setData(po);
		return tchInfo;
	} 
	
	@Override
	protected IQueryDao<String, TchInfoPo> getQueryDao() {
		return tchInfoQueryDao;
	}
	
	@Override
	public TchInfoPo exGetBy(List exFileds , List exTableList , Map whereMap, Map orderBy) {
		return tchInfoQueryDao.getByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy) );
	}

	@Override
	public List<TchInfoPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		return tchInfoQueryDao.findByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy));
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
