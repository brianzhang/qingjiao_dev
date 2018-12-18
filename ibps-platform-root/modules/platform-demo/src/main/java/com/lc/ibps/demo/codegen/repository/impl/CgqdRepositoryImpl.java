package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.Cgqd;
import com.lc.ibps.demo.codegen.repository.CgqdRepository;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

/**
 * t_purchasedetaillist 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
@Repository
public class CgqdRepositoryImpl extends AbstractRepository<String, CgqdPo,Cgqd> implements CgqdRepository{
	  
	@Resource
	private  CgqdQueryDao cgqdQueryDao;

	public Cgqd newInstance() {
		CgqdPo po = new CgqdPo();
		Cgqd cgqd = AppUtil.getBean(Cgqd.class);
		cgqd.setData(po);
		return cgqd;
	}

	public Cgqd newInstance(CgqdPo po) {
		Cgqd cgqd = AppUtil.getBean(Cgqd.class);
		cgqd.setData(po);
		return cgqd;
	} 
	
	@Override
	protected IQueryDao<String, CgqdPo> getQueryDao() {
		return cgqdQueryDao;
	}
	
	@Override
	public List<CgqdPo> findByMainId(String mainId) {
		return cgqdQueryDao.findByMainId(mainId);
	}

	
}