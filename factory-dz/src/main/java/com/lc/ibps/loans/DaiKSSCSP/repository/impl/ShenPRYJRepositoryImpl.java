package com.lc.ibps.loans.DaiKSSCSP.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.ShenPRYJ;
import com.lc.ibps.loans.DaiKSSCSP.repository.ShenPRYJRepository;

import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenPRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;

/**
 * t_spryj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
@Repository
public class ShenPRYJRepositoryImpl extends AbstractRepository<String, ShenPRYJPo,ShenPRYJ> implements ShenPRYJRepository{
	  
	@Resource
	private  ShenPRYJQueryDao shenPRYJQueryDao;

	public ShenPRYJ newInstance() {
		ShenPRYJPo po = new ShenPRYJPo();
		ShenPRYJ shenPRYJ = AppUtil.getBean(ShenPRYJ.class);
		shenPRYJ.setData(po);
		return shenPRYJ;
	}

	public ShenPRYJ newInstance(ShenPRYJPo po) {
		ShenPRYJ shenPRYJ = AppUtil.getBean(ShenPRYJ.class);
		shenPRYJ.setData(po);
		return shenPRYJ;
	} 
	
	@Override
	protected IQueryDao<String, ShenPRYJPo> getQueryDao() {
		return shenPRYJQueryDao;
	}

	@Override
	public ShenPRYJPo getByJdid(String jdid) {
		List<ShenPRYJPo> ShenPRList = shenPRYJQueryDao.getByJdid(jdid);
		if(ShenPRList.size()>0){
			ShenPRYJPo shenpr = ShenPRList.get(0);
			return shenpr;
		}else{
			return null;			
		}
	   

	}
	

	
}
