package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.Cgxq;
import com.lc.ibps.demo.codegen.repository.CgxqRepository;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

/**
 * 采购需求 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
@Repository
public class CgxqRepositoryImpl extends AbstractRepository<String, CgxqPo,Cgxq> implements CgxqRepository{
	  
	@Resource
	private  CgxqQueryDao cgxqQueryDao;
	@Resource
	private  CgqdQueryDao cgqdQueryDao;
	@Resource
	private  CgxqfjQueryDao cgxqfjQueryDao;

	public Cgxq newInstance() {
		CgxqPo po = new CgxqPo();
		Cgxq cgxq = AppUtil.getBean(Cgxq.class);
		cgxq.setData(po);
		return cgxq;
	}

	public Cgxq newInstance(CgxqPo po) {
		Cgxq cgxq = AppUtil.getBean(Cgxq.class);
		cgxq.setData(po);
		return cgxq;
	} 
	
	@Override
	protected IQueryDao<String, CgxqPo> getQueryDao() {
		return cgxqQueryDao;
	}
	

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	@Override
	public CgxqPo loadCascade(String id){
		CgxqPo cgxqPo = null;
		if(StringUtil.isNotEmpty(id)){
			cgxqPo = cgxqQueryDao.get(id);
			if(BeanUtils.isNotEmpty(cgxqPo) && BeanUtils.isNotEmpty(cgxqPo.getId())){
				List<CgqdPo> cgqdPoList = cgqdQueryDao.findByMainId(cgxqPo.getId());
				cgxqPo.setCgqdPoList(cgqdPoList);
			}
			if(BeanUtils.isNotEmpty(cgxqPo) && BeanUtils.isNotEmpty(cgxqPo.getId())){
				List<CgxqfjPo> cgxqfjPoList = cgxqfjQueryDao.findByMainId(cgxqPo.getId());
				cgxqPo.setCgxqfjPoList(cgxqfjPoList);
			}
		}
		return cgxqPo;
	}
	
}