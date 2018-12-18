package com.lc.ibps.loans.baoZhengRen.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.baoZhengRen.domain.BZRXXB;
import com.lc.ibps.loans.baoZhengRen.repository.BZRXXBRepository;
import com.lc.ibps.loans.baoZhengRen.persistence.dao.BZRXXBQueryDao;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 * t_bzrxxb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:17
 *</pre>
 */
@Repository
public class BZRXXBRepositoryImpl extends AbstractRepository<String, BZRXXBPo,BZRXXB> implements BZRXXBRepository{
	  
	@Resource
	private  BZRXXBQueryDao bZRXXBQueryDao;

	public BZRXXB newInstance() {
		BZRXXBPo po = new BZRXXBPo();
		BZRXXB bZRXXB = AppUtil.getBean(BZRXXB.class);
		bZRXXB.setData(po);
		return bZRXXB;
	}

	public BZRXXB newInstance(BZRXXBPo po) {
		BZRXXB bZRXXB = AppUtil.getBean(BZRXXB.class);
		bZRXXB.setData(po);
		return bZRXXB;
	} 
	
	@Override
	protected IQueryDao<String, BZRXXBPo> getQueryDao() {
		return bZRXXBQueryDao;
	}
	

	


@Override
	public BZRXXBPo getByJdidAndZjhm(String jdid, String zjhm) {
		List<BZRXXBPo> BZRXXBlist=bZRXXBQueryDao.getByJdidAndZjhm(jdid,zjhm);
		if(BZRXXBlist.isEmpty()){
			return null;
		}else{
		BZRXXBPo po = BZRXXBlist.get(0);
		return po;
	    }
	}
}
