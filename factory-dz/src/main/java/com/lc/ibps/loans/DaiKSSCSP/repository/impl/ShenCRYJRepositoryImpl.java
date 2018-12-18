package com.lc.ibps.loans.DaiKSSCSP.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.ShenCRYJ;
import com.lc.ibps.loans.DaiKSSCSP.repository.ShenCRYJRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenCRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenCRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_scryj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
@Repository
public class ShenCRYJRepositoryImpl extends AbstractRepository<String, ShenCRYJPo,ShenCRYJ> implements ShenCRYJRepository{
	  
	@Resource
	private  ShenCRYJQueryDao shenCRYJQueryDao;

	public ShenCRYJ newInstance() {
		ShenCRYJPo po = new ShenCRYJPo();
		ShenCRYJ shenCRYJ = AppUtil.getBean(ShenCRYJ.class);
		shenCRYJ.setData(po);
		return shenCRYJ;
	}

	public ShenCRYJ newInstance(ShenCRYJPo po) {
		ShenCRYJ shenCRYJ = AppUtil.getBean(ShenCRYJ.class);
		shenCRYJ.setData(po);
		return shenCRYJ;
	} 
	
	@Override
	protected IQueryDao<String, ShenCRYJPo> getQueryDao() {
		return shenCRYJQueryDao;
	}

	@Override
	public ShenCRYJPo getByJdid(String jdid) {
		List<ShenCRYJPo> shenCRYJList = shenCRYJQueryDao.getByJdid(jdid);
		if(shenCRYJList.size()>0){
			ShenCRYJPo shenCRYJ = shenCRYJList.get(0);
			return shenCRYJ;
		}else{
			return null;
		}
	}
	

	
}
