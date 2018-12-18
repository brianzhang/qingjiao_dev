package com.lc.ibps.loans.dyrInfo.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.dyrInfo.domain.Dyr;
import com.lc.ibps.loans.dyrInfo.repository.DyrRepository;
import com.lc.ibps.loans.dyrInfo.persistence.dao.DyrQueryDao;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 * t_dyr 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
@Repository
public class DyrRepositoryImpl extends AbstractRepository<String, DyrPo,Dyr> implements DyrRepository{
	  
	@Resource
	private  DyrQueryDao dyrQueryDao;

	public Dyr newInstance() {
		DyrPo po = new DyrPo();
		Dyr dyr = AppUtil.getBean(Dyr.class);
		dyr.setData(po);
		return dyr;
	}

	public Dyr newInstance(DyrPo po) {
		Dyr dyr = AppUtil.getBean(Dyr.class);
		dyr.setData(po);
		return dyr;
	} 
	
	@Override
	protected IQueryDao<String, DyrPo> getQueryDao() {
		return dyrQueryDao;
	}
	

	@Override
	public DyrPo getByJdId(String jdid) {
    List<DyrPo> dyrPoList=dyrQueryDao.getByJdId(jdid);
		
		if(dyrPoList.isEmpty()){
			return null;
		}else{
			DyrPo dyrPo=dyrPoList.get(0);
			return dyrPo;
		}

	}

	@Override
	public DyrPo getByJdIdAndshengfenId(String jdid, String zjhm) {
		  List<DyrPo> dyrPoList=dyrQueryDao.getByJdIdAndshengfenId(jdid,zjhm);
			
			if(dyrPoList.isEmpty()){
				return null;
			}else{
				DyrPo dyrPo=dyrPoList.get(0);
				return dyrPo;
			}
	
	}
}
