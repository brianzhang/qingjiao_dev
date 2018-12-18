package com.lc.ibps.loans.daikuanInfo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.daikuanInfo.domain.DaiKuanShenQingInfo;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 * t_sxsq 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
public interface DaiKuanShenQingInfoRepository extends IRepository<String, DaiKuanShenQingInfoPo,DaiKuanShenQingInfo>{

	
	DaiKuanShenQingInfoPo getByJdId(String jdid);

}
