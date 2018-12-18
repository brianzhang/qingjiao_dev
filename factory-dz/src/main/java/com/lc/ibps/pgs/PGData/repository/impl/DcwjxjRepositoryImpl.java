package com.lc.ibps.pgs.PGData.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.Dcwjxj;
import com.lc.ibps.pgs.PGData.repository.DcwjxjRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;

/**
 * t_dcwjxj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
@Repository
public class DcwjxjRepositoryImpl extends AbstractRepository<String, DcwjxjPo,Dcwjxj> implements DcwjxjRepository{
	  
	@Resource
	private  DcwjxjQueryDao dcwjxjQueryDao;

	public Dcwjxj newInstance() {
		DcwjxjPo po = new DcwjxjPo();
		Dcwjxj dcwjxj = AppUtil.getBean(Dcwjxj.class);
		dcwjxj.setData(po);
		return dcwjxj;
	}

	public Dcwjxj newInstance(DcwjxjPo po) {
		Dcwjxj dcwjxj = AppUtil.getBean(Dcwjxj.class);
		dcwjxj.setData(po);
		return dcwjxj;
	} 
	
	@Override
	protected IQueryDao<String, DcwjxjPo> getQueryDao() {
		return dcwjxjQueryDao;
	}

	@Override
	public List<DcwjxjPo> queryByType(String wjName) {
		return dcwjxjQueryDao.queryByType(wjName);
	}
	

	
}
