package com.lc.ibps.loans.DaiKSSCSP.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.ZhuDCRYJ;
import com.lc.ibps.loans.DaiKSSCSP.repository.ZhuDCRYJRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ZhuDCRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_zdcryj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
@Repository
public class ZhuDCRYJRepositoryImpl extends AbstractRepository<String, ZhuDCRYJPo,ZhuDCRYJ> implements ZhuDCRYJRepository{
	  
	@Resource
	private  ZhuDCRYJQueryDao zhuDCRYJQueryDao;

	public ZhuDCRYJ newInstance() {
		ZhuDCRYJPo po = new ZhuDCRYJPo();
		ZhuDCRYJ zhuDCRYJ = AppUtil.getBean(ZhuDCRYJ.class);
		zhuDCRYJ.setData(po);
		return zhuDCRYJ;
	}

	public ZhuDCRYJ newInstance(ZhuDCRYJPo po) {
		ZhuDCRYJ zhuDCRYJ = AppUtil.getBean(ZhuDCRYJ.class);
		zhuDCRYJ.setData(po);
		return zhuDCRYJ;
	} 
	
	@Override
	protected IQueryDao<String, ZhuDCRYJPo> getQueryDao() {
		return zhuDCRYJQueryDao;
	}

	@Override
	public ZhuDCRYJPo getByJdid(String jdid) {
		List<ZhuDCRYJPo> zhuDCRYJList = zhuDCRYJQueryDao.getByJdid(jdid);
		if(zhuDCRYJList.size()>0){
			ZhuDCRYJPo zhuDCRYJ = zhuDCRYJList.get(0);
			return zhuDCRYJ;
		}else{
			return null;
		}
		
	}
	

	
}
