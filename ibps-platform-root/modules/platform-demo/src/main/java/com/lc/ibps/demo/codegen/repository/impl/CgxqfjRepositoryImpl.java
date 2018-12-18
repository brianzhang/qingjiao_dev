package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.Cgxqfj;
import com.lc.ibps.demo.codegen.repository.CgxqfjRepository;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

/**
 * 采购需求附件 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
@Repository
public class CgxqfjRepositoryImpl extends AbstractRepository<String, CgxqfjPo,Cgxqfj> implements CgxqfjRepository{
	  
	@Resource
	private  CgxqfjQueryDao cgxqfjQueryDao;

	public Cgxqfj newInstance() {
		CgxqfjPo po = new CgxqfjPo();
		Cgxqfj cgxqfj = AppUtil.getBean(Cgxqfj.class);
		cgxqfj.setData(po);
		return cgxqfj;
	}

	public Cgxqfj newInstance(CgxqfjPo po) {
		Cgxqfj cgxqfj = AppUtil.getBean(Cgxqfj.class);
		cgxqfj.setData(po);
		return cgxqfj;
	} 
	
	@Override
	protected IQueryDao<String, CgxqfjPo> getQueryDao() {
		return cgxqfjQueryDao;
	}
	
	@Override
	public List<CgxqfjPo> findByMainId(String mainId) {
		return cgxqfjQueryDao.findByMainId(mainId);
	}

	
}