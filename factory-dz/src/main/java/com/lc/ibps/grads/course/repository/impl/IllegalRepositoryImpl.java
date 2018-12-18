package com.lc.ibps.grads.course.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.grads.course.domain.Illegal;
import com.lc.ibps.grads.course.persistence.dao.IllegalQueryDao;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;
import com.lc.ibps.grads.course.repository.IllegalRepository;

/**
 * 违规操作表 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
@Repository
public class IllegalRepositoryImpl extends AbstractRepository<String, IllegalPo,Illegal> implements IllegalRepository{
	  
	@Resource
	private  IllegalQueryDao illegalQueryDao;

	@Override
	public Illegal newInstance() {
		IllegalPo po = new IllegalPo();
		Illegal illegal = AppUtil.getBean(Illegal.class);
		illegal.setData(po);
		return illegal;
	}

	@Override
	public Illegal newInstance(IllegalPo po) {
		Illegal illegal = AppUtil.getBean(Illegal.class);
		illegal.setData(po);
		return illegal;
	} 
	
	@Override
	protected IQueryDao<String, IllegalPo> getQueryDao() {
		return illegalQueryDao;
	}
	
	@Override
	public IllegalPo getByCols(Map arg, String mode) {
		return illegalQueryDao.getByKey("getByCols", makeParam(arg, mode));
	}

	@Override
	public List<IllegalPo> findByCols(Map arg, String mode) {
		return illegalQueryDao.findByKey("getByCols", makeParam(arg, mode));
	}
	private Map makeParam(Map arg, String mode){
		Map res = new HashMap<String,Map>();
		res.put("relationMap", arg);
		if(!StringUtils.isEmpty(mode))
			res.put("_mode", mode);
		return res;
	}
	
}
