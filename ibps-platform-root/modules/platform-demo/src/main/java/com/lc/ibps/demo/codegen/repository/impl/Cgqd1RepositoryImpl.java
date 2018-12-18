package com.lc.ibps.demo.codegen.repository.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.codegen.domain.Cgqd1;
import com.lc.ibps.demo.codegen.repository.Cgqd1Repository;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@Repository
public class Cgqd1RepositoryImpl extends AbstractRepository<String, Cgqd1Po,Cgqd1> implements Cgqd1Repository{
	  
	@Resource
	private  Cgqd1QueryDao cgqd1QueryDao;

	public Cgqd1 newInstance() {
		Cgqd1Po po = new Cgqd1Po();
		Cgqd1 cgqd1 = AppUtil.getBean(Cgqd1.class);
		cgqd1.setData(po);
		return cgqd1;
	}

	public Cgqd1 newInstance(Cgqd1Po po) {
		Cgqd1 cgqd1 = AppUtil.getBean(Cgqd1.class);
		cgqd1.setData(po);
		return cgqd1;
	} 
	
	@Override
	protected IQueryDao<String, Cgqd1Po> getQueryDao() {
		return cgqd1QueryDao;
	}
	
	@Override
	public List<Cgqd1Po> findByMainId(String mainId) {
		return cgqd1QueryDao.findByMainId(mainId);
	}

	
}