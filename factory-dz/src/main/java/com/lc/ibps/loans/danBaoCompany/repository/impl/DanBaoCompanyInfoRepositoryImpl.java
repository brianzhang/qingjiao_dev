package com.lc.ibps.loans.danBaoCompany.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.danBaoCompany.domain.DanBaoCompanyInfo;
import com.lc.ibps.loans.danBaoCompany.repository.DanBaoCompanyInfoRepository;
import com.lc.ibps.loans.danBaoCompany.persistence.dao.DanBaoCompanyInfoQueryDao;
import com.lc.ibps.loans.danBaoCompany.persistence.entity.DanBaoCompanyInfoPo;

/**
 * t_dbgs 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 18:38:26
 *</pre>
 */
@Repository
public class DanBaoCompanyInfoRepositoryImpl extends AbstractRepository<String, DanBaoCompanyInfoPo,DanBaoCompanyInfo> implements DanBaoCompanyInfoRepository{
	  
	@Resource
	private  DanBaoCompanyInfoQueryDao danBaoCompanyInfoQueryDao;

	public DanBaoCompanyInfo newInstance() {
		DanBaoCompanyInfoPo po = new DanBaoCompanyInfoPo();
		DanBaoCompanyInfo danBaoCompanyInfo = AppUtil.getBean(DanBaoCompanyInfo.class);
		danBaoCompanyInfo.setData(po);
		return danBaoCompanyInfo;
	}

	public DanBaoCompanyInfo newInstance(DanBaoCompanyInfoPo po) {
		DanBaoCompanyInfo danBaoCompanyInfo = AppUtil.getBean(DanBaoCompanyInfo.class);
		danBaoCompanyInfo.setData(po);
		return danBaoCompanyInfo;
	} 
	
	@Override
	protected IQueryDao<String, DanBaoCompanyInfoPo> getQueryDao() {
		return danBaoCompanyInfoQueryDao;
	}
	

	
    @Override
	public DanBaoCompanyInfoPo getByJdidAndGsmc(String jdid, String gsmc) {
        List<DanBaoCompanyInfoPo> danBaoCompanyInfoList=danBaoCompanyInfoQueryDao.getByJdidAndGsmc(jdid,gsmc);
		
		if(danBaoCompanyInfoList.isEmpty()){
			return null;
		}else{
			DanBaoCompanyInfoPo danBaoCompanyInfoPo=danBaoCompanyInfoList.get(0);
			return danBaoCompanyInfoPo;
		}
	}


}
