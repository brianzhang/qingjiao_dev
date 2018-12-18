package com.lc.ibps.loans.daikuanInfo.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.daikuanInfo.domain.DaiKuanShenQingInfo;
import com.lc.ibps.loans.daikuanInfo.repository.DaiKuanShenQingInfoRepository;
import com.lc.ibps.loans.daikuanInfo.persistence.dao.DaiKuanShenQingInfoQueryDao;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 * t_sxsq 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
@Repository
public class DaiKuanShenQingInfoRepositoryImpl extends AbstractRepository<String, DaiKuanShenQingInfoPo,DaiKuanShenQingInfo> implements DaiKuanShenQingInfoRepository{
	  
	@Resource
	private  DaiKuanShenQingInfoQueryDao daiKuanShenQingInfoQueryDao;

	public DaiKuanShenQingInfo newInstance() {
		DaiKuanShenQingInfoPo po = new DaiKuanShenQingInfoPo();
		DaiKuanShenQingInfo daiKuanShenQingInfo = AppUtil.getBean(DaiKuanShenQingInfo.class);
		daiKuanShenQingInfo.setData(po);
		return daiKuanShenQingInfo;
	}

	public DaiKuanShenQingInfo newInstance(DaiKuanShenQingInfoPo po) {
		DaiKuanShenQingInfo daiKuanShenQingInfo = AppUtil.getBean(DaiKuanShenQingInfo.class);
		daiKuanShenQingInfo.setData(po);
		return daiKuanShenQingInfo;
	} 
	
	@Override
	protected IQueryDao<String, DaiKuanShenQingInfoPo> getQueryDao() {
		return daiKuanShenQingInfoQueryDao;
	}
	

	@Override
	public DaiKuanShenQingInfoPo getByJdId(String jdid) {
		List<DaiKuanShenQingInfoPo> daiKuanShenQingInfoPoList=daiKuanShenQingInfoQueryDao.getByJdId(jdid);
		if(daiKuanShenQingInfoPoList.isEmpty()){
			return null;
		}else{
			DaiKuanShenQingInfoPo daiKuanShenQingInfoPo=daiKuanShenQingInfoPoList.get(0);
			return daiKuanShenQingInfoPo;
		}
	}
	
}
