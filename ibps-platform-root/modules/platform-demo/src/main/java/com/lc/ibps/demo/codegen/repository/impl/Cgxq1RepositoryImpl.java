package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.Cgxq1;
import com.lc.ibps.demo.codegen.repository.Cgxq1Repository;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * t_cgxq 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
@Repository
public class Cgxq1RepositoryImpl extends AbstractRepository<String, Cgxq1Po,Cgxq1> implements Cgxq1Repository{
	  
	@Resource
	private  Cgxq1QueryDao cgxq1QueryDao;
	@Resource
	private  Cgqd1QueryDao cgqd1QueryDao;

	public Cgxq1 newInstance() {
		Cgxq1Po po = new Cgxq1Po();
		Cgxq1 cgxq1 = AppUtil.getBean(Cgxq1.class);
		cgxq1.setData(po);
		return cgxq1;
	}

	public Cgxq1 newInstance(Cgxq1Po po) {
		Cgxq1 cgxq1 = AppUtil.getBean(Cgxq1.class);
		cgxq1.setData(po);
		return cgxq1;
	} 
	
	@Override
	protected IQueryDao<String, Cgxq1Po> getQueryDao() {
		return cgxq1QueryDao;
	}
	

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	@Override
	public Cgxq1Po loadCascade(String id){
		Cgxq1Po cgxq1Po = null;
		if(StringUtil.isNotEmpty(id)){
			cgxq1Po = cgxq1QueryDao.get(id);
			if(BeanUtils.isNotEmpty(cgxq1Po) && BeanUtils.isNotEmpty(cgxq1Po.getId())){
				List<Cgqd1Po> cgqd1PoList = cgqd1QueryDao.findByMainId(cgxq1Po.getId());
				cgxq1Po.setCgqd1PoList(cgqd1PoList);
			}
		}
		return cgxq1Po;
	}
	
}